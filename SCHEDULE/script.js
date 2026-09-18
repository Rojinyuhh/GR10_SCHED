
const buttons = document.querySelectorAll(".day-btn");
const rows = document.querySelectorAll("tbody tr");
const search = document.querySelector("#subjectSearch");
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const closeModal = document.querySelector("#closeModal");

function filterDay(day){
  buttons.forEach(b => b.classList.toggle("active", b.dataset.day === day));
  rows.forEach(row => {
    const cells = [...row.querySelectorAll("td")];
    cells.forEach((cell, index) => {
      if(index === 0) return;
      cell.classList.toggle("hidden", day !== "all" && cell.dataset.day !== day);
    });
  });
}
buttons.forEach(btn => btn.addEventListener("click", () => filterDay(btn.dataset.day)));

if(search){
  search.addEventListener("input", () => {
    const term = search.value.toLowerCase().trim();
    document.querySelectorAll(".class-cell").forEach(cell => {
      const matches = cell.innerText.toLowerCase().includes(term);
      cell.style.opacity = (!term || matches) ? "1" : ".22";
    });
  });
}
document.querySelectorAll(".class-cell").forEach(cell => {
  cell.addEventListener("click", () => {
    if(cell.classList.contains("empty") || cell.classList.contains("break")) return;
    modalTitle.textContent = cell.querySelector(".subject")?.textContent || "Class";
    modalText.innerHTML = cell.querySelector(".teacher")?.textContent +
      "<br>" + cell.querySelector(".time")?.textContent;
    modal.classList.add("show");
  });
});
function hideModal(){modal.classList.remove("show")}
if(closeModal) closeModal.addEventListener("click", hideModal);
if(modal) modal.addEventListener("click", e => {if(e.target === modal) hideModal()});
document.addEventListener("keydown", e => {if(e.key === "Escape") hideModal()});
filterDay("all");
