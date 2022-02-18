let sum = 0;
let flag = 0;
let listCosts = [];

window.onload = async() => {
  const mainContainer = document.getElementById("mainContainer");
  const addInList = document.getElementById("addInList");
  addInList.onclick = () => addCosts();
  const inputPlace = document.getElementById("inputPlace");
  inputPlace.addEventListener("change", inputPlaceValue);
  const inputSpent = document.getElementById("inputSpent");
  inputSpent.addEventListener("change", inputSpentValue);
    
  const resp = await fetch("http://localhost:8000/allCosts", {
    method: "GET",
  });
  let result = await resp.json();
  listCosts = result.data;

  render();
};

const addCosts = async() => {
  let placeName = inputPlace.value;
  let spent = inputSpent.value;

  if (inputPlace.value === "" || inputSpent.value === "") {
    alert("Заполните все поля");
  };

  const resp = await fetch("http://localhost:8000/createCosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      place: placeName,
      date: new Date(),
      spent: spent
    }),
  });
  
  const result  = await resp.json();
  listCosts = result.data;
  
  inputPlace.value = "";
  inputSpent.value = "";
  place = "";
  spent = "";

  render();
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
    let {place, spent, _id, flag} = listCosts[index];
    const newSpent = Number(spent);
    const container = document.createElement("div");
    container.id = `costs-${index}`;
    container.className = "costs-container";

    if(listCosts[index].flag === 1) {
      inputPlaceChange = document.createElement("input");
      inputPlaceChange.type = "text";
      inputPlaceChange.addEventListener("change", inputChangePlaceValue);
      inputPlaceChange.value = place;
      container.appendChild(inputPlaceChange);
      
      inputSpentChange = document.createElement("input");
      inputSpentChange.type = "text";
      inputSpentChange.addEventListener("change", inputChangeSpentValue);
      inputSpentChange.value = listCosts[index].spent;
      container.appendChild(inputSpentChange);

      const acceptButton = document.createElement("button");
      acceptButton.onclick = () => acceptFun(place, spent, _id, index);
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
    } else {
      let text = document.createElement("p");
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
      deleteButton.onclick = () => deleteFun(_id);
      
      const imageDelete = document.createElement("img");
      imageDelete.src = "img/remove.svg";
      deleteButton.appendChild(imageDelete);
      
      buttonArea.appendChild(changeButton);
      buttonArea.appendChild(deleteButton);
      container.appendChild(text);
      container.appendChild(date);
      container.appendChild(spent);
      container.appendChild(buttonArea);
    };
    
    content.appendChild(container);
  });
};

let inputPlaceValue = (event) => {
  inputPlace.value = event.target.value;
};

let inputSpentValue = (event) => {
  inputSpent.value = event.target.value;
};

let inputChangePlaceValue = (event) => {
  inputPlaceChange.value = event.target.value;
};

let inputChangeSpentValue = (event) => {
  inputSpentChange.value = event.target.value;
};

const deleteFun = async (_id) => {
  const resp = await fetch(`http://localhost:8000/deleteCosts?_id=${_id}`, {
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
};

const acceptFun = async (place, spent, _id, index) => { 
  place = inputPlaceChange.value;
  spent = inputSpentChange.value;
  const resp = await fetch("http://localhost:8000/changeCost", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      place: place,
      date: new Date(),
      spent: spent,
      _id: _id
    }),
  });

  let result = await resp.json();
  listCosts = result.data;
  listCosts[index].flag = 0;
  
  inputSpent.value = "";
  inputPlace.value = "";

  render();
};