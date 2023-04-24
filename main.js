const canvas=document.getElementById('canvas')
canvas.style.border='1px solid black'
const ctx=canvas.getContext('2d')


canvas.width=window.innerWidth-100
canvas.height=window.innerHeight-100

const dino={ //공룡 등장 좌표
    x:10,
    y:200,
    width:50,
    height:50,
    draw(){
        ctx.fillStyle='green'
        ctx.fillRect(this.x,this.y,this.width,this.height) //좌표설정
    }
}


class Cactus{
    constructor(){
        this.x=500
        this.y=200
        this.width=50
        this.height=50
    }
    draw(){
        ctx.fillStyle='red'
        ctx.fillRect(this.x,this.y,this.width,this.height) //좌표설정
    }
}

let timer=0
let jumpTimer=0
const cactuses=[]
let cancleAnm=null
function animate(){ //프레임마다 실행 (1초에 60번 그려줌)
    cancleAnm=requestAnimationFrame(animate)
    timer++
    ctx.clearRect(0,0,canvas.width,canvas.height)
    if(timer%120==0){ //2초에 한번 (60hz모니터인 경우)
        const cactus=new Cactus()
        cactuses.push(cactus)
        cactus.draw() 
    }   
    cactuses.forEach((value,idx,cur)=>{
        if(value.x<0){ // 화면에서 사라진 장애물 제거
            cur.splice(idx,1) 
        }
        // value.x-=3
        isCollapse(dino,value)
        value.draw()
    })
    if(jumping===true){ //스페이스바 눌렀을때 점프
        dino.y--
        jumpTimer++
    }
    else{ //점프하고 떨어지는거
        if(dino.y<200){
            dino.y++
        }
    }
    if(jumpTimer>100){
        jumping=false
        jumpTimer=0
    }
    
    dino.draw()
}

// 충돌확인
function isCollapse(dino,cactus){
    let x=cactus.x-(dino.x+dino.width)
    let y=cactus.y-(dino.y+dino.height)
    if(x<0 && y<0){ //충돌시
        ctx.clearRect(0,0,canvas.width,canvas.height)
        cancelAnimationFrame(cancleAnm)
        
    }
}




let jumping=false


document.addEventListener('keydown',(e)=>{
    console.log(jumping)
    if(e.code==='Space'){
        jumping=true
    }
})

animate()
