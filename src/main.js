import "./style.css";
let minItem = 1;
let maxItem = 4;
const orders = [];
let lastIdOrder = 0;
let delay = 4000;
let orderLimit = 12;

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

const qs = (e) => document.querySelector(e);
const ce = (e) => document.createElement(e);
const inp = qs("#i");

//People order list
const listPeople = qs("div#listHorizontal");

function removeLastOrder() {
  const inp = qs("#i");
  orders.shift();
  listPeople?.firstChild.remove();
  inp.value = "";
  return;
}

//Input event
inp?.addEventListener("keydown", (ke) => {
  console.log(orders);
  if (ke.key === "Enter") {
    const firstOrder = orders[0];

    // refuse command if total equal 13
    if (
      firstOrder.shouldEqual13 &&
      inp.value === `refuse order ${firstOrder.orderId}`
    ) {
      removeLastOrder();
    }

    const e = ce("li");
    e.textContent = inp.value;
    if (
      firstOrder.order.includes(inp.value.trim()) &&
      !firstOrder.shouldEqual13
    ) {
      e.style.color = "green";
      firstOrder.order.splice(firstOrder.order.indexOf(inp.value), 1);
      if (firstOrder.order.length === 0) {
        removeLastOrder();
      }
    } else {
      e.style.color = "red";
    }

    inp.value = "";
    qs("div>ul")?.append(e);
  }
});

const generateRandomMinMax = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generateOrder = (difficulty) => {
  if (difficulty === "easy") {
    let shouldEqual13 = Math.random() > 0.5;
    let numberOfItems = 0;
    return {
      order: meals
        .sort(() => Math.random() - 0.5)
        .slice(0, generateRandomMinMax(minItem, maxItem))
        .reduce((acc, e, idx, elements) => {
          let nb = generateRandomMinMax(minItem, maxItem);

          if (idx === elements.length - 1) {
            if (shouldEqual13) {
              nb = 13 - numberOfItems;
            }
          }
          numberOfItems += nb;
          if (numberOfItems === 13) shouldEqual13 = true;
          e = nb + " " + e;
          acc.push(e);
          return acc;
        }, []),
      shouldEqual13,
      orderId: ++lastIdOrder,
    };
  }
};

const addNewOrder = (difficulty) => {
  const orderDiv = ce("div");
  orderDiv.className = "order";
  const newOrder = generateOrder(difficulty);
  orderDiv.innerHTML = "Order id: " + newOrder.orderId;

  newOrder.order.forEach((e) => {
    const el = ce("li");
    el.innerHTML = e;
    orderDiv.append(el);
  });
  listPeople?.append(orderDiv);
  orders.push(newOrder);
};

function gameloop() {
  addNewOrder("easy");
  const gameTO = setTimeout(gameloop, delay);
  if (orders.length === 12) {
    clearTimeout(gameTO);
    console.log("GAME OVER");
  }
}

gameloop();
