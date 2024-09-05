function updateLoginStatus () {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
        var removeDisplay = document.getElementById("edition-mode");
        if (removeDisplay) {
            removeDisplay.style.display = removeDisplay.style.display === 'none' ? '' : 'none';
        }
        
        var headerLogin = document.querySelector('header');
        headerLogin.classList.add('header-login');
    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('logout').style.display = 'none';
    }
}

function modifyIfToken () {

    if (window.location.pathname.includes('index.html')) {
        return; 
    }
    
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('mybtn').style.display = 'block';
    } else {
        document.getElementById('mybtn').style.display = 'none';
    }
}

function logout () {
    const logout = document.getElementById('logout');
    logout.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.clear();
        window.location = 'index.html';
    });
}
    

updateLoginStatus();
logout();
modifyIfToken();