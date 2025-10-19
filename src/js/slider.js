(function(){
  const track = document.getElementById('rmTrack');
  if(!track) { console.error('rmTrack not found'); return; }

  const viewportWidth = track.parentElement.clientWidth;
  const totalWidth = Array.from(track.children).reduce((sum, el) => sum + el.clientWidth + 12, 0);

  if(totalWidth < viewportWidth*2) {
    const children = Array.from(track.children).slice(0,5);
    children.forEach(node => track.appendChild(node.cloneNode(true)));
    console.log('Дубльовано слайди для безшовності');
  }
})();
