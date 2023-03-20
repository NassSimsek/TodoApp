//UI variablas

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
//const items = ['item1', 'item2', 'item3', 'item4'];// Veri tabanından veri çek 
let items;


loadItems();
eventListeners();


function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);
    //delete an item
    taskList.addEventListener('click', deleteItem);
    //deleteAll items
    btnDeleteAll.addEventListener('click', deleteAllItems);

}

function loadItems() {
    items=getItemsFromLS();// itemsları local storage dan çektin daha doğrusu çekmek için fonk yazdın
    items.forEach(function (item) {
        createItem(item);
    })

}

//get items from local storage
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items=[];
    }else{
        items=JSON.parse(localStorage.getItem('items'));
    }
    return items
}

//set item to localStorage
function setItemToLS(text){
items=getItemsFromLS();
items.push(text);// var olan listeye elemanı ekledin
localStorage.setItem('items',JSON.stringify(items));
}

// delete item from LS
function deleteItemLS(text){
     items=getItemsFromLS();
     items.forEach(function(item,index){
         if(item===text){
             items.splice(index,1);
         }

     });
     localStorage.setItem('items',JSON.stringify(items));
}



function createItem(text) {
    //create li tıpkı html de ki gibi özelliklerl ver 
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    //input.value append to li
    li.appendChild(document.createTextNode(text));

    //create a 
    const a = document.createElement('a');
    a.className = 'delete-item float-right';
    a.setAttribute('href', "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    // add a to li
    li.appendChild(a);

    //li append to ul
    taskList.appendChild(li);
}


function addNewItem(e) {
    if (input.value === "") {
        alert('Add new item please');
        e.preventDefault();
        return;
    }
    //create ıtem
    createItem(input.value);

    // save to LS
    setItemToLS(input.value);

    //clear input 
    input.value = '';

    e.preventDefault();
}


function deleteItem(e) {
    
        if (e.target.className === 'fas fa-times') {
            if (confirm("are you sure?")) {
            e.target.parentElement.parentElement.remove();
            
            // delete ıtem from LS
            deleteItemLS(e.target.parentElement.parentElement.textContent);
            
        }
    }
    e.preventDefault();
}



function deleteAllItems(e) {
    //kolayı yol
    // taskList.innerHTML='';

    if (confirm('are you sure?')) {
        /*taskList.childNodes.forEach(function (item) {
            if (item.nodeType === 1) {
                item.remove();
            }

        });
        */
       while(taskList.firstChild){// mis gibi basit çözüm
           taskList.removeChild(taskList.firstChild);
        }
       localStorage.clear();// hepsini ls ten de siler 
    }
    e.preventDefault();
}

// boş eleman da uyarıdan sonra boşluğu ekliyor sen onu return ile hal ettin doğru mu ?
// hata şu ki sen yeni elemanlar ekle sonra boş ekle o sonradan eklediklerini siliyor
// çünkü uyarıyor ve devam ediyor bir kere çağrıldı yani
// daha sonra delete all doğru çalışmadı son elemanı bırakıyor silmiyor 
// return den sonra mı oldu? emin ol
