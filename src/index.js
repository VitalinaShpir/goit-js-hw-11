import { fetchImages } from './js/fetchImg';
import {createImageList} from './js/createImgList';
import Notiflix from 'notiflix';
import { throttle } from 'lodash';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';


const searchForm = document.querySelector('#search-form');
const searchFormInput = document.querySelector('#search-form input');
const galleryBox = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const searchButton = document.querySelector('.search-button');

console.log(searchFormInput)


loadMoreButton.style.display = 'none';
// searchButton.disabled = true;

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
      onItemsClick('.gallery__link');
    

      gallery.refresh();
      page += 1;
    }
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong');
    console.error(error);
  }
};

function onItemsClick(items){
    document.querySelectorAll(items).forEach(item => {
      item.addEventListener('click', event => event.preventDefault());
    });
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
    reachEnd = false;
    isGalleryEnded = false;
    page = 1;

    if (data.totalHits > 40) {
      page += 1;
    }

    const links = createImageList(data.hits);
    galleryBox.innerHTML = links;
    onItemsClick('.gallery__link');

      gallery = initSliderLightBox();
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong');
    console.error(error);
  }
}

searchForm.addEventListener('submit', searchImage);
addEventListener(
  'scroll', throttle(() => {
    if (window.scrollY + innerHeight >= galleryBox.scrollHeight) {
      addImage();
      reachEnd = true;
    } else reachEnd = false;
  }, 500)
);


function initSliderLightBox() {
  const gallery = new SimpleLightbox("#gallery", {captionsData: 'alt', captionDelay: 250 });
   
     return gallery;
   }
   



   console.log('hel111lo')

