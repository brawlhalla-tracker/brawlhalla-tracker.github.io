const divider=31;

//input list:array  pos:int (pos>=0)
export function bitto1(list,pos){
    const pos1=Math.floor(pos/divider);
    const pos2=pos%divider;
    const listl=list.length;
    for(var i=listl;i<pos1;i++)
        list.push(0);
    list[pos1] |= (1 << pos2);
    return list;
}

export function bitget(list,pos){
    const pos1=Math.floor(pos/divider);
    const pos2=pos%divider;
    const listl=list.length;
    if(listl<pos1)
        return false;
    return (list[pos1] & (1 << pos2)) > 0;
}

//input list:array  pos:int (pos>=0)
export function bitto0(list,pos){
    const pos1=Math.floor(pos/divider);
    const pos2=pos%divider;
    const listl=list.length;
    if(listl>=pos1)
        list[pos1] &= ~(1 << pos2);
    return list;
}

export function bitset(list,pos,bool){
    return (bool)?bitto1(list,pos):bitto0(list,pos);
}

export function bitflip(list,pos){
    return (bitget(list,pos))?bitto0(list,pos):bitto1(list,pos);
}

export function bitCount32(n) {
  n = n - ((n >> 1) & 0x55555555)
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
  return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
}

export function bitCountList(list) {
    let c=0;
    for(let n=0;n<list.length;n++)
        c+=bitCount32(list[n]);
    return c;
}

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}