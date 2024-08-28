import "./style.css";
const orders = [];
let lastIdOrder = 0;
let delay = 4000;
let zIndex = 1000;
let currentDifficulty = "easy";

let numberOfValidOrders = 0;
let lastCommandHasError = false;
let scoreValue = 0;

const meals = [
  "smoothies",
  "bananas",
  "apple",
  "cookies",
  "milk",
  "bread",
  "butter",
  "eggs",
  "cheese",
  "yogurt",
  "chicken",
  "beef",
  "pork",
  "fish",
  "shrimp",
  "pasta",
  "rice",
  "potatoes",
  "onions",
  "garlic",
  "tomatoes",
  "carrots",
  "lettuce",
  "spinach",
  "broccoli",
  "mushrooms",
  "peppers",
  "zucchini",
  "avocado",
  "strawberries",
  "blueberries",
  "raspberries",
  "blackberries",
  "oranges",
  "lemons",
  "limes",
  "grapes",
  "watermelon",
  "cantaloupe",
  "peaches",
  "plums",
  "cherries",
  "pineapple",
  "kiwi",
  "mango",
  "papaya",
  "water",
  "juice",
  "soda",
  "coffee",
  "tea",
  "wine",
  "beer",
  "chips",
  "crackers",
  "cereal",
  "popcorn",
  "nuts",
  "candy",
  "chocolate",
  "sugar",
  "flour",
  "baking soda",
  "baking powder",
  "salt",
  "pepper",
  "spices",
  "herbs",
  "olive oil",
  "vegetable oil",
  "butter",
  "margarine",
  "ketchup",
  "mustard",
  "mayonnaise",
  "salsa",
  "pickles",
  "salad dressing",
  "syrup",
  "jam",
  "peanut butter",
  "honey",
  "vinegar",
  "soy sauce",
  "hot sauce",
  "barbecue sauce",
  "soup",
  "canned vegetables",
  "canned fruit",
  "canned beans",
  "canned soup",
  "frozen vegetables",
  "frozen fruit",
  "frozen pizza",
  "frozen dinners",
  "frozen breakfast",
  "frozen dessert",
  "bread",
  "milk",
  "eggs",
  "cheese",
  "yogurt",
  "butter",
  "chicken",
  "beef",
  "pork",
  "fish",
  "shrimp",
  "pasta",
  "rice",
  "potatoes",
  "onions",
  "garlic",
  "tomatoes",
  "carrots",
  "lettuce",
  "spinach",
  "broccoli",
  "mushrooms",
  "peppers",
  "zucchini",
  "avocado",
  "strawberries",
  "blueberries",
  "raspberries",
];

const difficultyLevel = {
  easy: {
    minItem: 1,
    maxItem: 2,
  },
  medium: {
    minItem: 2,
    maxItem: 4,
  },
  hard: {
    minItem: 3,
    maxItem: 6,
  },
};

const qs = (e) => document.querySelector(e);
const ce = (e) => document.createElement(e);
const inp = qs("#i");

qs("input[type='button']").addEventListener("click", () => {
  launchGame()
})

//People order list
const listPeople = qs("div#listHorizontal");
let gameTO = null

function launchGame() {
  qs('div#startScreen').style.display = "none"
  qs('div#stats').style.display = "flex"
  gameTO = setInterval(gameloop, delay);

  gameloop()
}

function updateOrderNumberValue(newValue) {
  const orderNumber = qs("div#stats>div#numberOfCurrentOrders");
  orderNumber.textContent = (newValue > 1 ? "Orders: " : "Order :") + newValue + " / 12";
}
function removeLastOrder() {
  const inp = qs("#i");
  orders.shift();
  listPeople?.firstChild.remove();
  inp.value = "";
  updateOrderNumberValue(orders.length);
  lastCommandHasError = false;
  return;
}

function updateScore(newScore) {
  const score = qs("div#score");
  scoreValue += newScore;
  score.textContent = "Score: " + scoreValue;
}

