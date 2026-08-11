const form = document.getElementById("contactForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const contact = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    if (!contact.name || !contact.email || !contact.message) {
        statusText.textContent = "Please fill in all fields.";
        statusText.className = "status error";
        return;
    }

    try {
        const response = await fetch("/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        });

        if (!response.ok) {
            throw new Error("Unable to submit contact.");
        }

        statusText.textContent = "Message submitted successfully!";
        statusText.className = "status success";
        form.reset();

    } catch (error) {
        statusText.textContent = "Something went wrong. Please try again.";
        statusText.className = "status error";
        console.error(error);
    }
});
