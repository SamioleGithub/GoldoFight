
// Classe de base
function Entity(OwnerEntity) {
	this.posx = 0;
	this.posy = 0;
	this.prevposx = 0;
	this.prevposy = 0;
	this.speed = 0;
	this.valid = true;
	this.vie = 1;
	this.canbehittentime = 0;
	this.model = null;
	this.ScapeNodeList = new ChainedList();
	this.dx = 0;
	this.dy = 1;
	this.radius = 0;
	this.rect = null;
	this.unicId = AppViewModel.unicId++;
	this.ShieldForce = 0;
	this.ShieldRadius = 0;
	this.speedRot = 0; // Radian par seconde
	this.useRandomStartPosX = true;
	this.OwnerEntity = (OwnerEntity == undefined) ? null : OwnerEntity;
	this.Hitten = false;
	this.Subscribers = new ChainedList();
	this.TargetNode = null;
	this.Target = null;

	this.SetNoValid = function () {
		this.valid = false;
	};

	this.CanBeHitten = function () {
		return (this.canbehittentime <= 0) ? true : false;
	};

	this.DrawQuadTree = function (ctx, x, y) {

		if (AppViewModel.drawQuadtree == true && this.model.quadNode != null) {
			var memstyle = ctx.strokeStyle;
			ctx.strokeStyle = '#AAAAFF';
			ctx.lineWidth = 4;
			ctx.beginPath();
			this.model.quadNode.Draw(ctx, x, y);
			ctx.stroke();
			ctx.strokeStyle = memstyle;
		}
	};

	this.RandomStartPosition = function () {
		if (this.useRandomStartPosX == true) {
			this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;
		}
		this.posy = - (this.model.img.height + this.model.img.height / 2);
	};

	this.SetMinusRadius = function () {
		this.radius = Math.min(this.model.img.width, this.model.img.height) / 2;
	};

	this.SetMaximusRadius = function () {
		this.radius = Math.max(this.model.img.width, this.model.img.height) / 2;
	};

	this.DirToTarget = function (target, deltaTime) {

		// var rottime = Math.PI * deltaTime;
		var rottime = this.speedRot * deltaTime;

		var vecx = target.posx + target.model.img.width / 2;
		var vecy = target.posy + target.model.img.height / 2;
		vecx -= this.posx + this.model.img.width / 2;
		vecy -= this.posy + this.model.img.height / 2;
		var len = Math.sqrt(vecx * vecx + vecy * vecy);
		vecx /= len;
		vecy /= len;

		var rot = vecy * this.dx - vecx * this.dy;

		if (Math.abs(rottime) > Math.abs(rot)) rottime = Math.abs(rot);
		if (rot < 0) this.ang -= rottime;
		else if (rot > 0) this.ang += rottime;

		this.dx = Math.cos(this.ang);
		this.dy = Math.sin(this.ang);
	}

	this.Subscribe = function (entity) {
		var node = this.Subscribers.FindObject(entity);
		if (node == null) node = this.Subscribers.AddObject(entity);
		return node;
	}
}

Entity.prototype.Init = function () {
};

Entity.prototype.Animate = function (deltaTime) {
};

Entity.prototype.AnimateFromOwner = function (deltaTime) {
};

Entity.prototype.Draw = function (ctx) {
};

Entity.prototype.DrawFromOwner = function (ctx) {
}

Entity.prototype.DrawShadow = function (ctx) {
	if (this.model.imgShadow != null) {
		ctx.drawImage(this.model.imgShadow, this.posx + shadow.dx, this.posy + shadow.dy,
			this.model.imgShadow.width * shadow.factor, this.model.imgShadow.height * shadow.factor);
	}
};

Entity.prototype.Hit = function () {
	if (!this.IsInvulnerable()) {
		this.vie--;
		this.Hitten = true;
	}
};

Entity.prototype.HitDegat = function (degats) {
	if (!this.IsInvulnerable()) {
		this.vie -= degats;
		this.Hitten = true;
	}
};

Entity.prototype.Collide = function (entity) {
};

Entity.prototype.IsStructureCollide = function () {
	return true;
};


Entity.prototype.IsValid = function () {
	return (this.valid == true && this.vie > 0) ? true : false;
};

Entity.prototype.SetModelName = function (modelName) {
	this.model = loader.GetModel(modelName);
	this.SetModel(this.model);
}


Entity.prototype.SetModel = function (model) {
	this.model = model;
	this.vie = model.vie;
	this.speed = model.speed;
	this.speedRot = model.speedRot * Math.PI / 180;
	this.SetMaximusRadius();
	this.rect = new RectSize(
		-model.img.width / 2,
		-model.img.height / 2, model.img.width, model.img.height);
};

Entity.prototype.ChangeModel = function (model) {
	this.model = model;
	this.SetMaximusRadius();
	this.rect = new RectSize(
		-model.img.width / 2,
		-model.img.height / 2, model.img.width, model.img.height);
};

Entity.prototype.OnEnded = function () {
	if (this.OwnerEntity != null) {
		this.OwnerEntity.OnChildEnded(this);
	}
};

Entity.prototype.OnChildEnded = function (child) {
};

Entity.prototype.SetShieldForce = function (value) {
};

Entity.prototype.DecreaseShieldForce = function (dec) {
};

Entity.prototype.SetPosition = function (x, y) {
	this.posx = x;
	this.posy = y;
};

Entity.prototype.DisableSubEntity = function (entity) {
};

Entity.prototype.Fire = function () {
};

Entity.prototype.IsInvulnerable = function () {
	return false;
};

Entity.prototype.IsStopMissil = function () {
	return false;
};

Entity.prototype.AllowCollisionSameCamp = function () {
	return false;
};

Entity.prototype.UnsubscribeAll = function () {
	var node = this.Subscribers.firstnode;
	while (node != null) {
		var entity = node.obj;
		entity.Unsubscribe(node);
		node = node.next;
	}
};

Entity.prototype.Unsubscribe = function (node) {
	if (node != null && this.TargetNode == node) {
		this.Target = null;
		this.TargetNode = null;
	}
};

Entity.prototype.CanDeleted = function () {
	return true;
};

Entity.prototype.AbortCurentAction = function () {
	return true;
};




function Sun() {

	Entity.call(this);
	this.SetModel(loader.GetModel('Sun'));
	this.ang = randomUniform(1, 360);
	this.dx = Math.cos(-60 * Math.PI / 180);
	this.dy = Math.sin(-60 * Math.PI / 180);
	this.globalAlpha = 0;
}

Sun.prototype = Object.create(Entity.prototype);
Sun.prototype.constructor = Sun;

Sun.prototype.Animate = function (deltaTime) {

	this.ang += 10 * deltaTime;
	this.posx += this.dx * this.speed * deltaTime;
	this.posy += this.dy * this.speed * deltaTime;
};

Sun.prototype.Draw = function (ctx) {

	var globalAlphaMem = ctx.globalAlpha;
	ctx.globalAlpha = this.globalAlpha;
	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.ang * Math.PI / 180);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();
	ctx.globalAlpha = globalAlphaMem;
};





GoldoEnum = {
	BrasGauche: 1,
	BrasDroite: 2,
	PoingGauche: 3,
	PoingDroite: 4,

	PlanitronDroite: 5,
	PlanitronGauche: 6,


	mvtPoingNone: 0,
	mvtPoingFire: 1,
	mvtPointBack: 2,
	mvtEnd: 3,

	maxPlanitron: 25,
	maxCornofulgure: 12,
	maxFulfuropoing: 20,
	cornoFulgureTimeRecharge: 7,
};

function Goldorak() {
	Entity.call(this);

	this.vie = 3;
	this.lastPlanitronTime = 0;
	this.NbPlanitron = 1;
	this.NbFulguropoing = 0;
	this.HasPlanitronExtTime = 0;

	this.Alcorak = null;
	this.Fossoirak = null;
	this.Venusiak = null;
	this.OVTerre = null;
	this.MegaMach = null;

	this.fireMegavolt = null;
	this.corneAuFulgure = null;

	this.ModelGoldoPoing = null;
	this.ModelBrasDroite = null;
	this.ModelBrasGauche = null;

	this.FulguroPoing01 = null;
	this.FulguroPoing02 = null;

	this.GetPlanitronPos = function (type) {
		switch (type) {
			case 1:
				return new Vector(this.posx + 11 - modelMissilGamma.img.width / 2, this.posy + 74);
				break;

			case 2:
				return new Vector(this.posx + 186 - modelMissilGamma.img.width / 2, this.posy + 74);
				break;
		}

		return new Vector(
			this.posx + (this.model.img.width / 2) - modelMissilGamma.img.width / 2,
			this.posy - modelMissilGamma.img.height);
	};

	this.MissilPlanitron = function () {
		if (this.HasPlanitron() == false) return false;

		if (this.HasPlanitronExtTime > 0) {
			var ret = this.MissilPlanitronExtend();
			if (ret == true) return true;
		}


		if (this.NbPlanitron == 1) this.lastPlanitronTime = Date.now();
		this.NbPlanitron--;
		if (this.NbPlanitron < 1) this.NbPlanitron = 1;

		this.NewPlanitron(1);
		this.NewPlanitron(2);
		loader.PlaySound('Planitron', 0.6);
		return true;
	};

	this.MissilFulguroPoing = function () {
		if (this.NbFulguropoing == 0) return;

		// Si l'un des deux est toujours en tir alors on ne fait rien
		if (this.FulguroPoing01.InFire == true || this.FulguroPoing02.InFire == true) return;

		var ret01 = this.FulguroPoing01.Fire();
		if (ret01 != true) {
			this.FulguroPoing01.Reset();
			return;
		}

		var ret02 = this.FulguroPoing02.Fire();
		if (ret02 != true) {
			this.FulguroPoing01.Reset();
			this.FulguroPoing02.Reset();
			return;
		}


		// var ret01 = this.FulguroPoing01.Fire ();
		// var ret02 = this.FulguroPoing02.Fire ();

		// if (ret01 != true || ret02 != true) 
		// {
		// this.FulguroPoing01.Reset ();
		// this.FulguroPoing02.Reset ();
		// return;
		// }

		missilList.AddObject(this.FulguroPoing01);
		missilList.AddObject(this.FulguroPoing02);

		this.NbFulguropoing--;
		if (this.NbFulguropoing < 0) this.NbFulguropoing = 0;

		loader.PlaySound('FulguroPoing', 1);
		return true;
	};

	this.CorneAuFulgure = function () {
		if (this.corneAuFulgure.Enable) this.corneAuFulgure.Fire();
	};

	this.HasPlanitron = function () {
		if (this.NbPlanitron > 1) return true;
		var time = Date.now();
		return (time - this.lastPlanitronTime <= 2500) ? false : true;
	};

	this.NbCorneAuFulgure = function () {
		return this.corneAuFulgure.countFire;
	};

	this.CorneAuFulgureCanUsed = function () {
		return this.corneAuFulgure.CanUsed();
	};


	this.NewMissilGamma = function (type) {

		var pos = this.GetPlanitronPos(type);
		var missil = new MissilGamma();
		missil.posx = pos.x;
		missil.posy = pos.y;
		missil.SetModel(modelMissilGamma);
		missil.valid = true;
		missilList.AddObject(missil);
	};

	this.NewMissilGammaRafale = function () {

		for (let i = this.posx; i < this.posx + this.model.img.width; i += modelMissilGamma.img.width) {
			var missil = new MissilGamma();
			missil.posx = i;
			missil.posy = this.posy - modelMissilGamma.img.height;
			missil.SetModel(modelMissilGamma);
			missil.valid = true;
			missilList.AddObject(missil);
		}
	};

	this.NewPlanitron = function (type) {

		var pos = this.GetPlanitronPos(type);
		var missil = new Planitron();
		missil.posx = pos.x - modelPlanitron.img.width / 2;
		missil.posy = pos.y;
		missil.SetModel(modelPlanitron);

		missil.valid = true;
		missilList.AddObject(missil);
	};


	this.MissilPlanitronExtend = function () {
		if (this.HasPlanitron() == false) return false;

		if (this.NbPlanitron == 1) this.lastPlanitronTime = Date.now();
		this.NbPlanitron--;
		if (this.NbPlanitron < 1) this.NbPlanitron = 1;

		var ret1 = this.NewPlanitronExtend(GoldoEnum.PlanitronGauche);
		var ret2 = this.NewPlanitronExtend(GoldoEnum.PlanitronDroite);
		if (ret1 == true || ret2 == true) loader.PlaySound('Planitron', 0.6);
		return (ret1 == true || ret2 == true);
	};

	this.NewPlanitronExtend = function (type) {
		var missil = new PanitronExtend(this, type);
		missil.Init();
		if (missil.Fire() == false) {
			delete missil;
			return false;
		}

		missilList.AddObject(missil);
		return true;
	};


	this.Reset = function () {
		this.vie = 3; // 3;
		this.canbehittentime = 0;
		this.NbPlanitron = 1;
		this.NbFulguropoing = 0;
		this.corneAuFulgure.countFire = 0;
		this.lastPlanitronTime = 0;
		this.HasPlanitronExtTime = 0;
		this.fireMegavolt.Enable = false;
		this.corneAuFulgure.Enable = false;
		this.Alcorak = null;
		this.Fossoirak = null;
		this.Venusiak = null;
		this.OVTerre = null;
		this.MegaMach.valid = false;
		this.FulguroPoing01.Reset();
		this.FulguroPoing02.Reset();
	}

	this.WinPlanitronExt = function () {
		this.HasPlanitronExtTime = 30 + randomUniform(1, 6);
	}

	this.EnableMegavolt = function () {
		this.fireMegavolt.timeLife = 0;
		this.fireMegavolt.Enable = true;
	}

	this.AddCorneAuFulgure = function () {
		this.corneAuFulgure.timeLife = 0;
		this.corneAuFulgure.Enable = true;
		this.corneAuFulgure.countFire++;
		if (this.corneAuFulgure.countFire > GoldoEnum.maxCornofulgure) this.corneAuFulgure.countFire = GoldoEnum.maxCornofulgure;
	}

	this.NewAlcorak = function () {
		if (this.Alcorak == null) {
			this.Alcorak = new Alcorak();
			this.Alcorak.Init();
			this.Alcorak.posx = this.posx + this.model.img.width / 2 - this.Alcorak.model.img.width / 2;
			this.Alcorak.posy = this.posy - this.Alcorak.model.img.height - 10;
		}
		else {
			this.Alcorak.IncreaseLevel();
		}
	}

	this.NewFossoirak = function () {
		if (this.Fossoirak == null) {
			this.Fossoirak = new Fossoirak();
			this.Fossoirak.Init();
			this.Fossoirak.posx = this.posx - this.Fossoirak.model.img.width - 10;
			this.Fossoirak.posy = this.posy;
		}
		else {
			this.Fossoirak.IncreaseLevel();
		}
	}

	this.NewVenusiak = function () {
		if (this.Venusiak == null) {
			this.Venusiak = new Venusiak();
			this.Venusiak.Init();
			this.Venusiak.posx = this.posx + this.model.img.width + 10;
			this.Venusiak.posy = this.posy;
		}
		else {
			this.Venusiak.IncreaseLevel();
		}
	}

	this.NewOVTerre = function () {
		if (this.OVTerre == null) {
			this.OVTerre = new OVTerre();
			this.OVTerre.Init();
			this.OVTerre.UpdatePosition();
		}
		else {
			this.OVTerre.IncreaseLevel();
		}
	}

	this.NewMegaMach = function () {
		loader.PlaySound('MegaMach', 1);
		scrollZone.SetSpeedTarget(800, 400);
		this.MegaMach.ResetTimeLife();
	}

	this.Tract = function (vector) {
		if (this.Alcorak != null) RemoveScapeEntity(this.Alcorak);
		if (this.Fossoirak != null) RemoveScapeEntity(this.Fossoirak);
		if (this.Venusiak != null) RemoveScapeEntity(this.Venusiak);
		if (this.OVTerre != null) RemoveScapeEntity(this.OVTerre);


		RemoveScapeEntity(Goldo);

		this.posx += vector.x;
		this.posy += vector.y;
		this.SetPosition(this.posx, this.posy);

		Scape.SpreadEntity(this);
		if (this.Alcorak != null) Scape.SpreadEntity(this.Alcorak);
		if (this.Fossoirak != null) Scape.SpreadEntity(this.Fossoirak);
		if (this.Venusiak != null) Scape.SpreadEntity(this.Venusiak);
		if (this.OVTerre != null) Scape.SpreadEntity(this.OVTerre);

	}

	this.IsInMegaMach = function () {
		return this.MegaMach.IsInMegaMach();
	}

	this.StopMegaMach = function () {
		return this.MegaMach.Stop();
	}

	this.DrawFulguropoingMode = function (ctx) {
		this.DrawChildElement(ctx, GoldoEnum.BrasGauche);
		this.DrawChildElement(ctx, GoldoEnum.BrasDroite);
		ctx.drawImage(this.ModelGoldoPoing.img, this.posx, this.posy);
	}

	this.DrawChildElement = function (ctx, type) {
		var vec = this.GetChildRelPos(type);
		if (vec != null) {
			var elemod = this.GetChildElementModel(type);
			ctx.drawImage(elemod.img, this.posx + vec.x, this.posy + vec.y);
		}
	}

	this.GetChildRelPos = function (type) {

		var vec = null;
		switch (type) {
			case GoldoEnum.BrasGauche: vec = new Vector(74, -2); break;
			case GoldoEnum.BrasDroite: vec = new Vector(107, -2); break;
			case GoldoEnum.PoingGauche: vec = new Vector(72, -22); break;
			case GoldoEnum.PoingDroite: vec = new Vector(107, -22); break;
			case GoldoEnum.PlanitronDroite: vec = new Vector(11 - modelPlanitron.img.width / 2, 74); break;
			case GoldoEnum.PlanitronGauche: vec = new Vector(186 - modelPlanitron.img.width / 2, 74); break;

			// case GoldoEnum.PlanitronDroite: vec = this.GetPlanitronPos (1);break;
			// case GoldoEnum.PlanitronGauche: vec = this.GetPlanitronPos (2);break;


		}
		return vec;
	}

	this.GetChildElementModel = function (type) {
		var elemod = null;
		switch (type) {
			case GoldoEnum.BrasGauche: elemod = this.ModelBrasGauche; break;
			case GoldoEnum.BrasDroite: elemod = this.ModelBrasDroite; break;
		}
		return elemod;
	}
}

Goldorak.prototype = Object.create(Entity.prototype);
Goldorak.prototype.constructor = Goldorak;

Goldorak.prototype.Init = function () {

	this.ModelGoldoPoing = loader.GetModel('GoldoPoing');

	this.ModelBrasDroite = loader.GetModel('GoldoBrasDroite');
	this.ModelBrasGauche = loader.GetModel('GoldoBrasGauche');

	this.FulguroPoing01 = new FulguroPoing(this, GoldoEnum.PoingGauche);
	this.FulguroPoing01.Init();
	this.FulguroPoing02 = new FulguroPoing(this, GoldoEnum.PoingDroite);
	this.FulguroPoing02.Init();

	this.MegaMach = new MegaMach(this, 10, 'GoldoMegaMach', 4, 1);
	this.MegaMach.Init();

	this.fireMegavolt = new Megavolt(this);
	this.fireMegavolt.Init();

	this.corneAuFulgure = new CorneAuFulgure(this);
	this.corneAuFulgure.Init();
};

Goldorak.prototype.SetModel = function (model) {
	this.model = model;
	this.vie = model.vie;
	this.SetMinusRadius();
	this.rect = new RectSize(-model.img.width / 2, -model.img.height / 2, model.img.width, model.img.height);
};

Goldorak.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.canbehittentime -= deltaTime;
	this.HasPlanitronExtTime -= deltaTime;

	if (this.fireMegavolt.Enable) this.fireMegavolt.Animate(deltaTime);
	// if (this.corneAuFulgure.Enable) this.corneAuFulgure.Animate (deltaTime);
	this.corneAuFulgure.Animate(deltaTime);

	if (this.Alcorak != null) this.Alcorak.Animate(deltaTime);
	if (this.Fossoirak != null) this.Fossoirak.Animate(deltaTime);
	if (this.Venusiak != null) this.Venusiak.Animate(deltaTime);
	if (this.OVTerre != null) this.OVTerre.Animate(deltaTime);


	if (this.MegaMach != null) {
		this.MegaMach.Animate(deltaTime);
	}
};

Goldorak.prototype.Draw = function (ctx) {
	if (this.valid == false) return;
	if (!this.CanBeHitten()) ctx.globalAlpha = 0.25;

	scrollZone.DrawShadowEntity(ctx, this);

	if (this.FulguroPoing01.InFire == true || this.FulguroPoing02.InFire == true) {
		this.DrawFulguropoingMode(ctx);
	}
	else {
		ctx.drawImage(this.model.img, this.posx, this.posy);
	}

	if (this.fireMegavolt.Enable && this.fireMegavolt.InFire) this.fireMegavolt.Draw(ctx);
	if (this.corneAuFulgure.Enable && this.corneAuFulgure.InFire) this.corneAuFulgure.Draw(ctx);

	if (this.Alcorak != null) {
		if (this.Alcorak.IsValid()) this.Alcorak.Draw(ctx);
		else {
			RemoveScapeEntity(this.Alcorak);
			this.Alcorak = null;
		}
	}

	if (this.Fossoirak != null) {
		if (this.Fossoirak.IsValid()) this.Fossoirak.Draw(ctx);
		else {
			RemoveScapeEntity(this.Fossoirak);
			this.Fossoirak = null;
		}
	}

	if (this.Venusiak != null) {
		if (this.Venusiak.IsValid()) this.Venusiak.Draw(ctx);
		else {
			RemoveScapeEntity(this.Venusiak);
			this.Venusiak = null;
		}
	}

	if (this.OVTerre != null) {
		if (this.OVTerre.IsValid()) this.OVTerre.Draw(ctx);
		else {
			RemoveScapeEntity(this.OVTerre);
			this.OVTerre = null;
		}
	}

	if (this.MegaMach.valid) {
		ctx.globalAlpha = (this.CanBeHitten() == false) ? 0.25 : 0.95;
		this.MegaMach.Draw(ctx);
	}

	ctx.globalAlpha = 1;

	this.DrawQuadTree(ctx, this.posx, this.posy);

	// DrawCircle (ctx,this.posx + this.rect.cx / 2, this.posy + this.rect.cy / 2, this.radius);
	// DrawRect (ctx,this.posx,this.posy,this.rect.cx,this.rect.cy);
};

Goldorak.prototype.Fire = function () {

	this.NewMissilGamma(1);
	this.NewMissilGamma(2);

	if (this.fireMegavolt.Enable) this.fireMegavolt.Fire();

	if (this.Alcorak != null) this.Alcorak.Fire();
	if (this.Fossoirak != null) this.Fossoirak.Fire();
	if (this.Venusiak != null) this.Venusiak.Fire();
	if (this.OVTerre != null) this.OVTerre.Fire();
};

Goldorak.prototype.Hit = function () {

	if (this.CanBeHitten()) {
		this.vie--;
		this.canbehittentime = 1.5; // seconde
		if (this.fireMegavolt.Enable) this.fireMegavolt.InFire = false;
		if (this.corneAuFulgure.Enable) this.corneAuFulgure.InFire = false;
	}
};

Goldorak.prototype.HitDegat = function (degats) {
	this.Hit();
};

Goldorak.prototype.Collide = function (entity) {

	if (this.CanBeHitten() == false) return false;

	if (entity.IsValid() == false) return false;

	if (entity.IsStructureCollide() == false) return false;


	if (entity.model.isMissil == true) {
		if (entity.Collide(this) == false) return false;
	}
	else {
		if (Collide(entity, this) == false) return false;
	}

	if (entity.model.isBonus == false) {
		entity.Hit();
		if (!entity.IsValid())
			NewExplosionPos(entity.posx + entity.model.img.width / 2, entity.posy + entity.model.img.height / 2);

		NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);

		this.Hit()
	}
	else {
		entity.ProcessBonus();
	}

	return true;
}

Goldorak.prototype.SetPosition = function (x, y) {
	this.posx = x;
	this.posy = y;

	if (this.Alcorak != null) {
		this.Alcorak.posx = x + this.model.img.width / 2 - this.Alcorak.model.img.width / 2;
		this.Alcorak.posy = y - this.Alcorak.model.img.height - 10;
	}

	if (this.Fossoirak != null) {
		this.Fossoirak.posx = x - this.Fossoirak.model.img.width - 10;
		this.Fossoirak.posy = y;
	}

	if (this.Venusiak != null) {
		this.Venusiak.posx = x + this.model.img.width + 10;
		this.Venusiak.posy = y;
	}

	if (this.OVTerre != null) {
		this.OVTerre.UpdatePosition();
	}

};

Goldorak.prototype.IsInvulnerable = function () {

	return this.MegaMach.valid;
};




function Navette() {

	Entity.call(this);

	this.ang = 0;

	this.rotmax = 30 * Math.PI / 180;
	this.angcib = 0;
	this.pursuit = true;

	this.mvtype = randomUniform(1, 4);
	this.fireLazernium = null;
	this.randomPosX = true;
}

Navette.prototype = Object.create(Entity.prototype);
Navette.prototype.constructor = Navette;

Navette.prototype.Init = function (mvtype) {

	if (mvtype != undefined) this.mvtype = mvtype;

	this.SetModel(loader.GetModel('navette01'));
	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;

	this.posy = -this.model.img.height * randomUniform(1, 10);
	this.speed = randomUniform(160, 300);

	switch (this.mvtype) {
		case 2: this.ang = randomUniform(0, 359); break;
		case 3: this.ang = 90 * Math.PI / 180; break;
	}

	if (randomUniform(1, 11) < 8) {
		this.fireLazernium = new Lazernium(this, (this.mvtype == 3), false, "LazerNavette");
		this.fireLazernium.Init();
	}

	this.ShieldForce = 0;
	this.ShieldRadius = this.radius;
	this.valid = true;
};

Navette.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	switch (this.mvtype) {
		// Descendre seulement
		case 1:
			this.posy += this.speed * deltaTime;
			break;

		// Oscilation
		case 2:
			this.ang += 1;
			this.posy += this.speed * deltaTime;
			this.posx += (Math.sin(this.ang * Math.PI / 180) * 2);
			break;

		// Poursuite
		case 3:
			if (this.pursuit == true && Goldo.posy - 100 > this.posy) {
				this.DirToTarget(Goldo, deltaTime);
			} else this.pursuit = false;

			this.posx += this.dx * this.speed * deltaTime;
			this.posy += this.dy * this.speed * deltaTime;

			break;
	}

	if (this.fireLazernium != null) this.fireLazernium.Animate(deltaTime);

	if (this.posx > AppViewModel.canvasize.width)
		this.posx = - this.model.img.width;

	if (this.posx < -this.model.img.width)
		this.posx = AppViewModel.canvasize.width;

	if (this.posy > AppViewModel.canvasize.height) {
		this.RandomStartPosition();
		this.pursuit = true;
	}
};

Navette.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);
	switch (this.mvtype) {
		case 1: case 2:
			if (this.fireLazernium != null) this.fireLazernium.Draw(ctx);
			ctx.drawImage(this.model.img, this.posx, this.posy);
			break;

		case 3:
			if (this.fireLazernium != null) this.fireLazernium.Draw(ctx);
			ctx.save();
			ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
			ctx.rotate(this.ang - 90 * Math.PI / 180);
			ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
			ctx.restore();
			break;
	}

	this.DrawQuadTree(ctx, this.posx, this.posy);
};

Navette.prototype.DrawShadow = function (ctx) {

	if (this.model.imgShadow == null) return;

	switch (this.mvtype) {
		case 1: case 2:
			ctx.drawImage(this.model.imgShadow, this.posx + shadow.dx, this.posy + shadow.dy,
				this.model.imgShadow.width * shadow.factor, this.model.imgShadow.height * shadow.factor);
			break;

		case 3:
			ctx.save();
			ctx.translate(this.posx + this.model.imgShadow.width / 2 + shadow.dx, this.posy + this.model.imgShadow.height / 2 + shadow.dy);
			ctx.rotate(this.ang - 90 * Math.PI / 180);
			ctx.drawImage(this.model.imgShadow, -this.model.imgShadow.width / 2, -this.model.imgShadow.height / 2,
				this.model.imgShadow.width * shadow.factor, this.model.imgShadow.height * shadow.factor);
			ctx.restore();
			break;
	}
};

Navette.prototype.Collide = function (entity) {

	if (entity.model.isBonus == true) return false;

	// Pas de bouclier on fait le test de collision général
	if (this.ShieldForce == 0) {
		if (Collide(entity, this) == true) {
			entity.Hit();
			this.HitDegat(entity.model.degat);
			if (entity == Goldo) this.SetNoValid();

			if (this.IsValid() == false && entity != Goldo) {
				AppViewModel.points += this.model.points;
			}
			return true;
		}
		return false;
	}

	var xcenter = this.posx + this.model.img.width / 2;
	var ycenter = this.posy + this.model.img.height / 2;

	var entxcenter = entity.posx + entity.model.img.width / 2;
	var entycenter = entity.posy + entity.model.img.height / 2;

	var squaredist = (xcenter - entxcenter) * (xcenter - entxcenter)
		+ (ycenter - entycenter) * (ycenter - entycenter);

	squaredist -= this.ShieldRadius * this.ShieldRadius * 2 + entity.radius * entity.radius;

	if (squaredist <= 0) {
		this.ShieldForce -= entity.model.degat;
		this.SetShieldForce(this.ShieldForce);

		entity.Hit();
		if (this.ShieldForce == 0) {
			if (entity == Goldo) this.SetNoValid();
		}

		if (this.IsValid() == false && entity != Goldo) {
			AppViewModel.points += this.model.points;
		}
		return true;
	}

	return false;
};

Navette.prototype.SetShieldForce = function (value) {
	this.ShieldForce = value;
	if (this.ShieldForce < 0) this.ShieldForce = 0;
	this.ShieldRadius = this.radius + this.ShieldForce;

	this.rect.x = -this.ShieldRadius;
	this.rect.y = -this.ShieldRadius;
	this.rect.cx = this.ShieldRadius * 2;
	this.rect.cy = this.ShieldRadius * 2;
};

Navette.prototype.DecreaseShieldForce = function (dec) {
	this.ShieldForce -= dec;
	this.SetShieldForce(this.ShieldForce);
};

Navette.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};



function Navette02() {

	Navette.call(this);
}

Navette02.prototype = Object.create(Navette.prototype);
Navette02.prototype.constructor = Navette02;

Navette02.prototype.Init = function (mvtype) {

	if (mvtype != undefined) this.mvtype = mvtype;

	this.SetModel(loader.GetModel('navette02'));
	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;

	this.posy = -this.model.img.height * randomUniform(1, 10);
	this.speed = randomUniform(150, 300);

	switch (this.mvtype) {
		case 2: this.ang = randomUniform(0, 359); break;
		case 3: this.ang = 90 * Math.PI / 180; break;
	}

	if (randomUniform(1, 10) < 6) {
		this.fireLazernium = new Lazernium(this, (this.mvtype == 3), false, "LazerNavette");
		this.fireLazernium.Init();
	}

	this.ShieldForce = 0;
	this.ShieldRadius = this.radius;
	this.valid = true;
};


function Navette03() {

	Navette.call(this);
}

Navette03.prototype = Object.create(Navette.prototype);
Navette03.prototype.constructor = Navette03;

Navette03.prototype.Init = function (mvtype) {

	if (mvtype != undefined) this.mvtype = mvtype;

	this.SetModel(loader.GetModel('navette03'));
	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;

	this.posy = -this.model.img.height * randomUniform(1, 10);
	this.speed = randomUniform(150, 300);

	switch (this.mvtype) {
		case 2: this.ang = randomUniform(0, 359); break;
		case 3: this.ang = 90 * Math.PI / 180; break;
	}

	if (randomUniform(1, 10) < 6) {
		this.fireLazernium = new Lazernium(this, (this.mvtype == 3), false, "LazerNavette02");
		this.fireLazernium.Init();
	}

	this.ShieldForce = 0;
	this.ShieldRadius = this.radius;
	this.valid = true;
};


