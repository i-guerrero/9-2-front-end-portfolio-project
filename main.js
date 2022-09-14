let url =
  "https://newsapi.org/v2/everything?" +
  "q=Apple&" +
  "from=2022-09-10&" +
  "sortBy=popularity&" +
  "apiKey=1150fa9d1b774b93b2f3b55abe77fb16";

let req = new Request(url);

fetch(req)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.articles);
  });

const form = document.querySelector("main form");

// Create Event listener
