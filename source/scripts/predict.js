function convertArkan(input) {
  let digits = input.replace(/\D/g, '');
  let n = parseInt(digits, 10);
  while (n >= 100) {
    n = [...String(n)].reduce((a, b) => a + Number(b), 0);
  }
  return n > 22 ? (n % 22 || 22) : n;
}

function reduceToOneDigit(n) {
  while (n >= 10) {
    n = [...String(n)].reduce((a, b) => a + Number(b), 0);
  }
  return n;
}

function buildTable(headers, values) {
  let html = `<table id="resultTable"><thead><tr>`;
  headers.forEach(h => html += `<th>${h}</th>`);
  html += `</tr></thead><tbody>`;
  values.forEach(row => {
    html += "<tr>";
    row.forEach(cell => html += `<td>${cell}</td>`);
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

  document.getElementById("dayResult").innerHTML = buildTable(
    ["Версия 1", "Версия 2", "Версия 3"],
    [[v1, v2, v3]]
  );
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

  document.getElementById("monthResult").innerHTML = buildTable(
    ["Версия 1", "Версия 2", "Версия 3"],
    [[v1, v2, v3]]
  );
}

function predictForYear() {
  const b = getBirthParts();
  const year = document.getElementById("predictYear").value;
  if (!b || !year) return alert("Введите дату рождения и год.");

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

  document.getElementById("yearResult").innerHTML = buildTable(
    ["Классика", "Версия 1", "Версия 2", "Версия 3"],
    [[classic, v1, v2, v3]]
  );
}

// Обработка клавиши Enter
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Enter') return;

  const active = document.activeElement;

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
