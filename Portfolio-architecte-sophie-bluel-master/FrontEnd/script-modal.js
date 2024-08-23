document.addEventListener("DOMContentLoaded", () => {
  getWorks();
  fetchCategories();
});


// création de la modale et de ses boutons de navigation / suppresion
var modal1 = document.getElementById("modal1");
var modal2 = document.getElementById("modal2");
var btn = document.getElementById("mybtn");
var span = document.getElementsByClassName("modalclose");
var addPhotos = document.getElementById("addPhotos");
var arrowBack = document.getElementById("modalBack");

btn.onclick = function () {
  modal1.style.display = "block";
};

for (var i = 0; i < span.length; i++) {
  span[i].addEventListener("click", function () {
    modal1.style.display = "none";
    modal2.style.display = "none";
    resetForm();
  });
}

arrowBack.onclick = function () {
  modal2.style.display = "none";
  modal1.style.display = "block";
  resetForm();
};

addPhotos.onclick = function () {
  modal1.style.display = "none";
  modal2.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal1 || event.target == modal2) {
    modal1.style.display = "none";
    modal2.style.display = "none";
    resetForm();
  }
};

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    modal1.style.display = "none";
    modal2.style.display = "none";
  }
});

// Reset du formulaire lorsque modalBack, modalClose ou window.onclick est appelé
function resetForm() {
  document.getElementById("uploadForm").reset();
  document.getElementById("backgroundPhotos").innerHTML = `
    <span><i class="fa-regular fa-image fa-2xl"></i></span>
    <button id="uploadButton" class="btn-upload" type="button">+ Ajouter photo</button>
    <p>jpg. png : 4mo max</p>
    <input type="file" id="image_uploads" name="image_uploads" accept="image/*" style="display: none;">
  `;
  photosInBackground();
}

// Ajout & suppression des images dans la modale

//Appel à l'API "Works" pour récupérer les images
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((images) => {
    const modal = document.querySelector(".js-modal");
    const addButton = document.getElementById("addPhotos");

    const imagesContainer = document.createElement("div");
    imagesContainer.className = "images-container";

    // Pour chaque image que j'intègre dans une div pour intégrer le bouton de suppression également
    images.forEach((image) => {
      const imgWrapper = document.createElement("div");
      imgWrapper.className = "image-wrapper";

      const imgElement = document.createElement("img");
      imgElement.src = image.imageUrl;

      const hiddenDeleteButton = document.getElementById("delete-button");
      const deleteButton = hiddenDeleteButton.cloneNode(true); // Crée le bouton de suppression
      deleteButton.style.display = "block";

      deleteButton.onclick = function () {
        const id = image.id;
        const token = localStorage.getItem("token");
        fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              imgWrapper.remove();
            } else {
              alert(
                "Une erreur est survenue lors de la suppression de l'image"
              );
            }
          })
          .catch((error) => {
            console.error("Erreur lors de la suppression de l'image:", error);
          });
      };
      imagesContainer.appendChild(imgWrapper);
      imgWrapper.appendChild(deleteButton);
      imgWrapper.appendChild(imgElement);
    });

    modal.insertBefore(imagesContainer, addButton);
  })
  .catch((error) =>
    console.error("Erreur lors de la récupération des images:", error)
  );

// récupération des catégories pour l'ajout d'images dans la biblio

function fetchCategories() {
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      const categorySelect = document.getElementById("category");
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des catégories:", error);
    });
}

// liaison de l'input au bouton d'ajout + apparition de l'image dynamiquement après avoir choisi le fichier
function photosInBackground() {
  document.getElementById("uploadButton").addEventListener("click", function () {
      document.getElementById("image_uploads").click();
  });

  document.getElementById("image_uploads").addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
          const imgURL = URL.createObjectURL(file);

          const img = document.createElement("img");
          img.setAttribute("id", "image_uploads");
          img.src = imgURL;

          const container = document.getElementById("backgroundPhotos");
          container.innerHTML = "";
          container.appendChild(img);
          img.style.display = "block";

          img.onload = function () {
              URL.revokeObjectURL(imgURL);
          };
      }
  });
}


// application de la methode POST sur le bouton Valider

document.getElementById("uploadForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const imageInput = document.getElementById("image_uploads");
  

  if (!title || !category || !imageInput) {
    console.log(title, category, imageInput);
    alert("Veuillez remplir tous les champs");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("categoryId", category);
  formData.append("imageUrl", imageInput.src);

  const token = localStorage.getItem("token");

  console.log(title, category, imageInput.src);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        document.getElementById("modal2").style.display = "none";
        document.getElementById("modal1").style.display = "block";
        return response.json(); 
     } else {
      return response.json().then((data) => {
        throw new Error(data.message || "Erreur inconnue");
      });
     }
    })
    .then((data) => {
      console.log("Image ajoutée avec succès:", data.imageUrl);
      alert("Téléchargement réussi");
      document.getElementById("modal2").style.display = "none";
    })
    .catch((error) => {
      console.error("Erreur lors du téléchargement de l'image:", error);
      alert("Une erreur est survenue lors du téléchargement de l'image");
    });
});

photosInBackground();