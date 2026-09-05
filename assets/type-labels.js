(()=>{
'use strict';

/* Display aliases only. Serialized JSON/GIA type identifiers must remain the
   original Miliastra identifiers (Army, ConfigReference, EntityReference,
   Dict) so exports stay compatible. */
const aliases=new Map([
  ['Army','Faction'],
  ['ArmyList','FactionList'],
  ['ConfigReference','Configuration ID'],
  ['ConfigReferenceList','Configuration ID List'],
  ['EntityReference','Prefab ID'],
  ['EntityReferenceList','Prefab ID List'],
  ['Dict','Dictionary']
]);

const tokenPattern=/\b(ConfigReferenceList|EntityReferenceList|ArmyList|ConfigReference|EntityReference|Army|Dict)\b/g;
const displayText=text=>String(text).replace(tokenPattern,token=>aliases.get(token)||token);

function relabel(root){
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){
    const parent=node.parentElement;
    if(!parent||parent.closest('script,style,textarea,input'))continue;
    const next=displayText(node.nodeValue);
    if(next!==node.nodeValue)node.nodeValue=next;
  }
  if(root.nodeType===1&&root.matches?.('option')){
    const next=displayText(root.textContent);
    if(next!==root.textContent)root.textContent=next;
  }
  root.querySelectorAll?.('option').forEach(option=>{
    const next=displayText(option.textContent);
    if(next!==option.textContent)option.textContent=next;
  });
}

relabel(document.body);
const observer=new MutationObserver(records=>{
  for(const record of records){
    if(record.type==='characterData'){
      const next=displayText(record.target.nodeValue);
      if(next!==record.target.nodeValue)record.target.nodeValue=next;
      continue;
    }
    record.addedNodes.forEach(node=>{
      if(node.nodeType===1)relabel(node);
      else if(node.nodeType===3){
        const next=displayText(node.nodeValue);
        if(next!==node.nodeValue)node.nodeValue=next;
      }
    });
  }
});
observer.observe(document.body,{subtree:true,childList:true,characterData:true});
})();
