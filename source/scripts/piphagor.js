document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("piphagorForm");
  const table1 = document.getElementById("tablePiphagor");
  const table2 = document.getElementById("tableWithName");
  const table3 = document.getElementById("tableAdditions");

  document.getElementById("piphagorForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const birthdate = document.getElementById("birthdate").value;
    const name = document.getElementById("yourName").value.trim();

    if (!birthdate || !name) {
      alert("Введите дату и имя");
      return;
    }

    const data = calculatePiphagor(birthdate, name);

    renderTable(table1, data.table1, data.heads1);
    renderTable(table2, data.table2, data.heads2);
    renderTable(table3, data.table3, data.heads3);
  });

  // поддержка Enter
  ["birthdate", "yourName"].forEach(id =>
    document.getElementById(id).addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        form.requestSubmit();
      }
    })
  );
});

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
}

// ======= MOCKUP калькулятор (здесь нужно вставить реальные расчёты) =======
function calculatePiphagor(dateStr, name) {
  const format = (label, val) => `${label}\n${val}`;

  // Заглушки-данные
  const heads1 = [
    format("Дата рождения", dateStr),
    format("Энергетика", "М"),
    format("Число судьбы", "7"),
    format("Темперамент", "6"),
  ];

  const piphagor = [
    [format("Характер", "3"), format("Здоровье", "4"), format("Харизма", "5"), format("Самореализация", "8")],
    [format("Энергия", "6"), format("Логика", "2"), format("Удача", "1"), format("Помощь семье", "0")],
    [format("Интерес", "4"), format("Труд", "7"), format("Память", "3"), format("Привычки", "6")],
    [format("Самооценка", "9"), format("Семья, быт", "2"), format("Талант", "5"), format("Духовность", "1")]
  ];

  const heads2 = heads1.slice(); // имя не влияет на заголовки

  const piphagorName = piphagor.map(row =>
    row.map(cell => cell.replace(/\d+$/, val => parseInt(val) + 1)) // подменим данные
  );

  const heads3 = [
    format("Жизненный Код", "5"),
    format("Прогноз Солнца", "2"),
    format("Камень удачи", "Рубин")
  ];

  const additions = [
    [format("Зрелость души", "3"), format("Прогноз Луны", "1"), format("Психотип", "Лидер")],
    [format("Код Богатства", "7"), format("Итог года", "9"), format("Здоровье", "Хорошо")],
    [format("Код Удачи", "6"), format("Тех.расклад", "Тела и души: 279 257"), format("Года Рока", "2025")],
    [format("Счастливые числа", "3 7 9"), format("Персон. год", "8"), format("Число имени", "4")]
  ];

  return {
    heads1, table1: piphagor,
    heads2, table2: piphagorName,
    heads3, table3: additions
  };
}

function renderTable(container, bodyData, headerRow) {
  container.innerHTML = "";

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  headerRow.forEach(head => {
    const th = document.createElement("th");
    th.innerText = head;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  bodyData.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.innerText = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}
