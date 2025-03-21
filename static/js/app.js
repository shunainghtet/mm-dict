document.getElementById("search-btn").addEventListener("click", function () {
  let query = document.getElementById("query").value.trim();

  if (!query) {
    alert("Please enter a search term!");
    return;
  }

  fetch(`/search?query=${query}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("searchResults").innerHTML = "";

      if (data.length === 0) {
        let noResults = document.createElement("li");
        noResults.classList.add("no-result");
        noResults.textContent = "No results found.";
        document.getElementById("searchResults").appendChild(noResults);
        return;
      }

      data.forEach((item) => {
        let li = document.createElement("li");
        let word = item.word;
        let definitions = item.definitions
          .map((def) => `<p>${def}</p>`)
          .join("");

        li.classList.add("result-item");
        li.innerHTML = `
                  <div class="result-header">
                      <h2>${word}</h2>
                  </div>
                  <div class="result-definitions">
                      ${definitions}
                  </div>
              `;
        document.getElementById("searchResults").appendChild(li);
      });
    })
    .catch((error) => console.error("Error:", error));
});
const modeSwitch = document.getElementById("modeSwitch");

modeSwitch.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
  }
});
