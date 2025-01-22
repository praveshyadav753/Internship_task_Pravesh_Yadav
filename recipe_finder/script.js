const recipes = [
    { name: "Pancakes", type: "Breakfast", ingredients: ["flour", "milk", "egg"] },
    { name: "Grilled Chicken", type: "Lunch", ingredients: ["chicken", "spices"] },
    { name: "Pasta", type: "Dinner", ingredients: ["pasta", "tomato sauce"] },
    { name: "Omelette", type: "Breakfast", ingredients: ["egg", "cheese"] },
    { name: "Salad", type: "Lunch", ingredients: ["lettuce", "tomato"] },
  ];

  const searchInput = document.getElementById("searchInput");
  const filterDropdown = document.getElementById("filterDropdown");
  const searchButton = document.getElementById("searchButton");
  const results = document.getElementById("results");

  function searchRecipes() {
    const query = searchInput.value.toLowerCase().trim();
    const filter = filterDropdown.value;

    const filteredRecipes = recipes.filter((recipe) => {
      const matchesIngredients = recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(query)
      );

      const matchesType = filter === "all" || recipe.type === filter;

      return matchesIngredients && matchesType;
    });

    displayResults(filteredRecipes);
  }

  function displayResults(recipes) {
    results.innerHTML = ""; // Clear previous results

    if (recipes.length === 0) {
      results.innerHTML =
        '<p class="text-center text-gray-500">No recipes found.</p>';
      return;
    }

    recipes.forEach((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.className =
        "bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200";
      recipeCard.innerHTML = `
        <h2 class="text-xl font-semibold">${recipe.name}</h2>
        <p class="text-gray-600">Type: ${recipe.type}</p>
        <p class="text-gray-600">Ingredients: ${recipe.ingredients.join(", ")}</p>
      `;

      results.appendChild(recipeCard);
    });
  }

  searchButton.addEventListener("click", searchRecipes);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchRecipes();
    }
  });