// constant to use the div app inside the index.html
const app = document.getElementById("app");

// Define a function named ajaxGet that takes two parameters: url (string) and callback (function)
function ajaxGet(url, callback) {
  // Create a new instance of XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Define an event listener for the state change of the XMLHttpRequest object
  xhr.onreadystatechange = function () {
    // Check if the readyState of the XMLHttpRequest object is DONE
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // If the status of the XMLHttpRequest object is 200 (successful), execute the callback function with the response text as an argument
      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        // If the status is not 200, log an error message with the status code
        console.error("Error fetching data:", xhr.status);
      }
    }
  };

  // Initialize the request with the HTTP GET method, the provided URL, and asynchronous flag set to true
  xhr.open("GET", url, true);

  // Send the XMLHttpRequest
  xhr.send();
}

// 👀 new skins start
function createSkinCards(
  imageAddress,
  skinName,
  skinModel,
  skinPrice,
  skinMotto
) {
  // 👉 creating image
  const image = document.createElement("img");
  image.style.width = "100px";
  image.style.height = "100px";
  image.src = imageAddress;

  // 👉 creating name paragraph
  const nameElement = document.createElement("h2");
  nameElement.innerHTML = skinName;

  // 👉 creating skin model element
  const modelElement = document.createElement("h3");
  modelElement.innerHTML = skinModel;

  // 👉 creating skin price element
  const priceElement = document.createElement("h3");
  priceElement.innerHTML = skinPrice;

  // 👉 creating skin motto element
  const mottoElement = document.createElement("h3");
  mottoElement.innerHTML = skinMotto;

  // 👉 creating card
  const card = document.createElement("div");
  card.classList.add("skin-card");
  card.appendChild(image);
  card.appendChild(nameElement);
  card.appendChild(modelElement);
  card.appendChild(priceElement);
  card.appendChild(mottoElement);
  return card;
}

function loadNewSkinPage() {
  document.getElementById("app-footer").style.display = "unset";
  // 👉 creating skin cards container
  const skinCardsContainer = document.createElement("div");
  skinCardsContainer.classList.add("skin-card-container");

  // 👉 fetch cards data
  // Fetch JSON data from the specified URL ("/json/new-skins.json")
  fetch("/json/new-skins.json")
    // When the response is received, parse it as JSON
    .then((res) => res.json())
    // Once the JSON data is parsed, handle it in the next 'then' block
    .then((res) => {
      // Check if the response is valid JSON and is an array
      if (!res || !Array.isArray(res)) return;
      // Iterate over each item in the array
      res.forEach((item) => {
        // Create a skin card using the provided data and a function called 'createSkinCards'
        const card = createSkinCards(
          item.image,
          item.name,
          item.model,
          item.price,
          item.motto
        );
        // Append the created skin card to the 'skinCardsContainer'
        skinCardsContainer.appendChild(card);
      });
    })
    // Catch any errors that occur during the fetching or processing of JSON data
    .catch((err) => {});

  // Append the 'skinCardsContainer' to the 'app' element in the DOM
  app.appendChild(skinCardsContainer);
}
// 👀 new skins end

// 👀 new items start
function createItemCards(
  imageAddress,
  itemName,
  itemModel,
  itemPrice,
  itemMotto
) {
  // 👉 creating image
  const image = document.createElement("img");
  image.style.width = "100px";
  image.style.height = "100px";
  image.src = imageAddress;

  // 👉 creating name paragraph
  const nameElement = document.createElement("h2");
  nameElement.innerHTML = itemName;

  // 👉 creating skin model element
  const modelElement = document.createElement("h3");
  modelElement.innerHTML = itemModel;

  // 👉 creating skin price element
  const priceElement = document.createElement("h3");
  priceElement.innerHTML = itemPrice;

  // 👉 creating skin motto element
  const mottoElement = document.createElement("h3");
  mottoElement.innerHTML = itemMotto;

  // 👉 creating card
  const card = document.createElement("div");
  card.classList.add("item-card");
  card.appendChild(image);
  card.appendChild(nameElement);
  card.appendChild(modelElement);
  card.appendChild(priceElement);
  card.appendChild(mottoElement);
  return card;
}

function loadNewItemPage() {
  document.getElementById("app-footer").style.display = "unset";
  // 👉 creating skin cards container
  const itemCardsContainer = document.createElement("div");
  itemCardsContainer.classList.add("item-card-container");

  // 👉 fetch cards data
  fetch("/json/new-items.json")
    .then((res) => res.json())
    .then((res) => {
      if (!res || !Array.isArray(res)) return;
      res.forEach((item) => {
        const card = createItemCards(
          item.image,
          item.name,
          item.model,
          item.price,
          item.motto
        );
        itemCardsContainer.appendChild(card);
      });
    })
    .catch((err) => {});

  app.appendChild(itemCardsContainer);
}
// 👀 new items ends

// 👀 news start
// Updated loadNewsPage function using ajaxGet
function loadNewsPage() {
  document.getElementById("app-footer").style.display = "none";
  const newsContainer = document.createElement("div");
  newsContainer.classList.add("news-container");

  ajaxGet("/news", function (response) {
    newsContainer.innerHTML = response;
    app.appendChild(newsContainer);
  });
}
// 👀 news end

// 👀 chapter-info start
// Updated loadChapterInfoPage function using ajaxGet
function loadChapterInfoPage() {
  document.getElementById("app-footer").style.display = "none";
  const chapterInfoContainer = document.createElement("div");
  chapterInfoContainer.classList.add("chapter-info-container");

  ajaxGet("/chapter-information", function (response) {
    chapterInfoContainer.innerHTML = response;
    app.appendChild(chapterInfoContainer);
  });
}
// 👀 chapter-info start

function pageToRender(page) {
  app.innerHTML = "";
  if (page.toLowerCase() === "new-skin") loadNewSkinPage();
  else if (page.toLowerCase() === "news") loadNewsPage();
  else if (page.toLowerCase() === "new-item") loadNewItemPage();
  else if (page.toLowerCase() === "chapter-info") loadChapterInfoPage();
}
