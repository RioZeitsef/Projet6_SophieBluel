function updateLoginStatus () {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('logout').style.display = 'none';
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