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

  const [year, month, day] = birthdate.split('-');
  const formattedDate = `${day}.${month}.${year}`;

  function calculateMatrix() {
    const birthdate = birthdateInput.value;
    const name = nameInput.value.trim().toLowerCase();

    if (!birthdate || !name) {
      alert('Пожалуйста, введите корректную дату рождения и имя.');
      return;
    }

    function technicalLayout(inputDate) {
      const clean = inputDate.replace(/\./g, '').replace(/0/g, '');
      const nums = clean.split('').map(Number);

      const b1 = nums.reduce((a, b) => a + b, 0).toString();
      const b2 = (b1[1] === '0') ? b1[0] : b1.split('').reduce((a, b) => a + parseInt(b), 0).toString();
      const body = b1 + b2;

      const s1 = Math.abs(parseInt(b1) - nums[0] * 2).toString();
      const s2 = (s1.length === 1) ? '0' + s1 : s1.split('').reduce((a, b) => a + parseInt(b), 0).toString();
      const soul = s1 + s2;

      return { cleanedDate: clean, body, soul };
    }

    const total_numbers = technicalLayout(formattedDate);  // formattedDate = "дд.мм.гггг"
    const body_soul = [total_numbers.body, total_numbers.soul];

    // Получаем тех.расклад body и soul
    const [body, soul] = body_soul;
    function calculateTablePiphagor(totalNumbers) {
      const { cleanedDate, body, soul } = totalNumbers;
      const total = cleanedDate + body + soul;
      const result = {};

      for (let i = 1; i <= 9; i++) {
        const strI = i.toString();
        const count = total.split('').filter(char => char === strI).length;
        result[strI] = count > 0 ? strI.repeat(count) : '';
      }

      return result;
    }

    function calculateTablePiphagorWithName(totalNumbers, countName) {
      const { cleanedDate, body, soul } = totalNumbers;
      const total = cleanedDate + body + soul + countName;
      const result = {};

      for (let i = 1; i <= 9; i++) {
        const strI = i.toString();
        const count = total.split('').filter(char => char === strI).length;
        result[strI] = count > 0 ? strI.repeat(count) : '';
      }

      return result;
    }

    const dictTable = calculateTablePiphagor(totalNumbers);
    const listTable = Object.values(dictTable);

    const nameDictTable = calculateTablePiphagorWithName(totalNumbers, nameDigit.toString());
    const nameListTable = Object.values(nameDictTable);

    function calculateReincarnation(listTable) {
      const totalStr = listTable.filter(x => x !== '-').join('');
      const count = totalStr.length;
      return count;
    }

    const reincarnation = calculateReincarnation(listTable)

    function numberDestiny(formattedDate) {
      const clean = inputDate.replace(/\./g, '').replace(/0/g, '');
      const num = clean.split('').reduce((sum, d) => sum + parseInt(d), 0);
      const result = num < 10 ? num : ((num - 1) % 9) + 1;
      return result.toString();
    }


    const digits = (day + month + year).replace(/0/g, '').split('').map(Number); // очищенная дата без нулей
    const countDigits = Array(10).fill(0);
    digits.forEach(d => countDigits[d]++);
    const destiny = numberDestiny(formattedDate); // верный способ

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
