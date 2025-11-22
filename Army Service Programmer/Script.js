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
      const header = document.getElementById("current-month-year");
      header.innerHTML = `${monthNames[month]}<br><span style="font-size:18px">${year}</span>`;

      const daysContainer = document.getElementById("days");
      // clear previous
      daysContainer.innerHTML = "";

      // first day of month as weekday index (0 = Sun, 1 = Mon, ... 6 = Sat)
      const firstDayIndex = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      // Convert to Monday-first: if Sunday (0) -> 6, else subtract 1
      const emptyDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

      // Add empty placeholders
      for (let i = 0; i < emptyDays; i++) {
        const li = document.createElement("li");
        li.classList.add("empty");
        // keep li empty so grid aligns properly
        daysContainer.appendChild(li);
      }

      const today = new Date();

      // Add actual day buttons
      for (let day = 1; day <= lastDate; day++) {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = day;
        btn.setAttribute("aria-label", `${day} ${monthNames[month]} ${year}`);

        // mark today
        if (
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          btn.classList.add("today");
        }

        // Example click handler (you can replace with your app logic)
        btn.addEventListener("click", () => {
          // simple visual selection toggle
          document.querySelectorAll('.days button.selected').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          console.log('clicked', day, month + 1, year);
        });

        li.appendChild(btn);
        daysContainer.appendChild(li);
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