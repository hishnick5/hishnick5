function reduceToSingleDigit(n) {
  n = [...String(n)].reduce((a, b) => a + Number(b), 0);
  return n < 10 ? n : [...String(n)].reduce((a, b) => a + Number(b), 0);
}

function calculateLifeCode(dateStr) {
  const [day, month, year] = dateStr.split('.').map(Number);
  const result = String(day * month * year);
  return result.slice(0, 6).padEnd(6, '0');
}

function calcNameDiff(father, your) {
  return Math.max(father.length - your.length, 0);
}

function calculateFinCode(lifeCode, yearCode, nameDiff) {
  const result = [];
  for (let i = 0; i < 6; i++) {
    const a = parseInt(lifeCode[i], 10);
    const b = parseInt(yearCode[i], 10);
    result.push(reduceToSingleDigit(a + b));
  }
  result.push(nameDiff);
  return result;
}

// Отрисовка графика
const form = document.getElementById('financeForm');
const ctx = document.getElementById('financeChart').getContext('2d');
let chart;

form.addEventListener('submit', e => {
  e.preventDefault();

  const birthdateInput = document.getElementById('birthdate').value;
  const yearStr = document.getElementById('targetYear').value.trim();
  const fatherName = document.getElementById('fatherName').value.trim();
  const yourName = document.getElementById('yourName').value.trim();

  if (!birthdateInput || !yearStr.match(/^\d{4}$/)) {
    alert('Введите корректную дату рождения и год!');
    return;
  }

  const birthdate = birthdateInput.split('-').reverse().join('.');
  const lifeCode = calculateLifeCode(birthdate);
  const yearDigit = String(reduceToSingleDigit(yearStr));
  const yearCode = yearDigit.repeat(6);
  const nameDiff = calcNameDiff(fatherName, yourName);
  const result = calculateFinCode(lifeCode, yearCode, nameDiff);
  const fullResult = result.concat(result.slice(0, 5)); // 12 месяцев

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Финансовый уровень',
        data: fullResult,
        borderColor: '#0d6efd',
        backgroundColor: '#d0e3ff',
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 10
        }
      }
    }
  });
});

document.getElementById('saveChartBtn').addEventListener('click', () => {
  if (!chart) return alert('Сначала постройте график!');
  const link = document.createElement('a');
  link.download = 'financial-chart.png';
  link.href = chart.toBase64Image();
  link.click();
});

// Навигационное меню
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('show');
}

// Обработка Enter
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const active = document.activeElement;
    if (active && ['birthdate', 'targetYear', 'fatherName', 'yourName'].includes(active.id)) {
      e.preventDefault();
      document.getElementById('financeForm').requestSubmit();
    }
  }
});
