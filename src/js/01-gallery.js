// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';

// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line

import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
const parentItemsRef = document.body.querySelector('.gallery');
console.log('parentItemsRef:', parentItemsRef);

function galleryItemsMarkup(arrItems, parentRef) {
  const itemsMarkup = arrItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
                <a class="gallery__item" href="${original}">
                    <img class="gallery__image" src="${preview}" alt="${description}" />
                </a>
             </div>`;
    })
    .join('');

  return (parentRef.innerHTML = itemsMarkup);
}

galleryItemsMarkup(galleryItems, parentItemsRef);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(lightbox);
