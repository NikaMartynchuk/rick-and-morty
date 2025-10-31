import{g as p}from"./assets/animated-element-eecdf2be.js";import"./assets/vendor-6837a909.js";const l=document.getElementById("character-list"),s=document.querySelector(".load-more"),h=document.querySelector(".character-input"),f=document.querySelectorAll(".character select");let c=1,d=!1,o={};function y(e,r=!1){if(r&&(l.innerHTML=""),!e||e.length===0){l.innerHTML="<li>No characters found.</li>",s.style.display="none";return}const a=e.map(t=>`
    <li>
      <img class="character__img-list" src="${t.image}" alt="${t.name}">
      <h2 class="character__name">${t.name}</h2>
      <h3 class="character__info character__origin">
        <span class="character__span">Origin:</span> ${t.origin.name}
      </h3>
      <h3 class="character__info character__location">
        <span class="character__span">Location:</span> ${t.location.name}
      </h3>
    </li>
  `).join("");l.innerHTML+=a}async function u(e=1,r={},a=!1){var t;if(!d){d=!0,s.disabled=!0;try{const i=await p(e,r);y(i.results,a),s.style.display=(t=i.info)!=null&&t.next?"block":"none"}catch(i){console.error("Error loading characters:",i),l.innerHTML="<li>No characters found.</li>",s.style.display="none"}finally{d=!1,s.disabled=!1}}}function L(){const e={name:h.value.trim(),status:"",species:"",type:"",gender:""};return f.forEach(r=>{const a=r.previousElementSibling.textContent.toLowerCase().trim(),t=r.value.trim();a.includes("status")&&(e.status=t),a.includes("species")&&(e.species=t),a.includes("type")&&(e.type=t),a.includes("gender")&&(e.gender=t)}),e}function g(){c=1,o=L(),console.log("Фільтри:",o),u(c,o,!0)}u(c);s.addEventListener("click",()=>{c++,u(c,o)});h.addEventListener("input",g);f.forEach(e=>e.addEventListener("change",g));const n=document.getElementById("character-img"),m=document.querySelectorAll(".character-info h3");n.src="";m.forEach(e=>{e.addEventListener("click",()=>{m.forEach(a=>a.classList.remove("active")),e.classList.add("active");const r=e.getAttribute("data-img");n.classList.remove("active"),n.style.opacity=0,n.style.transform="translateY(40px)",setTimeout(()=>{n.src=r,n.classList.add("active")},200)})});
//# sourceMappingURL=commonHelpers.js.map