function CyberMine() {

	Entity.call(this);
	this.ang = 0;
}

CyberMine.prototype = Object.create(Entity.prototype);
CyberMine.prototype.constructor = CyberMine;

CyberMine.prototype.Init = function () {

	this.SetModel(loader.GetModel('CyberMine'));

	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;
	this.posy = -this.model.img.height * randomUniform(1, 10);
	this.ang = randomUniform(0, 359);
	this.valid = true;
	this.dx = 0;
	this.dy = 1;

	this.hasPlayedSound = false;
};

CyberMine.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	var speed = this.speed * deltaTime;
	this.ang += model.speedRot * deltaTime;

	var ddx = Goldo.posx - this.posx;
	var ddy = Goldo.posy - this.posy;
	var len = Math.sqrt(ddx * ddx + ddy * ddy);

	if (len < 650) {
		this.dx = ddx / len;
		this.dy = ddy / len;
		this.dy = Math.abs(this.dy);
	}

	if (len < 500) {
		speed *= 1.5;
		if (this.hasPlayedSound == false) {
			loader.PlaySound('CyberMine', 0.5);
			this.hasPlayedSound = true;
		}
	}
	this.posx += this.dx * speed;
	this.posy += this.dy * speed;

	if (this.posx < -this.model.img.width
		|| this.posx > AppViewModel.canvasize.width
		|| this.posy > AppViewModel.canvasize.height) {
		this.SetNoValid();
	}

};

CyberMine.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.ang * Math.PI / 180);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();
};


CyberMine.prototype.Collide = function (entity) {

	if (entity.model.isBonus == true) return false;

	if (CollideCircle(this, this.radius, entity, entity.radius) == false) return false;

	entity.Hit();
	this.Hit();

	// if (entity.model.isMissil == false)
	if (entity == Goldo) {
		this.SetNoValid();
		NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}

	if (this.IsValid() == false) AppViewModel.points += entity.model.points;

	return true;
};

CyberMine.prototype.OnEnded = function () {
	if (this.vie <= 0) {
		NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};

CyberMine.prototype.IsStopMissil = function () {
	return true;
};


function NavetteMissil(navetteType, lazerType, missilType) {

	Navette.call(this);

	this.navetteType = navetteType;
	this.lazerType = lazerType;
	this.missilType = missilType;
	this.missilRampes = new Array();
	this.navetteLazerniumLarge = null;

	this.GetLazerniumPos = function () {
		return new Vector(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
}

NavetteMissil.prototype = Object.create(Navette.prototype);
NavetteMissil.prototype.constructor = NavetteMissil;

NavetteMissil.prototype.Init = function (mvtype) {

	if (mvtype != undefined) this.mvtype = mvtype;

	var modelName;
	switch (this.navetteType) {
		case 2: modelName = 'NavetteMissilRouge'; break;
		case 3: modelName = 'NavetteMissilNoire'; break;
		default: modelName = 'NavetteMissil'; break;
	}

	this.SetModel(loader.GetModel(modelName));
	this.SetMinusRadius();

	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;
	this.posy = -this.model.img.height * randomUniform(1, 10);

	this.speed = 250;

	switch (this.mvtype) {
		case 2: this.ang = randomUniform(0, 359); break;
		case 3: this.ang = 90 * Math.PI / 180; break;
	}

	this.ShieldForce = 0;
	this.ShieldRadius = this.radius;
	this.valid = true;

	var relposx = 0;
	var relposy = 0;
	for (var i = 1; i <= 2; i++) {
		switch (i) {
			case 1: relposx = 25; relposy = 30; break;
			// case 2:relposx = 46; relposy = 72;break;
			// case 3:relposx = 70;relposy = 70;break;
			case 2: relposx = 91; relposy = 27; break;
		}

		var rampe = new MissilRampe(this, relposx, relposy);
		rampe.TypeMissil = this.missilType;
		this.missilRampes.push(rampe);
	}

	this.fireLazernium = null;
	if (this.lazerType == 1) {
		this.fireLazernium = new Lazernium(this, (this.mvtype == 3), false, "LazerNavetteMissil");
		this.fireLazernium.Init();
	}
	else // if (this.lazerType == 2)
	{
		this.navetteLazerniumLarge = new NavetteLazerniumLarge(this, "LazerNavetteMissil");
		this.navetteLazerniumLarge.Init();
	}
};

NavetteMissil.prototype.Animate = function (deltaTime) {

	Navette.prototype.Animate.call(this, deltaTime);

	for (var i = 0; i < this.missilRampes.length; i++) {
		this.missilRampes[i].Animate(deltaTime);
	}

	if (this.navetteLazerniumLarge != null)
		this.navetteLazerniumLarge.Animate(deltaTime);
};

NavetteMissil.prototype.IsStopMissil = function () {
	return true;
};

NavetteMissil.prototype.Draw = function (ctx) {

	if (this.navetteLazerniumLarge != null)
		this.navetteLazerniumLarge.Draw(ctx);
	Navette.prototype.Draw.call(this, ctx);
}



function GrandeNavette() {

	Navette.call(this);
	this.modshield = loader.GetModel('NavetteShield');
}

GrandeNavette.prototype = Object.create(Navette.prototype);
GrandeNavette.prototype.constructor = GrandeNavette;

GrandeNavette.prototype.Init = function () {

	this.SetModel(loader.GetModel('GrandeNavette'));

	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;
	this.posy = -this.model.img.height * randomUniform(1, 10);
	this.speed = randomUniform(150, 300);

	this.mvtype = randomUniform(1, 10) < 6 ? 1 : 2;
	if (this.mvtype == 2) {
		this.ang = randomUniform(0, 359);
	}

	if (randomUniform(1, 10) < 6) {
		this.fireLazernium = new Lazernium(this, false, false, "GrandeNavetteLazer");
		this.fireLazernium.Init();
	}

	this.SetShieldForce(35);
	this.valid = true;
};

GrandeNavette.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	if (this.fireLazernium != null) this.fireLazernium.Draw(ctx);
	ctx.drawImage(this.model.img, this.posx, this.posy);

	this.DrawQuadTree(ctx, this.posx, this.posy);

	// if (this.ShieldForce > this.radius)
	if (this.ShieldForce > 0) {
		DrawCircle(ctx,
			this.posx + this.model.img.width / 2,
			this.posy + this.model.img.height / 2,
			this.ShieldRadius);

		ctx.drawImage(this.modshield.img,
			this.posx + this.model.img.width / 2 - this.ShieldRadius,
			this.posy + this.model.img.height / 2 - this.ShieldRadius,
			this.ShieldRadius * 2, this.ShieldRadius * 2);
	}
};

GrandeNavette.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};

GrandeNavette.prototype.IsStopMissil = function () {
	return true;
};


function NavettePique() {

	Navette.call(this);
	this.modCorps = loader.GetModel('NavetteCorpPique');
	this.degret = 0;
	this.FireToTargeTime = 0;
	this.FireToTargeMaxTime = randomUniform(3, 8);

	this.NewMissil = function (degret) {
		var missil = new Missil(1);

		var missilmodel = loader.GetModel('Pique');
		missil.SetModel(missilmodel);
		missil.speed = missilmodel.speed;

		var dx = Math.cos(degret * Math.PI / 180);
		var dy = Math.sin(degret * Math.PI / 180);

		missil.SetFireDirection(
			this.posx + this.model.img.width / 2 + missilmodel.img.width / 2,
			this.posy + this.model.img.height / 2 + missilmodel.img.height / 2,
			dx, dy);

		missilList.AddObject(missil);
	};

	this.EndFire = function () {

		var deginc = 360 / 12;
		for (var i = 0; i <= 11; i++) {
			var deg = this.degret + deginc * i;
			this.NewMissil(deg);
		}
	};

	this.FireToTarget = function (target) {

		var dirx = target.posx + target.model.img.width / 2;
		var diry = target.posy + target.model.img.height / 2;

		dirx -= this.posx + this.model.img.width / 2;
		diry -= this.posy + this.model.img.height / 2;

		var dir = new Vector(dirx, diry);
		dir.Normalize();

		var missil = new Missil(1);
		var missilmodel = loader.GetModel('Pique');
		missil.SetModel(missilmodel);
		missil.speed = missilmodel.speed;

		missil.SetFireDirection(
			this.posx + this.model.img.width / 2 + missilmodel.img.width / 2,
			this.posy + this.model.img.height / 2 + missilmodel.img.height / 2,
			dir.x, dir.y);

		missilList.AddObject(missil);
	};
}

NavettePique.prototype = Object.create(Navette.prototype);
NavettePique.prototype.constructor = NavettePique;

NavettePique.prototype.Init = function () {

	this.SetModel(loader.GetModel('NavettePique')); // NavetteCorpPique NavettePique

	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;

	this.posy = -this.model.img.height * randomUniform(1, 10);
	this.speed = randomUniform(150, 300);

	this.mvtype = randomUniform(1, 10) < 6 ? 1 : 2;
	if (this.mvtype == 2) {
		this.ang = randomUniform(0, 359);
	}

	if (randomUniform(1, 10) < 6) {
		this.fireLazernium = new Lazernium(this, false, true, "LazerPique");
		this.fireLazernium.Init();
	}

	this.valid = true;
};

NavettePique.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.degret * Math.PI / 180);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();

	if (this.fireLazernium != null) this.fireLazernium.Draw(ctx);
	ctx.drawImage(this.modCorps.img,
		this.posx + this.model.img.width / 2 - this.modCorps.img.width / 2,
		this.posy + this.model.img.height / 2 - this.modCorps.img.width / 2);

	this.DrawQuadTree(ctx, this.posx, this.posy);
};

NavettePique.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
		this.EndFire();
	}
};

NavettePique.prototype.IsStopMissil = function () {
	return true;
};

NavettePique.prototype.IsStopMissil = function () {
	return true;
};

NavettePique.prototype.DrawShadow = function (ctx) {

	if (this.modCorps.imgShadow != null && this.model.imgShadow != null) {
		ctx.save();
		ctx.translate(this.posx + this.model.imgShadow.width / 2 + shadow.dx
			, this.posy + this.model.img.height / 2 + shadow.dy);
		ctx.rotate(this.degret * Math.PI / 180);
		ctx.drawImage(this.model.imgShadow, -this.model.imgShadow.width / 2, -this.model.imgShadow.height / 2);
		ctx.restore();

		ctx.drawImage(this.modCorps.imgShadow,
			this.posx + this.model.imgShadow.width / 2 - this.modCorps.imgShadow.width / 2 + shadow.dx,
			this.posy + this.model.imgShadow.height / 2 - this.modCorps.imgShadow.width / 2 + shadow.dy);
	}
};

NavettePique.prototype.Animate = function (deltaTime) {
	Navette.prototype.Animate.call(this, deltaTime);
	this.degret += 150 * deltaTime;

	this.FireToTargeTime += deltaTime;
	if (this.posy >= 0 && this.FireToTargeTime > this.FireToTargeMaxTime) {
		this.FireToTargeTime = 0;
		this.FireToTarget(Goldo);

		this.FireToTargeMaxTime = randomUniform(3, 8);
	}
}





function NavetteFoudre(mvtype) {
	Navette.call(this);

	this.mvtype = mvtype;

	this.diskModel = loader.GetModel('NavetteFoudreDisk');
	this.foudreMod = loader.GetModel('FoudreMap1');

	this.foudres = new Array();
	this.heightToSetNoValid = 0;
	this.ang = 0;
}

NavetteFoudre.prototype = Object.create(Navette.prototype);
NavetteFoudre.prototype.constructor = NavetteFoudre;

NavetteFoudre.prototype.Init = function (mvtype) {

	if (mvtype != undefined) this.mvtype = mvtype;

	this.SetModel(loader.GetModel('NavetteFoudreBody'));
	this.SetMinusRadius();

	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;
	this.posy = -this.model.img.height * randomUniform(1, 10);

	this.speed = this.model.speed;

	this.diskAng = randomUniform(0, 360);
	this.diskSpeedRot = this.model.speedRot + randomUniform(50, 150);
	this.diskSpeedRot = (randomUniform(1, 11) < 6) ? this.diskSpeedRot : -this.diskSpeedRot;

	if (this.mvtype == 2) {
		this.ang = randomUniform(0, 359);
	}

	this.ShieldForce = 0;
	this.ShieldRadius = 0;
	this.valid = true;

	var foudreAng = randomUniform(0, 360);
	for (var i = 1; i <= 4; i++) {
		var foudre = new FoudreLazernium(this);
		foudre.Init(foudreAng, this.diskSpeedRot);
		this.foudres.push(foudre);
		foudreAng += 90;

	}

	this.heightToSetNoValid = this.foudreMod.img.height;
};

NavetteFoudre.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;

	switch (this.mvtype) {
		// Descendre seulement
		case 1:
			this.posy += this.speed * deltaTime;
			break;

		// Oscilation
		case 2:
			this.ang += 1;
			this.posy += this.speed * deltaTime;
			this.posx += (Math.sin(this.ang * Math.PI / 180) * 2);
			break;
	}

	if (this.posx > (AppViewModel.canvasize.width + this.heightToSetNoValid))
		this.posx = - this.model.img.width;

	if (this.posx < -(this.model.img.width + this.heightToSetNoValid))
		this.posx = AppViewModel.canvasize.width;

	if (this.posy > (AppViewModel.canvasize.height + this.heightToSetNoValid)) {
		this.SetNoValid();
	}

	this.diskAng += this.diskSpeedRot * deltaTime;

	for (var i = 0; i <= 3; i++) {
		this.foudres[i].Animate(deltaTime);
	}
};

NavetteFoudre.prototype.IsStopMissil = function () {
	return true;
};

NavetteFoudre.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	for (var i = 0; i <= 3; i++) {
		this.foudres[i].Draw(ctx);
	}

	// Dessiner le disque d'abord
	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.diskAng * Math.PI / 180);
	ctx.drawImage(this.diskModel.img, -this.diskModel.img.width / 2, -this.diskModel.img.height / 2);
	ctx.restore();

	// Dessiner le body
	ctx.drawImage(this.model.img, this.posx, this.posy);

	this.DrawQuadTree(ctx, this.posx, this.posy);
};

NavetteFoudre.prototype.OnEnded = function () {
	if (this.vie <= 0) {
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};





// defaultDir est de type Vector
function MissilRampe(ParentEntity, relposx, relposy, defaultDir) {
	FireEntity.call(this, ParentEntity);
	this.relposx = relposx;
	this.relposy = relposy;
	this.defaultDir = (defaultDir == undefined) ? null : defaultDir;

	this.lastFireTime = 0;
	this.FireTimeIteration = randomUniform(1000, 4000) / 1000;
	this.TypeMissil = 3;

	this.Fire = function () {

		var missilModel = loader.GetModel('Missil05');
		var missilposy = this.Parent.posy + this.relposy - missilModel.img.height / 2;

		if (missilposy > Goldo.posy) return;

		var missil;
		if (this.TypeMissil == 3) missil = new Missil(randomUniform(1, 3));
		else missil = new Missil(this.TypeMissil);

		missil.SetModel(missilModel);
		missil.speed = missilModel.speed;
		missil.speedRot = missilModel.speedRot;

		if (this.defaultDir != null) missil.SetFireDirection(0, 0, this.defaultDir.x, this.defaultDir.y);
		else missil.SetFireDirection(0, 0, this.Parent.dx, this.Parent.dy);

		missil.posx = this.Parent.posx + this.relposx - missilModel.img.width / 2;
		missil.posy = missilposy;

		entityList.AddObject(missil);

		loader.PlaySound('Missil', 0.15);
	};
}

MissilRampe.prototype = Object.create(FireEntity.prototype);
MissilRampe.prototype.constructor = MissilRampe;

MissilRampe.prototype.Animate = function (deltaTime) {

	this.lastFireTime += deltaTime;
	if (this.lastFireTime > this.FireTimeIteration) {
		this.lastFireTime = 0;
		this.FireTimeIteration = randomUniform(1000, 4000) / 1000;
		this.Fire();
	}
};

function SoucoupeAmirale() {

	Entity.call(this);
	this.vie = 0;
	this.depx = 1;

	this.missilRampes = new Array();

	this.amiraleLazernium01 = null;
	this.amiraleLazernium02 = null;


	this.RandomStartPosition = function () {
		this.posx = randomUniform(0, AppViewModel.canvasize.width - this.model.img.width);
		this.posy = -this.model.img.height;

		this.dx = Goldo.posx - this.posx;
		this.dy = Goldo.posy - this.posy;
		var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
		this.dx /= len;
		this.dy /= len;
	};
}

SoucoupeAmirale.prototype = Object.create(Entity.prototype);
SoucoupeAmirale.prototype.constructor = SoucoupeAmirale;

SoucoupeAmirale.prototype.Init = function () {
	this.RandomStartPosition();
	this.valid = true;

	var relposx = 0;
	var relposy = 0;
	for (var i = 1; i <= 6; i++) {
		switch (i) {
			case 1: relposx = 94; relposy = 222; break;
			case 2: relposx = 132; relposy = 239; break;
			case 3: relposx = 166; relposy = 252; break;
			case 4: relposx = 296; relposy = 279; break;
			case 5: relposx = 331; relposy = 281; break;
			case 6: relposx = 361; relposy = 282; break;
		}
		var rampe = new MissilRampe(this, relposx, relposy, new Vector(0, 1));
		this.missilRampes.push(rampe);
	}

	this.amiraleLazernium01 = new AmiraleLazernium(this, 302, 8, 'SoucoupeAmiraleRayon');
	this.amiraleLazernium02 = new AmiraleLazernium(this, 218, 358, 'SoucoupeAmiraleRayon');
	this.amiraleLazernium01.Init();
	this.amiraleLazernium02.Init();
};

SoucoupeAmirale.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;
	this.posx += this.dx * this.speed * deltaTime;
	this.posy += this.dy * this.speed * deltaTime;

	if (this.posx >= AppViewModel.canvasize.width - this.model.img.width) {
		this.posx = AppViewModel.canvasize.width - this.model.img.width - 1;
		this.dx = - this.dx;
	}
	else if (this.posx <= 0) {
		this.posx = 1;
		this.dx = - this.dx;
	}

	if (this.posy > AppViewModel.canvasize.height) {
		this.depx = (Goldo.posx < this.posx) ? -1 : 1;
		this.RandomStartPosition();
	}

	for (var i = 0; i < this.missilRampes.length; i++) {
		this.missilRampes[i].Animate(deltaTime);
	}

	this.amiraleLazernium01.Animate(deltaTime);
	this.amiraleLazernium02.Animate(deltaTime);
};

SoucoupeAmirale.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	ctx.drawImage(this.model.img, this.posx, this.posy);
	this.DrawQuadTree(ctx, this.posx, this.posy);

	this.amiraleLazernium01.Draw(ctx);
	this.amiraleLazernium02.Draw(ctx);

	// DrawCircle (ctx,this.posx + this.rect.cx / 2, this.posy + this.rect.cy / 2, this.radius);
	// DrawRect (ctx,this.posx,this.posy,this.rect.cx,this.rect.cy);	
};

SoucoupeAmirale.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};

SoucoupeAmirale.prototype.IsStopMissil = function () {
	return true;
};




function TentaculeData(relposx, relposy, tentaculeNo) {
	this.relposx = relposx;
	this.relposy = relposy;
	this.model = loader.GetModel('TentaculesMap' + tentaculeNo);
}

TentaculeData.prototype = Object.create(Entity.prototype);
TentaculeData.prototype.constructor = TentaculeData;

function Tentacule(ParentEntity, Tentacule01, Tentacule02) {

	Entity.call(this);

	this.ParentEntity = ParentEntity;

	this.Tentacule01 = Tentacule01;
	this.Tentacule02 = Tentacule02;

	this.CurTentacule = (randomUniform(1, 11) < 6) ? this.Tentacule01 : this.Tentacule02;

	this.lastTimeAnimation = 0;
	this.NextTimeAnimation = randomUniform(1000, 2000) / 1000;

	this.SetModel(this.CurTentacule.model);
}

Tentacule.prototype = Object.create(Entity.prototype);
Tentacule.prototype.constructor = Tentacule;

Tentacule.prototype.Animate = function (deltaTime) {

	this.lastTimeAnimation += deltaTime;
	if (this.lastTimeAnimation > this.NextTimeAnimation) {
		this.lastTimeAnimation = 0;
		this.NextTimeAnimation = randomUniform(200, 800) / 1000;
		this.CurTentacule = (this.CurTentacule == this.Tentacule01) ? this.Tentacule02 : this.Tentacule01;
		this.model = this.CurTentacule.model;
	}

	this.posx = this.ParentEntity.posx + this.CurTentacule.relposx;
	this.posy = this.ParentEntity.posy + this.CurTentacule.relposy;
};

Tentacule.prototype.IsStopMissil = function () {
	return true;
};

Tentacule.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};

Tentacule.prototype.DrawFromOwner = function (ctx) {
	ctx.drawImage(this.model.img, this.posx, this.posy);
	this.DrawQuadTree(ctx, this.posx, this.posy);
}


function SoucoupeMinos() {

	Entity.call(this);
	this.vie = 0;
	this.depx = 1;

	this.minosLazernium = null;
	this.missilRampes = new Array();

	this.Tentacules = new Array();

	this.RandomStartPosition = function () {
		this.posx = randomUniform(0, AppViewModel.canvasize.width - this.model.img.width);
		this.posy = -this.model.img.height;

		this.dx = Goldo.posx - this.posx;
		this.dy = Goldo.posy - this.posy;
		var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
		this.dx /= len;
		this.dy /= len;
	};

	this.InitTentacules = function () {

		var tentacule = null;
		var data01 = null;
		var data02 = null;
		for (var i = 1; i <= 8; i += 1) {
			var imageNo = 1 + (i - 1) * 2;

			// Coordonées des tentacules
			switch (i) {
				// 361, 532		341, 557
				case 1:
					data01 = new TentaculeData(361, 532, imageNo);
					data02 = new TentaculeData(341, 557, imageNo + 1);
					break;

				// 465, 365		450, 398
				case 2:
					data01 = new TentaculeData(465, 365, imageNo);
					data02 = new TentaculeData(450, 398, imageNo + 1);
					break;

				// 455, 225		462, 256
				case 3:
					data01 = new TentaculeData(455, 225, imageNo);
					data02 = new TentaculeData(462, 256, imageNo + 1);
					break;

				// 354, 70		385, 100
				case 4:
					data01 = new TentaculeData(354, 70, imageNo);
					data02 = new TentaculeData(385, 100, imageNo + 1);
					break;

				// -58, 533		-38, 557
				case 5:
					data01 = new TentaculeData(-58, 533, imageNo);
					data02 = new TentaculeData(-38, 557, imageNo + 1);
					break;

				// -163, 364	-146, 398
				case 6:
					data01 = new TentaculeData(-163, 364, imageNo);
					data02 = new TentaculeData(-146, 398, imageNo + 1);
					break;

				// -154, 225	-163, 255
				case 7:
					data01 = new TentaculeData(-154, 225, imageNo);
					data02 = new TentaculeData(-163, 255, imageNo + 1);
					break;

				// -38, 56		-71, 87
				case 8:
					data01 = new TentaculeData(-38, 56, imageNo);
					data02 = new TentaculeData(-71, 87, imageNo + 1);
					break;
			}

			tentacule = new Tentacule(this, data01, data02);
			this.Tentacules.push(tentacule);
			entityList.AddObject(tentacule);
		}
	}

	this.GetLazerniumPos = function () {

		return new Vector(this.posx + 250, this.posy + 735);
	}
}

SoucoupeMinos.prototype = Object.create(Entity.prototype);
SoucoupeMinos.prototype.constructor = SoucoupeMinos;

SoucoupeMinos.prototype.Init = function () {
	this.RandomStartPosition();
	this.valid = true;
	this.InitTentacules();

	this.minosLazernium = new MinosLazernium(this, 'MinosFireBodyMap1');
	this.minosLazernium.Init();

	var relposx = 0;
	var relposy = 0;
	for (var i = 1; i <= 2; i++) {
		switch (i) {
			case 1: relposx = 80; relposy = 400; break;
			case 2: relposx = 425; relposy = 400; break;
		}

		var rampe = new MissilRampe(this, relposx, relposy, new Vector(0, 1));
		rampe.TypeMissil = 2; // Missil a tete chercheuse
		this.missilRampes.push(rampe);
	}
};

SoucoupeMinos.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;
	this.posx += this.dx * this.speed * deltaTime;
	this.posy += this.dy * this.speed * deltaTime;

	if (this.posx >= AppViewModel.canvasize.width - this.model.img.width) {
		this.posx = AppViewModel.canvasize.width - this.model.img.width - 1;
		this.dx = - this.dx;
	}
	else if (this.posx <= 0) {
		this.posx = 1;
		this.dx = - this.dx;
	}

	if (this.posy > AppViewModel.canvasize.height) {
		this.depx = (Goldo.posx < this.posx) ? -1 : 1;
		this.RandomStartPosition();
		this.minosLazernium.ResetTiming();
	}

	// this.minosLazernium.Animate (deltaTime);
	if (this.posy + this.model.img.height < AppViewModel.canvasize.height) {
		this.minosLazernium.Animate(deltaTime);
	}
	else if (this.minosLazernium.InFire == true) {
		this.minosLazernium.ResetTiming();
	}

	for (var i = 0; i < this.missilRampes.length; i++) {
		this.missilRampes[i].Animate(deltaTime);
	}
};

SoucoupeMinos.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	for (var i = 0; i < this.Tentacules.length; i++) {
		if (this.Tentacules[i].IsValid())
			this.Tentacules[i].DrawFromOwner(ctx);
	}

	ctx.drawImage(this.model.img, this.posx, this.posy);
	this.DrawQuadTree(ctx, this.posx, this.posy);

	this.minosLazernium.Draw(ctx);
};

SoucoupeMinos.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		for (var i = 0; i < this.Tentacules.length; i++) {
			this.Tentacules[i].SetNoValid();
		}

		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};

SoucoupeMinos.prototype.IsStopMissil = function () {
	return true;
};



function MissilGamma() {
	Entity.call(this);
}

MissilGamma.prototype = Object.create(Entity.prototype);
MissilGamma.prototype.constructor = MissilGamma;

MissilGamma.prototype.Init = function () {
};

MissilGamma.prototype.Animate = function (deltaTime) {

	// alert ('MissilGamma.prototype.Animate :  ' + this.valid);
	if (this.valid == false) return;

	this.prevposx = this.posx;
	this.prevposy = this.posy;

	this.posy -= this.speed * deltaTime;

	if (this.posy < - this.model.img.height) {
		this.valid = false;
	}
};

MissilGamma.prototype.Draw = function (ctx) {
	if (this.valid == false) return;
	ctx.drawImage(this.model.img, this.posx, this.posy);

	// droite (ctx,this.prevposx,this.prevposy,this.posx,this.posy);	
	this.DrawQuadTree(ctx, this.posx, this.posy);

	// DrawCircle (ctx,this.posx + this.rect.cx / 2, this.posy + this.rect.cy / 2, this.radius);
	// DrawRect (ctx,this.posx,this.posy,this.rect.cx,this.rect.cy);	
};

MissilGamma.prototype.Collide = function (entity) {

	if (this.IsValid() == false) return false;

	if (entity.model.isBonus == true) return false;

	if (Collide(entity, this) == false) return false;

	// Missil gamma plus valide
	this.SetNoValid();

	// Infliger les dégats à la cible
	entity.HitDegat(this.model.degat);
	this.Hit();

	if (entity.IsValid() == false) {
		AppViewModel.points += entity.model.points;
	}
	return true;
}


MissilGamma.prototype.OnEnded = function () {
	if (this.vie <= 0) {
		NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};




function Planitron() {
	Entity.call(this);
	this.lifeduration = 5;
	this.degret = 0;
}

Planitron.prototype = Object.create(Entity.prototype);
Planitron.prototype.constructor = Planitron;

Planitron.prototype.Init = function () {
};

Planitron.prototype.IsValid = function () {
	return (this.valid == true && this.lifeduration > 0) ? true : false;
};

Planitron.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;
	this.lifeduration -= deltaTime;
	if (this.lifeduration <= 0) {
		this.valid = false;
		return;
	}

	this.prevposx = this.posx;
	this.prevposy = this.posy;

	this.posy -= this.speed * deltaTime;
	this.degret += 200 * deltaTime;

	if (this.posy < - this.model.img.height) {
		this.valid = false;
	}
};

Planitron.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.degret * Math.PI / 180);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();

	// droite (ctx,this.prevposx,this.prevposy,this.posx,this.posy);	
	this.DrawQuadTree(ctx, this.posx, this.posy);

	// DrawCircle (ctx,this.posx + this.rect.cx / 2, this.posy + this.rect.cy / 2, this.radius);
	// DrawRect (ctx,this.posx,this.posy,this.rect.cx,this.rect.cy);	
};

Planitron.prototype.DrawShadow = function (ctx) {

	if (this.model.imgShadow != null) {
		ctx.save();
		ctx.translate(
			this.posx + this.model.imgShadow.width / 2 + shadow.dx,
			this.posy + this.model.imgShadow.height / 2 + shadow.dy);
		ctx.rotate(this.degret * Math.PI / 180);
		ctx.drawImage(this.model.imgShadow, -this.model.imgShadow.width / 2, -this.model.imgShadow.height / 2,
			this.model.imgShadow.width * shadow.factor, this.model.imgShadow.height * shadow.factor);
		ctx.restore();
	}
};

Planitron.prototype.Hit = function () {
};

Planitron.prototype.Collide = function (entity) {

	if (this.IsValid() == false) return false;

	if (entity.model.isBonus == true) return false;

	if (Collide(entity, this) == false) return false;

	// Missil gamma plus valide
	if (entity.IsInvulnerable() || entity.IsStopMissil()) {
		this.SetNoValid();
	}

	// Infliger les dégats à la cible
	entity.HitDegat(this.model.degat);
	if (entity.vie > 0) NewExplosion(this, entity);

	if (entity.IsValid() == false) {
		AppViewModel.points += entity.model.points;
	}
	return true;
}




function MissilSigma() {
	Planitron.call(this);
}

MissilSigma.prototype = Object.create(Planitron.prototype);
MissilSigma.prototype.constructor = MissilSigma;

MissilSigma.prototype.Draw = function (ctx) {
	if (this.valid == false) return;
	ctx.drawImage(this.model.img, this.posx, this.posy);

	// droite (ctx,this.prevposx,this.prevposy,this.posx,this.posy);	
	this.DrawQuadTree(ctx, this.posx, this.posy);

	// DrawCircle (ctx,this.posx + this.rect.cx / 2, this.posy + this.rect.cy / 2, this.radius);
	// DrawRect (ctx,this.posx,this.posy,this.rect.cx,this.rect.cy);	
};

MissilSigma.prototype.Init = function () {
	this.SetModel(loader.GetModel('MissilSigma'));
}


function PyroBombe() {
	Planitron.call(this);
}

PyroBombe.prototype = Object.create(Planitron.prototype);
PyroBombe.prototype.constructor = PyroBombe;

PyroBombe.prototype.Draw = function (ctx) {
	if (this.valid == false) return;
	ctx.drawImage(this.model.img, this.posx, this.posy);

	// droite (ctx,this.prevposx,this.prevposy,this.posx,this.posy);	
	this.DrawQuadTree(ctx, this.posx, this.posy);

	// DrawCircle (ctx,this.posx + this.rect.cx / 2, this.posy + this.rect.cy / 2, this.radius);
	// DrawRect (ctx,this.posx,this.posy,this.rect.cx,this.rect.cy);	
};

PyroBombe.prototype.Init = function () {
	this.SetModel(loader.GetModel('PyroBombe'));
}




function Victorang(EntityOwner) {
	Planitron.call(this);
	this.Owner = EntityOwner;
}

Victorang.prototype = Object.create(Planitron.prototype);
Victorang.prototype.constructor = Victorang;

