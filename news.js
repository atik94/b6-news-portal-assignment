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
newsCategory();
