// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Placeholder for now. Game logic will be added in later steps.
    console.log("Math Adventure! script loaded.");

    // Example: Initialize coins (this will be expanded later)
    const coinsDisplay = document.getElementById('coins');
    if (coinsDisplay) {
        coinsDisplay.textContent = '100'; // Starting coins
    }

    // Game state variables
    let currentProblem = null;
    let score = 0;
    let coins = 100; // Starting coins

    // DOM Elements for the game
    const problemTextElement = document.getElementById('problem-text');
    const answerInputElement = document.getElementById('answer-input');
    const submitAnswerButton = document.getElementById('submit-answer');
    const feedbackTextElement = document.getElementById('feedback-text');
    const coinsDisplayElement = document.getElementById('coins');

    // Initialize game
    // updateCoinsDisplay(); // coins variable is now the source of truth, display updated when it changes.
    generateNewProblem(); // This will also call updateCoinsDisplay initially via its own logic path

    // Event Listeners
    if (submitAnswerButton) {
        submitAnswerButton.addEventListener('click', handleSubmitAnswer);
    }
    if (answerInputElement) {
        answerInputElement.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                handleSubmitAnswer();
            }
        });
    }

    // Make game's `coins` and `updateCoinsDisplay` available to store logic
    // This is a way to bridge the scope. A more advanced setup might use custom events or a shared state manager.
    window.getGameCoins = () => coins;
    window.setGameCoins = (newAmount) => {
        coins = newAmount;
        updateCoinsDisplay(); // Ensure UI reflects change
    };
    window.notifyCoinChange = updateCoinsDisplay; // Store can call this if it directly modifies coins via setGameCoins


    function generateNewProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1; // Numbers between 1 and 10
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operations = ['+', '-', '*']; // For now, addition, subtraction, multiplication
        const operation = operations[Math.floor(Math.random() * operations.length)];
        let correctAnswer;

        let problemString = `${num1} ${operation} ${num2} = ?`;

        switch (operation) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                // Ensure positive result for simplicity in primary grades
                if (num1 < num2) {
                    problemString = `${num2} ${operation} ${num1} = ?`;
                    correctAnswer = num2 - num1;
                } else {
                    correctAnswer = num1 - num2;
                }
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
            // Division can be added later, ensuring whole numbers for primary
        }

        currentProblem = {
            text: problemString,
            answer: correctAnswer
        };

        if (problemTextElement) {
            problemTextElement.textContent = currentProblem.text;
        }
        if (feedbackTextElement) {
            feedbackTextElement.textContent = ''; // Clear previous feedback
        }
        if (answerInputElement) {
            answerInputElement.value = ''; // Clear previous answer
            answerInputElement.focus();
        }
    }

    function handleSubmitAnswer() {
        if (!currentProblem || !answerInputElement || !feedbackTextElement) return;

        const userAnswer = parseInt(answerInputElement.value);

        if (isNaN(userAnswer)) {
            feedbackTextElement.textContent = "Please enter a number!";
            feedbackTextElement.className = 'info'; // Use class for styling
            return;
        }

        if (userAnswer === currentProblem.answer) {
            feedbackTextElement.textContent = "Correct! +10 coins";
            feedbackTextElement.className = 'correct'; // Use class for styling
            score++;
            coins += 10;
            updateCoinsDisplay();
            setTimeout(generateNewProblem, 1500);
        } else {
            feedbackTextElement.textContent = `Incorrect. The answer was ${currentProblem.answer}. Try the next one!`;
            feedbackTextElement.className = 'incorrect'; // Use class for styling
            setTimeout(generateNewProblem, 2000);
        }
    }

    function updateCoinsDisplay() {
        if (coinsDisplayElement) {
            coinsDisplayElement.textContent = coins;
        }
    }

    // Store related DOM elements
    const accessoriesListElement = document.getElementById('accessories-list');
    const charactersListElement = document.getElementById('characters-list');
    const powerupsListElement = document.getElementById('powerups-list');
    const myPowerupsListElement = document.getElementById('my-powerups-list'); // For displaying owned powerups
    const characterViewElement = document.getElementById('character-view'); // For displaying character & accessories

    // Store data
    const storeItems = {
        accessories: [
            { id: "hat1", name: "Cool Hat", price: 20, type: "accessory", description: "A very cool hat for your character." },
            { id: "glasses1", name: "Pixel Glasses", price: 30, type: "accessory", description: "Stylish pixelated glasses." }
        ],
        characters: [
            { id: "char1", name: "Robo-Pet", price: 100, type: "character", description: "A friendly robot companion." },
            { id: "char2", name: "Space Alien", price: 150, type: "character", description: "An explorer from another galaxy." }
        ],
        powerups: [
            { id: "pwr1", name: "Hint Master", price: 50, type: "powerup", description: "Get a hint for a tough problem (one-time use)." },
            { id: "pwr2", name: "Skip Problem", price: 75, type: "powerup", description: "Skip the current problem (one-time use)." }
        ]
    };

    // Player inventory - this should be globally accessible within the script or managed via a shared object.
    // For simplicity, defining it here and it will be accessed by functions outside DOMContentLoaded.
    // Consider this a module-level variable for script.js
    window.playerInventory = { // Attaching to window for easier access from global functions, not ideal for large apps
        accessories: [],
        characters: [],
        powerups: [],
        activeCharacter: null
    };

    window.storeItems = { // Make store items globally accessible as well for findStoreItem
        accessories: [
            { id: "hat1", name: "Cool Hat", price: 20, type: "accessory", description: "A very cool hat for your character." },
            { id: "glasses1", name: "Pixel Glasses", price: 30, type: "accessory", description: "Stylish pixelated glasses." }
        ],
        characters: [
            { id: "char1", name: "Robo-Pet", price: 100, type: "character", description: "A friendly robot companion." },
            { id: "char2", name: "Space Alien", price: 150, type: "character", description: "An explorer from another galaxy." }
        ],
        powerups: [
            { id: "pwr1", name: "Hint Master", price: 50, type: "powerup", description: "Get a hint for a tough problem (one-time use)." },
            { id: "pwr2", name: "Skip Problem", price: 75, type: "powerup", description: "Skip the current problem (one-time use)." }
        ]
    };


    // Populate store and initialize inventory listeners
    populateStore(); // Uses window.storeItems
    initializeBuyButtonListeners(); // Uses window.playerInventory indirectly via addItemToInventory

    // Initial display updates
    updateCharacterDisplay();
    updateMyPowerupsDisplay();

}); // End of DOMContentLoaded

