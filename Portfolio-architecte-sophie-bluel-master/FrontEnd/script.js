let listWorks = fetch('http://loclhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })    



