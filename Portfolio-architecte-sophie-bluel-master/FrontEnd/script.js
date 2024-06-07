let _works = [];
let _categories = [];

function getWorks() {
    fetch('http://localhost:5678/api/works')
        .then(resp => resp.json())
        .then(works => {
            _works.push(...works);
            initCategories(works);
            displayWorks(works);
        });
}        

    function createButton(text, onClick) {
        const button = document.createElement('button');
        let divButton = document.createElement('div');
        divButton.classList.add('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    function createCategorieButton(categories) {
        const portfolioSection = document.getElementById('portfolio');
        const h2Element = portfolioSection.querySelector('h2');
        const buttonsDiv = document.createElement('div');
        buttonsDiv.setAttribute('id', 'catergories-buttons');
        portfolioSection.insertBefore(buttonsDiv, h2Element.nextSibling);

        const buttonAll = createButton('Tous', () => displayWorks(filterWorks(0)));
        buttonsDiv.appendChild(buttonAll);

        function filterWorks(categoryId) {
            return categoryId === 0 ? _works : _works.filter(work => work.category.id === categoryId);
    }

    categories.forEach(category => {
        const button = createButton(category.name, () => displayWorks(filterWorks(category.id)));
        buttonsDiv.appendChild(button);    
    });

}        

function initCategories(works) {
    _categories = Array.from(new Set(works.map(work => work.category.id)))
        .map(id => works.find(work => work.category.id === id).category);
    createCategorieButton(_categories);
}    


function displayWorks(listWorks) {
    const gallery = document.querySelector('#portfolio .gallery');
    gallery.innerHTML = '';
    listWorks.forEach(work => {
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

getWorks();