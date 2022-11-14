const newsCategory = () => {
  fetch(" https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category));
};
const displayCategory = (data) => {
  console.log(data);

  const categoryContainer = document.getElementById("category-container");
  data.forEach((newsCategory) => {
    const categoryList = document.createElement("div");
    categoryList.innerHTML = `<h5 onclick="loadCategoryDetails('${newsCategory.category_id}')" href="">${newsCategory.category_name}</h5>`;

    categoryContainer.appendChild(categoryList);
  });
};

const loadCategoryDetails = (id) => {
  toggleSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

const displayNews = (news) => {
  console.log(news.length);
  const totalNewsShow = document.getElementById("total-news-show");
  totalNewsShow.innerHTML = `<h1>${news.length ? news.length + " News are found" : "No news are found"} </h1>`;
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = " ";
  news.forEach((newsAll) => {
    const newsList = document.createElement("div");
    newsList.classList.add("col");
    newsList.innerHTML = `<div class="card">
      <img src=${newsAll.thumbnail_url} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${newsAll.title}</h5>
        <p class="card-text">${newsAll.details.slice(0, 200)}...</p>
      </div>
      <div class="d-flex justify-content-between">
      <div class="d-flex">
      <img style="width:60px; height:60px;border-radius:50%;" src=${newsAll.author.img} class="card-img-top" alt="...">
     <div>
     <h5>${newsAll.author.name}</h5>
     <p><small>${newsAll.author.published_date}</small></p>
     </div>
      </div>
      <h3>${newsAll.total_view}</h3>
      </div>
      <button onclick="loadNewsDetails('${
        newsAll._id
      }')" type="button" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
      
      `;
    newsContainer.appendChild(newsList);
  });
  toggleSpinner(false);
};

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

//LoadNewsDetails

const loadNewsDetails = (_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data[0]));
};

const displayNewsDetails = (newsDetails) => {
  console.log(newsDetails);
  const modalTitle = document.getElementById("newsDetailModal");
  modalTitle.innerText = newsDetails.title;
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
   <img style="width:400px; height:200px" src="${newsDetails.image_url}" alt="">
   <p>${newsDetails.details.slice(0, 200)}</p>
   <h1>Author: ${newsDetails.author.name ? newsDetails.author.name : "No data found"}</h1>
   <p>publish date: <small>${newsDetails.author.published_date}</small></p>
   <img style="width:100px; height:100px"  src="${newsDetails.author.img}" alt="">
   <h4>Total view: ${newsDetails.total_view ? newsDetails.total_view : "No data found"}</h4>
  `;
};
newsCategory();
