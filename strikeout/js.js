
import {} from '/libs/sidebar.js';
import { setherocolorccc } from '/libs/colors.js';
import { getCookielist} from '/libs/cookies.js';
import { getconps } from './calc.js';
import {handleDocumentLoad,objdata,makeframe,next} from '/libs/querylib.js';


document.addEventListener ("DOMContentLoaded", ()=>handleDocumentLoad(load));

let impossibletable;
let impossibletable2;
let legendstables;

const main = document.getElementById("main");

function load(){
    if(legendstables!=null)legendstables.remove();
    if(impossibletable!=null)impossibletable.remove();
    legendstables=document.createElement('footer');
    main.appendChild(legendstables);
    let list1=[];
    let list2=[];
    for(let n=0;n<next;n++){
        const select=document.getElementById(n);
        if(select!=null){
            const selectvalue=JSON.parse(select.value);
            if(selectvalue[0]=="Colors")
                list2.push((selectvalue[1]=="Classic")?[1]:getCookielist("colors",selectvalue[1]));
            else if(selectvalue[0]=="Stances")
                list1.push((selectvalue[1]=="Base Stance")?[1]:getCookielist("stances",selectvalue[1]));
            else if(selectvalue[0]=="Can use"){
                if(selectvalue[1]=="Own")
                    list2.push(getCookielist("legendsown"));
            }else
                list1.push(objdata[selectvalue[0]][selectvalue[1]]);
        }
    }
    getconps(list1,list2,maketablew,maketablef);
}

function maketablew(n1,n2,n3){
    let tableup = document.createElement('a');
    tableup.className="requesttable";
    legendstables.appendChild(tableup);
    tableup.appendChild(makeframe(n1));
    tableup.appendChild((n2!=null)?makeframe(n2):makeanyframe());
    tableup.appendChild((n3!=null)?makeframe(n3):makeanyframe());
}

function maketablef(n1){
    if(impossibletable==null)maketable();
    impossibletable2.appendChild(makeframe(n1));
}

function maketable(){
    impossibletable = document.createElement('a');
    impossibletable2 = document.createElement('footer');
    let text = document.createElement('text');
    impossibletable.className="requesttable";
    text.className="requesttabletext";
    text.innerHTML="Forbidden Legends";
    impossibletable.appendChild(text);
    impossibletable.appendChild(impossibletable2);
    main.appendChild(impossibletable); 
}

function makeanyframe(){
    let cell = document.createElement('a');
    let img = document.createElement('div');
    let img2 = document.createElement('img');
    img.className="img4";
    img2.className="img1";
    let space = document.createElement('space');
    img2.src="/assets/faces/face_unkown.png";
    cell.className="cell";
    let name = document.createElement('text');
    name.innerHTML = "Any";
    setherocolorccc(img,cell,null,"always");
    img.appendChild(img2);
    cell.appendChild(img);
    cell.appendChild(space);
    cell.appendChild(name);
    return cell;
}