Victorang.prototype.Draw = function (ctx) {
	if (this.valid == false) return;
	ctx.drawImage(this.model.img, this.posx, this.posy);

	// DrawCircle (ctx,this.posx + this.rect.cx / 2, this.posy + this.rect.cy / 2, this.radius);
	// DrawRect (ctx,this.posx,this.posy,this.rect.cx,this.rect.cy);	
};

Victorang.prototype.Init = function () {
	this.SetModel(loader.GetModel('Victorang'));

	this.posx = this.Owner.posx + this.Owner.model.img.width / 2 - this.model.img.width / 2;
	this.posy = this.Owner.posy;
	this.valid = true;
}





function Deltalame(EntityOwner) {
	Planitron.call(this);
	this.Owner = EntityOwner;
}

Deltalame.prototype = Object.create(Planitron.prototype);
Deltalame.prototype.constructor = Deltalame;

Deltalame.prototype.Draw = function (ctx) {
	if (this.valid == false) return;
	ctx.drawImage(this.model.img, this.posx, this.posy);

	// DrawCircle (ctx,this.posx + this.rect.cx / 2, this.posy + this.rect.cy / 2, this.radius);
	// DrawRect (ctx,this.posx,this.posy,this.rect.cx,this.rect.cy);	
};

Deltalame.prototype.Init = function () {

	this.SetModel(loader.GetModel('DeltaLame'));

	this.posx = this.Owner.posx + this.Owner.model.img.width / 2 - this.model.img.width / 2;
	this.posy = this.Owner.posy;
	this.valid = true;
}






function FulguroPoing(EntityOwner, typePoing) {
	Entity.call(this, EntityOwner);
	this.Owner = EntityOwner;
	this.typePoing = typePoing;
	this.InFire = false;
	this.mvtype = GoldoEnum.mvtPoingNone;
	this.Target = null;
	this.ang = -90 * Math.PI / 180;
	this.FireDuration = 10;

	this.Reset = function () {
		this.valid = false;
		this.InFire = false;
		this.mvtype = GoldoEnum.mvtPoingNone;
		this.UnTarget();
		this.ang = -90 * Math.PI / 180;
	}

	this.UnTarget = function () {
		if (this.TargetNode != null) {
			this.TargetNode.obj.Unsubscribe(this.TargetNode);
			this.TargetNode = null;
			this.Target = null;
		}
	}


	this.GetNearestTarget = function (x, y) {
		this.Target = GetNearestTargetEntity(x, y);
		if (this.Target != null) {
			this.TargetNode = this.Target.Subscribe(this);
		}
		else {
			if (this.mvtype == GoldoEnum.mvtPoingFire) this.mvtype = GoldoEnum.mvtPointBack;
		}
		return this.Target;
	}

	this.AnimateFire = function (deltaTime) {
		if (this.posy < 0
			|| this.posy > AppViewModel.canvasize.height
			|| this.posx < -this.model.img.width
			|| this.posx > AppViewModel.canvasize.width) {
			this.GetNearestTarget(this.posx, this.posy);
		}
		else {
			if (this.Target == null) {
				this.GetNearestTarget(this.posx, this.posy);
			}
			else
				if (this.Target.posy > AppViewModel.canvasize.height
					|| this.Target.posx < -this.Target.model.img.width
					|| this.Target.posx > AppViewModel.canvasize.width) {
					this.GetNearestTarget(this.posx, this.posy);
				}
		}

		if (this.Target == null) return;

		this.FireDuration -= deltaTime;
		if (this.FireDuration <= 0) {
			this.mvtype = GoldoEnum.mvtPointBack;
			return;
		}
		this.PoingSearch(deltaTime, this.Target);

		this.prevposx = this.posx;
		this.prevposy = this.posy;

		this.posx += this.dx * this.speed * deltaTime;
		this.posy += this.dy * this.speed * deltaTime;
	};

	this.AnimateBack = function (deltaTime) {
		this.PoingComeBack();

		this.prevposx = this.posx;
		this.prevposy = this.posy;

		this.posx += this.dx * this.speed * 1.6 * deltaTime;
		this.posy += this.dy * this.speed * 1.6 * deltaTime;

		var ddx = this.Owner.posx + this.Owner.model.img.width / 2 - this.posx;
		var ddy = this.Owner.posy + this.Owner.model.img.height / 2 - this.posy;
		var len = Math.sqrt(ddx * ddx + ddy * ddy);

		if (len <= this.Owner.radius) {
			missilList.RemoveObject(this);
			this.Reset();
		}
	};


	this.GetDirection = function (target) {
		var ddx = target.posx + target.model.img.width / 2 - this.posx;
		var ddy = target.posy + target.model.img.height / 2 - this.posy;
		var len = Math.sqrt(ddx * ddx + ddy * ddy);
		return new Vector(ddx / len, ddy / len);
	};

	this.PoingSearch = function (deltaTime, target) {
		var rottime = this.model.speedRot * Math.PI / 180 * deltaTime;

		var vecdir = this.GetDirection(target);

		var rot = vecdir.y * this.dx - vecdir.x * this.dy;

		if (Math.abs(rottime) > Math.abs(rot)) rottime = Math.abs(rot);
		if (rot < 0) this.ang -= rottime;
		else if (rot > 0) this.ang += rottime;

		this.dx = Math.cos(this.ang);
		this.dy = Math.sin(this.ang);

		this.CalcParam();
	}

	this.PoingComeBack = function () {
		var vecdir = this.GetDirection(this.Owner);
		this.dx = vecdir.x;
		this.dy = vecdir.y;

		this.ang = Math.atan2(this.dy, this.dx);

		this.CalcParam();
	}



	this.CalcParam = function () {

		// Origin bounding box of the image
		var vec1 = new Vector(-this.model.img.width / 2, -this.model.img.height / 2);
		var vec2 = new Vector(this.model.img.width / 2, -this.model.img.height / 2);
		var vec3 = new Vector(this.model.img.width / 2, this.model.img.height / 2);
		var vec4 = new Vector(-this.model.img.width / 2, this.model.img.height / 2);

		// Rotated bounding box of the image
		var mat = new Mat2D(this.dy, -this.dx);
		vec1 = mat.Mul(vec1.x, vec1.y);
		vec2 = mat.Mul(vec2.x, vec2.y);
		vec3 = mat.Mul(vec3.x, vec3.y);
		vec4 = mat.Mul(vec4.x, vec4.y);

		// Get the global bouding bog surround the rotated bouding box
		var left = Math.min(Math.min(Math.min(vec1.x, vec2.x), vec3.x), vec4.x);
		var top = Math.min(Math.min(Math.min(vec1.y, vec2.y), vec3.y), vec4.y);
		var right = Math.max(Math.max(Math.max(vec1.x, vec2.x), vec3.x), vec4.x);
		var bottom = Math.max(Math.max(Math.max(vec1.y, vec2.y), vec3.y), vec4.y);

		// Define the RectSize to use during box dispatching in scape quadtree
		this.rect = new RectSize(left, top, right - left, bottom - top);
	};

}

FulguroPoing.prototype = Object.create(Entity.prototype);
FulguroPoing.prototype.constructor = FulguroPoing;

FulguroPoing.prototype.Fire = function () {
	if (this.InFire == true) return false;

	var vec = this.Owner.GetChildRelPos(this.typePoing);
	var x = this.Owner.posx + vec.x;
	var y = this.Owner.posy + vec.y;

	if (this.GetNearestTarget(x, y) == null) return false;

	this.posx = x;
	this.posy = y;
	this.mvtype = GoldoEnum.mvtPoingFire;
	this.FireDuration = 10;
	this.InFire = true;
	this.valid = true;
	return true;
};

FulguroPoing.prototype.CanDeleted = function () {
	return false;
};

FulguroPoing.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	if (this.mvtype == GoldoEnum.mvtPoingNone) return;

	var angor = (this.mvtype == GoldoEnum.mvtPoingFire) ? 270 : 90;

	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.ang - angor * Math.PI / 180);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();

	/*
		DrawCircle (ctx,this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2, this.radius);
		DrawCircle (ctx,this.posx,this.posy,5);
		DrawRect (ctx,
				this.posx+ this.model.img.width/2  +this.rect.x,
				this.posy+ this.model.img.height/2 +this.rect.y,this.rect.cx,this.rect.cy);
	*/
};

FulguroPoing.prototype.Init = function () {

	this.SetModel(loader.GetModel((this.typePoing == GoldoEnum.PoingGauche) ? 'GoldoPoingFeuGauche' : 'GoldoPoingFeuDroite'));
	this.Reset();
}

FulguroPoing.prototype.IsInvulnerable = function () {
	return true;
};

FulguroPoing.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;
	switch (this.mvtype) {
		case GoldoEnum.mvtPoingFire: this.AnimateFire(deltaTime); break;
		case GoldoEnum.mvtPointBack: this.AnimateBack(deltaTime); break;
	}
}

FulguroPoing.prototype.Collide = function (entity) {

	if (this.mvtype != GoldoEnum.mvtPoingFire) return false;

	if (entity.model.isBonus == true) return false;

	if (Collide(entity, this) == false) return false;

	// Infliger les dégats à la cible
	entity.HitDegat(this.model.degat);
	if (entity.vie > 0) NewExplosion(this, entity);

	if (entity.IsValid() == false) {
		AppViewModel.points += entity.model.points;
	}

	if (entity.IsStopMissil()
		|| (this.TargetNode != null && this.TargetNode.obj == entity)) {
		this.UnTarget();
		this.mvtype = GoldoEnum.mvtPointBack;
	}

	return true;
}

FulguroPoing.prototype.Unsubscribe = function (node) {

	Entity.prototype.Unsubscribe.call(this, node);
	this.GetNearestTarget(this.posx, this.posy);
};

FulguroPoing.prototype.AbortCurentAction = function () {

	this.UnTarget();
	this.FireDuration = 0;
};




















function PanitronExtend(EntityOwner, typePoing) {
	FulguroPoing.call(this, EntityOwner, typePoing);

	this.angRot = randomUniform(1, 360);

	this.AnimateBack = function (deltaTime) {
		this.PoingComeBack();

		this.prevposx = this.posx;
		this.prevposy = this.posy;

		this.posx += this.dx * this.speed * 1.6 * deltaTime;
		this.posy += this.dy * this.speed * 1.6 * deltaTime;

		var ddx = this.Owner.posx + this.Owner.model.img.width / 2 - this.posx;
		var ddy = this.Owner.posy + this.Owner.model.img.height / 2 - this.posy;
		var len = Math.sqrt(ddx * ddx + ddy * ddy);

		if (len <= this.Owner.radius) {
			this.Reset();
			this.mvtype = GoldoEnum.mvtEnd;
		}
	};

	this.PoingSearch = function (deltaTime, target) {
		var rottime = this.model.speedRot * Math.PI / 180 * deltaTime;

		var vecdir = this.GetDirection(target);

		var rot = vecdir.y * this.dx - vecdir.x * this.dy;

		if (Math.abs(rottime) > Math.abs(rot)) rottime = Math.abs(rot);
		if (rot < 0) this.ang -= rottime;
		else if (rot > 0) this.ang += rottime;

		this.dx = Math.cos(this.ang);
		this.dy = Math.sin(this.ang);
	}

	this.PoingComeBack = function () {
		var vecdir = this.GetDirection(this.Owner);
		this.dx = vecdir.x;
		this.dy = vecdir.y;
	}
}

PanitronExtend.prototype = Object.create(FulguroPoing.prototype);
PanitronExtend.prototype.constructor = PanitronExtend;

PanitronExtend.prototype.CanDeleted = function () {
	return false;
};


PanitronExtend.prototype.Init = function () {

	this.SetModel(loader.GetModel('Planitron'));
	this.Reset();
}

PanitronExtend.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;
	FulguroPoing.prototype.Animate.call(this, deltaTime);

	this.angRot += (360 * Math.PI / 180) * deltaTime;
	if (this.mvtype == GoldoEnum.mvtEnd) {
		this.SetNoValid();
	}
}

PanitronExtend.prototype.CanDeleted = function () {
	return true;
};

PanitronExtend.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	if (this.mvtype == GoldoEnum.mvtPoingNone || this.mvtype == GoldoEnum.mvtEnd) return;

	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.angRot);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();
};

PanitronExtend.prototype.CanDeleted = function () {
	return true;
};

/*
PanitronExtend.prototype.OnEnded= function() {
	alert ('OnEnded');
};
*/































function Bonus(BonusName) {

	Entity.call(this);
	this.processFx = null;
	this.BonusName = BonusName;

	this.ProcessBonus = function () {

		if (this.IsValid()) {
			AppViewModel.points += this.model.points;
			this.processFx();
		}
		this.SetNoValid();
	};

	this.WinLife = function () {
		loader.PlaySound('Bonus', 0.15);
		Goldo.vie++;
	};

	this.WinPlanitron = function () {
		loader.PlaySound('Bonus', 0.15);
		Goldo.NbPlanitron++;
		if (Goldo.NbPlanitron > GoldoEnum.maxPlanitron) Goldo.NbPlanitron = GoldoEnum.maxPlanitron;
	};

	this.WinMegavolt = function () {
		loader.PlaySound('MegavoltBonus', 0.8);
		Goldo.EnableMegavolt();
	};

	this.WinAlcorak = function () {
		loader.PlaySound('Bonus', 0.15);
		Goldo.NewAlcorak();
	};

	this.WinFossoirak = function () {
		loader.PlaySound('Bonus', 0.15);
		Goldo.NewFossoirak();
	};

	this.WinVenusiak = function () {
		loader.PlaySound('Bonus', 0.15);
		Goldo.NewVenusiak();
	};

	this.WinOVTerre = function () {
		loader.PlaySound('Bonus', 0.15);
		Goldo.NewOVTerre();
	};

	this.WinMegaMach = function () {
		Goldo.NewMegaMach();
	};

	this.WinCorneAuFulgure = function () {
		loader.PlaySound('BonusCorneAuFulgure', 0.8);
		Goldo.AddCorneAuFulgure();
	};

	this.WinFulguroPoing = function () {
		loader.PlaySound('Bonus', 0.15);
		Goldo.NbFulguropoing++;
		if (Goldo.NbFulguropoing > GoldoEnum.maxFulfuropoing) Goldo.NbFulguropoing = GoldoEnum.maxFulfuropoing;
	};

	this.WinBonusGlKgo = function () {
		loader.PlaySound('Bonus', 0.15);
		AppViewModel.hasBonusGlkGo = true;
	};

	this.WinBonusPlanitronExt = function () {
		loader.PlaySound('Bonus', 0.15);
		Goldo.WinPlanitronExt();
	};



}

Bonus.prototype = Object.create(Entity.prototype);
Bonus.prototype.constructor = Bonus;

Bonus.prototype.Init = function () {

	this.SetModel(loader.GetModel(this.BonusName));
	switch (this.BonusName) {
		case 'Bonus':
		case 'BonusKgo':
			this.processFx = this.WinLife;
			break;

		case 'PlanitronBonus':
			this.processFx = this.WinPlanitron;
			break;

		case 'BonusMegavolt':
			this.processFx = this.WinMegavolt;
			break;

		case 'BonusAlcorak':
			this.processFx = this.WinAlcorak;
			break;

		case 'BonusFossoirak':
			this.processFx = this.WinFossoirak;
			break;

		case 'BonusVenusiak':
			this.processFx = this.WinVenusiak;
			break;

		case 'BonusOVTerre':
			this.processFx = this.WinOVTerre;
			break;

		case 'BonusMegaMach':
			this.processFx = this.WinMegaMach;
			break;

		case 'BonusCorneAuFulgure':
			this.processFx = this.WinCorneAuFulgure;
			break;

		case 'BonusFulguroPoing':
			this.processFx = this.WinFulguroPoing;
			break;

		case 'BonusGlKgo':
			this.processFx = this.WinBonusGlKgo;
			break;

		case 'BonusPlanitronExt':
			this.processFx = this.WinBonusPlanitronExt;
			break;
	}

	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;
	this.posy = -this.model.img.height * randomUniform(1, 10);
	this.speed = randomUniform(200, 400);
	this.valid = true;
};

Bonus.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.posy += this.speed * deltaTime;

	if (this.posy > AppViewModel.canvasize.height) {
		this.SetNoValid();
	}
};

Bonus.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	ctx.drawImage(this.model.img, this.posx, this.posy);
	this.DrawQuadTree(ctx, this.posx, this.posy);
};





function Explosion() {
	Entity.call(this);
	this.indexImage = 0;
	this.spentTime = 0;
	this.rayon = 0;
	this.nbcol = 0;
	this.nbrow = 0;
	this.nbimg = 0;
	this.expwidth = 0;
	this.expheight = 0;

	this.InitExplosion = function InitExplosion(modelname, x, y, nbcol, nbrow, nbimg) {
		this.model = loader.GetModel(modelname);
		this.posx = x;
		this.posy = y;
		this.nbcol = nbcol;
		this.nbrow = nbrow;
		this.nbimg = nbimg;
		this.expwidth = this.model.img.width / nbcol;
		this.expheight = this.model.img.height / nbrow;
		this.sizeFactor = 1;
		this.valid = true;
	};
}

Explosion.prototype = Object.create(Entity.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.Init = function () {
};

Explosion.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.spentTime += deltaTime;

	if (this.spentTime > 0.05) {
		this.indexImage++;
		this.spentTime = 0;
	}

	this.rayon += deltaTime;

	this.posy += scrollZone.Speed * deltaTime;


	if (this.indexImage >= this.nbimg) {
		this.valid = false;
	}
};

Explosion.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	var ix = Math.floor(this.indexImage % this.nbcol);
	var iy = Math.floor(this.indexImage / this.nbcol);

	ctx.drawImage(
		this.model.img,
		ix * this.expwidth,
		iy * this.expheight,
		this.expwidth,
		this.expheight,
		this.posx - this.expwidth / 2 * this.sizeFactor,
		this.posy - this.expheight / 2 * this.sizeFactor,
		this.expwidth * this.sizeFactor,
		this.expheight * this.sizeFactor);
};


function SparkBlue() {
	Entity.call(this);
	this.indexImage = 0;
	this.spentTime = 0;
	this.rayon = 0;
	this.nbcol = 4;
	this.nbrow = 4;
	this.nbimg = 16;
	this.expwidth = 182;
	this.expheight = 206;
	this.valid = true;
	this.model = loader.GetModel('SparkBlue');
}

SparkBlue.prototype = Object.create(Entity.prototype);
SparkBlue.prototype.constructor = SparkBlue;

SparkBlue.prototype.Init = function () {
};

SparkBlue.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.spentTime += deltaTime;

	if (this.spentTime > 0.05) {
		this.indexImage++;
		this.spentTime = 0;
	}

	this.rayon += deltaTime;

	if (this.indexImage >= this.nbimg) {
		this.valid = false;
	}
};

SparkBlue.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	var ix = Math.floor(this.indexImage % this.nbcol);
	var iy = Math.floor(this.indexImage / this.nbcol);

	ctx.globalAlpha = 1 - (this.indexImage / this.nbimg);
	ctx.drawImage(
		this.model.img,
		ix * this.expwidth,
		iy * this.expheight,
		this.expwidth,
		this.expheight, this.posx - this.expwidth / 2, this.posy - this.expheight / 2,
		this.expwidth * 0.8, this.expheight * 0.8);
	ctx.globalAlpha = 1;
};


function FireEntity(ParentEntity) {
	Entity.call(this);

	this.vie = 3;
	this.lastFireTime = 0;
	this.InFire = false;
	this.FireTimeIteration = 5;
	this.NbFire = 1;
	this.Parent = ParentEntity;
	this.Enable = true;
	this.Target = Goldo;
	this.FireDistance = 0
}

FireEntity.prototype = Object.create(Entity.prototype);
FireEntity.prototype.constructor = FireEntity;

FireEntity.prototype.Init = function () {
};

FireEntity.prototype.Animate = function (deltaTime) {

};

FireEntity.prototype.Draw = function (ctx) {
	if (this.Parent != null && this.Parent.IsValid() == false) return;
};

FireEntity.prototype.Hit = function () {
};





function Lazernium(ParentEntity, UseParentAng, TranslationEffect, LazerName) {
	FireEntity.call(this, ParentEntity);

	// this.model = loader.GetModel ('LazerNavette');
	this.model = loader.GetModel(LazerName);
	this.LazerType = (LazerName == "LazerNavette" || LazerName == "LazerPique" || LazerName == "TourelleLazer") ? 1 : 2;
	this.UseParentAng = UseParentAng;
	this.TranslationEffect = TranslationEffect;

	// this.Enable = false;
	this.tmpLazerHeight = 0;
	this.segray = this.model.img.width;
	this.enableExplosion = true;

	this.CollideEntity = function (Target) {
		var cx = Target.posx + Target.model.img.width / 2;
		var cy = Target.posy + Target.model.img.height / 2;

		var x1, y1, x2, y2;

		if (this.LazerType == 1) {
			var x1 = this.Parent.posx + this.Parent.model.img.width / 2 - this.Parent.dy * this.segray / 2;
			var y1 = this.Parent.posy + this.Parent.model.img.height / 2 + this.Parent.dx * this.segray / 2;

			var x2 = x1 + this.Parent.dx * this.tmpLazerHeight;
			var y2 = y1 + this.Parent.dy * this.tmpLazerHeight;

			if (SegmentVsCircle(x1, y1, x2, y2, cx, cy, Target.radius) == true) {
				// alert ('rouge');
				return true;
			}
		}

		x1 = this.Parent.posx + this.Parent.model.img.width / 2;
		y1 = this.Parent.posy + this.Parent.model.img.height / 2;

		x2 = x1 + this.Parent.dx * this.tmpLazerHeight;
		y2 = y1 + this.Parent.dy * this.tmpLazerHeight;

		if (SegmentVsCircle(x1, y1, x2, y2, cx, cy, Target.radius) == true) {
			// alert ('vert');
			return true;
		}

		if (this.LazerType == 1) {
			x1 = this.Parent.posx + this.Parent.model.img.width / 2 + this.Parent.dy * this.segray / 2;
			y1 = this.Parent.posy + this.Parent.model.img.height / 2 - this.Parent.dx * this.segray / 2;

			x2 = x1 + this.Parent.dx * this.tmpLazerHeight;
			y2 = y1 + this.Parent.dy * this.tmpLazerHeight;

			if (SegmentVsCircle(x1, y1, x2, y2, cx, cy, Target.radius) == true) {
				// alert ('bleu');
				return true;
			}
		}

		return false;
	};

	this.ProcessCollision = function () {
		var hasBeenCollision = false;
		var bbox = this.GetProcessCollisionBBox();

		var left = Math.min(bbox.x1, bbox.x2) - this.model.img.width / 2;
		var right = Math.max(bbox.x1, bbox.x2) + this.model.img.width / 2;
		var top = Math.min(bbox.y1, bbox.y2);
		var bottom = Math.max(bbox.y1, bbox.y2);

		var list = Scape.GetNodeRectList(left, top, right, bottom);
		var entityList = new ChainedList();
		var scapeNode = list.firstnode;
		while (scapeNode != null) {
			if (scapeNode.obj.EntityList != null) {
				var entityNode = scapeNode.obj.EntityList.firstnode;
				while (entityNode != null) {
					var entity = entityNode.obj;
					entityNode = entityNode.next;

					if (entity.model.isBonus == true) continue;
					if (entity.model.isMissil == true) continue;
					if (entityList.FindObject(entity) != null) continue;

					if (entity.model.camp != AppViewModel.campVega || this.IsEnableCollideSameCamp()) {
						if (this.CollideEntity(entity)) {
							hasBeenCollision = true;
							// Ne pas appliquer les dégat si l'entité est invulnérable
							// mais ne pas empecher l'explosion pour le visuel
							if (!entity.IsInvulnerable()) entity.Hit();

							this.ResetTiming();

							var cx = entity.posx + entity.model.img.width / 2;
							var cy = entity.posy + entity.model.img.height / 2;

							var dirx = bbox.x1 - cx;
							var diry = bbox.y1 - cy;
							var len = Math.sqrt(dirx * dirx + diry * diry);
							dirx /= len;
							diry /= len;

							var x2 = cx + dirx * entity.radius;
							var y2 = cy + diry * entity.radius;

							if (this.enableExplosion == true) NewExplosionPos(x2, y2);
						}
					}
				}
			}
			scapeNode = scapeNode.next;
		}
		return hasBeenCollision;
	}
}


Lazernium.prototype = Object.create(Entity.prototype);
Lazernium.prototype.constructor = Lazernium;

Lazernium.prototype.GetProcessCollisionBBox = function () {

	var startx = this.Parent.posx + this.Parent.model.img.width / 2;
	var starty = this.Parent.posy + this.Parent.model.img.height / 2;

	var endx = startx + this.Parent.dx * this.tmpLazerHeight;
	var endy = starty + this.Parent.dy * this.tmpLazerHeight;

	return new BBox(startx, starty, endx, endy);
}

Lazernium.prototype.IsEnableCollideSameCamp = function () {

	return false;
}

Lazernium.prototype.ResetTiming = function () {

	this.InFire = false;
}

Lazernium.prototype.Init = function () {

	this.FireDistance = this.model.img.height + 50;
	this.Target = Goldo;

};

Lazernium.prototype.Animate = function (deltaTime) {

	if (this.Enable == false) return;

	if (this.InFire == false) {
		if (this.lastFireTime == 0) {
			// Check the distance from target
			var dx = this.Target.posx - this.Parent.posx;
			var dy = this.Target.posy - this.Parent.posy;
			var squareLen = dx * dx + dy * dy;

			// Check the distance with the target
			if (squareLen > this.FireDistance * this.FireDistance) return;

			// Distance is ok we can start a lazernium fire
			this.lastFireTime = Date.now();
			this.InFire = true;
			this.PlaySound();
		}
		else {
			if (Date.now() - this.lastFireTime > 8000) {
				this.InFire = true;
				this.tmpLazerHeight = 0;
				this.lastFireTime = Date.now();
				this.PlaySound();
			}
		}
	}
	else {
		// this.tmpLazerHeight += this.model.img.height * 2.2 * deltaTime;
		// this.tmpLazerHeight += this.model.img.height * this.model.speed * deltaTime;
		this.tmpLazerHeight += this.model.speed * deltaTime;

		if (this.tmpLazerHeight > this.model.img.height) {
			this.tmpLazerHeight = this.model.img.height;
			this.InFire = false;
		}

		this.ProcessCollision();
	}
};

Lazernium.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;

	var tx = this.Parent.posx + this.Parent.model.img.width / 2;
	var ty = this.Parent.posy + this.Parent.model.img.height / 2;


	ctx.save();
	ctx.translate(tx, ty);
	if (this.UseParentAng == true)
		ctx.rotate(this.Parent.ang - 90 * Math.PI / 180);

	if (this.TranslationEffect == false) {
		// alert ('this.model.img ' + this.model.img);
		ctx.drawImage(
			this.model.img,
			0, 0,
			this.model.img.width, this.tmpLazerHeight,
			-this.model.img.width / 2, 10
			, this.model.img.width, this.tmpLazerHeight);
	}
	else {
		ctx.drawImage(
			this.model.img,
			0, this.model.img.height - this.tmpLazerHeight,
			this.model.img.width, this.tmpLazerHeight,
			-this.model.img.width / 2, 10
			, this.model.img.width, this.tmpLazerHeight);
	}


	ctx.restore();
};

Lazernium.prototype.Hit = function () {
};

Lazernium.prototype.PlaySound = function () {

	loader.PlaySound('Lazernium', 0.5);
};



function GinginLazernium(ParentEntity, LazerName) {
	Lazernium.call(this, ParentEntity, false, true, LazerName);

	this.LazerType = 2;

	this.tmpLazerHeight = 0;
	this.segray = this.model.img.width;
	this.lastFireTime = Date.now();
	this.nextFireTime = randomUniform(1, 6) * 1000;
	this.fireTimeSpent = 0;

	this.angtracker = 0;
	this.trackerdx = 0;
	this.trackerdy = 0;
	this.fireDuration = 1;

	this.CollideEntity = function (Target) {
		var start = this.GetLazerniumStartPos();

		var cx = Target.posx + Target.model.img.width / 2;
		var cy = Target.posy + Target.model.img.height / 2;

		x2 = start.x + this.trackerdx * this.tmpLazerHeight;
		y2 = start.y + this.trackerdy * this.tmpLazerHeight;

		if (SegmentVsCircle(start.x, start.y, x2, y2, cx, cy, Target.radius) == true) {
			return true;
		}

		return false;
	};

	this.InitFire = function () {

		var start = this.GetLazerniumStartPos();

		this.trackerdx = (this.Target.posx + this.Target.model.img.width / 2) - start.x;
		this.trackerdy = (this.Target.posy + this.Target.model.img.height / 2) - start.y;

		var len = Math.sqrt(this.trackerdx * this.trackerdx + this.trackerdy * this.trackerdy);
		this.trackerdx /= len;
		this.trackerdy /= len;

		this.angtracker = Math.atan2(this.trackerdy, this.trackerdx) - Math.PI / 2;
	}

	this.TrackTarget = function (deltaTime) {

		var start = this.GetLazerniumStartPos();
		var rottime = this.model.speedRot * deltaTime * Math.PI / 180;

		var vecx = this.Target.posx + this.Target.model.img.width / 2 - start.x;
		var vecy = this.Target.posy + this.Target.model.img.height / 2 - start.y;

		var len = Math.sqrt(vecx * vecx + vecy * vecy);
		vecx /= len;
		vecy /= len;

		var dot = vecy * this.trackerdx - vecx * this.trackerdy;

		if (Math.abs(rottime) > Math.abs(dot)) rottime = Math.abs(dot);
		if (dot < 0) this.angtracker -= rottime; // * 180 / Math.PI;
		else if (dot > 0) this.angtracker += rottime; // * 180 / Math.PI;

		this.trackerdx = -Math.sin(this.angtracker);
		this.trackerdy = Math.cos(this.angtracker);
	}

	this.FireAnimate = function (deltaTime) {
		if (this.InFire == false) {
			var diftime = Date.now() - this.lastFireTime;
			if (diftime > this.nextFireTime) {
				this.InFire = true;
				this.tmpLazerHeight = 0;
				this.fireTimeSpent = 0;
				this.InitFire();
				this.PlaySound();
			}
		}
		else {

			this.fireTimeSpent += deltaTime;
			if (this.fireTimeSpent > this.fireDuration) {
				this.InFire = false;
				this.lastFireTime = Date.now();
				this.nextFireTime = randomUniform(1, 6) * 1000;
			}
			else {
				this.tmpLazerHeight += this.model.speed * deltaTime;
				if (this.tmpLazerHeight > this.model.img.height) {
					this.tmpLazerHeight = this.model.img.height;
				}

				this.TrackTarget(deltaTime);
				this.ProcessCollision();
			}
		}
	}

	this.DrawRayon = function (ctx, eyeno) {
		var eye = this.Parent.GetCurrentEyePos(eyeno);

		eye.x -= this.trackerdy * this.model.img.width / 2;
		eye.y += this.trackerdx * this.model.img.width / 2;

		ctx.save();
		ctx.translate(eye.x, eye.y);
		ctx.rotate(this.angtracker);

		ctx.drawImage(
			this.model.img, 0, 0,
			this.model.img.width, this.tmpLazerHeight, 0, 0
			, this.model.img.width, this.tmpLazerHeight);
		ctx.restore();
	}
}

GinginLazernium.prototype = Object.create(Lazernium.prototype);
GinginLazernium.prototype.constructor = GinginLazernium;

GinginLazernium.prototype.GetProcessCollisionBBox = function () {

	var eye1 = this.Parent.GetCurrentEyePos(1);
	var eye2 = this.Parent.GetCurrentEyePos(2);

	var startx = (eye1.x + eye2.x) / 2;
	var starty = (eye1.y + eye2.y) / 2;

	var endx = startx + this.trackerdx * this.tmpLazerHeight;
	var endy = starty + this.trackerdy * this.tmpLazerHeight;

	return new BBox(startx, starty, endx, endy);
}

