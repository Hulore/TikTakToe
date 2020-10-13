//Переменная блоков
var TsBlocks = document.querySelectorAll(".tttBlock");
var crossSide = document.querySelector(".crossSide");
var circleSide = document.querySelector(".circleSide");
//Переменная для стороны
var side;
var antiside;
//Создаём листенеры для кнопок выбора сторон
crossSide.addEventListener("click", function () {
  circleSide.classList.remove("background-choose");
  crossSide.classList.add("background-choose");
  side = "cross";
  antiside = "circle";
  console.log(side);
});
circleSide.addEventListener("click", function () {
  crossSide.classList.remove("background-choose");
  circleSide.classList.add("background-choose");
  side = "circle";
  antiside = "cross";
  console.log(side);
});
//Фунция для целых случайных чисел
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
var botTern = function () {
  //Создаем массив, который будет видеть бот
  let logicArrayBot = [];
  let freeslots = 0;
  //Он получает "+" - если клетка занята его стороной
  //"-" - если не его стороной
  //"0" - если клетка пуста
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
  logicArrayBot.forEach((logicElement) => {
    console.log(logicElement);
  });
  if (freeslots != 0) {
    let turnTrue = false;
    while (turnTrue != true) {
      let testTernBot = getRandomInt(9);
      if (logicArrayBot[testTernBot] == 0) {
        turnTrue = true;
        console.log(antiside);
        if (antiside == "cross") {
          TsBlocks[testTernBot].classList.add("xTern");
        } else {
          TsBlocks[testTernBot].classList.add("oTern");
        }
      } else {
        testTernBot = getRandomInt(9);
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
