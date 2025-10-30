import"./vendor-6837a909.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const v="https://rickandmortyapi.com/api/";async function U(e=1,t={}){const{name:n="",status:a="",species:r="",type:o="",gender:l=""}=t;let d=`${v}character/?page=${e}`;n&&(d+=`&name=${encodeURIComponent(n)}`),a&&(d+=`&status=${encodeURIComponent(a)}`),r&&(d+=`&species=${encodeURIComponent(r)}`),o&&(d+=`&type=${encodeURIComponent(o)}`),l&&(d+=`&gender=${encodeURIComponent(l)}`);const p=await fetch(d);if(!p.ok)throw new Error("Failed to fetch characters");return await p.json()}async function x(e=1,t={}){const{name:n="",episode:a=""}=t;let r=`${v}episode/?page=${e}`;n&&(r+=`&name=${encodeURIComponent(n)}`),a&&(r+=`&episode=${encodeURIComponent(a)}`);try{const o=await fetch(r);if(o.status===404)return{info:{count:0,pages:0},results:[]};if(!o.ok)throw new Error("Failed to fetch episodes");return await o.json()}catch(o){return console.error("Error fetching episodes:",o),{info:{count:0,pages:0},results:[]}}}async function A(e){const t=await fetch(`${v}character/${e}`);if(!t.ok)throw new Error("Failed to fetch character");return await t.json()}async function N(e){const t=await fetch(`${v}episode/${e}`);if(!t.ok)throw new Error("Failed to fetch episode");return await t.json()}const k=document.getElementById("searchInput"),L=document.getElementById("searchResults");k.addEventListener("input",async function(){const e=k.value.trim();if(e.length===0){L.innerHTML="";return}try{const t=await U(1,{name:e});t.results&&t.results.length>0?L.innerHTML=t.results.map(n=>`
        <li class="list-group-item d-flex align-items-center" style="background-color:#0B2447; color:white;">
          <img src="${n.image}" alt="${n.name}" width="40" height="40" class="rounded-circle me-2">
          <div>
            <strong>${n.name}</strong><br>
            <small>Origin: ${n.origin.name}</small><br>
            <small>Location: ${n.location.name}</small>
          </div>
        </li>`).join(""):L.innerHTML=`
        <li class="list-group-item text-center text-danger" style="background-color:#0B2447;">
          No results found
        </li>`}catch(t){console.error("Error fetching data:",t),L.innerHTML=`
      <li class="list-group-item text-center text-danger" style="background-color:#0B2447;">
        Error loading
      </li>`}});(function(){const e=document.getElementById("rmTrack");if(!e){console.error("rmTrack not found");return}const t=e.parentElement.clientWidth;Array.from(e.children).reduce((a,r)=>a+r.clientWidth+12,0)<t*2&&(Array.from(e.children).slice(0,5).forEach(r=>e.appendChild(r.cloneNode(!0))),console.log("Дубльовано слайди для безшовності"))})();const P=["Animated","the adventures","Justin Roiland","superpower","creative","amazing","Sitcom","comics","follows","characters","whoa","Rick and Morty"],O=document.getElementById("divider");P.forEach((e,t)=>{const n=document.createElement("span");n.textContent=e,n.className=`chip ${t%2===0?"light":"dark"}`;const r=(Math.random()>.6?180:0)+(Math.random()*30-15);n.style.setProperty("--angle",`${r}deg`),n.style.animationDelay=`${Math.random()*2}s`,O.appendChild(n)});const w=document.getElementById("character-img"),S=document.querySelectorAll(".character-info h3");S.forEach(e=>{e.addEventListener("click",()=>{S.forEach(n=>n.classList.remove("active")),e.classList.add("active");const t=e.getAttribute("data-img");w.style.opacity=0,setTimeout(()=>{w.src=t,w.style.opacity=1},300)})});const T=document.getElementById("character-list"),H=document.querySelector(".load-more");(!T||!H)&&console.error("Не знайдено необхідні елементи для роботи скрипта");let B=1,C=!1;function R(e){C=!0,fetch(`https://rickandmortyapi.com/api/character?page=${e}`).then(t=>t.json()).then(t=>{const n=t.results;T.innerHTML+=n.map(a=>`
        <li>
          <img class="character__img-list" src="${a.image}" alt="${a.name}">
          <h2 class="character__name">${a.name}</h2>
          <h3 class="character__info character__origin">
            <span class="character__span">Origin:</span> ${a.origin.name}
          </h3>
          <h3 id="location" class="character__info character__location">
            <span class="character__span">Location:</span> ${a.location.name}
          </h3>
        </li>
      `).join(""),t.info.next||(H.style.display="none")}).catch(t=>{console.error("Помилка завантаження персонажів:",t),T.innerHTML+="<li>Не вдалося завантажити дані.</li>"}).finally(()=>{C=!1})}R(B);H.addEventListener("click",()=>{C||(B++,R(B))});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".character-input"),t=document.querySelectorAll(".character select"),n=document.querySelector(".character-list"),a=document.querySelector(".load-more"),r=n.innerHTML;function o(s,i){return!i||(i=i.trim().toLowerCase(),s==="gender"&&i==="all")?"":i}function l(){if(e.value.trim()!=="")return!1;for(const s of t)if(o(s.previousElementSibling.textContent.toLowerCase(),s.value)!=="")return!1;return!0}function d(){const s="https://rickandmortyapi.com/api/character/",i=new URLSearchParams,c=e.value.trim();return c&&i.append("name",c),t.forEach(h=>{const _=h.previousElementSibling.textContent.toLowerCase(),b=o(_,h.value);b&&i.append(_,b)}),s+(i.toString()?`?${i.toString()}`:"")}async function p(){if(l()){n.innerHTML=r;return}n.innerHTML="<li>Loading...</li>";try{const s=await fetch(d());if(!s.ok)throw new Error("No characters found");const i=await s.json();if(!i.results||i.results.length===0){n.innerHTML="<li>No characters found.</li>";return}n.innerHTML="",i.results.forEach(c=>{const h=document.createElement("li");h.className="character__item",h.innerHTML=`
          <img src="${c.image}" alt="${c.name}" width="50" height="50" 
               style="vertical-align: middle; border-radius: 50%; margin-right: 10px;">
          <strong>${c.name}</strong> — ${c.status}, ${c.species}, ${c.gender}
        `,n.appendChild(h)})}catch(s){n.innerHTML=`<li>${s.message}</li>`}}e.addEventListener("input",p),t.forEach(s=>s.addEventListener("change",p)),a.addEventListener("click",s=>{s.preventDefault(),p()})});const m=document.getElementById("episodes"),y=document.getElementById("loadMore"),q=document.getElementById("name"),D=document.getElementById("season"),E=document.getElementById("modal"),M=document.getElementById("modalBody"),W=document.getElementById("closeModal"),I=document.getElementById("noResults");let u=1,f=1,g={};function F(e,t=300){let n;return(...a)=>{clearTimeout(n),n=setTimeout(()=>e.apply(this,a),t)}}function z(e){const t=document.createElement("div");t.className="episode-card",t.innerHTML=`
    <div class="episode-bg">
      <div class="overlay"></div>
      <div class="episode-info">
        <h3>${e.name}</h3>
        <p>${new Date(e.air_date).toDateString()}</p>
      </div>
    </div>
  `,t.addEventListener("click",()=>J(e.id)),m.appendChild(t)}async function $(){y.style.display="none";try{const e=await x(u,g);if(u===1&&(m.innerHTML=""),!e||!e.results||e.results.length===0){I.classList.remove("hidden"),m.classList.add("hidden"),y.style.display="none",f=1;return}I.classList.add("hidden"),m.classList.remove("hidden"),e.info&&e.info.pages?f=e.info.pages:e.info&&e.info.count?f=Math.ceil(e.info.count/20)||1:f=1,e.results.forEach(z),y.style.display=u>=f?"none":"block"}catch(e){console.error("Error loading episodes:",e),I.classList.remove("hidden"),m.classList.add("hidden"),y.style.display="none"}}async function J(e){E.classList.add("show"),M.innerHTML='<p class="loading">Loading...</p>';try{const t=await N(e),n=t.characters.slice(0,4),a=await Promise.all(n.map(async r=>{const o=r.split("/").pop();return await A(o)}));M.innerHTML=`
      <div class="modal-inner-border">
        <h2>${t.name}</h2>
        <p class="date">${new Date(t.air_date).toDateString()}</p>
        <h3 class="sub-title">Major Characters</h3>
        <div class="characters">
          ${a.map(r=>`
            <div class="character-row">
              <img src="${r.image}" alt="${r.name}">
              <p>${r.name}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `}catch(t){console.error("Error opening modal:",t),M.innerHTML="<p>Error loading episode details.</p>"}}function j(){E.classList.remove("show")}y.addEventListener("click",()=>{u<f&&(u++,$())});const K=F(()=>{u=1,$()},350);q.addEventListener("input",e=>{g.name=e.target.value.trim(),g.name||delete g.name,m.innerHTML="",K()});D.addEventListener("change",e=>{const t=e.target.value;t?g.episode=t:delete g.episode,u=1,m.innerHTML="",$()});W.addEventListener("click",j);E.addEventListener("click",e=>{e.target===E&&j()});$();
//# sourceMappingURL=index-78774bd5.js.map
