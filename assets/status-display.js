(()=>{
'use strict';
const base='https://mypingo.github.io/Miliastra-Tools/assets/status-v2.part';
(async()=>{
  try{
    const [responses,labelRes]=await Promise.all([
      Promise.all([1,2,3,4,5,6].map(i=>fetch(`${base}${i}.txt?v=20260905a`,{cache:'no-store'}))),
      fetch('https://mypingo.github.io/Miliastra-Tools/assets/type-labels.js?v=20260905a',{cache:'no-store'})
    ]);
    if(responses.some(r=>!r.ok))throw new Error('Failed to load Status Display editor modules');
    const code=(await Promise.all(responses.map(r=>r.text()))).join('');
    new Function(code)();
    if(labelRes.ok)new Function(await labelRes.text())();
  }catch(error){
    console.error('Status Display editor failed to load',error);
  }
})();
})();
