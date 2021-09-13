var addTodoBtn = document.querySelector(".add-to-list");
var inputTodo = document.querySelector(".add-todo-input");

inputTodo.value='';
// ! ON REFRESH GET THE SAVED TODO LIST
document.addEventListener("DOMContentLoaded",getTodoFromLocalSrg);


// ! BY DEFAULT ALL THE TODOS ARE SHOWN SO ALL IS COLORED BLUE
document.querySelector(".show-all").classList.add("add-link-color");


// ! ADDING A TODO TO A TODO LIST
addTodoBtn.addEventListener("click",function(e){
    if(inputTodo.value == ''){
        e.preventDefault(); // ! PREVENT FROM ADDING THE TODO IF THE INPUT TODO STRING IS A EMPTY STRING
    }
    else{
        // ! CREATE A NEW TODO-LIST-ITEM DIV
        var todoListItem=document.createElement("div");
        todoListItem.classList.add("todo-list-item");
        if(document.querySelector("body").classList.contains("body-t2")){
            todoListItem.classList.add("todo-list-item-t2");
        }

        // ! CREATE A NEW TODO LABEL
        var todoListLebel=document.createElement("lable");
        todoListLebel.classList.add("todo-list-label");
        

        // ! CREATE A INPUT CHECKBOX
        var todoCheckBox=document.createElement("input");
        todoCheckBox.type="checkbox";

        // ! CREATE A SPAN FOR CUSTOM TODO CHECKBOX
        var todoCustomCheck=document.createElement("span");
        todoCustomCheck.classList.add("checkmark");
        if(document.querySelector("body").classList.contains("body-t2")){
            todoCustomCheck.classList.add("checkmark-t2");
        }
        // ! CREATE A SPAN FOR DISPLAYING THE LEBEL OF TODO
        var labelTodoText=document.createElement("span");
        var todoText=document.createTextNode(inputTodo.value); 
        labelTodoText.appendChild(todoText);
        labelTodoText.classList.add("lebel-text");

        // ! ADD TODO TO LOCAL STORAGE
        saveToLocalStorage(inputTodo.value);

        // ! APPEND INPUT CHECKBOX AND SPAN TO NEW TODO LABEL
        todoListLebel.appendChild(todoCheckBox);
        todoListLebel.appendChild(todoCustomCheck);
        todoListLebel.appendChild(labelTodoText);

        // ! CREATE A NEW IMG FOR DELETE OR CROSS BUTTON
        var deleteTodoIcon=document.createElement("img");
        deleteTodoIcon.setAttribute("src","images/icon-cross.svg");
        deleteTodoIcon.setAttribute("height","18px");
        deleteTodoIcon.classList.add("delete-todo-icon");

        // ! APPEND THE TODO LABEL AND IMG TO THE TODO-LIST-ITEM DIV
        todoListItem.appendChild(todoListLebel);
        todoListItem.appendChild(deleteTodoIcon);

        // ! APPEND THE TODO-LIST-ITEM DIV TO THE TODO-LIST-DIV
        var todoList=document.querySelector(".todo-list");
        todoList.appendChild(todoListItem);

        itemCounter();

        // ! CLEAR THE INPUT VALUE
        inputTodo.value='';
        addTodoBtn.classList.add("inactive-btn");

        // ! IF A TODO ITEM IS COMPLETED THEN CHECK IT AND PUT A LINE THROUGH THE LABEL...
        todoListLebel.addEventListener("click",function(e){
            todoListItem.classList.toggle("inactiveTodoItem");
            todoListLebel.classList.toggle("inactiveTodoLabel");
            todoCustomCheck.classList.toggle("inactiveTodo");
            itemCounter();
        });

        // ! DELETE A TODO FROM THE TODO LIST
        deleteTodoIcon.addEventListener("click",function(){
            todoListItem.remove();
            deleteTodoLocalSrg(todoListItem);
            itemCounter();
        });  
    }   
});

// ! ON CLICKING ALL, ALL THE TODO LISTS ARE SHOWN (BY DEFAULT)
document.querySelector(".show-all").addEventListener("click",function(){
    var listItem = document.querySelectorAll(".todo-list-item");
    listItem.forEach(function(item){
       item.style.display="flex";
    });

    // ! CHANGE THE COLOUR OF THE SELECTED LINK TO BLUE
    document.querySelector(".show-all").classList.add("add-link-color");
    document.querySelector(".show-active").classList.remove("add-link-color");
    document.querySelector(".show-completed").classList.remove("add-link-color");
});

