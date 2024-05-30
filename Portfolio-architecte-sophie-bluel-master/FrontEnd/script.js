

async function listWorks (worksList) {
    const response = await fetch('http://localhost:5678/api/works');
    const worksList = await response.json();
    console.log(worksList);
}


let _works = [{"id":1,"title":"Abajour Tahina","imageUrl":"http://localhost:5678/images/abajour-tahina1651286843956.png","categoryId":1,"userId":1,"category":{"id":1,"name":"Objets"}},
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

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

function filterWorks(categoryId) {
    return categoryId === 0 ? _works : _works.filter(work => work.category.id === categoryId);
}

function displayWorks(_works) {
    const gallery = document.querySelector('#portfolio .gallery');
    gallery.innerHTML = '';
    _works.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

const portfolioSection = document.getElementById('portfolio');
const h2Element = portfolioSection.querySelector('h2');
const buttonAll = createButton('Tous', () => displayWorks(filterWorks(0)));
portfolioSection.insertBefore(buttonAll, h2Element.nextSibling);

const uniqueCategories = Array.from(new Set(_works.map(work => work.category.id)))
    .map(id => _works.find(work => work.category.id === id).category);
uniqueCategories.forEach(category => {
    const button = createButton(category.name, () => displayWorks(filterWorks(category.id)));
    portfolioSection.insertBefore(button, h2Element.nextSibling.nextSibling);
});