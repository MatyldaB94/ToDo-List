const footerMenu = document.querySelector("#footer-menu");
function countItems() {
    const allItems = document.querySelectorAll(".to-do-container");
    const allItemsCount = allItems.length;
    const itemCount = document.querySelector("#item-count");
    if (allItemsCount === 1) {
        itemCount.innerText = "1 item left";
    } else {
        itemCount.innerText = `${allItemsCount} items count`
    };
}

class ToDo {
    constructor(toDoItem) {
        this.toDoItem = toDoItem;
    }

    createHTMLToDoItem() {
        const containerDiv = document.createElement("div")
        containerDiv.classList.add("to-do-container");
        const subContainerDiv = document.createElement("div")
        subContainerDiv.classList.add("todo-sub-container")
        const checkBox = document.createElement("input")
        checkBox.setAttribute("type", "checkbox");
        checkBox.classList.add("checkbox");
        const paragraf = document.createElement("p")
        paragraf.innerText = this.toDoItem
        paragraf.classList.add("paragraf");
        const deleteButton = document.createElement("button")
        deleteButton.classList.add("destroy");
        deleteButton.innerText = "X"

        checkBox.addEventListener("change", (event) => {
            if (event.target.checked === true) {
                containerDiv.classList.add("is-completed-item");
                paragraf.classList.add("is-completed");// 
            } else {
                containerDiv.classList.remove("is-completed-item");
                paragraf.classList.remove("is-completed");
            }
        });

        deleteButton.addEventListener("click", () => {
            containerDiv.remove();
            const allToDoItems = document.querySelectorAll(".to-do-container");

            console.log(allToDoItems)
            if (allToDoItems.length === 0) {
                footerMenu.classList.add("is-hidden")
            }
            countItems();
        });

        subContainerDiv.appendChild(checkBox);
        subContainerDiv.appendChild(paragraf);
        containerDiv.appendChild(subContainerDiv);
        containerDiv.appendChild(deleteButton);




        return containerDiv;
    }

}



const form = document.querySelector("#new-todos-form")
form.addEventListener("submit", (event) => {

    event.preventDefault()
    event.stopPropagation();
    const input = document.querySelector("#todo-input")

    const newToDo = new ToDo(input.value)
    input.value = "";
    const newToDoHtml = newToDo.createHTMLToDoItem()
    const div = document.querySelector("#to-do-list")
    div.appendChild(newToDoHtml)
    footerMenu.classList.remove("is-hidden")
    countItems();

    const allItem = document.querySelector("#all-item")
    allItem.addEventListener("click", () => {
        const allToDoItems = document.querySelectorAll(".to-do-container");
        allToDoItems.forEach((todoItem) => {
            todoItem.classList.remove("is-hidden")
        })

    });
    const activeItem = document.querySelector("#active-item")
    activeItem.addEventListener("click", () => {
        const allToDoItems = document.querySelectorAll(".to-do-container");
        allToDoItems.forEach((toDoItem) => {

            if (toDoItem.classList.contains("is-completed-item")) {
                toDoItem.classList.add("is-hidden")
            } else {
                toDoItem.classList.remove("is-hidden")
            }
        })

    })
    const completedItem = document.querySelector("#completed-item")
    completedItem.addEventListener("click", () => {
        const allToDoItems = document.querySelectorAll(".to-do-container");
        allToDoItems.forEach((toDoItem) => {

            if (!toDoItem.classList.contains("is-completed-item")) {
                toDoItem.classList.add("is-hidden")
            } else {
                toDoItem.classList.remove("is-hidden")
            }
        })
    })

})

const deleteItem = document.querySelector("#delete-item")
deleteItem.addEventListener("click", () => {

    const allToDoItems = document.querySelectorAll(".to-do-container");
    allToDoItems.forEach((toDoItem) => {

        if (toDoItem.classList.contains("is-completed-item")) {
            toDoItem.remove();
        }
    })
})




const foldsItemButton = document.querySelector("#folds-todo-items")
foldsItemButton.addEventListener("click", () => {
    const toDoItemList = document.querySelector("#to-do-list")
    if (toDoItemList.classList.contains("is-folded")) {
        toDoItemList.classList.remove("is-folded")
    } else {
        toDoItemList.classList.add("is-folded")
    }
})





// Tworzymy klase to do
// dodać event.listeren na formularz na kliknięcie (dodał enter)
// zczytujemy to co użytkownik wpisał (przyposujemy to  do zmiennej)
// tworzymy instancję klasy toDo zawierającą to co użytkownik wpisał
// z tej instancji tworzymy html jako zmienną w JS
// wrzucamy ten html do naszego diva toDo list 

