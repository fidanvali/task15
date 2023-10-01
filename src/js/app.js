let uploadButton = document.getElementById("upload-button");
let container = document.querySelector(".container");
let error = document.getElementById("error");
let imageDisplay = document.getElementById("image-display");

const fileHandler = (file, name, type) => {
  if (type.split("/")[0] !== "image") {
    // Dosya türü hatası
    error.innerText = "Lütfen bir resim dosyası yükleyin";
    return false;
  }
  error.innerText = "";
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    // Resim ve dosya adı
    let imageContainer = document.createElement("figure");
    let img = document.createElement("img");
    img.src = reader.result;
    imageContainer.appendChild(img);
    let figcaption = document.createElement("figcaption");
    figcaption.innerText = name;
    imageContainer.appendChild(figcaption);
    imageDisplay.appendChild(imageContainer);
  };
};

// Yükleme düğmesi
uploadButton.addEventListener("change", () => {
  Array.from(uploadButton.files).forEach((file) => {
    fileHandler(file, file.name, file.type);
  });
});

container.addEventListener("dragenter", (e) => {
  e.preventDefault();
  e.stopPropagation();
  container.classList.add("active");
}, false);

container.addEventListener("dragleave", (e) => {
  e.preventDefault();
  e.stopPropagation();
  container.classList.remove("active");
}, false);

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
  container.classList.add("active");
}, false);

container.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  container.classList.remove("active");
  let draggedData = e.dataTransfer;
  let files = draggedData.files;

  Array.from(files).forEach((file) => {
    fileHandler(file, file.name, file.type);
  });
}, false);

window.onload = () => {
  error.innerText = "";
};
