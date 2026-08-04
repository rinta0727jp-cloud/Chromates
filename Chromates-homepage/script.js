// JavaScript template using Windows Script Host
var WSHShell = WScript.CreateObject("WScript.Shell");
WSHShell.Popup( "Hello World!" );

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
