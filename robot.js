const fs = require('fs');
const nodemailer = require('nodemailer');

// 1. Configuración del servidor de correos (Usa las variables seguras de GitHub)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Cambia esto si usas Outlook (smtp.office365.com) o el SMTP de tu hosting
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER, // Tu correo configurado en los Secrets de GitHub
        pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación en los Secrets
    }
});

// Correo de destino para las alertas
const EMAIL_DESTINO = "comercial@peamco.com.co";

// Función para calcular días restantes de forma precisa
function obtenerDiasRestantes(fechaObjetivo) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const destino = new Date(fechaObjetivo + "T00:00:00");
    const diferenciaMs = destino - hoy;
    return Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
}

async function ejecutarRobot() {
    console.log("🤖 Iniciando Robot de Alertas Diarias PEAMCO...");

    // 2. Comprobar si existe el archivo de datos
    if (!fs.existsSync('programas.json')) {
        console.log("⚠️ No se encontró el archivo 'programas.json'. No hay datos que procesar aún.");
        return;
    }

    const datosCrudos = fs.readFileSync('programas.json', 'utf8');
    const masterData = JSON.parse(datosCrudos);
    
    let alertasUrgentes = [];

    // 3. Analizar los programas de ensayo registrados
    if (masterData.programs && masterData.programs.length > 0) {
        masterData.programs.forEach(item => {
            // Evaluamos las fechas importantes de cada ensayo
            const fechasAEvaluar = [
                { nombre: "Inicio de Ejecución", fecha: item.inicio },
                { nombre: "Fin de Ejecución", fecha: item.fin },
                { nombre: "Entrega de Informe Preliminar", fecha: item.preliminar },
                { nombre: "Entrega de Informe Final", fecha: item.final }
            ];

            fechasAEvaluar.forEach(evento => {
                if (evento.fecha) {
                    const dias = obtenerDiasRestantes(evento.fecha);
                    
                    // Alerta si faltan 2 días, 1 día, vence hoy o ya está vencido
                    if (dias <= 2) {
                        let estadoTexto = "";
                        if (dias < 0) estadoTexto = `VENCIDO hace ${Math.abs(dias)} días`;
                        else if (dias === 0) estadoTexto = "¡VENCE HOY!";
                        else estadoTexto = `Faltan ${dias} días`;

                        alertasUrgentes.push({
                            codigo: item.codigo,
                            ensayo: item.ensayo,
                            evento: evento.nombre,
                            fechaLimite: evento.fecha,
                            estado: estadoTexto,
                            entregable: item.pendiente
                        });
                    }
                }
            });
        });
    }

    // 4. Analizar la bitácora de tareas libres
    if (masterData.notes && masterData.notes.length > 0) {
        masterData.notes.forEach(nota => {
            if (nota.deadline) {
                const dias = obtenerDiasRestantes(nota.deadline);
                if (dias <= 2) {
                    let estadoTexto = "";
                    if (dias < 0) estadoTexto = "VENCIDA";
                    else if (dias === 0) estadoTexto = "¡VENCE HOY!";
                    else estadoTexto = `Faltan ${dias} días`;

                    alertasUrgentes.push({
                        codigo: "BITÁCORA",
                        ensayo: nota.title,
                        evento: "Fecha Límite de Tarea",
                        fechaLimite: nota.deadline,
                        estado: estadoTexto,
                        entregable: nota.desc
                    });
                }
            }
        });
    }

    // 5. Enviar el correo electrónico consolidado si hay alertas
    if (alertasUrgentes.length === 0) {
        console.log("✅ Todo al día. No hay alertas urgentes para enviar hoy.");
        return;
    }

    console.log(`⚠️ Se encontraron ${alertasUrgentes.length} alertas urgentes. Generando correo electrónico...`);

    // Construcción del diseño HTML del correo
    let filasTabla = "";
    alertasUrgentes.forEach(alerta => {
        const colorEstado = alerta.estado.includes("VENCID") ? "#E53E3E" : (alerta.estado.includes("HOY") ? "#DD6B20" : "#3182CE");
        filasTabla += `
            <tr>
                <td style="padding: 10px; border: 1px solid #E2E8F0;"><b>${alerta.codigo}</b></td>
                <td style="padding: 10px; border: 1px solid #E2E8F0;">${alerta.ensayo}</td>
                <td style="padding: 10px; border: 1px solid #E2E8F0;">${alerta.evento}</td>
                <td style="padding: 10px; border: 1px solid #E2E8F0;">${alerta.fechaLimite}</td>
                <td style="padding: 10px; border: 1px solid #E2E8F0; color: ${colorEstado}; font-weight: bold;">${alerta.estado}</td>
                <td style="padding: 10px; border: 1px solid #E2E8F0;">${alerta.entregable}</td>
            </tr>
        `;
    });

    const contenidoHtml = `
        <div style="font-family: Arial, sans-serif; color: #2D3748; max-width: 800px; margin: 0 auto; border: 1px solid #E2E8F0; padding: 20px; border-radius: 8px;">
            <div style="background-color: #0000D0; color: white; padding: 15px; border-radius: 6px 6px 0 0; text-align: center;">
                <h2 style="margin: 0;">PEAMCO S.A.S. - Alertas Diarias Automáticas</h2>
            </div>
            <p style="font-size: 16px; margin-top: 20px;">Estimado equipo comercial y técnico,</p>
            <p>Se han detectado los siguientes compromisos y entregables técnicos que requieren su atención inmediata (plazo de 2 días o menos):</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background-color: #F7FAFC;">
                        <th style="padding: 10px; border: 1px solid #E2E8F0; text-align: left;">Código</th>
                        <th style="padding: 10px; border: 1px solid #E2E8F0; text-align: left;">Nombre / Tarea</th>
                        <th style="padding: 10px; border: 1px solid #E2E8F0; text-align: left;">Evento Crítico</th>
                        <th style="padding: 10px; border: 1px solid #E2E8F0; text-align: left;">Fecha Límite</th>
                        <th style="padding: 10px; border: 1px solid #E2E8F0; text-align: left;">Estado</th>
                        <th style="padding: 10px; border: 1px solid #E2E8F0; text-align: left;">Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasTabla}
                </tbody>
            </table>

            <p style="margin-top: 30px; font-size: 13px; color: #718096; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 15px;">
                Este es un mensaje generado de forma automática por el sistema de monitoreo de PEAMCO S.A.S.
            </p>
        </div>
    `;

    const opcionesCorreo = {
        from: `"Robot de Alertas PEAMCO" <${process.env.EMAIL_USER}>`,
        to: EMAIL_DESTINO,
        subject: `⚠️ ALERTA PEAMCO: Tienes ${alertasUrgentes.length} pendientes urgentes`,
        html: contenidoHtml
    };

    try {
        await transporter.sendMail(opcionesCorreo);
        console.log("📧 ¡Correo electrónico de alerta enviado con éxito!");
    } catch (error) {
        console.error("❌ Error al enviar el correo electrónico:", error);
        process.exit(1);
    }
}

ejecutarRobot();
