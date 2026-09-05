(()=>{
'use strict';
const base='https://mypingo.github.io/Miliastra-Tools/assets/status-v2.part';
(async()=>{
  try{
    const [responses,labelRes]=await Promise.all([
      Promise.all([1,2,3,4,5,6].map(i=>fetch(`${base}${i}.txt?v=20260905b`,{cache:'no-store'}))),
      fetch('https://mypingo.github.io/Miliastra-Tools/assets/type-labels.js?v=20260905b',{cache:'no-store'})
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
