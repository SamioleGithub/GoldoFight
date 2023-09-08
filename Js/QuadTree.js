
function BuildQuadTree (imgSrc)
{
    var canvastmp = document.createElement("CANVAS"); 
	canvastmp.width = imgSrc.width;
    canvastmp.height = imgSrc.height;

    var ctx = canvastmp.getContext("2d");
	ctx.drawImage(imgSrc,0,0);
	var imageData = ctx.getImageData(0,0,canvastmp.width, canvastmp.height);

	// alert (imgSrc.width + ' ' + imgSrc.height);

	var quadMod = new QuadNode (imgSrc,0,0,imgSrc.width-1,imgSrc.height-1);
	quadMod.Init (imageData.data);
	return quadMod;
}

function QuadNode (ImgSrc,left,top,right,bottom)
{
	this.left = left;
	this.top = top;
	this.right = right;
	this.bottom = bottom;
	this.fullfilled = false;
	this.ChildNodes = null;
	this.ImgSrc = ImgSrc;
	
	this.Init = function(data)
	{
		var cx = Math.floor ((this.right - this.left) / 2);
		var cy = Math.floor ((this.bottom - this.top) / 2);

		// if (cx <= 1 || cy <= 1) return;
		// if (cx <= 2 || cy <= 2) return;
		// if (cx <= 3 || cy <= 3) return;
		if (cx <= 4 || cy <= 4) return;
		// if (cx <= 5 || cy <= 5) return;
		// if (cx <= 8 || cy <= 8) return;
		// if (cx <= 10 || cy <= 10) return;
		// if (cx <= 20 || cy <= 20) return;
		// if (cx <= 50 || cy <= 50) return;
		// if (cx <= 100 || cy <= 100) return;

		this.fullfilled = this.IsFullFilled (data,this.left,this.top,this.right,this.bottom);
		if (this.fullfilled == true) return;

		var halfxpos =  this.left + cx;
		var halfypos =  this.top + cy;
		
		this.ChildNodes = new Array(4);

		
		this.ChildNodes [0] = null;
		if (this.FindData (data,this.left,this.top,halfxpos,halfypos))
		this.ChildNodes [0] = new QuadNode (ImgSrc,this.left,this.top,halfxpos,halfypos);

		this.ChildNodes [1] = null;
		if (this.FindData (data,halfxpos,this.top,this.right,halfypos))
		this.ChildNodes [1] = new QuadNode (ImgSrc,halfxpos,this.top,this.right,halfypos);

		this.ChildNodes [2] = null;
		if (this.FindData (data,this.left,halfypos,halfxpos,this.bottom))
		this.ChildNodes [2] = new QuadNode (ImgSrc,this.left,halfypos,halfxpos,this.bottom);


		this.ChildNodes [3] = null;
		if (this.FindData (data,halfxpos,halfypos,this.right,this.bottom))
		this.ChildNodes [3] = new QuadNode (ImgSrc,halfxpos,halfypos,this.right,this.bottom);
	
	
		var countchildnull = 0;
		for (var i = 0; i < 4; i++)
		{
			if (this.ChildNodes [i] != null) this.ChildNodes [i].Init (data);
			else countchildnull ++;
		}
		
		if (countchildnull == 4) 
		{
			this.ChildNodes = null;
		}
	};
	
	// Si un seul pixel n'est pas transparent
	// alors cette zone contient des données
	this.FindData = function(data,ix,iy,ixx,iyy)
	{
		for (var i = ix; i <= ixx; i ++)
		{
			for (var j = iy; j <= iyy; j ++)
			{
				var index = i*4 + this.ImgSrc.width*4*j;

				if (data[index+3] != 0) return true;
			}
		}
		return false;
	}

	// Si un seul pixel est transparent
	// alors cette zone n'est pas fullfilled
	this.IsFullFilled = function(data,ix,iy,ixx,iyy)
	{
		for (var i = ix; i <= ixx; i ++)
		{
			for (var j = iy; j <= iyy; j ++)
			{
				var index = i*4 + this.ImgSrc.width*4*j;
				
				if (data[index+3] == 0) return false;
			}
		}
		return true;
	}



	this.Draw = function(ctx,posx,posy)
	{
		// if (drawAllTree == true || (this.ChildNodes == null || this.fullfilled == true))
		if (this.ChildNodes == null || this.fullfilled == true)
		{
			ctx.beginPath();
			ctx.moveTo(posx+this.left,posy+this.top);
			ctx.lineTo(posx+this.right,posy+this.top);
			ctx.lineTo(posx+this.right,posy+this.bottom);
			ctx.lineTo(posx+this.left,posy+this.bottom);
			ctx.lineTo(posx+this.left,posy+this.top);
			ctx.stroke();		
		}

		
		if (this.ChildNodes != null && this.fullfilled == false)
		{
			for (var i = 0; i < 4; i++)
			{
				if (this.ChildNodes [i] != null) this.ChildNodes [i].Draw (ctx,posx,posy);
			}			
		}
	}
	
	this.hasCollision = function (left,top,right,bottom)
	{
		if (this.ChildNodes == null || this.fullfilled == true)
		{
			if (this.Intersect (left,top,right,bottom))
			CollideList.AddObject (this);
			return;
		}
		
		if (this.ChildNodes != null)
		{
			for (var i = 0; i < 4; i++)
			{
				if (this.ChildNodes [i] != null) 
				{ 
					var child = this.ChildNodes [i].hasCollision (left,top,right,bottom);
				}
			}
		}
	}
		

	this.Intersect = function (left,top,right,bottom)
	{
		var ccx = (right-left) + (this.right-this.left);
		var ccy = (bottom-top) + (this.bottom-this.top);
		
		var xmin = Math.min (this.left,left);
		var xmax = Math.max (this.right,right);
		
		var cx = xmax - xmin;
		if (cx >= ccx) return false;
		
		var ymin = Math.min (top,this.top);
		var ymax = Math.max (bottom,this.bottom);
		
		var cy = ymax - ymin;
		return (cy <= ccy) ? true : false;
	}
	
	
	this.hasOneCollision = function (left,top,right,bottom)
	{

		if (this.fullfilled == true || this.ChildNodes == null)
		{
			var bcollide = this.Intersect (left,top,right,bottom);
			return (bcollide == true) ? this : null;
		}

		
		if (this.ChildNodes != null)
		{
			for (var i = 0; i < 4; i++)
			{
				if (this.ChildNodes [i] != null) 
				{ 
					var childnode = this.ChildNodes [i].hasOneCollision (left,top,right,bottom);
					if (childnode != null ) return childnode;
				}
			}
		}
		return null;
	}
			
}


