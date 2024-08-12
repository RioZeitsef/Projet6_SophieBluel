const loginForm = document.getElementById('loginform');
loginForm.addEventListener('submit', function(event) {
event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };

    const chargeUtile = JSON.stringify(loginData);

    // Envoi de la requête à l'API
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: chargeUtile
    })
    .then(response => {
        if (!response.ok) {
            console.log('Erreur de connexion');
            return response.json();
        }
        return response.json();
    })
    
    .then(data => {
console.log('Réponse de l\'API', data);
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location = 'index.html';
            window.location = 'projects.html';
            updateLoginStatus();
        } else {
            alert('Erreur de connexion');
        }
    })  
});