document.getElementById('addHostForm').addEventListener('submit', addHost);

function addHost(event) {
    event.preventDefault(); // Prevent the default form submission

    const hostname = document.getElementById('hostname').value;

    fetch(`/host`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Removed the 'Authorization' header
        },
        body: JSON.stringify({ hostname })
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Failed to add host: ${text}`);
                });
            }
            return response.json();
        })
        .then(() => {
            document.getElementById('message').textContent = 'Host added successfully!';
        })
        .catch(error => {
            console.error("An error occurred:", error);
            document.getElementById('message').textContent = 'Failed to add host. Please try again.';
        });
}
