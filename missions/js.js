
import {} from '/libs/sidebar.js';
import {bitget} from '/libs/bitlist.js';
import { maxheros } from '/libs/heros.js';
import { getCookielist } from '/libs/cookies.js';
import {handleDocumentLoad,objdata,makeframe,next,quant} from '/libs/querylib.js';

document.addEventListener ("DOMContentLoaded", ()=>handleDocumentLoad(load));

let lastseach=null;
let frames = makeframes();
let tables = [];
let tablesp = [];
let tablest = [];
const legendstables = document.getElementById("legends");

function load(){
    if(lastseach===null)lastseach=quant;
    let list=Array(maxheros+1).fill(0);
    let hier=0;
    for(let n=0;n<next;n++){
        const select=document.getElementById(n);
        if(select!=null){
            const selectvalue=JSON.parse(select.value);
            let sellist=null;
            if(selectvalue[0]=="Colors")
                sellist=(selectvalue[1]=="Classic")?[1]:getCookielist("colors",selectvalue[1]);
            else if(selectvalue[0]=="Stances")
                sellist=(selectvalue[1]=="Base Stance")?[1]:getCookielist("stances",selectvalue[1]);
            else if(selectvalue[0]=="Can use"){
                if(selectvalue[1]=="Own")
                    sellist=getCookielist("legendsown");
            }else
                sellist=objdata[selectvalue[0]][selectvalue[1]];
            if(sellist==null)
                sellist=[];
            if(bitget(sellist,0)){
                for(let n2=0;n2<list.length;n2++)
                    list[n2]++;
                hier++;
            }else
                for(let n2=0;n2<list.length;n2++)
                    if(bitget(sellist,n2)){
                        list[n2]++;
                        if(hier<list[n2])
                            hier=list[n2];
                    }
        }
    }
    for(let n=tables.length;n<=quant+1;n++) maketable(n);
    for(let n=1;n<list.length;n++) tables[(quant-list[n])].appendChild(frames[n]);
    for(let n=0;n<tables.length;n++){
        if(tablesp[n].isConnected) tablesp[n].remove();
        if(tables[n].childElementCount>0){
            legendstables.appendChild(tablesp[n]);
            tablest[n].innerHTML=(n==0)?("All attributes."):((n==quant)?("No matching attributes."):((n==1)?"1 missing attribute.":(n+" missing attributes.")));
        }}
}

function maketable(i){
    let tableup = document.createElement('a');
    let table = document.createElement('footer');
    let text = document.createElement('text');
    tableup.className="requesttable";
    text.className="requesttabletext";
    tableup.appendChild(text);
    tableup.appendChild(table);
    tables[i]=table;
    tablesp[i]=tableup;
    tablest[i]=text;
}

function makeframes(){
    let frames=[null];
    for(let n=1;n<=maxheros;n++) frames.push(makeframe(n));
    return frames;
}