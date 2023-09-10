let token = '';

function setToken() {
    token = document.getElementById('token').value
}

async function createHost() {
    const hostname = prompt('Enter new hostname:')
    if (hostname) {
        try {
            const response = await fetch(`/host`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ hostname })
            })
            if (response.ok) {
                await fetchHosts();
            } else {
                console.error(`Failed to create host: ${await response.text()}`)
            }

        } catch (error) {
            console.error("Error creating host:", error)
        }
    } else {
        alert('Hostname is required to create a new host.')
    }
}

async function deleteHost(id) {
    const deletePrompt = confirm(`Delete host with ID: ${id}?`)
    if (deletePrompt) {
        try {
            const response = await fetch(`/host/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            })
            if (response.ok) {
                await fetchHosts();
            } else {
                console.error(`Failed to delete host: ${await response.text()}`);
            }

        } catch (error) {
            alert(`Error deleting host: ${error}`);
        }
    }
}

async function updateHost(id) {
    const newHostname = prompt(`Please enter a new hostname for ID ${id}:`)
    if (newHostname) {
        try {
            const response = await fetch(`/host/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ hostname: newHostname })
            })
            if (response.ok) {
                await fetchHosts()
            } else {
                console.error(`Failed to update host: ${await response.text()}`)
            }

        } catch (error) {
            console.error("Error updating host:", error)
        }
    } else {
        alert('Please enter a hostname to update.')
    }
}

async function fetchHosts() {
    try {
        const response = await fetch(`/host`, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        const hosts = await response.json()
        const hostList = document.getElementById('hostList')
        hostList.innerHTML = ''
        hosts.forEach(host => {                                                                     //iterates through each element in hosts array
            const hostDiv = document.createElement('div')
            hostDiv.innerHTML = `<span>ID: ${host.id}, Hostname: ${host.hostname}</span>
                             <button onclick="deleteHost(${host.id})" class="btn btn-danger">Delete</button>
                             <button onclick="updateHost(${host.id})" class="btn btn-warning">Edit</button><hr>`
            hostList.appendChild(hostDiv)                                                                                                   //setTimeout?
        })
    } catch (error) {
        console.error("Error getting list of hosts.", error)
    }
}

setInterval(()=> fetchHosts(), 2000)