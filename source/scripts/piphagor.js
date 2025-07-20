document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('piphagorForm');
  const birthdateInput = document.getElementById('birthdate');
  const nameInput = document.getElementById('yourName');
  const inputYearInput = document.getElementById('inputYear');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateMatrix();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      calculateMatrix();
    }
  });

  function getCurrentYear() {
    return new Date().getFullYear().toString();
  };

  function calculateMatrix() {
    const birthdate = birthdateInput.value;
    const yourName = nameInput.value.trim();
    const inputYear = inputYearInput?.value || getCurrentYear();

    if (!birthdate) return;

    const [year, month, day] = birthdate.split('-');
    const formattedDate = `${day}.${month}.${year}`;
    const dayMonth = formattedDate.split('.').slice(0, 2).join('.');

    const digits = (day + month + year).replace(/0/g, '').split('').map(Number);
    const nameDigit = yourName
      .toUpperCase()
      .split('')
      .filter(char => /[А-ЯA-Z]/.test(char))
      .reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
      .toString()
      .split('')
      .reduce((sum, d) => sum + parseInt(d), 0);

    const totalNumbers = technicalLayout(formattedDate);
    const { cleanedDate, body, soul } = totalNumbers;

    const tableData = calculateTablePiphagor(totalNumbers);
    const tableWithName = calculateTablePiphagorWithName(totalNumbers, nameDigit);

    const listTable = Object.values(tableData);
    const dictTable = tableData;

    const ch = dictTable['1']?.length || 0;
    const en = dictTable['2']?.length || 0;
    const in_ = dictTable['3']?.length || 0;
    const hl = dictTable['4']?.length || 0;
    const lg = dictTable['5']?.length || 0;
    const lb = dictTable['6']?.length || 0;
    const cr = dictTable['7']?.length || 0;
    const lk = dictTable['8']?.length || 0;
    const mem = dictTable['9']?.length || 0;

    const destiny = numberDestiny(formattedDate); // число судьбы
    const lifeCode = calculateLifeCode(formattedDate); // лайф код
    const luckie = calculateLuckie(destiny); // счастливые числа
    const reincarnation = calculateReincarnation(listTable); // зрелость души
    const temperament = calculationTemperament(dictTable); // темпераментр
    const [rich, fortune] = calculationRichiCode(formattedDate); // код Богатства, Удачи
    const maleFemale = calculateMaleFemale(listTable).maleFemale; // женская/мужская энергия
    const [sun, luna, total] = calculateLunaSunCode(lifeCode, inputYear); // солнце, луна, итог
    const forecastYear = calculateForecastYear(formattedDate, inputYear); // персональное число года
    const fatefulYear = calculateFatefulYear(lifeCode); // года Рока
    const stone = calculateStone(destiny); // камень удачи
    const healthDescription = calculateHealth(lifeCode); // рекомендации по здоровью
    const psichoTip = getPsichoTips(lifeCode); // психотип личности
    const realization = calculationRealization(dictTable); // самореализация
    const helpingTheFamily = calculationHelpingFamily(dictTable); // помощь семье
    const habits = calculationHabits(dictTable); // привычки
    const selfAssessment = calculationSelfAssessment(dictTable); // самореализация
    const familyLife = calculationFamilyLife(dictTable); // семья, быт
    const talent = calculationTalents(dictTable); // талант
    const spirituality = calculationSpirituality(dictTable); // духовность
    const codeBehaviour = calculateCodeBehaviour(dayMonth); // код поведения

    renderTables(
      formattedDate, ch, en, in_, hl, lg, lb, cr, lk, mem, destiny, lifeCode, luckie,
      reincarnation, temperament, fatefulYear, forecastYear, stone, healthDescription,
      psichoTip, realization, helpingTheFamily, habits, selfAssessment,
      familyLife, talent, spirituality, rich, fortune, body, soul,
      maleFemale, sun, luna, total, nameDigit, codeBehaviour
    );

    makeMatrixInteractive(dictTable);
    makeExtraInteractive(body, soul, total, forecastYear);
  }
});

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
    const count = total.split('').filter(char => char === strI).length;
    result[strI] = count > 0 ? strI.repeat(count) : '';
  }
  return result;
}

