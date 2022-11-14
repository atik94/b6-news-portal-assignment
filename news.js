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
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

const displayNews = (news) => {
  console.log(news);
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = " ";
  news.forEach((newsAll) => {
    const newsList = document.createElement("div");
    newsList.classList.add("col");
    newsList.innerHTML = `<div class="card">
      <img src=${newsAll.image_url} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${newsAll.title}</h5>
        <p class="card-text">${newsAll.details}</p>
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
      `;
    newsContainer.appendChild(newsList);
  });
};
newsCategory();
