
const allSavedToDoItems = localStorage.getItem("allSavedToDoItems") ? JSON.parse(localStorage.getItem("allSavedToDoItems")) : []

const footerMenu = document.querySelector("#footer-menu");
const allItems = document.querySelectorAll(".to-do-container");
const itemCount = document.querySelector("#item-count");
const allItemButton = document.querySelector("#all-item")



function countItems() {

    const allItemsCount = allSavedToDoItems.length;

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
        deleteButton.setAttribute("to-do-item", this.toDoItem)

        checkBox.addEventListener("change", (event) => {
            if (event.target.checked === true) {
                containerDiv.classList.add("is-completed-item");
                paragraf.classList.add("is-completed");// 
            } else {
                containerDiv.classList.remove("is-completed-item");
                paragraf.classList.remove("is-completed");
            }
        });

        deleteButton.addEventListener("click", (event) => {
            console.log(event.target)
            containerDiv.remove();
            const allToDoItems = document.querySelectorAll(".to-do-container");
            const toDoItemName = event.target.getAttribute("to-do-item")
            const toDoItemIndex = allSavedToDoItems.findIndex((element) => {
                return element === toDoItemName
            })
            if (toDoItemIndex > -1) {
                allSavedToDoItems.splice(toDoItemIndex, 1)
                localStorage.setItem("allSavedToDoItems", JSON.stringify(allSavedToDoItems))
            }

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
const input = document.querySelector("#todo-input")
const toDoListContainer = document.querySelector("#to-do-list")

const renderToDItems = () => {
    allSavedToDoItems.forEach((savedToDoItem) => {

        const newToDo = new ToDo(savedToDoItem)
        const newToDoHtml = newToDo.createHTMLToDoItem()
        toDoListContainer.appendChild(newToDoHtml)
    })
}
window.addEventListener("load", renderToDItems)

form.addEventListener("submit", (event) => {

    event.preventDefault()
    event.stopPropagation();
    allSavedToDoItems.push(input.value)
    input.value = "";
    footerMenu.classList.remove("is-hidden")
    toDoListContainer.innerHTML = "";
    renderToDItems();
    console.log("sfs")
    countItems();
    localStorage.setItem("allSavedToDoItems", JSON.stringify(allSavedToDoItems))
    console.log(JSON.stringify(allSavedToDoItems))

    allItemButton.addEventListener("click", () => {
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