// Таблица Пифагора + имя
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

// Расчёт имени
function countNameDigits(name) {
  return name.replace(/[^0-9]/g, '').split('').reduce((acc, cur) => acc + parseInt(cur), 0).toString();
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

// Психотипы
const psichoTips = {
  '1': 'Любознательные, хотят всё знать, человек жаждущий знания',
  '2': 'Энергичность',
  '3': 'Талант',
  '4': 'Расчёт, терпение, дипломатичность',
  '5': 'Сердечность доброта',
  '6': 'Трудолюбие',
  '7': 'Счастье, харизма',
  '8': 'Удача, везение, баловень судьбы',
  '9': 'Аналитические способности, очень тяжело удивить этого человека чем-либо',
  '22': 'Коммуникабельный человек',
  '99': 'Мудрец'
};

function getPsichoTips(lifeCode) {
  if (psichoTips[lifeCode.slice(0, 2)]) {
    return psichoTips[lifeCode.slice(0, 2)];
  } else if (psichoTips[lifeCode[0]]) {
    return psichoTips[lifeCode[0]];
  }
  return null;
}

// Счастливые числа
function calculateLuckie(destiny) {
  const luckieDict = {
    '1': '1-10-19-28',
    '2': '2-11-20-29',
    '3': '3-12-21-30',
    '4': '4-13-22-31',
    '5': '5-14-23-30',
    '6': '6-15-24-30',
    '7': '7-14-21-28',
    '8': '8-16-24',
    '9': '9-18-27'
  };
  return luckieDict[destiny];
}

// Зрелость души / реинкарнации
function calculateReincarnation(listTable) {
  const totalStr = listTable.filter(x => x !== '-').join('');
  return totalStr.length;
}

// Код богатства и удачи
function calculationRichiCode(formattedDate) {
  function reduceNumber(n) {
    n = String(n);
    while (n.length > 1) {
      n = String(Array.from(n).reduce((sum, d) => sum + parseInt(d), 0));
    }
    return parseInt(n);
  }

  const [day, month, year] = formattedDate.split('.').map(reduceNumber);
  const temp = reduceNumber(day + month + year);
  const rich = parseInt(`${day}${month}${year}${temp}`);
  const fortune = parseInt(`${rich}${reduceNumber(Array.from(String(rich)).reduce((sum, d) => sum + parseInt(d), 0))}`);
  return [rich, fortune];
}

// Здоровье
function calculateHealth(lifeCode) {
  const healthMap = {
    '1': 'Мозг, сосуды. ',
    '2': 'Горло, щитовидная железа. ',
    '3': 'Сердце, лёгкие. ',
    '4': 'Поджелудочная железа. ',
    '5': 'Желудок. ',
    '6': 'Половые органы. '
  };

  return Array.from(lifeCode)
    .map((char, i) => char === '0' || char === '1' ? healthMap[(i + 1).toString()] || '' : '')
    .join('');
}

// Мужская и женская энергия
function calculateMaleFemale(listTable) {
  const digitsStr = listTable.filter(x => x && x !== '-').join('');

  let male = 0;
  let female = 0;

  for (let i = 0; i < digitsStr.length; i++) {
    const digit = parseInt(digitsStr[i]);
    digit % 2 === 1 ? male++ : female++;
  }

  return {
    pureString: digitsStr,
    maleFemale: `М-${male}, Ж-${female}`
  };
}

// Темперамент (диагональ снизу вверх: 3 + 5 + 7)
function calculationTemperament(dictTable) {
  const temperament =
    (dictTable['3']?.length || 0) +
    (dictTable['5']?.length || 0) +
    (dictTable['7']?.length || 0);
  return temperament;
}

// Самореализация (горизонталь 1: 1 + 4 + 7)
function calculationRealization(dictTable) {
  const realization =
    (dictTable['1']?.length || 0) +
    (dictTable['4']?.length || 0) +
    (dictTable['7']?.length || 0);
  return realization;
}

// Помощь семье (горизонталь 2: 2 + 5 + 8)
function calculationHelpingFamily(dictTable) {
  const helpingTheFamily =
    (dictTable['2']?.length || 0) +
    (dictTable['5']?.length || 0) +
    (dictTable['8']?.length || 0);
  return helpingTheFamily;
}

// Привычки (горизонталь 3: 3 + 6 + 9)
function calculationHabits(dictTable) {
  const habits =
    (dictTable['3']?.length || 0) +
    (dictTable['6']?.length || 0) +
    (dictTable['9']?.length || 0);
  return habits;
}

// Духовность (диагональ сверху вниз: 1 + 5 + 9)
function calculationSpirituality(dictTable) {
  const spirituality =
    (dictTable['1']?.length || 0) +
    (dictTable['5']?.length || 0) +
    (dictTable['9']?.length || 0);
  return spirituality;
}

// Талант (вертикаль 3: 7 + 8 + 9)
function calculationTalents(dictTable) {
  const talent =
    (dictTable['7']?.length || 0) +
    (dictTable['8']?.length || 0) +
    (dictTable['9']?.length || 0);
  return talent;
}

// Семья, быт (вертикаль 2: 4 + 5 + 6)
function calculationFamilyLife(dictTable) {
  const familyLife =
    (dictTable['4']?.length || 0) +
    (dictTable['5']?.length || 0) +
    (dictTable['6']?.length || 0);
  return familyLife;
}

// Самооценка (вертикаль 1: 1 + 2 + 3)
function calculationSelfAssessment(dictTable) {
  const selfAssessment =
    (dictTable['1']?.length || 0) +
    (dictTable['2']?.length || 0) +
    (dictTable['3']?.length || 0);
  return selfAssessment;
}

// Камень удачи
function calculateStone(destiny) {
  return {
    '1': 'Рубин',
    '2': 'Коралл',
    '3': 'Топаз',
    '4': 'Изумруд',
    '5': 'Бирюза',
    '6': 'Сапфир',
    '7': 'Аметист',
    '8': 'Розовый Кварц',
    '9': 'Алмаз и Жемчуг'
  }[destiny];
}

// Прогноз Солнца, Луны и Итог года
function calculateLunaSunCode(lifeCode, inputYear) {
  const lunaSunCode = String(parseInt(lifeCode) / parseInt(inputYear)).slice(0, 4);
  const luna = parseInt(lunaSunCode[0]) + parseInt(lunaSunCode[1]);
  const sun = lunaSunCode[2] === '0'
    ? parseInt(lunaSunCode[2])
    : (parseInt(lunaSunCode[2]) + parseInt(lunaSunCode[3]));

  let total = sun - luna;

  const adv = [];
  if ([1, 7, 10].includes(luna) || [1, 7, 10].includes(sun)) {
    adv.push('В семье возможна беременность, рождение детей или внуков');
    if (luna === 13) {
      adv.push('Будьте по внимательнее в этом году!');
    }
  }
  if (sun === 13) {
    adv.push('В этом году будет вам Куш!');
  }
  if (total === 13) {
    adv.push('Ожидайте очень большой Куш!');
  }
  if (sun && total === 10) {
    adv.push('Возможен переезд в этом году');
  }
  if (total < -10 || total > 10) {
    const totalStr = String(total);
    total = parseInt(totalStr.slice(0, -1)) - parseInt(totalStr.slice(-1));
  }

  return [sun, luna, total];
}

// Годы Рока
function calculateFatefulYear(lifeCode) {
  const result = [];

  const yearsTable = Array.from({ length: 6 }, (_, j) =>
    Array.from({ length: 17 }, (_, i) => i * 6 + j)
  );

  for (let colIdx = 0; colIdx < 6; colIdx++) {
    if (lifeCode[colIdx] === '0') {
      for (const year of yearsTable[colIdx]) {
        if (year === 0) continue;
        const divisionResult = Math.round(parseInt(lifeCode) / year);
        const divisionStr = divisionResult.toString();
        const thirdDigit = divisionStr.length > 2 ? divisionStr[2] : '0';
        if (thirdDigit === '0') {
          result.push(year.toString());
        }
      }
    }
  }

  const uniqueYears = [...new Set(result)].sort((a, b) => parseInt(a) - parseInt(b));
  return uniqueYears.join(',') || '';
}

// Персональное число года
function calculateForecastYear(formattedDate, inputYear) {
  const forecastYear = inputYear || getCurrentYear();
  const dayMonthSum = formattedDate.replace(/\./g, '').slice(0, 4).split('').reduce((sum, d) => sum + parseInt(d), 0);
  const sumYear = forecastYear.split('').reduce((sum, d) => sum + parseInt(d), 0);
  const result = String(dayMonthSum + sumYear);

  return result.length > 1 ? numberDestiny(result) : result;
}

// Код поведения по дате рождения
function calculateCodeBehaviour(dayMonth) {
  const codeMap = {
    '01.01': 'Лидерство с рождения.',
    '10.05': 'Сильная чувствительность.',
  };

  return codeMap[dayMonth] || 'Уникальный код поведения.';
}

// Генерация таблиц
function renderTables(formattedDate, ch, en, in_, hl, lg, lb, cr, lk, mem, destiny, lifeCode, luckie, reincarnation, temperament, fatefulYear, forecastYear, stone, healthDescription, psichoTip, realization, helpingTheFamily, habits, selfAssessment, familyLife, talent, spirituality, rich, fortune, body, soul, maleFemale, sun, luna, total, nameDigit, codeBehaviour) {
  const matrixTable = document.getElementById('matrixTable');
  const nameMatrixTable = document.getElementById('nameMatrixTable');
  const extraTable = document.getElementById('extraTable');
  const behaviorTable = document.getElementById('behaviourTable');

  matrixTable.innerHTML = buildHTMLTable([
    [`Характер\n${ch}`, `Здоровье\n${hl}`, `Харизма\n${cr}`, `Самореализация\n${realization}`],
    [`Энергия\n${en}`, `Логика\n${lg}`, `Удача\n${lk}`, `Помощь семье\n${helpingTheFamily}`],
    [`Интерес\n${in_}`, `Труд\n${lb}`, `Память\n${mem}`, `Привычки\n${habits}`],
    [`Самооценка\n${selfAssessment}`, `Семья, быт\n${familyLife}`, `Талант\n${talent}`, `Духовность\n${spirituality}`]
  ], [`Дата рождения\n${formattedDate}`, `Энергетика\n${maleFemale}`, `Число судьбы\n${destiny}`, `Темперамент\n${temperament}`], true);

  nameMatrixTable.innerHTML = matrixTable.innerHTML;

  extraTable.innerHTML = buildHTMLTable([
    [`Код Богатства:\n${rich}`, `Ваш камень удачи:\n${stone}`, `Прогноз Солнца:\n${sun}`, `Здоровье:\n${healthDescription}`],
    [`Код Удачи:\n${fortune}`, `Число имени:\n${nameDigit}`, `Прогноз Луны:\n${luna}`, `Годы Рока:\n${fatefulYear}`],
    [
      `<a href="source/bodysoul/${body}.txt" target="_blank">Тех.расклад Тела:\n${body}</a>`,
      `<a href="source/bodysoul/${soul}.txt" target="_blank">Тех.расклад Души:\n${soul}</a>`,
      `<a href="source/sunmoon/${total}.txt" target="_blank">Итог года:\n${total}</a>`,
      `<a href="source/persyear/${forecastYear}.txt" target="_blank">Персональное\nчисло:\n${forecastYear}</a>`
    ]
  ], [`Жизненный код:\n${lifeCode}`, `Счастливые числа:\n${luckie}`, `Зрелость души:\n${reincarnation}`, `Психотип личности:\n${psichoTip}`], false);

  behaviorTable.innerHTML = buildHTMLTable(
    [[codeBehaviour]],
    ['Код поведения по дате рождения'],
    false
  );
}

// Функция для вставки номера ячейки и ссылки
function addCellNumberWithLink(cellValue, number) {
  const value = cellValue.replace(/\n/g, '<br>') || '0';
  const cleanValue = cellValue.replace(/\n/g, '') || '0';
  const path = `source/psicho/${number}/${cleanValue}.txt`;

  return `
    <div class="cell-number">${number}</div>
    <div class="cell-content">
      <a href="${path}" target="_blank" style="text-decoration: none; color: inherit;">
        ${value}
      </a>
    </div>
  `;
}

// Функция сборки HTML таблицы
function buildHTMLTable(rows, headers, clickable = false) {
  let html = '<table>';

  if (headers) {
    html += '<thead><tr>';
    for (let h of headers) {
      html += `<th>${h}</th>`;
    }
    html += '</tr></thead>';
  }

  html += '<tbody>';
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    html += '<tr>';
    for (let colIndex = 0; colIndex < rows[rowIndex].length; colIndex++) {
      const cell = rows[rowIndex][colIndex];
      if (clickable) {
        const cellNumber = colIndex + 1 + rowIndex * rows[rowIndex].length;
        html += `<td>${addCellNumberWithLink(cell, cellNumber)}</td>`;
      } else {
        html += `<td>${cell}</td>`;
      }
    }
    html += '</tr>';
  }
  html += '</tbody></table>';
  return html;
}

