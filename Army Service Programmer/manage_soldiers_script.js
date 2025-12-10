const sRank = document.getElementById('soldier_rank');
const sName = document.getElementById('soldier_name');
const sCorp = document.getElementById('soldier_corp');

const soldiersList = document.getElementById('soldiers_ul');

function addSoldier() {
    if(sName.value === '') {
        alert("All fields are required!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = sRank.value + " (" + sCorp.value + ") " + sName.value;
        document.getElementById('soldiers_ul').appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    sName.value = "";
}

soldiersList.addEventListener("click", function(e) {
    if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
}, false);