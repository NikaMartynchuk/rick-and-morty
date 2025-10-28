const characterImg = document.getElementById("character-img");
const characterTitles = document.querySelectorAll(".character-info h3");

characterImg.src = "";

characterTitles.forEach((title) => {
  title.addEventListener("click", () => {
    characterTitles.forEach((el) => el.classList.remove("active"));
    title.classList.add("active");

    const newImg = title.getAttribute("data-img");

    characterImg.classList.remove("active");
    characterImg.style.opacity = 0;
    characterImg.style.transform = "translateY(40px)";

    setTimeout(() => {
      characterImg.src = newImg;
      characterImg.classList.add("active");
    }, 200);
  });
});