// Кликабельные ячейки психоматрицы (1–9)
function makeMatrixInteractive(dictTable) {
  const matrix = document.getElementById('matrixTable');
  if (!matrix) return;

  const flatCells = matrix.getElementsByTagName('td');
  const allValues = {
    '1': dictTable['1'] || '',
    '2': dictTable['2'] || '',
    '3': dictTable['3'] || '',
    '4': dictTable['4'] || '',
    '5': dictTable['5'] || '',
    '6': dictTable['6'] || '',
    '7': dictTable['7'] || '',
    '8': dictTable['8'] || '',
    '9': dictTable['9'] || ''
  };

  Array.from(flatCells).forEach(cell => {
    const cellText = cell.textContent.trim();
    const keys = Object.keys(allValues);
    keys.forEach(key => {
      if (cellText.includes(key) && cellText.startsWith(getTitleFromIndex(key))) {
        const value = allValues[key] || '0';
        const fileName = value !== '' ? value.length > 0 ? value : '0' : '0';
        const filePath = `source/psicho/${key}/${fileName}.txt`;
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', () => {
          window.open(filePath, '_blank');
        });
      }
    });
  });
}

function getTitleFromIndex(index) {
  const titles = {
    '1': 'Характер',
    '2': 'Энергия',
    '3': 'Интерес',
    '4': 'Здоровье',
    '5': 'Логика',
    '6': 'Труд',
    '7': 'Харизма',
    '8': 'Удача',
    '9': 'Память'
  };
  return titles[index];
}

