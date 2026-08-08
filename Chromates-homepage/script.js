// =========================
// NEWS
// =========================

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
// SCHEDULE SYSTEM
// =========================

// 日付順
const sortedScheduleData = [...scheduleData].sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);


// 今日
const today = new Date();
today.setHours(0, 0, 0, 0);


// 今日以降の予定だけ
const upcomingScheduleData =
  sortedScheduleData.filter(item => {

    const eventDate =
      new Date(`${item.date}T00:00:00`);

    return eventDate >= today;

  });


// =========================
// NEXT ACTIVITY
// =========================

const nextActivity =
  document.getElementById("next-activity");

if (nextActivity) {

  if (upcomingScheduleData.length === 0) {

    nextActivity.innerHTML = `
      <p class="next-label">
        NEXT ACTIVITY
      </p>

      <div class="next-date">
        TBA
      </div>

      <div class="next-line"></div>

      <strong>
        COMING SOON
      </strong>

      <p>
        次回の活動日は現在調整中です。
      </p>

      <a
        href="#schedule"
        class="outline-button"
      >
        SCHEDULE →
      </a>
    `;

  } else {

    const next =
      upcomingScheduleData[0];

    const date =
      new Date(`${next.date}T00:00:00`);

    const month =
      String(date.getMonth() + 1)
        .padStart(2, "0");

    const day =
      String(date.getDate())
        .padStart(2, "0");

    nextActivity.innerHTML = `
      <p class="next-label">
        NEXT ACTIVITY
      </p>

      <div class="next-date">
        ${month}.${day}
        <span>${next.day}</span>
      </div>

      <div class="next-line"></div>

      <strong>
        ${next.time}
      </strong>

      <p>
        ${next.place}
      </p>

      <a
        href="#schedule"
        class="outline-button"
      >
        詳しく見る →
      </a>
    `;

  }

}


// =========================
// NEXT SCHEDULE
// =========================

const scheduleList =
  document.getElementById("schedule-list");

if (scheduleList) {

  if (upcomingScheduleData.length === 0) {

    scheduleList.innerHTML = `
      <div class="schedule-empty">

        <p>
          現在予定はありません。
        </p>

        <span>
          次回活動日は決まり次第お知らせします。
        </span>

      </div>
    `;

  } else {

    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];

    upcomingScheduleData
      .slice(0, 3)
      .forEach(item => {

        const date =
          new Date(`${item.date}T00:00:00`);

        const day =
          String(date.getDate())
            .padStart(2, "0");

        const month =
          monthNames[date.getMonth()];

        const card =
          document.createElement("div");

        card.className =
          "schedule-card";

        card.innerHTML = `
          <div class="schedule-date">

            <strong>
              ${day}
            </strong>

            <span>
              ${month}
            </span>

          </div>

          <div class="schedule-info">

            <div class="schedule-top">

              <span class="schedule-type ${item.type.toLowerCase()}">
                ${item.type}
              </span>

              <span class="schedule-day">
                ${item.day}
              </span>

            </div>

            <h3>
              ${item.title}
            </h3>

            <p class="schedule-time">
              ${item.time}
            </p>

            <p class="schedule-place">
              ${item.place}
            </p>

          </div>
        `;

        scheduleList.appendChild(card);

      });

  }

}


// =========================
// CALENDAR
// =========================

const calendarGrid =
  document.getElementById("calendar-grid");

if (calendarGrid) {

  const now =
    new Date();

  const year =
    now.getFullYear();

  const month =
    now.getMonth();


  // 月名
  const calendarMonth =
    document.getElementById("calendar-month");

  const monthNamesFull = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
  ];

  if (calendarMonth) {
    calendarMonth.innerHTML = `
      ${monthNamesFull[month]}
      <span>${year}</span>
    `;
  }


  // 月の日数
  const firstDay =
    new Date(year, month, 1);

  const lastDay =
    new Date(year, month + 1, 0);

  const daysInMonth =
    lastDay.getDate();


  // 月曜日スタート
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

    name.textContent =
      day;

    calendarGrid.appendChild(name);

  });


  // 月初の空白
  for (
    let i = 0;
    i < startDay;
    i++
  ) {

    const empty =
      document.createElement("div");

    empty.className =
      "calendar-day empty";

    calendarGrid.appendChild(empty);

  }


  // 各日
  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {

    const cell =
      document.createElement("div");

    cell.className =
      "calendar-day";


    const number =
      document.createElement("span");

    number.className =
      "day-number";

    number.textContent =
      day;

    cell.appendChild(number);


    const dateString =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


    // 同日の予定すべて
    const activities =
      sortedScheduleData.filter(
        item => item.date === dateString
      );


    activities.forEach(activity => {

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

      const startTime =
        activity.time
          .split(" - ")[0];

      event.innerHTML = `
        <strong>
          ${activity.type}
        </strong>

        <span>
          ${startTime}
        </span>
      `;

      cell.appendChild(event);

    });


    calendarGrid.appendChild(cell);

  }

}
