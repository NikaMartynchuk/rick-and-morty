import{g as m}from"./assets/animated-element-5134bd64.js";import"./assets/vendor-6837a909.js";import"./assets/main-characters-25df6756.js";const c=document.getElementById("character-list"),r=document.querySelector(".load-more"),d=document.querySelector(".character-input"),f=document.querySelectorAll(".character-filtration select");let s=1,o=!1,l={};function p(e,a=!1){if(a&&(c.innerHTML=""),!e||e.length===0){c.innerHTML="<li>No characters found.</li>",r.style.display="none";return}const n=e.map(t=>`
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
  `).join("");c.innerHTML+=n}async function u(e=1,a={},n=!1){var t;if(!o){o=!0,r.disabled=!0;try{const i=await m(e,a);p(i.results,n),r.style.display=(t=i.info)!=null&&t.next?"block":"none"}catch(i){console.error("Error loading characters:",i),c.innerHTML="<li>No characters found.</li>",r.style.display="none"}finally{o=!1,r.disabled=!1}}}function g(){const e={name:d.value.trim(),status:"",species:"",type:"",gender:""};return f.forEach(a=>{const n=a.previousElementSibling.textContent.toLowerCase().trim(),t=a.value.trim();n.includes("status")&&(e.status=t),n.includes("species")&&(e.species=t),n.includes("type")&&(e.type=t),n.includes("gender")&&(e.gender=t)}),e}function h(){s=1,l=g(),console.log("Фільтри:",l),u(s,l,!0)}u(s);r.addEventListener("click",()=>{s++,u(s,l)});d.addEventListener("input",h);f.forEach(e=>e.addEventListener("change",h));
//# sourceMappingURL=commonHelpers.js.map
