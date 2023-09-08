function ChainedNode (obj){
	this.next = null;
	this.prev = null;
	this.obj = obj;
}

function ChainedList ()
{
	this.firstnode = null;
	this.lastnode = null;
	this.count = 0;

	// Add un object in the chainedlist
	this.AddObject  = function AddObject (obj)
	{
		var newnode = new ChainedNode (obj);
		if (this.firstnode == null)                     
		{
			this.firstnode = newnode;
			this.lastnode = newnode;
		}
		else
		{
			this.lastnode.next = newnode;
			newnode.prev = this.lastnode;
			this.lastnode = newnode;
		}

		this.count ++;
		return newnode;
	};

	// Remove un object in the chainedlist
	this.RemoveObject  = function RemoveObject (obj)
	{
		var node = this.firstnode;
		var findnode = null;
		while (node != null && findnode == null)
		{
			if (node.obj == obj)
			{
				findnode = node;
			}
			node = node.next;
		}

		if (findnode != null)
		{
			this.RemoveNode (findnode);
		}
	};


	this.RemoveNode  = function RemoveNode (node)
	{
		if (this.firstnode == node)
		{
			this.firstnode = node.next;
		}

		if (this.lastnode == node)
		{
			this.lastnode = node.prev;
		}

		if (node.next != null) node.next.prev = node.prev;
		if (node.prev != null) node.prev.next = node.next;
		delete node;
		this.count --;
	};

	// Re-count all the node in the chainedlist
	this.CountNode  = function CountNode ()
	{		
		var countNode = 0;
		var node = this.firstnode;
		while (node != null)
		{
			countNode ++;
			node = node.next;
		}
		this.count = countNode;
		return countNode;
	};

	// Remove all node form the chainedlist
	this.RemoveAll  = function RemoveAll ()
	{
		var node = this.firstnode;
		var prevnode;
		while (node != null)
		{
			prevnode = node;
			node = node.next;
			delete prevnode;
		}

		this.firstnode = null;
		this.lastnode = null;
		this.count = 0;
	};
	
	// Remove un object in the chainedlist
	this.FindObject = function FindObject (obj)
	{
		var node = this.firstnode;
		while (node != null)
		{
			if (node.obj == obj)
			{
				return node;
			}
			node = node.next;
		}
		return null;
	};
}



