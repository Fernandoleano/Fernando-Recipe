document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-container form');
    const searchInput = document.querySelector('#search-input');
    const resultsContainer = document.querySelector('.results-container');
  
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault(); // prevent default form submission behavior
  
      const query = searchInput.value; // get the user's search query
  
      // Send the search request to the Spoonacular API
      const API_KEY = 'e0a0856a77a040a48c7acb7016390250';
      const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${encodeURIComponent(query)}`;
  
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          // Clear the previous search results
          resultsContainer.innerHTML = '';
  
          // Check if the search returned any results
          if (data.results && data.results.length > 0) {
            // Display the search results on the page
            const recipes = data.results;
            recipes.forEach(recipe => {
              const recipeElement = document.createElement('div');
              recipeElement.classList.add('recipe');
  
              const titleElement = document.createElement('h2');
              titleElement.textContent = recipe.title;
  
              const imageElement = document.createElement('img');
              imageElement.src = recipe.image;
  
              const linkElement = document.createElement('a');
              linkElement.href = recipe.sourceUrl;
              linkElement.textContent = 'View Recipe';
  
              recipeElement.appendChild(titleElement);
              recipeElement.appendChild(imageElement);
              recipeElement.appendChild(linkElement);
              resultsContainer.appendChild(recipeElement);
            });
          } else {
            // Display an error message if there are no search results
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'No results found.';
            resultsContainer.appendChild(errorMessage);
          }
        })
        .catch(error => {
          console.error('Error searching for recipes:', error);
        });
    });
});
