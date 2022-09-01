// Add imports above this line
import { galleryItems } from './gallery-items';

import SimpleLightBox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryBox = document.querySelector('.gallery');
const galleryList = createGalleryLightBox(galleryItems);
galleryBox.insertAdjacentHTML('beforeend', galleryList);

function createGalleryLightBox(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
    })
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionPosition: 'top',
  captionsData: 'alt',
  captionDelay: 250,
  enableKeyboard: true,
  close: false,
  fadeSpeed: 300,
  overlayOpacity: 0.5,
});
