import galleryItems from "./gallery-items.js";

const ulGalleryRef = document.querySelector(".js-gallery");
const lightBoxRef = document.querySelector(".js-lightbox");
const lightBoxImgRef = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const modalOverlay = document.querySelector("div.lightbox__overlay");

const createGalleryItem = galleryItems
  .map(({ preview, original, description }, index) => {
    return `<li class="gallery__item">
        <a class="gallery__link"
          href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            data-index="${index}"/>
        </a>
      </li>`;
  })
  .join(``);

ulGalleryRef.insertAdjacentHTML("beforeend", createGalleryItem);

ulGalleryRef.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
window.addEventListener("keydown", closeModalEsc);
window.addEventListener("keydown", slideImg);

function openModal(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }

  const indexImg = e.target.dataset.index;

  lightBoxRef.classList.add("is-open");
  lightBoxImgRef.src = e.target.dataset.source;
  lightBoxImgRef.alt = e.target.alt;
  lightBoxImgRef.setAttribute("data-index", indexImg);
}

function closeModal() {
  lightBoxRef.classList.remove("is-open");
  lightBoxImgRef.src = "";
  lightBoxImgRef.alt = "";
  lightBoxImgRef.setAttribute("data-index", "");

  window.removeEventListener("keydown", closeModalEsc);
  window.removeEventListener("keydown", slideImg);
}

function closeModalEsc(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}

function slideImg(e) {
  let count = +lightBoxImgRef.dataset.index;
  const imgRefGlobalLength = ulGalleryRef.querySelectorAll(".gallery__image")
    .length;

  if (e.code === "ArrowRight" && count < imgRefGlobalLength - 1) {
    count += 1;
    lightBoxImgRef.src = galleryItems[count].original;
    lightBoxImgRef.alt = galleryItems[count].alt;
    lightBoxImgRef.setAttribute("data-index", count);
  }

  if (e.code === "ArrowLeft" && count > 0) {
    count -= 1;
    lightBoxImgRef.src = galleryItems[count].original;
    lightBoxImgRef.alt = galleryItems[count].alt;
    lightBoxImgRef.setAttribute("data-index", count);
  }
}
