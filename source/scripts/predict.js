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
  const raw = document.getElementById("predictDay").value;
  if (!b || !raw) return alert("Введите дату рождения и дату прогноза.");

  // Поддерживаем: "DD.MM.YYYY", "DD-MM-YYYY", "DD/MM/YYYY" и "YYYY-MM-DD"
  let d2, m, y; // день прогноза, месяц прогноза, год прогноза
  const parts = String(raw).split(/[.\-\/]/).filter(Boolean);
  if (parts.length !== 3) return alert("Неверный формат даты. Пример: 04.08.2024");

  if (parts[0].length === 4) { // ISO: YYYY-MM-DD
    y = parts[0];
    m = parts[1];
    d2 = parts[2];
  } else { // DD.MM.YYYY и родственные
    d2 = parts[0];
    m = parts[1];
    y = parts[2];
  }

  // ── Версия 1 (день): складываем все цифры ДР + МР + Д_пр + М_пр + Г_пр
  // Пример 24.03.1988 и 04.08.2024: 2+4 + 3 + 4 + 8 + 2+0+2+4 = 29 → 29%22=7
  const v1 = convertArkan(`${b.day}${b.month}${d2}${m}${y}`);

  // ── Версия 2 (день): аркан(ДР) + аркан(МР) + аркан(Д_пр) + аркан(М_пр) + аркан(Г_пр) → привести к аркану
  // Пример: 2 + 3 + 4 + 8 + 8 = 25 → 25%22=3
  const v2 = convertArkan(String(
    convertArkan(b.day) +
    convertArkan(b.month) +
    convertArkan(d2) +
    convertArkan(m) +
    convertArkan(y)
  ));

  // ── Версия 3 (день): складываем все цифры ДР + Д_пр + М_пр + Г_пр
  // Пример: 2+4 + 4 + 8 + 2+0+2+4 = 26 → 26%22=4
  const v3 = convertArkan(`${b.day}${d2}${m}${y}`);

  const box = document.getElementById("dayResult");
  box.innerHTML = buildTable(["Версия 1", "Версия 2", "Версия 3"], [[v1, v2, v3]], 'day');
  attachPredictHandlers(box);
}


function predictForMonth() {
  const b = getBirthParts();
  const d = document.getElementById("predictMonth").value; // ожидаем "08.2024" (месяц.год), но понимаем и "2024-08"
  if (!b || !d) return alert("Введите дату рождения и месяц прогноза.");

  // Разбираем ввод: поддерживаем "MM.YYYY", "MM-YYYY", "MM/YYYY" и "YYYY-MM"
  let m, y;
  const parts = d.split(/[.\-\/]/).filter(Boolean);
  if (parts.length !== 2) return alert("Неверный формат месяца. Пример: 08.2024");

  if (parts[0].length === 4) { // "YYYY-MM"
    y = parts[0];
    m = parts[1];
  } else {                     // "MM.YYYY"
    m = parts[0];
    y = parts[1];
  }

  // ── Версия 1 (месяц): складываем ВСЕ цифры дня рождения + месяца рождения + года прогноза + месяца прогноза
  // Пример 24.03.1988 и 08.2024: 2+4 + 3 + 2+0+2+4 + 8 = 25 → 25 % 22 = 3
  const v1 = convertArkan(`${b.day}${b.month}${y}${m}`);

  // ── Версия 2 (месяц): аркан(день рождения) + аркан(месяц рождения) + аркан(год прогноза) + аркан(месяц прогноза), затем привести к аркану
  // Пример: 2 + 3 + 8 + 8 = 21
  const v2 = convertArkan(String(
    convertArkan(b.day) +
    convertArkan(b.month) +
    convertArkan(y) +
    convertArkan(m)
  ));

  // ── Версия 3 (месяц): складываем ВСЕ цифры дня рождения + месяца прогноза + года прогноза
  // Пример: 2+4 + 8 + 2+0+2+4 = 22
  const v3 = convertArkan(`${b.day}${m}${y}`);

  const box = document.getElementById("monthResult");
  box.innerHTML = buildTable(["Версия 1", "Версия 2", "Версия 3"], [[v1, v2, v3]], 'month');
  attachPredictHandlers(box);
}


function predictForYear() {
  const b = getBirthParts();
  const year = document.getElementById("predictYear").value;
  if (!b || !year) return alert("Введите дату рождения и год прогноза.");

  // Оставляем нули, убираем только не-цифры на всякий случай
  const clean = `${b.day}${b.month}${year}`.replace(/\D|0/g, '');

  // Сумма всех цифр
  let classic = [...clean].reduce((sum, ch) => sum + Number(ch), 0);
  // Приводим к однозначному числу
  classic = reduceToOneDigit(classic);
  const v1 = convertArkan(`${b.day}${b.month}${year}`);
  const v2 = convertArkan(
    String(
      convertArkan(b.day) +
      convertArkan(b.month) +
      convertArkan(b.year) +
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
