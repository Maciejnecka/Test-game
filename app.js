// Initialize variables
let stoneCount = 0;
let totalStonesClicked = 0; // New variable to track stones clicked in the session
let upgradeLevel = 1;
let clickValue = 1;
let upgradeCost = 10;

// Get DOM elements
const stoneCountElement = document.getElementById('stone-count');
const clickButton = document.getElementById('click-button');
const upgradeButton = document.getElementById('upgrade1');
const clickValueElement = document.getElementById('click-value');
const stonesClickedElement = document.getElementById('stones-clicked'); // New element for stones clicked
const flyingNumbersContainer = document.getElementById('flying-numbers'); // New element for flying numbers

let autoClickers = [];

// Update stone count
function updateStoneCount() {
  stoneCountElement.textContent = stoneCount.toFixed(1);
}

// Update upgrade button text
function updateUpgradeButton() {
  upgradeButton.textContent = `Upgrade ${upgradeLevel} (Cost: ${upgradeCost} Stones)`;
}

// Update click value display
function updateClickValue() {
  clickValueElement.textContent = clickValue.toFixed(1);
}

// Update stones clicked display
function updateStonesClicked() {
  stonesClickedElement.textContent = totalStonesClicked.toFixed(1);
}

// Function to create and animate flying numbers
function showFlyingNumber(value, x, y) {
  const flyingNumber = document.createElement('div');
  flyingNumber.className = 'flying-number';
  flyingNumber.textContent = `+${value.toFixed(1)}`;
  flyingNumber.style.left = x + 'px';
  flyingNumber.style.top = y + 'px';
  flyingNumbersContainer.appendChild(flyingNumber);

  // Remove the flying number element after animation
  flyingNumber.addEventListener('animationend', function () {
    flyingNumber.remove();
  });
}

// Handle stone clicking
clickButton.addEventListener('click', function (event) {
  const clickResult = clickValue;
  stoneCount += clickResult;
  totalStonesClicked += clickResult; // Update stones clicked
  updateStoneCount();
  updateStonesClicked(); // Update stones clicked display
  showFlyingNumber(clickResult, event.clientX, event.clientY); // Show flying number at click position
});

// Handle upgrades
upgradeButton.addEventListener('click', function () {
  if (stoneCount >= upgradeCost) {
    stoneCount -= upgradeCost;
    clickValue += 0.1;
    upgradeCost *= 2;
    upgradeLevel++;
    updateStoneCount();
    updateUpgradeButton();
    updateClickValue();
    updateStonesClicked(); // Update stones clicked display
  }
});

// Initial update of click value and stones clicked
updateClickValue();
updateStonesClicked();

const autoClickerButton = document.getElementById('auto-clicker');
let autoClickerLevel = 0;
let autoClickerCost = 50;

autoClickerButton.addEventListener('click', function () {
  if (stoneCount >= autoClickerCost) {
    stoneCount -= autoClickerCost;
    autoClickerLevel++;
    autoClickerCost *= 2;
    updateStoneCount();
    updateAutoClickerButton();
    activateAutoClicker();
  }
});

function updateAutoClickerButton() {
  autoClickerButton.textContent = `Auto-Clicker (Cost: ${autoClickerCost} Stones)`;
}

// Function to activate the auto-clicker
function activateAutoClicker() {
  const autoClickInterval = 1000; // 1 click per second (adjust as needed)

  if (autoClickerLevel === 1) {
    // If it's the first auto-clicker, create a single auto-clicker
    const autoClicker = setInterval(function () {
      stoneCount += clickValue;
      totalStonesClicked += clickValue;
      updateStoneCount();
      updateStonesClicked();
    }, autoClickInterval);

    autoClickers.push(autoClicker);
  } else if (autoClickerLevel > 1) {
    // For multiple auto-clickers, scale the auto-click interval
    const scaledAutoClickInterval = autoClickInterval / autoClickerLevel;

    for (let i = 0; i < autoClickerLevel; i++) {
      const autoClicker = setInterval(function () {
        stoneCount += clickValue;
        totalStonesClicked += clickValue;
        updateStoneCount();
        updateStonesClicked();
      }, scaledAutoClickInterval);

      autoClickers.push(autoClicker);
    }
  }
}

const clickMultiplierButton = document.getElementById('click-multiplier');
let clickMultiplierActive = false;
let clickMultiplierDuration = 30; // Duration in seconds
let clickMultiplierCost = 100;

clickMultiplierButton.addEventListener('click', function () {
  if (stoneCount >= clickMultiplierCost && !clickMultiplierActive) {
    stoneCount -= clickMultiplierCost;
    clickMultiplierActive = true;
    updateStoneCount();
    updateClickMultiplierButton();
    activateClickMultiplier();
  }
});

function updateClickMultiplierButton() {
  clickMultiplierButton.textContent = `x2 Click Multiplier (Cost: ${clickMultiplierCost} Stones)`;
}

// Function to activate the click multiplier
function activateClickMultiplier() {
  clickValue *= 2;
  updateClickValue();

  setTimeout(function () {
    clickValue /= 2;
    clickMultiplierActive = false;
    updateClickValue();
    updateClickMultiplierButton();
  }, clickMultiplierDuration * 1000); // Convert duration to milliseconds
}
