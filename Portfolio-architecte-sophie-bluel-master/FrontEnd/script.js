async function listWorks () {
    const response = await fetch('http://localhost:5678/api/works');
    return response.json();
}

async function init() {
    _works = await listWorks();

    console.log(listWorks());
    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    function filterWorks(categoryId) {
        return categoryId === 0 ? _works : _works.filter(work => work.category.id === categoryId);
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

displayWorks(_works);

}

init();