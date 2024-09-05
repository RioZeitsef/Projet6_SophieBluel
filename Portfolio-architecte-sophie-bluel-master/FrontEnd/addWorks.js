let _works = [];
let _categories = [];

function getWorks() {
  fetch("http://localhost:5678/api/works")
    .then((resp) => resp.json())
    .then((works) => {
      _works.push(...works);
      displayWorks(works);
      initCategories(works);
    });
}

  // Fonction pour filtrer les travaux
  function filterWorks(categoryId) {
    return categoryId === 0
      ? _works
      : _works.filter((work) => work.category.id === categoryId);
  }

function createButton(text, onClick) {
  const button = document.createElement("button");
  button.setAttribute("class", "buttonBase");
  let divButton = document.createElement("div");
  divButton.classList.add("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function createCategorieButton(categories) {
  const portfolioSection = document.getElementById("portfolio");
  const h2Element = portfolioSection.querySelector("h2");
  const buttonsDiv = document.createElement("div");
  buttonsDiv.setAttribute("id", "categories-buttons");
  if (window.location.pathname.includes('projects.html')) {
    return; 
  }
  portfolioSection.insertBefore(buttonsDiv, h2Element.nextSibling);
  // Fonction pour définir le bouton actif
function setActiveButton(activeButton) {
  const buttons = buttonsDiv.querySelectorAll("button");
  buttons.forEach(button => {
    button.classList.remove("active");
  });
  activeButton.classList.add("active");
}
  // Création du bouton "Tous"
   const buttonAll = createButton("Tous", () => {
    displayWorks(filterWorks(0));
    setActiveButton(buttonAll);
  });
  buttonsDiv.appendChild(buttonAll);

  document.addEventListener("DOMContentLoaded", () => {
    setActiveButton(buttonAll);
  });

  // Ajout des boutons de catégorie
  categories.forEach((category) => {
    const button = createButton(category.name, () => {
      displayWorks(filterWorks(category.id));
      setActiveButton(button);
    });
    buttonsDiv.appendChild(button);
  });
}

function initCategories(works) {
  _categories = Array.from(new Set(works.map((work) => work.category.id))).map(
    (id) => works.find((work) => work.category.id === id).category
  );
  createCategorieButton(_categories);
}

function displayWorks(listWorks, e = null) {
  if (e) {
    const buttons = document.querySelectorAll("#categories-buttons button");

    buttons.forEach((button) => {
      button.setAttribute("data-active", "false");
    });
    const btn = e.currentTarget;
    btn.setAttribute("data-active", "true");
  }
  const gallery = document.querySelector("#portfolio .gallery");
  gallery.innerHTML = "";
  listWorks.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

getWorks();