GinginLazernium.prototype.IsEnableCollideSameCamp = function () {

	return true;
}

GinginLazernium.prototype.ResetTiming = function () {
	this.lastFireTime = Date.now();
	this.nextFireTime = randomUniform(1, 6) * 1000;
	this.InFire = false;
	this.fireTimeSpent = 0;
}

GinginLazernium.prototype.GetLazerniumStartPos = function () {

	var eye1 = this.Parent.GetCurrentEyePos(1);
	var eye2 = this.Parent.GetCurrentEyePos(2);

	return new Vector((eye1.x + eye2.x) / 2, (eye1.y + eye2.y) / 2);
}

GinginLazernium.prototype.Init = function () {

	this.Target = Goldo;
};

GinginLazernium.prototype.Animate = function (deltaTime) {

	if (this.Enable == false) return;

	this.FireAnimate(deltaTime);
}

GinginLazernium.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;

	this.DrawRayon(ctx, 1);
	this.DrawRayon(ctx, 2);
}





function ImperialLazernium(ParentEntity, LazerName) {
	GinginLazernium.call(this, ParentEntity, LazerName);

	this.Lazerniums = null;
	this.indexCurLazernium = 1;
	this.nextLazerniumTime = 0;
}

ImperialLazernium.prototype = Object.create(GinginLazernium.prototype);
ImperialLazernium.prototype.constructor = ImperialLazernium;

ImperialLazernium.prototype.GetProcessCollisionBBox = function () {

	var vec = this.Parent.GetLazerniumPos();

	var endx = vec.x + this.trackerdx * this.tmpLazerHeight;
	var endy = vec.y + this.trackerdy * this.tmpLazerHeight;

	return new BBox(vec.x, vec.y, endx, endy);
}

ImperialLazernium.prototype.GetLazerniumStartPos = function () {
	return this.Parent.GetLazerniumPos();
}

ImperialLazernium.prototype.IsEnableCollideSameCamp = function () {
	return false;
}

ImperialLazernium.prototype.Init = function () {

	this.Target = Goldo;
	this.Lazerniums = new Array();
	for (var i = 1; i <= 3; i++) {
		this.Lazerniums[i] = loader.GetModel('LazerImperialMap' + i);
	}
};

ImperialLazernium.prototype.Animate = function (deltaTime) {

	if (this.Enable == false) return;

	this.nextLazerniumTime += deltaTime;
	if (this.nextLazerniumTime > 0.025) {
		this.indexCurLazernium++;
		if (this.indexCurLazernium > 3) this.indexCurLazernium = 1;
		this.nextLazerniumTime = 0;
		this.model = this.Lazerniums[this.indexCurLazernium];
	}

	this.FireAnimate(deltaTime);
}

ImperialLazernium.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;

	var vec = this.Parent.GetLazerniumPos();

	vec.x -= this.trackerdy * this.model.img.width / 2;
	vec.y += this.trackerdx * this.model.img.width / 2;


	ctx.save();
	ctx.translate(vec.x, vec.y);
	ctx.rotate(this.angtracker);

	ctx.drawImage(
		this.model.img, 0, 0,
		this.model.img.width, this.tmpLazerHeight, 0, 0
		, this.model.img.width, this.tmpLazerHeight);
	ctx.restore();
}

ImperialLazernium.prototype.PlaySound = function () {
	loader.PlaySound('ImperialLazernium', 0.4);
};





function ErgastulLazernium(ParentEntity, LazerName) {
	GinginLazernium.call(this, ParentEntity, LazerName);
}

ErgastulLazernium.prototype = Object.create(GinginLazernium.prototype);
ErgastulLazernium.prototype.constructor = ErgastulLazernium;

ErgastulLazernium.prototype.GetProcessCollisionBBox = function () {

	var vec = this.Parent.GetLazerniumPos();

	var endx = vec.x + this.trackerdx * this.tmpLazerHeight;
	var endy = vec.y + this.trackerdy * this.tmpLazerHeight;

	return new BBox(vec.x, vec.y, endx, endy);
}

ErgastulLazernium.prototype.GetLazerniumStartPos = function () {
	return this.Parent.GetLazerniumPos();
}

ErgastulLazernium.prototype.IsEnableCollideSameCamp = function () {
	return false;
}

ErgastulLazernium.prototype.Init = function () {

	this.Target = Goldo;
};

ErgastulLazernium.prototype.Animate = function (deltaTime) {

	if (this.Enable == false) return;
	this.FireAnimate(deltaTime);
}

ErgastulLazernium.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;

	var vec = this.Parent.GetLazerniumPos();

	vec.x -= this.trackerdy * this.model.img.width / 2;
	vec.y += this.trackerdx * this.model.img.width / 2;

	ctx.save();
	ctx.translate(vec.x, vec.y);
	ctx.rotate(this.angtracker);

	ctx.drawImage(
		this.model.img, 0, 0,
		this.model.img.width, this.tmpLazerHeight, 0, 0
		, this.model.img.width, this.tmpLazerHeight);
	ctx.restore();
}


ErgastulLazernium.prototype.PlaySound = function () {
	loader.PlaySound('ImperialLazernium', 0.4);
};





function MinosLazernium(ParentEntity, LazerName) {
	GinginLazernium.call(this, ParentEntity, LazerName);

	this.Lazerniums = null;
	this.LazerniumHeaders = null;
	this.indexCurLazernium = 1;
	this.nextLazerniumTime = 0;
}

MinosLazernium.prototype = Object.create(GinginLazernium.prototype);
MinosLazernium.prototype.constructor = MinosLazernium;

MinosLazernium.prototype.GetProcessCollisionBBox = function () {

	var vec = this.Parent.GetLazerniumPos();

	var endx = vec.x + this.trackerdx * this.tmpLazerHeight;
	var endy = vec.y + this.trackerdy * this.tmpLazerHeight;

	return new BBox(vec.x, vec.y, endx, endy);
}

MinosLazernium.prototype.GetLazerniumStartPos = function () {
	return this.Parent.GetLazerniumPos();
}

MinosLazernium.prototype.IsEnableCollideSameCamp = function () {
	return false;
}

MinosLazernium.prototype.Init = function () {

	this.Target = Goldo;
	this.Lazerniums = new Array();
	this.LazerniumHeaders = new Array();
	for (var i = 1; i <= 3; i++) {
		this.Lazerniums[i] = loader.GetModel('MinosFireBodyMap' + i);
		this.LazerniumHeaders[i] = loader.GetModel('MinosFireHeaderMap' + i);
	}
};

MinosLazernium.prototype.Animate = function (deltaTime) {

	if (this.Enable == false) return;

	this.nextLazerniumTime += deltaTime;
	if (this.nextLazerniumTime > 0.018) {
		this.indexCurLazernium++;
		if (this.indexCurLazernium > 3) this.indexCurLazernium = 1;
		this.nextLazerniumTime = 0;
		this.model = this.Lazerniums[this.indexCurLazernium];
	}

	this.FireAnimate(deltaTime);
}

MinosLazernium.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;

	var vec = this.Parent.GetLazerniumPos();

	vec.x -= this.trackerdy * this.model.img.width / 2;
	vec.y += this.trackerdx * this.model.img.width / 2;

	ctx.save();
	ctx.translate(vec.x, vec.y);
	ctx.rotate(this.angtracker);

	ctx.drawImage(
		this.model.img, 0, 0,
		this.model.img.width, this.tmpLazerHeight, 0, 0
		, this.model.img.width, this.tmpLazerHeight);
	ctx.restore();

	var header = this.LazerniumHeaders[this.indexCurLazernium];
	ctx.drawImage(header.img, this.Parent.posx + 185, this.Parent.posy + 650);
}

MinosLazernium.prototype.PlaySound = function () {
	loader.PlaySound('ImperialLazernium', 0.4);
};

MinosLazernium.prototype.ResetTiming = function () {
	this.lastFireTime = Date.now();
	this.nextFireTime = randomUniform(1, 4) * 1000;
	this.InFire = false;
	this.fireTimeSpent = 0;
	this.tmpLazerHeight = 0;
}





function NavetteLazerniumLarge(ParentEntity, LazerName) {
	GinginLazernium.call(this, ParentEntity, LazerName);

	this.SetModel(loader.GetModel(LazerName));
}

NavetteLazerniumLarge.prototype = Object.create(GinginLazernium.prototype);
NavetteLazerniumLarge.prototype.constructor = NavetteLazerniumLarge;

NavetteLazerniumLarge.prototype.GetProcessCollisionBBox = function () {

	var vec = this.Parent.GetLazerniumPos();

	var endx = vec.x + this.trackerdx * this.tmpLazerHeight;
	var endy = vec.y + this.trackerdy * this.tmpLazerHeight;

	return new BBox(vec.x, vec.y, endx, endy);
}

NavetteLazerniumLarge.prototype.GetLazerniumStartPos = function () {
	return this.Parent.GetLazerniumPos();
}

NavetteLazerniumLarge.prototype.IsEnableCollideSameCamp = function () {
	return false;
}

NavetteLazerniumLarge.prototype.Init = function () {

	this.Target = Goldo;

};

NavetteLazerniumLarge.prototype.PlaySound = function () {
	loader.PlaySound('ImperialLazernium', 0.4);
};

NavetteLazerniumLarge.prototype.Animate = function (deltaTime) {

	if (this.Enable == false) return;


	this.FireAnimate(deltaTime);
}

NavetteLazerniumLarge.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;

	var vec = this.Parent.GetLazerniumPos();

	vec.x -= this.trackerdy * this.model.img.width / 2;
	vec.y += this.trackerdx * this.model.img.width / 2;

	ctx.save();
	ctx.translate(vec.x, vec.y);
	ctx.rotate(this.angtracker);

	ctx.drawImage(
		this.model.img, 0, 0,
		this.model.img.width, this.tmpLazerHeight, 0, 0
		, this.model.img.width, this.tmpLazerHeight);
	ctx.restore();
}





function AmiraleLazernium(ParentEntity, relposx, relposy, LazerName) {
	GinginLazernium.call(this, ParentEntity, LazerName);

	this.relposx = relposx;
	this.relposy = relposy;
	this.fireDuration = 0.9;
}

AmiraleLazernium.prototype = Object.create(GinginLazernium.prototype);
AmiraleLazernium.prototype.constructor = AmiraleLazernium;

AmiraleLazernium.prototype.GetProcessCollisionBBox = function () {

	var vec = this.GetLazerniumStartPos();

	var endx = vec.x + this.trackerdx * this.tmpLazerHeight;
	var endy = vec.y + this.trackerdy * this.tmpLazerHeight;

	return new BBox(vec.x, vec.y, endx, endy);
}

AmiraleLazernium.prototype.GetLazerniumStartPos = function () {
	return new Vector(this.Parent.posx + this.relposx, this.Parent.posy + this.relposy);
}

AmiraleLazernium.prototype.IsEnableCollideSameCamp = function () {
	return false;
}

AmiraleLazernium.prototype.Init = function () {

	this.Target = Goldo;
};

AmiraleLazernium.prototype.Animate = function (deltaTime) {

	if (this.Enable == false) return;

	var startpos = this.GetLazerniumStartPos();
	if (startpos.y <= AppViewModel.canvasize.height) {
		this.FireAnimate(deltaTime);
	}
	else {
		if (this.InFire == true) this.ResetTiming();
	}
}

AmiraleLazernium.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;

	var vec = this.GetLazerniumStartPos();

	vec.x -= this.trackerdy * this.model.img.width / 2;
	vec.y += this.trackerdx * this.model.img.width / 2;

	ctx.save();
	ctx.translate(vec.x, vec.y);
	ctx.rotate(this.angtracker);

	ctx.drawImage(
		this.model.img, 0, 0,
		this.model.img.width, this.tmpLazerHeight, 0, 0
		, this.model.img.width, this.tmpLazerHeight);
	ctx.restore();
}





function FoudreLazernium(ParentEntity) {
	Lazernium.call(this, ParentEntity, false, true, 'FoudreMap1');

	this.foudModels = new Array();
	this.foudreInc = 1;
	this.InFire = true;
	this.ang = 0;
	this.dx = 0;
	this.dy = 0;
	this.curModelIndex = randomUniform(0, 3);
	this.spentFoudreModel = 0;
	this.diskSpeedRot = 0;
	this.enableExplosion = true;
	this.enableExplosionTime = 0;

	this.CollideEntity = function (Target) {
		var cx = Target.posx + Target.model.img.width / 2;
		var cy = Target.posy + Target.model.img.height / 2;

		var bbox = this.GetProcessCollisionBBox();

		return SegmentVsCircle(bbox.x1, bbox.y1, bbox.x2, bbox.y2, cx, cy, Target.radius);
	};
}

FoudreLazernium.prototype = Object.create(Lazernium.prototype);
FoudreLazernium.prototype.constructor = FoudreLazernium;

FoudreLazernium.prototype.GetProcessCollisionBBox = function () {

	var startx = this.dx * this.Parent.radius * 0.8 + this.Parent.posx + this.Parent.model.img.width / 2;
	var starty = this.dy * this.Parent.radius * 0.8 + this.Parent.posy + this.Parent.model.img.height / 2;


	var endx = startx + this.dx * this.tmpLazerHeight;
	var endy = starty + this.dy * this.tmpLazerHeight;

	return new BBox(startx, starty, endx, endy);
}

FoudreLazernium.prototype.ResetTiming = function () {

	this.InFire = true;
}


FoudreLazernium.prototype.Init = function (ang, diskSpeedRot) {

	this.Target = Goldo;
	this.foudModels = new Array();
	for (var i = 0; i <= 2; i++) {
		this.foudModels[i] = loader.GetModel('FoudreMap' + (i + 1));
	}
	this.model = this.foudModels[0];

	this.tmpLazerHeight = randomUniform(0, this.model.img.height);
	this.ang = ang;
	this.dx = Math.cos(this.ang * Math.PI / 180)
	this.dy = Math.sin(this.ang * Math.PI / 180)
	this.diskSpeedRot = diskSpeedRot;
};


FoudreLazernium.prototype.Animate = function (deltaTime) {

	if (this.Enable == false) return;

	this.enableExplosionTime += deltaTime;
	if (this.enableExplosionTime > 1) {
		this.enableExplosion = true;
	}

	this.spentFoudreModel += deltaTime;
	if (this.spentFoudreModel > 0.1) {
		this.curModelIndex++;
		if (this.curModelIndex > 2) this.curModelIndex = 0;
		this.model = this.foudModels[this.curModelIndex];
		this.spentFoudreModel = 0;
	}


	// this.tmpLazerHeight += this.model.img.height * 2.2 * deltaTime;
	// this.tmpLazerHeight += this.model.img.height * this.model.speed * deltaTime;
	this.tmpLazerHeight += this.foudreInc * 500 * deltaTime;
	if (this.tmpLazerHeight > this.model.img.height) {
		this.tmpLazerHeight = this.model.img.height;;
		this.foudreInc = -1;
	}
	else if (this.tmpLazerHeight < 0) {
		this.tmpLazerHeight = 0;
		this.foudreInc = 1;
	}

	this.ang += this.diskSpeedRot * deltaTime;
	this.dx = Math.cos(this.ang * Math.PI / 180)
	this.dy = Math.sin(this.ang * Math.PI / 180)

	if (this.tmpLazerHeight > 0) {
		var hasCollision = this.ProcessCollision();
		if (hasCollision == true) {
			this.enableExplosion = false;
			this.enableExplosionTime = 0;
		}

	}

};


FoudreLazernium.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;





	if (this.tmpLazerHeight > 0) {
		var bbox = this.GetProcessCollisionBBox();

		/*
			ctx.lineWidth = 30;
			ctx.beginPath();
			ctx.moveTo(bbox.x1,bbox.y1);
			ctx.lineTo(bbox.x2,bbox.y2);
			ctx.stroke();			
			ctx.lineWidth = 1;
		*/

		ctx.save();
		ctx.translate(bbox.x1, bbox.y1);
		ctx.rotate(this.ang * Math.PI / 180 - Math.PI / 2);
		ctx.drawImage(
			this.model.img,
			0, this.model.img.height - this.tmpLazerHeight,
			this.model.img.width, this.tmpLazerHeight,
			-this.model.img.width / 2, 10
			, this.model.img.width, this.tmpLazerHeight);

		ctx.restore();
	}


};


FoudreLazernium.prototype.PlaySound = function () {
};





function GoruGoru() {

	Entity.call(this);
	this.depx = 1;
	this.model = loader.GetModel('GoruGoru01');
	this.models = new Array();
	this.currentModelIndex = 0;
	this.lastModelTime = 0;
	this.lastFireTime = 0;
	this.nexFireTime = 0;

	this.mvtype = 1;
	this.ang = 0;
	this.fireLanceFlamme = null;
	this.fireLanceFlammeCourt = null;

	this.NewMissil = function (head) {
		var missil = new Missil(1);
		var pos = this.GetHeadPos(head);
		var soundName;

		if (this.model.name == 'GoruGoru04') {
			missil.SetModel(loader.GetModel('GoruFire02'));
			missil.speed = 850;
			soundName = 'GoruFire';
		}
		else {
			missil.SetModel(loader.GetModel('GoruFire01'));
			missil.speed = 600;
			soundName = 'FireBall';
		}

		missil.Init(pos.x, pos.y, Goldo);
		missilList.AddObject(missil);

		loader.PlaySound(soundName, 0.8);
	};

	this.NewHeadShot = function (head) {
		var missil = new Missil(2);

		var pos = this.GetHeadPos(head);
		var headmod = loader.GetModel((head == 1) ? 'GoruHeadLeft' : 'GoruHeadRight');
		missil.SetModel(headmod);
		missil.speed = headmod.speed;
		missil.vie = headmod.vie;
		missil.Init(pos.x, pos.y, Goldo);
		missilList.AddObject(missil);
	};

	this.RandomStartPosition = function () {
		this.posx = randomUniform(0, AppViewModel.canvasize.width - this.model.img.width);
		this.posy = -this.model.img.height;
	};

	// head 1 left : 2 Right
	this.GetHeadPos = function (head) {
		var vector = this.GetHeadRelativePos(head);
		vector.x += this.posx;
		vector.y += this.posy;
		return vector;
	};

	this.GetHeadRelativePos = function (head) {

		var vector = null;
		if (head == 1) {
			switch (this.currentModelIndex) {
				case 0:
					// vector = new Vector (50 ,155);
					vector = new Vector(47, 328);
					break;

				case 1:
					// vector = new Vector(50, 155);
					vector = new Vector(41, 326);
					break;

				case 2:
					// vector = new Vector(35, 290);
					vector = new Vector(173, 519);
					break;

				case 3:
					// vector = new Vector(80, 295);
					vector = new Vector(176, 518);
					break;
			}
		}
		else {
			switch (this.currentModelIndex) {
				case 0:
					// vector = new Vector (240,155);
					vector = new Vector(554, 328);
					break;

				case 1:
					// vector = new Vector(250, 290);
					vector = new Vector(414, 520);
					break;

				case 2:
					// vector = new Vector(240, 155);
					vector = new Vector(546, 327);
					break;

				case 3:
					// vector = new Vector(210, 295);
					vector = new Vector(424, 514);
					break;
			}
		}
		return vector;
	};
}

GoruGoru.prototype = Object.create(Entity.prototype);
GoruGoru.prototype.constructor = GoruGoru;

GoruGoru.prototype.Init = function () {

	this.models[0] = loader.GetModel('GoruGoru01');
	this.models[1] = loader.GetModel('GoruGoru02');
	this.models[2] = loader.GetModel('GoruGoru03');
	this.models[3] = loader.GetModel('GoruGoru04');

	// this.model = this.models [this.currentModelIndex];
	this.SetModel(this.models[this.currentModelIndex]);

	this.vie = this.model.vie;

	this.RandomStartPosition();
	this.speed = this.model.speed;
	this.speedPivot = this.speed / 3;
	this.valid = true;

	this.fireLanceFlamme = new LanceFlamme(this, 'LongueFlamme');
	this.fireLanceFlamme.head = 1;
	this.fireLanceFlamme.Init();
	this.fireLanceFlammeCourt = new LanceFlamme(this, 'CourteFlamme');
	this.fireLanceFlammeCourt.head = 2;
	this.fireLanceFlammeCourt.Init();
};

GoruGoru.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	this.lastModelTime += deltaTime;
	this.lastFireTime += deltaTime;

	if (this.lastFireTime > this.nexFireTime) {
		var headpos;
		this.NewMissil(1);
		this.NewMissil(2);
		this.lastFireTime = 0;
		this.nexFireTime = randomUniform(1, 4);
	}

	if (this.lastModelTime > 1
		&& this.fireLanceFlamme.InFire == false
		&& this.fireLanceFlammeCourt.InFire == false) {
		this.lastModelTime = 0;
		this.currentModelIndex = randomUniform(0, 4);
		this.ChangeModel(this.models[this.currentModelIndex]);
		this.depx = (Goldo.posx < this.posx) ? -1 : 1;
	}

	switch (this.mvtype) {
		case 1:
			this.posy += this.speed * deltaTime;
			this.posx += this.speed * deltaTime * this.depx;
			if (this.posy > 0) this.mvtype = 2;
			break;

		case 2:
			this.ang += 1;
			this.posx += this.speed * deltaTime * this.depx;
			this.posy += Math.sin(this.ang * Math.PI / 180) * this.speedPivot * deltaTime;
			break;
	}

	if (this.posx >= AppViewModel.canvasize.width - this.model.img.width)
		this.depx = -1;
	else if (this.posx <= 0) this.depx = 1;

	if (this.posy > AppViewModel.canvasize.height) {
		this.depx = (Goldo.posx < this.posx) ? -1 : 1;
		this.RandomStartPosition();
	}

	if (this.fireLanceFlamme != null) this.fireLanceFlamme.Animate(deltaTime);
	if (this.fireLanceFlammeCourt != null) this.fireLanceFlammeCourt.Animate(deltaTime);
};

GoruGoru.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);
	ctx.drawImage(this.model.img, this.posx, this.posy);
	this.DrawQuadTree(ctx, this.posx, this.posy);

	if (this.fireLanceFlamme != null) this.fireLanceFlamme.Draw(ctx);

	if (this.fireLanceFlammeCourt != null) this.fireLanceFlammeCourt.Draw(ctx);

	// DrawCircle (ctx,this.posx + this.rect.cx / 2, this.posy + this.rect.cy / 2, this.radius);
	// DrawRect (ctx,this.posx,this.posy,this.rect.cx,this.rect.cy);	
};

GoruGoru.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		this.NewHeadShot(1);
		this.NewHeadShot(2);
		var curmod = this.models[this.currentModelIndex];
		NewCrosseExplosionPos(this.posx + curmod.img.width / 2, this.posy + curmod.img.height / 2);
	}
};

GoruGoru.prototype.IsStopMissil = function () {
	return true;
};





function Missil(type) {
	Entity.call(this);
	this.type = type;
	this.rayStart = new Vector();
	this.timeLife = 0;
	this.timeLifeMax = 4;

	// head 1 left : 2 Right
	this.SetFireDirection = function (x, y, dx, dy) {
		this.posx = x - this.model.img.width / 2;
		this.posy = y - this.model.img.height / 2;

		this.dx = dx;
		this.dy = dy;
		this.ang = Math.atan2(this.dy, this.dx);

		this.valid = true;

		this.CalcParam();
	};

	this.CalcParam = function () {

		// Origin bounding box of the image
		var vec1 = new Vector(-this.model.img.width / 2, -this.model.img.height / 2);
		var vec2 = new Vector(this.model.img.width / 2, -this.model.img.height / 2);
		var vec3 = new Vector(this.model.img.width / 2, this.model.img.height / 2);
		var vec4 = new Vector(-this.model.img.width / 2, this.model.img.height / 2);

		// Rotated bounding box of the image
		var mat = new Mat2D(this.dy, -this.dx);
		vec1 = mat.Mul(vec1.x, vec1.y);
		vec2 = mat.Mul(vec2.x, vec2.y);
		vec3 = mat.Mul(vec3.x, vec3.y);
		vec4 = mat.Mul(vec4.x, vec4.y);

		// Get the global bouding bog surround the rotated bouding box
		var left = Math.min(Math.min(Math.min(vec1.x, vec2.x), vec3.x), vec4.x);
		var top = Math.min(Math.min(Math.min(vec1.y, vec2.y), vec3.y), vec4.y);
		var right = Math.max(Math.max(Math.max(vec1.x, vec2.x), vec3.x), vec4.x);
		var bottom = Math.max(Math.max(Math.max(vec1.y, vec2.y), vec3.y), vec4.y);

		// Define the RectSize to use during box dispatching in scape quadtree
		this.rect = new RectSize(left, top, right - left, bottom - top);

		// Define the start of the segment to test for collision
		// The end of the ray is easy to calculate
		this.rayStart = new Vector(0, -this.model.img.height / 2);
		this.rayStart = mat.Mul(this.rayStart.x, this.rayStart.y);
	};

}

Missil.prototype = Object.create(Entity.prototype);
Missil.prototype.constructor = Missil;

Missil.prototype.Init = function (x, y, target) {

	this.posx = x - this.model.img.width / 2;
	this.posy = y - this.model.img.height / 2;

	this.dx = target.posx + target.model.img.width / 2 - this.posx;
	this.dy = target.posy + target.model.img.height / 2 - this.posy;

	var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
	this.dx /= len;
	this.dy /= len;
	this.ang = Math.atan2(this.dy, this.dx);

	this.valid = true;

	this.CalcParam();
};

Missil.prototype.SetModel = function (model) {
	this.model = model;
	this.vie = model.vie;
	this.SetMinusRadius();
};

Missil.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;

	// 2 pour missil à tete chercheuse
	if (this.type == 2) {
		// var rottime = Math.PI * deltaTime;
		var rottime = this.model.speedRot * Math.PI / 180 * deltaTime;

		var vecx = Goldo.posx + Goldo.model.img.width / 2;
		var vecy = Goldo.posy + Goldo.model.img.height / 2;
		vecx -= this.posx + this.model.img.width / 2;
		vecy -= this.posy + this.model.img.height / 2;
		var len = Math.sqrt(vecx * vecx + vecy * vecy);
		vecx /= len;
		vecy /= len;

		var rot = vecy * this.dx - vecx * this.dy;

		if (Math.abs(rottime) > Math.abs(rot)) rottime = Math.abs(rot);
		if (rot < 0) this.ang -= rottime;
		else if (rot > 0) this.ang += rottime;

		this.dx = Math.cos(this.ang);
		this.dy = Math.sin(this.ang);

		this.CalcParam();
	}

	this.posx += this.dx * this.speed * deltaTime;
	this.posy += this.dy * this.speed * deltaTime;

	this.timeLife += deltaTime;

	if (this.timeLife > this.timeLifeMax) {
		this.valid = false;

		var outScreen = this.posx < -this.model.img.width
			|| this.posx > AppViewModel.canvasize.width
			|| this.posy < -this.model.img.height
			|| this.posy > AppViewModel.canvasize.height;

		if (outScreen == false) {
			NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
			decorManager.NewGroundDecor(DecorEnum.other,
				this.posx + this.model.img.width / 2,
				this.posy + this.model.img.height / 2, 'Impact');
		}
	}
};

Missil.prototype.DrawShadow = function (ctx) {
	if (this.model.imgShadow != null) {
		ctx.save();
		ctx.translate(this.posx + this.model.img.width / 2 + shadow.dx, this.posy + this.model.img.height / 2 + shadow.dy);
		ctx.rotate(this.ang - 90 * Math.PI / 180);
		ctx.drawImage(this.model.imgShadow, -this.model.imgShadow.width / 2, -this.model.imgShadow.height / 2,
			this.model.imgShadow.width * shadow.factor, this.model.imgShadow.height * shadow.factor);

		ctx.restore();
	}
};

Missil.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.ang - 90 * Math.PI / 180);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();
};

Missil.prototype.Collide = function (entity) {

	if (this.IsValid() == false) return false;

	if (entity.model.isBonus == true) return false;

	var centerx = entity.posx + entity.model.img.width / 2;
	var centery = entity.posy + entity.model.img.height / 2;

	var x1 = this.posx + this.rayStart.x;
	var y1 = this.posy + this.rayStart.y;
	var x2 = x1 + this.dx * this.model.img.height;
	var y2 = y1 + this.dy * this.model.img.height;

	if (SegmentVsCircle(x1, y1, x2, y2, centerx, centery, entity.radius) == true) {
		// Ne pas appliquer les dégat si l'entité est invulnérable
		// mais ne pas empecher l'explosion pour le visuel
		if (!entity.IsInvulnerable()) entity.HitDegat(this.model.degat);

		this.Hit();

		if (this.vie > 0) NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
		else this.SetNoValid();
		return true;
		// NewExplosionPos (this.posx+this.model.img.width/2,this.posy+this.model.img.height/2);
		// if (this.vie > 0) return false;
		// this.SetNoValid();
		// return true;
	}
	return false;

};

