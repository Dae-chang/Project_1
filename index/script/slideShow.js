const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
  slides[currentSlide].classList.remove("active");
  slides[index].classList.add("active");
  currentSlide = index;
}

function nextSlide() {
  let nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

showSlide(0);
setInterval(nextSlide, 3000);
