
const submit = document.querySelector("#submit")
const empty = document.querySelector(".empty")
const form = document.querySelector(".review-form")
const textOne = document.getElementById("text1")
const items = document.querySelector(".items-list")
const list = document.querySelector(".review-list")

let editElem;
let editFlag = false;
let editId = "";

window.addEventListener("DOMContentLoaded",setupItems);
form.addEventListener("submit",addItem);


function addItem(e){
    e.preventDefault();
    const value = textOne.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag){
       createListItems(id,value);
        items.classList.add("show-container");
        addToLocalStorage(id,value);
        setBackToDefault();
    }
    else if(value && editFlag){
        editElem.innerHTML = value;
        editLocalStorage(editId,value);
        setBackToDefault();
    }
}
function displayEmpty(text){
    empty.textContent = text;
}
function deleteItem(e){
    const ele1 = e.currentTarget.parentElement.parentElement;
    const id = ele1.dataset.id;
    list.removeChild(ele1);
    if(list.children.length === 0){
        items.classList.remove("show-container");
    }
    setBackToDefault();
    removeFromLocalStorage(id);
}
function editItem(e){
    const ele1 = e.currentTarget.parentElement.parentElement;
    editElem = e.currentTarget.parentElement.previousElementSibling;
    textOne.value = editElem.innerHTML;
    submit.textContent = "Edit";
    editFlag =true;
    editId = ele1.dataset.id;      
       
}
function setBackToDefault(){
    textOne.value = '';
    editFlag = false;
    editId = "";
    submit.textContent = "ADD";
}

function addToLocalStorage(id,value){
   const ele = {id:id, value:value};
   let stuffs = localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
   stuffs.push(ele);
    localStorage.setItem('list',JSON.stringify(stuffs));   
}
function removeFromLocalStorage(id){
    let items = getLOcalStorage();
    items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    })
    localStorage.setItem('list',JSON.stringify(items));
}

function editLocalStorage(id,value){
    let items = getLOcalStorage();
    items = items.map(function(item){
        if(item.id === id){
             item.value = value;
        }
        return item;
    })
    localStorage.setItem('list',JSON.stringify(items));
}
function getLOcalStorage(){
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.stringify("list")):[];
}

function setupItems(){
    let item1 = getLOcalStorage();
    if(item1.length()>0)
    {
        item1.forEach(function(item){
            createListItems(item.id,item.value);
        })
        items.classList.add("show-container");
       
    }
}

function createListItems(id,value){
    const ele = document.createElement("article");
    ele.classList.add("review-item");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    ele.setAttributeNode(attr);
    ele.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fa fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fa fa-trash"></i>
        </button>    
    </div>`;
const deleteBtn = ele.querySelector('.delete-btn');
const editBtn = ele.querySelector('.edit-btn');
deleteBtn.addEventListener('click',deleteItem);
editBtn.addEventListener('click',editItem);
    //append child
    list.appendChild(ele);
}
function getAllReviews(){
    var x = document.querySelectorAll("[class='title']");
    var data1=[];
    for (var i=0;i<x.length;i++) {
       data1.push(x[i].textContent);   
    }
    document.getElementById("acknow").innerHTML="Review Submited";
        
    console.log(data1);
    var data_json = JSON.stringify(data1);
    var xhr = new XMLHttpRequest();
    xhr.open("POST","https://ease-your-study-1.herokuapp.com/EaseYourStudy/reviews",true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
    
       var data = JSON.parse(xhr.responseText);
       if (xhr.readyState == 4 && xhr.status == "201") {
           console.log(data);
        } else {
        console.log(data);
  }
 

}
xhr.send(data_json);
}