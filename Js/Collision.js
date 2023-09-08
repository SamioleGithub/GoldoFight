
var CollideNodes01 = new ChainedList ();
var CollideNodes02 = new ChainedList ();
var CollideList = null;


function Collide (ent01,ent02)
{

	var intersect = IntersectRect (
		ent01.posx,ent01.posy,ent01.model.img.width,ent01.model.img.height,
		ent02.posx,ent02.posy,ent02.model.img.width,ent02.model.img.height);

	var quadNode01 = ent01.model.quadNode;
	var quadNode02 = ent02.model.quadNode;

	// Ni l'un ni l'autre n'ont un quadtree de collision
	// donc on renvoie le résutat d'un simple intersection rectangulaire
	if (quadNode01 == null && quadNode02 == null) return intersect;



	CollideNodes01.RemoveAll ();
	CollideList = CollideNodes01;



	// S'il l'un des deux est null alors on test la zone rectangulaire
	// dans le quadTree de collision de l'autre
	if (quadNode01 == null || quadNode02 == null)
	{
		var quadNodTest = (quadNode01 != null) ? quadNode01 : quadNode02;
		var entQuad = (quadNodTest == quadNode01) ? ent01 : ent02;
		var entRect = (entQuad == ent01) ? ent02 : ent01;



		var quadnode = quadNodTest.hasOneCollision (
			-entQuad.posx + entRect.posx,
			-entQuad.posy + entRect.posy,
			-entQuad.posx + entRect.posx+entRect.model.img.width,
			-entQuad.posy + entRect.posy+entRect.model.img.height);

		return (quadnode != null) ? true : false;
	}

	
	
	
	
	// Dernière solution nous avons deux QuadNode
	quadNode01.hasCollision (
		-ent01.posx + ent02.posx,
		-ent01.posy + ent02.posy,
		-ent01.posx + ent02.posx+ent02.model.img.width,
		-ent01.posy + ent02.posy+ent02.model.img.height);
		
	if (CollideNodes01.count > 0)
	{
		CollideNodes02.RemoveAll ();
		CollideList = CollideNodes02;
		
		var node = CollideNodes01.firstnode;
		while (node != null)
		{
			quadNode02.hasCollision
			(
				node.obj.left-ent02.posx+ent01.posx,
				node.obj.top-ent02.posy+ent01.posy,
				node.obj.right-ent02.posx+ent01.posx,
				node.obj.bottom-ent02.posy+ent01.posy
			);
			node = node.next;
		}
		
		return (CollideNodes02.count > 0) ? true : false;
	}
	return false;	
}



function CollideRect (ent01,left,top,right,bottom)
{

	var intersect = IntersectRect (
		ent01.posx,ent01.posy,ent01.model.img.width,ent01.model.img.height,
		left,top,right,bottom);

	var quadNode01 = ent01.model.quadNode;

	// Ni l'un ni l'autre n'ont un quadtree de collision
	// donc on renvoie le résutat d'un simple intersection rectangulaire
	if (quadNode01 == null) return intersect;



	CollideNodes01.RemoveAll ();
	CollideList = CollideNodes01;

	var quadnode = quadNode01.hasOneCollision (
		-ent01.posx + left,
		-ent01.posy + top,
		-ent01.posx + right,
		-ent01.posy + bottom);
	return (quadnode != null) ? true : false;
}


function IntersectRect (x1,y1,cx1,cy1,x2,y2,cx2,cy2)
{
	var ccx = cx1 + cx2;
	var ccy = cy1 + cy2;
	
	var xmin = Math.min (x1,x2);
	var xmax = Math.max (x1+cx1,x2+cx2);
	
	var cx = xmax - xmin;
	if (cx >= ccx) return false;
	
	var ymin = Math.min (y1,y2);
	var ymax = Math.max (y1+cy1,y2+cy2);
	
	var cy = ymax - ymin;
	return (cy < ccy) ? true : false;
}

function IsIntRect (x,y,left,top,right,bottom)
{
	if (x < left || x > right) return false;
	return (y >= top && y <= bottom);
}


function droite (ctx,xa,ya,xb,yb)
{
	// y = ax + b;
	// a = yb- ya / xb - xa
	var a = (yb-ya) / (xb-xa);
	
	// y = ax + b;
	// b = y - ax;
	var b = ya - a*xa;
	var min = Math.min (xa,xb);
	var max = Math.max (xa,xb);
	ctx.strokeStyle = '#FF0000';
	ctx.beginPath();
	ctx.moveTo(xa,ya);
	// alert ('min '+min+' max '+max);
	
	for (var i = min; i <= max ; i++)
	{
		var y = a*i + b;
		ctx.lineTo(i,y);
		
	}
	ctx.lineTo(xb,yb);
	ctx.stroke();	

}


