import{a as h,b as E,c as y}from"./assets/animated-element-5b4e2e0c.js";import"./assets/vendor-6837a909.js";const o=document.getElementById("episodes"),l=document.getElementById("loadMore"),p=document.getElementById("name"),m=document.getElementById("season"),i=document.getElementById("popup"),r=document.getElementById("popupContent"),L=document.getElementById("closePopup"),u=document.getElementById("noResults");let n=1,v=1,a={};function f(t,e=300){let d;return(...s)=>{clearTimeout(d),d=setTimeout(()=>t(...s),e)}}function B(t){const e=document.createElement("div");e.className="episode-card",e.innerHTML=`
    <div class="episode-bg">
      <div class="overlay"></div>
      <div class="episode-info">
        <h3>${t.name}</h3>
        <p>${new Date(t.air_date).toDateString()}</p>
      </div>
    </div>
  `,e.addEventListener("click",()=>I(t.id)),o.appendChild(e)}async function c(){var t;l.style.display="none";try{const e=await h(n,a);if(n===1&&(o.innerHTML=""),!e||!((t=e.results)!=null&&t.length)){u.classList.remove("hidden"),o.classList.add("hidden");return}u.classList.add("hidden"),o.classList.remove("hidden"),v=e.info.pages,e.results.forEach(B),n<v&&(l.style.display="block")}catch(e){console.error("Error loading episodes:",e)}}async function I(t){i.classList.remove("hidden"),i.classList.add("visible"),r.innerHTML="<p>Loading...</p>";try{const e=await E(t),d=await Promise.all(e.characters.slice(0,4).map(async s=>await y(s.split("/").pop())));r.innerHTML=`
      <div class="popup-box-border">
        <h2>${e.name}</h2>
        <p class="date">${new Date(e.air_date).toDateString()}</p>

        <h3 class="sub-title">Major Characters</h3>
<div class="popup-characters-list">
          ${d.map(s=>`
              <div class="character-row">
                <img src="${s.image}" alt="${s.name}">
                <p>${s.name}</p>
              </div>
            `).join("")}
        </div>
      </div>
    `}catch{r.innerHTML="<p>Error loading episode.</p>"}}function g(){i.classList.remove("visible"),i.classList.add("hidden")}L.addEventListener("click",g);i.addEventListener("click",t=>{t.target===i&&g()});l.addEventListener("click",()=>{n++,c()});p.addEventListener("input",f(()=>{a.name=p.value.trim(),a.name||delete a.name,n=1,c()},350));m.addEventListener("change",()=>{const t=m.value;t?a.episode=t:delete a.episode,n=1,c()});c();
//# sourceMappingURL=commonHelpers2.js.map
