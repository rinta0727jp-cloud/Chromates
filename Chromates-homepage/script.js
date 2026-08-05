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

// =========================
// CALENDAR
// =========================

const calendarGrid =
  document.getElementById("calendar-grid");

if (calendarGrid) {

  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay =
    new Date(year, month, 1);

  const lastDay =
    new Date(year, month + 1, 0);

  const daysInMonth =
    lastDay.getDate();

  const startDay =
    (firstDay.getDay() + 6) % 7;


  const dayNames = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN"
  ];


  // 曜日
  dayNames.forEach(day => {

    const name =
      document.createElement("div");

    name.className =
      "calendar-day-name";

    name.textContent = day;

    calendarGrid.appendChild(name);

  });


  // 月初の空欄
  for (let i = 0; i < startDay; i++) {

    const empty =
      document.createElement("div");

    empty.className =
      "calendar-day empty";

    calendarGrid.appendChild(empty);

  }


  // 日付
  for (let day = 1; day <= daysInMonth; day++) {

    const cell =
      document.createElement("div");

    cell.className =
      "calendar-day";


    const number =
      document.createElement("span");

    number.className =
      "day-number";

    number.textContent = day;

    cell.appendChild(number);


    // この日の予定を探す
    const dateString =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const activity =
      scheduleData.find(item =>
        item.date === dateString
      );


    if (activity) {

      cell.classList.add(
        "activity-day"
      );

      const type =
        activity.type.toLowerCase();

      cell.classList.add(
        `${type}-day`
      );


      const event =
        document.createElement("div");

      event.className =
        "calendar-event";

      event.innerHTML = `
        <strong>${activity.type}</strong>
        <span>${activity.time.split(" - ")[0]}</span>
      `;

      cell.appendChild(event);

    }


    calendarGrid.appendChild(cell);

  }

}
