function convertArkan(input) {
  let digits = (input || '').replace(/\D/g, '');
  if (!digits) return 0;
  let n = parseInt(digits, 10);
  while (n >= 100) {
    n = [...String(n)].reduce((a, b) => a + Number(b), 0);
  }
  return n > 22 ? (n % 22 || 22) : n;
}

function reduceToOneDigit(n) {
  n = Number(n) || 0;
  while (n >= 10) {
    n = [...String(n)].reduce((a, b) => a + Number(b), 0);
  }
  return n;
}

// строим таблицу с кликабельными ячейками
function buildTable(headers, values, context) {
  let html = `<table id="resultTable"><thead><tr>`;
  headers.forEach(h => html += `<th>${h}</th>`);
  html += `</tr></thead><tbody>`;

  values.forEach(row => {
    html += "<tr>";
    row.forEach((cellVal, idx) => {
      const label = headers[idx];
      html += `<td class="predict-cell" data-context="${context}" data-label="${label}" data-value="${cellVal}">${cellVal}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table>";
  return html;
}

function getBirthParts() {
  const birthdate = document.getElementById("birthdate").value;
  if (!birthdate) return null;
  const [year, month, day] = birthdate.split("-");
  return { day, month, year };
}

function predictForDay() {
  const b = getBirthParts();
  const d = document.getElementById("predictDay").value;
  if (!b || !d) return alert("Введите дату рождения и дату прогноза.");

  const [y, m, d2] = d.split("-");
  const v1 = convertArkan(`${b.day}${b.month}${d2}${m}${y}`);
  const v2 = convertArkan(
    String(
      convertArkan(b.day) +
      convertArkan(b.month) +
      convertArkan(d2) +
      convertArkan(m) +
      convertArkan(y)
    )
  );
  const v3 = convertArkan(`${b.day}${d2}${m}${y}`);

  const box = document.getElementById("dayResult");
  box.innerHTML = buildTable(["Версия 1", "Версия 2", "Версия 3"], [[v1, v2, v3]], 'day');
  attachPredictHandlers(box);
}

function predictForMonth() {
  const b = getBirthParts();
  const d = document.getElementById("predictMonth").value;
  if (!b || !d) return alert("Введите дату рождения и месяц прогноза.");

  const [y, m] = d.split("-");
  const v1 = convertArkan(`${b.day}${b.month}${m}${y}`);
  const v2 = convertArkan(
    String(
      convertArkan(b.day) +
      convertArkan(b.month) +
      convertArkan(m) +
      convertArkan(y)
    )
  );
  const v3 = convertArkan(`${b.day}${m}${y}`);

  const box = document.getElementById("monthResult");
  box.innerHTML = buildTable(["Версия 1", "Версия 2", "Версия 3"], [[v1, v2, v3]], 'month');
  attachPredictHandlers(box);
}

function predictForYear() {
  const b = getBirthParts();
  const year = document.getElementById("predictYear").value;
  if (!b || !year) return alert("Введите дату рождения и год прогноза.");

  const clean = `${b.day}${b.month}${year}`.replace(/0/g, '');
  let classic = [...clean].reduce((a, b) => a + +b, 0);
  classic = reduceToOneDigit(classic);

  const v1 = convertArkan(`${b.day}${b.month}${year}`);
  const v2 = convertArkan(
    String(
      convertArkan(b.day) +
      convertArkan(b.month) +
      convertArkan(year)
    )
  );
  const v3 = convertArkan(
    String(
      convertArkan(b.day) +
      convertArkan(b.month) +
      convertArkan(year)
    )
  );

  const box = document.getElementById("yearResult");
  box.innerHTML = buildTable(["Классика", "Версия 1", "Версия 2", "Версия 3"], [[classic, v1, v2, v3]], 'year');
  attachPredictHandlers(box);
}

// назначаем клики по ячейкам и открываем модалку по правилам
function attachPredictHandlers(scopeEl) {
  scopeEl.querySelectorAll('.predict-cell').forEach(td => {
    td.addEventListener('click', () => {
      const context = td.dataset.context;  // 'day' | 'month' | 'year'
      const label = td.dataset.label;      // 'Классика' | 'Версия 1' | ...
      const value = td.dataset.value;      // число

      let basePath = '';
      if (context === 'day' || context === 'month') {
        // 1) Прогноз на день/месяц -> arcana
        basePath = 'source/contents/forecast_date/arcana/';
      } else {
        // year
        if (label === 'Классика') {
          // II. Прогноз на год, Классика
          basePath = 'source/contents/forecast_date/classic/';
        } else {
          // I. Прогноз на год, Версия 1/2/3
          basePath = 'source/contents/forecast_date/arcana/';
        }
      }

      openModal(`${basePath}${value}.txt`);
    });
  });
}

// модалка
function openModal(filePath) {
  fetch(filePath)
    .then(res => res.ok ? res.text() : 'Ошибка загрузки файла')
    .then(text => {
      const modal = document.getElementById('modal');
      const modalText = document.getElementById('modalText');
      modalText.textContent = text;
      modal.style.display = 'block';
    })
    .catch(() => {
      const modal = document.getElementById('modal');
      const modalText = document.getElementById('modalText');
      modalText.textContent = 'Ошибка загрузки файла';
      modal.style.display = 'block';
    });
}

function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('show');
}

/* === Надёжные обработчики === */
document.addEventListener('DOMContentLoaded', () => {
  // Не позволяем форме случайно сабмититься
  const form = document.getElementById('predictForm');
  form && form.addEventListener('submit', (e) => e.preventDefault());

  // Клики по кнопкам
  const btnDay = document.getElementById('btnDay');
  const btnMonth = document.getElementById('btnMonth');
  const btnYear = document.getElementById('btnYear');

  btnDay && btnDay.addEventListener('click', predictForDay);
  btnMonth && btnMonth.addEventListener('click', predictForMonth);
  btnYear && btnYear.addEventListener('click', predictForYear);

  // Enter в соответствующих полях
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;

    const active = document.activeElement;
    if (!active) return;

    if (active.id === 'predictDay') {
      e.preventDefault();
      predictForDay();
    } else if (active.id === 'predictMonth') {
      e.preventDefault();
      predictForMonth();
    } else if (active.id === 'predictYear') {
      e.preventDefault();
      predictForYear();
    }
  });
});

// Экспорт — на случай, если где-то остались inline-обработчики
window.predictForDay = predictForDay;
window.predictForMonth = predictForMonth;
window.predictForYear = predictForYear;