// ! ON CLICKING ACTIVE ALL THE ACTIVE TODOS ARE SHOWN
document.querySelector(".show-active").addEventListener("click",function(){
    var listItem = document.querySelectorAll(".todo-list-item");
    listItem.forEach(function(item){
        if(!item.classList.contains("inactiveTodoItem")){
            item.style.display="flex";
        }else{
            item.style.display="none";
        }
    });

    // ! CHANGE THE COLOUR OF THE SELECTED LINK TO BLUE
    document.querySelector(".show-all").classList.remove("add-link-color");
    document.querySelector(".show-active").classList.add("add-link-color");
    document.querySelector(".show-completed").classList.remove("add-link-color");
});

// ! ON CLICKING COMPLETED ALL THE COMPLETED TODOS ARE SHOWN
document.querySelector(".show-completed").addEventListener("click",function(){
    var listItem = document.querySelectorAll(".todo-list-item");
    listItem.forEach(function(item){
        if(item.classList.contains("inactiveTodoItem")){
            item.style.display="flex";
        }else{
            item.style.display="none";
        }
    });

    // ! CHANGE THE COLOUR OF THE SELECTED LINK TO BLUE
    document.querySelector(".show-all").classList.remove("add-link-color");
    document.querySelector(".show-active").classList.remove("add-link-color");
    document.querySelector(".show-completed").classList.add("add-link-color");
});

// ! ON CLICKING CLEAR COMPLETED DELETE ALL THE COMPLETED TODOS
document.querySelector(".clear-completed").addEventListener("click",function(e){
    var listItem = document.querySelectorAll(".todo-list-item");
    var confirmDelete = confirm("Are you sure you want to delete all the completed todos?");
    if(confirmDelete){
        listItem.forEach(function(item){
            if(item.classList.contains("inactiveTodoItem")){
                item.remove();
                deleteTodoLocalSrg(item);
            }
        });
    }else{
        e.preventDefault();
    }
    
});


// ! COUNTS AND PRINTS THE NO OF REMAINING TODOS
function itemCounter(){
    var totalTodo = document.querySelectorAll(".todo-list-label").length;
    var inActiveTodo = document.querySelectorAll(".inactiveTodoLabel").length;
    var activeTodo = totalTodo - inActiveTodo ;
    document.querySelector(".total-active-todo").textContent = activeTodo + " items left";
}


// ! SAVING TO LOCAL STORAGE
function saveToLocalStorage(todo){
    var todoArr;
    if(localStorage.getItem("todoArr") == null){
        todoArr=[]; // ! NOT PRESENT SO CREATE AN ARRAY
    } 
    else{
        todoArr = JSON.parse(localStorage.getItem("todoArr")); // ! IF ALREADY PRESENT THEN PARSE IT BACK INTO AN ARRAY
    }
    todoArr.push(todo);
    localStorage.setItem("todoArr",JSON.stringify(todoArr));// ! SAVE IT BACK TO THE LOCAL STORAGE IN THE FORM OF A STRING
    
}

