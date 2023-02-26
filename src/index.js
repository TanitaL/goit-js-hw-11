import SearchApiService from "./js/search-api-service";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import renderImageCard from "./js/render-image-card";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector("#search-form");
const loadMoreBtn = document.querySelector(".load-more");
const imagesContainer = document.querySelector(".gallery");
const input = document.querySelector("[name='searchQuery']")

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);

const searchApi = new SearchApiService();
let lightbox = new SimpleLightbox('.photo-card .photo-card-link', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

function onFormSubmit(event) {
    event.preventDefault();

    const inputValue = input.value.trim();

    searchApi.changeSearchName(inputValue);

    clearImagesContainer();

    searchApi.resetPage();

    if (inputValue) {
        searchApi.getImages()
        .then(images => {
            Notify.success(`Hooray! We found ${images.totalHits} images.`);
            const imagesHits = images.hits;
            imagesHits.map(hit => { 
                renderImageCard(hit)
            })

            lightbox.refresh();
            loadMoreBtnShow();
        })
        .catch(() => {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        });
    } else { 
            Notify.warning("Please, enter a search word");

    }
    
}

function clearImagesContainer() {
    imagesContainer.innerHTML = "";
}

function loadMoreBtnHide() { 
    loadMoreBtn.style.display = "none"
};

function loadMoreBtnShow() { 
    loadMoreBtn.style.display = "block"
}

function onLoadMore() { 
    searchApi.getImages()
        .then(images => {
            const imagesHits = images.hits;
            imagesHits.map(hit => { 
                renderImageCard(hit)
            })
            
            lightbox.refresh();

            const { height: cardHeight } = imagesContainer.firstElementChild.getBoundingClientRect();

            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });

        })
        .catch(() => {
            Notify.info("We're sorry, but you've reached the end of search results.");
            loadMoreBtnHide();
        });
}


