const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedList = document.getElementById("completed-list");

function addTask() {
    if(inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        const li = e.target;
        li.classList.add("checked");
        listContainer.removeChild(li);
        completedList.appendChild(li);
        saveData();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

completedList.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        const li = e.target;
        li.classList.remove("checked");
        completedList.removeChild(li);
        listContainer.appendChild(li);
        saveData();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);


function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
    localStorage.setItem("completedTasks", completedList.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    completedList.innerHTML = localStorage.getItem("completedTasks") || "";
}