// ! ON REFRESH GET ALL THE TODOS FROM THE LOCAL STORAGE
function getTodoFromLocalSrg(){
    var todoArr;
    if(localStorage.getItem("todoArr") == null){
        todoArr=[]; //! NOT PRESENT SO CREATE AN ARRAY
    } 
    else{
        todoArr = JSON.parse(localStorage.getItem("todoArr")); // ! IF ALREADY PRESENT THEN PARSE IT BACK INTO AN ARRAY
    }
    todoArr.forEach(function(todo){
        // ! CREATE A NEW TODO-LIST-ITEM DIV
        var todoListItem=document.createElement("div");
        todoListItem.classList.add("todo-list-item");

        // ! CREATE A NEW TODO LABEL
        var todoListLebel=document.createElement("lable");
        todoListLebel.classList.add("todo-list-label");
        

        // ! CREATE A INPUT CHECKBOX
        var todoCheckBox=document.createElement("input");
        todoCheckBox.type="checkbox";

        // ! CREATE A SPAN FOR CUSTOM TODO CHECKBOX
        var todoCustomCheck=document.createElement("span");
        todoCustomCheck.classList.add("checkmark");

        // ! CREATE A SPAN FOR DISPLAYING THE LEBEL OF TODO
        var labelTodoText=document.createElement("span");
        var todoText=document.createTextNode(todo); 
        labelTodoText.appendChild(todoText);
        labelTodoText.classList.add("lebel-text");

        // ! APPEND INPUT CHECKBOX AND SPAN TO NEW TODO LABEL
        todoListLebel.appendChild(todoCheckBox);
        todoListLebel.appendChild(todoCustomCheck);
        todoListLebel.appendChild(labelTodoText);

        // ! CREATE A NEW IMG FOR DELETE OR CROSS BUTTON
        var deleteTodoIcon=document.createElement("img");
        deleteTodoIcon.setAttribute("src","images/icon-cross.svg");
        deleteTodoIcon.setAttribute("height","18px");
        deleteTodoIcon.classList.add("delete-todo-icon");

        // ! APPEND THE TODO LABEL AND IMG TO THE TODO-LIST-ITEM DIV
        todoListItem.appendChild(todoListLebel);
        todoListItem.appendChild(deleteTodoIcon);

        // ! APPEND THE TODO-LIST-ITEM DIV TO THE TODO-LIST-DIV
        var todoList=document.querySelector(".todo-list");
        todoList.appendChild(todoListItem);

        itemCounter();

        // ! IF A TODO ITEM IS COMPLETED THEN CHECK IT AND PUT A LINE THROUGH THE LABEL...
        todoListLebel.addEventListener("click",function(){
            todoListItem.classList.toggle("inactiveTodoItem");
            todoListLebel.classList.toggle("inactiveTodoLabel");
            todoCustomCheck.classList.toggle("inactiveTodo");
            itemCounter();
            
        });

        // ! DELETE A TODO FROM THE TODO LIST
        deleteTodoIcon.addEventListener("click",function(){
            todoListItem.remove();
            deleteTodoLocalSrg(todoListItem);
            itemCounter();
        });
    });
}

// ! DELETING THE TODO FROM THE LOCAL STORAGE
function deleteTodoLocalSrg(todo){
    var todoArr;
    if(localStorage.getItem("todoArr") == null){
        todoArr=[]; //! NOT PRESENT SO CREATE AN ARRAY
    } 
    else{
        todoArr = JSON.parse(localStorage.getItem("todoArr")); // ! IF ALREADY PRESENT THEN PARSE IT BACK INTO AN ARRAY
    }
    console.log(todoArr.indexOf(todo.children[0].children[2].textContent));
    var todoIndex=todoArr.indexOf(todo.children[0].children[2].textContent);
    todoArr.splice(todoIndex,1);
    localStorage.setItem("todoArr",JSON.stringify(todoArr));// ! SAVE IT BACK TO THE LOCAL STORAGE IN THE FORM OF A STRING
}

// ! ADDING CLASSES FOR LIGHT THEME
document.querySelector(".theme-icon").addEventListener("click",function(){
    document.querySelector("body").classList.toggle("body-t2");
    document.querySelector(".add-todo-input").classList.toggle("add-todo-input-t2");
    document.querySelector(".todo-list").classList.toggle("todo-list-t2");
    document.querySelector(".todo-footer").classList.toggle("todo-footer-t2");
    for(var i=0;i<document.querySelectorAll(".checkmark").length;i++){
        document.querySelectorAll(".checkmark")[i].classList.toggle("checkmark-t2");
        document.querySelectorAll(".todo-list-item")[i].classList.toggle("todo-list-item-t2");
    }
    document.querySelector(".footer").classList.toggle("footer-t2");
    if(document.querySelector("body").classList.contains("body-t2")){
        document.querySelector(".theme-icon img").setAttribute("src","images/icon-moon.svg");
        document.querySelector(".header-img img").setAttribute("src","images/bg-desktop-light.jpg");
    }
    else{
        document.querySelector(".theme-icon img").setAttribute("src","images/icon-sun.svg");
        document.querySelector(".header-img img").setAttribute("src","images/bg-desktop-dark.jpg");
    }
    document.querySelector(".add-to-list").classList.toggle("add-to-list-t2");  
});

if(screen.width < 510 ){
    if(document.querySelector("body").classList.contains("body-t2")){
        document.querySelector(".header-img img").setAttribute("src","images/bg-mobile-light.jpg");  
    }
    else{
        document.querySelector(".header-img img").setAttribute("src","images/bg-mobile-dark.jpg");
    }

}