Missil.prototype.OnEnded = function () {
	if (this.vie <= 0) {
		NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};





function LanceFlamme(ParentEntity, ModelName) {
	FireEntity.call(this, ParentEntity);

	this.model = loader.GetModel(ModelName);
	// else this.model = loader.GetModel ('CourteFlamme');

	this.animatedHeight = 0;
	this.firedx = 0;
	this.firedy = 0;
	this.angdir = 0;
	this.CollideLenFactor = 0.7;
	this.headPosx = 0;
	this.headPosy = 0;
	this.head = 0;

	this.segray = this.model.img.width / 2;
	this.angdir = 0;
	this.randomFireTime = randomUniform(2, 8) * 1000;
	this.lastFireTime = Date.now();

	this.CollideEntity = function (Target) {
		var cx = Target.posx + Target.model.img.width / 2;
		var cy = Target.posy + Target.model.img.height / 2;

		var tx = this.Parent.posx + this.headPosx;
		var ty = this.Parent.posy + this.headPosy;

		// var x1 = this.Parent.posx + this.Parent.model.img.width / 2 - this.firedy * this.segray / 2;
		// var y1 = this.Parent.posy + this.Parent.model.img.height / 2 + this.firedx * this.segray / 2;
		var x1 = tx - this.firedy * this.segray / 2;
		var y1 = ty + this.firedx * this.segray / 2;

		var x2 = x1 + this.firedx * this.animatedHeight * this.CollideLenFactor;
		var y2 = y1 + this.firedy * this.animatedHeight * this.CollideLenFactor;

		if (SegmentVsCircle(x1, y1, x2, y2, cx, cy, Target.radius) == true) {
			// alert ('rouge');
			return true;
		}
		// x1 = this.Parent.posx + this.Parent.model.img.width / 2;
		// y1 = this.Parent.posy + this.Parent.model.img.height / 2;
		x1 = tx;
		y1 = ty;


		x2 = x1 + this.firedx * this.animatedHeight * this.CollideLenFactor;
		y2 = y1 + this.firedy * this.animatedHeight * this.CollideLenFactor;

		if (SegmentVsCircle(x1, y1, x2, y2, cx, cy, Target.radius) == true) {
			// alert ('vert');
			return true;
		}

		// x1 = this.Parent.posx + this.Parent.model.img.width / 2 + this.firedy * this.segray / 2;
		// y1 = this.Parent.posy + this.Parent.model.img.height / 2 - this.firedx * this.segray / 2;
		x1 = tx + this.firedy * this.segray / 2;
		y1 = ty - this.firedx * this.segray / 2;

		x2 = x1 + this.firedx * this.animatedHeight * this.CollideLenFactor;
		y2 = y1 + this.firedy * this.animatedHeight * this.CollideLenFactor;

		if (SegmentVsCircle(x1, y1, x2, y2, cx, cy, Target.radius) == true) {
			// alert ('bleu');
			return true;
		}

		return false;

	};

	this.ProcessCollision = function () {
		var tx = this.Parent.posx + this.headPosx;
		var ty = this.Parent.posy + this.headPosy;

		var xx = tx + this.firedx * this.animatedHeight;
		var yy = ty + this.firedy * this.animatedHeight;

		var left = Math.min(tx, xx) - this.model.img.width / 2;
		var right = Math.max(tx, xx) + this.model.img.width / 2;
		var top = Math.min(ty, yy);
		var bottom = Math.max(ty, yy);

		var list = Scape.GetNodeRectList(left, top, right, bottom);
		var entityList = new ChainedList();
		var scapeNode = list.firstnode;
		while (scapeNode != null) {
			if (scapeNode.obj.EntityList != null) {
				var entityNode = scapeNode.obj.EntityList.firstnode;
				while (entityNode != null) {
					var entity = entityNode.obj;
					entityNode = entityNode.next;

					if (entity.model.isBonus == true) continue;
					if (entity.model.isMissil == true) continue;
					if (entityList.FindObject(entity) != null) continue;
					if (entity.model.camp != AppViewModel.campVega) {
						if (this.CollideEntity(entity)) {
							// Ne pas appliquer les dégat si l'entité est invulnérable
							// mais ne pas empecher l'explosion pour le visuel
							if (!entity.IsInvulnerable()) entity.Hit();

							this.InFire = false;

							var cx = entity.posx + entity.model.img.width / 2;
							var cy = entity.posy + entity.model.img.height / 2;

							var x1 = this.Parent.posx + this.Parent.model.img.width / 2;
							var y1 = this.Parent.posy + this.Parent.model.img.height / 2;

							var dirx = x1 - cx;
							var diry = y1 - cy;
							var len = Math.sqrt(dirx * dirx + diry * diry);
							dirx /= len;
							diry /= len;

							var x2 = cx + dirx * entity.radius;
							var y2 = cy + diry * entity.radius;

							NewExplosionPos(x2, y2);
						}
					}
				}
			}
			scapeNode = scapeNode.next;
		}
	}

	this.SetFireDir = function () {
		var vec = this.Parent.GetHeadRelativePos(this.head);
		this.headPosx = vec.x;
		this.headPosy = vec.y;

		var tx = this.Parent.posx + this.headPosx;
		var ty = this.Parent.posy + this.headPosy;
		// var tx = this.Parent.posx + this.Parent.model.img.width / 2;
		// var ty = this.Parent.posy + this.Parent.model.img.height / 2;
		this.firedx = (this.Target.posx + this.Target.model.img.width / 2) - tx;
		this.firedy = (this.Target.posy + this.Target.model.img.height / 2) - ty;
		var len = Math.sqrt(this.firedx * this.firedx + this.firedy * this.firedy);
		this.firedx /= len;
		this.firedy /= len;
		this.angdir = Math.atan2(this.firedy, this.firedx);
	};
}

LanceFlamme.prototype = Object.create(Entity.prototype);
LanceFlamme.prototype.constructor = LanceFlamme;

LanceFlamme.prototype.Init = function () {

	this.FireDistance = this.model.img.height * 1.2;
	this.Target = Goldo;
};

LanceFlamme.prototype.Animate = function (deltaTime) {

	if (this.Enable == false) return;

	if (this.InFire == false) {
		if (this.lastFireTime == 0) {
			// Check the distance from target
			var dx = this.Target.posx - this.Parent.posx;
			var dy = this.Target.posy - this.Parent.posy;
			var squareLen = dx * dx + dy * dy;

			// Check the distance with the target
			if (squareLen > this.FireDistance * this.FireDistance) return;

			// Distance is ok we can start a LanceFlamme fire
			this.lastFireTime = Date.now();
			this.InFire = true;
			this.randomFireTime = randomUniform(2, 8) * 1000;
			loader.PlaySound('GoruFlamme', 0.5);
			this.SetFireDir();

		}
		else {
			if (Date.now() - this.lastFireTime > this.randomFireTime) // 5000)
			{
				this.InFire = true;
				this.randomFireTime = randomUniform(2, 8) * 1000;
				this.animatedHeight = 0;
				this.lastFireTime = Date.now();
				loader.PlaySound('GoruFlamme', 0.5);
				this.SetFireDir();
			}
		}
	}
	else {
		// this.animatedHeight += this.model.img.height * deltaTime;
		this.animatedHeight += this.model.speed * deltaTime;


		if (this.animatedHeight > this.model.img.height) {
			this.animatedHeight = this.model.img.height;
			this.InFire = false;
		}

		this.ProcessCollision()
	}

};

LanceFlamme.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;

	var factor = this.animatedHeight / this.model.img.height;
	var tx = this.Parent.posx + this.headPosx;
	var ty = this.Parent.posy + this.headPosy;
	ctx.save();
	ctx.translate(tx, ty);
	ctx.rotate(this.angdir - 90 * Math.PI / 180);
	ctx.drawImage(
		this.model.img
		, - this.model.img.width / 2 * factor, 0
		, this.model.img.width * factor
		, this.model.img.height * factor);

	ctx.restore();
};


LanceFlamme.prototype.Hit = function () {
};





function RayTract(ParentEntity, ModelName, MaskModelName) {
	FireEntity.call(this, ParentEntity);

	this.model = loader.GetModel(ModelName);
	this.maskmodel = loader.GetModel(MaskModelName);

	this.animatedHeight = 0;
	this.CollideLenFactor = 0.7;

	this.StartPosx = 140;
	this.StartPosy = 170;

	this.segray = this.model.img.width / 2;
	this.indexImage = 0;

	this.lastRayTractTime = 1000;
	this.animRayTractTime = 0;
	this.nbImage = 3;
	this.displayWidth = 0;

	this.CollideEntity = function (Target) {
		if (this.IsValid() == false) return false;

		if (Target.model.isBonus == true) return false;
		if (Target.model.camp == this.model.camp) return false;

		if (Math.abs(Target.posy - this.posy) > this.animatedHeight) return false;

		return Collide(Target, this);
	};

	this.ProcessCollision = function (deltaTime) {
		var xx = this.posx + this.displayWidth;
		var yy = this.posy + this.animatedHeight;

		var left = this.posx;
		var right = xx;
		var top = this.posy;
		var bottom = yy;

		var list = Scape.GetNodeRectList(left, top, right, bottom);
		var entityList = new ChainedList();
		var scapeNode = list.firstnode;
		while (scapeNode != null) {
			if (scapeNode.obj.EntityList != null) {
				var entityNode = scapeNode.obj.EntityList.firstnode;
				while (entityNode != null) {
					var entity = entityNode.obj;
					entityNode = entityNode.next;

					if (entity == Goldo) {
						if (this.CollideEntity(entity)) {
							Goldo.Tract(new Vector(0, -300 * deltaTime));
						}
					}
				}
			}
			scapeNode = scapeNode.next;
		}
	}
}

RayTract.prototype = Object.create(Entity.prototype);
RayTract.prototype.constructor = RayTract;

RayTract.prototype.Init = function () {

	this.FireDistance = this.model.img.height;
	this.Target = Goldo;
	this.InFire = false;

	this.displayWidth = this.model.img.width / this.nbImage;

	this.model.hasQuadNode = true;
	this.model.quadNode = this.maskmodel.quadNode;
};

RayTract.prototype.Animate = function (deltaTime) {

	if (this.Enable == false) return;

	this.lastRayTractTime += deltaTime;

	if (this.lastRayTractTime > 4) {
		this.InFire = false;
	}

	if (this.lastRayTractTime > 8) {
		this.InFire = true;
		this.lastRayTractTime = 0;
		loader.PlaySound('GoruFlamme', 0.5);
		this.animatedHeight = 0;
		this.animRayTractTime = 0;
	}

	if (this.InFire == true) {
		// this.animatedHeight += this.model.img.height * deltaTime;
		this.animatedHeight += 800 * deltaTime;

		if (this.animatedHeight > this.model.img.height) {
			this.animatedHeight = this.model.img.height;
		}

		this.animRayTractTime += deltaTime;
		if (this.animRayTractTime > 0.15) {
			// this.indexImage ++;
			// if (this.indexImage > 2) this.indexImage = 0;
			this.indexImage--;
			if (this.indexImage < 0) this.indexImage = this.nbImage - 1;
			this.animRayTractTime = 0;

		}

		this.ProcessCollision(deltaTime)
	}

};

RayTract.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;

	this.posx = this.Parent.posx + this.StartPosx;
	this.posy = this.Parent.posy + this.StartPosy;

	var ix = Math.floor(this.indexImage % this.nbImage);
	var iy = Math.floor(this.indexImage / this.nbImage);

	ctx.drawImage(
		this.model.img,
		ix * this.displayWidth,
		iy * this.animatedHeight,
		this.displayWidth,
		this.animatedHeight, this.posx, this.posy, this.displayWidth, this.animatedHeight);

	this.DrawQuadTree(ctx, this.posx, this.posy);
};

RayTract.prototype.Hit = function () {
};





function Megavolt(ParentEntity) {
	FireEntity.call(this, ParentEntity);

	this.tmpLazerHeight = 0;
	this.heigthAdjust = 78;
	this.widthAdjust = 0;
	this.timeLife = 0;
	this.Enable = false;
	this.countFire = 0;
	this.hasSparkBlue = true;

	this.Fire = function () {

		if (this.InFire == true) return;
		this.tmpLazerHeight = 0;
		this.InFire = true;
		loader.PlaySound('Megavolt', 0.1);
	};
}

Megavolt.prototype = Object.create(FireEntity.prototype);
Megavolt.prototype.constructor = Megavolt;

Megavolt.prototype.Init = function () {
	this.model = loader.GetModel('Megavolt');
	this.segray = this.model.img.width;
	this.InFire = false;
};

Megavolt.prototype.Animate = function (deltaTime) {

	if (this.Enable == false) return;

	this.timeLife += deltaTime;
	if (this.countFire == 0 && this.timeLife > 20) {
		this.Enable = false;
		this.InFire = false;
		return;
	}

	if (this.InFire == true) {
		this.tmpLazerHeight += this.model.img.height * 2 * deltaTime;
		if (this.tmpLazerHeight > this.model.img.height) {
			this.tmpLazerHeight = 0;
			this.InFire = false;

			if (this.countFire > 0) {
				this.countFire--;
				if (this.countFire == 0) this.Enable = false;
			}
		}

		var xx = this.widthAdjust + this.Parent.posx + this.Parent.model.img.width / 2 - this.model.img.width / 2;
		var yy = this.Parent.posy + this.heigthAdjust - this.tmpLazerHeight;

		var list = Scape.GetNodeRectList(xx, yy, xx + this.model.img.width, yy + this.tmpLazerHeight);
		var entityList = new ChainedList();

		var scapeNode = list.firstnode;
		while (scapeNode != null) {
			if (scapeNode.obj.EntityList != null) {
				var entityNode = scapeNode.obj.EntityList.firstnode;
				while (entityNode != null) {
					var entity = entityNode.obj;
					entityNode = entityNode.next;

					if (entity.model.isBonus == true) continue;
					if (entity.model.isMissil == true) continue;
					if (entityList.FindObject(entity) != null) continue;

					if (entity.model.camp != AppViewModel.campGoldo) {
						if (CollideRect(entity, xx, yy, xx + this.model.img.width, yy + this.tmpLazerHeight) == true) {
							entity.DecreaseShieldForce(this.model.degat);
							if (entity.ShieldForce <= 0) {
								entityList.AddObject(entity);

								if (this.hasSparkBlue == true)
									NewSparkBluePos(this.Parent.posx + this.Parent.model.img.width / 2, yy);
								else
									NewExplosionPos(this.Parent.posx + this.Parent.model.img.width / 2, yy);

								if (entity.IsValid() == true) {
									entity.HitDegat(this.model.degat);
									if (entity.IsValid() == false) {
										AppViewModel.points += entity.model.points;
									}
								}
							}
						}
					}
				}
			}
			scapeNode = scapeNode.next;
		}
	}
};

Megavolt.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;

	ctx.drawImage(
		this.model.img,
		0,
		this.model.img.height - this.tmpLazerHeight,

		this.model.img.width, this.tmpLazerHeight,

		this.Parent.posx + this.Parent.model.img.width / 2 - this.model.img.width / 2,

		// this.Parent.posy + 78 - this.tmpLazerHeight,
		this.Parent.posy + this.heigthAdjust - this.tmpLazerHeight,

		this.model.img.width, this.tmpLazerHeight);
};

Megavolt.prototype.Hit = function () {
};

function CorneAuFulgure(ParentEntity) {
	FireEntity.call(this, ParentEntity);

	this.tmpLazerHeight = 0;
	this.heigthAdjust = 50;
	this.widthAdjust = 40;
	this.timeLife = 0;
	this.Enable = false;
	this.countFire = 0;
	this.hasSparkBlue = false;
	this.timeUse = 0;

	this.Fire = function () {

		if (this.CanUsed() == false) return;

		if (this.Enable == false || this.InFire == true) return;
		this.tmpLazerHeight = 0;
		this.InFire = true;
		this.timeUse = 0;
		loader.PlaySound('CorneAuFulgureFire', 0.7);
	};

	this.CanUsed = function () {
		return (this.timeUse >= GoldoEnum.cornoFulgureTimeRecharge && this.countFire > 0);
	}

}

CorneAuFulgure.prototype = Object.create(Megavolt.prototype);
CorneAuFulgure.prototype.constructor = CorneAuFulgure;

CorneAuFulgure.prototype.Init = function () {
	this.model = loader.GetModel('CorneAuFulgure');
	this.segray = this.model.img.width;
	this.InFire = false;
	this.timeUse = 0;
};


CorneAuFulgure.prototype.Animate = function (deltaTime) {

	this.timeUse += deltaTime;

	if (this.Enable == true && this.InFire == true) Megavolt.prototype.Animate.call(this, deltaTime);
}



CorneAuFulgure.prototype.Draw = function (ctx) {

	if (this.Enable == false || this.InFire == false) return;

	if (this.Parent == null || this.Parent.IsValid() == false) return;

	ctx.drawImage(
		this.model.img,
		0,
		this.model.img.height - this.tmpLazerHeight,

		this.model.img.width, this.tmpLazerHeight,

		this.widthAdjust + this.Parent.posx + this.Parent.model.img.width / 2 - this.model.img.width / 2,

		this.Parent.posy + this.heigthAdjust - this.tmpLazerHeight,

		this.model.img.width, this.tmpLazerHeight);
};

CorneAuFulgure.prototype.Hit = function () {
};





function Golgoth40() {

	Entity.call(this);
	this.depx = (randomUniform(1, 11) < 6) ? -1 : 1;
	this.model = loader.GetModel('Golgoth40');
	this.lastFireTime = 0;
	this.lastFireRafal = 0;
	this.Lazernium = null;

	this.lastSpeedTime = 0;

	this.mvtype = 1;
	this.ang = 0;
	this.speed = 80;

	this.NewMissil = function () {
		var missil = new Missil(1);

		var missilmodel = loader.GetModel('Golgoth40Tir01Bleu');
		missil.SetModel(missilmodel);
		missil.speed = 800;

		missil.Init(
			this.posx + this.model.img.width / 2
			, this.posy + this.model.img.height, Goldo);

		missilList.AddObject(missil);
	};

	this.RandomStartPosition = function () {
		this.posx = randomUniform(0, AppViewModel.canvasize.width - this.model.img.width);
		this.posy = -this.model.img.height;
	};

	this.GetCurrentEyePos = function (EyeType) {
		var veceye = this.GetEyeRelativePos(EyeType);
		veceye.x += this.posx;
		veceye.y += this.posy;
		return veceye;
	}

	this.GetEyeRelativePos = function (EyeType) {

		var veceye = null;

		// 136, 45
		// 168, 45
		switch (EyeType) {
			case 1: veceye = new Vector(136, 45); break;
			case 2: veceye = new Vector(168, 45); break;
		}

		return veceye;
	};
}

Golgoth40.prototype = Object.create(Entity.prototype);
Golgoth40.prototype.constructor = Golgoth40;

Golgoth40.prototype.Init = function () {

	this.SetModel(loader.GetModel('Golgoth40'));

	this.vie = this.model.vie;

	this.RandomStartPosition();
	this.speed = this.model.speed;
	this.valid = true;

	this.Lazernium = new GinginLazernium(this, 'Lazernium40');

	this.Lazernium.Init();
};

Golgoth40.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	this.lastFireTime += deltaTime;
	this.lastFireRafal += deltaTime;

	this.Lazernium.Animate(deltaTime);

	if (this.lastFireTime > 1.5) {
		if (this.lastFireRafal > 0.08) {
			this.NewMissil();
			if (this.lastFireTime > 3) this.lastFireTime = 0;
			this.lastFireRafal = 0;
		}
	}

	switch (this.mvtype) {
		case 1:
			this.posy += this.speed * deltaTime;
			this.posx += this.speed * deltaTime * this.depx;
			if (this.posy > 0) this.mvtype = 2;
			break;

		case 2:
			this.dx = Goldo.posx - this.posx;
			this.dy = Goldo.posy - this.posy;
			var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
			this.dx /= len;
			this.dy /= len;

			if (this.valid == false) return;
			this.posx += this.dx * this.speed * deltaTime;
			this.posy += this.dy * this.speed * deltaTime;

			this.lastSpeedTime += deltaTime;
			if (this.lastSpeedTime > 5) {
				this.speed = this.model.speed * 4;
				if (this.lastSpeedTime > 6.5) {
					this.lastSpeedTime = 0;
					this.speed = this.model.speed;
				}
			}
			else {
				this.ang += 2;
				this.posy += Math.sin(this.ang * Math.PI / 180) * this.speed * deltaTime; // * this.speed * deltaTime;
				this.posx += Math.cos(this.ang * Math.PI / 180) * this.speed * deltaTime; // * this.speed * deltaTime;
			}
			break;
	}

	if (this.posx >= AppViewModel.canvasize.width - this.model.img.width || this.posx <= 0) this.dx = - this.dx;

	if (this.posy > AppViewModel.canvasize.height * 0.65 - this.model.img.height) {
		this.posy = AppViewModel.canvasize.height * 0.65 - this.model.img.height;
	}

	if (this.posx >= AppViewModel.canvasize.width - this.model.img.width) this.depx = -1;
	else if (this.posx <= 0) this.depx = 1;

	if (this.posy > AppViewModel.canvasize.height) {
		this.depx = (Goldo.posx < this.posx) ? -1 : 1;
		this.RandomStartPosition();
	}
};

Golgoth40.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	ctx.drawImage(this.model.img, this.posx, this.posy);
	this.DrawQuadTree(ctx, this.posx, this.posy);

	this.Lazernium.Draw(ctx);
	// DrawCircle (ctx,this.posx + this.rect.cx / 2, this.posy + this.rect.cy / 2, this.radius);
	// DrawRect (ctx,this.posx,this.posy,this.rect.cx,this.rect.cy);	
};

Golgoth40.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};

Golgoth40.prototype.IsStopMissil = function () {
	return true;
};





function Golgoth28() {

	Entity.call(this);

	this.model = loader.GetModel('Golgoth40');
	this.lastSpeedTime = 0;

	this.mvtype = 1;
	this.ang = 0;
	this.speed = 80;

	this.rayTract = null;
	this.fireLanceFlamme = new Array();
	this.lastFireBallTimes = new Array();
	this.lastFireBallRandomNextTimes = new Array();
	this.lastFireTime = 0;

	this.RandomStartPosition = function () {
		this.posx = randomUniform(0, AppViewModel.canvasize.width - this.model.img.width);
		this.posy = -this.model.img.height;
	};

	this.NewMissil = function (head) {
		var missil = new Missil(1);
		var pos = this.GetHeadPos(head);
		var soundName;

		if (randomUniform(1, 11) < 5) {
			missil.SetModel(loader.GetModel('FireBall03'));
			missil.speed = 900;
			soundName = 'GoruFire';
		}
		else {
			missil.SetModel(loader.GetModel('FireBall04'));
			missil.speed = 600;
			soundName = 'FireBall';
		}

		missil.Init(pos.x, pos.y, Goldo);
		missilList.AddObject(missil);

		loader.PlaySound(soundName, 0.8);
	};

	this.NewHeadShot = function () {

		var headmod = loader.GetModel('Golgoth28Head');
		for (var head = 1; head <= 5; head++) {
			var missil = new Missil(2);

			var pos = this.GetHeadPos(head);
			missil.SetModel(headmod);
			missil.speed = 500;
			missil.vie = headmod.vie;
			missil.Init(pos.x, pos.y, Goldo);
			missilList.AddObject(missil);
		}
	};

	// head 1 left : 2 Right
	this.GetHeadPos = function (head) {
		var vector = this.GetHeadRelativePos(head);
		vector.x += this.posx;
		vector.y += this.posy;
		return vector;
	};

	this.GetHeadRelativePos = function (head) {

		var vector = null;
		switch (head) {
			case 1:
				vector = new Vector(15, 177);
				break;

			case 2:
				vector = new Vector(242, 53);
				break;

			case 3:
				vector = new Vector(371, 50);
				break;

			case 4:
				vector = new Vector(442, 131);
				break;

			case 5:
				vector = new Vector(445, 200);
				break;
		}
		return vector;
	};
}

Golgoth28.prototype = Object.create(Entity.prototype);
Golgoth28.prototype.constructor = Golgoth28;

Golgoth28.prototype.Init = function () {

	this.SetModel(loader.GetModel('Golgoth28'));
	this.vie = this.model.vie;

	this.rayTract = new RayTract(this, 'RayonTracteur', 'RayonTracteurMask');
	this.rayTract.Init();

	this.RandomStartPosition();
	this.speed = this.model.speed;
	this.valid = true;

	var flamme = ['Flamme03', 'LongueFlamme', 'CourteFlamme'];
	for (var i = 1; i <= 5; i++) {
		var lanceflamme = new LanceFlamme(this, flamme[randomUniform(0, 3)]);
		lanceflamme.head = i;
		lanceflamme.Init();
		this.fireLanceFlamme.push(lanceflamme);

		this.lastFireBallTimes[i] = randomUniform(1, 11);
		this.lastFireBallRandomNextTimes[i] = randomUniform(3, 6);
	}
};

Golgoth28.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	switch (this.mvtype) {
		case 1:
			this.dx = Goldo.posx - this.posx - this.model.img.width / 2;
			this.dy = Goldo.posy - this.posy;
			var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
			this.dx /= len;
			this.dy /= len;

			this.posx += this.dx * this.speed * deltaTime;
			this.posy += this.dy * this.speed * deltaTime;

			if (this.posy > 0) this.mvtype = 2;
			break;

		case 2:
			this.dx = Goldo.posx - this.posx - this.model.img.width / 2;
			this.dy = Goldo.posy - this.posy;
			var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
			this.dx /= len;
			this.dy /= len;

			this.posx += this.dx * this.speed * deltaTime;
			this.posy += this.dy * this.speed * deltaTime;

			this.lastSpeedTime += deltaTime;
			if (this.lastSpeedTime > 5) {
				this.speed = this.model.speed * 3;
				// this.speed = this.model.speed * 2;
				if (this.lastSpeedTime > 6.5) {
					this.lastSpeedTime = 0;
					this.speed = this.model.speed;
				}
			}
			else {
				this.ang += 1;
				this.posy += Math.sin(this.ang * Math.PI / 180) * this.speed * deltaTime * 2;
				this.posx += Math.cos(this.ang * Math.PI / 180) * this.speed * deltaTime * 2;
			}
			break;
	}

	if (this.posx >= AppViewModel.canvasize.width - this.model.img.width || this.posx <= 0) this.dx = - this.dx;

	if (this.posy > AppViewModel.canvasize.height * 0.65 - this.model.img.height) {
		this.posy = AppViewModel.canvasize.height * 0.65 - this.model.img.height;
	}

	if (this.rayTract != null) this.rayTract.Animate(deltaTime);
	for (var i = 0; i < this.fireLanceFlamme.length; i++) {
		this.fireLanceFlamme[i].Animate(deltaTime);

		this.lastFireBallTimes[i] += deltaTime;
		if (this.lastFireBallTimes[i] > this.lastFireBallRandomNextTimes[i]) {
			this.NewMissil(i + 1);
			this.lastFireBallTimes[i] = 0;
			this.lastFireBallRandomNextTimes[i] = randomUniform(3, 6);
		}
	}
};

Golgoth28.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	ctx.drawImage(this.model.img, this.posx, this.posy);
	this.DrawQuadTree(ctx, this.posx, this.posy);

	if (this.rayTract != null) this.rayTract.Draw(ctx);
	for (var i = 0; i < this.fireLanceFlamme.length; i++) {
		this.fireLanceFlamme[i].Draw(ctx);
	}
};

Golgoth28.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		this.NewHeadShot();
		NewBonusType(AppViewModel.bonusVie);
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};

Golgoth28.prototype.IsStopMissil = function () {
	return true;
};





function MvtVector(dx, dy, speed, len, accel) {
	this.dx = dx;
	this.dy = dy;
	this.speed = speed;
	this.len = len;
	this.spentLen = 0;
	this.accel = (accel == undefined) ? 0 : accel;
}

MvtVector.prototype.Animate = function (deltaTime) {
	this.speed += this.accel * deltaTime;

	var deltax = this.dx * this.speed * deltaTime;
	var deltay = this.dy * this.speed * deltaTime;
	this.spentLen += Math.sqrt(deltax * deltax + deltay * deltay);

	return (this.spentLen >= this.len);
};

MvtVector.prototype.Apply = function (entity, deltaTime) {
	entity.posx += this.dx * this.speed * deltaTime;
	entity.posy += this.dy * this.speed * deltaTime;
};

function GinGinMvtVectorShieldFire(dx, dy, speed, len, accel) {

	MvtVector.call(this, dx, dy, speed, len, accel);
}

GinGinMvtVectorShieldFire.prototype = Object.create(MvtVector.prototype);
GinGinMvtVectorShieldFire.prototype.constructor = GinGinMvtVectorShieldFire;

GinGinMvtVectorShieldFire.prototype.Apply = function (entity, deltaTime) {

	var vecdir = new Vector(Goldo.posx - entity.posx, Goldo.posy - entity.posy);
	vecdir.Normalize();
	this.dx = vecdir.x;
	this.dy = vecdir.y;
	entity.posx += this.dx * this.speed * deltaTime;
	entity.posy += this.dy * this.speed * deltaTime;
};


GinGinEnum = {
	MvtTypeUfoArrive: 1,
	MvtTypeUfoAttac: 2,
	MvtTypeAnterakAttac: 3,
	MvtTypeSpecialArm: 4,
	MvtTypeSpecialSaw: 5,
};

function GinGin() {

	Entity.call(this);

	this.model = null;

	this.lastSpeedTime = 0;
	this.lastFireTime = 0;

	this.lastMvtTypeTime = 0;
	this.nextMvtTypeTime = 5;

	this.lastSawAttacTime = 0;
	this.nextSawAttacTime = randomUniform(2, 5);

	this.lastSecondSawAttacTime = 0;
	this.nextSecondSawAttacTime = 0;

	this.mvtype = GinGinEnum.MvtTypeUfoArrive; // MvtTypeUfoArrive MvtTypeAnterakAttac

	this.modelUfo = null;
	this.modelUfoSaw01 = null;
	this.modelUfoSaw02 = null;

	this.sawDegret = 0;
	this.sawSpeedRot = 0;
	this.currentMvt = null;
	this.Antherak = new Array();
	this.indexAntherakModel = 0;
	this.ginginLazernium = null;

	this.SetCurrentActionModel = function (mvtype) {

		this.mvtype = mvtype;
		switch (this.mvtype) {
			case GinGinEnum.MvtTypeUfoArrive:
			case GinGinEnum.MvtTypeUfoAttac:
				this.model = this.modelUfo;
				this.rect = new RectSize(-this.model.img.width / 2, -this.model.img.height / 2, this.model.img.width, this.model.img.height);
				break;

			case GinGinEnum.MvtTypeAnterakAttac:
				this.model = this.GetAnterakModel();
				this.rect = new RectSize(-this.model.img.width / 2, -this.model.img.height / 2, this.model.img.width, this.model.img.height);
				break;
		}
	};

	this.RandomStartPosition = function () {
		this.posx = randomUniform(0, AppViewModel.canvasize.width - this.model.img.width);
		this.posy = -this.model.img.height;
	};

	this.ProcessMovTowardGoldo = function (deltaTime) {
		this.dx = Goldo.posx - this.posx - this.model.img.width / 2;
		this.dy = Goldo.posy - this.posy;
		var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
		this.dx /= len;
		this.dy /= len;

		this.posx += this.dx * this.speed * deltaTime;
		this.posy += this.dy * this.speed * deltaTime;
	};

	this.ProcessMovSpeedAttac = function (deltaTime) {
		if (this.currentMvt == null && randomUniform(1, 101) == 1) {
			this.currentMvt = new MvtVector(this.dx, this.dy, 300, 100 + randomUniform(100, 400), 500);
		}
		else if (this.currentMvt != null) {
			if (this.currentMvt.Animate(deltaTime) == true) {
				this.currentMvt = null;
			}
			else {
				this.currentMvt.Apply(this, deltaTime);
			}
		}
	};

	this.ProcessMovSpecial = function (deltaTime) {
		if (this.currentMvt != null) {
			if (this.currentMvt.Animate(deltaTime) == true) {
				this.currentMvt = null;
			}
			else {
				this.currentMvt.Apply(this, deltaTime);
			}
		}
	};

	this.ProcessSecondSawFire = function (deltaTime) {
		if (this.nextSecondSawAttacTime > 0) {
			this.lastSecondSawAttacTime += deltaTime;
			if (this.lastSecondSawAttacTime >= this.nextSecondSawAttacTime) {
				this.SawFire();
				this.nextSecondSawAttacTime = 0;
				this.lastSecondSawAttacTime = 0;
			}
		}
	};

	this.InitSecondSawFire = function (time) {
		if (this.nextSecondSawAttacTime == 0) {
			this.nextSecondSawAttacTime = time;
			this.lastSecondSawAttacTime = 0;
		}
	};

	this.GetAnterakModel = function () {
		var vec = new Vector(Goldo.posx - this.posx, Goldo.posy - this.posy);
		vec.Normalize();

		var ang = (vec.x / Math.PI * 180);
		var index = -Math.floor(ang / 13);
		index = Math.max(-3, index);
		index = Math.min(3, index);
		index += 4;
		this.indexAntherakModel = index;
		return this.Antherak[index];
	};

	this.SawFire = function () {

		switch (this.mvtype) {
			case GinGinEnum.MvtTypeUfoArrive:
			case GinGinEnum.MvtTypeUfoAttac:
				return; break;
		}

		var sawpos = null;
		switch (this.indexAntherakModel) {
			case 1: case 2: case 6: case 7:
				sawpos = this.GetSawRelativePos(this.indexAntherakModel);
				if (sawpos != null) this.NewSawMissil(sawpos.x, sawpos.y);
				break;

			case 3: case 4: case 5:
				sawpos = this.GetSawRelativePos(this.indexAntherakModel, 1);
				if (sawpos != null) this.NewSawMissil(sawpos.x, sawpos.y);
				sawpos = this.GetSawRelativePos(this.indexAntherakModel, 2);
				if (sawpos != null) this.NewSawMissil(sawpos.x, sawpos.y);
				break;
		}

		if (sawpos != null) loader.PlaySound('JanusSaw', 0.8);
	};

	this.NewSawMissil = function (sawposx, sawposy) {
		var saw = new GinGinSaw();
		saw.Init(this.posx + sawposx, this.posy + sawposy, Goldo);
		missilList.AddObject(saw);
	};

	this.GetSawRelativePos = function (GinGinAnterakType, SawType) {

		switch (GinGinAnterakType) {
			case 1: return new Vector(-18, -13); break;
			case 2: return new Vector(12, 31); break;
			case 6: return new Vector(130, 31); break;
			case 7: return new Vector(159, -12); break;
		}

		if (SawType == 1) {
			switch (GinGinAnterakType) {
				case 3: case 4: case 5: return new Vector(-10, -7); break;
			}
		}
		else {
			switch (GinGinAnterakType) {
				case 3: case 4: case 5: return new Vector(153, -7); break;
			}
		}
		return null;
	};

	this.GetCurrentEyePos = function (EyeType) {
		var veceye = this.GetEyeRelativePos(this.indexAntherakModel, EyeType);
		veceye.x += this.posx;
		veceye.y += this.posy;
		return veceye;
	}

	this.GetCurrentEyeRelativePos = function (EyeType) {
		return this.GetEyeRelativePos(this.indexAntherakModel, EyeType);
	}

	this.GetEyeRelativePos = function (GinGinAnterakType, EyeType) {

		var veceye = null;
		if (EyeType == 1) {
			switch (GinGinAnterakType) {
				case 1: veceye = new Vector(141, 37); break;
				case 2: veceye = new Vector(134, 31); break;
				case 3: veceye = new Vector(147, 37); break;
				case 4: veceye = new Vector(144, 32); break;
				case 5: veceye = new Vector(140, 37); break;
				case 6: veceye = new Vector(153, 31); break;
				case 7: veceye = new Vector(147, 37); break;
			}
		}

		if (EyeType == 2) {
			switch (GinGinAnterakType) {
				case 1: veceye = new Vector(154, 37); break;
				case 2: veceye = new Vector(148, 31); break;
				case 3: veceye = new Vector(161, 37); break;
				case 4: veceye = new Vector(158, 32); break;
				case 5: veceye = new Vector(154, 37); break;
				case 6: veceye = new Vector(167, 31); break;
				case 7: veceye = new Vector(159, 37); break;
			}
		}

		return veceye;
	};
}

