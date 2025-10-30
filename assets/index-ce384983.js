import"./vendor-6837a909.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const v="https://rickandmortyapi.com/api/";async function H(e=1,t={}){const{name:n="",status:r="",species:s="",type:o="",gender:a=""}=t;let i=`${v}character/?page=${e}`;n&&(i+=`&name=${encodeURIComponent(n)}`),r&&(i+=`&status=${encodeURIComponent(r)}`),s&&(i+=`&species=${encodeURIComponent(s)}`),o&&(i+=`&type=${encodeURIComponent(o)}`),a&&(i+=`&gender=${encodeURIComponent(a)}`);const C=await fetch(i);if(!C.ok)throw new Error("Failed to fetch characters");return await C.json()}async function N(e=1,t={}){const{name:n="",episode:r=""}=t;let s=`${v}episode/?page=${e}`;n&&(s+=`&name=${encodeURIComponent(n)}`),r&&(s+=`&episode=${encodeURIComponent(r)}`);try{const o=await fetch(s);if(o.status===404)return{info:{count:0,pages:0},results:[]};if(!o.ok)throw new Error("Failed to fetch episodes");return await o.json()}catch(o){return console.error("Error fetching episodes:",o),{info:{count:0,pages:0},results:[]}}}async function j(e){const t=await fetch(`${v}character/${e}`);if(!t.ok)throw new Error("Failed to fetch character");return await t.json()}async function A(e){const t=await fetch(`${v}episode/${e}`);if(!t.ok)throw new Error("Failed to fetch episode");return await t.json()}const h=document.getElementById("character-list"),l=document.querySelector(".load-more"),R=document.querySelector(".character-input"),P=document.querySelectorAll(".character select");let m=1,L=!1,g={};function O(e,t=!1){if(t&&(h.innerHTML=""),!e||e.length===0){h.innerHTML="<li>No characters found.</li>",l.style.display="none";return}const n=e.map(r=>`
    <li>
      <img class="character__img-list" src="${r.image}" alt="${r.name}">
      <h2 class="character__name">${r.name}</h2>
      <h3 class="character__info character__origin">
        <span class="character__span">Origin:</span> ${r.origin.name}
      </h3>
      <h3 class="character__info character__location">
        <span class="character__span">Location:</span> ${r.location.name}
      </h3>
    </li>
  `).join("");h.innerHTML+=n}async function I(e=1,t={},n=!1){var r;if(!L){L=!0,l.disabled=!0;try{const s=await H(e,t);O(s.results,n),l.style.display=(r=s.info)!=null&&r.next?"block":"none"}catch(s){console.error("Error loading characters:",s),h.innerHTML="<li>No characters found.</li>",l.style.display="none"}finally{L=!1,l.disabled=!1}}}function U(){const e={name:R.value.trim(),status:"",species:"",type:"",gender:""};return P.forEach(t=>{const n=t.previousElementSibling.textContent.toLowerCase().trim(),r=t.value.trim();n.includes("status")&&(e.status=r),n.includes("species")&&(e.species=r),n.includes("type")&&(e.type=r),n.includes("gender")&&(e.gender=r)}),e}function S(){m=1,g=U(),console.log("Фільтри:",g),I(m,g,!0)}I(m);l.addEventListener("click",()=>{m++,I(m,g)});R.addEventListener("input",S);P.forEach(e=>e.addEventListener("change",S));const M=document.getElementById("searchInput"),f=document.getElementById("searchResults");M.addEventListener("input",async function(){const e=M.value.trim();if(e.length===0){f.innerHTML="";return}try{const t=await H(1,{name:e});t.results&&t.results.length>0?f.innerHTML=t.results.map(n=>`
        <li class="list-group-item d-flex align-items-center" style="background-color:#0B2447; color:white;">
          <img src="${n.image}" alt="${n.name}" width="40" height="40" class="rounded-circle me-2">
          <div>
            <strong>${n.name}</strong><br>
            <small>Origin: ${n.origin.name}</small><br>
            <small>Location: ${n.location.name}</small>
          </div>
        </li>`).join(""):f.innerHTML=`
        <li class="list-group-item text-center text-danger" style="background-color:#0B2447;">
          No results found
        </li>`}catch(t){console.error("Error fetching data:",t),f.innerHTML=`
      <li class="list-group-item text-center text-danger" style="background-color:#0B2447;">
        Error loading
      </li>`}});window.addEventListener("scroll",()=>{const e=document.querySelector(".header1");window.scrollY>50?e.classList.add("scrolled"):e.classList.remove("scrolled")});(function(){const e=document.getElementById("rmTrack");if(!e){console.error("rmTrack not found");return}const t=e.parentElement.clientWidth;Array.from(e.children).reduce((r,s)=>r+s.clientWidth+12,0)<t*2&&(Array.from(e.children).slice(0,5).forEach(s=>e.appendChild(s.cloneNode(!0))),console.log("Дубльовано слайди для безшовності"))})();const y=document.getElementById("episodes"),$=document.getElementById("loadMore"),b=document.getElementById("name"),B=document.getElementById("season"),p=document.getElementById("popup"),w=document.getElementById("popupContent"),q=document.getElementById("closePopup"),T=document.getElementById("noResults");let d=1,_=1,u={};function F(e,t=300){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}function W(e){const t=document.createElement("div");t.className="episode-card",t.innerHTML=`
    <div class="episode-bg">
      <div class="overlay"></div>
      <div class="episode-info">
        <h3>${e.name}</h3>
        <p>${new Date(e.air_date).toDateString()}</p>
      </div>
    </div>
  `,t.addEventListener("click",()=>D(e.id)),y.appendChild(t)}async function E(){var e;$.style.display="none";try{const t=await N(d,u);if(d===1&&(y.innerHTML=""),!t||!((e=t.results)!=null&&e.length)){T.classList.remove("hidden"),y.classList.add("hidden");return}T.classList.add("hidden"),y.classList.remove("hidden"),_=t.info.pages,t.results.forEach(W),d<_&&($.style.display="block")}catch(t){console.error("Error loading episodes:",t)}}async function D(e){p.classList.remove("hidden"),p.classList.add("visible"),w.innerHTML="<p>Loading...</p>";try{const t=await A(e),n=await Promise.all(t.characters.slice(0,4).map(async r=>await j(r.split("/").pop())));w.innerHTML=`
      <div class="popup-box-border">
        <h2>${t.name}</h2>
        <p class="date">${new Date(t.air_date).toDateString()}</p>

        <h3 class="sub-title">Major Characters</h3>
