import "./style.css";
const orders = [];
let delay = 4000;
let currentDifficulty = "easy";

let numberOfValidOrders = 0;
let lastCommandHasError = false;
let scoreValue = 0;
let ordersLimit = 12;

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
const qsa = (e) => document.querySelectorAll(e);
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
  qs('div#gameScreen').style.display = "flex"
  qs('div#stats').style.display = "flex"
  gameTO = setInterval(gameloop, delay);

  gameloop()
}

function updateOrderNumberValue(newValue) {
  const orderNumber = qs("div#stats>div#numberOfCurrentOrders");
  orderNumber.textContent = (newValue > 1 ? "Orders: " : "Order :") + newValue + " / " + ordersLimit;
}
function removeLastOrder() {
  const inp = qs("#i");
  orders.shift();
  listPeople?.firstChild.remove();
  inp.value = "";
  updateOrderNumberValue(orders.length);
  lastCommandHasError = false;
  listCustomers.removeChild(listCustomers.lastChild)
  listOrder.innerHTML = "";
  if (orders.length > 0) {
    displayLastOrderContent()
  }
  return;
}

function displayLastOrderContent() {
  if (typeof listOrder !== "undefined") listOrder.innerHTML = "";
  else {
    let d = ce("div")
    d.id = "dialogBubble"
    let l = ce("ul")
    l.id = "listOrder"
    d.append(l)
    const lc = listCustomers.lastChild
    lc.append(d)
  }
  orders[0].order.forEach((o) => {
    const el = ce("li")
    el.textContent = o;
    listOrder.append(el);
  })
}

function updateScore(newScore) {
  const score = qs("div#score");
  scoreValue += newScore;
  score.textContent = "Score: " + scoreValue;
}

function updateOrdersLimit(_orderLimits) {
  ordersLimit = _orderLimits
  updateOrderNumberValue(orders.length)
}
//Input event
inp?.addEventListener("keydown", (ke) => {
  if (ke.key === "Enter") {
    const firstOrder = orders[0];
    console.log(firstOrder.order)
    if (!firstOrder) return;
    // refuse command if total equal 13
    const inpValue = inp.value.trim()
    if (
      firstOrder &&
      firstOrder.shouldEqual13 &&
      inpValue === `refuse order`
    ) {
      removeLastOrder();
      updateScore(20);
      inp.value = "";
      return;
    }
    if (
      firstOrder.order.includes(inpValue) &&
      !firstOrder.shouldEqual13
    ) {
      firstOrder.order.splice(firstOrder.order.indexOf(inpValue), 1);
      if (firstOrder.order.length === 0) {
        removeLastOrder();
        if (!lastCommandHasError) updateScore(30);
        else updateScore(10);
      }
      const ordLines = qsa("div#dialogBubble ul>li")
      const lineToThrough = Array.from(ordLines).find((line) => { return line.textContent === inpValue })
      if (lineToThrough) lineToThrough.style.textDecoration = "line-through"
      numberOfValidOrders++;
    } else {
      updateOrdersLimit(ordersLimit - 1)
      checkIfGameOver()
      lastCommandHasError = true;
    }

    inp.value = "";
  }
});

const generateRandomMinMax = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generateOrder = (difficulty) => {
  let shouldEqual13 = Math.random() > 0.4;
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
  };
};

function generateCustomer() {
  const head = ce("div")
  head.classList.add('headCustomer')
  const body = ce("div")
  body.classList.add('bodyCustomer')
  const cust = ce("div")
  cust.classList.add('customer')

  cust.append(head)
  cust.append(body)

  if (orders.length < 13) listCustomers.append(cust)
}

const addNewOrder = (difficulty) => {
  console.log("add new order")
  const newOrder = generateOrder(difficulty);
  orders.push(newOrder);
  generateCustomer()
  updateOrderNumberValue(orders.length);
  checkIfGameOver()
};

function checkIfGameOver() {
  if (ordersLimit === 0 || orders.length > ordersLimit) {
    gameover()
  }
}

function gameloop() {
  currentDifficulty =
    numberOfValidOrders < 5
      ? "easy"
      : numberOfValidOrders < 10
        ? "medium"
        : "hard";
  delay = currentDifficulty === "easy" ? 4000 : currentDifficulty === "medium" ? 3000 : 2000
  addNewOrder(currentDifficulty);
  if (orders.length === 1) {
    displayLastOrderContent()
  }
  if (orders.length === ordersLimit) {
    gameover()
  }
}

function gameover() {
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

