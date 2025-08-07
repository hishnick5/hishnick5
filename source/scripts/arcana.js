document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".result-table td[data-num]").forEach(cell => {
    cell.addEventListener("click", () => {
      const number = cell.getAttribute("data-num");
      openModal(`source/contents/arcana/${number}.txt`);
    });
  });

  document.querySelector(".modal-close").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === document.getElementById("modal")) {
      document.getElementById("modal").style.display = "none";
    }
  });
});

function openModal(path) {
  fetch(path)
    .then(res => res.ok ? res.text() : 'Ошибка загрузки файла')
    .then(text => {
      const modal = document.getElementById('modal');
      const modalText = document.getElementById('modalText');
      modalText.textContent = text;
      modal.style.display = 'block';
    });
}
