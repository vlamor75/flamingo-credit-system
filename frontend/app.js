// Configuración de URLs de las APIs
const API_CLIENTES = 'http://localhost:3001/api/clientes';
const API_CREDITOS = 'http://localhost:3002/api/creditos';

// Variables globales
let clientesData = [];
let creditosData = [];

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    checkAPIStatus();
    loadClientes();
    loadCreditos();
    loadClientesSelect();
});

// ========================================
// TABS
// ========================================
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            // Remove active class from all buttons and contents
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(`tab-${tabName}`).classList.add('active');
        });
    });
}

// ========================================
// API STATUS
// ========================================
async function checkAPIStatus() {
    const statusElement = document.getElementById('api-status');
    try {
        const response = await fetch(API_CLIENTES);
        if (response.ok) {
            statusElement.textContent = '🟢 Conectado';
            statusElement.style.background = 'rgba(107, 207, 127, 0.3)';
        }
    } catch (error) {
        statusElement.textContent = '🔴 Desconectado';
        statusElement.style.background = 'rgba(238, 90, 111, 0.3)';
    }
}

// ========================================
// CLIENTES
// ========================================
async function loadClientes() {
    const container = document.getElementById('clientes-list');
    container.innerHTML = '<div class="loading">Cargando clientes...</div>';

    try {
        const response = await fetch(API_CLIENTES);
        const result = await response.json();

        if (result.success) {
            clientesData = result.data;
            displayClientes(clientesData);
        } else {
            container.innerHTML = '<div class="alert alert-error">Error al cargar clientes</div>';
        }
    } catch (error) {
        container.innerHTML = '<div class="alert alert-error">Error de conexión con el servidor</div>';
        console.error('Error:', error);
    }
}

function displayClientes(clientes) {
    const container = document.getElementById('clientes-list');

    if (clientes.length === 0) {
        container.innerHTML = '<div class="loading">No hay clientes registrados</div>';
        return;
    }

    container.innerHTML = clientes.map(cliente => `
        <div class="card">
            <div class="card-header">
                <div class="card-title">${cliente.nombre} ${cliente.apellido}</div>
            </div>
            <div class="card-body">
                <div class="card-info">
                    <strong>Cédula:</strong>
                    <span>${cliente.cedula}</span>
                </div>
                <div class="card-info">
                    <strong>Email:</strong>
                    <span>${cliente.email}</span>
                </div>
                <div class="card-info">
                    <strong>Teléfono:</strong>
                    <span>${cliente.telefono || 'N/A'}</span>
                </div>
                <div class="card-info">
                    <strong>Dirección:</strong>
                    <span>${cliente.direccion || 'N/A'}</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn btn-primary btn-small" onclick="verCreditosCliente(${cliente.id})">
                    Ver Créditos
                </button>
            </div>
        </div>
    `).join('');
}

// ========================================
// CRÉDITOS
// ========================================
async function loadCreditos() {
    const container = document.getElementById('creditos-list');
    container.innerHTML = '<div class="loading">Cargando créditos...</div>';

    try {
        const response = await fetch(API_CREDITOS);
        const result = await response.json();

        if (result.success) {
            creditosData = result.data;
            displayCreditos(creditosData);
        } else {
            container.innerHTML = '<div class="alert alert-error">Error al cargar créditos</div>';
        }
    } catch (error) {
        container.innerHTML = '<div class="alert alert-error">Error de conexión con el servidor</div>';
        console.error('Error:', error);
    }
}

