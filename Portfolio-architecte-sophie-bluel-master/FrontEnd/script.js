

// let listWorks = fetch('http://localhost:5678/api/works')
//     .then(response => response.json())
//     .then(data => {
//         maVariable = data;
//         console.log(data);
//     })    


let works = [{"id":1,"title":"Abajour Tahina","imageUrl":"http://localhost:5678/images/abajour-tahina1651286843956.png","categoryId":1,"userId":1,"category":{"id":1,"name":"Objets"}},
{"id":2,"title":"Appartement Paris V","imageUrl":"http://localhost:5678/images/appartement-paris-v1651287270508.png","categoryId":2,"userId":1,"category":{"id":2,"name":"Appartements"}},
{"id":3,"title":"Restaurant Sushisen - Londres","imageUrl":"http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png","categoryId":3,"userId":1,"category":{"id":3,"name":"Hotels & restaurants"}},
{"id":4,"title":"Villa “La Balisiere” - Port Louis","imageUrl":"http://localhost:5678/images/la-balisiere1651287350102.png","categoryId":2,"userId":1,"category":{"id":2,"name":"Appartements"}},
{"id":5,"title":"Structures Thermopolis","imageUrl":"http://localhost:5678/images/structures-thermopolis1651287380258.png","categoryId":1,"userId":1,"category":{"id":1,"name":"Objets"}},
{"id":6,"title":"Appartement Paris X","imageUrl":"http://localhost:5678/images/appartement-paris-x1651287435459.png","categoryId":2,"userId":1,"category":{"id":2,"name":"Appartements"}},
{"id":7,"title":"Pavillon “Le coteau” - Cassis","imageUrl":"http://localhost:5678/images/le-coteau-cassis1651287469876.png","categoryId":2,"userId":1,"category":{"id":2,"name":"Appartements"}},
{"id":8,"title":"Villa Ferneze - Isola d’Elba","imageUrl":"http://localhost:5678/images/villa-ferneze1651287511604.png","categoryId":2,"userId":1,"category":{"id":2,"name":"Appartements"}},
{"id":9,"title":"Appartement Paris XVIII","imageUrl":"http://localhost:5678/images/appartement-paris-xviii1651287541053.png","categoryId":2,"userId":1,"category":{"id":2,"name":"Appartements"}},
{"id":10,"title":"Bar “Lullaby” - Paris","imageUrl":"http://localhost:5678/images/bar-lullaby-paris1651287567130.png","categoryId":3,"userId":1,"category":{"id":3,"name":"Hotels & restaurants"}},
{"id":11,"title":"Hotel First Arte - New Delhi","imageUrl":"http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png","categoryId":3,"userId":1,"category":{"id":3,"name":"Hotels & restaurants"}},];

function displayWorks() {
    let worksGallery = document.querySelector('#portfolio .gallery');
        // Ajout de chaque travail du tableau 'works' à worksGallery
        for (let work of works) {
            // Créer une nouvelle balise 'figure'
            let figure = document.createElement('figure');
    
            // Créer une nouvelle balise 'img' et définissez son 'src' et 'alt'
            let img = document.createElement('img');
            img.src = work.imageUrl;
            img.alt = work.title;
    
            // Créer une nouvelle balise 'figcaption' et définissez son texte
            let figcaption = document.createElement('figcaption');
            figcaption.textContent = work.title;
    
            // Ajout de l''img' et 'figcaption' à 'figure'
            figure.appendChild(img);
            figure.appendChild(figcaption);
    
            // Ajout de la 'figure' à 'worksGallery'
            worksGallery.appendChild(figure);
        }

}

// Séléction de la section 'portfolio' et de l'élément 'h2'
const portfolioSection = document.getElementById('portfolio');
const h2Element = portfolioSection.querySelector('h2');
  
// Création du bouton 'Tous' et ajout d'un écouteur d'événements
const buttonAll = document.createElement('button');
buttonAll.textContent = 'Tous';
buttonAll.addEventListener('click', () => filterWorks(0));
    
portfolioSection.insertBefore(buttonAll, h2Element.nextSibling);
  
// Fonction pour filtrer et afficher les travaux
function filterWorks(categoryId) {
    const gallery = portfolioSection.querySelector('.gallery');
    gallery.innerHTML = ''; // Nettoyer la galerie
  
    const filteredWorks = categoryId === 0 ? works : works.filter(work => work.category.id === categoryId);
  
    filteredWorks.forEach(work => {
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;
        gallery.appendChild(img);
    });
}
  
// création des boutons de filtre de manière dynamique
const categories = Array.from(new Set(works.map(work => work.category.id)))
    .map(id => works.find(work => work.category.id === id).category);
  
categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category.name;
    button.dataset.categoryId = category.id;
    button.addEventListener('click', () => filterWorks(category.id));
    portfolioSection.insertBefore(button, h2Element.nextSibling.nextSibling);
});
  
filterWorks(0);
displayWorks(works);