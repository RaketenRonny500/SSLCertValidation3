document.getElementById('hostForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const hostname = document.getElementById('hostname').value;

    // Retrieve the token from session storage
    const token = sessionStorage.getItem('token');

    // Construct the request body
    const requestBody = JSON.stringify({ hostname });

    // Make a POST request to the backend
    fetch('/host', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            document.getElementById('message').innerText = 'Host added successfully!';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').innerText = 'An error occurred while adding the host.';
        });
});