//Input event
inp?.addEventListener("keydown", (ke) => {
  console.log(orders);
  if (ke.key === "Enter") {
    const firstOrder = orders[0];
    if (!firstOrder) return;
    // refuse command if total equal 13
    const e = ce("li");
    if (
      firstOrder &&
      firstOrder.shouldEqual13 &&
      inp.value === `refuse order ${firstOrder.orderId}`
    ) {
      removeLastOrder();
      updateScore(20);
      e.textContent = "Order correctly refused";
      inp.value = "";
      // e.style.color = "var(--accent2)";
      qs("div#orderInput>ul")?.append(e);
      return;
    } else {
      e.textContent = inp.value;
    }

    if (
      firstOrder.order.includes(inp.value.trim()) &&
      !firstOrder.shouldEqual13
    ) {
      // e.style.color = "green";
      firstOrder.order.splice(firstOrder.order.indexOf(inp.value), 1);
      if (firstOrder.order.length === 0) {
        removeLastOrder();
        if (!lastCommandHasError) updateScore(30);
        else updateScore(10);
      }
      numberOfValidOrders++;
    } else {
      e.style.color = "red";
      lastCommandHasError = true;
    }

    inp.value = "";
    qs("div#orderInput>ul")?.append(e);
  }
});

const generateRandomMinMax = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generateOrder = (difficulty) => {
  let shouldEqual13 = Math.random() > 0.5;
  let numberOfItems = shouldEqual13 ? 13 : generateRandomMinMax(1, 25);
  shouldEqual13 = numberOfItems === 13;

  const selectedMeals = meals
    .sort(() => Math.random() - 0.5)
    .slice(
      0,
      generateRandomMinMax(
        difficultyLevel[difficulty].minItem,
        difficultyLevel[difficulty].maxItem,
      ),
    );

  return {
    order: selectedMeals.reduce((acc, e, idx, elements) => {
      let maxNb = Math.max(1, numberOfItems - elements.length - idx - 1);
      let nb = generateRandomMinMax(1, maxNb);

      if (idx === elements.length - 1 && shouldEqual13) {
        nb = numberOfItems;
      }
      numberOfItems = numberOfItems - nb > 0 ? numberOfItems - nb : 1;

      e = nb + " " + e;
      acc.push(e);
      return acc;
    }, []),
    shouldEqual13,
    orderId: ++lastIdOrder,
  };
};

const addNewOrder = (difficulty) => {
  const orderDiv = ce("div");
  orderDiv.className = "order";
  const newOrder = generateOrder(difficulty);
  const title = ce("h3");
  title.innerHTML = newOrder.orderId;
  orderDiv.append(title);
  orderDiv.style.zIndex = zIndex - 1;
  zIndex--;
  const list = ce("ul");
  newOrder.order.forEach((e) => {
    const el = ce("li");
    el.innerHTML = e;
    list.append(el);
  });
  orderDiv.append(list);
  listPeople?.append(orderDiv);
  orders.push(newOrder);
  updateOrderNumberValue(orders.length);
};

function gameloop() {

  currentDifficulty =
    numberOfValidOrders < 5
      ? "easy"
      : numberOfValidOrders < 10
        ? "medium"
        : "hard";
  delay = currentDifficulty === "easy" ? 4000 : currentDifficulty === "medium" ? 3000 : 2000
  addNewOrder(currentDifficulty);
  if (orders.length === 1000) {
    clearInterval(gameTO);
    qs("div#gameOverScreen").style.display = "block"
    const goText = `Oh no, you've lost! Your score is : ${scoreValue} <br/>`
    const goTextDiv = qs("div#gameOverScreen div#goText")
    goTextDiv.append(goText)

    //check localstorage for highscore
    const hs = localStorage.getItem("highscore")
    let hsText = ""
    if (!hs || scoreValue > hs) { localStorage.setItem("highscore", scoreValue); hsText = `<br/>Your new highscore is ${scoreValue}` } else { hsText = `Your highscore is ${hs}`; }
    goTextDiv.innerHTML = goText + hsText
  }
}

