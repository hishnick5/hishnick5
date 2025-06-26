function reduceToSingleDigit(n) {
  n = [...String(n)].reduce((a, b) => a + Number(b), 0);
  return n < 10 ? n : [...String(n)].reduce((a, b) => a + Number(b), 0);
}

function calculateLifeCode(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const code = String(day * month * year).padEnd(6, '0');
  return code.slice(0, 6);
}

function calcNameDiff(father, your) {
  return Math.max(father.length - your.length, 0);
}

function calculateFinCode(lifeCode, yearCode, nameDiff) {
  const result = [];
  for (let i = 0; i < 6; i++) {
    const a = parseInt(lifeCode[i]);
    const b = parseInt(yearCode[i]);
    result.push(reduceToSingleDigit(a + b));
  }
  result.push(nameDiff);
  return result;
}

const form = document.getElementById('financeForm');
const ctx = document.getElementById('financeChart').getContext('2d');
let chart;

form.addEventListener('submit', e => {
  e.preventDefault();

  const birthdate = document.getElementById('birthdate').value;
  const yearStr = document.getElementById('targetYear').value.trim();
  const fatherName = document.getElementById('fatherName').value.trim();
  const yourName = document.getElementById('yourName').value.trim();

  if (!birthdate || !yearStr.match(/^[0-9]{4}$/)) {
    alert('Введите корректную дату и год.');
    return;
  }

  const lifeCode = calculateLifeCode(birthdate);
  const yearDigit = String(reduceToSingleDigit(parseInt(yearStr)));
  const yearCode = yearDigit.repeat(6);
  const nameDiff = calcNameDiff(fatherName, yourName);
  const result = calculateFinCode(lifeCode, yearCode, nameDiff);
  const fullResult = result.concat(result.slice(0, 5)); // всего 12 значений

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
