document.addEventListener("DOMContentLoaded", function () {
    // Obsługa formularza dodawania notatek
    document.getElementById("noteForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let content = document.getElementById("noteContent").value;

        fetch("/add_note", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ content })
        }).then(() => location.reload());
    });

    // Konfiguracja Sortable.js dla list
    let options = {
        group: "notes",
        animation: 150,
        onEnd: function (evt) {
            let noteId = evt.item.getAttribute("data-note-id");
            let newStatus;
            if (evt.to.id === "new_notes") {
                newStatus = "NEW";
            } else if (evt.to.id === "done_notes") {
                newStatus = "DONE";
            } else {
                console.error("Unbekannte Zielliste!");
                return;
            }
        
            console.log(`Hinweisstatus geändert ${noteId} an ${newStatus}`);
        
            // Dynamiczna aktualizacja DOM: dodanie lub usunięcie przycisku "Archiv"
            if (newStatus === "DONE") {
                // Jeśli notatka jest teraz w kolumnie "Fertig", dodaj przycisk Archiv, jeśli jeszcze go nie ma
                if (!evt.item.querySelector('.archiv-note')) {
                    let archivBtn = document.createElement("button");
                    archivBtn.className = "archiv-note";
                    archivBtn.setAttribute("data-note-id", noteId);
                    archivBtn.textContent = "Archiv";
                    // Wstaw przycisk na początek elementu notatki (lub w dowolnym miejscu wewnątrz notatki)
                    evt.item.insertBefore(archivBtn, evt.item.firstChild);
                }
            } else if (newStatus === "NEW") {
                // Jeśli notatka jest przeniesiona do "Neue", usuń przycisk Archiv, jeśli istnieje
                let archivBtn = evt.item.querySelector('.archiv-note');
                if (archivBtn) {
                    archivBtn.remove();
                }
            }
        
            // Aktualizacja statusu na serwerze
            fetch(`/update_status/${noteId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            })
            .then(response => {
                if (!response.ok) {
                    console.error("Fehler beim Aktualisieren des Status");
                }
            })
            .catch(error => console.error("Fehler:", error));
        }
        
    };

    let newList = document.getElementById("new_notes");
    let doneList = document.getElementById("done_notes");

    if (newList && doneList) {
        Sortable.create(newList, options);
        Sortable.create(doneList, options);
    } else {
        console.error("Keine Notizlisten gefunden");
    }

    // Delegacja zdarzeń dla przycisków usuwania i archiwizacji
    document.addEventListener("click", function(event) {
        // Obsługa usuwania notatek
        if (event.target.matches(".delete-note") || event.target.matches(".delete-note-archiv")) {
            event.stopPropagation();
            let noteId = event.target.getAttribute("data-note-id");

            fetch(`/delete_note/${noteId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            .then(response => {
                if (response.ok) {
                    // Spróbuj usunąć element jako <li> lub <tr>
                    let noteElement = event.target.closest("li") || event.target.closest("tr");
                    if (noteElement) {
                        noteElement.remove();
                    }
                } else {
                    console.error("Błąd przy usuwaniu notatki");
                }
            })
            .catch(error => console.error("Błąd:", error));
        }

        // Obsługa archiwizacji notatek
        if (event.target.matches(".archiv-note")) {
            event.stopPropagation();
            let noteId = event.target.getAttribute("data-note-id");

            fetch(`/archive_note/${noteId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            .then(response => {
                if (response.ok) {
                    location.reload(); // lub dynamiczna zmiana w DOM
                } else {
                    console.error("Błąd przy archiwizacji notatki");
                }
            })
            .catch(error => console.error("Błąd:", error));
        }
    });
    document.querySelectorAll('.archived-table td').forEach(function(td) {
        // Szukamy wewnątrz td elementu tooltipa (full-content)
        let tooltip = td.querySelector('.full-content');
        if (!tooltip) return; // pomijamy komórki, które nie zawierają tooltipa
    
        td.addEventListener('mouseenter', function(event) {
            // Pokaż tooltip
            tooltip.style.display = 'block';
            
            // Pobierz pozycję komórki względem viewportu
            let tdRect = td.getBoundingClientRect();
            let tooltipRect = tooltip.getBoundingClientRect();
            let viewportHeight = window.innerHeight;
            let viewportWidth = window.innerWidth;
            
            // Domyślne ustawienie: tooltip pod komórką
            let top = tdRect.bottom;
            let left = tdRect.left;
            
            // Jeśli tooltip wychodzi poza dół okna, ustaw go powyżej komórki
            if (top + tooltipRect.height > viewportHeight) {
                top = tdRect.top - tooltipRect.height;
                if (top < 0) top = 0; // zabezpieczenie, żeby nie wyjść poza górę
            }
            
            // Jeśli tooltip wychodzi poza prawą stronę, przesuwamy go w lewo
            if (left + tooltipRect.width > viewportWidth) {
                left = viewportWidth - tooltipRect.width;
                if (left < 0) left = 0;
            }
            
            // Ustawiamy pozycję tooltipa
            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';
        });
        
        td.addEventListener('mouseleave', function(event) {
            tooltip.style.display = 'none';
        });
    });
    
});
