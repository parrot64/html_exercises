let canvas = null;
let ctx = null;
let num = 0;
const BACKROUND = "#FFFFFF"
const FOREGROUND = "#000000";
const WIDTH = 1920;
const HIEGHT = 1080;
const S = 10;
const fps = 120;
const dt = 1/fps;
let dz = 15;
let angle = 0;

function Buttonclick()
{
    num++;
    console.log("hello");
    // document find element by name
    const numLabel = document.getElementsByName("numLabel")[0];
    numLabel.textContent = num;
}

function clear()
{
    ctx.fillStyle = BACKROUND;
    ctx.fillRect(0,0,WIDTH,HIEGHT);
}

function point(apoint2D)
{
    ctx.fillStyle = FOREGROUND;
    ctx.fillRect(apoint2D.x-S/2,apoint2D.y-S/2,S,S);
}

function line(aPoint2D1,aPoint2D2)
{
    ctx.lineWidth = 3
    ctx.beginPath();

    ctx.moveTo(aPoint2D1.x,aPoint2D1.y);
    ctx.lineTo(aPoint2D2.x,aPoint2D2.y);
    ctx.stroke();
}

/*
aModel: {fs: .., vs:...}
aTranslation: {dx, dy, dz}
*/
function animatemodel(aModel,aTranslation3D,anAngle)
{
    for (let fIndex = 0; fIndex<aModel.fs.length; fIndex++)
    {
        const f = aModel.fs[fIndex];
        for (let i = 0; i<f.length; i++)
        {
            let a = new Point(aModel.vs[f[i]]);
            let b = new Point(aModel.vs[f[(i+1)%f.length]]);

            aModel.transformPoint(a,anAngle,aTranslation3D);
            aModel.transformPoint(b,anAngle,aTranslation3D);

            line(a,b);
        }
    }
}

function animate()
{
    // dz = dz+dt;
    angle = angle + Math.PI * dt;
    clear();

    animatemodel(KnightHelm, {x: 10,y: 0,z: 0,},angle);
    animatemodel(DoubleAxe, {x: -10,y: 0,z: 0,},angle);
    animatemodel(BigSword, {x: 0,y: 3,z: 0,},angle);

    setTimeout(animate,1000/fps);
}

function onload()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    KnightHelm.transformPoint =
        (aPoint3d,anAngle,aTranslation3D) =>
        {
            aPoint3d
                .rotatexz(anAngle)
                .translate3D({x: -1,y: -2,z: dz,})
                .translate3D(aTranslation3D)
                .project3dto2d()
                .converttocanvas(WIDTH,HIEGHT);
        };

    DoubleAxe.transformPoint =
            (aPoint3d,anAngle,aTranslation3D) =>
            {
                aPoint3d
                    .rotateyz(0.5*Math.PI)
                    .scale({x: 0.5,y: 0.5,z: 0.5,})
                    .rotatexz(-2*anAngle)
                    .translate3D({x: -1,y: -2,z: dz,})
                    .translate3D(aTranslation3D)
                    .project3dto2d()
                    .converttocanvas(WIDTH,HIEGHT);
            };

    BigSword.transformPoint =
            (aPoint3d,anAngle,aTranslation3D) =>
            {
                aPoint3d
                    .rotateyz(Math.PI)
                    .scale({x: 0.8,y: 1,z: 0.8,})
                    .rotatexz(-anAngle)
                    .translate3D({x: -1,y: -2,z: dz,})
                    .translate3D(aTranslation3D)
                    .project3dto2d()
                    .converttocanvas(WIDTH,HIEGHT);
            };

    setTimeout(animate,1000/fps);
}

window.addEventListener("load",onload);
