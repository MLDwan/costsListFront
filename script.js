let sum = 0;
let flag = 0;
let listCosts = [];

window.onload = async() => {
  const mainContainer = document.getElementById("mainContainer");
  const addInList = document.getElementById("addInList");
  addInList.onclick = () => addCosts();
  const inputPlace = document.getElementById("inputPlace");
  inputPlace.addEventListener("change", inputValue);
  const inputSpent = document.getElementById("inputSpent");
  inputSpent.addEventListener("change", inputValue);
    
  
  const resp = await fetch("http://localhost:8000/allCosts", {
    method: "GET",
  });
  let result = await resp.json();
  listCosts = result.body;

  render();
};

const addCosts = async() => {
  let placeName = inputPlace.value;
  let spent = inputSpent.value;
  const resp = await fetch("http://localhost:8000/createCosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      place: inputPlace.value,
      date: Date(),
      spent: inputSpent.value
    }),
  });
  if (inputPlace.value === "" || inputSpent.value === "") {
    alert("Заполните все поля");
  };

  let costs = { place: placeName, spent: spent };
  listCosts.push(costs);

  inputPlace.value = "";
  inputSpent.value = "";
  place = "";
  spent = "";

  render();
};

let inputValue = (event) => {
  inputValue = event.target.value;
};

const render = () => {
  
  sum = 0;
  const content = document.getElementById("content");
  while (content.firstChild) {
    content.removeChild(content.lastChild);
  };
  let summ = document.createElement("p");
  content.appendChild(summ);
  
  listCosts.map((item, index) => {
    
    const id = listCosts[index]._id;
    const placeIndex = listCosts[index].place;
    const spentIndex = listCosts[index].spent;
    const newSpent = Number(item.spent);
    const container = document.createElement("div");
    container.id = `costs-${index}`;
    container.className = "costs-container";
    if(listCosts[index].flag === 1) {
      placeInput = document.createElement("input");
      placeInput.type = "text";
      placeInput.addEventListener("change", inputValue);
      placeInput.value = listCosts[index].place;
      container.appendChild(placeInput);
      
      spentInput = document.createElement("input");
      spentInput.type = "text";
      spentInput.addEventListener("change", inputValue);
      spentInput.value = listCosts[index].spent;
      container.appendChild(spentInput);

      const acceptButton = document.createElement("button");
      acceptButton.onclick = () => acceptFun(placeIndex, spentIndex);
      container.appendChild(acceptButton);

      const cancelButton = document.createElement("button");
      cancelButton.onclick = () => cancelFun(index);
      container.appendChild(cancelButton);

    const imageAccept = document.createElement("img");
    imageAccept.src = "img/accept.svg";
    acceptButton.appendChild(imageAccept);

    const imageCancel = document.createElement("img");
    imageCancel.src = "img/cancel.svg";
    cancelButton.appendChild(imageCancel);
    } else {let text = document.createElement("p");
    text.innerText = `${index + 1}) Магазин: "${item.place}"`;

    let date = document.createElement('p');
    date.innerText = new Date().toLocaleDateString();

    let spent = document.createElement("p");
    spent.innerText = listCosts[index].spent;
    
    sum = sum + newSpent;
    summ.innerText = `Итого: ${sum} Р.`;

    const buttonArea = document.createElement("div");
    buttonArea.className = "buttonArea";

    const changeButton = document.createElement("button");
    changeButton.onclick = () => changeFun(index);

    const imageEdit = document.createElement("img");
    imageEdit.src = "img/editor.svg";
    changeButton.appendChild(imageEdit);

    const deleteButton = document.createElement("button");
    deleteButton.onclick = () => deleteFun(id);

    const imageDelete = document.createElement("img");
    imageDelete.src = "img/remove.svg";
    deleteButton.appendChild(imageDelete);

    buttonArea.appendChild(changeButton);
    buttonArea.appendChild(deleteButton);
    container.appendChild(text);
    container.appendChild(date);
    container.appendChild(spent);
    container.appendChild(buttonArea);
    }

    content.appendChild(container);
  });
};

const deleteFun = async (id) => {
  const resp = await fetch(`http://localhost:8000/deleteCosts?_id=${id}`, {
    method: "DELETE",
  });
  let result = await resp.json();
  listCosts = result.data;
  
  render();
};

const changeFun =  (index) => {
  listCosts[index].flag = 1;

  render();
};

const cancelFun = (index) => {
  listCosts[index].flag = 0;

  render();
}
const acceptFun = async (placeIndex, spentIndex) => { 
  console.log(inputPlace, inputSpent);
  inputPlace = inputValue;
  inputSpent = inputValue;
  console.log(inputPlace, inputSpent);
  const resp = await fetch("http://localhost:8000/changeCost", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      place: inputPlace.value,
      date: Date(),
      spent: inputSpent.value
    }),
  });

  let result = await resp.json();
  listCosts = result.data;

  place = "";
  spent = "";
  inputSpent.value = "";
  inputPlace.value = "";

  render();
};