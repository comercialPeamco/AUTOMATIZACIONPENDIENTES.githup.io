<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PEAMCO - Panel Comercial con Calendario Interactivo</title>
    <style>
        :root {
            --primary: #0000D0; /* Azul Corporativo PEAMCO */
            --accent: #7045B4;  /* Púrpura Corporativo */
            --success: #29C819; /* Verde Corporativo */
            --bg: #F5F7FA;
            --text-main: #2D3748;
            --white: #FFFFFF;
            --danger: #E53E3E;
            --warning: #DD6B20;
            --whatsapp: #25D366;
            --email: #3182CE;
            --border-color: #E2E8F0;
        }

        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background-color: var(--bg);
            color: var(--text-main);
            margin: 0;
            padding: 30px 20px;
            line-height: 1.5;
        }

        .container {
            max-width: 1280px;
            margin: 0 auto;
        }

        header {
            background-color: var(--white);
            color: var(--text-main);
            padding: 30px;
            border-radius: 12px;
            text-align: left;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border-left: 6px solid var(--primary);
        }

        header h1 { 
            margin: 0; 
            font-size: 26px; 
            font-weight: 700;
            color: var(--primary);
            letter-spacing: -0.5px;
        }
        header p { 
            margin: 8px 0 0 0; 
            font-size: 14px; 
            color: #718096;
            font-weight: 500;
        }

        /* CONFIGURACIÓN GITHUB */
        .config-box {
            background: #EDF2F7;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px dashed #CBD5E0;
        }
        .config-box h4 { margin: 0 0 10px 0; color: #4A5568; }
        .config-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 10px;
        }

        /* ESTADO DE SINCRONIZACIÓN */
        .sync-status {
            padding: 10px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 13px;
            text-align: center;
            margin-bottom: 15px;
        }
        .status-idle { background: #E2E8F0; color: #4A5568; }
        .status-loading { background: #EBF8FF; color: #2B6CB0; }
        .status-success { background: #C6F6D5; color: #22543D; }
        .status-error { background: #FED7D7; color: #742A2A; }

        /* SECCIÓN DE ALERTAS VISUALES */
        .alert-section {
            background-color: #FFF5F5;
            border: 1px solid #FED7D7;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px -1px rgba(229, 62, 62, 0.05);
        }

        .alert-section h2 { 
            margin-top: 0; 
            color: var(--danger); 
            font-size: 18px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .alert-card {
            background-color: var(--white);
            border-left: 4px solid var(--warning);
            padding: 16px 24px;
            margin-bottom: 12px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
            border-top: 1px solid var(--border-color);
            border-right: 1px solid var(--border-color);
            border-bottom: 1px solid var(--border-color);
            transition: transform 0.2s;
        }
        
        .alert-card:hover { transform: translateY(-2px); }
        .alert-card.vencido { border-left-color: var(--danger); background-color: #FFF5F5; }
        .alert-buttons { display: flex; gap: 10px; }

        .btn-action {
            padding: 8px 16px;
            border-radius: 6px;
            color: var(--white);
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            border: none;
        }
        .btn-action:hover { opacity: 0.9; }
        .btn-mail { background-color: var(--email); }
        .btn-wa { background-color: var(--whatsapp); }

        /* DISEÑO DE PANELES (Dos columnas) */
        .dashboard {
            display: grid;
            grid-template-columns: 380px 1fr;
            gap: 30px;
        }

        @media (max-width: 1024px) { .dashboard { grid-template-columns: 1fr; } }

        .panel {
            background-color: var(--white);
            padding: 26px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            margin-bottom: 25px;
            border: 1px solid var(--border-color);
        }

        .panel h3 { 
            margin-top: 0; 
            color: var(--primary); 
            font-size: 18px;
            font-weight: 700;
            padding-bottom: 12px; 
            margin-bottom: 20px;
            border-bottom: 1px solid var(--border-color);
        }

        .form-group { margin-bottom: 16px; }
        .form-group label { 
            display: block; 
            margin-bottom: 6px; 
            font-size: 13px; 
            font-weight: 600; 
            color: #4A5568;
        }
        .form-group input, .form-group select, .form-group textarea { 
            width: 100%; 
            padding: 10px 12px; 
            border: 1px solid var(--border-color); 
            border-radius: 6px; 
            box-sizing: border-box; 
            font-size: 14px;
            background-color: #FAFAFA;
            font-family: inherit;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
            outline: none;
            border-color: var(--primary);
            background-color: var(--white);
            box-shadow: 0 0 0 3px rgba(0, 0, 208, 0.1);
        }

        .btn-save { 
            background-color: var(--primary); 
            color: var(--white); 
            border: none; 
            padding: 12px; 
            width: 100%; 
            border-radius: 6px; 
            cursor: pointer; 
            font-weight: 600; 
            font-size: 14px;
            margin-bottom: 10px;
        }
        .btn-save:hover { background-color: #0000A0; }

        .btn-secondary { background-color: var(--accent); }
        .btn-secondary:hover { background-color: #553395; }

        /* CALENDARIO INTERACTIVO */
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        .calendar-header h4 {
            margin: 0;
            font-size: 18px;
            color: var(--primary);
            font-weight: bold;
        }
        .calendar-btn {
            background-color: var(--primary);
            color: var(--white);
            border: none;
            border-radius: 5px;
            padding: 5px 12px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.2s;
        }
        .calendar-btn:hover { background-color: #0000A0; }

        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 8px;
            text-align: center;
        }
        .calendar-day-name {
            font-size: 11px;
            font-weight: bold;
            color: #718096;
            text-transform: uppercase;
            padding-bottom: 5px;
        }
        .calendar-cell {
            background: #F8FAFC;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            min-height: 70px;
            padding: 6px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
        }
        .calendar-cell:hover {
            background-color: #EBF8FF;
            transform: scale(1.03);
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .calendar-cell.today {
            border: 2px solid var(--primary);
            background: #EBF8FF;
        }
        .calendar-cell.other-month {
            opacity: 0.4;
            cursor: default;
        }
        .calendar-cell.other-month:hover {
            background: #F8FAFC;
            transform: none;
            box-shadow: none;
        }
        .calendar-date-num {
            font-size: 13px;
            font-weight: bold;
            color: #4A5568;
        }
        .dots-container {
            display: flex;
            gap: 4px;
            width: 100%;
            justify-content: flex-start;
        }
        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
        }
        .dot-program { background-color: var(--primary); }
        .dot-note { background-color: var(--accent); }

        /* VENTANA EMERGENTE (MODAL INTERACTIVO CON ANIMACIÓN) */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.4);
            backdrop-filter: blur(4px);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .modal-overlay.active {
            display: flex;
            opacity: 1;
        }
        .modal-content {
            background: var(--white);
            padding: 25px;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            transform: scale(0.8);
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .modal-overlay.active .modal-content {
            transform: scale(1);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid var(--border-color);
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .modal-header h4 {
            margin: 0;
            color: var(--primary);
            font-size: 18px;
        }
        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #A0AEC0;
        }
        .close-modal:hover { color: var(--danger); }
        .modal-body {
            max-height: 300px;
            overflow-y: auto;
        }
        .modal-item {
            background: #F8FAFC;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 10px;
        }

        /* LISTA CON BOTONES COMPACTA */
        .compact-list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid var(--border-color);
        }

        /* DISEÑO COMPLEMENTARIO BOTÓN VOZ */
        .btn-voice {
            background-color: var(--accent);
            color: var(--white);
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            margin-top: 15px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            width: auto;
            transition: background 0.2s;
        }
        .btn-voice:hover { background-color: #553395; }
    </style>
</head>
<body>

<div class="container">
    <header>
        <h1>PEAMCO S.A.S. — Panel Comercial con Calendario Interactivo</h1>
        <p>Monitoreo Automático de Ensayos, Bitácora de Pendientes y Sincronización en Tiempo Real con GitHub</p>
        <!-- BOTÓN DE LECTURA DE VOZ -->
        <button id="btn-audio-pendientes" onclick="leerPendientesEnVozAlta()" class="btn-voice">
            🔊 Leer mis pendientes en voz alta
        </button>
    </header>

    <!-- CONFIGURACIÓN DE CONEXIÓN CON GITHUB -->
    <div class="config-box">
        <h4>🔗 Configuración de Sincronización con GitHub Robot</h4>
        <div class="config-grid">
            <div class="form-group" style="margin-bottom:0;">
                <label style="font-size:11px;">Usuario de GitHub:</label>
                <input type="text" id="gh_owner" placeholder="ej: comercialPeamco" style="padding:6px; font-size:12px;">
            </div>
            <div class="form-group" style="margin-bottom:0;">
                <label style="font-size:11px;">Nombre del Repositorio:</label>
                <input type="text" id="gh_repo" placeholder="ej: AUTOMATIZACIONPENDIENTES" style="padding:6px; font-size:12px;">
            </div>
            <div class="form-group" style="margin-bottom:0;">
                <label style="font-size:11px;">Rama (Branch):</label>
                <input type="text" id="gh_branch" value="main" style="padding:6px; font-size:12px;">
            </div>
            <div class="form-group" style="margin-bottom:0;">
                <label style="font-size:11px;">Token de GitHub (PAT):</label>
                <input type="password" id="gh_token" placeholder="Pega aquí tu token ghp_..." style="padding:6px; font-size:12px;">
            </div>
        </div>
    </div>

    <!-- ESTADO DE SINCRONIZACIÓN -->
    <div id="sync-status" class="sync-status status-idle">Sincronización lista (esperando cambios)</div>

    <!-- ALERTAS EN PANTALLA (2 DÍAS ANTES) -->
    <div id="alert-section" class="alert-section" style="display: none;">
        <h2>⚠️ Alertas Activas en Pantalla (Faltan 2 días o Menos)</h2>
        <div id="alert-container"></div>
    </div>

    <div class="dashboard">
        <!-- IZQUIERDA: FORMULARIOS -->
        <div>
            <!-- FORMULARIO 1: ENSAYOS -->
            <div class="panel">
                <h3>Registrar Programa de Ensayo</h3>
                <form id="programForm">
                    <div class="form-group">
                        <label>Código del Programa:</label>
                        <input type="text" id="codigo" placeholder="Ej: EA-BA-2026" required>
                    </div>
                    <div class="form-group">
                        <label>Nombre del Ensayo:</label>
                        <input type="text" id="ensayo" placeholder="Ej: Barras de Acero" required>
                    </div>
                    <div class="form-group">
                        <label>Inicio de Ejecución:</label>
                        <input type="date" id="inicio" required>
                    </div>
                    <div class="form-group">
                        <label>Fin de Ejecución:</label>
                        <input type="date" id="fin" required>
                    </div>
                    <div class="form-group">
                        <label>Entrega de Informe Preliminar:</label>
                        <input type="date" id="preliminar" required>
                    </div>
                    <div class="form-group">
                        <label>Entrega de Informe Final:</label>
                        <input type="date" id="final" required>
                    </div>
                    <div class="form-group">
                        <label>Entregable Técnico Pendiente:</label>
                        <select id="pendiente">
                            <option value="Instrucciones de Ensayo">Instrucciones de Ensayo</option>
                            <option value="Informe Preliminar">Informe Preliminar</option>
                            <option value="Informe Final">Informe Final</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-save">Agregar Programa</button>
                </form>
            </div>

            <!-- FORMULARIO 2: PENDIENTES LIBRES -->
            <div class="panel">
                <h3>Anotar Otro Pendiente (Bitácora)</h3>
                <form id="noteForm">
                    <div class="form-group">
                        <label>Título del Pendiente:</label>
                        <input type="text" id="note-title" placeholder="Ej: Llamar a Tecnisuelos" required>
                    </div>
                    <div class="form-group">
                        <label>Descripción / Detalles:</label>
                        <textarea id="note-desc" rows="3" placeholder="Ej: Solicitar confirmación..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Fecha Límite:</label>
                        <input type="date" id="note-deadline" required>
                    </div>
                    <button type="submit" class="btn-save btn-secondary">Registrar Tarea</button>
                </form>
            </div>
        </div>

        <!-- DERECHA: CALENDARIO INTERACTIVO -->
        <div>
            <div class="panel">
                <div class="calendar-header">
                    <button class="calendar-btn" onclick="changeMonth(-1)">« Anterior</button>
                    <h4 id="calendar-month-year">Julio 2026</h4>
                    <button class="calendar-btn" onclick="changeMonth(1)">Siguiente »</button>
                </div>
                <div class="calendar-grid" id="calendar-grid">
                    <!-- Dinámico -->
                </div>
            </div>

            <!-- LISTADO COMPACTO DE EDICIÓN/ELIMINACIÓN -->
            <div class="panel">
                <h3>📋 Lista de Elementos Registrados</h3>
                <div id="elements-list">
                    <!-- Dinámico -->
                </div>
            </div>
        </div>
    </div>
</div>

<!-- VENTANA EMERGENTE (MODAL) -->
<div class="modal-overlay" id="modal-overlay" onclick="closeModal(event)">
    <div class="modal-content">
        <div class="modal-header">
            <h4 id="modal-date-title">Detalle del Día</h4>
            <button class="close-modal" onclick="closeModalDirect()">&times;</button>
        </div>
        <div class="modal-body" id="modal-body-content">
            <!-- Dinámico -->
        </div>
    </div>
</div>

<script>
    const CONFIG = { correo: "comercial@peamco.com.co", waNum: "573185263597" };
    
    let masterData = JSON.parse(localStorage.getItem('peamco_master_data')) || {
        programs: [],
        notes: []
    };

    let currentCalendarDate = new Date(); // Mes por defecto del calendario (hoy)

    // Cargar credenciales guardadas de GitHub al iniciar
    document.getElementById('gh_owner').value = localStorage.getItem('gh_owner') || '';
    document.getElementById('gh_repo').value = localStorage.getItem('gh_repo') || '';
    document.getElementById('gh_branch').value = localStorage.getItem('gh_branch') || 'main';
    document.getElementById('gh_token').value = localStorage.getItem('gh_token') || '';

    // Guardar credenciales de GitHub al cambiarlas
    ['gh_owner', 'gh_repo', 'gh_branch', 'gh_token'].forEach(id => {
        document.getElementById(id).addEventListener('input', function() {
            localStorage.setItem(id, this.value);
        });
    });

    // Guardar programa
    document.getElementById('programForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const entry = {
            id: Date.now(),
            codigo: document.getElementById('codigo').value,
            ensayo: document.getElementById('ensayo').value,
            inicio: document.getElementById('inicio').value,
            fin: document.getElementById('fin').value,
            preliminar: document.getElementById('preliminar').value,
            final: document.getElementById('final').value,
            pendiente: document.getElementById('pendiente').value,
            status: "Pendiente"
        };
        masterData.programs.push(entry);
        updateData();
        this.reset();
    });

    // Guardar nota/tarea libre
    document.getElementById('noteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const entry = {
            id: Date.now(),
            title: document.getElementById('note-title').value,
            desc: document.getElementById('note-desc').value,
            deadline: document.getElementById('note-deadline').value
        };
        masterData.notes.push(entry);
        updateData();
        this.reset();
    });

    function updateData() {
        localStorage.setItem('peamco_master_data', JSON.stringify(masterData));
        render();
        syncToGitHub(masterData);
    }

    async function syncToGitHub(cleanJSON) {
        const owner = localStorage.getItem('gh_owner');
        const repo = localStorage.getItem('gh_repo');
        const branch = localStorage.getItem('gh_branch') || 'main';
        const token = localStorage.getItem('gh_token');
        const path = 'programas.json';

        if (!owner || !repo || !token) {
            showStatus("⚠️ Guardado localmente. Configura GitHub para que el robot de alertas funcione automáticamente.", "error");
            return;
        }

        showStatus("🔄 Sincronizando con tu repositorio de GitHub...", "loading");

        try {
            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
            let sha = "";

            const resGet = await fetch(url, {
                headers: { "Authorization": `token ${token}` }
            });

            if (resGet.status === 200) {
                const fileData = await resGet.json();
                sha = fileData.sha;
            }

            const jsonString = JSON.stringify(cleanJSON, null, 2);
            const contentBase64 = btoa(unescape(encodeURIComponent(jsonString)));

            const resPut = await fetch(url, {
                method: "PUT",
                headers: {
                    "Authorization": `token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: "Actualización de base de datos desde panel web interactivo",
                    content: contentBase64,
                    sha: sha || undefined,
                    branch: branch
                })
            });

            if (resPut.ok) {
                showStatus("✅ ¡Sincronizado con éxito en GitHub! El robot tiene los datos actualizados.", "success");
            } else {
                const errJson = await resPut.json();
                throw new Error(errJson.message || "Error al subir.");
            }

        } catch (error) {
            showStatus(`❌ Error de sincronización: ${error.message}`, "error");
        }
    }

    function showStatus(text, type) {
        const statusDiv = document.getElementById('sync-status');
        statusDiv.className = `sync-status status-${type}`;
        statusDiv.innerText = text;
    }

    function daysRemaining(targetDate) {
        const today = new Date();
        today.setHours(0,0,0,0);
        const target = new Date(targetDate + "T00:00:00");
        return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    }

    function changeMonth(direction) {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
        render();
    }

    // FORMATEADOR DE TABLA PARA CORREOS
    function buildCustomEmail(item, mName, mDate, daysText) {
        const subject = `NOTIFICACIÓN PEAMCO: Pendiente Urgente - ${item.codigo} [${item.ensayo}]`;
        const body = `Estimado Equipo Comercial y Técnico,\n\n` +
            `Se ha generado un recordatorio automático sobre el estado de entrega para el siguiente ensayo:\n\n` +
            `========================================================================\n` +
            `               REPORTE DE ESTADO DE ENSAYOS - PEAMCO S.A.S.              \n` +
            `========================================================================\n` +
            `  PROPIEDAD             |  DETALLES                                     \n` +
            `------------------------|-----------------------------------------------\n` +
            `  Código de Ensayo      |  ${item.codigo.padEnd(45, ' ')}\n` +
            `  Nombre del Programa   |  ${item.ensayo.padEnd(45, ' ')}\n` +
            `  Evento Crítico        |  ${mName.padEnd(45, ' ')}\n` +
            `  Fecha Límite          |  ${mDate.padEnd(45, ' ')}\n` +
            `  Estado de Entrega     |  ${daysText.toUpperCase().padEnd(45, ' ')}\n` +
            `  Entregable Esperado   |  ${item.pendiente.padEnd(45, ' ')}\n` +
            `========================================================================\n\n` +
            `📌 ACCIÓN REQUERIDA:\n` +
            `Por favor, verificar con prioridad la entrega de los informes o la ejecución del ensayo.\n\n` +
            `Cordialmente,\n` +
            `Área de Automatización Comercial\n` +
            `PEAMCO S.A.S.`;

        return `mailto:${CONFIG.correo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    function getEventsForDate(dateStr) {
        const events = [];
        masterData.programs.forEach(item => {
            if (item.inicio === dateStr) events.push({ type: 'program', label: `Inicio: [${item.codigo}] ${item.ensayo}`, color: 'var(--primary)', item });
            if (item.fin === dateStr) events.push({ type: 'program', label: `Fin: [${item.codigo}] ${item.ensayo}`, color: 'var(--primary)', item });
            if (item.preliminar === dateStr) events.push({ type: 'program', label: `Preliminar: [${item.codigo}] ${item.ensayo}`, color: 'var(--primary)', item });
            if (item.final === dateStr) events.push({ type: 'program', label: `Final: [${item.codigo}] ${item.ensayo}`, color: 'var(--primary)', item });
        });
        masterData.notes.forEach(note => {
            if (note.deadline === dateStr) events.push({ type: 'note', label: `Tarea: ${note.title} (${note.desc})`, color: 'var(--accent)', note });
        });
        return events;
    }

    // INTERACTIVIDAD: VER DETALLE EN MODAL ANIMADO
    function openModalForDay(dateStr) {
        const events = getEventsForDate(dateStr);
        const modal = document.getElementById('modal-overlay');
        const title = document.getElementById('modal-date-title');
        const body = document.getElementById('modal-body-content');

        title.innerText = `Tareas y Eventos del ${dateStr}`;
        body.innerHTML = "";

        if (events.length === 0) {
            body.innerHTML = `<p style="color:#718096; text-align:center;">No hay pendientes ni eventos programados para este día. ¡Todo despejado!</p>`;
        } else {
            events.forEach(ev => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'modal-item';
                
                if (ev.type === 'program') {
                    const days = daysRemaining(dateStr);
                    const daysText = days < 0 ? 'Vencido hace ' + Math.abs(days) + ' días' : (days === 0 ? 'Vence hoy' : 'Faltan ' + days + ' días');
                    const mailHref = buildCustomEmail(ev.item, "Evento del día", dateStr, daysText);
                    const waMsg = `*ALERTA DE ENSAYO PEAMCO*\n\n• *Código:* ${ev.item.codigo}\n• *Ensayo:* ${ev.item.ensayo}\n• *Fecha:* ${dateStr} (${daysText.toUpperCase()})`;
                    const waHref = `https://wa.me/${CONFIG.waNum}?text=${encodeURIComponent(waMsg)}`;

                    itemDiv.style.borderLeft = `4px solid var(--primary)`;
                    itemDiv.innerHTML = `
                        <strong style="color:var(--primary);">${ev.label}</strong><br>
                        <small>Entregable Técnico: <b>${ev.item.pendiente}</b> (${ev.item.status})</small>
                        <div style="margin-top: 10px; display:flex; gap:8px;">
                            <a href="${mailHref}" class="btn-action btn-mail" style="padding:4px 8px; font-size:11px;">📧 Enviar Tabla</a>
                            <a href="${waHref}" target="_blank" class="btn-action btn-wa" style="padding:4px 8px; font-size:11px;">📲 WhatsApp</a>
                        </div>
                    `;
                } else {
                    const days = daysRemaining(dateStr);
                    const daysText = days < 0 ? 'Vencido' : (days === 0 ? 'Vence hoy' : 'Faltan ' + days + ' días');
                    const mailHref = `mailto:${CONFIG.correo}?subject=${encodeURIComponent('Pendiente: ' + ev.note.title)}&body=${encodeURIComponent(ev.note.desc)}`;
                    const waHref = `https://wa.me/${CONFIG.waNum}?text=${encodeURIComponent('*TAREA COMERCIAL*\n\n' + ev.note.title + '\n' + ev.note.desc)}`;

                    itemDiv.style.borderLeft = `4px solid var(--accent)`;
                    itemDiv.innerHTML = `
                        <strong style="color:var(--accent);">${ev.label}</strong><br>
                        <small>Detalles: ${ev.note.desc}</small>
                        <div style="margin-top: 10px; display:flex; gap:8px;">
                            <a href="${mailHref}" class="btn-action btn-mail" style="background-color: var(--accent); padding:4px 8px; font-size:11px;">📧 Correo</a>
                            <a href="${waHref}" target="_blank" class="btn-action btn-wa" style="padding:4px 8px; font-size:11px;">📲 WhatsApp</a>
                        </div>
                    `;
                }
                body.appendChild(itemDiv);
            });
        }

        modal.classList.add('active');
    }

    function closeModalDirect() {
        document.getElementById('modal-overlay').classList.remove('active');
    }

    function closeModal(e) {
        if (e.target.id === 'modal-overlay') {
            closeModalDirect();
        }
    }

    // LÓGICA AGREGADA: LEER PENDIENTES EN VOZ ALTA
    function leerPendientesEnVozAlta() {
        if (!('speechSynthesis' in window)) {
            alert("Tu navegador no soporta la reproducción de voz. Intenta con Chrome o Edge.");
            return;
        }

        const boton = document.getElementById('btn-audio-pendientes');

        // Si ya está hablando, detener la voz inmediatamente (Función de Apagado/Pausa)
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            boton.innerText = "🔊 Leer mis pendientes en voz alta";
            boton.style.backgroundColor = "var(--accent)";
            return;
        }

        let textoALeer = "Reporte de pendientes para PEAMCO S.A.S. ";

        // Procesar programas de ensayo
        if (masterData.programs.length === 0) {
            textoALeer += "No hay programas de ensayo registrados. ";
        } else {
            textoALeer += `Tienes ${masterData.programs.length} programas de ensayo. `;
            masterData.programs.forEach((item, index) => {
                textoALeer += `Ensayo número ${index + 1}: Código ${item.codigo}, ${item.ensayo}. El entregable técnico pendiente es ${item.pendiente}. `;
            });
        }

        // Procesar bitácora de tareas libres
        if (masterData.notes.length === 0) {
            textoALeer += "No hay tareas adicionales en la bitácora.";
        } else {
            textoALeer += `En la bitácora cuentas con ${masterData.notes.length} tareas pendientes. `;
            masterData.notes.forEach((note, index) => {
                textoALeer += `Tarea número ${index + 1}: Titulada ${note.title}. Detalles: ${note.desc}. `;
            });
        }

        const utterance = new SpeechSynthesisUtterance(textoALeer);
        utterance.lang = 'es-ES'; // Forzar idioma español
        utterance.rate = 0.95;    // Velocidad ligeramente natural
        utterance.pitch = 1.0;   

        // Intentar capturar una voz en español del navegador
        const voces = window.speechSynthesis.getVoices();
        const vozEspanol = voces.find(v => v.lang.startsWith('es'));
        if (vozEspanol) utterance.voice = vozEspanol;

        // Cambiar estados visuales del botón durante la lectura
        utterance.onstart = () => {
            boton.innerText = "⏹️ Detener lectura de voz";
            boton.style.backgroundColor = "var(--danger)";
        };

        utterance.onend = () => {
            boton.innerText = "🔊 Leer mis pendientes en voz alta";
            boton.style.backgroundColor = "var(--accent)";
        };

        utterance.onerror = () => {
            boton.innerText = "🔊 Leer mis pendientes en voz alta";
            boton.style.backgroundColor = "var(--accent)";
        };

        window.speechSynthesis.speak(utterance);
    }

    // RENDERIZAR TODO EL DASHBOARD Y EL CALENDARIO
    function render() {
        const grid = document.getElementById('calendar-grid');
        const monthYearText = document.getElementById('calendar-month-year');
        const alertSection = document.getElementById('alert-section');
        const alertContainer = document.getElementById('alert-container');
        const elementsList = document.getElementById('elements-list');

        grid.innerHTML = "";
        alertContainer.innerHTML = "";
        elementsList.innerHTML = "";

        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();

        monthYearText.innerText = `${monthNames[month]} ${year}`;

        // Añadir cabeceras de días de la semana
        const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        weekDays.forEach(day => {
            const el = document.createElement('div');
            el.className = 'calendar-day-name';
            el.innerText = day;
            grid.appendChild(el);
        });

        const firstDayIndex = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const prevTotalDays = new Date(year, month, 0).getDate();

        // Rellenar días del mes anterior
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            const cell = document.createElement('div');
            cell.className = 'calendar-cell other-month';
            cell.innerHTML = `<span class="calendar-date-num">${prevTotalDays - i}</span>`;
            grid.appendChild(cell);
        }

        // Rellenar días del mes actual
        const todayStr = new Date().toISOString().split('T')[0];
        let hasAlerts = false;

        for (let day = 1; day <= totalDays; day++) {
            const cell = document.createElement('div');
            cell.className = 'calendar-cell';
            
            const dayFormatted = String(day).padStart(2, '0');
            const monthFormatted = String(month + 1).padStart(2, '0');
            const dateStr = `${year}-${monthFormatted}-${dayFormatted}`;

            if (dateStr === todayStr) {
                cell.classList.add('today');
            }

            cell.innerHTML = `<span class="calendar-date-num">${day}</span>`;
            cell.onclick = () => openModalForDay(dateStr);

            const events = getEventsForDate(dateStr);
            if (events.length > 0) {
                const dotsContainer = document.createElement('div');
                dotsContainer.className = 'dots-container';
                events.forEach(ev => {
                    const dot = document.createElement('span');
                    dot.className = `dot dot-${ev.type}`;
                    dotsContainer.appendChild(dot);
                });
                cell.appendChild(dotsContainer);
            }

            grid.appendChild(cell);
        }

        // Procesar Alertas Críticas de Ensayos (Faltan 2 días o vencido)
        masterData.programs.forEach(item => {
            const fechasEvaluables = [
                { name: "Fin Ejecución", date: item.fin },
                { name: "Entrega Preliminar", date: item.preliminar },
                { name: "Entrega Final", date: item.final }
            ];

            fechasEvaluables.forEach(f => {
                const rem = daysRemaining(f.date);
                if (rem <= 2) {
                    hasAlerts = true;
                    const alertCard = document.createElement('div');
                    alertCard.className = `alert-card ${rem < 0 ? 'vencido' : ''}`;

                    const daysText = rem < 0 ? `🚨 VENCIDO hace ${Math.abs(rem)} días` : (rem === 0 ? `⚠️ VENCE HOY` : `⏳ Faltan ${rem} días`);
                    const mailHref = buildCustomEmail(item, f.name, f.date, daysText);
                    const waMsg = `*ALERTA CRÍTICA PEAMCO*\n\n• *Código:* ${item.codigo}\n• *Ensayo:* ${item.ensayo}\n• *Evento:* ${f.name}\n• *Estado:* ${daysText.toUpperCase()}`;
                    const waHref = `https://wa.me/${CONFIG.waNum}?text=${encodeURIComponent(waMsg)}`;

                    alertCard.innerHTML = `
                        <div>
                            <strong>[${item.codigo}] ${item.ensayo}</strong> — <span style="color:var(--danger); font-weight:bold;">${f.name}</span><br>
                            <small>Fecha Límite: ${f.date} (${daysText}) | Pendiente: <b>${item.pendiente}</b></small>
                        </div>
                        <div class="alert-buttons">
                            <a href="${mailHref}" class="btn-action btn-mail">📧 Enviar Alerta</a>
                            <a href="${waHref}" target="_blank" class="btn-action btn-wa">📲 WhatsApp</a>
                        </div>
                    `;
                    alertContainer.appendChild(alertCard);
                }
            });
        });

        alertSection.style.display = hasAlerts ? "block" : "none";

        // Renderizar la lista compacta inferior de borrado
        if(masterData.programs.length === 0 && masterData.notes.length === 0) {
            elementsList.innerHTML = `<p style="color:#718096; text-align:center; font-size:13px;">No hay datos registrados aún.</p>`;
        } else {
            masterData.programs.forEach(p => {
                const item = document.createElement('div');
                item.className = 'compact-list-item';
                item.innerHTML = `
                    <span style="font-size:13px;">🔵 <b>[Ensayo]</b> ${p.codigo} - ${p.ensayo}</span>
                    <button class="btn-action btn-mail" style="background-color:var(--danger); padding:4px 10px; font-size:11px;" onclick="eliminarElemento('programs', ${p.id})">Eliminar</button>
                `;
                elementsList.appendChild(item);
            });

            masterData.notes.forEach(n => {
                const item = document.createElement('div');
                item.className = 'compact-list-item';
                item.innerHTML = `
                    <span style="font-size:13px;">🟣 <b>[Bitácora]</b> ${n.title}</span>
                    <button class="btn-action btn-mail" style="background-color:var(--danger); padding:4px 10px; font-size:11px;" onclick="eliminarElemento('notes', ${n.id})">Eliminar</button>
                `;
                elementsList.appendChild(item);
            });
        }
    }

    function eliminarElemento(arrayName, id) {
        if(confirm("¿Seguro que deseas eliminar este registro?")) {
            masterData[arrayName] = masterData[arrayName].filter(el => el.id !== id);
            updateData();
        }
    }

    // Inicializar la carga visual
    window.onload = () => {
        render();
        // Carga inicial de voces de forma asíncrona para navegadores basados en Chromium
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
        }
    };
</script>

</body>
</html>
