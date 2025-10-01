const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        
        const key = input.toLowerCase();

        // define synonyms mapping
        const mapping = {
            country: "countries",
            countries: "countries",
            temple: "temples",
            temples: "temples",
            beach: "beaches",
            beaches: "beaches"
        };

        // resolve mapped key
        const category = mapping[key];
        
        const items = data[category];

        if (items) {
              items.forEach(function(item) {
                const card = document.createElement('div');
                card.className = 'destination-card';
                card.innerHTML = `
                  <img src="${item.imageUrl}" alt="${item.imageUrl}">
                  <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button class="book-btn">BOOK NOW</button>
                  </div>
                `;
                resultDiv.appendChild(card);
              });
        } else {
          resultDiv.innerHTML = 'Condition not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}
function clearCondition() {
    document.getElementById('conditionInput').value = '';
    document.getElementById('result').innerHTML = '';
}

 btnSearch.addEventListener('click', searchCondition);
 btnClear.addEventListener('click', clearCondition);