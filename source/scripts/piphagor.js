document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('piphagorForm');
  const birthdateInput = document.getElementById('birthdate');
  const nameInput = document.getElementById('yourName');
// форма приёма данных
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateMatrix();
  });
// форма вывода значений по нажатию клавиши Энтер
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      calculateMatrix();
    }
  });

  function calculateMatrix() {
    const birthdate = birthdateInput.value;
    const name = nameInput.value.trim().toLowerCase();

    if (!birthdate || !name) {
      alert('Пожалуйста, введите корректную дату рождения и имя.');
      return;
    }

    const [year, month, day] = birthdate.split('-');
    const formattedDate = `${day}.${month}.${year}`;

    const digits = (day + month + year).replace(/0/g, '').split('').map(Number); // очищенная дата без нулей
    const countDigits = Array(10).fill(0);
    digits.forEach(d => countDigits[d]++);

    const body1 = digits.reduce((a, b) => a + b, 0);
    const body2 = body1.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    const body = `${body1}${body2}`; // тех.расклад тела

    const soul1 = Math.abs(body1 - digits[0] * 2);
    const soul2 = soul1.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    const soul = `${soul1}${soul2}`; // тех.расклад души

    const destiny = digits.reduce((a, b) => a + b, 0).toString().split('').reduce((a, b) => a + parseInt(b), 0); // чило судьбы
    const temperament = countDigits.filter(n => n > 0).length; //темперамент

    const energy = countDigits[2];
    const health = countDigits[4];
    const interest = countDigits[6];
    const logic = countDigits[5];
    const labor = countDigits[8];
    const memory = countDigits[9];
    const charisma = countDigits[7];
    const luck = countDigits[3];
    const character = countDigits[1];

    const nameTable = {
      1: 'аисъ', 2: 'бйты', 3: 'вкуь', 4: 'глфэ',
      5: 'дмхю', 6: 'енця', 7: 'ёоч', 8: 'жпш', 9: 'зрщ'
    };
    let nameSum = 0;
    for (let char of name) {
      for (let val in nameTable) {
        if (nameTable[val].includes(char)) {
          nameSum += parseInt(val);
          break;
        }
      }
    }
    let nameDigit = nameSum;
    while (nameDigit >= 10) {
      nameDigit = nameDigit.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }

    renderTables(formattedDate, character, energy, interest, health, logic, labor, charisma, luck, memory, destiny, temperament, body, soul, nameDigit);
  }

  function renderTables(date, ch, en, in_, hl, lg, lb, cr, lk, mem, destiny, temperament, body, soul, nameDigit) {
    const matrixTable = document.getElementById('matrixTable');
    const nameMatrixTable = document.getElementById('nameMatrixTable');
    const extraTable = document.getElementById('extraTable');

    matrixTable.innerHTML = buildHTMLTable([
      [`Характер\n${ch}`, `Здоровье\n${hl}`, `Харизма\n${cr}`, `Самореализация\n4`],
      [`Энергия\n${en}`, `Логика\n${lg}`, `Удача\n${lk}`, `Помощь семье\n5`],
      [`Интерес\n${in_}`, `Труд\n${lb}`, `Память\n${mem}`, `Привычки\n3`],
      [`Самооценка\n5`, `Семья, быт\n2`, `Талант\n5`, `Духовность\n6`]
    ], [`Дата рождения\n${date}`, `Энергетика\nМ-9, Ж-3`, `Число судьбы\n${destiny}`, `Темперамент\n${temperament}`], true);

    nameMatrixTable.innerHTML = buildHTMLTable([
      [`Характер\n${ch}`, `Здоровье\n${hl}`, `Харизма\n${cr}`, `Самореализация\n4`],
      [`Энергия\n${en}`, `Логика\n${lg}`, `Удача\n${lk}`, `Помощь семье\n5`],
      [`Интерес\n${in_}`, `Труд\n${lb}`, `Память\n${mem}`, `Привычки\n3`],
      [`Самооценка\n5`, `Семья, быт\n2`, `Талант\n5`, `Духовность\n6`]
    ], [`Дата рождения\n${date}`, `Энергетика\nМ-9, Ж-3`, `Число судьбы\n${destiny}`, `Темперамент\n${temperament}`], true);

    extraTable.innerHTML = buildHTMLTable([
      [`Код Богатства:\n1539`, `Психотип личности:\nМудрец`, `Прогноз Солнца:\n5`, `Здоровье:\nСердце, лёгкие. Желудок.`],
      [`Код Удачи:\n15299`, `Число имени:\n${nameDigit}`, `Прогноз Луны:\n5`, `Годы Рока:\n22, 47, 52, 58`],
      [`Тех.расклад Тела:\n${body}`, `Тех.расклад Души:\n${soul}`, `Итог года:\n1`, `Персональное\nчисло:\n6`]
    ], [`Жизненный код:\n991500`, `Счастливые числа:\n9-18-27`, `Зрелость души:\n12`, `Ваш камень удачи:\nАлмаз и Жемчуг`], false);
  }

  function addCellNumber(cellText, number) {
    return `<div class="cell-number">${number}</div>${cellText.replace(/\n/g, '<br>')}`;
  }

  function buildHTMLTable(rows, headers, addNumbers = false) {
    let thead = `<thead><tr>${headers.map(h => `<th>${h.replace(/\n/g, '<br>')}</th>`).join('')}</tr></thead>`;
    let tbody = '<tbody>';
    rows.forEach((row, rowIndex) => {
      tbody += '<tr>';
      row.forEach((cell, colIndex) => {
        if (addNumbers && rowIndex < 3 && colIndex < 3) {
          const number = rowIndex * 3 + colIndex + 1;
          tbody += `<td class="numbered-cell">${addCellNumber(cell, number)}</td>`;
        } else {
          tbody += `<td class="table-header-cell">${cell.replace(/\n/g, '<br>')}</td>`;
        }
      });
      tbody += '</tr>';
    });
    tbody += '</tbody>';
    return `<table class="result-table bordered">${thead}${tbody}</table>`;
  }
});

// Бургер-меню
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('show');
}
