const newsList = document.getElementById("news-list");

if (newsList) {

  if (newsData.length === 0) {

    newsList.innerHTML = `
      <p class="no-news">
        現在お知らせはありません。
      </p>
    `;

  } else {

    newsData.slice(0, 4).forEach(news => {

      const item = document.createElement("a");

      item.href = news.url;
      item.className = "news-item";

      item.innerHTML = `
        <time>${news.date}</time>
        <span>${news.title}</span>
      `;

      newsList.appendChild(item);

    });

  }

}

// =========================
// HOME GALLERY
// =========================

const homeGalleryGrid =
  document.getElementById("home-gallery-grid");

if (homeGalleryGrid) {

  if (galleryData.length === 0) {

    homeGalleryGrid.innerHTML = `
      <p class="gallery-empty-home">
        現在写真はありません。
      </p>
    `;

  } else {

    galleryData.slice(0, 6).forEach(photo => {

      const link = document.createElement("a");

      link.href = "gallery.html";
      link.className = "home-gallery-item";

      link.innerHTML = `
        <img
          src="${photo.image}"
          alt="${photo.alt}"
        >
      `;

      homeGalleryGrid.appendChild(link);

    });

  }

}
