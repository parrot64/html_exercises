class Point
{
    constructor(aPoint)
    {
        this.x = aPoint.x;
        this.y = aPoint.y;
        this.z = aPoint.z;
    }

    rotatexz(angle)
    {
        const C = Math.cos(angle);
        const S = Math.sin(angle);

        let x = this.x;
        let z = this.z;

        this.x = x*C - z*S;
        this.z =  x*S + z*C;

        return this;
    }

    rotateyz(angle)
    {
        const C = Math.cos(angle);
        const S = Math.sin(angle);

        let y = this.y;
        let z = this.z;

        this.y = y*C - z*S;
        this.z = y*S + z*C;


        return this;
    }

    rotatexy(aPoint3D,angle)
    {
        const C = Math.cos(angle);
        const S = Math.sin(angle);

        let x = this.x;
        let y = this.y;

        this.x = x*C - y*S;
        this.y = x*S + y*C;

        return this;
    }

    scale(aScale3D)
    {
        this.x = this.x*aScale3D.x;
        this.y = this.y*aScale3D.y;
        this.z = this.z*aScale3D.z;

        return this;
    }

    translate3D(aTranslation3D)
    {
        this.x = this.x+aTranslation3D.x;
        this.y = this.y+aTranslation3D.y;
        this.z = this.z+aTranslation3D.z;

        return this;
    }

    project3dto2d()
    {

        this.x = this.x/this.z;
        this.y = this.y/this.z;

        return this;
    }

    converttocanvas(aWidth,aHeight)
    {

        this.x = ((this.x + 1)/2)*aWidth;
        this.y =  (1 - (this.y + 1)/2)*aHeight;

        return this;
    }



}
