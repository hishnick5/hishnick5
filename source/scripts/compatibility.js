function editNumb(numb) {
  return numb <= 22 ? numb : editNumb(numb - 22);
}

function reduce(num) {
  while (num.length > 1) {
    num = String(num.split('').reduce((a, b) => a + Number(b), 0));
  }
  return num;
}

function buildMatrix(input) {
  const [year, month, day] = input.split('-').map(Number);
  const dayStr = String(day).padStart(2, '0');
  const monthStr = String(month).padStart(2, '0');
  const yearStr = String(year);
  const fullDate = `${dayStr}.${monthStr}.${yearStr}`;
  const pure = fullDate.replace(/\./g, '').replace(/0/g, '');
  let destiny = String(pure.split('').reduce((a, b) => a + Number(b), 0));
  while (destiny.length > 1) destiny = String(destiny.split('').reduce((a, b) => a + Number(b), 0));

  const today = new Date();
  let age = today.getFullYear() - year;
  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) age--;

  let a = day, b = month, c = yearStr.split('').reduce((a, b) => a + Number(b), 0);
  a = a > 22 ? editNumb(a) : a;
  c = c > 22 ? editNumb(c) : c;
  let d = editNumb(a + b + c);

  const ch_d1 = editNumb(Math.abs(a + b));
  const ch_d2 = editNumb(Math.abs(a + c));
  const ch_d3 = editNumb(Math.abs(ch_d1 + ch_d2));
  const ch_d4 = editNumb(Math.abs(b + c));

  const karmic1 = editNumb(Math.abs(a - b));
  const karmic2 = editNumb(Math.abs(a - c));
  const karmic3 = editNumb(Math.abs(karmic1 - karmic2));
  const karmic4 = editNumb(Math.abs(b - c));
  const karmic5 = editNumb(Math.abs(karmic1 + karmic2 + karmic3 + karmic4));

  const period1 = 36 - Number(destiny);
  const period2 = period1 + 9;
  const period3 = period2 + 9;

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
  const arkan = editNumb(pure.split('').reduce((a, b) => a + Number(b), 0));

  const data = [
    [`Супер сила (${a})`, `ЧД 1 (${ch_d1})`, `КУ 1 (${karmic1})`, `0 - ${period1}`],
    [`Задача на жизнь (${b})`, `ЧД 2 (${ch_d2})`, `КУ 2 (${karmic2})`, `${period1} - ${period2}`],
    [`Энергия года (${c})`, `ЧД 3 (${ch_d3})`, `КУ 3 (${karmic3})`, `${period2} - ${period3}`],
    [`Предназначение (${d})`, `ЧД 4 (${ch_d4})`, `КУ 4 (${karmic4})`, `${period3} - ∞`],
    [`Денежный код: ${money_code}`, `Число судьбы ${destiny}`, `КУ 5 (${karmic5})`, `Возраст: ${age}`],
    [`Денежный канал: ${fin_code}`, `Число сознания: ${day_r}`, `Аркан: (${arkan})`, `Дата рождения: ${fullDate}`]
  ];

  return { data, values: { a, b, c, d, arkan, ch_d1 } };
}

function renderTable(containerId, title, data) {
  const container = document.getElementById(containerId);
  let html = `<h3>${title}</h3><table id="resultTable"><thead>
    <tr><th>Путь</th><th>Число Достижений</th><th>Кармический Узел</th><th>Период</th></tr></thead><tbody>`;
  data.forEach(row => {
    html += `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;
}

function renderCompatibility(m, f) {
  const rows = [
    ["Как познакомились", editNumb(m.a + f.a)],
    ["Развитие отношений", editNumb(m.b + f.b)],
    ["Как закончатся", editNumb(m.c + f.c)],
    ["Ядро отношений", editNumb(m.arkan + f.arkan)],
    ["Общая цель", editNumb(m.d + f.d)],
    ["Проблемы в отношениях", editNumb(m.ch_d1 + f.ch_d1)]
  ];
  const container = document.getElementById("compatTable");
  let html = `<h3>Совместимость</h3><table id="resultTable"><thead>
    <tr><th>Параметр</th><th>Число</th></tr></thead><tbody>`;
  rows.forEach(([param, value]) => {
    html += `<tr><td>${param}</td><td>${value}</td></tr>`;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;
}

function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('show');
}

document.getElementById('compatForm').addEventListener('submit', e => {
  e.preventDefault();
  const maleDate = document.getElementById('maleDate').value;
  const femaleDate = document.getElementById('femaleDate').value;
  if (!maleDate || !femaleDate) return alert("Введите обе даты");

  const male = buildMatrix(maleDate);
  const female = buildMatrix(femaleDate);

  renderTable("maleTable", "Он", male.data);
  renderTable("femaleTable", "Она", female.data);
  renderCompatibility(male.values, female.values);
});
