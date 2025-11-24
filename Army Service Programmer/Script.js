const monthNames = [
        "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
        "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
    ];

    // Start with current date
    let date = new Date();

    function renderCalendar() {
        const year = date.getFullYear();
        const month = date.getMonth();

        // Update header (month + year)
        const header = document.getElementById("month-year");
        header.innerHTML = `${monthNames[month]}<br><span style="font-size:18px">${year}</span>`;

        // Get first day of the month
        const firstDay = new Date(year, month, 0).getDay();
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

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement("li");
            const dayButton = document.createElement("button");
            dayButton.textContent = day;
            dayCell.appendChild(dayButton);
            daysSection.appendChild(dayCell);
        }
        
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