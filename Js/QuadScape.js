
var nodeList = new ChainedList ();

function BuildScapeTree (canvaswidth,canvasheight)
{
	var size = 2 * Math.max (canvaswidth,canvasheight);
	
	var left = -size /2;
	var right = size /2;
	var top = -size /2;
	var bottom = size /2;

	return new QuadScape (left,top,right,bottom);
}

function QuadScape (left,top,right,bottom)
{
	this.left = left;
	this.top = top;
	this.right = right;
	this.bottom = bottom;
	this.ChildNodes = null;
	this.EntityList = null;
	
	this.SpreadEntity = function(entity)
	{
		var cx = this.right - this.left;
		var cy = this.bottom - this.top;

		if (cx <= AppViewModel.scapeNodeMinSize) 
		{
			if (this.EntityList == null) this.EntityList = new ChainedList ();
			this.EntityList.AddObject (entity);
			entity.ScapeNodeList.AddObject (this);
			return;
		}

		if (this.ChildNodes == null)
		{
			var halfxpos =  this.left + cx / 2;
			var halfypos =  this.top + cy / 2;
			
			this.ChildNodes = new Array(4);
			this.ChildNodes [0] = new QuadScape (this.left,this.top,halfxpos,halfypos);
			this.ChildNodes [1] = new QuadScape (halfxpos,this.top,this.right,halfypos);
			this.ChildNodes [2] = new QuadScape (this.left,halfypos,halfxpos,this.bottom);
			this.ChildNodes [3] = new QuadScape (halfxpos,halfypos,this.right,this.bottom);
		}

		var left = entity.posx+entity.model.img.width/2+entity.rect.x;
		var top = entity.posy+entity.model.img.height/2+entity.rect.y;
		var right = left + entity.rect.cx;
		var bottom = top + entity.rect.cy;
		for (var i = 0; i < 4; i++)
		{
			// var intersect = this.ChildNodes [i].Intersect (entity.posx,entity.posy,
				// entity.posx+entity.model.img.width,
				// entity.posy+entity.model.img.height);
				
			// var intersect = this.ChildNodes [i].Intersect (
			// entity.posx+entity.model.img.width/2+entity.rect.x,
			// entity.posy+entity.model.img.height/2+entity.rect.y,
				// entity.posx+entity.model.img.width/2+entity.rect.x+entity.rect.cx,
				// entity.posy+entity.model.img.height/2+entity.rect.y+entity.rect.cy);

			var intersect = this.ChildNodes [i].Intersect (left,top,right,bottom)
			if (intersect == true)
			this.ChildNodes [i].SpreadEntity (entity);
		}
	};
	



	this.Draw = function(ctx)
	{
		if (this.ChildNodes == null)
		{
			if (this.EntityList != null && this.EntityList.count > 0)
			{
				this.DrawBox (ctx);
				if (this.EntityList != null && this.EntityList.count > 0)
				ctx.fillText(this.EntityList.count,
					this.left + (this.right - this.left) / 2,
					this.top + (this.bottom - this.top) / 2);
			}
		}

		if (this.ChildNodes != null)
		{
			for (var i = 0; i < 4; i++)
			{
				if (this.ChildNodes [i] != null) this.ChildNodes [i].Draw (ctx);
			}			
		}
	}

	this.DrawBox = function(ctx)
	{
		ctx.strokeStyle = '#7777FF';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(this.left,this.top);
		ctx.lineTo(this.right,this.top);
		ctx.lineTo(this.right,this.bottom);
		ctx.lineTo(this.left,this.bottom);
		ctx.lineTo(this.left,this.top);
		ctx.stroke();
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
	
	
	
	this.FlushTree = function()
	{
		if (this.EntityList != null)
		{
			this.EntityList.RemoveAll ();
		}
		
		if (this.ChildNodes == null) return;
		for (var i = 0; i < 4; i++)
		{
			this.ChildNodes [i].FlushTree ();
		}
	};
	

	this.GetNodeRectList = function(left,top,right,bottom)
	{
		nodeList = new ChainedList ();
		this.SpreadRect (left,top,right,bottom)
		return nodeList;
	}

	
	this.SpreadRect = function(left,top,right,bottom)
	{
		var cx = this.right - this.left;
		if (cx <= AppViewModel.scapeNodeMinSize) 
		{
			if (this.Intersect (left,top,right,bottom) == true)
			nodeList.AddObject (this);
			return;
		}

		if (this.ChildNodes != null)
		{
			for (var i = 0; i < 4; i++)
			{
					
				var intersect = this.ChildNodes [i].Intersect (left,top,right,bottom);
				if (intersect == true)
				this.ChildNodes [i].SpreadRect (left,top,right,bottom);
			}
		}
	};	
}


