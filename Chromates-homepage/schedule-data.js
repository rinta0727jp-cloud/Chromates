const scheduleData = [];

// =========================
// NEXT ACTIVITY
// =========================

const nextActivity =
  document.getElementById("next-activity");

if (nextActivity) {

  if (scheduleData.length === 0) {

    nextActivity.innerHTML = `
      <p class="next-label">NEXT ACTIVITY</p>

      <div class="next-date">
        TBA
      </div>

      <div class="next-line"></div>

      <strong>COMING SOON</strong>

      <p>次回の活動日は現在調整中です。</p>

      <a href="#schedule" class="outline-button">
        SCHEDULE →
      </a>
    `;

  } else {

    const next = scheduleData[0];

    const date = new Date(next.date);

    const month =
      String(date.getMonth() + 1).padStart(2, "0");

    const day =
      String(date.getDate()).padStart(2, "0");

    nextActivity.innerHTML = `
      <p class="next-label">NEXT ACTIVITY</p>

      <div class="next-date">
        ${month}.${day}
        <span>${next.day}</span>
      </div>

      <div class="next-line"></div>

      <strong>${next.time}</strong>

      <p>${next.place}</p>

      <a href="#schedule" class="outline-button">
        詳しく見る →
      </a>
    `;

  }

}