GinGin.prototype = Object.create(Entity.prototype);
GinGin.prototype.constructor = GinGin;

GinGin.prototype.Init = function () {

	this.modelUfo = loader.GetModel('GinGinUfoMap1');
	this.modelUfoSaw01 = loader.GetModel('GinGinUfoMap2');
	this.modelUfoSaw02 = loader.GetModel('GinGinUfoMap3');

	this.ginginLazernium = new GinginLazernium(this, 'GinGinLazernium');
	this.ginginLazernium.Init();

	this.Antherak = new Array();
	for (var i = 1; i <= 7; i++) {
		this.Antherak[i] = loader.GetModel('GinGinAnterakMap' + i);
	}

	var modelGinGinSaw = loader.GetModel('GinGinSawMap1');
	this.sawSpeedRot = modelGinGinSaw.speedRot;
	this.SetModel(this.modelUfo);
	this.vie = this.model.vie;
	this.speed = this.model.speed;
	this.valid = true;
	this.SetCurrentActionModel(this.mvtype);
	this.RandomStartPosition();
};

GinGin.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	this.sawDegret += this.sawSpeedRot * deltaTime;

	// if (randomUniform (1,1000) == 15) loader.PlaySound ('JanusEnfer',0.8);

	this.ProcessSecondSawFire(deltaTime);

	switch (this.mvtype) {
		case GinGinEnum.MvtTypeUfoArrive:
			this.ProcessMovTowardGoldo(deltaTime);
			if (this.posy > 0) this.SetCurrentActionModel(GinGinEnum.MvtTypeUfoAttac);
			break;

		case GinGinEnum.MvtTypeUfoAttac: // Poursuite de Goldorak
			this.ProcessMovTowardGoldo(deltaTime);
			this.ProcessMovSpeedAttac(deltaTime);

			this.lastMvtTypeTime += deltaTime;
			if (this.lastMvtTypeTime > 5 && this.currentMvt == null) {
				this.ginginLazernium.ResetTiming();
				this.SetCurrentActionModel(GinGinEnum.MvtTypeAnterakAttac);
				loader.PlaySound('JanusAnterak', 0.8);
				this.lastMvtTypeTime = 0;
				this.nextMvtTypeTime = 10 + randomUniform(1, 6);
			}
			break;

		case GinGinEnum.MvtTypeAnterakAttac:
			this.model = this.GetAnterakModel();
			this.ProcessMovTowardGoldo(deltaTime);
			this.ProcessMovSpeedAttac(deltaTime);
			this.ginginLazernium.Animate(deltaTime);

			this.lastMvtTypeTime += deltaTime;
			if (this.lastMvtTypeTime > this.nextMvtTypeTime) {
				this.SetCurrentActionModel(GinGinEnum.MvtTypeUfoAttac);
				this.lastMvtTypeTime = 0;
				this.nextMvtTypeTime = 4 + randomUniform(1, 5);
				loader.PlaySound('JanusAmuse', 0.8);

			}
			else {
				this.lastSawAttacTime += deltaTime;
				if (this.lastSawAttacTime > this.nextSawAttacTime) {
					this.lastSawAttacTime = 0;
					this.nextSawAttacTime = randomUniform(1, 4);
					this.mvtype = GinGinEnum.MvtTypeSpecialArm;
					var vecdir = new Vector(Goldo.posx - this.posx, Goldo.posy - this.posy);
					vecdir.Normalize();
					this.currentMvt = new MvtVector(-vecdir.x, -vecdir.y, 600, 200, 500);
				}
			}
			break;

		case GinGinEnum.MvtTypeSpecialArm:
			this.lastMvtTypeTime += deltaTime;
			this.model = this.GetAnterakModel();
			this.ProcessMovSpecial(deltaTime);
			this.ginginLazernium.Animate(deltaTime);
			if (this.currentMvt == null) {
				this.mvtype = GinGinEnum.MvtTypeSpecialSaw;
				var vecdir = new Vector(Goldo.posx - this.posx, Goldo.posy - this.posy);
				vecdir.Normalize();
				this.currentMvt = new GinGinMvtVectorShieldFire(vecdir.x, vecdir.y, 1000, 300, 1000);
			}
			break;

		case GinGinEnum.MvtTypeSpecialSaw:
			this.lastMvtTypeTime += deltaTime;
			this.model = this.GetAnterakModel();
			this.ProcessMovSpecial(deltaTime);
			this.ginginLazernium.Animate(deltaTime);
			if (this.currentMvt == null) {
				if (this.lastMvtTypeTime > this.nextMvtTypeTime) {
					this.SetCurrentActionModel(GinGinEnum.MvtTypeUfoAttac);
					this.lastMvtTypeTime = 0;
					this.nextMvtTypeTime = 4 + randomUniform(1, 5);
					loader.PlaySound('JanusAnterak', 0.8);
				}
				else {
					this.SawFire();
					this.InitSecondSawFire(3);
					this.SetCurrentActionModel(GinGinEnum.MvtTypeAnterakAttac);
				}
			}
			break;
	}

	if (this.posx >= AppViewModel.canvasize.width - this.model.img.width || this.posx <= 0) this.dx = - this.dx;

	if (this.posy > AppViewModel.canvasize.height) {
		this.posy = - this.model.img.height;
	}
};

GinGin.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	switch (this.mvtype) {
		case GinGinEnum.MvtTypeUfoArrive:
		case GinGinEnum.MvtTypeUfoAttac:
			this.DrawAUfo(ctx);
			break;

		case GinGinEnum.MvtTypeAnterakAttac:
			this.DrawAnterak(ctx);
			break;

		case GinGinEnum.MvtTypeSpecialArm:
		case GinGinEnum.MvtTypeSpecialSaw:
			this.DrawAnterak(ctx);
			break;
	}

	this.DrawQuadTree(ctx, this.posx, this.posy);
};


GinGin.prototype.DrawAUfo = function (ctx) {

	if (this.valid == false) return;

	ctx.save();
	ctx.translate(this.posx + this.modelUfoSaw01.img.width / 2, this.posy + this.modelUfoSaw01.img.height / 2);
	ctx.rotate(this.sawDegret * Math.PI / 180);
	ctx.drawImage(this.modelUfoSaw01.img, -this.modelUfoSaw01.img.width / 2, -this.modelUfoSaw01.img.height / 2);
	ctx.restore();

	ctx.save();
	ctx.translate(this.posx + this.modelUfoSaw02.img.width / 2, this.posy + this.modelUfoSaw02.img.height / 2);
	ctx.rotate(-this.sawDegret * Math.PI / 180);
	ctx.drawImage(this.modelUfoSaw02.img, -this.modelUfoSaw02.img.width / 2, -this.modelUfoSaw02.img.height / 2);
	ctx.restore();

	ctx.drawImage(this.model.img, this.posx, this.posy);
};


GinGin.prototype.DrawAnterak = function (ctx) {

	if (this.valid == false) return;
	ctx.drawImage(this.model.img, this.posx, this.posy);
	this.DrawAnterakSaw(ctx);
	this.ginginLazernium.Draw(ctx);

};

GinGin.prototype.DrawAnterakSaw = function (ctx) {

	if (this.valid == false) return;

	var sawmodel01 = null;
	var sawmodel02 = null;

	var sawrelpos01 = this.GetSawRelativePos(this.indexAntherakModel, 1);
	var sawrelpos02 = this.GetSawRelativePos(this.indexAntherakModel, 2);

	switch (this.indexAntherakModel) {
		case 1: sawmodel01 = loader.GetModel('GinGinSawMap1'); break;
		case 2: sawmodel01 = loader.GetModel('GinGinSawMap2'); break;

		case 3: case 5:
			sawmodel01 = loader.GetModel('GinGinSawMap3');
			sawmodel02 = loader.GetModel('GinGinSawMap4');
			break;

		case 4:
			sawmodel01 = loader.GetModel('GinGinSawMap5');
			sawmodel02 = loader.GetModel('GinGinSawMap6');
			break;

		case 6: sawmodel01 = loader.GetModel('GinGinSawMap7'); break;
		case 7: sawmodel01 = loader.GetModel('GinGinSawMap8'); break;
	}

	if (sawmodel01 != null) this.DrawSaw(ctx, sawmodel01, sawrelpos01.x, sawrelpos01.y, this.sawDegret);
	if (sawmodel02 != null) this.DrawSaw(ctx, sawmodel02, sawrelpos02.x, sawrelpos02.y, -this.sawDegret);
};

GinGin.prototype.DrawSaw = function (ctx, sawmodel, refposx, refposy, angle) {

	if (sawmodel != null) {
		var sawposx = this.posx + sawmodel.img.width / 2 + refposx;
		var sawposy = this.posy + sawmodel.img.height / 2 + refposy;
		ctx.save();
		ctx.translate(sawposx, sawposy);
		ctx.rotate(angle * Math.PI / 180);
		ctx.drawImage(sawmodel.img, -sawmodel.img.width / 2, -sawmodel.img.height / 2);
		ctx.restore();
	}
};

GinGin.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		NewBonusType(AppViewModel.bonusVie);
	}
};

GinGin.prototype.IsStopMissil = function () {
	return true;
};


GinGin.prototype.AllowCollisionSameCamp = function () {
	return true;
};

GinGin.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};





function GinGinSaw() {
	Entity.call(this);
	this.timeLife = 0;
	this.ang = 0;
}

GinGinSaw.prototype = Object.create(Entity.prototype);
GinGinSaw.prototype.constructor = GinGinSaw;

// x et y doit être le coin gauche superieur
GinGinSaw.prototype.Init = function (x, y, target) {

	this.model = loader.GetModel('GinGinSawMap1');
	this.speed = this.model.speed;
	this.vie = this.model.vie;

	this.rect = new RectSize(
		-this.model.img.width / 2,
		-this.model.img.height / 2,
		this.model.img.width,
		this.model.img.height);

	this.posx = x;
	this.posy = y;

	this.dx = target.posx - this.posx;
	this.dy = target.posy - this.posy;

	var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
	this.dx /= len;
	this.dy /= len;

	this.valid = true;
};

GinGinSaw.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;

	this.ang += 300 * deltaTime;

	this.posx += this.dx * this.speed * deltaTime;
	this.posy += this.dy * this.speed * deltaTime;

	this.timeLife += deltaTime;
	if (this.timeLife > 4) {
		this.valid = false;
	}
};

GinGinSaw.prototype.DrawShadow = function (ctx) {

	if (this.model.imgShadow != null) {
		ctx.drawImage(this.model.imgShadow, this.posx + shadow.dx, this.posy + shadow.dy,
			this.model.imgShadow.width * shadow.factor, this.model.imgShadow.height * shadow.factor);
	}
};

GinGinSaw.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.ang * Math.PI / 180);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();
};





function TorseFire() {
	Entity.call(this);
	this.timeLife = 0;
}

TorseFire.prototype = Object.create(Entity.prototype);
TorseFire.prototype.constructor = TorseFire;

// x et y doit être le coin gauche superieur
TorseFire.prototype.Init = function (x, y, target) {

	this.model = loader.GetModel('ErgastulTorseFire');
	this.speed = this.model.speed;
	this.vie = this.model.vie;

	this.SetMinusRadius();

	this.rect = new RectSize(
		-this.model.img.width / 2,
		-this.model.img.height / 2,
		this.model.img.width,
		this.model.img.height);

	this.posx = x;
	this.posy = y;

	this.dx = target.posx - this.posx;
	this.dy = target.posy - this.posy;

	var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
	this.dx /= len;
	this.dy /= len;

	this.valid = true;
};

TorseFire.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;

	this.posx += this.dx * this.speed * deltaTime;
	this.posy += this.dy * this.speed * deltaTime;

	this.timeLife += deltaTime;
	if (this.timeLife > 4) {
		this.valid = false;
	}
};

TorseFire.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();
};

TorseFire.prototype.Collide = function (entity) {

	if (this.IsValid() == false) return false;

	if (this.OwnerEntity == entity) return false;

	if (entity.model.isBonus == true) return false;

	var intersect = CollideCircle(this, this.radius, entity, entity.radius);
	if (intersect == true) {
		// Ne pas appliquer les dégat si l'entité est invulnérable
		// mais ne pas empecher l'explosion pour le visuel
		if (!entity.IsInvulnerable()) entity.HitDegat(this.model.degat);

		// this.Hit ();
		NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
		this.SetNoValid();
	}

	return intersect;
};



function ErgastulLame() {
	Entity.call(this);
	this.timeLife = 0;
	this.timeLifeMax = 4;
	this.rot = 0;
	this.ang = 0;
}

ErgastulLame.prototype = Object.create(Entity.prototype);
ErgastulLame.prototype.constructor = ErgastulLame;

// x et y doit être le coin gauche superieur
ErgastulLame.prototype.Init = function (x, y, target) {

	this.model = loader.GetModel('ErgastuLame');
	this.speed = this.model.speed;
	this.vie = this.model.vie;

	var size = Math.max(this.model.img.width / 2, this.model.img.height / 2);
	this.rect = new RectSize(-size, -size, size, size);

	this.posx = x;
	this.posy = y;

	this.dx = target.posx - this.posx;
	this.dy = target.posy - this.posy;

	var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
	this.dx /= len;
	this.dy /= len;

	this.ang = Math.atan2(this.dy, this.dx);

	this.valid = true;
};

ErgastulLame.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;

	this.rot += 3000 * deltaTime;

	// var rottime = Math.PI * deltaTime;
	var rottime = this.model.speedRot * Math.PI / 180 * deltaTime;

	var vecx = Goldo.posx + Goldo.model.img.width / 2;
	var vecy = Goldo.posy + Goldo.model.img.height / 2;
	vecx -= this.posx + this.model.img.width / 2;
	vecy -= this.posy + this.model.img.height / 2;
	var len = Math.sqrt(vecx * vecx + vecy * vecy);
	vecx /= len;
	vecy /= len;

	var rot = vecy * this.dx - vecx * this.dy;

	if (Math.abs(rottime) > Math.abs(rot)) rottime = Math.abs(rot);
	if (rot < 0) this.ang -= rottime;
	else if (rot > 0) this.ang += rottime;

	this.dx = Math.cos(this.ang);
	this.dy = Math.sin(this.ang);

	this.posx += this.dx * this.speed * deltaTime;
	this.posy += this.dy * this.speed * deltaTime;

	this.timeLife += deltaTime;
	if (this.timeLife > this.timeLifeMax) {
		this.valid = false;
		// NewExplosionPos (this.posx+this.model.img.width/2,this.posy+this.model.img.height/2);
		// decorManager.NewGroundDecor (DecorEnum.other,this.posx+this.model.img.width/2,this.posy+this.model.img.height/2,'Impact');
	}
};

ErgastulLame.prototype.Collide = function (entity) {

	if (this.IsValid() == false) return false;

	if (this.OwnerEntity == entity) return false;

	if (entity.model.isBonus == true) return false;

	var intersect = CollideCircle(this, this.radius, entity, entity.radius);
	if (intersect == true) {
		// Ne pas appliquer les dégat si l'entité est invulnérable
		// mais ne pas empecher l'explosion pour le visuel
		entity.HitDegat(this.model.degat);

		// this.Hit ();
		NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
		this.SetNoValid();
	}

	return intersect;
};

ErgastulLame.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	ctx.save();

	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.rot * Math.PI / 180);

	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();
};



ErgastulEnum = {
	MvtTypeArrive: 1,
	MvtTypeAttac: 2,
	MvtTypeSpecialLame: 3
};

function Ergastul() {

	GinGin.call(this);
	this.model = null;

	this.lastSpeedTime = 0;
	this.lastFireTime = 0;

	this.lastMvtTypeTime = 0;
	this.nextMvtTypeTime = 5;

	this.mvtype = ErgastulEnum.MvtTypeArrive;

	this.currentMvt = null;
	this.Antherak = new Array();
	this.indexAntherakModel = 0;

	this.Lazernium = null;
	this.torseFireTime = 0;
	this.nextTorseFireTime = randomUniform(2000, 3000) / 1000;
	this.nbTorseFire = 0;
	this.nbTorseFireMax = randomUniform(2, 6);

	this.lameFireTime = 0;
	this.lameNextFireTime = randomUniform(1000, 2000) / 1000;
	this.arroundAng = randomUniform(1, 360);
	this.arroundAngSign = 1;

	this.SetCurrentActionModel = function (mvtype) {

		this.mvtype = mvtype;
		this.model = this.GetAnterakModel();
		this.rect = new RectSize(-this.model.img.width / 2, -this.model.img.height / 2, this.model.img.width, this.model.img.height);
	};

	this.GetAnterakModel = function () {
		var vec = new Vector(
			(Goldo.posx + Goldo.model.img.width / 2) - (this.posx + this.model.img.width / 2),
			(Goldo.posy + Goldo.model.img.height / 2) - (this.posy + this.model.img.height / 2));
		vec.Normalize();

		var ang = (vec.x / Math.PI * 180);
		var index = -Math.floor(ang / 12);
		index = Math.max(-3, index);
		index = Math.min(4, index);
		index += 4;
		this.indexAntherakModel = index;
		return this.Antherak[index];
	};

	this.GetCurrentEyePos = function (EyeType) {
		var veceye = this.GetEyeRelativePos(this.indexAntherakModel, 1);
		veceye.x += this.posx;
		veceye.y += this.posy;
		return veceye;
	}

	this.GetLazerniumPos = function () {

		var vec = this.GetLazerniumRelativePos();
		vec.x += this.posx;
		vec.y += this.posy;
		return vec;
	}

	this.GetLazerniumRelativePos = function () {

		var vec = null;
		switch (this.indexAntherakModel) {
			case 1: vec = new Vector(192, 126); break;
			case 2: vec = new Vector(185, 86); break;
			case 3: vec = new Vector(186, 86); break;
			case 4: vec = new Vector(195, 82); break;
			case 5: vec = new Vector(153, 82); break;
			case 6: vec = new Vector(160, 86); break;
			case 7: vec = new Vector(162, 86); break;
			case 8: vec = new Vector(155, 125); break;
		}
		return vec;
	};

	this.GetTorseFireRelativePos = function () {

		var vec = null;
		switch (this.indexAntherakModel) {
			case 1: vec = new Vector(85, 104); break;
			case 2: vec = new Vector(75, 68); break;
			case 3: vec = new Vector(87, 61); break;
			case 4: vec = new Vector(96, 54); break;
			case 5: vec = new Vector(59, 55); break;
			case 6: vec = new Vector(66, 60); break;
			case 7: vec = new Vector(80, 68); break;
			case 8: vec = new Vector(70, 106); break;
		}

		return vec;
	};

	this.NewTorseFire = function () {
		var missil = new TorseFire();
		var vecpos = this.GetTorseFireRelativePos();
		vecpos.x += this.posx;
		vecpos.y += this.posy;
		missil.OwnerEntity = this;
		missil.Init(vecpos.x, vecpos.y, Goldo);
		missilList.AddObject(missil);
	};

	this.NewErgastulLame = function () {
		var missil = new ErgastulLame();
		missil.OwnerEntity = this;
		missil.Init(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2, Goldo);
		missilList.AddObject(missil);
	};

	this.ProcessFireAnimation = function (deltaTime) {

		this.Lazernium.Animate(deltaTime);

		if (this.mvtype == ErgastulEnum.MvtTypeAttac) {
			this.ProcessTorseFireAnimation(deltaTime);
		}
	};

	this.ProcessTorseFireAnimation = function (deltaTime) {
		this.torseFireTime += deltaTime;
		if (this.torseFireTime > this.nextTorseFireTime) {
			this.nbTorseFire++;
			this.NewTorseFire();

			if (this.nbTorseFire == this.nbTorseFireMax) {
				this.nextTorseFireTime = randomUniform(2000, 5000) / 1000;
				this.torseFireTime = 0;
				this.nbTorseFire = 0;
				this.nbTorseFireMax = randomUniform(2, 6);
			}
			else this.nextTorseFireTime += 0.2;
		}
	}

	this.ProcessLameFireAnimation = function (deltaTime) {
		this.lameFireTime += deltaTime;
		if (this.lameFireTime > this.lameNextFireTime) {
			this.lameFireTime = 0;
			this.lameNextFireTime = randomUniform(4000, 8000) / 1000;
			this.NewErgastulLame();
		}
	}

	this.ProcessMovArroundGoldo = function (deltaTime) {

		// this.arroundAng += this.speed * deltaTime;
		this.arroundAng += (this.arroundAngSign * 100) * deltaTime;
		var adx = Math.cos(this.arroundAng * Math.PI / 180);
		var ady = Math.sin(this.arroundAng * Math.PI / 180);

		var vec = new Vector(Goldo.posx, Goldo.posy);


		var dist = Math.max(this.model.img.width, this.model.img.height);
		vec.x += adx * dist;
		vec.y += ady * dist;

		this.dx = vec.x - this.posx - this.model.img.width / 2;
		this.dy = vec.y - this.posy - this.model.img.height / 2;

		var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
		this.dx /= len;
		this.dy /= len;

		this.posx += this.dx * this.speed * deltaTime;
		this.posy += this.dy * this.speed * deltaTime;
	};

}

Ergastul.prototype = Object.create(GinGin.prototype);
Ergastul.prototype.constructor = Ergastul;

Ergastul.prototype.Init = function () {

	this.Antherak = new Array();
	for (var i = 1; i <= 8; i++) {
		this.Antherak[i] = loader.GetModel('ErgastulMap' + i);
	}

	this.SetModel(this.Antherak[4]);
	this.vie = this.model.vie;
	this.speed = this.model.speed;
	this.valid = true;
	this.SetCurrentActionModel(1);
	this.RandomStartPosition();
	this.Lazernium = new ErgastulLazernium(this, 'ErgastulLazernium');

	this.lastLameAttacTime = 0;
	this.nextLameAttacTime = randomUniform(2, 5);
};

Ergastul.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	this.ProcessFireAnimation(deltaTime);

	switch (this.mvtype) {
		case ErgastulEnum.MvtTypeArrive:
			this.ProcessMovTowardGoldo(deltaTime);
			if (this.posy > 0) this.SetCurrentActionModel(ErgastulEnum.MvtTypeAttac);
			break;

		case ErgastulEnum.MvtTypeAttac:
			this.model = this.GetAnterakModel();
			this.ProcessMovArroundGoldo(deltaTime);

			this.lastLameAttacTime += deltaTime;
			if (this.lastLameAttacTime > this.nextLameAttacTime) {
				this.mvtype = ErgastulEnum.MvtTypeSpecialLame;
				var vecdir = new Vector(Goldo.posx - this.posx, Goldo.posy - this.posy);
				vecdir.Normalize();

				this.currentMvt = new MvtVector(-vecdir.x, -vecdir.y, 600, 300, 500);
			}

			break;

		case ErgastulEnum.MvtTypeSpecialLame:
			this.ProcessMovSpecial(deltaTime);
			if (this.currentMvt == null) {
				this.arroundAngSign = -this.arroundAngSign;
				this.NewErgastulLame();
				this.SetCurrentActionModel(ErgastulEnum.MvtTypeAttac);
				this.lastLameAttacTime = 0;
				this.nextLameAttacTime = randomUniform(5, 11);
			}
			break;
	}
};

Ergastul.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	ctx.drawImage(this.model.img, this.posx, this.posy);

	this.DrawQuadTree(ctx, this.posx, this.posy);

	this.Lazernium.Draw(ctx);
};

Ergastul.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};





Golgoth27Enum = {
	MvtTypeArrive: 1,
	MvtTypeAttac: 2,

	tentacule1: 1,
	tentacule2: 2,

	tentaculeRotate: 1,
	tentaculeTrack: 2,
};

function Golgoth27() {

	GinGin.call(this);
	this.model = null;

	this.mvtype = ErgastulEnum.MvtTypeArrive;

	this.Golgoth = new Array();
	this.indexGolgothModel = 0;

	this.tentacule01 = new Golgoth27Tentacule(this, Golgoth27Enum.tentacule1);
	this.tentacule02 = new Golgoth27Tentacule(this, Golgoth27Enum.tentacule2);

	this.arroundAng = randomUniform(1, 360);
	this.arroundAngSign = 1;

	this.SetCurrentActionModel = function (mvtype) {

		this.mvtype = mvtype;
		this.model = this.GetGolgothModel();
		this.rect = new RectSize(-this.model.img.width / 2, -this.model.img.height / 2, this.model.img.width, this.model.img.height);
	};

	this.GetGolgothModel = function () {
		var vec = new Vector(
			(Goldo.posx + Goldo.model.img.width / 2) - (this.posx + this.model.img.width / 2),
			(Goldo.posy + Goldo.model.img.height / 2) - (this.posy + this.model.img.height / 2));
		vec.Normalize();

		var ang = (vec.x / Math.PI * 180);
		var index = -Math.floor(ang / 12);
		index = Math.max(-1, index);
		index = Math.min(2, index);
		index += 1;
		this.indexGolgothModel = index;
		return this.Golgoth[index];
	};

	this.GetTentaculeRelativePos = function (type) {

		var vec = null;

		if (type == Golgoth27Enum.tentacule1) {
			switch (this.indexGolgothModel) {
				case 0: vec = new Vector(94, 122); break;
				case 1: vec = new Vector(24, 66); break;
				case 2: vec = new Vector(6, 78); break;
				case 3: vec = new Vector(4, 121); break;
			}
		}
		else {
			switch (this.indexGolgothModel) {
				case 0: vec = new Vector(167, 120); break;
				case 1: vec = new Vector(162, 80); break;
				case 2: vec = new Vector(142, 62); break;
				case 3: vec = new Vector(78, 122); break;
			}
		}

		return vec;
	};


	this.ProcessFireAnimation = function (deltaTime) {
		this.tentacule01.Animate(deltaTime);
		this.tentacule02.Animate(deltaTime);
	};

	this.ProcessMovArroundGoldo = function (deltaTime) {

		this.arroundAng += (this.arroundAngSign * 100) * deltaTime;
		var adx = Math.cos(this.arroundAng * Math.PI / 180);
		var ady = Math.sin(this.arroundAng * Math.PI / 180);

		var vec = new Vector(Goldo.posx, Goldo.posy);

		var dist = Math.max(this.model.img.width, this.model.img.height);
		vec.x += adx * dist;
		vec.y += ady * dist;

		this.dx = vec.x - this.posx - this.model.img.width / 2;
		this.dy = vec.y - this.posy - this.model.img.height / 2;

		var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
		this.dx /= len;
		this.dy /= len;

		var speed = (this.dy < 0) ? this.speed * 2 : this.speed;
		this.posx += this.dx * speed * deltaTime;
		this.posy += this.dy * speed * deltaTime;
	};

	this.GetLameSens = function () {
		return (this.indexGolgothModel < 2) ? -1 : 1;
	}
}

Golgoth27.prototype = Object.create(GinGin.prototype);
Golgoth27.prototype.constructor = Golgoth27;

Golgoth27.prototype.Init = function () {

	this.Golgoth = new Array();
	for (var i = 0; i <= 3; i++) {
		this.Golgoth[i] = loader.GetModel('Golgoth27Map' + (i + 1));
	}

	this.SetModel(this.Golgoth[3]);
	this.vie = this.model.vie;
	this.speed = this.model.speed;
	this.valid = true;
	this.SetCurrentActionModel(1);
	this.RandomStartPosition();

	this.lastLameAttacTime = 0;
	this.nextLameAttacTime = randomUniform(2, 5);
};

Golgoth27.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	this.ProcessMovArroundGoldo(deltaTime);

	this.ProcessFireAnimation(deltaTime);
	this.model = this.GetGolgothModel();

	switch (this.mvtype) {
		case Golgoth27Enum.MvtTypeArrive:
			this.ProcessMovTowardGoldo(deltaTime);
			if (this.posy > 200) this.SetCurrentActionModel(Golgoth27Enum.MvtTypeAttac);
			break;

		case Golgoth27Enum.MvtTypeAttac:
			break;
	}
};

Golgoth27.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	scrollZone.DrawShadowEntity(ctx, this);

	ctx.drawImage(this.model.img, this.posx, this.posy);

	this.tentacule01.Draw(ctx);
	this.tentacule02.Draw(ctx);

	this.DrawQuadTree(ctx, this.posx, this.posy);
};

Golgoth27.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};

Golgoth27.prototype.AllowCollisionSameCamp = function () {
	return false;
};





