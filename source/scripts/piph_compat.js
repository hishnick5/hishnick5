// ========== ТВОИ АЛГОРИТМЫ ==========

// Технический расклад
function technicalLayout(formattedDate) {
  const cleanedDate = formattedDate.replace(/\./g, '').replace(/0/g, '');
  const nums = cleanedDate.split('').map(Number);
  const b1 = nums.reduce((a, b) => a + b, 0).toString();
  const b2 = (b1[1] === '0') ? b1[0] : b1.split('').reduce((a, b) => a + parseInt(b), 0).toString();
  const body = b1 + b2;
  const s1 = Math.abs(parseInt(b1) - nums[0] * 2).toString();
  const s2 = (s1.length === 1) ? '0' + s1 : s1.split('').reduce((a, b) => a + parseInt(b), 0).toString();
  const soul = s1 + s2;
  return { cleanedDate, body, soul };
}

// Таблица Пифагора
function calculateTablePiphagor(totalNumbers) {
  const { cleanedDate, body, soul } = totalNumbers;
  const total = cleanedDate + body + soul;
  const result = {};
  for (let i = 1; i <= 9; i++) {
    const strI = i.toString();
    const count = total.split('').filter(ch => ch === strI).length;
    result[strI] = count > 0 ? strI.repeat(count) : '';
  }
  return result;
}

// Число судьбы
function numberDestiny(formattedDate) {
  const clean = formattedDate.replace(/\./g, '').replace(/0/g, '');
  const num = clean.split('').reduce((sum, d) => sum + parseInt(d), 0);
  const result = num < 10 ? num : ((num - 1) % 9) + 1;
  return result.toString();
}

// Жизненный код
function calculateLifeCode(formattedDate) {
  const [day, month, year] = formattedDate.split('.').map(Number);
  let result = String(day * month * year);
  return result.length < 6 ? result.padEnd(6, '0') : result;
}

// ===== Рендер по схеме [1,4,7],[2,5,8],[3,6,9] =====
function buildTable(dictTable) {
  return `
    <table class="result-table fixed-layout">
      <tr>
        <td>${dictTable['1']}</td>
        <td>${dictTable['4']}</td>
        <td>${dictTable['7']}</td>
      </tr>
      <tr>
        <td>${dictTable['2']}</td>
        <td>${dictTable['5']}</td>
        <td>${dictTable['8']}</td>
      </tr>
      <tr>
        <td>${dictTable['3']}</td>
        <td>${dictTable['6']}</td>
        <td>${dictTable['9']}</td>
      </tr>
    </table>
  `;
}

// ========== ЛОГИКА ==========

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('compatForm');
  const maleMatrix = document.getElementById('maleTable');
  const femaleMatrix = document.getElementById('femaleTable');
  const compatMatrix = document.getElementById('compatTable');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const maleVal = document.getElementById('birthMale').value;
    const femaleVal = document.getElementById('birthFemale').value;
    if (!maleVal || !femaleVal) return;

    const [y1, m1, d1] = maleVal.split('-');
    const [y2, m2, d2] = femaleVal.split('-');
    const maleDate = `${d1}.${m1}.${y1}`;
    const femaleDate = `${d2}.${m2}.${y2}`;

    const maleNumbers = technicalLayout(maleDate);
    const femaleNumbers = technicalLayout(femaleDate);

    const maleDict = calculateTablePiphagor(maleNumbers);
    const femaleDict = calculateTablePiphagor(femaleNumbers);

    maleMatrix.innerHTML = buildTable(maleDict);
    femaleMatrix.innerHTML = buildTable(femaleDict);

    const maleDestiny = parseInt(numberDestiny(maleDate));
    const femaleDestiny = parseInt(numberDestiny(femaleDate));
    const destinyCompat = numberDestiny((maleDestiny + femaleDestiny).toString());

    const maleLife = parseInt(calculateLifeCode(maleDate));
    const femaleLife = parseInt(calculateLifeCode(femaleDate));
    const lifeCompat = numberDestiny(Math.abs(maleLife - femaleLife).toString());

    compatMatrix.innerHTML = `
      <table class="result-table fixed-layout">
        <thead>
          <tr>
            <th>Совместимость по числу судьбы</th>
            <th>Совместимость по жизненному коду</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${destinyCompat}</td>
            <td>${lifeCompat}</td>
          </tr>
        </tbody>
      </table>
    `;
  });
});