function displayCreditos(creditos) {
    const container = document.getElementById('creditos-list');

    if (creditos.length === 0) {
        container.innerHTML = '<div class="loading">No hay créditos registrados</div>';
        return;
    }

    container.innerHTML = creditos.map(credito => `
        <div class="card">
            <div class="card-header">
                <div class="card-title">Crédito #${credito.id}</div>
                <span class="badge badge-${credito.estado}">${credito.estado.toUpperCase()}</span>
            </div>
            <div class="card-body">
                <div class="card-info">
                    <strong>Cliente:</strong>
                    <span>${credito.nombre_cliente || 'N/A'}</span>
                </div>
                <div class="card-info">
                    <strong>Cédula:</strong>
                    <span>${credito.cedula || 'N/A'}</span>
                </div>
                <div class="card-info">
                    <strong>Monto:</strong>
                    <span>$${parseFloat(credito.monto_solicitado).toLocaleString('es-CO')}</span>
                </div>
                <div class="card-info">
                    <strong>Plazo:</strong>
                    <span>${credito.plazo_meses} meses</span>
                </div>
                <div class="card-info">
                    <strong>Tasa:</strong>
                    <span>${credito.tasa_interes}%</span>
                </div>
                ${credito.motivo_rechazo ? `
                    <div class="card-info">
                        <strong>Motivo Rechazo:</strong>
                        <span>${credito.motivo_rechazo}</span>
                    </div>
                ` : ''}
            </div>
            ${credito.estado === 'pendiente' ? `
                <div class="card-actions">
                    <button class="btn btn-success btn-small" onclick="aprobarCredito(${credito.id})">
                        ✅ Aprobar
                    </button>
                    <button class="btn btn-danger btn-small" onclick="mostrarRechazoModal(${credito.id})">
                        ❌ Rechazar
                    </button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function filterCreditos() {
    const filterValue = document.getElementById('filter-estado').value;

    if (filterValue === '') {
        displayCreditos(creditosData);
    } else {
        const filtered = creditosData.filter(c => c.estado === filterValue);
        displayCreditos(filtered);
    }
}

// ========================================
// CREAR CRÉDITO
// ========================================
async function loadClientesSelect() {
    try {
        const response = await fetch(API_CLIENTES);
        const result = await response.json();

        if (result.success) {
            const select = document.getElementById('cliente_id');
            select.innerHTML = '<option value="">Seleccione un cliente</option>' +
                result.data.map(c =>
                    `<option value="${c.id}">${c.nombre} ${c.apellido} (${c.cedula})</option>`
                ).join('');
        }
    } catch (error) {
        console.error('Error al cargar clientes:', error);
    }
}

async function crearCredito(event) {
    event.preventDefault();

    const formData = {
        cliente_id: parseInt(document.getElementById('cliente_id').value),
        monto_solicitado: parseFloat(document.getElementById('monto_solicitado').value),
        plazo_meses: parseInt(document.getElementById('plazo_meses').value),
        tasa_interes: parseFloat(document.getElementById('tasa_interes').value)
    };

    try {
        const response = await fetch(API_CREDITOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ Solicitud de crédito creada exitosamente');
            document.getElementById('form-credito').reset();
            loadCreditos();

            // Cambiar a la pestaña de créditos
            document.querySelector('[data-tab="creditos"]').click();
        } else {
            alert('❌ Error: ' + result.error);
        }
    } catch (error) {
        alert('❌ Error de conexión con el servidor');
        console.error('Error:', error);
    }
}

// ========================================
// APROBAR CRÉDITO
// ========================================
async function aprobarCredito(creditoId) {
    if (!confirm('¿Está seguro de aprobar este crédito?')) {
        return;
    }

    try {
        const response = await fetch(`${API_CREDITOS}/${creditoId}/aprobar`, {
            method: 'PUT'
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ Crédito aprobado exitosamente');
            loadCreditos();
        } else {
            alert('❌ Error al aprobar crédito');
        }
    } catch (error) {
        alert('❌ Error de conexión con el servidor');
        console.error('Error:', error);
    }
}

// ========================================
// RECHAZAR CRÉDITO
// ========================================
function mostrarRechazoModal(creditoId) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = 'Rechazar Crédito';
    modalBody.innerHTML = `
        <form onsubmit="rechazarCredito(event, ${creditoId})">
            <div class="form-group">
                <label for="motivo_rechazo">Motivo del rechazo *</label>
                <textarea id="motivo_rechazo"
                          style="width:100%; padding:12px; border:2px solid #ECF0F1; border-radius:8px; min-height:100px;"
                          required
                          placeholder="Describa el motivo del rechazo..."></textarea>
            </div>
            <button type="submit" class="btn btn-danger btn-large">
                ❌ Rechazar Crédito
            </button>
        </form>
    `;

    modal.style.display = 'block';
}

async function rechazarCredito(event, creditoId) {
    event.preventDefault();

    const motivo = document.getElementById('motivo_rechazo').value;

    try {
        const response = await fetch(`${API_CREDITOS}/${creditoId}/rechazar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ motivo })
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ Crédito rechazado exitosamente');
            closeModal();
            loadCreditos();
        } else {
            alert('❌ Error al rechazar crédito');
        }
    } catch (error) {
        alert('❌ Error de conexión con el servidor');
        console.error('Error:', error);
    }
}

// ========================================
// VER CRÉDITOS DE CLIENTE
// ========================================
async function verCreditosCliente(clienteId) {
    try {
        const response = await fetch(`${API_CREDITOS}/cliente/${clienteId}`);
        const result = await response.json();

        if (result.success) {
            const modal = document.getElementById('modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');

            modalTitle.textContent = `Créditos de ${result.cliente.nombre}`;

            if (result.count === 0) {
                modalBody.innerHTML = '<p>Este cliente no tiene créditos registrados.</p>';
            } else {
                modalBody.innerHTML = `
                    <p><strong>Total de créditos:</strong> ${result.count}</p>
                    <div style="margin-top: 20px;">
                        ${result.data.map(credito => `
                            <div style="padding: 15px; margin-bottom: 10px; border: 2px solid #ECF0F1; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                    <strong>Crédito #${credito.id}</strong>
                                    <span class="badge badge-${credito.estado}">${credito.estado.toUpperCase()}</span>
                                </div>
                                <p><strong>Monto:</strong> $${parseFloat(credito.monto_solicitado).toLocaleString('es-CO')}</p>
                                <p><strong>Plazo:</strong> ${credito.plazo_meses} meses</p>
                                <p><strong>Tasa:</strong> ${credito.tasa_interes}%</p>
                                ${credito.motivo_rechazo ? `<p><strong>Motivo:</strong> ${credito.motivo_rechazo}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            modal.style.display = 'block';
        }
    } catch (error) {
        alert('❌ Error al cargar créditos del cliente');
        console.error('Error:', error);
    }
}

// ========================================
// MODAL
// ========================================
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}
