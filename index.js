/*****************************************************************************
 * Import and parse game data
 *****************************************************************************/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// parse JSON string into JavaScript objects array
const GAMES_JSON = JSON.parse(GAMES_DATA);


/*****************************************************************************
 * Utility function to clear child elements from a parent node
 *****************************************************************************/
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


/*****************************************************************************
 * DOM references
 *****************************************************************************/
const gamesContainer = document.getElementById("games-container");

const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

const descriptionContainer = document.getElementById("description-container");

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");


/*****************************************************************************
 * Challenge 3: Add all games as cards to the page
 *****************************************************************************/
function addGamesToPage(games) {
    for (let game of games) {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;
        gamesContainer.appendChild(gameCard);
    }
}


/*****************************************************************************
 * Challenge 4: Summary stats at the top of the page
 *****************************************************************************/

// Total contributions
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// Total amount pledged
const totalPledged = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;

// Total number of games
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames.toLocaleString();


/*****************************************************************************
 * Challenge 5: Filter functions and event listeners
 *****************************************************************************/

// Show only unfunded games
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log("Number of unfunded games:", unfundedGames.length);
    addGamesToPage(unfundedGames);
}

// Show only funded games
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log("Number of funded games:", fundedGames.length);
    addGamesToPage(fundedGames);
}

// Show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// Connect buttons with event listeners
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);


/*****************************************************************************
 * Challenge 6: Company description with dynamic unfunded games count and ternary operator
 *****************************************************************************/

// Count unfunded games
const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Template string with ternary for grammar
const displayStr = `A total of $${totalPledged.toLocaleString()} has been raised for ${totalGames} games. Currently, ${
    unfundedCount === 1 ? '1 game remains' : `${unfundedCount} games remain`
} unfunded. We need your help to fund these amazing games!`;

// Create paragraph and add to description container
const summaryElement = document.createElement("p");
summaryElement.innerHTML = displayStr;
descriptionContainer.appendChild(summaryElement);


/*****************************************************************************
 * Challenge 7: Display the top 2 games by pledged amount
 *****************************************************************************/

// Sort games by pledged amount descending
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// Destructure top two games and the rest
const [topGame, runnerUpGame, ...rest] = sortedGames;

console.log("First word of most funded game:", topGame.name.split(" ")[0]); // Secret Key component 1
console.log("First word of second most funded game:", runnerUpGame.name.split(" ")[0]); // Secret Key component 2
console.log("Value of ...rest:", rest); // Secret Key component 3 (should be MAPLE)

// Create and append top game name
const topGameElement = document.createElement("p");
topGameElement.innerHTML = topGame.name;
firstGameContainer.appendChild(topGameElement);

// Create and append runner-up game name
const runnerUpElement = document.createElement("p");
runnerUpElement.innerHTML = runnerUpGame.name;
secondGameContainer.appendChild(runnerUpElement);

// Bonus: Add search functionality
const searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Search games...");
searchInput.style.margin = "10px 0";
searchInput.style.padding = "8px";
searchInput.style.width = "200px";

searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    deleteChildElements(gamesContainer);
    
    if (searchTerm === "") {
        addGamesToPage(GAMES_JSON);
        return;
    }

    const filteredGames = GAMES_JSON.filter(game => 
        game.name.toLowerCase().includes(searchTerm) || 
        game.description.toLowerCase().includes(searchTerm)
    );
    addGamesToPage(filteredGames);
});

descriptionContainer.insertBefore(searchInput, descriptionContainer.firstChild);

/*****************************************************************************
 * Initial render: show all games on page load
 *****************************************************************************/
addGamesToPage(GAMES_JSON);