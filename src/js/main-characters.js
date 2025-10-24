const characterImg = document.getElementById("character-img");
const characterTitles = document.querySelectorAll(".character-info h3");

characterTitles.forEach((title) => {
  title.addEventListener("click", () => {
    characterTitles.forEach((el) => el.classList.remove("active"));
    title.classList.add("active");

    const newImg = title.getAttribute("data-img");
    characterImg.style.opacity = 0;

    setTimeout(() => {
      characterImg.src = newImg;
      characterImg.style.opacity = 1;
    }, 300);
  });
});
