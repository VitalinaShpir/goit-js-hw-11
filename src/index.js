import { fetchImages } from './js/fetchImg';
import {createImageList} from './js/createImgList';
import Notiflix from 'notiflix';
import axios from 'axios';


const searchForm = document.querySelector('#search-form');
const searchFormInput = document.querySelector('#search-form input');
const galleryBox = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');


loadMoreButton.style.display = 'none';
let gallery;
let page = 1;
let query = '';
let reachEnd = false;
let isGalleryEnded = false;

async function addImage() {
  try {
    const response = await fetchImages(query, page);
    const { data } = response;
    if (!isGalleryEnded) {
      if (data.totalHits <= 40 * (page - 1) + data.hits.length && reachEnd) {
        if (data.totalHits >= 40)
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        isGalleryEnded = true;
        return;
      }

      const links = createImageList(data.hits);
      galleryBox.insertAdjacentHTML('beforeend', links);
      preventItemsClick('.gallery__link');

      gallery.refresh();

      page += 1;
    }
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong');
    console.error(error);
  }
}

async function searchImage(event) {
  event.preventDefault();

  try {
    const inputValue = searchFormInput.value.trim();
    const response = await fetchImages(inputValue);
    const { data } = response;

    if (data.hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

    query = inputValue;
    reach_end = false;
    isGalleryEnded = false;
    page = 1;

    if (data.totalHits > 40) {
      page += 1;
    }

    const links = createImageList(data.hits);

    galleryBox.innerHTML = links;
    preventItemsClick('.gallery__link');

    gallery = initSliderLightBox();
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong');
    console.error(error);
  }
}

searchForm.addEventListener('submit', searchImage);
addEventListener(
  'scroll',
  _.throttle(() => {
    if (window.scrollY + innerHeight >= galleryBox.scrollHeight) {
      addImage();
      reachEnd = true;
    } else reachEnd = false;
  }, 500)
);



console.log('hello')