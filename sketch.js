let BPMSlider;
let time=0;
let norts_size=20;
let G;
let Tflag=false;
let speed=2;
let sSlider;
let keys=[false,false,false,false];
function setup() {
  myFont = loadFont('nicokaku_v1.ttf');
  textFont(myFont);
  textSize(35);
  fill(255)
  createCanvas(windowHeight/sqrt(2),windowHeight);
  frameRate(60);
  BPMSlider = createSlider(60, 300, 120);
  BPMSlider.position(0, 10);
  sSlider = createSlider(1, 20, 5,0.1);
  sSlider.position(0, 40);
  G = new game();
  //console.log(BPMSlider.elt.value=1)
  //ceil(random(4))-1
}

function draw() {
  for(let x of touches){
      keys[ceil(x.x/(width/4))-1]=true
  }
  background(0,90);
  
  for(let i=0;i<5;i++){
    push()
    stroke(255)
    strokeWeight(2)
    line(width/4*i,0,width/4*i,height)
    pop()
  }
  
  push()
  push()
  push()
    colorMode(HSB)
    textSize(50);
    fill((BPMSlider.value()+60), 60, 100);
    text('BPM '+BPMSlider.value(),width-260, 40);
    fill((sSlider.value()*5+60), 60, 100);
    textSize(34);
    text('Speed'+sSlider.value(),width-240, 70);
  pop()
  pop()
  pop()
  speed=sSlider.value();
  G.update();
}

class game{
  constructor(){
    this.flame=-2
    this.norts=[0,1,2,3,2,1,0,1,2,3,2,1,0,1,2,3,2,1,0,1,2,3,2,1,0]
    this.combo=0;
  }
  drawnorts(){
    //print(this.norts.length)
    push()
    colorMode(RGB)
    fill(255)
    for(let i=0;i<this.norts.length;i++){
      fill(255)
      if(i==0){
         fill(255,0,0)
         stroke(255)
         line(0,height + this.flame*100*speed - ((i*100)*speed/(BPMSlider.value()/60)),width,height + this.flame*100*speed - ((i*100)*speed/(BPMSlider.value()/60)))
        stroke(0)
      }
      rect((width/4)*this.norts[i],
           height + this.flame*100*speed - ((i*100)*speed/(BPMSlider.value()/30)),
           (width/4),
           norts_size
          )
    }
    pop()
  }
  keycheck(){
    for(let i=0;i<4;i++){
      if(keys[i]&&this.norts[0]==i){
         this.norts.shift()
         this.flame+=-1/(BPMSlider.value()/30)
         this.addnort()
         this.combo++
      }else if(keys[i]){
        push()
        push()
         fill(10,50,0)
         //rect((width/4)*i,0,(width/4),height)
         fill(0,0,0)
        pop()
        pop()
      }
    }
    keys=[false,false,false,false];
  }
  update(){
    this.keycheck();
    this.drawnorts();
    this.drawcombo();
    this.flame+=(deltaTime/1000);
    //text(this.flame,width-240, 100);
    //text(this.flame-1/BPMSlider.value()/60,width-240, 300);
    if(this.flame-1/(BPMSlider.value()/30)>-0.1){
       this.combo=0
       this.flame+=-1/(BPMSlider.value()/30)
       this.addnort()
       this.norts.shift()
       BPMSlider.elt.value-=1
       fill(50,50,50)
       rect((width/4)*this.norts[0],0,(width/4),height)
    }
  }
  drawcombo(){
    push()
    fill(sin(this.combo/100)*55+200,cos(this.combo/100)*55+200,sin(this.combo/100+PI/3)*55+200)
    
    if(this.combo){
    text(this.combo,0, 90);
    pop()
    }
  }
  addnort(){
    let x= (this.norts[this.norts.length-1]+ceil(random(3))+4000)%4
    append(this.norts,x)
  }
}

function keyPressed() {
  if(key=='d'){
     keys[0]=true
  }else if(key=='f'){
     keys[1]=true
  }else if(key=='j'){
     keys[2]=true
  }else if(key=='k'){
     keys[3]=true
  }else if(key=='n'){
     BPMSlider.elt.value+=1
  }else if(key=='v'){
     BPMSlider.elt.value-=10
  }
  
}

function mouseClicked() {
  keys[ceil(mouseX/(width/4))-1]=true
}