const articlesContainer = document.getElementById("articlesContainer");
const pageNumbers = document.getElementById("pageNumbers");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const articleForm = document.getElementById("articleForm");
const imagePreview = document.getElementById("imagePreview");

const articlesPerPage = 3; // Number of articles per page
let currentPage = 1; // Current page
let articles = JSON.parse(localStorage.getItem("articles")) || []; // Load articles from local storage

// Render articles on page load
renderArticles();

// Event listener for form submission
articleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const imageInput = document.getElementById("imageUrl");
  let imageUrl = "";

  if (imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      imageUrl = reader.result;

      // Add the article to the array
      addArticle(title, description, imageUrl);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    // Add the article to the array without an image
    addArticle(title, description, imageUrl);
  }
});

// Add article to the list and local storage
function addArticle(title, description, imageUrl) {
  // Validate title and description
  if (!title || !description) {
    alert("Title and Description are required!");
    return;
  }

  articles.push({ title, description, imageUrl });

  // Save to local storage
 try {
  localStorage.setItem("articles", JSON.stringify(articles));} catch (e){ console.log("Couldn't");}

  // Reset the form and preview
  

  // Render articles
  renderArticles();
}

// Render articles for the current page
function renderArticles() {
  articlesContainer.innerHTML = "";

  const start = (currentPage - 1) * articlesPerPage;
  const end = start + articlesPerPage;
  const currentArticles = articles.slice(start, end);

  currentArticles.forEach((article) => {
    const articleDiv = document.createElement("div");
    articleDiv.classList.add("card", "bg-white", "rounded-lg", "shadow-md", "overflow-hidden", "mb-4");
    articleDiv.innerHTML = `
      <div class="image-container bg-blue-50">
        <img src="${article.imageUrl || ""}" alt="Article Image" class="w-full h-48 object-cover">
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">${article.title}</h3>
        <p class="text-sm text-gray-600 mb-4">${article.description}</p>
        <!-- <button class="text-blue-500 font-medium hover:underline">Read More</button> -->
      </div>
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
    pageBtn.classList.add("page-btn", "mx-1", "px-2", "py-1", "border", "rounded", "hover:bg-blue-500", "hover:text-white");
    if (i === currentPage) pageBtn.classList.add("bg-blue-500", "text-white");
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
