window.__M=null;
window.__sleep=ms=>new Promise(r=>setTimeout(r,ms));
window.__stage1=async(slug)=>{ // inyecta el mp4
  const M=await (await fetch('https://raw.githubusercontent.com/Islita00/hipoteticamente-media/main/religioso/subida.json?'+Date.now())).json();window.__M=M;
  const b=await (await fetch(`https://raw.githubusercontent.com/Islita00/hipoteticamente-media/main/religioso/${slug}.mp4?`+Date.now())).blob();
  document.querySelector('ytcp-uploads-file-picker').onFilesSelected([new File([b],slug+'.mp4',{type:'video/mp4'})]);return b.size;};
window.__stage2=async(slug)=>{ // título, descripción, miniatura, radios, etiquetas (input visible)
  const m=window.__M[slug],S=window.__sleep;
  const tb=[...document.querySelectorAll('#textbox')];
  const setT=(el,t)=>{el.focus();const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);document.execCommand('insertText',false,t);};
  setT(tb[0],m.title);await S(400);setT(tb[1],m.desc);await S(400);
  const b=await (await fetch(`https://raw.githubusercontent.com/Islita00/hipoteticamente-media/main/religioso/min/${slug}.jpg?`+Date.now())).blob();
  const inp=document.querySelector('input#file-loader');const dt=new DataTransfer();dt.items.add(new File([b],'min.jpg',{type:'image/jpeg'}));inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));await S(3000);
  const q=n=>document.querySelector(`tp-yt-paper-radio-button[name="${n}"]`);
  q('VIDEO_MADE_FOR_KIDS_NOT_MFK')?.click();
  [...document.querySelectorAll('ytcp-button,button')].find(x=>/Mostrar más/i.test(x.innerText))?.click();await S(1500);
  q('VIDEO_PAID_PRODUCT_PLACEMENT_NO')?.click();q(m.altered?'VIDEO_HAS_ALTERED_CONTENT_YES':'VIDEO_HAS_ALTERED_CONTENT_NO')?.click();await S(500);
  const ti=document.querySelector('#tags-container input');ti.scrollIntoView({block:'center'});const r=ti.getBoundingClientRect();
  return JSON.stringify({x:Math.round(r.x+60),y:Math.round(r.y+8),title:tb[0].innerText===m.title,desc:tb[1].innerText.trim()===m.desc.trim(),alt:q('VIDEO_HAS_ALTERED_CONTENT_YES')?.getAttribute('aria-checked')+'/'+q('VIDEO_HAS_ALTERED_CONTENT_NO')?.getAttribute('aria-checked'),tags:m.tags+','});};
window.__stage3=async()=>{const S=window.__sleep;for(let i=0;i<3;i++){document.querySelector('#next-button').click();await S(1800);}
  document.querySelector('#second-container-expand-button')?.click();await S(2500);return 'vis';};
window.__done=async()=>{const S=window.__sleep;document.querySelector('#done-button').click();await S(9000);
  [...document.querySelectorAll('ytcp-button,button')].find(b=>/Entendido/i.test(b.innerText))?.click();await S(1500);
  return document.body.innerText.match(/pasará a ser público[^\n]*/)?.[0]||'NO CONFIRMA';};
