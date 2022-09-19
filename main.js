const main = document.querySelector("main");

let url =
  "https://newsapi.org/v2/everything?" +
  "q=climate&" +
  "from=2022-09-10&" +
  "sortBy=popularity&" +
  "apiKey=1150fa9d1b774b93b2f3b55abe77fb16";

let req = new Request(url);

function displayData(data) {
  for (let i = 0; i < 10; i++) {
    // Get article
    const article = data.articles[i];

    // Create article HTML skeleton
    const articleEle = document.createElement("article");
    const a = document.createElement("a");
    // Heading
    const h2Title = document.createElement("h2");
    const pAuthor = document.createElement("p");
    const img = document.createElement("img");
    const pDescription = document.createElement("p");
    // Content
    const pContent = document.createElement("p");
    // Footer
    const pSource = document.createElement("p");
    const pReadMore = document.createElement("p");

    // Add article content to skelton
    h2Title.innerText = article.title;
    pAuthor.innerText = article.author;
    img.setAttribute("src", article.urlToImage);
    img.setAttribute("alt", article.title);
    pDescription.innerText = article.description;
    pContent.innerText = article.content;
    pSource.innerText = article.source.name;
    a.setAttribute("href", article.url);
    pReadMore.innerText = "Read More";

    main.append(articleEle);
    articleEle.append(a);
    a.append(h2Title, pAuthor, img, pDescription, pContent, pSource, pReadMore);
    console.log(h2Title);
  }
}

const form = document.querySelector("form");

// Create Event listener

form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(req)
    .then((response) => response.json())
    .then(displayData);
});
