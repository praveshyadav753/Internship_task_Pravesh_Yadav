// script.js
const articles = []; // Array to store articles
const articlesPerPage = 4; // Number of articles per page
let currentPage = 1; // Current page

const articleForm = document.getElementById("articleForm");
const articlesContainer = document.getElementById("articlesContainer");
const pageNumbers = document.getElementById("pageNumbers");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Event listener for the form
articleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();

  // Validate title and description
  if (!title || !description) {
    alert("Title and Description are required!");
    return;
  }

  // Add the article to the array
  articles.push({ title, description, imageUrl });

  // Reset the form
  articleForm.reset();

  // Render the articles
  renderArticles();
});

// Render articles for the current page
function renderArticles() {
  articlesContainer.innerHTML = "";

  const start = (currentPage - 1) * articlesPerPage;
  const end = start + articlesPerPage;
  const currentArticles = articles.slice(start, end);

  currentArticles.forEach((article) => {
    const articleDiv = document.createElement("div");
    articleDiv.classList.add("article");
    articleDiv.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      ${
        article.imageUrl
          ? `<img src="${article.imageUrl}" alt="Article Image">`
          : ""
      }
    `;
    articlesContainer.appendChild(articleDiv);
  });

  updatePagination();
}

// Update pagination controls
function updatePagination() {
  pageNumbers.innerHTML = "";

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.classList.add("page-btn");
    if (i === currentPage) pageBtn.classList.add("active");
    pageBtn.innerText = i;
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      renderArticles();
    });
    pageNumbers.appendChild(pageBtn);
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Previous and Next button logic
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderArticles();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderArticles();
  }
});
