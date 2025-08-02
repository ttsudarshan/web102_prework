/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  for (let game of games) {
      // Create the game card container
      const gameCard = document.createElement("div");

      // Add the "game-card" class
      gameCard.classList.add("game-card");

      // Set the inner HTML with a template literal
      gameCard.innerHTML = `
          <img src="${game.img}" alt="${game.name}" class="game-img" />
          <h3>${game.name}</h3>
          <p>${game.description}</p>
          <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
          <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
      `;

      // Append the card to the container
      gamesContainer.appendChild(gameCard);
  }
}


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Step 1: Total number of individual contributions
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString(); // e.g., "25,676"

// Step 2: Total amount pledged
const totalPledged = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`; // e.g., "$741,166"

// Step 3: Total number of games
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames.toLocaleString(); // e.g., "11"


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item

// just for test
addGamesToPage(GAMES_JSON);
