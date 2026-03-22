import { crews, fleet } from './mock_data.js';

const crewGrid = document.getElementById('crew-grid');
const fleetGrid = document.getElementById('fleet-grid');
const statsBar = document.getElementById('stats-bar');
const globalSearch = document.getElementById('global-search');

// --- 1. FUNCIÓN DE ESTADÍSTICAS ---
function updateStats() {
    const sbyCount = crews.filter(c => c.estado === 'SBY').length;
    const flyingPlanes = fleet.filter(p => p.estado === 'Flying').length;
    const maintCount = fleet.filter(p => p.estado === 'Maintenance').length;

    statsBar.innerHTML = `
        <div class="stat-item">👥 TCPs en SBY: <strong>${sbyCount}</strong></div>
        <div class="stat-item">✈️ En Vuelo: <strong>${flyingPlanes}</strong></div>
        <div class="stat-item">🔧 En Hangar: <strong>${maintCount}</strong></div>
    `;
}

// --- 2. RENDERIZADO DE TRIPULACIÓN ---
function renderCrews(data = crews) {
    crewGrid.innerHTML = '';
    data.forEach(person => {
        const card = document.createElement('div');
        let statusClass = person.estado === 'SBY' ? 'status-ready' : (person.estado === 'Flying' ? 'status-flying' : 'status-rest');
        card.className = `card crew ${statusClass}`;
        card.innerHTML = `
            <h3>${person.nombre}</h3>
            <p><strong>${person.rango}</strong></p>
            <span class="badge">${person.estado}</span>
        `;
        crewGrid.appendChild(card);
    });
}

// --- 3. RENDERIZADO DE FLOTA ---
function renderFleet(data = fleet) {
    fleetGrid.innerHTML = '';
    data.forEach(plane => {
        const card = document.createElement('div');
        let statusClass = plane.estado === 'Ready' ? 'status-ready' : (plane.estado === 'Flying' ? 'status-flying' : 'status-maintenance');
        card.className = `card plane ${statusClass}`;
        card.innerHTML = `
            <h3>${plane.matricula}</h3>
            <p>${plane.modelo} | ${plane.vuelo}</p>
            <span class="badge">${plane.estado}</span>
        `;
        fleetGrid.appendChild(card);
    });
}

// --- 4. BUSCADOR GLOBAL ---
globalSearch.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();

    const filteredCrews = crews.filter(c => c.nombre.toLowerCase().includes(term));
    const filteredFleet = fleet.filter(p => p.matricula.toLowerCase().includes(term) || p.modelo.toLowerCase().includes(term));

    renderCrews(filteredCrews);
    renderFleet(filteredFleet);
});

// EJECUCIÓN INICIAL
updateStats();
renderCrews();
renderFleet();