// --- Global Helper Functions for Store & Inventory ---

// (populateStore, initializeBuyButtonListeners, handleBuyItem, addItemToInventory, findStoreItem are now potentially global,
// or should be carefully scoped if DOMContentLoaded is the main execution block)
// To make them work as is, they need access to `storeItems` and `playerInventory`.
// Let's assume they are defined in a scope accessible to these functions.
// For `coins` and `updateCoinsDisplay`, `handleBuyItem` is currently directly accessing DOM.

function populateStore() {
    const accessoriesList = document.getElementById('accessories-list');
    const charactersList = document.getElementById('characters-list');
    const powerupsList = document.getElementById('powerups-list');

    // Ensure storeItems is defined (it's on window now)
    if (!window.storeItems) {
        console.error("Store items not defined globally!");
        return;
    }
    const { accessories, characters, powerups } = window.storeItems;

    function createStoreItemElement(item) {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} (${item.price} coins) <button class="buy-item" data-item-id="${item.id}" data-item-type="${item.type}" data-item-price="${item.price}">Buy</button>`;
        return li;
    }

    accessories.forEach(item => accessoriesList.appendChild(createStoreItemElement(item)));
    characters.forEach(item => charactersList.appendChild(createStoreItemElement(item)));
    powerups.forEach(item => powerupsList.appendChild(createStoreItemElement(item)));
}

function initializeBuyButtonListeners() {
    document.querySelectorAll('.buy-item').forEach(button => {
        button.addEventListener('click', handleBuyItem);
    });
}

function handleBuyItem(event) {
    const itemId = event.target.dataset.itemId;
    const itemType = event.target.dataset.itemType;
    const itemPrice = parseInt(event.target.dataset.itemPrice);

    // Retrieve the global coins variable from the game section
    // This assumes 'coins' and 'updateCoinsDisplay' are accessible globally or passed appropriately.
    // For better encapsulation, consider using a shared state object or event system.
    // For now, we'll try to access the `coins` variable defined in the game section.
    // This is a simplification; a more robust solution would involve better state management.
    // let gameCoinsElement = document.getElementById('coins'); // No longer needed
    // let currentGlobalCoins = parseInt(gameCoinsElement.textContent); // No longer needed

    let currentGlobalCoins = window.getGameCoins(); // Get coins from game logic

    if (currentGlobalCoins >= itemPrice) {
        currentGlobalCoins -= itemPrice;
        window.setGameCoins(currentGlobalCoins); // Set coins in game logic, which also updates display

        alert(`You bought the ${itemType} "${itemId}"! Your new balance is ${currentGlobalCoins} coins.`);
        addItemToInventory(itemId, itemType); // This will also call display updates for inventory

        // Consider disabling buy button for unique items if not already handled
        const itemData = findStoreItem(itemId, itemType);
        if (itemData && (itemType === 'character' || itemType === 'accessory')) { // Example: disable for unique items
            // Check if item is already owned to prevent re-buying, or if it's a one-time purchase
            // This logic can be expanded. For now, let's assume store items can be bought multiple times
            // unless explicitly handled by disabling the button or checking playerInventory.
            // If an item is meant to be unique, the button could be disabled here:
            // event.target.disabled = true;
            // event.target.textContent = "Owned";
        }

    } else {
        alert("Not enough coins to buy " + itemId + "!");
    }
}

function addItemToInventory(itemId, itemType) {
    console.log(`Item ${itemId} of type ${itemType} added to inventory.`);

    const item = findStoreItem(itemId, itemType);
    if (!item) {
        console.error(`Item with ID ${itemId} and type ${itemType} not found in storeItems.`);
        return;
    }

    if (itemType === "accessory") {
        // Prevent duplicate accessories if needed, or allow multiple
        if (!window.playerInventory.accessories.includes(item.id)) {
            window.playerInventory.accessories.push(item.id);
        }
    } else if (itemType === "character") {
        // Assume only one character can be "active", but player can own multiple
        if (!window.playerInventory.characters.includes(item.id)) {
            window.playerInventory.characters.push(item.id);
        }
        window.playerInventory.activeCharacter = item.id; // Set or update active character
    } else if (itemType === "powerup") {
        // Powerups might be stackable or unique
        // For simplicity, let's assume they are listed uniquely if bought multiple times,
        // or just add to a count if they were objects with quantity.
        // Current structure adds ID, so multiple purchases of same ID will list multiple times.
        // This is fine for now.
        window.playerInventory.powerups.push(item.id); // Stores the ID of the powerup
    }

    console.log("Player Inventory Updated:", window.playerInventory);
    updateCharacterDisplay();
    updateMyPowerupsDisplay();
}


function updateCharacterDisplay() {
    const characterViewElement = document.getElementById('character-view');
    if (!characterViewElement) return;

    characterViewElement.innerHTML = ''; // Clear previous content

    const activeCharacterId = window.playerInventory.activeCharacter;
    if (activeCharacterId) {
        const characterItem = findStoreItem(activeCharacterId, "character");
        if (characterItem) {
            const charP = document.createElement('p');
            charP.textContent = `Active Character: ${characterItem.name}`;
            characterViewElement.appendChild(charP);
        }
    } else {
        characterViewElement.innerHTML = '<p>No character selected. Visit the store!</p>';
    }

    if (window.playerInventory.accessories.length > 0) {
        const accHeader = document.createElement('h4');
        accHeader.textContent = 'Accessories:';
        characterViewElement.appendChild(accHeader);
        const accList = document.createElement('ul');
        window.playerInventory.accessories.forEach(accId => {
            const accItem = findStoreItem(accId, "accessory");
            if (accItem) {
                const li = document.createElement('li');
                li.textContent = accItem.name;
                accList.appendChild(li);
            }
        });
        characterViewElement.appendChild(accList);
    }
}

function updateMyPowerupsDisplay() {
    const myPowerupsListElement = document.getElementById('my-powerups-list');
    if (!myPowerupsListElement) return;

    myPowerupsListElement.innerHTML = ''; // Clear previous list

    if (window.playerInventory.powerups.length === 0) {
        myPowerupsListElement.innerHTML = '<li>No power-ups yet. Buy some from the store!</li>';
        return;
    }

    window.playerInventory.powerups.forEach(powerupId => {
        const powerupItem = findStoreItem(powerupId, "powerup");
        if (powerupItem) {
            const li = document.createElement('li');
            li.textContent = `${powerupItem.name} - ${powerupItem.description}`;

            const useButton = document.createElement('button');
            useButton.textContent = 'Use';
            useButton.classList.add('use-powerup-btn');
            useButton.dataset.powerupId = powerupId;
            useButton.dataset.powerupType = powerupItem.type; // Should be 'powerup'
            // Inline styles removed, class .use-powerup-btn will be styled by style.css
            useButton.addEventListener('click', handleUsePowerup);
            li.appendChild(useButton);
            myPowerupsListElement.appendChild(li);
        }
    });
}

function handleUsePowerup(event) {
    const powerupId = event.target.dataset.powerupId;
    // const powerupType = event.target.dataset.powerupType; // Currently always "powerup"
    const powerupItem = findStoreItem(powerupId, "powerup");

    if (!powerupItem) {
        alert("Error: Power-up not found!");
        return;
    }

    // Placeholder: Log usage and remove from inventory.
    // Actual power-up effects (hint, skip) are not implemented in this step.
    alert(`Using power-up: ${powerupItem.name}! Effect to be implemented.`);
    console.log(`Attempting to use power-up: ${powerupItem.name} (ID: ${powerupId})`);

    // Remove the used power-up from inventory
    const indexToRemove = window.playerInventory.powerups.indexOf(powerupId);
    if (indexToRemove > -1) {
        window.playerInventory.powerups.splice(indexToRemove, 1);
    }

    // Refresh the display of owned power-ups
    updateMyPowerupsDisplay();
    // Potentially, refresh game state if power-up had an immediate effect
    // For example, if it was a hint, it should display the hint now.
}


function findStoreItem(itemId, itemType) {
    // Ensure window.storeItems and the specific type array exist
    if (window.storeItems && window.storeItems[itemType + 's']) {
        return window.storeItems[itemType + 's'].find(item => item.id === itemId);
    }
    return null;
}

// Initial call to register coin management needs to be inside DOMContentLoaded
// and after 'coins' and 'updateCoinsDisplay' from the game section are defined.
// This will be tricky with current structure. Let's adjust handleBuyItem for now.
// The following line needs to be moved and called appropriately:
// registerCoinManagement(coins, updateCoinsDisplay);
// For now, direct DOM manipulation of coins will be used in handleBuyItem, which is not ideal but works for this step.
