let section = document.querySelector("section");
let add = document.querySelector("form button");

add.addEventListener("click", e => {
    
    e.preventDefault();
    
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;

    if (todoText === ""){
        alert("入力してください！");
        return;  //不回傳任何東西結束在這裡！
    }

    //create Todo
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;  //把p的內容設為剛才輸入的內容
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMonth + " / " + todoDate;
    todo.appendChild(text); //append=附加，把做好的東西加到指定的地方去
    todo.appendChild(time);

    // create check and trash can
    let completeButton = document.createElement("div");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<img src="./images/check.svg">';
    completeButton.addEventListener("click", e =>{
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    })


    let trashButton = document.createElement("div");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<img src="./images/trash.svg">';
    trashButton.addEventListener("click" , e=>{
        let todoItem = e.target.parentElement;
        
        todoItem.addEventListener("animationend", () =>{
            todoItem.remove();
        })
        
        todoItem.style.animation = "scaleDown 0.3s forwards";
        
        
    })

    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUp 0.3s forwards";

    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDate: todoDate
    };

    let myList = localStorage.getItem("list");
    if (myList == null){
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(myList);  //接收JSON字串
        myListArray.push(myTodo);  //從後面對array增加1
        localStorage.setItem("list", JSON.stringify(myListArray));
    }



    
    form.children[0].value = "";
    section.appendChild(todo);
})



let myList = localStorage.getItem("list");  //不要...忘記...雙引號...
if (myList !== null){
    let myListArray =JSON.parse(myList);  
    //myList就是localStorage.getItem(list)，叫出並轉回為js用的物件
    myListArray.forEach(item => {   
        //用forEach去對這個array中的所有東西跑一遍下面的東西
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = item.todoText;  
        //item是參數，這個item.實際上代表每一個不同的myListArray.！
        let time = document.createElement("p");
        time.classList.add("todo-time");
        time.innerText = item.todoMonth + " / " + item.todoDate;
        todo.appendChild(text);
        todo.appendChild(time);

        let completeButton = document.createElement("div");
        completeButton.classList.add("complete");
        completeButton.innerHTML = '<img src="./images/check.svg">';
        completeButton.addEventListener("click", e =>{
            let todoItem = e.target.parentElement;
            todoItem.classList.toggle("done");
         })


        let trashButton = document.createElement("div");
        trashButton.classList.add("trash");
        trashButton.innerHTML = '<img src="./images/trash.svg">';
        trashButton.addEventListener("click" , e=>{
            let todoItem = e.target.parentElement;
            
            todoItem.addEventListener("animationend", () =>{
                todoItem.remove();
            })
        
        todoItem.style.animation = "scaleDown 0.3s forwards";
        
    })
    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    section.appendChild(todo);

    })

}


/*自己想新增的內容：
1. 要回復上次儲存的list嗎
2. 切一些回主頁的按鈕
3. 切圓邊

*/