function Golgoth27Tentacule(ParentEntity, tentaculeType) {
	FireEntity.call(this, ParentEntity);
	this.animType = Golgoth27Enum.tentaculeTrack;
	this.tentaculeType = tentaculeType;

	this.angRotate = randomUniform(1, 360);
	this.angRotateSens = (randomUniform(1, 11) < 6) ? -1 : 1;
	this.dx = Math.cos(this.angRotate * Math.PI / 180);
	this.dy = Math.sin(this.angRotate * Math.PI / 180);

	this.model = loader.GetModel('Golgoth27Tentacule');
	this.lameMod = loader.GetModel('Golgoth27Lame');
	this.vie = this.model.vie;

	this.lameRadius = Math.min(this.lameMod.img.width, this.lameMod.img.height) / 1.5;
	this.tentaculeLen = 0;

	this.tentaculeLenMax = this.model.img.height;
	this.tentaculeLen2T = this.model.img.height / 2;
	this.tentaculeLenMin = this.model.img.height / 4;
	this.tentaculeGrow = 1;

	this.InFire = false;
	this.nextFireTime = randomUniform(2, 6);
	this.rotateTime = randomUniform(5, 11);
	this.trackTime = randomUniform(5, 13);

	this.CollideEntity = function (Target) {
		var cx = Target.posx + Target.model.img.width / 2;
		var cy = Target.posy + Target.model.img.height / 2;

		var bbox = this.GetProcessCollisionBBox();

		if (SegmentVsCircle(bbox.x1, bbox.y1, bbox.x2, bbox.y2, cx, cy, Target.radius) == true) return true;

		var sourcePosx = this.posx + this.dx * this.tentaculeLen;
		var sourcePosy = this.posy + this.dy * this.tentaculeLen;

		var targetPosx = Target.posx + Target.model.img.width / 2;
		var targetPosy = Target.posy + Target.model.img.height / 2;
		var ret = CircleVsCircle(sourcePosx, sourcePosy, this.lameRadius, targetPosx, targetPosy, Target.radius);
		return ret;
	};

	this.ProcessCollision = function () {
		var hasBeenCollision = false;
		var bbox = this.GetProcessCollisionBBox();

		var left = Math.min(bbox.x1, bbox.x2) - this.model.img.width / 2;
		var right = Math.max(bbox.x1, bbox.x2) + this.model.img.width / 2;
		var top = Math.min(bbox.y1, bbox.y2);
		var bottom = Math.max(bbox.y1, bbox.y2);

		var list = Scape.GetNodeRectList(left, top, right, bottom);
		var entityList = new ChainedList();
		var scapeNode = list.firstnode;
		while (scapeNode != null) {
			if (scapeNode.obj.EntityList != null) {
				var entityNode = scapeNode.obj.EntityList.firstnode;
				while (entityNode != null) {
					var entity = entityNode.obj;
					entityNode = entityNode.next;

					if (entity.IsValid() == false) continue;
					if (entity.model.camp == AppViewModel.campVega) continue;

					if (entity.model.isBonus == true) continue;

					if (entityList.FindObject(entity) != null) continue;

					if (this.CollideEntity(entity)) {
						hasBeenCollision = true;

						if (entity.model.isMissil == false && this.InFire == true && this.tentaculeGrow > 0) {
							this.tentaculeGrow = -1;
						}

						if (entity.CanDeleted()) {
							entity.Hit();
							if (entity.model.isMissil == true) {
								entity.SetNoValid();
							}
						}
						else {
							entity.AbortCurentAction();
						}

						if (entity.model.isMissil == true)
							this.HitDegat(entity.model.degat);
					}
				}
			}
			scapeNode = scapeNode.next;
		}
		return hasBeenCollision;
	}

	this.StartFire = function () {
		this.animType = Golgoth27Enum.tentaculeTrack;
		if (this.trackTime <= 0) this.trackTime = randomUniform(5, 13);

		this.nextFireTime = 0;
		this.InFire = true;

		this.tentaculeLen = this.tentaculeLenMin;
		this.tentaculeGrow = 1;

		var vecx = Goldo.posx + Goldo.model.img.width / 2 - this.posx;
		var vecy = Goldo.posy + Goldo.model.img.height / 2 - this.posy;
		var len = Math.sqrt(vecx * vecx + vecy * vecy);
		this.dx = vecx / len;
		this.dy = vecy / len;

		this.angRotate = -90 + Math.atan2(this.dy, this.dx) / Math.PI * 180;
		loader.PlaySound('JanusSaw', 0.8);
	}

	this.StartRotate = function () {
		this.InFire = false;
		this.animType = Golgoth27Enum.tentaculeRotate;
		this.rotateTime = randomUniform(5, 11);
		this.tentaculeLen = this.tentaculeLenMin;
		this.tentaculeGrow = 1;
		this.angRotateSens = (randomUniform(1, 11) < 6) ? -1 : 1;
	}

	this.TrackTarget = function (deltaTime) {

		this.trackTime -= deltaTime;
		if (this.trackTime <= 0) {
			this.StartRotate();
			return;
		}

		this.nextFireTime -= deltaTime;
		if (this.nextFireTime >= 0) return;
		if (this.InFire == false) {
			this.StartFire();
			return;
		}

		this.tentaculeLen += this.tentaculeGrow * this.model.speed * deltaTime;
		if (this.tentaculeLen > this.tentaculeLenMax) {
			this.tentaculeLen = this.tentaculeLenMax;
			this.tentaculeGrow = -1;
		}
		else
			if (this.tentaculeLen < 0 && this.tentaculeGrow < 0) {
				this.InFire = false;
				this.tentaculeLen = 0;
				this.tentaculeGrow = 1;
				this.nextFireTime = randomUniform(2, 6);
				return;
			}

		var rottime = 100 * deltaTime * Math.PI / 180;

		var vecx = Goldo.posx + Goldo.model.img.width / 2 - this.posx;
		var vecy = Goldo.posy + Goldo.model.img.height / 2 - this.posy;

		var len = Math.sqrt(vecx * vecx + vecy * vecy);
		vecx /= len;
		vecy /= len;

		var dot = vecy * this.dx - vecx * this.dy;

		var angtracker = this.angRotate * Math.PI / 180;
		if (Math.abs(rottime) > Math.abs(dot)) rottime = Math.abs(dot);
		if (dot < 0) angtracker -= rottime; // * 180 / Math.PI;
		else if (dot > 0) angtracker += rottime; // * 180 / Math.PI;

		this.dx = -Math.sin(angtracker);
		this.dy = Math.cos(angtracker);

		this.angRotate = angtracker * 180 / Math.PI;
	}

	this.AnimateRotate = function (deltaTime) {
		this.rotateTime -= deltaTime;
		if (this.rotateTime <= 0) {
			this.StartFire();
			return;
		}

		this.tentaculeLen += this.tentaculeGrow * 150 * deltaTime;
		if (this.tentaculeLen > this.tentaculeLen2T) {
			this.tentaculeLen = this.tentaculeLen2T;
			this.tentaculeGrow = -1;
		}
		else
			if (this.tentaculeLen < this.tentaculeLenMin && this.tentaculeGrow < 0) {
				this.tentaculeLen = this.tentaculeLenMin;
				this.tentaculeGrow = 1;
			}

		this.angRotate += this.angRotateSens * this.model.speedRot * deltaTime;
		this.dx = Math.cos(this.angRotate * Math.PI / 180);
		this.dy = Math.sin(this.angRotate * Math.PI / 180);
	}
}

Golgoth27Tentacule.prototype = Object.create(FireEntity.prototype);
Golgoth27Tentacule.prototype.constructor = Golgoth27Tentacule;

Golgoth27Tentacule.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	if (this.vie <= 0) return;

	var vec = this.Parent.GetTentaculeRelativePos(this.tentaculeType);
	this.posx = this.Parent.posx + vec.x;
	this.posy = this.Parent.posy + vec.y;

	switch (this.animType) {
		case Golgoth27Enum.tentaculeTrack: this.TrackTarget(deltaTime); break;
		case Golgoth27Enum.tentaculeRotate: this.AnimateRotate(deltaTime); break;
	}

	if (this.tentaculeLen > 0) this.ProcessCollision();
};

Golgoth27Tentacule.prototype.Draw = function (ctx) {
	if (this.valid == false) return;
	if (this.vie <= 0) return;

	ctx.save();
	ctx.translate(this.posx, this.posy);

	var angDraw = (this.animType == Golgoth27Enum.tentaculeRotate)
		? this.angRotate * Math.PI / 180 - Math.PI / 2
		: this.angRotate * Math.PI / 180;

	ctx.rotate(angDraw);
	ctx.drawImage(
		this.model.img,
		0,
		this.model.img.height - this.tentaculeLen,
		this.model.img.width,
		this.tentaculeLen,
		-this.model.img.width / 2,
		0
		, this.model.img.width,
		this.tentaculeLen);
	ctx.restore();

	if (this.tentaculeLen <= 0) {
		angDraw = Math.PI / 2 * this.Parent.GetLameSens();
	}

	ctx.save();
	ctx.translate(this.posx, this.posy);
	ctx.rotate(angDraw);
	ctx.drawImage(this.lameMod.img, -this.lameMod.img.width / 2, this.tentaculeLen - 20);
	ctx.restore();

	// var sourcePosx = this.posx + this.dx * this.tentaculeLen;
	// var sourcePosy = this.posy + this.dy * this.tentaculeLen;
	// DrawCircle (ctx,sourcePosx,sourcePosy,this.lameRadius);
	// var bbox = this.GetProcessCollisionBBox ();
	// DrawLine (ctx,bbox.x1,bbox.y1,bbox.x2,bbox.y2,'#AAAAFF');
	// DrawRect (ctx,bbox.x1,bbox.y1,bbox.x2 - bbox.x1,bbox.y2 - bbox.y1);
};

Golgoth27Tentacule.prototype.GetProcessCollisionBBox = function () {

	var vec = this.Parent.GetTentaculeRelativePos(this.tentaculeType);

	var startx = this.Parent.posx + vec.x;
	var starty = this.Parent.posy + vec.y;

	var endx = startx + this.dx * this.tentaculeLen;
	var endy = starty + this.dy * this.tentaculeLen;

	return new BBox(startx, starty, endx, endy);
}

Golgoth27Tentacule.prototype.IsEnableCollideSameCamp = function () {
	return true;
}

Golgoth27Tentacule.prototype.IsStopMissil = function () {
	return true;
};





function BaseVega() {

	Entity.call(this);
	this.model = null;
	this.phase = 1;
	this.childEntites = new ChainedList();
	this.bigShield = null;
	this.smallShield = null;
	this.tourelle01 = null;
	this.tourelle02 = null;
	this.tourelle03 = null;
	this.tourelle04 = null;
	this.QgEntity = null;

	this.CelluleBottomLeft = null;
	this.CelluleBottomRight = null;
	this.CelluleLeft = null;
	this.CelluleRight = null;
	this.CelluleTopLeft = null;
	this.CelluleTopRight = null;
	this.DestroyedElement = 0;

	this.IsDestroyed = function () {
		return (this.DestroyedElement >= 13) ? true : false;
	};
}

BaseVega.prototype = Object.create(Entity.prototype);
BaseVega.prototype.constructor = BaseVega;

BaseVega.prototype.Init = function () {

	this.SetModel(loader.GetModel('BaseVega'));

	this.posx = AppViewModel.canvasize.width / 2 - this.model.img.width / 2;
	this.posy = -(AppViewModel.canvasize.height + AppViewModel.canvasize.height / 2);

	this.vie = this.model.vie;
	this.speed = this.model.speed;
	this.valid = true;

	this.tourelle01 = new Tourelle(3, false, this);
	this.tourelle01.Init();
	this.tourelle01.posx = this.posx + 360;
	this.tourelle01.posy = this.posy + 475;
	this.childEntites.AddObject(this.tourelle01);

	this.tourelle02 = new Tourelle(3, false, this);
	this.tourelle02.Init();
	this.tourelle02.posx = this.posx + 870;
	this.tourelle02.posy = this.posy + 475;
	this.childEntites.AddObject(this.tourelle02);

	this.tourelle03 = new Tourelle(2, false, this);
	this.tourelle03.Init();
	this.tourelle03.posx = this.posx + 620;
	this.tourelle03.posy = this.posy + 225;
	this.childEntites.AddObject(this.tourelle03);

	this.tourelle04 = new Tourelle(1, false, this);
	this.tourelle04.Init();
	this.tourelle04.posx = this.posx + 620;
	this.tourelle04.posy = this.posy + 710;
	this.childEntites.AddObject(this.tourelle04);

	this.CelluleBottomLeft = null;
	this.CelluleBottomLeft = new BaseVegaChildEntity('BaseVegaCelluleBottomLeft', this);
	this.CelluleBottomLeft.Init();
	this.CelluleBottomLeft.posx = this.posx + 318;
	this.CelluleBottomLeft.posy = this.posy + 730;
	this.childEntites.AddObject(this.CelluleBottomLeft);

	this.CelluleBottomRight = null;
	this.CelluleBottomRight = new BaseVegaChildEntity('BaseVegaCelluleBottomRight', this);
	this.CelluleBottomRight.Init();
	this.CelluleBottomRight.posx = this.posx + 867;
	this.CelluleBottomRight.posy = this.posy + 730;
	this.childEntites.AddObject(this.CelluleBottomRight);

	this.CelluleLeft = null;
	this.CelluleLeft = new BaseVegaChildEntity('BaseVegaCelluleLeft', this);
	this.CelluleLeft.Init();
	this.CelluleLeft.posx = this.posx + 527;
	this.CelluleLeft.posy = this.posy + 466;
	this.childEntites.AddObject(this.CelluleLeft);

	this.CelluleRight = null;
	this.CelluleRight = new BaseVegaChildEntity('BaseVegaCelluleRight', this);
	this.CelluleRight.Init();
	this.CelluleRight.posx = this.posx + 673;
	this.CelluleRight.posy = this.posy + 466;
	this.childEntites.AddObject(this.CelluleRight);

	this.QgEntity = new BaseVegaChildEntity('BaseVegaQG', this);
	this.QgEntity.Init();
	this.QgEntity.posx = this.posx + 621;
	this.QgEntity.posy = this.posy + 478;
	this.childEntites.AddObject(this.QgEntity);

	this.smallShield = new BaseVegaChildEntity('BaseVegaSmallShield', this);
	this.smallShield.Init();
	this.smallShield.posx = this.posx + 598;
	this.smallShield.posy = this.posy + 458;
	this.childEntites.AddObject(this.smallShield);

	this.CelluleTopLeft = null;
	this.CelluleTopLeft = new BaseVegaChildEntity('BaseVegaCelluleTopLeft', this);
	this.CelluleTopLeft.Init();
	this.CelluleTopLeft.posx = this.posx + 321;
	this.CelluleTopLeft.posy = this.posy + 175;
	this.childEntites.AddObject(this.CelluleTopLeft);

	this.CelluleTopRight = null;
	this.CelluleTopRight = new BaseVegaChildEntity('BaseVegaCelluleTopRight', this);
	this.CelluleTopRight.Init();
	this.CelluleTopRight.posx = this.posx + 865;
	this.CelluleTopRight.posy = this.posy + 175;
	this.childEntites.AddObject(this.CelluleTopRight);

	this.bigShield = new BaseVegaChildEntity('BaseVegaBigShield', this);
	this.bigShield.Init();

	this.bigShield.posx = this.posx + 241;
	this.bigShield.posy = this.posy + 96;

	entityTerList.AddObject(this.bigShield);
	Scape.SpreadEntity(this.bigShield);
};

BaseVega.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	this.posy += scrollZone.Speed * deltaTime;

	switch (this.phase) {
		// Arrivée de la base à l'écran
		case 1:
			if (this.posy >= -this.model.img.height / 4) {
				scrollZone.SetSpeed(0);
				scrollZone.EnableStaticMode();
				this.phase = 2;
			}
			break;

		case 2:
			if (this.posy > AppViewModel.canvasize.height) {
				this.SetNoValid();
			}
			break;
	}

	var node = this.childEntites.firstnode;
	var memnode = null;
	while (node != null) {
		memnode = node;
		var entity = memnode.obj;
		node = node.next;
		entity.Animate(deltaTime);
	}
};

BaseVega.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	ctx.drawImage(this.model.img, this.posx, this.posy);
	this.DrawQuadTree(ctx, this.posx, this.posy);

	var node = this.childEntites.firstnode;
	var memnode = null;
	while (node != null) {
		memnode = node;
		var entity = memnode.obj;
		node = node.next;
		entity.Draw(ctx);
	}
};

BaseVega.prototype.OnEnded = function () {
};

BaseVega.prototype.IsStopMissil = function () {
	return false;
};

BaseVega.prototype.OnChildEnded = function (child) {

	this.DestroyedElement++;

	if (child == this.bigShield) {
		this.childEntites.RemoveObject(this.tourelle01);
		this.childEntites.RemoveObject(this.tourelle02);
		this.childEntites.RemoveObject(this.tourelle03);
		this.childEntites.RemoveObject(this.tourelle04);
		this.childEntites.RemoveObject(this.smallShield);

		this.childEntites.RemoveObject(this.CelluleBottomLeft);
		this.childEntites.RemoveObject(this.CelluleBottomRight);
		this.childEntites.RemoveObject(this.CelluleLeft);
		this.childEntites.RemoveObject(this.CelluleRight);
		this.childEntites.RemoveObject(this.CelluleTopLeft);
		this.childEntites.RemoveObject(this.CelluleTopRight);

		entityTerList.AddObject(this.CelluleBottomLeft);
		Scape.SpreadEntity(this.CelluleBottomLeft);
		entityTerList.AddObject(this.CelluleBottomRight);
		Scape.SpreadEntity(this.CelluleBottomRight);
		entityTerList.AddObject(this.CelluleLeft);
		Scape.SpreadEntity(this.CelluleLeft);
		entityTerList.AddObject(this.CelluleRight);
		Scape.SpreadEntity(this.CelluleRight);

		entityTerList.AddObject(this.smallShield);
		Scape.SpreadEntity(this.smallShield);

		entityTerList.AddObject(this.CelluleTopLeft);
		Scape.SpreadEntity(this.CelluleTopLeft);
		entityTerList.AddObject(this.CelluleTopRight);
		Scape.SpreadEntity(this.CelluleTopRight);

		entityTerList.AddObject(this.tourelle01);
		Scape.SpreadEntity(this.tourelle01);
		entityTerList.AddObject(this.tourelle02);
		Scape.SpreadEntity(this.tourelle02);
		entityTerList.AddObject(this.tourelle03);
		Scape.SpreadEntity(this.tourelle03);
		entityTerList.AddObject(this.tourelle04);
		Scape.SpreadEntity(this.tourelle04);
	}
	else if (child == this.smallShield) {
		this.childEntites.RemoveObject(this.QgEntity);
		entityTerList.AddObject(this.QgEntity);
		Scape.SpreadEntity(this.QgEntity);
	}
};

function BaseVegaChildEntity(modelName, OwnerEntity) {

	Entity.call(this, OwnerEntity);
	this.model = null;
	this.phase = 1;
	this.modelName = modelName;
}

BaseVegaChildEntity.prototype = Object.create(Entity.prototype);
BaseVegaChildEntity.prototype.constructor = BaseVegaChildEntity;

BaseVegaChildEntity.prototype.Init = function () {

	this.SetModel(loader.GetModel(this.modelName));

	this.vie = this.model.vie;
	this.speed = 0;
	this.valid = true;
};

BaseVegaChildEntity.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	this.posy += scrollZone.Speed * deltaTime;
};

BaseVegaChildEntity.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	if (this.Hitten == true) {
		var memOp = ctx.globalCompositeOperation;
		ctx.globalCompositeOperation = "lighten";
		ctx.drawImage(this.model.img, this.posx, this.posy);
		ctx.globalCompositeOperation = memOp;
		this.Hitten = false;
	}
	else {
		ctx.drawImage(this.model.img, this.posx, this.posy);
	}
	this.DrawQuadTree(ctx, this.posx, this.posy);
};

BaseVegaChildEntity.prototype.OnEnded = function () {

	if (this.OwnerEntity != null) {
		this.OwnerEntity.OnChildEnded(this);
	}
};

BaseVegaChildEntity.prototype.IsStopMissil = function () {
	return true;
};





// ---------------------------------------------------------------------------------
//
//										Util
//
// ---------------------------------------------------------------------------------
function DrawLine(ctx, x1, y1, x2, y2, color) {
	ctx.lineWidth = 4;
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function DrawCircle(ctx, posx, posy, radius) {
	ctx.strokeStyle = '#AAAAFF';
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.arc(posx, posy, radius, 0, 2 * Math.PI);
	ctx.stroke();
}

function DrawRect(ctx, posx, posy, width, height) {
	ctx.lineWidth = 4;
	ctx.strokeStyle = '#AAAAFF';
	ctx.beginPath();
	ctx.moveTo(posx, posy);
	ctx.lineTo(posx + width, posy);
	ctx.lineTo(posx + width, posy + height);
	ctx.lineTo(posx, posy + height);
	ctx.lineTo(posx, posy);
	ctx.stroke();
}

// Un objet qui défini une zone
// rectangulaire par quatre points
function Rect(posx1, posy1, posx2, posy2) {
	this.x1 = posx1;
	this.y1 = posy1;
	this.x2 = posx2;
	this.y2 = posy2;
}

// Un objet qui défini une zone
// rectangulaire par un point (x,y) et une largeur et une hauteur (cx et cy)
function RectSize(posx, posy, cx, cy) {
	this.x = posx;
	this.y = posy;
	this.cx = cx;
	this.cy = cy;
}

function BBox(X1, y1, x2, y2) {
	this.x1 = X1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
}

function Vector(posx, posy) {
	this.x = posx;
	this.y = posy;

	this.Normalize = function () {
		var len = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x /= len;
		this.y /= len;
	};
}

// dx = cos&
// dy = sin&
function Mat2D(cost, sint) {
	// cos&			-sin&
	this.a = cost; this.b = -sint;
	// sin&			cos&
	this.c = sint; this.d = cost;

	this.Mul = function (x, y) {
		var xp = x * this.a + y * this.b;
		var yp = x * this.c + y * this.d;
		return new Vector(xp, yp);
	};

	this.MulInv = function (x, y) {
		var xp = x * this.a - y * this.b;
		var yp = -x * this.c + y * this.d;
		return new Vector(xp, yp);
	};
}





function Companion() {
	Entity.call(this);

	this.level = 1;
	this.levelMax = 1;
}

Companion.prototype = Object.create(Entity.prototype);
Companion.prototype.constructor = Companion;

Companion.prototype.IncreaseLevel = function () {

	this.level++;
	if (this.level > this.levelMax) this.level = this.levelMax;
};

Companion.prototype.Collide = function (entity) {

	if (entity.IsValid() == false) return false;

	if (entity.IsStructureCollide() == false) return false;

	if (Goldo.CanBeHitten() == false) return false;
	if (this.CanBeHitten() == false) return false;

	if (entity.model.isMissil == true) {
		if (entity.Collide(this) == false) return false;
	}
	else {
		if (Collide(entity, this) == false) return false;
	}

	if (entity.model.isBonus == false) {
		entity.Hit();
		if (!entity.IsValid())
			NewExplosionPos(entity.posx + entity.model.img.width / 2, entity.posy + entity.model.img.height / 2);

		NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);

		this.Hit()
	}
	else {
		entity.ProcessBonus();
	}

	return true;
}

Companion.prototype.Draw = function (ctx) {

	if (this.valid == false) return;
	if (!this.CanBeHitten() || !Goldo.CanBeHitten()) ctx.globalAlpha = 0.25;

	scrollZone.DrawShadowEntity(ctx, this);

	ctx.drawImage(this.model.img,
		this.posx,
		this.posy);
	ctx.globalAlpha = 1;
};

Companion.prototype.Hit = function () {
	if (this.CanBeHitten()) {
		this.vie--;
		this.level--;
		if (this.level < 1) this.level = 1;
		this.canbehittentime = 1.5; // seconde
	}
};

Companion.prototype.HitDegat = function (degats) {
	this.Hit();
};

Companion.prototype.SetModel = function (model) {
	this.model = model;
	this.vie = model.vie;
	this.SetMinusRadius();
	this.rect = new RectSize(-model.img.width / 2, -model.img.height / 2, model.img.width, model.img.height);
};

Companion.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.canbehittentime -= deltaTime;
};





function Alcorak() {
	Companion.call(this);
	this.levelMax = 4;

	this.NewVictorang = function () {

		var missil = new Victorang(this);
		missil.Init();
		missilList.AddObject(missil);
	};

	this.NewMissilGamma = function (type) {

		var missil = new MissilGamma();

		switch (type) {
			case 1:
				missil.posx = this.posx + 57 - modelMissilGamma.img.width / 2;
				missil.posy = this.posy + 43;
				break;

			case 2:
				missil.posx = this.posx + 73 - modelMissilGamma.img.width / 2;
				missil.posy = this.posy + 43;
				break;

			case 3:
				missil.posx = this.posx + this.model.img.width / 2 - modelMissilGamma.img.width / 2;
				missil.posy = this.posy;
				break;
		}

		missil.SetModel(modelMissilGamma);
		missil.speed = modelMissilGamma.speed;

		missil.valid = true;
		missilList.AddObject(missil);
	};
}

Alcorak.prototype = Object.create(Companion.prototype);
Alcorak.prototype.constructor = Alcorak;

Alcorak.prototype.Init = function () {

	this.SetModel(loader.GetModel('Alcorak'));
};

Alcorak.prototype.Fire = function () {

	if (!this.CanBeHitten()) return;

	switch (this.level) {
		case 1: this.NewMissilGamma(3); break;

		case 2:
			this.NewMissilGamma(1);
			this.NewMissilGamma(2);
			break;

		case 3:
			this.NewMissilGamma(1);
			this.NewMissilGamma(2);
			this.NewMissilGamma(3);
			break;

		default: this.NewVictorang(); break;
	}
}





function Fossoirak() {
	Companion.call(this);
	this.levelMax = 4;

	this.NewMissilSigma = function (type) {

		var x, y;
		switch (type) {
			case 1: x = 7; y = 24; break;
			case 2: x = 58; y = 53; break;
		}

		var missil = new MissilSigma();
		missil.Init();
		missil.posx = this.posx + x;
		missil.posy = this.posy + y;

		missil.valid = true;
		missilList.AddObject(missil);
	};

	this.NewPyroBombe = function () {

		var pyro = new PyroBombe();
		pyro.Init();
		pyro.posx = this.posx + 20;
		pyro.posy = this.posy + 58;

		pyro.valid = true;
		missilList.AddObject(pyro);
	};

	this.NewMissilGamma = function (type) {

		var x, y;
		switch (type) {
			case 1: x = 7; y = 24; break;
			case 2: x = 58; y = 53; break;
			case 3: x = this.model.img.width / 2; y = 0; break;
		}

		var missil = new MissilGamma();
		missil.posx = this.posx + x - modelMissilGamma.img.width / 2;
		missil.posy = this.posy + y;
		missil.SetModel(modelMissilGamma);

		missil.valid = true;
		missilList.AddObject(missil);
	};
}

Fossoirak.prototype = Object.create(Companion.prototype);
Fossoirak.prototype.constructor = Fossoirak;

Fossoirak.prototype.Init = function () {

	this.SetModel(loader.GetModel('Fossoirak'));
};

Fossoirak.prototype.Fire = function () {

	if (!this.CanBeHitten()) return;

	switch (this.level) {
		case 1: this.NewMissilGamma(3); break;

		case 2:
			this.NewMissilGamma(1);
			this.NewMissilGamma(2);
			break;

		case 3:
			this.NewMissilSigma(1);
			this.NewMissilSigma(2);
			break;

		default:
			this.NewMissilSigma(1);
			this.NewMissilSigma(2);
			this.NewPyroBombe();
			break;
	}
}

Fossoirak.prototype.IncreaseLevel = function () {

	this.level++;

	switch (this.level) {
		case 4: loader.PlaySound('Pyrobombe', 0.9); break;
	}

	if (this.level > this.levelMax) this.level = this.levelMax;
};





function Venusiak() {
	Companion.call(this);
	this.levelMax = 3;

	this.level = 2;

	this.NewDeltaLame = function () {

		var missil = new Deltalame(this);
		missil.Init();
		missilList.AddObject(missil);
	};

	this.NewMissilGamma = function (type) {

		var x, y;
		switch (type) {
			case 1: x = 3; y = 42; break;
			case 2: x = 64; y = 7; break;
			case 3: x = this.model.img.width / 2; y = 0; break;
		}

		var missil = new MissilGamma();
		missil.posx = this.posx + x - modelMissilGamma.img.width / 2;
		missil.posy = this.posy + y;
		missil.SetModel(modelMissilGamma);

		missil.valid = true;
		missilList.AddObject(missil);
	};
}

Venusiak.prototype = Object.create(Companion.prototype);
Venusiak.prototype.constructor = Venusiak;

Venusiak.prototype.Init = function () {

	this.SetModel(loader.GetModel('Venusiak'));
};

Venusiak.prototype.Fire = function () {

	if (!this.CanBeHitten()) return;

	switch (this.level) {
		case 1: this.NewMissilGamma(3); break;
		case 2:
			this.NewMissilGamma(1);
			this.NewMissilGamma(2);
			break;
		default:
			this.NewDeltaLame();
			break;
	}
}

Venusiak.prototype.IncreaseLevel = function () {

	this.level++;

	switch (this.level) {
		case 3: loader.PlaySound('DeltaLame', 0.9); break;
	}

	if (this.level > this.levelMax) this.level = this.levelMax;
};





function OVTerre() {
	Companion.call(this);
	this.levelMax = 2;

	this.level = 1;
	this.ang = 0;

	this.NewMissilGamma = function () {
		var missil = new MissilGamma();
		missil.posx = this.posx + this.model.img.width / 2 - modelMissilGamma.img.width / 2;
		missil.posy = this.posy;
		missil.SetModel(modelMissilGamma);

		missil.valid = true;
		missilList.AddObject(missil);
	};

	this.UpdatePosition = function () {

		RemoveScapeEntity(this);

		this.posx = Goldo.posx + Goldo.model.img.width / 2 - this.model.img.width / 2;
		this.posx += Math.cos(this.ang * Math.PI / 180) * Goldo.radius * 2.2;

		this.posy = Goldo.posy + Goldo.model.img.height / 2 - this.model.img.height / 2;
		this.posy += Math.sin(this.ang * Math.PI / 180) * Goldo.radius * 2.2;

		Scape.SpreadEntity(this);
	};

}

OVTerre.prototype = Object.create(Companion.prototype);
OVTerre.prototype.constructor = OVTerre;

OVTerre.prototype.Init = function () {

	this.SetModel(loader.GetModel('OVTerre'));
};

OVTerre.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.canbehittentime -= deltaTime;
	this.ang += 140 * deltaTime;
	this.UpdatePosition();
};

OVTerre.prototype.Fire = function () {

	if (!this.CanBeHitten()) return;

	this.NewMissilGamma();
}

OVTerre.prototype.IncreaseLevel = function () {

	this.level++;

	if (this.level > this.levelMax) this.level = this.levelMax;
};





function AnimatedModel(modelName, nbcol, nbrow) {
	Entity.call(this);
	this.modelName = modelName;
	this.nbcol = nbcol;
	this.nbrow = nbrow;
	this.nbimage = nbcol * nbrow;
	this.indeximage = 0;
	this.timeAnimation = 0;
	this.InvertAnimation = false;
	this.drawWidth = 0;
	this.drawHeight = 0;
	this.timeAnimationSpeed = 0.08;
	this.timeLife = 0;

	this.ResetTimeLife = function () {
		this.timeLife = 0;
		this.valid = true;
	};

	this.CheckLifeOver = function (timemax) {
		if (this.timeLife > timemax) {
			this.valid = false;
		}
	};
}

AnimatedModel.prototype = Object.create(Entity.prototype);
AnimatedModel.prototype.constructor = AnimatedModel;

AnimatedModel.prototype.Init = function () {

	this.model = loader.GetModel(this.modelName);

	this.drawWidth = this.model.img.width / this.nbcol;
	this.drawHeight = this.model.img.height / this.nbrow;
	this.nbimage = this.nbcol * this.nbrow;
};

AnimatedModel.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	this.timeAnimation += deltaTime;
	if (this.timeAnimation > this.timeAnimationSpeed) {
		this.timeAnimation = 0;

		if (this.InvertAnimation == false) {
			this.indeximage++;
			if (this.indeximage == this.nbimage) this.indeximage = 0;
		}
		else {
			this.indeximage--;
			if (this.indeximage < 0) this.indeximage = this.nbimage - 1;
		}
	}
};

AnimatedModel.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	var ix = Math.floor(this.indeximage % this.nbcol);
	var iy = Math.floor(this.indeximage / this.nbcol);

	ctx.drawImage(
		this.model.img,
		ix * this.drawWidth,
		iy * this.drawHeight,
		this.drawWidth,
		this.drawHeight, this.posx, this.posy, this.drawWidth, this.drawHeight);
};





function MegaMach(parentEntity, timeLifeMax, modelName, nbcol, nbrow) {

	AnimatedModel.call(this, modelName, nbcol, nbrow);

	this.parent = parentEntity;
	this.timeLifeMax = timeLifeMax;

	this.IsInMegaMach = function () {
		if (this.valid == false) return false;
		return (this.timeLife <= this.timeLifeMax);
	};

	this.Stop = function () {
		if (this.valid == true)
			this.timeLife = this.timeLifeMax + 1;
	};

}

MegaMach.prototype = Object.create(AnimatedModel.prototype);
MegaMach.prototype.constructor = MegaMach;

MegaMach.prototype.Init = function () {

	AnimatedModel.prototype.Init.call(this);
	this.valid = false;
};

MegaMach.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.timeLife += deltaTime;
	if (this.timeLife > this.timeLifeMax) {
		this.valid = false;
		scrollZone.SetSpeedTarget(50, 400);
		Sequencer.OnMegaMachEnded();
	}
	else {
		AnimatedModel.prototype.Animate.call(this, deltaTime);
	}
};

MegaMach.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	var ix = Math.floor(this.indeximage % this.nbcol);
	var iy = Math.floor(this.indeximage / this.nbcol);

	ctx.drawImage(
		this.model.img,
		ix * this.drawWidth,
		iy * this.drawHeight,
		this.drawWidth,
		this.drawHeight, this.parent.posx, this.parent.posy, this.drawWidth, this.drawHeight);
};





