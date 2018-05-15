function element(name,attrs,content) {
    const e = document.createElementNS("http://www.w3.org/2000/svg",name);
    if(attrs) {
        for(let [key,value] of Object.entries(attrs)) {
            e.setAttribute(key,value);
        }
    }
    if(content) {
        e.innerHTML = content;
    }
    return e;
}

const dots = document.getElementById('dots');
let maxr = 1;
let width = 1;

function dot(a,b) {
    const r = b;
    const theta = Math.PI*2*a/b;
    const cx = Math.cos(theta)*r;
    const cy = Math.sin(theta)*r;
    
    const circle = element('circle',{cx,cy, r: 0.75});
    dots.appendChild(circle);
    
    maxr = Math.max(maxr,r);
    if(maxr>width-3) {
        width = maxr*1.1 + 3;
        dots.style.transform = `scale(${1/width})`;
    }
}

function* calkin_wilf() {
    let [a,b] = [1,1];
    while(true) {
        yield [a,b];
        [a,b] = [b, a+b-2*(a%b)];
    }
} 
const fractions = calkin_wilf();

const t0 = new Date();
let n = 0;
const RATE = 2;
const EXP = 1.5;

function tick() {
    const t = new Date();
    const dt = (t-t0)/1000;
    const toadd = Math.floor(RATE*dt**EXP - n);
    for(let i=0;i<toadd;i++) {
        const [a,b] = fractions.next().value;
        if(a<b) {
            dot(a,b);
        }
    }
    n += toadd;
    requestAnimationFrame(tick);
}

setTimeout(tick,1000);


