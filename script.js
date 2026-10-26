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
let dz = 20;
let angle = 0;

const vertixes =
    [
        {x: -1,y: 1,z: 1,}, //0
        {x: 1,y: 1,z: 1,},//1
        {x: 1,y: -1,z: 1,},//2
        {x: -1,y: -1,z: 1,},

        {x: -1,y: 1,z: -1,},
        {x: 1,y: 1,z: -1,},
        {x: 1,y: -1,z: -1,},
        {x: -1,y: -1,z: -1,},
    ];

const faces =
    [
        [0,1,2,3,],
        [4,5,6,7,],
        [0,4,7,3,],
        [1,5,6,2,],
    ];

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

function rotatexz(aPoint3D,angle)
{
    const C = Math.cos(angle);
    const S = Math.sin(angle);

    const point3D =
    {
        x: aPoint3D.x*C-aPoint3D.z*S,
        y: aPoint3D.y,
        z: aPoint3D.x*S+aPoint3D.z*C,

    };

    return point3D;
}

function rotateyz(aPoint3D,angle)
{
    const C = Math.cos(angle);
    const S = Math.sin(angle);

    const point3D =
    {
        x: aPoint3D.x,
        y: aPoint3D.y*C-aPoint3D.z*S,
        z: aPoint3D.y*S+aPoint3D.z*C,

    };

    return point3D;
}

function rotatexy(aPoint3D,angle)
{
    const C = Math.cos(angle);
    const S = Math.sin(angle);

    const point3D =
    {
        x: aPoint3D.x*C-aPoint3D.y*S,
        y: aPoint3D.x*S+aPoint3D.y*C,
        z: aPoint3D.z,

    };

    return point3D;
}

function line(aPoint2D1,aPoint2D2)
{
    ctx.lineWidth = 3
    ctx.beginPath();

    ctx.moveTo(aPoint2D1.x,aPoint2D1.y);
    ctx.lineTo(aPoint2D2.x,aPoint2D2.y);
    ctx.stroke();
}

function project3dto2d(aPoint3D)
{
    const point2D = {
        x: aPoint3D.x/aPoint3D.z,
        y: aPoint3D.y/aPoint3D.z,
    };
    return point2D;
}

function converttocanvas(aPoint2D)
{
    const point2D =
        {
            x: ((aPoint2D.x+1)/2)*WIDTH,
            y: (1-(aPoint2D.y+1)/2)*HIEGHT,
        };
    return point2D;
}

function movez(aPoint3D,aDeltaz)
{
    const point3D =
        {
            x: aPoint3D.x,
            y: aPoint3D.y,
            z: aPoint3D.z+aDeltaz,
        };
    return point3D;
}

function movey(aPoint3D,aDeltay)
{
    const point3D =
        {
            x: aPoint3D.x,
            y: aPoint3D.y+aDeltay,
            z: aPoint3D.z,
        };
    return point3D;
}

function movex(aPoint3D,aDeltax)
{
    const point3D =
        {
            x: aPoint3D.x+aDeltax,
            y: aPoint3D.y,
            z: aPoint3D.z,
        };
    return point3D;
}

function movey(aPoint3D,aDeltay)
{
    const point3D =
        {
            x: aPoint3D.x,
            y: aPoint3D.y+aDeltay,
            z: aPoint3D.z,
        };
    return point3D;
}

function animate()
{
    // dz = dz+dt;
    angle = angle + Math.PI * dt;
    clear();
    // for (const v of vertixes)
    // {
    //      point(converttocanvas(project3dto2d(movez(v,dz))));
    // }
    for (let fIndex = 0; fIndex<fs.length; fIndex++)
    {
        const f = fs[fIndex];
        for (let i = 0; i<f.length; i++)
        {
            let a = vs[f[i]];
            let b = vs[f[(i+1)%f.length]];

            a = rotateyz(a,0.5*Math.PI);
            b = rotateyz(b,0.5*Math.PI);

            a = rotatexz(a,angle);
            b = rotatexz(b,angle);

            a = movez(a,dz);
            b = movez(b,dz);

            a = movey(a,-2);
            b = movey(b,-2);

            a = movex(a,-1);
            b = movex(b,-1);

            const aScr = converttocanvas(project3dto2d(a));
            const bScr = converttocanvas(project3dto2d(b));

            line(aScr,bScr);
        }
    }
    setTimeout(animate,1000/fps);
}

function onload()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    // line({x:10,y:110},{x:10,y:50});


    setTimeout(animate,1000/fps);
}

window.addEventListener("load",onload);
