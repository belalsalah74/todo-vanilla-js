const form = document.getElementById("form");
const btn = document.getElementById("btn");
const container = document.querySelector(".container");
const input = document.querySelector("input");
const itemsHtmlList = document.querySelector(".items-list");
const storageList = localStorage.getItem("items");
let itemsList = storageList && storageList != [] ? JSON.parse(storageList) : [];
let itemId;

input.focus();

loadItemsFromStorage();
form.addEventListener("submit", createItem);

function createItem(event) {
  event.preventDefault();
  itemId = itemId ? itemId : 1;
  const item = {
    id: itemId,
    title: input.value,
  };
  itemId++;
  addItemToList(item);
  input.value = "";
  input.focus();
}
function addItemToList(item) {
  if (item.title.length > 0) {
    itemsList.push(item);
    addItemsToPage(itemsList);
  }
}
function addItemsToPage(list) {
  itemsHtmlList.innerHTML = "";
  list.forEach(function (item) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.id = item.id;
    const itemP = document.createElement("p");
    itemP.className = "itemTitle";
    itemP.textContent = item.title;
    itemsHtmlList.appendChild(itemDiv);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";
    const checkBtn = document.createElement("button");
    checkBtn.className = "checkBtn";

    itemDiv.appendChild(itemP);
    itemDiv.appendChild(checkBtn);
    itemDiv.appendChild(deleteBtn);
  });
  addiItemsToStorage();
}

function addiItemsToStorage() {
  localStorage.setItem("items", JSON.stringify(itemsList));
}

function loadItemsFromStorage() {
  addItemsToPage(itemsList);
}
const deleteBtn = document.querySelector(".deleteBtn");
const checkBtn = document.querySelector(".checkBtn");

if (deleteBtn) {
  deleteBtn.addEventListener("click", deleteItem);
}
if (checkBtn) {
  checkBtn.addEventListener("click", checkItem);
}
function deleteItem(e) {
  itemDiv = e.target.parentElement;
  itemDiv.remove();
  itemsList = JSON.parse(storageList).filter((e) => e["id"] != itemDiv.id);
  addiItemsToStorage(itemsList);
}

function checkItem(e) {
  e.target.classList.toggle("checked");
}
