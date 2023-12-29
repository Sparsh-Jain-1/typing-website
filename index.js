const englishWords = [
  "apple",
  "banana",
  "orange",
  "grape",
  "kiwi",
  "melon",
  "peach",
  "plum",
  "pear",
  "lemon",
  "cherry",
  "berry",
  "avocado",
  "mango",
  "pineapple",
  "strawberry",
  "blueberry",
  "watermelon",
  "raspberry",
  "blackberry",
  "peanut",
  "almond",
  "cashew",
  "pistachio",
  "walnut",
  "pecan",
  "macadamia",
  "hazelnut",
  "chestnut",
  "coconut",
  "carrot",
  "broccoli",
  "spinach",
  "cucumber",
  "zucchini",
  "lettuce",
  "tomato",
  "potato",
  "onion",
  "garlic",
  "pepper",
  "cabbage",
  "cauliflower",
  "asparagus",
  "eggplant",
  "radish",
  "celery",
  "pumpkin",
  "squash",
  "sweetpotato",
  "cantaloupe",
  "honeydew",
  "apricot",
  "fig",
  "date",
  "raisin",
  "prune",
  "cranberry",
  "currant",
  "elderberry",
  "rhubarb",
  "artichoke",
  "kale",
  "cabbage",
  "turnip",
  "beet",
  "rutabaga",
  "parsnip",
  "cress",
  "endive",
  "escarole",
  "arugula",
  "cilantro",
  "parsley",
  "thyme",
  "rosemary",
  "basil",
  "sage",
  "mint",
  "oregano",
  "lavender",
  "chamomile",
  "coriander",
  "cinnamon",
  "nutmeg",
  "ginger",
  "vanilla",
  "cloves",
  "cumin",
  "mustard",
  "peppermint",
  "spearmint",
  "juniper",
  "marjoram",
  "dill",
  "fennel",
  "anise",
  "tarragon",
  "bayleaf",
  "cardamom",
];
const spanhalder = document.querySelector(".spanhalder");
const input = document.getElementById("input");
const wordnumber = document.getElementById("wordnumber");
const right1 = document.getElementById("right1");
const charactercc = document.getElementById("CHARACTERcount");
const url = "http://localhost:3000/api/words";
let rightwords = [0, "", "", "", "", "", "", "", "", "", "", ""];
let inputstring = "";
let rightstring = "";
let wrong = "";
let timesRun=59;
let correctword=0;
let interval;
function maketoright() {
  for (let i = 1; i <= 11; i++) {
    rightwords[i] =
      englishWords[Math.floor(Math.random() * englishWords.length)];
  }
  arraytospan(rightwords, "right");
}
maketoright();
document.getElementById("left").addEventListener("click", () => {
  input.focus();
});
input.addEventListener('focus',function(e){
  if(!interval) {
    interval = setInterval(function () {
      document.getElementById('time').innerHTML=timesRun;
      timesRun -= 1;
      if (timesRun === -1) {
          input.contentEditable=false;
          document.getElementById('ontop').style='display:block;'
          document.getElementById('p2').innerText=parseInt(wordnumber.innerText) +' words/min';
          document.getElementById('p4').innerText=Math.round(correctword/Number(wordnumber.innerText)*100) +'%';

          clearInterval(interval);
      }
  }, 1000);
  }else{
  }
})
input.addEventListener("keypress", function (e) {
  inputstring = inputstring == "Enter" ? "" : inputstring;
  inputstring += e.key.trim();
  rightstring = rightwords[1].substring(0, inputstring.length);
  if (inputstring === rightstring || e.keyCode == 32) {
    input.style = "text-decoration: none";
    kaamkaro();
  } else {
    wrong += e.key;
    input.style = "text-decoration: line-through";
  }
  dosomething(e, 32);
});
input.addEventListener("keydown", function (e) {
  if (e.keyCode == 8) {
    inputstring = inputstring.substring(0, inputstring.length - 1);
    rightstring = rightstring.substring(0, inputstring.length);
    wrong = wrong.substring(0, wrong.length - 1);
    if (wrong.length < 1) {
      input.style = "text-decoration: none";
      bapiskarorightme(inputstring.length + 1);
    }
  }
  dosomething(e, 13);
});

function maketoleft(str,bol) {
  const span = document.createElement("p");
  span.innerHTML = str;
  if(!bol){
   span.classList.add('wrong')
  }
  spanhalder.appendChild(span);
}
function arraytospan(arr, side) {
  for (let i = 1; i < arr.length; i++) {
    document.getElementById(`${side}${i}`).innerText = arr[i];
  }
}
function swapwalafunction() {
  for (let i = 1; i < rightwords.length; i++) {
    rightwords[i] = rightwords[i + 1];
  }
  rightwords[11] =
    englishWords[Math.floor(Math.random() * englishWords.length)];
}
function dosomething(e, value) {
  if (input.innerText.length > 0) {
    event.charCode = value == 32 ? 13 : 32;
    event.charCode = value;
    if (e.keyCode == value) {
      correctword=(inputstring === rightstring)?++correctword:correctword
      maketoleft(input.innerText.trim(),(inputstring === rightstring)?true:false);
      swapwalafunction();
      arraytospan(rightwords, "right");
      wordnumber.innerHTML = parseInt(wordnumber.innerText) + 1;
      charactercc.innerHTML=Number(charactercc.innerText.trim())+inputstring.trim().length
      input.innerHTML = "";
      inputstring = "";
      wrong = "";
      rightstring = "";
    }
  } else {
    if (e.which == (value == 32 ? 13 : 32)) e.preventDefault();
    if (e.which == value) e.preventDefault();
  }
}
function bapiskarorightme(index) {
  let word = rightwords[1];
  word = word.substring(index - 1, word.length);
  right1.innerText = word;
}
function kaamkaro() {
  right1.innerText = right1.innerText
    .trim()
    .substring(1, right1.innerText.trim().length);
}
function cross() {
  document.getElementById('ontop').style='display:none;'
  input.contentEditable=true;
  wordnumber.innerText=0;
  document.getElementById('time').innerText=60;
  charactercc.innerHTML=0;
  interval=clearInterval(interval)
  timesRun=59
  correctword=0;
  spanhalder.innerHTML='';
}