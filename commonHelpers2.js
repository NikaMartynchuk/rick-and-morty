import{a as h,b as E,c as L}from"./assets/animated-element-eecdf2be.js";import"./assets/vendor-6837a909.js";const c=document.getElementById("episodes"),p=document.getElementById("loadMore"),m=document.getElementById("name"),u=document.getElementById("season"),i=document.getElementById("popup"),l=document.getElementById("popupContent"),y=document.getElementById("closePopup"),d=document.getElementById("noResults");let n=1,v=1,a={};function f(t,e=300){let o;return(...s)=>{clearTimeout(o),o=setTimeout(()=>t(...s),e)}}function B(t){const e=document.createElement("div");e.className="episode-card",e.innerHTML=`
    <div class="episode-bg">
      <div class="overlay"></div>
      <div class="episode-info">
        <h3>${t.name}</h3>
        <p>${new Date(t.air_date).toDateString()}</p>
      </div>
    </div>
  `,e.addEventListener("click",()=>I(t.id)),c.appendChild(e)}async function r(){var t;p.style.display="none";try{const e=await h(n,a);if(n===1&&(c.innerHTML=""),!e||!((t=e.results)!=null&&t.length)){c.classList.add("hidden"),d.classList.remove("hidden"),d.classList.add("show");return}d.classList.remove("show"),d.classList.add("hidden"),c.classList.remove("hidden"),v=e.info.pages,e.results.forEach(B),n<v&&(p.style.display="block")}catch(e){console.error("Error loading episodes:",e)}}async function I(t){i.classList.remove("hidden"),i.classList.add("visible"),l.innerHTML="<p>Loading...</p>";try{const e=await E(t),o=await Promise.all(e.characters.slice(0,4).map(async s=>await L(s.split("/").pop())));l.innerHTML=`
      <div class="popup-box-border">
        <h2>${e.name}</h2>
        <p class="date">${new Date(e.air_date).toDateString()}</p>

        <h3 class="sub-title">Major Characters</h3>
<div class="popup-characters-list">
          ${o.map(s=>`
              <div class="character-row">
                <img src="${s.image}" alt="${s.name}">
                <p>${s.name}</p>
              </div>
            `).join("")}
        </div>
      </div>
    `}catch{l.innerHTML="<p>Error loading episode.</p>"}}function g(){i.classList.remove("visible"),i.classList.add("hidden")}y.addEventListener("click",g);i.addEventListener("click",t=>{t.target===i&&g()});p.addEventListener("click",()=>{n++,r()});m.addEventListener("input",f(()=>{a.name=m.value.trim(),a.name||delete a.name,n=1,r()},350));u.addEventListener("change",()=>{const t=u.value;t?a.episode=t:delete a.episode,n=1,r()});r();
//# sourceMappingURL=commonHelpers2.js.map
