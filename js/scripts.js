var TsBlocks = document.querySelectorAll(".tttBlock");
var side = "circle";
// Функция замыкания, принимает блок и сторону за которую играет игрок
var TsBlockaddListener = function (tBlock) {
  tBlock.addEventListener("click", function () {
    if (side === "cross") {
      tBlock.classList.add("xTern");
    } else if (side === "circle") {
      tBlock.classList.add("oTern");
    }
  });
};
for (let i = 0; i < TsBlocks.length; i++) {
  TsBlockaddListener(TsBlocks[i]);
}
