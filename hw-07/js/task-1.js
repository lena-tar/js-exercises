const categories = document.querySelector("#categories");
const categoriesItem = document.querySelectorAll(".item");
console.log(`Number of categories: ${categoriesItem.length}`);

categoriesItem.forEach((category) => {
  const titleCat = category.querySelector("h2").textContent;
  console.log(`Category: ${titleCat}`);
  const countLi = category.querySelectorAll("ul li").length;
  console.log(`Elements: ${countLi}`);
});
