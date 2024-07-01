const showBtn = document.querySelector(".show-modal");
const maskModal = document.querySelector(".mask-modal");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-modal");

showBtn.addEventListener("click", () => {
  maskModal.classList.add("active");
  modal.classList.add("modal-active");
});
closeBtn.addEventListener("click", closeModal);
maskModal.addEventListener("click", closeModal);

function closeModal() {
  modal.classList.remove("modal-active");
}


