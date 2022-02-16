let sum = 0;
const listCosts = [];

window.onload = () => {
  const mainContainer = document.getElementById("mainContainer");
  const addInList = document.getElementById("addInList");
  addInList.onclick = () => addCosts();
  const input = document.getElementById("input");
  input.addEventListener("change", inputValue);
  const input1 = document.getElementById("input1");
  input1.addEventListener("change", inputValue);
  sum = 0;

  render();
};

const addCosts = () => {
  let placeName = input.value;
  let spend = input1.value;
  if (input.value === "" || input1.value === "") {
    alert("Заполните все поля");
  }
  let costs = { place: placeName, spend: spend };
  listCosts.push(costs);
  const t = Number(input1.value);
  sum = sum + t;
  input.value = "";
  input1.value = "";
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
  }

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
