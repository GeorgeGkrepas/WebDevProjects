const monthNames = [
    "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
    "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
];

const dayNames = [
    "ΔΕΥΤΕΡΑ", "ΤΡΙΤΗ", "ΤΕΤΑΡΤΗ", "ΠΕΜΠΤΗ", "ΠΑΡΑΣΚΕΥΗ", "ΣΑΒΒΑΤΟ", "ΚΥΡΙΑΚΗ"
];

// Start with current date
let date = new Date();

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
    
}

function renderDayDetails() {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Update header (day and date)
    const header = document.getElementById("day&date");
    header.innerHTML = `<span style="font-weight:bold">${dayNames[date.getDay() - 1]}<br>
        ${"ΚΑΤΑΣΤΑΣΗ ΥΠΗΡΕΣΙΩΝ ΛΣ/ΔΙΣΜΕ ΤΗΣ " + date.getDate() + "/" + month + "/" + year}</span>`;
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