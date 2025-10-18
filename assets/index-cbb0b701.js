import"./vendor-6837a909.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const l=document.getElementById("searchInput"),s=document.getElementById("searchResults");l.addEventListener("input",async function(){const i=l.value.trim();if(i.length===0){s.innerHTML="";return}try{const o=await(await fetch(`https://rickandmortyapi.com/api/character/?name=${i}`)).json();o.results?s.innerHTML=o.results.map(r=>`
        <li class="list-group-item d-flex align-items-center" style="background-color:#0B2447; color:white;">
          <img src="${r.image}" alt="${r.name}" width="40" height="40" class="rounded-circle me-2">
          <div>
            <strong>${r.name}</strong><br>
            <small>Origin: ${r.origin.name}</small><br>
            <small>Location: ${r.location.name}</small>
          </div>
        </li>`).join(""):s.innerHTML='<li class="list-group-item text-center text-danger" style="background-color:#0B2447;">No results found</li>'}catch(n){console.error("Error fetching data:",n),s.innerHTML='<li class="list-group-item text-center text-danger" style="background-color:#0B2447;">Error loading</li>'}});
//# sourceMappingURL=index-cbb0b701.js.map
