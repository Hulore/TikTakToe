//Переменная блоков
var TsBlocks = document.querySelectorAll(".tttBlock");
var crossSide = document.querySelector(".crossSide");
var circleSide = document.querySelector(".circleSide");
//Переменная для стороны
var side;
var antiside;
//Создаём листенеры для кнопок выбора сторон
crossSide.addEventListener("click", function () {
  if (!side) {
    circleSide.classList.remove("background-choose");
    crossSide.classList.add("background-choose");
    side = "cross";
    antiside = "circle";
  }
});
circleSide.addEventListener("click", function () {
  if (!side) {
    crossSide.classList.remove("background-choose");
    circleSide.classList.add("background-choose");
    side = "circle";
    antiside = "cross";
    botTern();
  }
});
//Функция вставки знака бота
var setBotChar = function (numBlock) {
  if (antiside == "cross") {
    TsBlocks[numBlock].classList.add("xTern");
  } else {
    TsBlocks[numBlock].classList.add("oTern");
  }
};
//Фунция для целых случайных чисел
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
//Функция рандомного хода
var randomTern = function (logicArray) {
  let testTernBot = getRandomInt(9);
  if (logicArray[testTernBot] == 0) {
    setBotChar(testTernBot);
    return true;
  } else {
    return false;
  }
};
//Функция перебора 3-ел-ов
var tripleReseach = function (
  num1,
  idElement1,
  num2,
  idElement2,
  num3,
  idElement3
) {
  if (num1 == num2 && num1 != "0" && num3 == "0") {
    if (num1 == "+") {
      return "F" + idElement3;
    } else {
      return idElement3;
    }
  } else if (num1 == num3 && num1 != "0" && num2 == "0") {
    if (num1 == "+") {
      return "F" + idElement2;
    } else {
      return idElement2;
    }
  } else if (num2 == num3 && num2 != "0" && num1 == "0") {
    if (num2 == "+") {
      return "F" + idElement1;
    } else {
      return idElement1;
    }
  } else {
    return false;
  }
};
//Функция хорошего хода
var halfmindTern = function (logicArray) {
  let miniSuperTurnArray = [];
  let miniSuperTurn = false;
  //Создание массива
  miniSuperTurnArray[0] = tripleReseach(
    logicArray[0],
    0,
    logicArray[1],
    1,
    logicArray[2],
    2
  );
  miniSuperTurnArray[1] = tripleReseach(
    logicArray[3],
    3,
    logicArray[4],
    4,
    logicArray[5],
    5
  );
  miniSuperTurnArray[2] = tripleReseach(
    logicArray[6],
    6,
    logicArray[7],
    7,
    logicArray[8],
    8
  );
  miniSuperTurnArray[3] = tripleReseach(
    logicArray[0],
    0,
    logicArray[3],
    3,
    logicArray[6],
    6
  );
  miniSuperTurnArray[4] = tripleReseach(
    logicArray[1],
    1,
    logicArray[4],
    4,
    logicArray[7],
    7
  );
  miniSuperTurnArray[5] = tripleReseach(
    logicArray[2],
    2,
    logicArray[5],
    5,
    logicArray[8],
    8
  );
  miniSuperTurnArray[6] = tripleReseach(
    logicArray[0],
    0,
    logicArray[4],
    4,
    logicArray[8],
    8
  );
  miniSuperTurnArray[7] = tripleReseach(
    logicArray[2],
    2,
    logicArray[4],
    4,
    logicArray[6],
    6
  );
  for (let i = 0; i < miniSuperTurnArray.length; i++) {
    if (miniSuperTurnArray[i] !== false) {
      if (miniSuperTurnArray[i] > -1 && miniSuperTurnArray[i] < 9) {
        miniSuperTurn = miniSuperTurnArray[i];
      } else {
        console.log(miniSuperTurnArray[i]);
        miniSuperTurn = miniSuperTurnArray[i].substring(1);
        break;
      }
    }
  }
  if (miniSuperTurn !== false) {
    setBotChar(miniSuperTurn);
    return true;
  } else {
    return false;
  }
};
//Ход бота
var botTern = function () {
  //Создаем массив, который будет видеть бот
  let logicArrayBot = [];
  let freeslots = 0;
  //Он получает "+" - если клетка занята его стороной
  //"-" - если не его стороной
  //"0" - если клетка пуста
  // Генерируем массив значений блока клеток
  for (let i = 0; i < TsBlocks.length; i++) {
    if (TsBlocks[i].classList.contains("oTern") && antiside == "circle") {
      logicArrayBot[i] = "+";
    } else if (TsBlocks[i].classList.contains("xTern") && antiside == "cross") {
      logicArrayBot[i] = "+";
    } else if (TsBlocks[i].classList.contains("oTern") && antiside == "cross") {
      logicArrayBot[i] = "-";
    } else if (
      TsBlocks[i].classList.contains("xTern") &&
      antiside == "circle"
    ) {
      logicArrayBot[i] = "-";
    } else {
      logicArrayBot[i] = "0";
      freeslots += 1;
    }
  }
  if (freeslots != 0) {
    let turnTrue = false;

    while (turnTrue != true) {
      turnTrue = halfmindTern(logicArrayBot);
      if (turnTrue) {
        console.log("Умный ход");
      }
      //рандомный ход
      if (turnTrue == false) {
        turnTrue = randomTern(logicArrayBot);
      }
      if (turnTrue) {
        console.log("Рандомный ход");
      }
    }
  }
};
// Функция замыкания, принимает блок и сторону за которую играет игрок
var TsBlockaddListener = function (tBlock) {
  tBlock.addEventListener("click", function () {
    //Назначение блоку соответсвующего знака
    //Перед этим проверка, является ли блок пустым
    if (
      !tBlock.classList.contains("oTern") &&
      !tBlock.classList.contains("xTern")
    ) {
      if (side === "cross") {
        tBlock.classList.remove("oTern");
        tBlock.classList.add("xTern");
      } else if (side === "circle") {
        tBlock.classList.remove("xTern");
        tBlock.classList.add("oTern");
      } else {
        console.log("Ошибка");
      }

      //Реагирующий бот
      if (antiside == "cross" || antiside == "circle") {
        botTern();
      } else {
        console.log("Ошибка");
      }
    }
  });
};
for (let i = 0; i < TsBlocks.length; i++) {
  TsBlockaddListener(TsBlocks[i]);
}
