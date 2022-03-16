

class Plot extends ELEM{
    constructor(center,range,subdivs){
        super("div");
        this.barMargin = 1;
        this.canvas = this.add("canvas",0,0,"display:block");
        let canvas = this.canvas.e;
        
        let tally = [];
        for(let i = 0; i < subdivs+2; i++){
            tally.push(0);
        }
        this.tally = tally;
        this.max = 0;
        this.center = center;
        this.range = range;
        this.ctx = canvas.getContext("2d");
        this.resize();
        let that = this;
        window.addEventListener('resize',()=>{
            that.resize();
        });
    }
    addPoint(x){
        let range = this.range;
        let center = this.center;
        let subdivs = this.tally.length-2;  
        let r = (x+range-center)/(range*2);
        let idx = Math.floor(r*subdivs)+1;
        if(idx < 0){
            idx = 0;
        }else if(idx > subdivs+1){
            idx = subdivs+1;
        }
        let cnt = ++this.tally[idx];
        if(cnt > this.max){
            this.max = cnt;
        }
    }
    render(){
        let tally = this.tally;
        let ctx = this.ctx;
        let w = this.width;
        let h = this.height;
        let barMargin = this.barMargin;
        ctx.clearRect(0,0,w,h);
        if(this.max === 0)return;
        let heightMultiplier = h/this.max;
        let barIncrement = w/tally.length;
        let barOffset = this.barMargin;
        let barWidth = barIncrement - barOffset*2;
        
        for(let i = 0; i < tally.length; i++){
            let x = i*barIncrement+barOffset;
            let y = h-tally[i]*heightMultiplier;
            let width = barWidth;
            let height = tally[i]*heightMultiplier;
            ctx.fillStyle = i === 0 || i === tally.length-1 ? "#f00" : "#000"
            ctx.fillRect(x,y,width,height);
        }
    }
    
    resize(){
        let rect = this.e.getBoundingClientRect();
        this.canvas.e.width = rect.width;
        this.canvas.e.height = rect.height;
        this.width = rect.width;
        this.height = rect.height;
        this.render();
    }
};


class DotField extends ELEM{
    constructor(w,h){
        
    }
}


let plot
let main = async function(){
    let body = new ELEM(document.body);
    let dotField = body.add(new DotField());
    plot = body.add(new Plot(0.5,0.48,100));
    plot.style("height:50vh;");
    plot.resize();
    for(let i = 0; i < 10000; i++){
        //add a point
        await Pause(16);
        for(let j = 0; j < 10; j++){
            plot.addPoint(Math.random());
        }
        plot.render();
    }
};

main();



/*
let main = async function(){
    let body = new ELEM(document.body);
    let canvas = body.add("cnavas");
    let da = body.add("div",0,0,`font-size:2em;position:absolute;top:0px;left:0px;`);
    body.add("");
    canvas.e.width = window.innerWidth;
    canvas.e.width = window.innerHeight;
    let pi = 0;
    
    for(let i = 0; i < 10000; i++){
        //add a point
        await Pause(100);
        
    }
};

*/












