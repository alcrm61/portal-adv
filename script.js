// -------------------- CONTADORES -------------------- //
let totalCases = 0;
let totalDeadlines = 0;
let totalTasks = 0;
let totalClients = 0;
let totalPrazos = 0;
let totalAudiencias = 0;
function openModal() {
    document.getElementById('taskModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('taskModal').classList.add('hidden');
}
// -------------------- CASOS -------------------- //
// Função para abrir e fechar modal de adicionar caso
function openCaseModal() {
    document.getElementById('addCaseModal').classList.remove('hidden');
}

function closeCaseModal() {
    document.getElementById('addCaseModal').classList.add('hidden');
}

// Evento para abrir e fechar modal de adicionar caso
document.getElementById('addCaseBtn').addEventListener('click', openCaseModal);
document.getElementById('closeCaseModal').addEventListener('click', closeCaseModal);

// Submeter o formulário de adicionar caso
document.getElementById('addCaseForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const tribunal = document.getElementById('tribunal').value.trim();
    const caseTitle = document.getElementById('caseTitle').value.trim();
    const instancia = document.getElementById('instancia').value.trim();
    const numero = document.getElementById('numero').value.trim();

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td class="py-2 px-4 border-b border-gray-200">${tribunal}</td>
        <td class="py-2 px-4 border-b border-gray-200">${caseTitle}</td>
        <td class="py-2 px-4 border-b border-gray-200">${instancia}</td>
        <td class="py-2 px-4 border-b border-gray-200">${numero}</td>
    `;
    document.getElementById("cases-list").appendChild(newRow);
    
    // Atualiza o contador de casos
    const totalCasosCount = document.getElementById('total-casos-count');
    totalCasosCount.textContent = parseInt(totalCasosCount.textContent) + 1;

    closeCaseModal();
    document.getElementById('addCaseForm').reset();
});

// -------------------- CLIENTES -------------------- //

// Função para abrir e fechar modal de adicionar cliente
function openClientModal() {
    document.getElementById('addClientModal').classList.remove('hidden');
}

function closeClientModal() {
   document.getElementById('addClientModal').classList.add('hidden');
}

// Evento para abrir e fechar modal de adicionar cliente
document.getElementById('addClientBtn').addEventListener('click', openClientModal);
document.getElementById('closeClientModal').addEventListener('click', closeClientModal);

// Submeter o formulário de adicionar cliente
document.getElementById('addClientForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const clientName = document.getElementById("clientName").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const id = document.getElementById("id").value.trim();

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td class="py-2 px-4 border-b border-gray-200">${clientName}</td>
        <td class="py-2 px-4 border-b border-gray-200">${email}</td>
        <td class="py-2 px-4 border-b border-gray-200">${telefone}</td>
        <td class="py-2 px-4 border-b border-gray-200">${id}</td>
    `;
    document.getElementById("clients-list").appendChild(newRow);
    
    // Atualiza o contador de clientes
    const totalClientesCount = document.getElementById('total-clientes-count');
    totalClientesCount.textContent = parseInt(totalClientesCount.textContent) + 1;

    closeClientModal();
    document.getElementById('addClientForm').reset();
});
// -------------------- DOCUMENTOS -------------------- //

// Função para abrir e fechar modal de upload de documento
function openUploadModal() {
    document.getElementById('uploadDocumentModal').classList.remove('hidden');
}

function closeUploadModal() {
    document.getElementById('uploadDocumentModal').classList.add('hidden');
}

// Evento para abrir e fechar modal de upload de documento
document.getElementById('uploadDocumentBtn').addEventListener('click', openUploadModal);
document.getElementById('closeUploadModal').addEventListener('click', closeUploadModal);

// Submeter o formulário de upload de documento
document.getElementById('uploadDocumentForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('uploadFile');
    const file = fileInput.files[0];

    if (file) {
        const documentList = document.getElementById('documents-list');
        const newDoc = document.createElement('li');
        newDoc.textContent = file.name;
        documentList.appendChild(newDoc);
    } else {
        alert("Nenhum arquivo selecionado.");
 }

    closeUploadModal();
});

// -------------------- FULLCALENDAR -------------------- //

// Função para abrir e fechar modal de eventos
function openEventModal() {
    document.getElementById("event-modal").classList.remove("hidden");
}

function closeEventModal() {
    document.getElementById("event-modal").classList.add("hidden");
}

// Adicionar evento ao calendário e à lista de prazos
function addEventToCalendar(title, date) {
    if (title && date) {
        calendar.addEvent({ title, start: date });

        const deadlinesList = document.getElementById("deadlines-list");
        const newDeadline = document.createElement("li");
        newDeadline.textContent = `${title} - ${new Date(date).toLocaleDateString("pt-BR")}`;
        deadlinesList.appendChild(newDeadline);

        totalDeadlines++;
        document.getElementById("total-prazos-count").textContent = totalDeadlines;

        closeEventModal();
        document.getElementById("event-title").value = "";
        document.getElementById("event-date").value = "";
    } else {
        alert("Preencha todos os campos.");
    }
}

// Função para adicionar um evento ao calendário
function addCalendarEvent() {
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;

    if (title && date) {
        const audienciasList = document.getElementById('audiencias-list');
        const audienciaItem = document.createElement('li');
        audienciaItem.className = 'text-gray-700';
        audienciaItem.textContent = `${date} - ${title}`;
        audienciasList.appendChild(audienciaItem);

        totalAudiencias++;
        document.getElementById('total-prazos-count').textContent = totalAudiencias;

        closeEventModal();
        document.getElementById('event-title').value = '';
        document.getElementById('event-date').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// -------------------- FUNÇÕES GERAIS -------------------- //

// Adicionar prazos
function addDeadline() {
    const newDeadline = prompt("Insira o novo prazo:");
    if (newDeadline) {
        totalDeadlines++;
        const deadlineList = document.getElementById('deadlines-list');
        const newListItem = document.createElement('li');
        newListItem.textContent = newDeadline;
        deadlineList.appendChild(newListItem);
        document.getElementById('total-prazos-count').textContent = totalDeadlines;
    }
}

// Adicionar tarefas
function addTask() {
    const newTask = prompt("Insira a nova tarefa:");
    if (newTask) {
        totalTasks++;
        const taskList = document.getElementById('tasks-list');
        const newListItem = document.createElement('li');
        newListItem.textContent = newTask;
        taskList.appendChild(newListItem);
        document.getElementById('total-tarefas-count').textContent = totalTasks;
    }
}