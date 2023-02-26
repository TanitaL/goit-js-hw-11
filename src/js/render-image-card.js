const imagesContainer = document.querySelector(".gallery");

export default function renderImageCard(image) { 
    const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads
    } = image;
      const imageCard = `
          <div class="photo-card">
            <a class="photo-card-link" href="${largeImageURL}">
                <img class="photo-card-img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
            </a>
            <div class="info">
              <p class="info-item"><b>Likes</b>&nbsp;${likes}</p>
              <p class="info-item"><b>Views</b>&nbsp;${views}</p>
              <p class="info-item"><b>Comments</b>&nbsp;${comments}</p>
              <p class="info-item"><b>Downloads</b>&nbsp;${downloads}</p>
            </div>
          </div>
      `;

    imagesContainer.insertAdjacentHTML('beforeend', imageCard)
}

