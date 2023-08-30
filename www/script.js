let token = '';

function setToken() {
    token = document.getElementById('token').value;
}

async function apiCall(method, route, body = null) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    const response = await fetch(`http://localhost:3000${route}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    });

    if (response.status === 204) return null;

    if (response.ok) {
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    } else {
        const text = await response.text();
        throw new Error(`Failed to fetch: ${text}`);
    }
}


async function getAllHosts() {
    try {
        const hosts = await apiCall('GET', '/host');
        if (hosts) {
            displayHosts(hosts);
        }
    } catch (error) {
        console.error("Error fetching hosts:", error);
    }
}

async function createHost() {
    const hostname = prompt('Enter new hostname:');
    if (hostname) {
        try {
            await apiCall('POST', '/host', { hostname });
            await getAllHosts();
        } catch (error) {
            console.error("Error creating host:", error);
        }
    } else {
        alert('Hostname is required to create a new host.');
    }
}

async function deleteHost(id) {
    const confirmDelete = confirm(`Are you sure you want to delete host with ID: ${id}?`);
    if (confirmDelete) {
        try {
            await apiCall('DELETE', `/host/${id}`);
            await getAllHosts();
        } catch (error) {
            console.error("Error deleting host:", error);
        }
    }
}

async function updateHost(id, hostname) {
    const newHostname = prompt(`Update hostname for ID ${id}. Current hostname is ${hostname}:`);
    if (newHostname) {
        try {
            await apiCall('POST', `/host/${id}`, { hostname: newHostname });
            await getAllHosts();
        } catch (error) {
            console.error("Error updating host:", error);
        }
    } else {
        alert('New hostname is required for updating.');
    }
}

function displayHosts(hosts) {
    const hostList = document.getElementById('hostList');
    hostList.innerHTML = '';
    hosts.forEach(host => {
        const hostDiv = document.createElement('div');
        hostDiv.innerHTML = `<span>ID: ${host.id}, Hostname: ${host.hostname}</span> 
                             <button onclick="deleteHost(${host.id})">Delete</button>
                             <button onclick="updateHost(${host.id}, '${host.hostname}')">Edit</button>`;
        hostList.appendChild(hostDiv);
    });
}
