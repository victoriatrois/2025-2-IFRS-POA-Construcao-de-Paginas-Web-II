function add() {
  let addend1 = Number(document.querySelector("#addend1").value);
  let addend2 = Number(document.querySelector("#addend2").value);
  let sum = document.querySelector("#sum");

  sum.innerHTML = addend1 + addend2;
}
