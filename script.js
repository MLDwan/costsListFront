let sum = 0;
let flag = 0;
let listCosts = [];

window.onload = async () => {
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

const addCosts = async () => {
  let placeName = inputPlace.value;
  let spent = inputSpent.value;

  if (isNaN(spent) || spent.trim() == "" || placeName.trim() == "") {
    alert("Заполните все поля или проверте корректность данных");
  } else {
    const resp = await fetch("http://localhost:8000/createCosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        place: placeName,
        date: new Date(),
        spent,
      }),
    });

    const result = await resp.json();
    listCosts = result.data;
    
    inputPlace.value = "";
    inputSpent.value = 0;
    place = "";
    spent = null;
  }

  render();
};

const render = () => {
  sum = 0;
  const content = document.getElementById("content");

  while (content.firstChild) {
    content.removeChild(content.lastChild);
  }
  let summ = document.createElement("p");
  summ.innerText = `Итого: ${sum} Р.`;
  content.appendChild(summ);

  listCosts.map((item, index) => {
    let {place, spent, _id, date, flag} = listCosts[index];
  
    let dateIndex = prettyDate(date);
    
    const container = document.createElement("div");
    container.id = `costs-${index}`;
    container.className = "costs-container";
    
    if (flag > 0) {
      if (flag === 1) {
        inputPlaceChange = document.createElement("input");
        inputPlaceChange.type = "text";
        inputPlaceChange.addEventListener("change", inputChangePlaceValue);
        inputPlaceChange.value = place;
        container.appendChild(inputPlaceChange);

        inputSpentChange = document.createElement("input");
        inputSpentChange.type = "number";
        inputSpentChange.addEventListener("change", inputChangeSpentValue);
        inputSpentChange.value = spent;
        container.appendChild(inputSpentChange);

        dateChange = document.createElement("input");
        dateChange.type = "date";
        dateChange.addEventListener("change", dateChangetValue);
        dateChange.min = "2022-01-01";
        dateChange.max = "2022-12-31";
        dateChange.value = date.slice(0, 10);
        container.appendChild(dateChange);

        const acceptButton = document.createElement("button");
        acceptButton.onclick = () => acceptFun(place, spent, index, _id, dateIndex);
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
      };

      if (flag === 2) {
        inputPlaceChange = document.createElement("input");
        inputPlaceChange.type = "text";
        inputPlaceChange.addEventListener("change", inputChangePlaceValue);
        inputPlaceChange.value = place;
        container.appendChild(inputPlaceChange);

        const acceptButton = document.createElement("button");
        acceptButton.onclick = () => acceptFun(place, spent, index, _id);
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

        const date = document.createElement("p");
        date.addEventListener(
          "dblclick",
          (doubleTapDate = (event) => {
            flag = 3;
            render();
          })
        );
        date.innerText = date;

        const spentText = document.createElement("p");
        spentText.addEventListener(
          "dblclick",
          (doubleTapPlace = (event) => {
            flag = 4;
            render();
          })
        );
      } else {
        if (flag === 4) {
          inputSpentChange = document.createElement("input");
          inputSpentChange.type = "number";
          inputSpentChange.addEventListener("change", inputChangeSpentValue);
          inputSpentChange.value = spent;
          container.appendChild(inputSpentChange);

          const acceptButton = document.createElement("button");
          acceptButton.onclick = () =>
            acceptFun(place, spent, index, _id, date);
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

          const text = document.createElement("p");
          text.addEventListener(
            "dblclick",
            (doubleTapPlace = (event) => {
              flag= 2;
              render();
            })
          );
          date.innerText = date;

          const spentText = document.createElement("p");
          spentText.addEventListener(
            "dblclick",
            (doubleTapSpent = (event) => {
              flag= 4;
              render();
            })
          );
        };
      };

      if (flag === 3) {
        dateChange = document.createElement("input");
        dateChange.type = "date";
        dateChange.addEventListener("change", dateChangetValue);
        dateChange.min = "2022-01-01";
        dateChange.max = "2022-12-01";
        dateChange.value = date.slice(0, 10);

        container.appendChild(dateChange);

        const acceptButton = document.createElement("button");
        acceptButton.onclick = () => acceptFun(place, spent, index, _id, dateIndex);
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
      };
    } else {
      const secondContent = document.createElement("div");
      secondContent.className = "secondContent";

      const infoContent = document.createElement("div");
      infoContent.className = "infoContent";

      const text = document.createElement("p");
      text.addEventListener(
        "dblclick",
        (doubleTapPlace = (event) => {
          console.log(flag, listCosts[index].flag );
          listCosts[index].flag = 2;
          render();
        })
      );
      text.innerText = `${index + 1}) Магазин: "${item.place}"`;

      const date = document.createElement("p");
      date.addEventListener(
        "dblclick",
        (doubleTapDate = (event) => {
          listCosts[index].flag = 3;
          render();
        })
      );
      date.innerText = dateIndex;

      const spentText = document.createElement("p");
      spentText.addEventListener(
        "dblclick",
        (doubleTapSpent = (event) => {
          listCosts[index].flag = 4;
          render();
        })
      );
      spentText.innerText = `${spent} Р`;

      sum = sum + spent;
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
      container.appendChild(secondContent);
      infoContent.appendChild(date);
      infoContent.appendChild(spentText);
      secondContent.appendChild(infoContent);
      secondContent.appendChild(buttonArea);
    };    
    content.appendChild(container);
  });
};

const prettyDate = (a) => {
    a = a.slice(0, 10);
    let b = a.split("-");
    b = b.reverse().join("-");
    return b;
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

let dateChangetValue = (event) => {
  dateChange.value = event.target.value;
};

const deleteFun = async (_id) => {
  const resp = await fetch(`http://localhost:8000/deleteCosts?_id=${_id}`, {
    method: "DELETE",
  });
  let result = await resp.json();
  listCosts = result.data;

  render();
};

const changeFun = (index, flag) => {
  listCosts[index].flag = 1;

  render();
};

const cancelFun = (index) => {
  listCosts[index].flag = 0;

  render();
};

const acceptFun = async (place, spent, index, _id, date) => {
  if (listCosts[index].flag === 1) {
    place = inputPlaceChange.value;
    date = new Date(dateChange.value);
    spent = inputSpentChange.value;
  };

  if (listCosts[index].flag === 2) {
    place = inputPlaceChange.value;
  };

  if (listCosts[index].flag === 3) {
    date = new Date(dateChange.value);
    if (date == "Invalid Date") {
      date = new Date();
    };
  };

  if (listCosts[index].flag === 4) {
    spent = inputSpentChange.value;
  };

  if (date == "Invalid Date") {
    date = new Date();
  };

  if (isNaN(spent) || spent == 0 || place == "") {
    alert("Заполните все поля или проверьте корректность данных");
  } else {
    const resp = await fetch("http://localhost:8000/changeCost", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        place,
        spent,
        date,
        _id,
      }),
    });

    let result = await resp.json();
    listCosts = result.data;
    listCosts[index].flag = 0;

    inputSpent.value = null;
    inputPlace.value = "";

    render();
  };
};
