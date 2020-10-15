var databaseURL = "js/JSON/Users.json";
var request = new XMLHttpRequest();

/*var Jsonstring = {
  login: "Hulores",
  password: 123,
  winEasyBot: 3,
  winHardBot: 6,
  loseEasyBot: 2,
  loseHardBot: 3,
};
Jsonstring = JSON.stringify(Jsonstring);
request.open("POST", databaseURL);
request.setRequestHeader("Content-Type", "application/json");
request.send(Jsonstring);
*/
request.open("GET", databaseURL);
request.responseType = "json";
request.send();
request.onload = function () {
  var database = request.response;
  var allUsers = database["users"];
  var enterButton = document.getElementById("enter-button");
  var popupShow = document.querySelector(".b-popup");
  //Добавляем листенер для кнопки
  enterButton.addEventListener("click", function () {
    var login = document.getElementById("login");
    var password = document.getElementById("password");
    var showUserName = document.querySelector(".userName");
    var winEasyBot = document.querySelector(".winEasyBot");
    var winHardBot = document.querySelector(".winHardBot");
    var loseEasyBot = document.querySelector(".loseEasyBot");
    var loseHardBot = document.querySelector(".loseHardBot");
    //Проверка введения всех полей
    if (login.value != "" && password.value != "") {
      //Переменная для детекта нового пользователя
      newUser = true;
      //Проверка логина и пароля
      for (let i = 0; i < allUsers.length; i++) {
        if (login.value == allUsers[i].login) {
          if (password.value == allUsers[i].password) {
            showUserName.textContent = allUsers[i].login;
            winEasyBot.textContent = allUsers[i].winEasyBot;
            winHardBot.textContent = allUsers[i].winHardBot;
            loseEasyBot.textContent = allUsers[i].loseEasyBot;
            loseHardBot.textContent = allUsers[i].loseHardBot;
            //Скрываем попап
            newUser = false;
            popupShow.classList.remove("b-popup-show");
          } else {
            //Если пароль не верный
            alert(
              "Неверный пароль или пользователь с таким логином уже существует"
            );
          }
        }
      }
      if (newUser == true) {
      }
    } else {
      alert("Введите каждое поле");
    }
  });
};
