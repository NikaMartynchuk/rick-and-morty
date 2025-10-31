const btn = document.getElementById("scrollBtn");
const icon = document.getElementById("arrowIcon");
const target = document.getElementById("exploreSection");

function findNonTransparentBgColor(el) {
  let cur = el;
  while (cur && cur !== document.documentElement) {
    const style = window.getComputedStyle(cur);
    const bg = style.backgroundColor;
    if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
      return bg;
    }
    cur = cur.parentElement;
  }
  const bodyBg = window.getComputedStyle(document.body).backgroundColor;
  return bodyBg || "rgb(255,255,255)";
}

function parseRGB(bg) {
  const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return [255,255,255];
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function luminanceFromRGB(rgb) {
  const srgb = rgb.map(v => v / 255);
  const lin = srgb.map(c => {
    if (c <= 0.03928) return c / 12.92;
    return Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

const LUMINANCE_THRESHOLD = 0.5;

function updateArrowAndColor() {
  if (!target) return;
  const y = window.scrollY;
  const sectionTop = target.offsetTop;
  const sectionBottom = sectionTop + target.offsetHeight;

  
  if (y < sectionTop - 50) {
    icon.style.transform = "rotate(0deg)";   
  } else if (y >= sectionTop - 50 && y <= sectionBottom - 50) {
    icon.style.transform = "rotate(-540deg)";  
  } else {
    icon.style.transform = "rotate(180deg)"; 
  }

  const probeX = window.innerWidth - 40;
  const probeY = window.innerHeight - 40;
  let el = document.elementFromPoint(probeX, probeY);

  if (!el) el = document.body;

  const bg = findNonTransparentBgColor(el);
  const rgb = parseRGB(bg);
  const lum = luminanceFromRGB(rgb);

  if (lum < LUMINANCE_THRESHOLD) {
    btn.classList.add("light");
    btn.classList.remove("dark");
  } else {
    btn.classList.add("dark");
    btn.classList.remove("light");
  }
}

btn.addEventListener("click", () => {
  const y = window.scrollY;
  const sectionTop = target ? target.offsetTop : 0;

  if (y < sectionTop - 50) {
    window.scrollTo({ top: sectionTop, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

window.addEventListener("scroll", updateArrowAndColor, { passive: true });
window.addEventListener("resize", updateArrowAndColor);

updateArrowAndColor();
