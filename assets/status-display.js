(()=>{
'use strict';
const assetRoot=new URL('./assets/',window.parent.location.href);
const base=new URL('status-v2.part',assetRoot).href;

/* Production branding and a clearly visible density toggle. */
document.title='Miliastra UI Tools · Data Editor';
try{window.parent.document.title='Miliastra UI Tools · Data Editor'}catch{}
const brand=document.querySelector('.brand');
if(brand)brand.textContent='Miliastra UI Tools';
const density=document.querySelector('.density-button');
if(density){
  const refreshDensityLabel=()=>{
    const compact=document.body.classList.contains('compact-mode');
    density.textContent=`Density: ${compact?'Compact':'Comfortable'}`;
    density.title=`Switch to ${compact?'comfortable':'compact'} density`;
    density.setAttribute('aria-pressed',String(compact));
  };
  density.addEventListener('click',()=>requestAnimationFrame(refreshDensityLabel));
  refreshDensityLabel();
}
const densityStyle=document.createElement('style');
densityStyle.textContent=`
body.compact-mode .topbar{min-height:50px;padding-top:5px;padding-bottom:5px}
body.compact-mode .toolbar{min-height:38px}
body.compact-mode #giaToolbar{padding-top:4px;padding-bottom:4px}
body.compact-mode td{padding-top:3px;padding-bottom:3px}
body.compact-mode .inspector{padding:9px 13px 18px}
body.compact-mode .inspector h2{margin-bottom:7px;padding-bottom:7px}
body.compact-mode .field{margin-bottom:5px}
body.compact-mode input,body.compact-mode textarea,body.compact-mode select{padding:4px 6px}
body.compact-mode .quick-dock{margin:-9px -13px 9px;padding:5px 8px}
body.compact-mode .quick-dock-hints{display:none}
body.compact-mode .build-view{padding-top:20px}
body.compact-mode .build-section{margin:15px 0}
body.compact-mode .build-grid{gap:9px}
body.compact-mode .build-card{min-height:124px;padding-top:13px;padding-bottom:51px}
body.compact-mode .build-card h3{font-size:15px}
.density-button{min-width:128px}
`;
document.head.append(densityStyle);

(async()=>{
  try{
    const [responses,labelRes]=await Promise.all([
      Promise.all([1,2,3,4,5,6].map(i=>fetch(`${base}${i}.txt?v=20260905d`,{cache:'no-store'}))),
      fetch(new URL('type-labels.js?v=20260905d',assetRoot),{cache:'no-store'})
    ]);
    if(responses.some(r=>!r.ok))throw new Error('Failed to load Status Display editor modules');
    let code=(await Promise.all(responses.map(r=>r.text()))).join('');

    /* Miliastra does not restore Link Unit Status references when a Status
       Display Area GIA is imported, even when the GIA was exported by
       Miliastra itself. Do not expose a control that appears functional.
       Existing serialized references are still parsed/preserved untouched. */
    code=code
      .replace('  <button data-add>+ Unit Status</button>\n','')
      .replace(
        '<div class="sd-subtitle">Link Unit Status</div>\n<div class="sd-refs"></div>',
        '<div class="sd-note">Unit Status links must be configured manually in Miliastra after import.</div>\n<div class="sd-refs" style="display:none"></div>'
      )
      .replace("card.querySelector('[data-add]').addEventListener('click',()=>{","card.querySelector('[data-add]')?.addEventListener('click',()=>{");

    new Function(code)();
    if(labelRes.ok)new Function(await labelRes.text())();
  }catch(error){
    console.error('Status Display editor failed to load',error);
  }
})();
})();
