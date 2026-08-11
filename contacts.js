const tableBody = document.getElementById("contactTableBody");
const tableStatus = document.getElementById("tableStatus");
const refreshBtn = document.getElementById("refreshBtn");

async function loadContacts() {
    tableBody.innerHTML = "";
    tableStatus.textContent = "Loading contacts...";
    tableStatus.className = "status";

    try {
        const response = await fetch("/contacts");

        if (!response.ok) {
            throw new Error("Unable to fetch contacts.");
        }

        const contacts = await response.json();

        if (contacts.length === 0) {
            tableStatus.textContent = "No contacts found.";
            return;
        }

        contacts.forEach(contact => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${contact.id}</td>
                <td>${escapeHtml(contact.name)}</td>
                <td>${escapeHtml(contact.email)}</td>
                <td>${escapeHtml(contact.message)}</td>
            `;

            tableBody.appendChild(row);
        });

        tableStatus.textContent = `${contacts.length} contact(s) found.`;
        tableStatus.className = "status success";

    } catch (error) {
        tableStatus.textContent = "Unable to load contacts.";
        tableStatus.className = "status error";
        console.error(error);
    }
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

refreshBtn.addEventListener("click", loadContacts);
loadContacts();
