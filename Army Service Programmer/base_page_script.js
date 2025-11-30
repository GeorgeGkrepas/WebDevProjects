const monthNames = [
    "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
    "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
];

const dayNames = [
    "ΚΥΡΙΑΚΗ", "ΔΕΥΤΕΡΑ", "ΤΡΙΤΗ", "ΤΕΤΑΡΤΗ", "ΠΕΜΠΤΗ", "ΠΑΡΑΣΚΕΥΗ", "ΣΑΒΒΑΤΟ"
];

// Start with current date
let date = new Date();
let selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

function renderCalendar() {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Update header (month + year)
    const header = document.getElementById("month-year");
    header.innerHTML = `<span style="font-weight:bold">${monthNames[month]}${" " + year}</span>`;

    // Get first day of the month
    const firstDay = new Date(year, month, 1).getDay() - 1; // Adjusting for Monday start
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Clear previous calendar
    const daysSection = document.getElementsByClassName("days")[0];
    daysSection.innerHTML = "";

    // Add opaque slots for days before the first day
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("li");
        emptyCell.textContent = new Date(year, month, 0).getDate() - firstDay + i + 1;
        emptyCell.style.opacity = "0.3";
        daysSection.appendChild(emptyCell);
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("li");
        const dayButton = document.createElement("button");
        dayButton.addEventListener("click", () => {
            selectedDate.setDate(day);
            selectedDate.setMonth(month);
            selectedDate.setFullYear(year);
            // Remove 'selected' class from other buttons
            const buttons = daysSection.getElementsByTagName("button");
            for (let btn of buttons) {
                if (btn !== dayButton) {
                    btn.classList.remove("selected");
                }
            }
            dayButton.classList.add("selected");
            renderDayDetails();
        });

        dayButton.textContent = day;
        dayCell.appendChild(dayButton);
        daysSection.appendChild(dayCell);
    }

    // Add opaque slots for days after the last day
    const totalCells = 42;
    const usedCells = firstDay + daysInMonth;
    const nextDaysCount = totalCells - usedCells;

    for (let i = 1; i <= nextDaysCount; i++) {
        const li = document.createElement("li");
        li.textContent = i;
        li.style.opacity = "0.3";
        daysSection.appendChild(li);
    }

    // Highlight current day if in current month and year
    const buttons = daysSection.getElementsByTagName("button");
    if (selectedDate.getMonth() === date.getMonth() && selectedDate.getFullYear() === date.getFullYear()) {
        for (let btn of buttons) {
            if (parseInt(btn.textContent) === selectedDate.getDate()) {
                btn.classList.add("selected");
                break;
            }
        }
    }

    // Select current day on load
    window.onload = () => {
        const buttons = daysSection.getElementsByTagName("button");
        for (let btn of buttons) {
            if (parseInt(btn.textContent) === date.getDate()) {
                btn.classList.add("selected");
                break;
            }
    }
}
    
}

function renderDayDetails() {
    // Update header (day and date)
    const header = document.getElementById("day&date");
    header.innerHTML = `<span style="font-weight:bold">${dayNames[selectedDate.getDay()]}<br>
        ${"ΚΑΤΑΣΤΑΣΗ ΥΠΗΡΕΣΙΩΝ ΛΣ/ΔΙΣΜΕ ΤΗΣ " + selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear()}</span>`;
}

// Prev/Next listeners
document.getElementById("prev-month").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});
document.getElementById("next-month").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

// Initial render
renderCalendar();
renderDayDetails();
