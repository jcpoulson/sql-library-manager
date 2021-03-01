const rows = document.querySelectorAll('.row');
const tableBody = document.querySelector('.table-body');
const pageButtons = document.querySelector('.page-buttons');

let pages = Math.ceil(rows.length / 9);

tableBody.innerHTML = '';

for (let i = 0; i < 9; i++) {
    let book = rows[i];
    tableBody.appendChild(book);
}


// Creating page buttons along with adding event listeners to them
for(let i = 1; i < pages + 1; i++) {
    let button = document.createElement("BUTTON");
    button.className = "page-button";
    button.innerHTML = i;
    button.addEventListener('click', (e) => {
        tableBody.innerHTML = '';
        let page = parseInt(e.target.textContent) - 1;
        for (let i = page * 9; i < page * 9 + 9; i++) {
            let book = rows[i];
            tableBody.appendChild(book);
        }
    })
    pageButtons.appendChild(button);
}




