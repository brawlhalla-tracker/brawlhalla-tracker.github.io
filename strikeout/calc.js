import {bitCount32,bitget,bitto1} from '/libs/bitlist.js';
import { maxheros } from '/libs/heros.js';
export function getconps(lists,lists2,makeframe,makeframe2){

function g(l,c){return bitget(lists[c],l);}
function g2(l,c){return bitget(lists2[c],l);}
let done1=[];
let done2=[];

//check for single and make done1
for(let n1=1;n1<=maxheros;n1++){
    for(let n4=0;n4<lists2.length&&done1[n1]!=false;n4++)
        if(!g2(0,n4)&&!g2(n1,n4)){done1[n1]=false;makeframe2(n1);}
    if(done1[n1]!=false){
	    done1[n1]=[];
	    for(let n4=0;n4<lists.length;n4++)
            if(g(0,n4)||g(n1,n4))
                done1[n1]=bitto1(done1[n1],n4);
        done1[n1]=(done1[n1][0]!=null)?done1[n1][0]:0;
        if(bitCount32(done1[n1])==lists.length){
            done1[n1]=true;
            makeframe(n1);
        } 
        else done2[n1]=[];
    }
}
//check for double and make done2
for(let n1=1;n1<=maxheros-1;n1++)
	if(typeof(done1[n1])!="boolean")
		for(let n2=(n1+1);n2<=maxheros;n2++)
			if(typeof(done1[n2])!="boolean"){
				done2[n1][n2]=(done1[n1] | done1[n2]);
                if(bitCount32(done2[n1][n2])==lists.length){
                    done2[n1][n2]=true;
                    makeframe(n1,n2);
                }
            }
//check for triple
for(let n1=1;n1<=maxheros-2;n1++)
	if(typeof(done1[n1])!="boolean")
		for(let n2=(n1+1);n2<=maxheros-1;n2++)
			if(typeof(done1[n2])!="boolean"&&
                done2[n1]!=null&&typeof(done2[n1][n2])!="boolean"&&
                done2[n2]!=null&&typeof(done2[n2][n1])!="boolean"){
				for(let n3=(n2+1);n3<=maxheros;n3++){
					if(typeof(done1[n3])!="boolean"&&
                    done2[n1]!=null&&typeof(done2[n1][n3])!="boolean"&&
                    done2[n2]!=null&&typeof(done2[n2][n3])!="boolean"&&
                    done2[n3]!=null&&typeof(done2[n3][n2])!="boolean"&&typeof(done2[n3][n1])!="boolean"){
						let out=(done2[n1][n2] | done1[n3]);
						if(bitCount32(out)==lists.length)
                            makeframe(n1,n2,n3);
					}}
			}
}