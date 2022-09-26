let container = document.querySelector(".container");
const main = document.querySelector("main");
const form = document.querySelector("form");
let date = "from=2022-09-10&";
let q = "q=climate&";
const baseUrl = "https://newsapi.org/v2/everything?";
const apiKey = "apiKey=1150fa9d1b774b93b2f3b55abe77fb16";
const sortBy = "sortBy=popularity&";

// let url =
//   "https://newsapi.org/v2/everything?" +
//   "q=climate&" +
//   "from=2022-09-10&" +
//   "sortBy=popularity&" +
//   "apiKey=1150fa9d1b774b93b2f3b55abe77fb16";

let url = baseUrl + q + date + sortBy + apiKey;

// let req = new Request(url);

function displayData(data) {
  container = document.querySelector(".container");
  for (let i = 0; i < 10; i++) {
    // Get article
    const article = data.articles[i];
    console.log(article);
    // Create article HTML skeleton
    const articleEle = document.createElement("article");
    const a = document.createElement("a");
    // Heading
    const h3Title = document.createElement("h3");
    const pAuthor = document.createElement("p");
    const pDate = document.createElement("p");
    const img = document.createElement("img");
    const pDescription = document.createElement("p");
    // Content
    const pContent = document.createElement("p");
    // Footer
    const pSource = document.createElement("p");
    const pReadMore = document.createElement("p");

    // Add article content to skelton
    h3Title.innerText = article.title;
    pAuthor.innerText = "Author: " + article.author;
    pDate.innerText = "Date: " + article.publishedAt.slice(0, 10);
    img.setAttribute("src", article.urlToImage);
    img.setAttribute("alt", article.title);
    pDescription.innerText = article.description;
    pContent.innerHTML = article.content;
    pSource.innerHTML = `<strong>Source:</strong> ${article.source.name}`;
    a.setAttribute("href", article.url);
    pReadMore.innerText = "Read More";

    container.append(articleEle);
    // articleEle.append(a);
    articleEle.append(
      h3Title,
      pDescription,
      pAuthor,
      pDate,
      img,
      pContent,
      pSource,
      a
    );
    a.append(pReadMore);
    console.log(h3Title);
  }
}

// On page load:

fetch(url)
  .then((response) => response.json())
  .then(displayData);

// Create Event listener

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get date and topic from form
  let topic = document.querySelector("#search").value;
  console.log(topic);
  let date = document.querySelector("#date").value;
  const warning = document.querySelector(".warning p");
  // If no topic nor date, display error message
  if (!topic && !date) {
    // check if warning already exists, else do nothing
    if (!warning) {
      const pError = document.createElement("p");
      const eButton = document.createElement("button");
      pError.innerText = "Please input a search topic or date.";
      document.querySelector(".warning").append(pError, eButton);
      eButton.innerText = "Delete Error Message";
      eButton.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".warning").innerHTML = "";
      });
    }
  } else {
    // Update date and q
    // Clear the main page
    if (warning) {
      warning.remove();
    }
    main.innerHTML = `<h2>${topic} Top Climate News from ${date} to Today</h2>
  <div class="container"></div>`;

    changeURL(date, topic);
    console.log(url);
    // Make fetch request
    fetch(url)
      .then((response) => response.json())
      .then(displayData);
  }

  // Clear the input fields
  document.querySelector("#search").value = "";
  document.querySelector("#date").value = "";
});

function changeURL(dateEntered = "", topicEntered = "") {
  q = `q=climate+${topicEntered}&`;
  date = `from=${dateEntered}&`;
  url = baseUrl + q + date + sortBy + apiKey;
}

function displayDataAfterSearch(data, topic, date) {}
