let sum = 0;
const listCosts = [];

window.onload = () => {
  const mainContainer = document.getElementById("mainContainer");
  const addInList = document.getElementById("addInList");
  addInList.onclick = () => addCosts();
  const inputPlace = document.getElementById("inputPlace");
  inputPlace.addEventListener("change", inputValue);
  const inputSpend = document.getElementById("inputSpend");
  inputSpend.addEventListener("change", inputValue);

  render();
};

const addCosts = () => {
  let placeName = inputPlace.value;
  let spend = inputSpend.value;
  if (inputPlace.value === "" || inputSpend.value === "") {
    alert("Заполните все поля");
  };

  let costs = { place: placeName, spend: spend };
  listCosts.push(costs);
  const numCost = Number(inputSpend.value);
  sum = sum + numCost;
  inputPlace.value = "";
  inputSpend.value = "";
  place = "";
  spend = "";

  render();
};

let inputValue = (event) => {
  inputValue = event.target.value;
};

const render = () => {
  const content = document.getElementById("content");
  while (content.firstChild) {
    content.removeChild(content.lastChild);
  };

  const summ = document.createElement("p");
  summ.innerText = `Итого: ${sum} Р.`;
  content.appendChild(summ);

  listCosts.map((item, index) => {
    const container = document.createElement("div");
    container.id = `costs-${index}`;
    container.className = "costs-container";

    let text = document.createElement("p");
    text.innerText = `${index + 1}) Магазин: "${item.place}"`;

    let spend = document.createElement("p");
    spend.innerText = `${item.spend} Р.`;

    const buttonArea = document.createElement("div");
    buttonArea.className = "buttonArea";

    const changeButton = document.createElement("button");
    changeButton.onclick = () => changeFun(index);

    const deleteButton = document.createElement("button");
    deleteButton.onclick = () => deleteFun(index);

    buttonArea.appendChild(changeButton);
    buttonArea.appendChild(deleteButton);

    container.appendChild(text);
    container.appendChild(spend);
    container.appendChild(buttonArea);
    content.appendChild(container);
  });
};

const deleteFun = (index) => {
  listCosts.splice(index, 1);
  
  render();
};

const changeFun = (index) => {
  console.log(listCosts[index]);
};
