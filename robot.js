const fs = require('fs');

if (!fs.existsSync('programas.json')) {
    console.log("Error: No se encontró el archivo programas.json");
    process.exit(1);
}

const programas = JSON.parse(fs.readFileSync('programas.json', 'utf8'));

// Configurar la fecha de hoy usando la zona horaria de Colombia (Bogotá)
const hoy = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
hoy.setHours(0, 0, 0, 0);

let alertasFormateadas = [];

programas.forEach(p => {
    const hitos = [
        { fecha: p.inicio, nombre: 'Inicio de Ejecución del Programa' },
        { fecha: p.fin, nombre: 'Fin de la Ejecución del Programa' },
        { fecha: p.preliminar, nombre: 'Envío de Informe Preliminar' },
        { fecha: p.final, nombre: 'Envío de Informe Final' }
    ];

    hitos.forEach(h => {
        if (!h.fecha) return;
        
        const fechaHito = new Date(h.fecha + 'T00:00:00');
        const diferenciaTiempo = fechaHito - hoy;
        const diasFaltantes = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

        // Filtra y captura si faltan exactamente 2 días
        if (diasFaltantes === 2) {
            alertasFormateadas.push(
                `• PROGRAMA: ${p.codigo} — ${p.ensayo}\n` +
                `  HITO PRÓXIMO: ${h.nombre}\n` +
                `  FECHA LÍMITE: ${h.fecha} (En 2 días exactamente)\n` +
                `  PENDIENTE DEL ÁREA TÉCNICA: ${p.pendiente}\n`
            );
        }
    });
});

if (alertasFormateadas.length > 0) {
    const encabezado = '⚠️ ALERTA COMERCIAL PEAMCO — RECORDATORIO DE PLAZOS TÉCNICOS (2 DÍAS DE ANTICIPACIÓN)\n\n' +
                       'Estimado equipo comercial,\n\nLos siguientes programas bilaterales están a 2 días de cumplir un hito clave y requieren seguimiento inmediato con el área técnica:\n\n' +
                       '------------------------------------------------------------\n\n';
    
    const pieDePagina = '\n------------------------------------------------------------\nPor favor, comunicarse vía correo a comercial@peamco.com.co o a WhatsApp (+57 318 5263597) para presionar el entregable.';
    
    fs.writeFileSync('cuerpo_correo.txt', encabezado + alertasFormateadas.join('\n') + pieDePagina);
    
    fs.appendFileSync(process.env.GITHUB_ENV, 'TIENE_ALERTAS=true\n');
    console.log('Alerta procesada: Se encontraron hitos a 2 días.');
} else {
    fs.appendFileSync(process.env.GITHUB_ENV, 'TIENE_ALERTAS=false\n');
    console.log('Análisis diario completado: No hay alertas para hoy.');
}