/*

        private int FindLineCircleIntersections(float cx, float cy, float radius,
            PointF point1, PointF point2, out PointF intersection1, out PointF intersection2)
        {
            float dx, dy, A, B, C, det, t;

            dx = point2.X - point1.X;
            dy = point2.Y - point1.Y;

            A = dx * dx + dy * dy;
            B = 2 * (dx * (point1.X - cx) + dy * (point1.Y - cy));
            C = (point1.X - cx) * (point1.X - cx) + (point1.Y - cy) * (point1.Y - cy) - radius * radius;

            det = B * B - 4 * A * C;
            if ((A <= 0.0000001) || (det < 0))
            {
                // No real solutions.
                intersection1 = new PointF(float.NaN, float.NaN);
                intersection2 = new PointF(float.NaN, float.NaN);
                return 0;
            }



            else if (det == 0)
            {
                // One solution.
                t = -B / (2 * A);
                intersection1 = new PointF(point1.X + t * dx, point1.Y + t * dy);
                intersection2 = new PointF(float.NaN, float.NaN);
                return 1;
            }
            else
            {
                // Two solutions.
                t = (float)((-B + Math.Sqrt(det)) / (2 * A));
                intersection1 = new PointF(point1.X + t * dx, point1.Y + t * dy);
                t = (float)((-B - Math.Sqrt(det)) / (2 * A));
                intersection2 = new PointF(point1.X + t * dx, point1.Y + t * dy);
                return 2;
            }
        }
*/



function SegmentVsCircle(x1,y1,x2,y2,cx,cy,radius)
{
	var dx = x2 - x1;
	var dy = y2 - y1;


	// A = dx * dx + dy * dy;
	var A = dx * dx + dy * dy;
	
	// B = 2 * (dx * (point1.X - cx) + dy * (point1.Y - cy));
	var B = 2 * (dx * (x1 - cx) + dy * (y1 - cy));

	// C = (point1.X - cx) * (point1.X - cx) + (point1.Y - cy) * (point1.Y - cy) - radius * radius;
	var C = (x1 - cx) * (x1 - cx) + (y1 - cy) * (y1 - cy) - radius * radius;

	var det = B * B - 4 * A * C;
	if ((A <= 0.0000001) || (det < 0))
	{
		return false;
	}
	
	
	if (det == 0)
	{
		// One solution.
		var t = -B / (2 * A);
		// intersection1 = new PointF(point1.X + t * dx, point1.Y + t * dy);
		
		var xs1 = x1 + t * dx;
		var ys1 = y1 + t * dy;

		return CheckPointInSegment(xs1,ys1,x1,y1,x2,y2);
	}


	// Two solutions.
	t = ((-B + Math.sqrt(det)) / (2 * A));
	// intersection1 = new PointF(point1.X + t * dx, point1.Y + t * dy);
	var xs1 = x1 + t * dx;
	var ys1 = y1 + t * dy;
	

	if (CheckPointInSegment(xs1,ys1,x1,y1,x2,y2) == true) return true;
	
	t = ((-B - Math.sqrt(det)) / (2 * A));
	// intersection2 = new PointF(point1.X + t * dx, point1.Y + t * dy);
	var xs2 = x1 + t * dx;
	var ys2 = y1 + t * dy;
	
	return CheckPointInSegment(xs2,ys2,x1,y1,x2,y2);
}


function CheckPointInSegment(xp,yp,x1,y1,x2,y2)
{
	
	var xstart = Math.min (x1,x2);
	var xend = Math.max (x1,x2);

	if (xp < xstart || xp > xend) return false;

	var ystart = Math.min (y1,y2);
	var yend = Math.max (y1,y2);
	
	return (yp >= ystart && yp <= yend) ? true : false;
	
}



function CollideCircle (entity01,radius01,entity02,radius02)
{
	
	var distx = (entity01.posx + entity01.model.img.width / 2) - (entity02.posx + entity02.model.img.width / 2); 
	var disty = (entity01.posy + entity01.model.img.height / 2) - (entity02.posy + entity02.model.img.height / 2); 

	// var squarelen = Math.sqrt (distx*distx + disty*disty);
	// var squareRadiuslen = radius01+radius02;

	var squarelen = distx*distx + disty*disty;
	var squareRadiuslen = radius01+radius02;
	squareRadiuslen *= squareRadiuslen;
	if (squarelen <= squareRadiuslen) return true;
	return false;
}


function CircleVsCircle (xpos01,ypos01,radius01,xpos02,ypos02,radius02)
{
	var distx = xpos01 - xpos02;
	var disty = ypos01 - ypos02;

	var squarelen = distx*distx + disty*disty;
	var squareRadiuslen = radius01+radius02;
	squareRadiuslen *= squareRadiuslen;
	if (squarelen <= squareRadiuslen) return true;
	return false;
}
