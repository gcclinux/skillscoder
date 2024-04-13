function loginOrCreateUser() {
    var user = window.prompt("Please enter your username");
    if (user == null || user == "") {
        alert("User cancelled the prompt.");
    } else {
        var password = window.prompt("Please enter your password");
        if (password == null || password == "") {
            alert("Password prompt was cancelled.");
        } else {
            // Send the username and password to your server
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: user, password: password})
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Logged in successfully');
                } else {
                    alert('Failed to log in');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
}
loginOrCreateUser();