// Кликабельные ячейки для блока "Дополнения"
function makeExtraInteractive(body, soul, total, forecastYear) {
  const extraTable = document.getElementById('extraTable');
  if (!extraTable) return;

  const flatCells = extraTable.getElementsByTagName('td');

  Array.from(flatCells).forEach(cell => {
    const text = cell.textContent;
    if (text.includes('Тех.расклад Тела')) {
      cell.style.cursor = 'pointer';
      cell.addEventListener('click', () => {
        window.open(`source/bodysoul/${body || '0'}.txt`, '_blank');
      });
    }
    if (text.includes('Тех.расклад Души')) {
      cell.style.cursor = 'pointer';
      cell.addEventListener('click', () => {
        window.open(`source/bodysoul/${soul || '0'}.txt`, '_blank');
      });
    }
    if (text.includes('Итог года')) {
      const fileName = total || '0';
      cell.style.cursor = 'pointer';
      cell.addEventListener('click', () => {
        window.open(`source/sunmoon/${fileName}.txt`, '_blank');
      });
    }
    if (text.includes('Персональное') || text.includes('число:')) {
      const fileName = forecastYear || '0';
      cell.style.cursor = 'pointer';
      cell.addEventListener('click', () => {
        window.open(`source/persyear/${fileName}.txt`, '_blank');
      });
    }
  });
};
