import "./style.css";

const orders = [];

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

//People order list
const listPeople = qs("div#listHorizontal");

//Input event
const inp = qs("#i");
inp?.addEventListener("keydown", (ke) => {
  console.log(orders);
  if (ke.key === "Enter") {
    const firstOrder = orders[0];
    console.log("firs", firstOrder);
    const e = ce("li");
    e.textContent = inp.value;
    console.log("first", firstOrder, firstOrder.includes(inp.value));
    if (firstOrder.includes(inp.value)) {
      e.style.color = "green";
      firstOrder.splice(firstOrder.indexOf(inp.value), 1);
      if (firstOrder.length === 0) {
        orders.pop();
        listPeople?.firstChild.remove();
      }
    } else {
      e.style.color = "red";
    }

    qs("div>ul")?.append(e);
    inp.value = "";
  }
});

const generateRandomMinMax = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generateOrder = (difficulty) => {
  if (difficulty === "easy") {
    return meals
      .sort(() => Math.random() - 0.5)
      .slice(0, generateRandomMinMax(1, 3))
      .map((e) => generateRandomMinMax(1, 6) + " " + e);
  }
};

const addNewOrder = (difficulty) => {
  const orderDiv = ce("div");
  orderDiv.className = "order";
  orderDiv.innerHTML = "Order:";
  const newOrder = generateOrder(difficulty);
  newOrder.forEach((e) => {
    const el = ce("li");
    el.innerHTML = e;
    orderDiv.append(el);
  });
  listPeople?.append(orderDiv);
  orders.push(newOrder);
};

function gameloop() {
  addNewOrder("easy");
  const gameTO = setTimeout(gameloop, 5000);
  if (orders.length === 12) {
    clearTimeout(gameTO);
    console.log("GAME OVER");
  }
}

gameloop();
