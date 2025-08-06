function reduce(numStr) {
  while (numStr.length > 1) {
    numStr = String([...numStr].reduce((sum, digit) => sum + parseInt(digit), 0));
  }
  return numStr;
}

function buildFinanceTable(fin_code) {
  const digits = String(fin_code).padStart(6, '0').split('');
  let tableHTML = `<table class="result-table"><thead><tr>`;
  for (let i = 1; i <= 6; i++) {
    tableHTML += `<th>${i}</th>`;
  }
  tableHTML += `</tr></thead><tbody><tr>`;
  digits.forEach((digit, i) => {
    tableHTML += `<td data-value="${digit}">${digit}</td>`;
  });
  tableHTML += `</tr></tbody></table>`;
  return tableHTML;
}

function renderFinanceTable() {
  const input = document.getElementById("birthdate").value;
  if (!input) return alert("Введите дату рождения!");

  const [year, month, day] = input.split('-').map(Number);
  const dayStr = String(day).padStart(2, '0');
  const monthStr = String(month).padStart(2, '0');
  const yearStr = String(year);

  const day_r = reduce(String(day));
  const month_r = reduce(String(month));
  const year_r = reduce(yearStr);
  const concat = reduce(day_r + month_r + year_r);

  const money_code = day_r + month_r + year_r + concat;
  const num_1 = reduce(String(Number(month_r) + Number(year_r)));
  const num_5 = reduce(String(Number(year_r) + Number(concat)));
  const num_2 = reduce(String(Number(num_1) + Number(year_r)));
  const num_4 = reduce(String(Number(year_r) + Number(num_5)));
  const num_6 = reduce(String(Number(num_1) + Number(num_5)));

  const fin_code = num_1 + num_2 + year_r + num_4 + num_5 + num_6;

  const tableHTML = buildFinanceTable(fin_code);
  document.getElementById("resultTableContainer").innerHTML = tableHTML;

  // Добавим обработчики кликов по ячейкам таблицы
  document.querySelectorAll("#resultTableContainer td").forEach(cell => {
    cell.addEventListener("click", () => {
      const value = cell.getAttribute("data-value");
      openModalWithFile(`source/contents/financial_channel/${value}.txt`);
    });
  });
}

// Отправка формы и кнопка "Рассчитать"
document.getElementById("financeForm").addEventListener("submit", e => {
  e.preventDefault();
  renderFinanceTable();
});

// Enter для запуска
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && document.activeElement.id === "birthdate") {
    e.preventDefault();
    renderFinanceTable();
  }
});

// Переключение сайдбара
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}

// === Модальное окно ===
const modal = document.getElementById('modal');
const modalText = document.getElementById('modalText');
const modalClose = document.querySelector('.modal-close');

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

function openModalWithFile(path) {
  fetch(path)
    .then(res => res.text())
    .then(text => {
      modalText.textContent = text;
      modal.style.display = 'block';
    })
    .catch(err => {
      modalText.textContent = 'Ошибка загрузки файла';
      modal.style.display = 'block';
    });
}
