export function createImageList(images) {
    return images
      .map(image => {
        return `
              <a href="${image.webformatURL}" class="gallery__link">
                  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" data-source="${image.largeImageURL}" />
                  <div class="info">
                      <p class="info-item">
                          <b>Likes</b>
                          ${image.likes}
                      </p>
                      <p class="info-item">
                          <b>Views</b>
                          ${image.views}
                      </p>
                      <p class="info-item">
                          <b>Comments</b>
                          ${image.comments}
                      </p>
                      <p class="info-item">
                          <b>Downloads</b>
                          ${image.downloads}
                      </p>
                  </div>
              </a>
          `;
      })
      .join('');
  }
  