<div class="popup-characters-list">
          ${n.map(r=>`
              <div class="character-row">
                <img src="${r.image}" alt="${r.name}">
                <p>${r.name}</p>
              </div>
            `).join("")}
        </div>
      </div>
    `}catch{w.innerHTML="<p>Error loading episode.</p>"}}function x(){p.classList.remove("visible"),p.classList.add("hidden")}q.addEventListener("click",x);p.addEventListener("click",e=>{e.target===p&&x()});$.addEventListener("click",()=>{d++,E()});b.addEventListener("input",F(()=>{u.name=b.value.trim(),u.name||delete u.name,d=1,E()},350));B.addEventListener("change",()=>{const e=B.value;e?u.episode=e:delete u.episode,d=1,E()});E();const Y=["Animated","the adventures","Justin Roiland","superpower","creative","amazing","Sitcom","comics","follows","characters","whoa","Rick and Morty"],z=document.getElementById("divider");Y.forEach((e,t)=>{const n=document.createElement("span");n.textContent=e,n.className=`chip ${t%2===0?"light":"dark"}`;const s=(Math.random()>.6?180:0)+(Math.random()*30-15);n.style.setProperty("--angle",`${s}deg`),n.style.animationDelay=`${Math.random()*2}s`,z.appendChild(n)});const c=document.getElementById("character-img"),k=document.querySelectorAll(".character-info h3");c.src="";k.forEach(e=>{e.addEventListener("click",()=>{k.forEach(n=>n.classList.remove("active")),e.classList.add("active");const t=e.getAttribute("data-img");c.classList.remove("active"),c.style.opacity=0,c.style.transform="translateY(40px)",setTimeout(()=>{c.src=t,c.classList.add("active")},200)})});
//# sourceMappingURL=index-ce384983.js.map
