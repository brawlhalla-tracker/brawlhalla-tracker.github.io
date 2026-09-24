export function makesidebar(){

let div = document.createElement('div');
div.className="sidenav";

div.appendChild(home());
div.appendChild(traker("legends"));
div.appendChild(traker("colors"));
div.appendChild(traker("titles"));
div.appendChild(traker("other"));
div.appendChild(other("missions"));
div.appendChild(other("strikeout"));

//div.appendChild(other("battle pass"));
 
document.body.appendChild(div);
}

function traker(name){
    let cell = document.createElement('a');
    cell.className="sidea";
    let img = document.createElement('img');
    img.className="img3";
    img.src="/assets/icons/"+name+"_icon.png"
    cell.appendChild(img);
    let text = document.createElement('a');
    text.className="sidetext";
    text.innerText=name;
    cell.appendChild(text);
    cell.href= "/traker/"+name+"/";
    return cell;
}

function other(name){
    let cell = document.createElement('a');
    cell.className="sidea";
    let img = document.createElement('img');
    img.className="img3";
    img.src="/assets/icons/"+name+"_icon.png"
    cell.appendChild(img);
    let text = document.createElement('a');
    text.className="sidetext";
    text.innerText=name;
    cell.appendChild(text);
    cell.href= "/"+name+"/";
    return cell;
}

function home(){
    let cell = document.createElement('a');
    cell.className="cell";
    let img = document.createElement('img');
    img.className="img2";
    img.src="/assets/other/Logo_Brawlhalla.png"
    cell.appendChild(img);
    cell.href= "/";
    return cell;
}


makesidebar();