function Tourelle(typeTourelle, hasSupport, OwnerEntity) {

	Entity.call(this, OwnerEntity);
	this.supportModel = null;
	this.ang = 90 * Math.PI / 180;
	this.angcib = 0;
	this.fireTime = 0;
	this.NextfireTime = randomUniform(1, 9);
	this.nbFire = 0;
	this.typeTourelle = typeTourelle;
	this.fireLazernium = null;
	this.hasSupport = (hasSupport == undefined) ? true : false;

	this.NewMissil = function () {
		var missil = new Missil(1);

		var missilmodel;
		switch (this.typeTourelle) {
			case 2: missilmodel = loader.GetModel('TourelleFire02'); break;
			// case 3:this.SetModel (loader.GetModel ('Tourelle03'));break;
			default: missilmodel = loader.GetModel('TourelleFire01'); break;
		}

		missil.SetModel(missilmodel);
		missil.speed = missilmodel.speed;

		missil.SetFireDirection(
			this.posx + this.model.img.width / 2,
			this.posy + this.model.img.height / 2,
			this.dx, this.dy);

		missilList.AddObject(missil);
		loader.PlaySound('TourelleFire', 0.1);
	};
}

Tourelle.prototype = Object.create(Entity.prototype);
Tourelle.prototype.constructor = Tourelle;

Tourelle.prototype.Init = function () {

	switch (this.typeTourelle) {
		case 2: this.SetModel(loader.GetModel('Tourelle02')); break;
		case 3:
			this.SetModel(loader.GetModel('Tourelle03'));

			this.fireLazernium = new Lazernium(this, true, true, "TourelleLazer");
			this.fireLazernium.Init();
			break;
		default:
			this.typeTourelle = 1;
			this.SetModel(loader.GetModel('Tourelle01')); break;
	}

	this.supportModel = loader.GetModel('TourelleSupport');

	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;

	this.posy = -this.model.img.height - randomUniform(this.model.img.height, this.model.img.height * 3);

	this.valid = true;
};

Tourelle.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.posy += scrollZone.Speed * deltaTime;

	if (this.posy > AppViewModel.canvasize.height) {
		this.SetNoValid();
	}

	this.fireTime += deltaTime;

	switch (this.typeTourelle) {
		case 1: case 2:
			if (this.fireTime > this.NextfireTime) {
				this.NewMissil();
				if (this.typeTourelle == 1) {
					this.NextfireTime = randomUniform(1, 9);
					this.fireTime = 0;
				}
				else {
					this.nbFire++;
					if (this.nbFire == 2) {
						this.NextfireTime = randomUniform(1, 9);
						this.fireTime = 0;
						this.nbFire = 0;
					}
					else this.NextfireTime += 0.3;
				}
			}
			break;

		case 3:
			if (this.fireLazernium != null) this.fireLazernium.Animate(deltaTime);
			break;
	}

	if (randomUniform(1, 1000) == 1) {
		loader.PlaySound('TourelleActive', 0.3);
	}

	this.DirToTarget(Goldo, deltaTime);
};

Tourelle.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	if (this.hasSupport == true) {
		ctx.save();
		ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
		ctx.drawImage(this.supportModel.img, -this.supportModel.img.width / 2, -this.supportModel.img.height / 2);
		ctx.restore();
	}

	if (this.fireLazernium != null) this.fireLazernium.Draw(ctx);

	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.ang - 90 * Math.PI / 180);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();

	this.DrawQuadTree(ctx, this.posx, this.posy);
};

Tourelle.prototype.Collide = function (entity) {
	return false;
};

Tourelle.prototype.IsStopMissil = function () {
	return true;
};

Tourelle.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		if (this.vie <= 0) {
			NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
			decorManager.NewGroundDecor(DecorEnum.other, this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2, 'TourelleDebris');
		}

		if (this.OwnerEntity != null) {
			this.OwnerEntity.OnChildEnded(this);
		}
	}
};





function TourelleMissil(typeMissil) {

	Entity.call(this);
	this.supportModel = null;
	this.missilModel = null;
	this.ang = 90 * Math.PI / 180;
	this.angcib = 0;
	this.fireTime = 0;
	this.NextfireTime = randomUniform(1, 4);

	this.typeMissil = typeMissil;
	this.missil01Fired = false;
	this.missil02Fired = false;

	this.Fire = function (posxref) {

		var missil = new Missil(this.typeMissil);
		missil.SetModel(this.missilModel);
		missil.speed = this.missilModel.speed;
		missil.speedRot = this.missilModel.speedRot;

		missil.SetFireDirection(0, 0, this.dx, this.dy);

		var mat = new Mat2D(this.dy, -this.dx);
		var vect = mat.Mul(-this.missilModel.img.width / 2 + posxref, this.missilModel.img.height / 2);
		missil.posx = this.posx + this.model.img.width / 2 + vect.x;
		missil.posy = this.posy + this.model.img.height / 2 + vect.y;

		missil.posx += this.dy * this.missilModel.img.width / 2;
		missil.posy += -this.dx * this.missilModel.img.width / 2;
		missil.posx -= this.dx * this.missilModel.img.height / 2;
		missil.posy -= this.dy * this.missilModel.img.height / 2;

		missil.posx -= this.missilModel.img.width / 2;
		missil.posy -= this.missilModel.img.height / 2;

		entityList.AddObject(missil);

		loader.PlaySound('Missil', 0.5);
	};
}

TourelleMissil.prototype = Object.create(Entity.prototype);
TourelleMissil.prototype.constructor = TourelleMissil;

TourelleMissil.prototype.Init = function () {

	this.SetModel(loader.GetModel('TourelleMissil'));
	this.supportModel = loader.GetModel('TourelleMissilSupport');

	this.missilModel = loader.GetModel(this.typeMissil == 1 ? 'Missil01' : 'Missil02');

	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;

	this.posy = -this.model.img.height - randomUniform(0, this.model.img.height * 2);

	this.valid = true;
};

TourelleMissil.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.speed = scrollZone.Speed;
	this.posy += scrollZone.Speed * deltaTime;

	if (this.posy > AppViewModel.canvasize.height) {
		this.SetNoValid();
	}

	if (randomUniform(1, 1000) == 1) {
		loader.PlaySound('TourelleActive', 0.3);
	}

	this.fireTime += deltaTime;

	if (this.fireTime > this.NextfireTime) {
		var missilno = randomUniform(1, 3);
		if (missilno == 1 && this.missil01Fired == false) {
			this.Fire(-30);
			this.missil01Fired = true;
		}
		else if (this.missil02Fired == false) {
			this.Fire(30);
			this.missil02Fired = true;
		}
		this.NextfireTime = randomUniform(1, 4);
		this.fireTime = 0;
	}

	this.DirToTarget(Goldo, deltaTime);
};


TourelleMissil.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.drawImage(this.supportModel.img, -this.supportModel.img.width / 2, -this.supportModel.img.height / 2);
	ctx.rotate(this.ang - 90 * Math.PI / 180);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);

	if (this.missil01Fired == false) {
		ctx.save();
		ctx.translate(-30, 0);
		ctx.drawImage(this.missilModel.img, -this.missilModel.img.width / 2, -this.missilModel.img.height / 2);
		ctx.restore();
	}

	if (this.missil02Fired == false) {
		ctx.save();
		ctx.translate(30, 0);
		ctx.drawImage(this.missilModel.img, -this.missilModel.img.width / 2, -this.missilModel.img.height / 2);
		ctx.restore();
	}
	ctx.restore();

	this.DrawQuadTree(ctx, this.posx, this.posy);
};

TourelleMissil.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		if (this.vie <= 0) {
			NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
			decorManager.NewGroundDecor(DecorEnum.other, this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2, 'TourelleMissilDebris');
		}
	}
};

TourelleMissil.prototype.IsStopMissil = function () {
	return true;
};





function Baricade() {

	Entity.call(this, null);
}

Baricade.prototype = Object.create(Entity.prototype);
Baricade.prototype.constructor = Baricade;

Baricade.prototype.Init = function () {

	this.SetModel(loader.GetModel('Baricade'));

	var nb = AppViewModel.canvasize.width / (this.model.img.width / 2);
	var posrnd = randomUniform(0, nb);
	this.posx = posrnd * this.model.img.width / 2;

	this.posy = -this.model.img.height;
	this.valid = true;
};

Baricade.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.posy += scrollZone.Speed * deltaTime;

	if (this.posy > AppViewModel.canvasize.height) {
		this.SetNoValid();
	}
};

Baricade.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	ctx.drawImage(this.model.img, this.posx, this.posy);
	this.DrawQuadTree(ctx, this.posx, this.posy);
};

Baricade.prototype.IsStopMissil = function () {
	return true;
};

Baricade.prototype.IsInvulnerable = function () {
	return true;
};





function GroundDecor(decorType) {

	Entity.call(this);
	this.supportModel = null;
	this.ang = 0;
	this.decorType = decorType;
}

GroundDecor.prototype = Object.create(Entity.prototype);
GroundDecor.prototype.constructor = GroundDecor;

GroundDecor.prototype.Init = function () {
	this.valid = true;
};

GroundDecor.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.speed = scrollZone.Speed;
	this.posy += scrollZone.Speed * deltaTime;

	if (this.posy > AppViewModel.canvasize.height) {
		this.SetNoValid();
	}
};

GroundDecor.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	ctx.save();
	ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	ctx.rotate(this.ang * Math.PI / 180);
	ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
	ctx.restore();
};





function Asteroid() {

	Entity.call(this);
	this.dirx = 0;
	this.diry = 1;
	this.timeLifeSpent = 0;
	this.speedRot = 0;
	this.angRot = 0;
	this.radiusColide = 0;

	this.InitDirection = function () {
		var ang = randomUniform(75, 106) * Math.PI / 180;
		this.dirx = Math.cos(ang);
		this.diry = Math.sin(ang);
	};

	this.BurstTo = function (burstType) {

		// On ne le fait que si il est bien visible
		if (this.posy < -this.model.img.height) return;

		var burstModelName;
		switch (burstType) {
			case 1: burstModelName = 'SmallAsteroidMap1'; break;
			case 2: burstModelName = 'MediumAsteroidMap1'; break;
			default: return;
		}

		var mediumModel = loader.GetModel(burstModelName);
		var mediumMinsize = Math.min(mediumModel.img.width, mediumModel.img.height);
		var mediumMaxsize = Math.max(mediumModel.img.width, mediumModel.img.height);
		var bigMaxsize = Math.max(this.model.img.width, this.model.img.height);
		var nbChildAsteroid = 1 + Math.floor(bigMaxsize / mediumMinsize);
		var angInc = 360 / nbChildAsteroid;
		var angStart = randomUniform(0, 360);

		for (var i = 1; i <= nbChildAsteroid; i++) {
			angStart += angInc;
			var dirx = Math.cos(angStart * Math.PI / 180);
			var diry = Math.sin(angStart * Math.PI / 180);

			var posx = this.posx + this.model.img.width / 2 + dirx * mediumMaxsize;
			var posy = this.posy + this.model.img.height / 2 + diry * mediumMaxsize;

			var asteroid = null;
			switch (burstType) {
				case 1: asteroid = new SmallAsteroid(); break;
				case 2: asteroid = new MediumAsteroid(); break;
			}

			asteroid.Init();

			asteroid.dirx = dirx;
			asteroid.diry = diry;

			asteroid.posx = posx;
			asteroid.posy = posy;
			asteroid.speed = this.speed * 2;
			entityList.AddObject(asteroid);
		}
	};
}

Asteroid.prototype = Object.create(Entity.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	this.timeLifeSpent += deltaTime;

	var deltaSpeed = (scrollZone.Speed + this.speed) * deltaTime;
	this.posy += this.diry * deltaSpeed;
	this.posx += this.dirx * deltaSpeed;

	if (this.speedRot > 0) this.angRot += this.speedRot * deltaTime;

	if ((this.posy > AppViewModel.canvasize.height)
		|| (this.posx > AppViewModel.canvasize.width)
		|| (this.posx < -this.model.img.width)
		|| (this.diry <= 0 && this.posy < -this.model.img.height)) {
		this.SetNoValid();
	}
};

Asteroid.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	if (this.speedRot == 0) ctx.drawImage(this.model.img, this.posx, this.posy);
	else {
		ctx.save();
		ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
		ctx.rotate(this.angRot * Math.PI / 180);
		ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
		ctx.restore();
	}

	this.DrawQuadTree(ctx, this.posx, this.posy);
};

Asteroid.prototype.AllowCollisionSameCamp = function () {
	return true;
};

Asteroid.prototype.Collide = function (entity) {

	// On ne le fait que si il est bien visible
	if (this.posy < -this.model.img.height) return;

	if (entity.IsValid() == false) return false;
	if (entity.model.isBonus == true) return false;

	if (entity.model.camp != this.model.camp) {
		if (entity.model.isMissil == true) {
			if (entity.Collide(this) == false) return false;
		}
		else {
			if (Collide(entity, this) == false) return false;
		}
	}
	else {
		if (CollideCircle(this, this.radiusColide, entity, entity.radiusColide) == false) return false;
		if (this.model.hasQuadNode || entity.model.hasQuadNode) {
			if (Collide(entity, this) == false) return false;
		}
	}

	if (entity.model.camp == this.model.camp) {
		var difpos = entity.posx - this.posx;

		if (difpos >= 0) {
			if (this.dirx >= 0) this.dirx = -this.dirx;
			if (entity.dirx <= 0) entity.dirx = -entity.dirx;
		}
	}

	entity.HitDegat(this.model.degat);

	if (!entity.IsValid())
		NewExplosionPos(entity.posx + entity.model.img.width / 2, entity.posy + entity.model.img.height / 2);

	this.HitDegat(entity.model.degat);

	return true;
}

// Eclatement des asteroids
Asteroid.prototype.burst = function () {
}





function SmallAsteroid() {

	Asteroid.call(this);
}

SmallAsteroid.prototype = Object.create(Asteroid.prototype);
SmallAsteroid.prototype.constructor = SmallAsteroid;

SmallAsteroid.prototype.Init = function () {

	var modelName = 'SmallAsteroidMap' + randomUniform(1, 10);

	this.SetModel(loader.GetModel(modelName));

	this.radiusColide = this.radius * 0.95;

	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;
	this.posy = -this.model.img.height;

	this.InitDirection();

	this.speedRot = randomUniform(0, 180);
	if (this.speedRot > 0) this.angRot = randomUniform(0, 360);

	this.speed = randomUniform(100, 300);

	this.valid = true;
};

SmallAsteroid.prototype.OnEnded = function () {
	if (this.vie <= 0) NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
};





function MediumAsteroid() {

	Asteroid.call(this);
}

MediumAsteroid.prototype = Object.create(Asteroid.prototype);
MediumAsteroid.prototype.constructor = MediumAsteroid;

MediumAsteroid.prototype.Init = function () {

	var modelName = 'MediumAsteroidMap' + randomUniform(1, 10);

	this.SetModel(loader.GetModel(modelName));
	this.radiusColide = this.radius * 0.95;

	this.vie += randomUniform(0, Math.max(this.model.img.width, this.model.img.height));

	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;
	this.posy = -this.model.img.height * randomUniform(2, 4);

	this.InitDirection();

	this.speedRot = randomUniform(0, 180);
	if (this.speedRot > 0) this.angRot = randomUniform(0, 360);

	this.speed = randomUniform(100, 300);

	this.valid = true;
};

MediumAsteroid.prototype.IsStopMissil = function () {
	return true;
};

MediumAsteroid.prototype.OnEnded = function () {
	if (this.vie <= 0) {
		NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
		this.burst();
	}
};

MediumAsteroid.prototype.burst = function () {

	this.BurstTo(1);
}





function BigAsteroid() {

	Asteroid.call(this);
}

BigAsteroid.prototype = Object.create(Asteroid.prototype);
BigAsteroid.prototype.constructor = BigAsteroid;

BigAsteroid.prototype.Init = function () {

	var modelName = 'GrosAsteroid0' + randomUniform(1, 6);

	this.SetModel(loader.GetModel(modelName));
	this.radiusColide = this.radius * 0.9;

	this.vie += randomUniform(0, Math.max(this.model.img.width, this.model.img.height));

	this.posx = randomUniform(1, Math.floor(AppViewModel.canvasize.width / this.model.img.width)) * this.model.img.width;
	this.posy = -this.model.img.height * randomUniform(4, 6);

	this.InitDirection();
	this.speed = randomUniform(50, 100);

	this.valid = true;
};

BigAsteroid.prototype.IsStopMissil = function () {
	return true;
};

BigAsteroid.prototype.OnEnded = function () {
	if (this.vie <= 0) {
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
		this.burst();
	}
};

// Eclatement des asteroids
BigAsteroid.prototype.burst = function () {

	this.BurstTo(2);
}





function SoucoupeImperiale() {
	Entity.call(this);

	this.indexModel = 3;
	this.Soucoupes = null;
	this.ShieldEntity = null;
	this.spentChangeModelTime = 0;

	this.imperialLazernium = null;
	this.posyMax = 0;

	this.SetCurrentModel = function (deltaTime) {

		var vec = new Vector(Goldo.posx - this.posx, Goldo.posy - this.posy);
		vec.Normalize();

		var ang = (vec.x / Math.PI * 180);
		var index = -Math.floor(ang / 13);
		index = Math.max(-2, index);
		index = Math.min(2, index);
		index += 3;

		if (index == this.indexModel) return;

		this.spentChangeModelTime += deltaTime;
		if (this.spentChangeModelTime > 0.25) {
			this.spentChangeModelTime = 0;

			if (this.indexModel < index) this.indexModel++;
			else if (this.indexModel > index) this.indexModel--;

			if (this.indexModel < 1) this.indexModel = 1;
			else if (this.indexModel > 5) this.indexModel = 5;
		}

		this.model = this.Soucoupes[this.indexModel];
		this.rect = new RectSize(-this.model.img.width / 2, -this.model.img.height / 2, this.model.img.width, this.model.img.height);
	};

	this.GetLazerniumPos = function () {

		var vec = null;
		switch (this.indexModel) {
			case 1: vec = new Vector(394, 465); break;
			case 2: vec = new Vector(332, 512); break;
			case 4: vec = new Vector(127, 516); break;
			case 3: vec = new Vector(226, 533); break;
			case 5: vec = new Vector(67, 465); break;
			default: vec = new Vector(this.model.img.width / 2, this.model.img.height / 2); break;
		}

		vec.x += this.posx;
		vec.y += this.posy;
		return vec;
	}

	this.ProcessMovTowardGoldo = function (deltaTime) {

		this.dx = Goldo.posx + Goldo.model.img.width / 2 - this.posx - this.model.img.width / 2;
		this.dy = Goldo.posy - this.posy;
		var len = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
		this.dx /= len;
		this.dy /= len;

		this.posx += this.dx * this.speed * deltaTime;
		this.posy += this.dy * this.speed * deltaTime;
		if (this.posy > this.posyMax) this.posy = this.posyMax;
	};
}

SoucoupeImperiale.prototype = Object.create(Entity.prototype);
SoucoupeImperiale.prototype.constructor = SoucoupeImperiale;

SoucoupeImperiale.prototype.Init = function () {

	this.Soucoupes = new Array();
	for (var i = 1; i <= 5; i++) {
		this.Soucoupes[i] = loader.GetModel('SoucoupeImperialeMap' + i);
	}

	this.SetCurrentModel(0);
	this.SetModel(this.Soucoupes[this.indexModel]);

	this.posyMax = - this.model.img.height / 10;

	this.vie = this.model.vie;
	this.speed = this.model.speed;
	this.valid = true;

	this.posx = AppViewModel.canvasize.width / 2 - this.model.img.width / 2;
	this.posy = - this.model.img.height;

	this.ShieldEntity = new ShieldImperial(this);
	this.ShieldEntity.Init();
	Scape.SpreadEntity(this.ShieldEntity);
	entityList.AddObject(this.ShieldEntity);

	this.imperialLazernium = new ImperialLazernium(this, 'LazerImperialMap1');
	this.imperialLazernium.Init();
};

SoucoupeImperiale.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;
	this.imperialLazernium.Animate(deltaTime);
	this.SetCurrentModel(deltaTime);
	this.ProcessMovTowardGoldo(deltaTime);
};

SoucoupeImperiale.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	if (this.Hitten == true) {
		var memOp = ctx.globalCompositeOperation;
		ctx.globalCompositeOperation = "lighten"; // overlay lighten
		ctx.drawImage(this.model.img, this.posx, this.posy);
		ctx.globalCompositeOperation = memOp;
		this.Hitten = false;
	}
	else {
		ctx.drawImage(this.model.img, this.posx, this.posy);
	}

	this.DrawQuadTree(ctx, this.posx, this.posy);
	this.imperialLazernium.Draw(ctx);

	if (this.ShieldEntity != null) {
		this.ShieldEntity.DrawFromOwner(ctx);
	}
};

SoucoupeImperiale.prototype.OnEnded = function () {
	if (this.IsValid() == false) {
		for (var i = 1; i <= 5; i++) {
			var posex = this.posx + randomUniform(this.model.img.width / 4, this.model.img.width * 3 / 4);
			var posey = this.posy + randomUniform(this.model.img.height / 4, this.model.img.height * 3 / 4);
			NewCrosseExplosionPos(posex, posey);
		}
	}
};

SoucoupeImperiale.prototype.IsStopMissil = function () {
	return true;
};

SoucoupeImperiale.prototype.OnChildEnded = function (child) {
	this.ShieldEntity = null;
};

SoucoupeImperiale.prototype.IsInvulnerable = function () {
	return (this.ShieldEntity != null);
};





function ShieldImperial(OwnerEntity) {
	Entity.call(this, OwnerEntity);

	this.Shields = null;

	this.GetRelativePos = function () {
		switch (this.OwnerEntity.indexModel) {
			case 2: return new Vector(-11, -49); break;
			case 4: return new Vector(-63, -49); break;
		}
		return new Vector(-36, -49);
	};
}

ShieldImperial.prototype = Object.create(Entity.prototype);
ShieldImperial.prototype.constructor = ShieldImperial;

ShieldImperial.prototype.Init = function () {

	this.Shields = new Array();
	for (var i = 1; i <= 5; i++) {
		this.Shields[i] = loader.GetModel('ImperialShieldMap' + i);
	}

	this.SetModel(this.Shields[this.OwnerEntity.indexModel]);

	this.vie = this.model.vie;
	this.speed = this.model.speed;
	this.valid = true;

	var vec = this.GetRelativePos();
	this.posx = this.OwnerEntity.posx + vec.x;
	this.posy = this.OwnerEntity.posy + vec.y;
};

ShieldImperial.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;

	this.model = this.Shields[this.OwnerEntity.indexModel];
	this.rect = new RectSize(-this.model.img.width / 2, -this.model.img.height / 2, this.model.img.width, this.model.img.height);

	var vec = this.GetRelativePos();
	this.posx = this.OwnerEntity.posx + vec.x;
	this.posy = this.OwnerEntity.posy + vec.y;
};

ShieldImperial.prototype.DrawFromOwner = function (ctx) {
	if (this.valid == false) return;

	if (this.Hitten == true) {
		var memOp = ctx.globalCompositeOperation;
		ctx.globalCompositeOperation = "lighten";
		ctx.drawImage(this.model.img, this.posx, this.posy);
		ctx.globalCompositeOperation = memOp;
		this.Hitten = false;
	}
	else {
		ctx.drawImage(this.model.img, this.posx, this.posy);
	}

	this.DrawQuadTree(ctx, this.posx, this.posy);
};

ShieldImperial.prototype.IsStopMissil = function () {
	return true;
};





function Silo() {

	Entity.call(this, null);

	this.siloMod = loader.GetModel('Silo');
	this.socMod = loader.GetModel('SiloSocle');
	this.insiMod = loader.GetModel('SiloInside');
	this.misMod = loader.GetModel('SiloMissil');

	this.hasMissil = true;
	this.heightFire = true;
	this.missil = null;

	this.Fire = function () {

		var mispos = this.GetMissilPos();

		this.missil = new MissilSilo(this);
		this.missil.SetModel(this.misMod);
		this.missil.Init();

		this.missil.SetFireDirection(0, 0, 0, -1);

		this.missil.posx = mispos.x;
		this.missil.posy = mispos.y;

		entityList.AddObject(this.missil);

		loader.PlaySound('Missil', 0.15);
	};

	this.GetMissilPos = function () {
		return new Vector
			(
				this.posx + this.model.img.width / 2 - this.misMod.img.width / 2,
				this.posy + 10
			);
	}
}

Silo.prototype = Object.create(Entity.prototype);
Silo.prototype.constructor = Silo;

Silo.prototype.Init = function () {

	this.SetModel(this.siloMod);

	this.posx = randomUniform(1, AppViewModel.canvasize.width - this.siloMod.img.width);
	this.posy = -this.siloMod.img.height;

	this.heightFire = randomUniform(AppViewModel.canvasize.height / 2,
		AppViewModel.canvasize.height - (this.siloMod.img.height * 1.5));
};

Silo.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;
	this.posy += scrollZone.Speed * deltaTime;

	if (this.heightFire > 0 && this.posy >= this.heightFire) {
		this.heightFire = 0;
		this.Fire();
	}

	if (this.posy > AppViewModel.canvasize.height) {
		this.SetNoValid();
	}
};

Silo.prototype.Draw = function (ctx) {
	if (this.valid == false) return;


	ctx.drawImage(this.insiMod.img, this.posx + 21, this.posy - 5);

	if (this.heightFire > 0) {
		var mispos = this.GetMissilPos();
		ctx.drawImage(this.misMod.img, mispos.x, mispos.y);
	}
	else if (this.missil != null) {
		this.missil.DrawFromOwner(ctx);
	}

	ctx.drawImage(this.socMod.img, this.posx - 50, this.posy + 32);
	ctx.drawImage(this.model.img, this.posx, this.posy);

	this.DrawQuadTree(ctx, this.posx, this.posy);
};

Silo.prototype.IsStopMissil = function () {
	return true;
};

Silo.prototype.OnEnded = function () {

	if (this.missil != null) {
		this.missil.OwnerEntity = null;
	}

	if (this.vie <= 0) {
		NewCrosseExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);

		var destMod = loader.GetModel('SiloDetruit');
		decorManager.NewGroundDecor(
			DecorEnum.other, this.posx + destMod.img.width / 2 - 80,
			this.posy + destMod.img.height / 2 - 5, 'SiloDetruit');
	}
};

Silo.prototype.IsStructureCollide = function () {
	return false;
};














function MissilSilo(OwnerEntity) {
	Missil.call(this, 1);

	this.OwnerEntity = OwnerEntity;
	this.rayStart = new Vector();
	this.timeLife = 0;
	this.timeLifeMax = 4;
	this.speedRot = 0;
	this.angdeg = 0;
	this.accel = 100;

	this.Drawing = function (ctx) {
		ctx.save();
		ctx.translate(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
		ctx.rotate(this.ang + 90 * Math.PI / 180);
		ctx.drawImage(this.model.img, -this.model.img.width / 2, -this.model.img.height / 2);
		ctx.restore();
	}
}

MissilSilo.prototype = Object.create(Missil.prototype);
MissilSilo.prototype.constructor = MissilSilo;

MissilSilo.prototype.Init = function (x, y) {

	this.posx = x - this.model.img.width / 2;
	this.posy = y - this.model.img.height / 2;

	this.dx = 0;
	this.dy = -1;
	this.angdeg = - 90;
	this.ang = this.angdeg * Math.PI / 180;

	this.valid = true;

	this.CalcParam();
};

MissilSilo.prototype.SetModel = function (model) {
	this.model = model;
	this.vie = model.vie;
	this.speed = model.speed;
	this.speedRot = randomUniform(1, 11) < 6 ? this.model.speedRot : -this.model.speedRot;
	// this.SetMinusRadius ();
	this.SetMaximusRadius();
};

MissilSilo.prototype.Animate = function (deltaTime) {

	if (this.valid == false) return;

	this.speed += this.accel * deltaTime;

	if (this.OwnerEntity == null) {
		if (this.angdeg < -45 && this.angdeg > -135) {
			var rottime = this.speedRot * Math.PI / 180 * deltaTime;
			this.ang += rottime;
			this.dx = Math.cos(this.ang);
			this.dy = Math.sin(this.ang);
			this.angdeg = this.ang * 180 / Math.PI;

			this.CalcParam();
		}
	}


	this.posx += this.dx * this.speed * deltaTime;
	this.posy += this.dy * this.speed * deltaTime;

	this.timeLife += deltaTime;

	if (this.timeLife >= 0.6) {
		if (this.OwnerEntity != null) this.OwnerEntity.missil = null;
		this.OwnerEntity = null;
	}

	if (this.timeLife > this.timeLifeMax) {
		this.SetNoValid();
	}
};


MissilSilo.prototype.Draw = function (ctx) {
	if (this.valid == false || this.OwnerEntity != null) return;

	this.Drawing(ctx);
};

MissilSilo.prototype.DrawFromOwner = function (ctx) {
	if (this.valid == false) return;

	this.Drawing(ctx);
};



MissilSilo.prototype.OnEnded = function () {

	if (this.OwnerEntity != null) {
		this.OwnerEntity.missil = null;
	}

	if (this.vie <= 0) {
		NewExplosionPos(this.posx + this.model.img.width / 2, this.posy + this.model.img.height / 2);
	}
};


MissilSilo.prototype.Collide = function (entity) {

	if (this.IsValid() == false) return false;

	if (entity.model.isBonus == true) return false;

	if (Collide(entity, this) == false) return false;

	// Infliger les dégats à la cible
	entity.HitDegat(this.model.degat);
	this.HitDegat(entity.model.degat);

	if (this.IsValid() == false) {
		AppViewModel.points += this.model.points;
	}
	return true;
};






function SoucoupeAmiralePassage() {
	Entity.call(this);

	this.spentTime = 0;
	this.ratioSize = randomUniform(2, 6) / 10;

	this.InitPassage = function () {
		this.SetModelName('SoucoupeAmirale');


		var ddx = 0;
		var ddy = 0;

		// Position X
		if (randomUniform(1, 11) <= 5) {
			this.posx = -this.model.img.width;
			ddx = 1;
		}
		else {
			this.posx = AppViewModel.canvasize.width;
			ddx = -1;
		}

		// Position Y
		if (randomUniform(1, 11) <= 5) {
			this.posy = -this.model.img.height;
			ddy = 1;
		}
		else {
			this.posy = AppViewModel.canvasize.height;
			ddy = -1;
		}

		var len = Math.sqrt(ddx * ddx + ddy * ddy);
		this.dx = ddx / len;
		this.dy = ddy / len;
		this.valid = true;
	};


}

SoucoupeAmiralePassage.prototype = Object.create(Entity.prototype);
SoucoupeAmiralePassage.prototype.constructor = SoucoupeAmiralePassage;

SoucoupeAmiralePassage.prototype.Init = function () {
	this.InitPassage();
};

SoucoupeAmiralePassage.prototype.Animate = function (deltaTime) {
	if (this.valid == false) return;

	this.posx += this.dx * this.speed * deltaTime;
	this.posy += this.dy * this.speed * deltaTime;

	this.spentTime += deltaTime;

	this.ratioSize += deltaTime * 0.01;

	if (this.spentTime > 5) {
		// this.valid = false;
		if ((this.posy > AppViewModel.canvasize.height)
			|| (this.posx > AppViewModel.canvasize.width)
			|| (this.posx < -this.model.img.width)
			|| (this.posy < -this.model.img.height)) {
			this.SetNoValid();
		}
	}

};

SoucoupeAmiralePassage.prototype.Draw = function (ctx) {
	if (this.valid == false) return;

	// ctx.drawImage(this.model.img, this.posx, this.posy);
	ctx.drawImage(this.model.img, this.posx, this.posy, this.model.img.width * this.ratioSize, this.model.imgShadow.height * this.ratioSize);

};



