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
        const containerDiv = document.createElement("div")  //to jest do tworzenia HTML z punktu JS
        containerDiv.classList.add("to-do-container");
        const subContainerDiv = document.createElement("div")
        subContainerDiv.classList.add("todo-sub-container")
        const checkBox = document.createElement("input")  //to jest do tworzenia HTML z punktu JS
        checkBox.setAttribute("type", "checkbox");
        checkBox.classList.add("checkbox");
        const paragraf = document.createElement("p")  //to jest do tworzenia HTML z punktu JS
        paragraf.innerText = this.toDoItem
        paragraf.classList.add("paragraf");
        const deleteButton = document.createElement("button")  //to jest do tworzenia HTML z punktu JS
        deleteButton.classList.add("destroy");
        deleteButton.innerText = "X"

        checkBox.addEventListener("change", (event) => {
            if (event.target.checked === true) {
                containerDiv.classList.add("is-completed-item"); //klasa jest tylo do filtracji 
                paragraf.classList.add("is-completed");// w css dodać tekst decoration: strike through
            } else {
                containerDiv.classList.remove("is-completed-item");
                paragraf.classList.remove("is-completed");
            }
        });

        deleteButton.addEventListener("click", () => {
            containerDiv.remove(); // to nam już usuwa contener
            const allToDoItems = document.querySelectorAll(".to-do-container");

            console.log(allToDoItems)
            if (allToDoItems.length === 0) { // jeśli wszystko jest usunięte, 
                footerMenu.classList.add("is-hidden") // <- to usuwa nam all, active
            }
            countItems();
        });

        subContainerDiv.appendChild(checkBox); // wrzucanie jakiegoś HTML do inneg HTML
        subContainerDiv.appendChild(paragraf);
        containerDiv.appendChild(subContainerDiv);
        containerDiv.appendChild(deleteButton);



        // div.innerText = this.toDoItem //wrzuca do środka do div cokolwiek, tutaj text
        return containerDiv; // zwracamy zmienną ktora utworzyliksmy
    }

}
// to na górze było tylko do nauki od 12 do 15 
//  const firstToDo = new ToDo("Nauczyć się klas") // każde dzieco mjoże sobie wywołać metodę stworzoną w kalsie
// firstToDo.createHTMLToDoItem();
// const secondToDo = new ToDo("nie chce mi się") // każde dzieco mjoże sobie wywołać metodę stworzoną w kalsie 
// secondToDo.createHTMLToDoItem(); //wywołujemy metodę 


const form = document.querySelector("#new-todos-form")   // zmienna, żeby  trzymać nasz formularz z html
form.addEventListener("submit", (event) => {  //dane eventu wpadają do funkji która jest drugim argument addeeventlisteren
    // // to jest funkcja dzięki event submit wiemy, że user kliknął submit w formularzu
    event.preventDefault() //strona nie będzie się odświeżać
    event.stopPropagation();
    const input = document.querySelector("#todo-input") // to nam wyszukuje input

    const newToDo = new ToDo(input.value)
    input.value = ""; // nie wyświetla się wpisany tekst w inpucie
    const newToDoHtml = newToDo.createHTMLToDoItem() //mamy nowa zmienną do której przypisujemy to co zwraca funkcja createHTMLtodoitem
    const div = document.querySelector("#to-do-list")  // namierzamy diva 
    div.appendChild(newToDoHtml)       //  dodaje elementy do html 
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

