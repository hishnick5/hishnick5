document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");
  const closeModal = document.querySelector(".modal-close");

  document.querySelectorAll(".result-table td:last-child").forEach(cell => {
    cell.addEventListener("click", () => {
      const number = cell.getAttribute("data-num");
      const url = `source/contents/arcana/${number}.html`;

      fetch(url)
        .then(res => {
          if (!res.ok) throw new Error("Файл не найден");
          return res.text();
        })
        .then(html => {
          modalText.innerHTML = html;
          modal.style.display = "block";
        })
        .catch(err => {
          console.error(err);
          modalText.textContent = "Ошибка загрузки содержимого.";
          modal.style.display = "block";
        });
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
});
