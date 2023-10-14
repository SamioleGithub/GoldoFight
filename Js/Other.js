
SeqEnum = {
	GoruGoru : 1,
	Golgoth40 : 2,
	Golgoth28 : 3,
	GinGin : 4,
	Ergastul : 5,
	Golgoth27 : 6,
	
	TuretYellow : 1,
	TuretRed : 2,
	TuretBlack : 3,
	TuretRandom : 4,
	TuretMissilForward : 1,
	TuretMissilSearch : 2,

	Navette1Hit : 1,
	Navette2Hit : 2,
	Navette3Hit : 3,
	NavetteMissil : 4,
	
	MissilTypeDirect : 1,
	MissilTypeSearch : 2,
	MissilTypeRandom : 3,
	
	MvtTypeDirect : 1,
	MvtTypeWave : 2,
	MvtTypePursuit : 3,
	MvtTypeRandom : 4,	
};

function SequenceManager ()
{
	var fm = null;
	this.SequenceList = null;
	this.sequence = 0;
	this.currentSeq = null;
	this.SoucoupeAmiralePassage = null;
	
	
	this.Reset = function(){

		if (this.SoucoupeAmiralePassage != null)
		{
			delete this.SoucoupeAmiralePassage;
			this.SoucoupeAmiralePassage = null;
		}
		
		this.sequence = 0;
		this.currentSeq = null;
		
		if (this.SequenceList != null) delete this.SequenceList;
		this.SequenceList = new Array ();


		// ---------------------------------------------------------------------------
		//
		//		DEBUT DES SEQUENCE
		//
		// ---------------------------------------------------------------------------

		// Aujourd'hui Goldorak dans ...
		this.SequenceList.push (new SequenceToDay ());

		// Lance la musique
		this.SequenceList.push (new SequenceStart ());


		
		// ---------------------------------------------------------------------------
		//		GORU GORU
		// ---------------------------------------------------------------------------
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFulguroPoing,5));
		
		
		
		this.SequenceList.push (new SequenceGroundDecor (true));
		this.SequenceList.push (new SequenceCloud (false));
		this.SequenceList.push (new SequenceTimeWaiting (1.5));

		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette1Hit,0,1));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette1Hit,0,2));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette1Hit,0,4));
		this.AddInvaderFormation (1);
		this.AddDeltaFormation (1);
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusAlcorak,1));

		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,0,1));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,0,2));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,0,4));
		this.AddInvaderFormation (2);
		this.AddDeltaFormation (2);
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVenusiak,1));

		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette3Hit,0,1));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette3Hit,0,2));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette3Hit,0,4));
		this.AddInvaderFormation (3);
		this.AddDeltaFormation (3);
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFossoirak,1));

		this.AddSequenceRiggel ();

		this.AddSequenceGolgoth (SeqEnum.GoruGoru);

		// ---------------------------------------------------------------------------
		//		GIN GIN
		// ---------------------------------------------------------------------------
		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFulguroPoing,2));
		this.SequenceList.push (new SequenceCloud (true));
		this.SequenceList.push (new SequenceGroundDecor (false,2));

		this.SequenceList.push (new SequenceTourelle (4,SeqEnum.TuretYellow));
		this.SequenceList.push (new SequenceTourelle (4,SeqEnum.TuretRed));
		this.SequenceList.push (new SequenceTourelle (4,SeqEnum.TuretBlack));

		this.SequenceList.push (new SequenceGroundDecor (true));

		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,1,1,1,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,2,1,1,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,4,1,1,1));
		this.SequenceList.push (new SequenceCloud (false));
		
		this.SequenceList.push (new SequenceNavetteMissil (0,1,2,1,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,2,2,1,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,4,2,1,1));
		
		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,1,3,1,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,2,3,2,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,4,3,2,2));

		this.AddSequenceGinGin ();

		// ---------------------------------------------------------------------------
		//		Soucoupe Amirale Hydargos
		// ---------------------------------------------------------------------------
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFulguroPoing,2));
		this.SequenceList.push (new SequenceMegamach (0));
		this.SequenceList.push (new SequenceGroundDecor (false));
		this.SequenceList.push (this.FadingBack (4,BackImageCloud02,true));

		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette1Hit,0,4));
		this.AddInvaderFormation (1);
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette1Hit,0,4));
		this.AddDeltaFormation (1);

		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,0,4));
		this.AddInvaderFormation (2);
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,0,4));
		this.AddDeltaFormation (2);

		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette3Hit,0,4));
		this.AddInvaderFormation (3);
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette3Hit,0,4));
		this.AddDeltaFormation (3);

		this.SequenceList.push (new SequenceCloud (false));

		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,1,1,1,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,2,1,1,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,4,1,1,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusAlcorak,1));

		this.SequenceList.push (new SequenceNavetteMissil (0,1,2,2,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,2,2,2,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,4,2,2,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVenusiak,1));

		this.SequenceList.push (new SequenceNavetteMissil (0,1,3,2,2));
		this.SequenceList.push (new SequenceNavetteMissil (0,2,3,2,2));
		this.SequenceList.push (new SequenceNavetteMissil (0,4,3,2,2));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFossoirak,1));

		this.SequenceList.push (new SequenceCloud (true));
		this.AddSequenceCyberMines (40);

		this.SequenceList.push (new SequenceCloud (true));
		
		this.SequenceList.push (this.FadingBack (2,BackImageCloud01,false));
		this.AddSequenceSoucoupeAmirale ();

		// ---------------------------------------------------------------------------
		//		Ergastul
		// ---------------------------------------------------------------------------
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFulguroPoing,2));
		this.SequenceList.push (new SequenceMegamach (0));
		this.SequenceList.push (this.FadingBack (4,BackImageSpace01,false));
		this.SequenceList.push (new SequenceTimeWaiting (1.5));

		this.SequenceList.push (new SequenceAsteroid (20,1));

		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette1Hit,0,1));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette1Hit,0,2));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette1Hit,0,4));

		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,0,1));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,0,2));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,0,4));

		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,2));
		this.SequenceList.push (new SequenceAsteroid (60,4,true));

		this.SequenceList.push (this.FadingBack (4,BackImageSpace02,false));
		this.AddSequenceErgastul ();

		// ---------------------------------------------------------------------------
		//		Golgoth 40
		// ---------------------------------------------------------------------------
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFulguroPoing,4));
		this.AddInvaderFormation (1);
		this.AddDeltaFormation (1);
		this.AddInvaderFormation (2);
		this.AddDeltaFormation (2);
		this.AddInvaderFormation (3);
		this.AddDeltaFormation (3);

		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,2));
		this.SequenceList.push (new SequenceAsteroid (30,4,true));

		this.SequenceList.push (new SequenceMoon (true));
		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette1Hit,randomUniform (2,6),4));
		this.SequenceList.push (new SequenceBigNavette (2,3));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,randomUniform (2,6),4));
		this.SequenceList.push (new SequenceBigNavette (4,3));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette3Hit,randomUniform (2,6),4));
		this.SequenceList.push (new SequenceBigNavette (6,3));

		this.AddSequenceGolgoth (SeqEnum.Golgoth40);

		// ---------------------------------------------------------------------------
		//		Soucoupe Amirale Minos
		// ---------------------------------------------------------------------------
		this.SequenceList.push (new SequenceMoon (false));
		this.SequenceList.push (new SequenceMegamach (3));
		this.SequenceList.push (this.FadingBack (5,BackImageSol01));
		this.SequenceList.push (new SequenceTimeWaiting (1.5));

		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette1Hit,randomUniform (2,6),4));
		this.SequenceList.push (new SequenceBigNavette (2,3));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,randomUniform (2,6),4));
		this.SequenceList.push (new SequenceBigNavette (4,3));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette3Hit,randomUniform (2,6),4));
		this.SequenceList.push (new SequenceBigNavette (6,3));
		
		this.AddSequenceSilo (60);

		this.SequenceList.push (new SequenceTourelle (1,SeqEnum.TuretYellow));
		this.SequenceList.push (new SequenceTourelle (2,SeqEnum.TuretYellow));
		this.SequenceList.push (new SequenceTourelle (3,SeqEnum.TuretYellow));
		this.SequenceList.push (new SequenceTourelle (4,SeqEnum.TuretYellow));
		this.SequenceList.push (new SequenceTourelle (5,SeqEnum.TuretYellow));
		this.SequenceList.push (new SequenceTourelle (6,SeqEnum.TuretYellow));
		this.SequenceList.push (new SequenceTourelle (7,SeqEnum.TuretYellow));
		this.SequenceList.push (new SequenceTourelle (8,SeqEnum.TuretYellow));

		this.AddSequenceSoucoupeMinos ();

		// ---------------------------------------------------------------------------
		//		Base Vega
		// ---------------------------------------------------------------------------
		this.SequenceList.push (this.FadingBack (2,BackImageSol02));
		
		this.SequenceList.push (new SequenceTourelle (1,SeqEnum.TuretRed));
		this.SequenceList.push (new SequenceTourelle (2,SeqEnum.TuretRed));
		this.SequenceList.push (new SequenceTourelle (3,SeqEnum.TuretRed));
		this.SequenceList.push (new SequenceTourelle (4,SeqEnum.TuretRed));
		this.SequenceList.push (new SequenceTourelle (5,SeqEnum.TuretRed));
		this.SequenceList.push (new SequenceTourelle (6,SeqEnum.TuretRed));
		this.SequenceList.push (new SequenceTourelle (7,SeqEnum.TuretRed));
		this.SequenceList.push (new SequenceTourelle (8,SeqEnum.TuretRed));

		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusAlcorak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFossoirak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVenusiak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusMegavolt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));

		this.SequenceList.push (new SequenceTourelle (1,SeqEnum.TuretBlack));
		this.SequenceList.push (new SequenceTourelle (2,SeqEnum.TuretBlack));
		this.SequenceList.push (new SequenceTourelle (3,SeqEnum.TuretBlack));
		this.SequenceList.push (new SequenceTourelle (4,SeqEnum.TuretBlack));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,1));
		this.SequenceList.push (new SequenceTourelle (5,SeqEnum.TuretBlack));
		this.SequenceList.push (new SequenceTourelle (6,SeqEnum.TuretBlack));
		this.SequenceList.push (new SequenceTourelle (7,SeqEnum.TuretBlack));
		this.SequenceList.push (new SequenceTourelle (8,SeqEnum.TuretBlack));

		this.AddSequenceSilo (60);

		this.AddInvaderFormation (1);
		this.AddDeltaFormation (1);
		this.SequenceList.push (new SequenceNavetteFoudre (40,1));

		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVie,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,2));
		this.SequenceList.push (new SequenceBaricade (60));
		this.SequenceList.push (new SequenceTimeWaiting (5));

		this.AddSequenceBaseVega ();

		// ---------------------------------------------------------------------------
		//
		//		Golgoth 27 et 28
		//
		// ---------------------------------------------------------------------------

		this.SequenceList.push (new SequenceMegamach (0));
		this.SequenceList.push (new SequenceTimeWaiting (1.5));

		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette1Hit,randomUniform (2,6),4));
		this.SequenceList.push (new SequenceBigNavette (2,3));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,randomUniform (2,6),4));
		this.SequenceList.push (new SequenceBigNavette (4,3));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette3Hit,randomUniform (2,6),4));
		this.SequenceList.push (new SequenceBigNavette (6,3));

		this.SequenceList.push (this.FadingBack (2,BackImageSol01));

		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));

		this.SequenceList.push (new SequenceTourelleMissil (1,SeqEnum.TuretMissilForward));
		this.SequenceList.push (new SequenceTourelleMissil (2,SeqEnum.TuretMissilSearch));
		this.SequenceList.push (new SequenceTourelleMissil (3,SeqEnum.TuretMissilForward));
		this.SequenceList.push (new SequenceTourelleMissil (4,SeqEnum.TuretMissilSearch));
		this.SequenceList.push (new SequenceTourelleMissil (5,SeqEnum.TuretMissilForward));
		this.SequenceList.push (new SequenceTourelleMissil (6,SeqEnum.TuretMissilSearch));
		this.SequenceList.push (new SequenceTourelleMissil (7,SeqEnum.TuretMissilForward));
		this.SequenceList.push (new SequenceTourelleMissil (8,SeqEnum.TuretMissilSearch));
		this.SequenceList.push (new SequenceTourelleMissil (9,SeqEnum.TuretMissilForward));
		this.SequenceList.push (new SequenceTourelleMissil (10,SeqEnum.TuretMissilSearch));

		this.AddSequenceGolgoth (SeqEnum.Golgoth27);
		
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusAlcorak,2));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFossoirak,2));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVenusiak,2));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusMegavolt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,2));
		this.SequenceList.push (new SequenceTimeWaiting (1.5));		
		
		this.AddSequenceGolgoth (SeqEnum.Golgoth28);

		// ---------------------------------------------------------------------------
		//
		//		Soucoupe Imperiale
		//
		// ---------------------------------------------------------------------------
		this.SequenceList.push (new SequenceMegamach (0));
		this.SequenceList.push (this.FadingBack (4,BackImageSpace02));

		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));

		this.SequenceList.push (new SequenceNavetteMissil (0,1,1,2,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,2,1,1,2));
		this.SequenceList.push (new SequenceNavetteMissil (0,4,1,2,2));
		
		this.SequenceList.push (new SequenceNavetteMissil (0,1,2,2,1));
		this.SequenceList.push (new SequenceNavetteMissil (0,2,2,2,2));
		this.SequenceList.push (new SequenceNavetteMissil (0,4,2,2,2));

		this.SequenceList.push (new SequenceNavetteMissil (0,1,3,2,2));
		this.SequenceList.push (new SequenceNavetteMissil (0,2,3,2,2));
		this.SequenceList.push (new SequenceNavetteMissil (0,4,3,2,2));

		this.SequenceList.push (new SequenceBigNavette (2,3));
		this.SequenceList.push (new SequenceNavettePique (2,3));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,randomUniform (5,11),4));

		this.SequenceList.push (new SequenceBigNavette (3,3));
		this.SequenceList.push (new SequenceNavettePique (3,3));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,randomUniform (5,11),4));

		this.SequenceList.push (new SequenceBigNavette (4,3));
		this.SequenceList.push (new SequenceNavettePique (4,3));
		this.SequenceList.push (new SequenceNavette (SeqEnum.Navette2Hit,randomUniform (5,11),4));
		this.SequenceList.push (new SequenceNavetteFoudre (40,2));

		this.SequenceList.push (this.FadingBack (2,BackImageSpace01));

		this.AddSequenceSoucoupeImperial ();

		this.SequenceList.push (new SequenceTimeWaiting (1.5));		
		this.SequenceList.push (new SequenceEagleWin ());
		this.SequenceList.push (new SequenceEnd ());
		this.SequenceList.push (new SequenceEarth (false));

		this.SequenceList.push (new SequenceMegamach (0));
		this.SequenceList.push (this.FadingBack (4,BackImageTerre01));
	}	

	this.ManageSoucoupeAmiralePassage = function(){

		if (this.SoucoupeAmiralePassage == null)
		{
			this.SoucoupeAmiralePassage = new SoucoupeAmiralePassage ();
			this.SoucoupeAmiralePassage.InitPassage ();
			this.SoucoupeAmiralePassage.OwnerEntity = this;
			animationListBack.AddObject (this.SoucoupeAmiralePassage);
		}	
	}
	
	// Attendre qu'il n'y ait plus d'entité ni aerien ni terrien
	this.WaitNoEntity = function(){
		this.WaitNoAirEntity();
		this.WaitNoTerEntity();
	}

	// Attendre qu'il n'y ait plus d'entité aerien
	this.WaitNoAirEntity = function(){
		this.SequenceList.push (new SequenceWaitNoEntityList (entityList));
	}

	// Attendre qu'il n'y ait plus d'entité terrestre
	this.WaitNoTerEntity = function(){
		this.SequenceList.push (new SequenceWaitNoEntityList (entityTerList));
	}

	this.PlayNext = function(){
		this.PlaySequence (this.sequence);
		this.sequence ++;
		
		// Loop Sequence
		if (this.sequence >= this.SequenceList.length) 
		{
			AppViewModel.nbNavette += 5;
			AppViewModel.nbNavetteShield += 1;		
			this.sequence = 0;
		}
	}	

	this.PlaySequence = function(no){
		this.currentSeq = this.SequenceList [this.sequence];
		this.currentSeq.Start ();
	}

	this.IsCurrentSequenceFinished = function(){
		return (this.currentSeq == null || this.currentSeq.IsFinished ());
	}

	this.OnMegaMachEnded = function()
	{
		if (this.currentSeq != null) this.currentSeq.OnMegaMachEnded ()
	}

	this.CloseCurrentSequence = function(){
		if (this.currentSeq != null) this.currentSeq.Finish ();
	}
	
	this.AbortCurrentSequence = function(){
		if (this.currentSeq != null) 
		{
			this.currentSeq.Abort ();
			this.currentSeq = null;
			this.sequence = 0;
		}
	}

	this.AnimateCurrentSequence = function(deltaTime){
		if (this.currentSeq != null) this.currentSeq.Animate (deltaTime);
	}

	this.DrawCurrentSequence = function(ctx,drawOnFrom){
		if (this.currentSeq != null) this.currentSeq.Draw (ctx,drawOnFrom);
	}

	this.AddSequenceRiggel = function ()
	{
		var seqSound = new SequencePlaySound ('Riggel',1,-1);
		seqSound.AddImage ('PersoRiggel',100,100,0);
		this.SequenceList.push (seqSound);
	}

	this.AddSequenceSilo = function (time)
	{
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusAlcorak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVenusiak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFossoirak,1));
		this.SequenceList.push (new SequenceBonusGlKgo ());
		this.SequenceList.push (new SequenceSilo (time));
	}

	this.AddSequenceGolgoth = function (type)
	{
		var magnet = null;
		switch (type)
		{
			case SeqEnum.GoruGoru: magnet = "MagnetGoruGoru";break;
			case SeqEnum.Golgoth40:magnet = "MagnetGolgoth40";break;
			case SeqEnum.Golgoth28:magnet = "MagnetGolgoth28";break;
			case SeqEnum.Golgoth27:magnet = "MagnetGolgoth27";break;
		}

		if (type != SeqEnum.GoruGoru)
			this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));

		if (magnet != null)
		{
			var seqSound = new SequencePlaySound ('Golgoth',0.5,-1);
			seqSound.AddImage (magnet,100,100,0);
			this.SequenceList.push (seqSound);
		}
		
		if (type == SeqEnum.Golgoth28 || type == SeqEnum.Golgoth27)
		{
			var soundname = (type == SeqEnum.Golgoth27) ? 'LeCirqueVaCommencer' : 'AUnContreDeux';
			var seqSound = new SequencePlaySound (soundname,0.5,-1);
			seqSound.AddImage ('PersoActarus',100,100,0);
			this.SequenceList.push (seqSound);
		}

		this.SequenceList.push (new SequenceGolgoth (type));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVie,1));
	}

	this.AddSequenceGinGin = function ()
	{
		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusAlcorak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFossoirak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVenusiak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusMegavolt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,4));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVie,1));
		this.SequenceList.push (new SequenceTimeWaiting (5));

		var seqSound = new SequencePlaySound ('JanusChemin',0.8,-1);
		seqSound.AddImage ('PersoJanus',100,100,0);
		this.SequenceList.push (seqSound);
		this.SequenceList.push (new SequenceGolgoth (SeqEnum.GinGin));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVie,2));
	}

	this.AddSequenceCyberMines = function (time)
	{
		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusAlcorak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVenusiak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFossoirak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFulguroPoing,4));

		var seqSound = new SequencePlaySound ('DeuxiemePhase',1,-1);
		seqSound.AddImage ('PersoHydargos',100,100,0);
		this.SequenceList.push (seqSound);
		this.SequenceList.push (new SequenceTimeWaiting (1));
		
		seqSound = new SequencePlaySound ('ChampCyberMines',1,-1);
		seqSound.AddImage ('PersoActarus',100,100,0);
		this.SequenceList.push (seqSound);

		this.SequenceList.push (new SequenceCyberMine (time));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVie,1));
	}

	this.AddSequenceSoucoupeAmirale = function ()
	{
		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,1));
		this.SequenceList.push (new SequenceTimeWaiting (5));

		var seqSound = new SequencePlaySound ('HydargosPlusFort',1,-1);
		seqSound.AddImage ('PersoHydargos',100,100,0);
		this.SequenceList.push (seqSound);
		this.SequenceList.push (new SequenceSoucoupeAmirale ());
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVie,1));
	}

	this.AddSequenceErgastul = function ()
	{
		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusAlcorak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFossoirak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVenusiak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,4));
		this.SequenceList.push (new SequenceTimeWaiting (5));

		var seqSound = new SequencePlaySound ('Ergastule01',1,-1);
		seqSound.AddImage ('PersoErgastule',100,100,0);
		seqSound.AddImage ('PersoActarus',100,400,1.8);
		this.SequenceList.push (seqSound);
		this.SequenceList.push (new SequenceGolgoth (SeqEnum.Ergastul));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVie,2));
	}

	this.AddSequenceSoucoupeMinos = function ()
	{
		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusAlcorak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFossoirak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVenusiak,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,2));
		this.SequenceList.push (new SequenceTimeWaiting (5));

		var seqSound = new SequencePlaySound ('Minos',1,-1);
		seqSound.AddImage ('PersoMinos',100,100,0);
		this.SequenceList.push (seqSound);
		this.SequenceList.push (new SequenceSoucoupeMinos ());
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVie,1));
	}

	this.AddSequenceSoucoupeImperial = function ()
	{
		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVie,2));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusAlcorak,4));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFossoirak,4));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVenusiak,4));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,6));
		this.SequenceList.push (new SequenceEarth (true));

		var seqSound = new SequencePlaySound ('ActarusIlPleutLazernium',1,-1);
		seqSound.AddImage ('PersoActarus',100,100,0);
		this.SequenceList.push (seqSound);

		seqSound = new SequencePlaySound ('VegaMaitre01',1,-1);
		seqSound.AddImage ('PersoVega01',100,100,0);
		this.SequenceList.push (seqSound);

		seqSound = new SequencePlaySound ('ActarusJamaisPlaneteBleu',1,-1);
		seqSound.AddImage ('PersoActarus',100,100,0);
		this.SequenceList.push (seqSound);

		this.SequenceList.push (new SequenceSoucoupeImperiale ());
		
		seqSound = new SequencePlaySound ('VegaMaitre02',1,-1);
		seqSound.AddImage ('PersoVega02',100,100,0);
		this.SequenceList.push (seqSound);
	}
	
	this.AddSequenceBaseVega = function ()
	{
		var seqSound = new SequencePlaySound ('Golgoth',0.5,-1);
		seqSound.AddImage ('MagnetBaseVega',100,100,0);
		this.SequenceList.push (seqSound);

		this.SequenceList.push (new SequenceBonus (AppViewModel.BonusPlanitronExt,1));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVie,3));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusCorneAuFulgure,3));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusAlcorak,3));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusFossoirak,3));
		this.SequenceList.push (new SequenceBonus (AppViewModel.bonusVenusiak,3));
		this.SequenceList.push (new SequenceTimeWaiting (2));
		this.SequenceList.push (new SequenceBaseVega ());
	}

	this.AddInvaderFormation = function (type)
	{
		var fm = new Formation ();
		fm.NewRandomFormationNavetteInvader (type);
		this.SequenceList.push (new SequenceFormation (fm));
	}

	this.AddDeltaFormation = function (type)
	{
		var fm = new Formation (type);
		fm.NewRandomFormationNavetteDelta (type);
		this.SequenceList.push (new SequenceFormation (fm));
	}

	this.AddRandomNavette = function()
	{
		var mvtype = randomUniform (1,4);
		var nb = randomUniform (1,randomUniform (2,6)); 
		this.AddNavette (1,nb,mvtype);
		
		mvtype = randomUniform (1,4);
		nb = randomUniform (1,randomUniform (2,6)); 
		this.AddNavette (2,nb,mvtype);

		mvtype = randomUniform (1,4);
		nb = randomUniform (1,randomUniform (2,6)); 
		this.AddNavette (3,nb,mvtype);
	}

	this.AddNavette = function(navtype,nbnav,mvtype){
		var nav;
		var curnavtype = navtype;
		for(var i=1;i<=nbnav;i++){
			if (navtype <= 0 || navtype > 3) curnavtype = randomUniform (1,4);

			switch (curnavtype)
			{
				case 1 : nav = new Navette();break;
				case 2 : nav = new Navette02();break;
				case 3 : nav = new Navette03();break;
			}

			if (mvtype == 4) nav.mvtype = randomUniform (1,4);
			else nav.mvtype = mvtype;
			nav.Init ();
			entityList.AddObject (nav);
		}
	}	

	this.AddNavetteMissil = function(nbnav,mvtype,navetteType,lazerType,missilType){
		var nav;
		for(var i=1;i<=nbnav;i++)
		{
			nav = new NavetteMissil(navetteType,lazerType,missilType);
			if (mvtype == 4) nav.mvtype = randomUniform (1,4);
			else nav.mvtype = mvtype;
			nav.Init ();
			entityList.AddObject (nav);
		}
	}	

	this.AddNavetteFoudre = function(mvtype,posx,posy){
		var nav;

		if (mvtype < 1 || mvtype > 2) mvtype = randomUniform (1,3);
		nav = new NavetteFoudre(mvtype);
		nav.Init (mvtype);

		if (posx != undefined)
		{
		nav.posx = posx;
		}

		if (posy != undefined)
		{
		nav.posy = posy;
		}

		entityList.AddObject (nav);
	}	
	
	this.AddSilo = function(posx,posy){
		var sil = new Silo ();
		sil.Init ();
		sil.posx = posx;
		sil.posy = posy;
		
		
		if (decorManager.CheckGroundPlacement (
			sil.posx,
			sil.posy,
			sil.model.img.width*2,
			sil.model.img.height*2) == true) 
		{
			entityTerList.AddObject (sil);
			Scape.SpreadEntity (sil);
		}
		else delete sil;
	}		

	this.AddRandomFormationNavetteInvader = function(){
		var fm = new Formation ();
		fm.NewRandomFormationNavetteInvader ();
		this.AddFormationNavetteInvader (fm);
	}

	this.AddFormationNavetteInvader = function(fm){
		
		var model;
		var posx = 0;
		var posy = 0;
		var nav = null;
		var size;
		
		switch (fm.navtype)
		{
			case 1 : model = loader.GetModel ('navette01');break;
			case 2 : model = loader.GetModel ('navette02');break;
			case 3 : model = loader.GetModel ('navette03');break;
		}
		
		var minStartPosx = fm.navColSize / 2;
		var maxStartPosx = AppViewModel.canvasize.width - fm.nbHorz * fm.navColSize;

		if (fm.startPosx > maxStartPosx) fm.startPosx = maxStartPosx;
		if (fm.startPosx < minStartPosx) fm.startPosx = minStartPosx;

		for(var j=1;j<=fm.nbVert;j++)
		{
			posy = -200 - j * fm.navColSize;

			for(var i=1;i<=fm.nbHorz;i++)
			{
				posx = fm.startPosx + (i-1) * fm.navColSize;

				switch (fm.navtype)
				{
					case 1:nav = new Navette();break;
					case 2:nav = new Navette02();break;
					case 3:nav = new Navette03();break;
				}

				nav.useRandomStartPosX = false;
				nav.Init (fm.mvtype);
				nav.speed = fm.speed;
				nav.posx = posx;
				nav.posy = posy;
				entityList.AddObject (nav);
			}
		}
	}	

	this.AddRandomFormationNavetteDelta = function(){
		var fm = new Formation ();
		fm.NewRandomFormationNavetteDelta ();
		this.AddFormationNavetteDelta (fm);
	}

	this.AddFormationNavetteDelta = function(fm){
		
		var model;
		var posx = 0;
		var posy = 0;
		var nav = null;
		var size;
		
		switch (fm.navtype)
		{
			case 1 : model = loader.GetModel ('navette01');break;
			case 2 : model = loader.GetModel ('navette02');break;
			case 3 : model = loader.GetModel ('navette03');break;
		}
		
		var minStartPosx = fm.navColSize / 2;
		var maxStartPosx = AppViewModel.canvasize.width - fm.nbHorz * fm.navColSize;
		if (fm.startPosx > maxStartPosx) fm.startPosx = maxStartPosx;
		if (fm.startPosx < minStartPosx) fm.startPosx = minStartPosx;
		
		var deltav;
		for(var j=1;j<=fm.nbVert;j++)
		{
			posy = -200 - j * fm.navColSize - (fm.nbHorz/2 * fm.navColSize);

			deltav = 0;
			for(var i=1;i<=fm.nbHorz;i++)
			{
				posx = fm.startPosx + (i-1) * fm.navColSize;

				switch (fm.navtype)
				{
					case 1:nav = new Navette();break;
					case 2:nav = new Navette02();break;
					case 3:nav = new Navette03();break;
				}

				nav.useRandomStartPosX = false;
				nav.Init (fm.mvtype);
				nav.speed = fm.speed;
				nav.posx = posx;
				nav.posy = posy + deltav;
				entityList.AddObject (nav);
				
				if (i <= fm.nbHorz/2) deltav += fm.navColSize;
				else deltav -= fm.navColSize;
				
			}
		}
	}	

	this.AddSoucoupeAmiral = function(){
		var souc = new SoucoupeAmirale ();
		souc.SetModel (modelSoucoupeAmirale);
		souc.Init ();
		entityList.AddObject (souc);
		return souc;
	}		

	this.AddSoucoupeMinos = function(){

		var mod = loader.GetModel ('SoucoupeMinos');
		var souc = new SoucoupeMinos ();
		souc.SetModel (mod);
		souc.Init ();
		entityList.AddObject (souc);
		return souc;
	}		

	this.AddBaseVega = function(){
		var base = new BaseVega ();
		base.Init ();
		groundDecorsList.AddObject (base);
		
		var tourelle = new Tourelle(2);
		tourelle.Init ();
		tourelle.posx = base.posx - 130;
		tourelle.posy = base.posy + 330;
		entityTerList.AddObject (tourelle);
		Scape.SpreadEntity (tourelle);

		tourelle = new Tourelle(2);
		tourelle.Init ();
		tourelle.posx = base.posx - 130;
		tourelle.posy = base.posy + 560;
		entityTerList.AddObject (tourelle);
		Scape.SpreadEntity (tourelle);

		tourelle = new Tourelle(1);
		tourelle.Init ();
		tourelle.posx = base.posx - 130;
		tourelle.posy = base.posy + 800;
		entityTerList.AddObject (tourelle);
		Scape.SpreadEntity (tourelle);

		tourelle = new Tourelle(2);
		tourelle.Init ();
		tourelle.posx = base.posx + 1400;
		tourelle.posy = base.posy + 330;
		entityTerList.AddObject (tourelle);
		Scape.SpreadEntity (tourelle);

		tourelle = new Tourelle(2);
		tourelle.Init ();
		tourelle.posx = base.posx + 1400;
		tourelle.posy = base.posy + 560;
		entityTerList.AddObject (tourelle);
		Scape.SpreadEntity (tourelle);

		tourelle = new Tourelle(1);
		tourelle.Init ();
		tourelle.posx = base.posx + 1400;
		tourelle.posy = base.posy + 800;
		entityTerList.AddObject (tourelle);
		Scape.SpreadEntity (tourelle);

	// BaseVegaBigShield
	// var shield = loader.GetModel ('BaseVegaBigShield');
	// ctx.drawImage(shield.img, this.posx + 200 , this.posy + 200);
	// 300 180

		return base;
	}		

	this.AddTuret = function(nb,type){
	
		var nbAddedTuret = 0;
		var mod = loader.GetModel ('TourelleSupport');
		var posStart = mod.img.width / 2;
		
		var size = AppViewModel.canvasize.width / nb;

		for(var i=1;i<=nb;i++){

			var tourelle = new Tourelle(type);
			tourelle.Init ();
			tourelle.posx = randomUniform (posStart ,posStart + size - mod.img.width);

			// Checker si on peut le placer à cet endroit
			if (decorManager.CheckGroundPlacement (
				tourelle.posx,
				tourelle.posy,
				mod.img.width,
				mod.img.height) == true) 
			{
				entityTerList.AddObject (tourelle);
				Scape.SpreadEntity (tourelle);
				nbAddedTuret ++;
			}
			else delete tourelle;

			posStart += size;
		}
		return nbAddedTuret;		
	}

	this.AddTuretMissil = function(nb,type){
	
		var mod = loader.GetModel ('TourelleMissilSupport');
		var posStart = mod.img.width / 2;
		
		var size = AppViewModel.canvasize.width / nb;
		var nbAddedTuret = 0;
		
		for(var i=1;i<=nb;i++){
			
			var typeMissil = type;
			if (typeMissil < 1 || typeMissil > 2) typeMissil = randomUniform (1,3);
			var tourelle = new TourelleMissil(typeMissil);
			tourelle.Init ();
			tourelle.posx = randomUniform (posStart ,posStart + size - mod.img.width);
			
			// Checker si on peut le placer à cet endroit
			if (decorManager.CheckGroundPlacement (
				// tourelle.posx-mod.img.width/2,
				// tourelle.posy-mod.img.height/2,
				tourelle.posx,
				tourelle.posy,
				mod.img.width,
				mod.img.height) == true) 
			{
				entityTerList.AddObject (tourelle);
				Scape.SpreadEntity (tourelle);
				nbAddedTuret ++;
			}
			else delete tourelle;
			
			posStart += size;
		}
		return nbAddedTuret;
	}

	this.AddBaricade = function(){
	
		var mod = loader.GetModel ('Baricade');
		var entity = new Baricade();
		entity.Init ();

		// Checker si on peut le placer à cet endroit
		if (decorManager.CheckGroundPlacement (
			// entity.posx-mod.img.width/2,
			// entity.posy-mod.img.height/2,
			entity.posx,
			entity.posy,
			mod.img.width,
			mod.img.height) == true) 
		{
			entityTerList.AddObject (entity);
			Scape.SpreadEntity (entity);
			return entity;
		}
		
		delete entity;
		return null;
	}

	this.AddCyberMine = function(){
		var entity = new CyberMine();
		entity.Init ();
		entityList.AddObject (entity);
		Scape.SpreadEntity (entity);
	}

	this.AddBigNavette = function(nbnav,mvtTypeSrc){
		for(var i=1;i<=nbnav;i++){
			var nav = new GrandeNavette();
			if (mvtTypeSrc > 2) nav.mvtype = randomUniform (1,3);
			else nav.mvtype = mvtTypeSrc;
			nav.Init ();
			entityList.AddObject (nav);
		}
	}
	
	this.AddNavettePique = function(nbnav,mvtTypeSrc){
		for(var i=1;i<=nbnav;i++){
			var nav = new NavettePique();
			if (mvtTypeSrc > 2) nav.mvtype = randomUniform (1,3);
			else nav.mvtype = mvtTypeSrc;
			nav.Init ();
			entityList.AddObject (nav);
		}
	}

	this.AddGoruGoru = function(){
		var golgoth = new GoruGoru ();
		golgoth.Init ();
		entityList.AddObject (golgoth);
		return golgoth;
	}		
	
	this.AddGolgoth40 = function(){
		var golgoth = new Golgoth40 ();
		golgoth.Init ();
		entityList.AddObject (golgoth);
		return golgoth;
	}		
	
	this.AddGolgoth28 = function(){
		var golgoth = new Golgoth28 ();
		golgoth.Init ();
		entityList.AddObject (golgoth);
		return golgoth;
	}		

	this.AddGolgoth27 = function(){
		var golgoth = new Golgoth27 ();
		golgoth.Init ();
		entityList.AddObject (golgoth);
		return golgoth;
	}		

	this.AddGinGin = function(){
		var golgoth = new GinGin ();
		golgoth.Init ();
		entityList.AddObject (golgoth);
		return golgoth;
	}		
	
	this.AddErgastul = function(){
		var golgoth = new Ergastul ();
		golgoth.Init ();
		entityList.AddObject (golgoth);
		return golgoth;
	}		

	this.AddSoucoupeImperiale = function(){
		var soucoupe = new SoucoupeImperiale ();
		soucoupe.Init ();
		entityList.AddObject (soucoupe);
		return soucoupe;
	}		

	this.FadingBack = function(fadingLen,fadingBackImage,enableCloud)
	{
		return new SequenceScrollFading (fadingLen,fadingBackImage,enableCloud);
	}		

	this.FadingCloud = function()
	{
		return new SequenceScrollCloud ();
	}
	
	this.ScrollSpeed = function(targetSpeed,acceleration,endtime)
	{
		return new SequenceScrollSpeed (targetSpeed,acceleration,endtime);
	}
}

SequenceManager.prototype.OnChildEnded = function(child) {
	if (child == this.SoucoupeAmiralePassage) this.SoucoupeAmiralePassage = null; 
};




function Sequence ()
{
	this.Duration = 0;
	this.TimeEllpase = 0;
	this.DrawOnFront = true;
	this.nbPlayed = 0;
}

Sequence.prototype.Reset = function() {
	this.TimeEllpase = 0;
};

Sequence.prototype.Start = function() {
};

Sequence.prototype.Finish = function() {
	this.nbPlayed ++;
};

Sequence.prototype.Abort = function() {
};


Sequence.prototype.IsFinished = function() {
	return (entityList.count == 0 && entityTerList.count == 0);
};

Sequence.prototype.IsTimingOver = function() {
	if (this.Duration == 0) return false;
	return (this.TimeEllpase >= this.Duration);
};

Sequence.prototype.Animate = function(deltaTime) {
	this.TimeEllpase += deltaTime
}

Sequence.prototype.Draw = function(ctx,drawOnFront) {
}

Sequence.prototype.CanPlay = function() {
	return true;
}

Sequence.prototype.OnMegaMachEnded = function() {
}

Sequence.prototype.OnChildEnded = function(child) {
};

function SequenceNavette (navtype,nbnav,mvtype) {
	Sequence.call (this);

	this.navtype = navtype;
	this.nbnav = nbnav;
	this.mvtype = mvtype;
	this.newTuretTime = 0;
}

SequenceNavette.prototype = Object.create(Sequence.prototype);
SequenceNavette.prototype.constructor = SequenceNavette;

SequenceNavette.prototype.Reset = function() {
	Sequence.prototype.Reset.call(this);
	this.newTuretTime = 0;
};


SequenceNavette.prototype.Start = function() {
	this.Reset ();
	Sequencer.AddNavette (this.navtype,this.nbnav+AppViewModel.nbNavette,this.mvtype);
};

SequenceNavette.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	this.newTuretTime += deltaTime
	
	if (scrollZone.IsTerrestre ())
	{
		var nextTuretTime = (decorManager.IsDecorEnabled () == true) ? 5 : 12;
		if (this.newTuretTime > nextTuretTime) 
		{
			Sequencer.AddTuret (randomUniform (2,5),randomUniform (1,4));
			this.newTuretTime = 0;
		}
	}
}

SequenceNavette.prototype.IsFinished = function() {
	return (entityList.count == 0 && entityTerList.count == 0);
};



function SequenceBigNavette (nbnav,mvtype) {
	Sequence.call (this);

	this.nbnav = nbnav;
	this.mvtype = mvtype;
	this.newTuretTime = 0;
}

SequenceBigNavette.prototype = Object.create(Sequence.prototype);
SequenceBigNavette.prototype.constructor = SequenceBigNavette;

SequenceBigNavette.prototype.Reset = function() {
	Sequence.prototype.Reset.call(this);
	this.newTuretTime = 0;
};

SequenceBigNavette.prototype.Start = function() {
	this.Reset ();
	Sequencer.AddBigNavette (this.nbnav+AppViewModel.nbNavetteShield,this.mvtype);

	Sequencer.AddRandomNavette ();
};

SequenceBigNavette.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	this.newTuretTime += deltaTime
	
	if (scrollZone.IsTerrestre ())
	{
		var nextTuretTime = (decorManager.IsDecorEnabled () == true) ? 5 : 12;
		if (this.newTuretTime > nextTuretTime) 
		{
			Sequencer.AddTuret (randomUniform (2,6),randomUniform (1,4));
			this.newTuretTime = 0;
		}
	}
}

SequenceBigNavette.prototype.IsFinished = function() {
	return (entityList.count == 0 && entityTerList.count == 0);
};





function SequenceNavettePique (nbnav,mvtype) {
	SequenceBigNavette.call (this,nbnav,mvtype);
}

SequenceNavettePique.prototype = Object.create(SequenceBigNavette.prototype);
SequenceNavettePique.prototype.constructor = SequenceNavettePique;

SequenceNavettePique.prototype.Start = function() {
	this.Reset ();
	Sequencer.AddNavettePique (this.nbnav+AppViewModel.nbNavetteShield,this.mvtype);
};




/*
function SequenceNavetteMissil (nbnav,mvtype,navetteType,lazerType,missilType) {
	Sequence.call (this);

	this.nbnav = nbnav;
	this.mvtype = mvtype;
	this.navetteType = navetteType;
	this.lazerType = lazerType;
	this.missilType = missilType;
	this.newTuretTime = 0;
	this.NbVague = 3;
}

SequenceNavetteMissil.prototype = Object.create(Sequence.prototype);
SequenceNavetteMissil.prototype.constructor = SequenceNavetteMissil;

SequenceNavetteMissil.prototype.Reset = function() {
	Sequence.prototype.Reset.call(this);
	this.newTuretTime = 0;
};

SequenceNavetteMissil.prototype.Start = function() {
	this.Reset ();
	Sequencer.AddNavetteMissil (this.nbnav+AppViewModel.nbNavette,this.mvtype,this.navetteType,this.lazerType,this.missilType);
};

SequenceNavetteMissil.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	this.newTuretTime += deltaTime
	
	if (scrollZone.IsTerrestre ())
	{
		var nextTuretTime = (decorManager.IsDecorEnabled () == true) ? 5 : 12;
		if (this.newTuretTime > nextTuretTime) 
		{
			Sequencer.AddTuret (randomUniform (2,6),randomUniform (1,4));
			this.newTuretTime = 0;
		}
	}
}

SequenceNavetteMissil.prototype.IsFinished = function() {
	
	if (entityList.count == 0 && entityTerList.count == 0)
	{
		this.NbVague --;
		if (this.NbVague > 0)
		{
			Sequencer.AddNavetteMissil (this.nbnav+AppViewModel.nbNavette,this.mvtype,this.navetteType,this.lazerType,this.missilType);
		}
	}
	return (this.NbVague <= 0);
	// return (entityList.count == 0 && entityTerList.count == 0);
};
*/






function SequenceNavetteMissil (nbnav,mvtype,navetteType,lazerType,missilType) {
	Sequence.call (this);

	this.nbnav = nbnav;
	this.mvtype = mvtype;
	this.navetteType = navetteType;
	this.lazerType = lazerType;
	this.missilType = missilType;
	this.newTuretTime = 0;
}

SequenceNavetteMissil.prototype = Object.create(Sequence.prototype);
SequenceNavetteMissil.prototype.constructor = SequenceNavetteMissil;

SequenceNavetteMissil.prototype.Reset = function() {
	Sequence.prototype.Reset.call(this);
	this.newTuretTime = 0;
};

SequenceNavetteMissil.prototype.Start = function() {
	this.Reset ();
	Sequencer.AddNavetteMissil (this.nbnav+AppViewModel.nbNavette,this.mvtype,this.navetteType,this.lazerType,this.missilType);
};

SequenceNavetteMissil.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	this.newTuretTime += deltaTime
	
	if (scrollZone.IsTerrestre ())
	{
		var nextTuretTime = (decorManager.IsDecorEnabled () == true) ? 5 : 12;
		if (this.newTuretTime > nextTuretTime) 
		{
			Sequencer.AddTuret (randomUniform (2,6),randomUniform (1,4));
			this.newTuretTime = 0;
		}
	}
}

SequenceNavetteMissil.prototype.IsFinished = function() {
	return (entityList.count == 0 && entityTerList.count == 0);
};










function SequenceNavetteFoudre (maxTime,mvtype) {
	Sequence.call (this);

	this.mvtype = (mvtype == undefined) ? 0 : mvtype;
	this.newTuretTime = 0;
	this.spentFoudreTime = 0;
	this.MaxTime = maxTime;
	this.spentTime = 0;
	this.spentNavetteTime = 0;
	this.nextNavetteTime = randomUniform (6,11);
	
	this.AddNavetteFoudre = function(){
		
		var bodyMod = loader.GetModel ('NavetteFoudreBody');
		var foudreMod = loader.GetModel ('FoudreMap1');
		
		var posx = randomUniform (1,AppViewModel.canvasize.width - bodyMod.img.width);
		var posy = - (bodyMod.img.height + foudreMod.img.height + randomUniform (bodyMod.img.height/2,bodyMod.img.height));
		
		Sequencer.AddNavetteFoudre (this.mvtype,posx,posy);
	}
	
	
}

SequenceNavetteFoudre.prototype = Object.create(Sequence.prototype);
SequenceNavetteFoudre.prototype.constructor = SequenceNavetteFoudre;

SequenceNavetteFoudre.prototype.Reset = function() {
	Sequence.prototype.Reset.call(this);
	this.newTuretTime = 0;
	this.spentFoudreTime = 0;
	this.spentTime = 0;
	this.spentNavetteTime = 0;
};

SequenceNavetteFoudre.prototype.Start = function() {
	this.Reset ();
	this.AddNavetteFoudre ();
};

SequenceNavetteFoudre.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	
	this.spentTime += deltaTime;
	if (this.spentTime >= this.MaxTime) return;
	
	this.newTuretTime += deltaTime;
	this.spentNavetteTime += deltaTime;
	this.spentFoudreTime += deltaTime;
	
	
	
	if (this.spentFoudreTime > 2.5)
	{
		this.AddNavetteFoudre ();
		this.spentFoudreTime = 0;
	}
	
	if (scrollZone.IsTerrestre ())
	{
		var nextTuretTime = (decorManager.IsDecorEnabled () == true) ? 5 : 12;
		if (this.newTuretTime > nextTuretTime) 
		{
			Sequencer.AddTuret (randomUniform (2,6),randomUniform (1,4));
			this.newTuretTime = 0;
		}
	}
	
	if (this.spentNavetteTime > this.nextNavetteTime) 
	{
		Sequencer.AddRandomNavette ();
		this.spentNavetteTime = 0;
		this.nextNavetteTime = randomUniform (6,11);
	}
	
	
}

SequenceNavetteFoudre.prototype.IsFinished = function() {
	return (this.spentTime >= this.MaxTime && entityList.count == 0);
};





function SequenceSilo (maxTime) {
	Sequence.call (this);

	this.newTuretTime = 0;
	this.spentSiloTime = 0;
	this.MaxTime = maxTime;
	this.spentTime = 0;
	this.spentNavetteTime = 0;
	this.nextNavetteTime = randomUniform (10,19);
	
	this.AddSilo = function(){
		
		var mod = loader.GetModel ('Silo');
		var posx = randomUniform (1,AppViewModel.canvasize.width - mod.img.width);
		var posy =  -mod.img.height*2;
		Sequencer.AddSilo (posx,posy);
	}
	
	this.SetDefaultSpeed = function () {
		if (Goldo.IsInMegaMach () == false)
			scrollZone.ForceSpeedTarget (150,100);
	};		
}

SequenceSilo.prototype = Object.create(Sequence.prototype);
SequenceSilo.prototype.constructor = SequenceSilo;

SequenceSilo.prototype.Reset = function() {
	Sequence.prototype.Reset.call(this);
	this.newTuretTime = 0;
	this.spentSiloTime = 0;
	this.spentTime = 0;
	this.spentNavetteTime = 0;
};

SequenceSilo.prototype.Start = function() {
	this.Reset ();
	
	if (AppViewModel.hasBonusGlkGo == true)
	{
		this.SetDefaultSpeed ();
		this.AddSilo ();
	}
};

SequenceSilo.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	
	if (AppViewModel.hasBonusGlkGo == false) return;
	
	this.spentTime += deltaTime;
	if (this.spentTime >= this.MaxTime) return;
	
	this.newTuretTime += deltaTime;
	this.spentNavetteTime += deltaTime;
	this.spentSiloTime += deltaTime;

	var timeNewSiloMax = (Goldo.IsInMegaMach () == false) ? 1 : 0.5;
	if (this.spentSiloTime > timeNewSiloMax)
	{
		this.AddSilo ();
		this.spentSiloTime = 0;
	}
	
	if (scrollZone.IsTerrestre ())
	{
		var nextTuretTime = (decorManager.IsDecorEnabled () == true) ? 5 : 12;
		if (this.newTuretTime > nextTuretTime) 
		{
			Sequencer.AddTuret (1,randomUniform (1,4));
			this.newTuretTime = 0;
		}
	}
	
	if (this.spentNavetteTime > this.nextNavetteTime) 
	{
		Sequencer.AddRandomNavette ();
		this.spentNavetteTime = 0;
		this.nextNavetteTime = randomUniform (10,19);
		
		// var bonus = new Bonus ('BonusPlanitronExt');
		// bonus.Init ();
		// otherList.AddObject (bonus);	
	}
}

SequenceSilo.prototype.IsFinished = function() {
	return (AppViewModel.hasBonusGlkGo == false || (this.spentTime >= this.MaxTime && entityList.count == 0));
};

SequenceSilo.prototype.OnMegaMachEnded = function() {
	this.SetDefaultSpeed ();
}

SequenceSilo.prototype.Finish = function() {
	if (Goldo.IsInMegaMach () == false) scrollZone.ForceSpeedTarget (100,100);
	AppViewModel.hasBonusGlkGo = false;
}























function SequenceTourelle (nb,type) {
	Sequence.call (this);
	this.nb = nb;
	this.typeTourelle = type;
	this.newEntityTime = 0
}

SequenceTourelle.prototype = Object.create(Sequence.prototype);
SequenceTourelle.prototype.constructor = SequenceTourelle;

SequenceTourelle.prototype.Start = function() {
	this.Reset ();
	
	var nbAddedTuret = 0;
	if (this.typeTourelle == 4) nbAddedTuret = Sequencer.AddTuret (this.nb,randomUniform (1,4))
	else nbAddedTuret = Sequencer.AddTuret (this.nb,this.typeTourelle);
	
	if (nbAddedTuret > 0)
	{
		Sequencer.AddNavette (1,randomUniform (2,6),randomUniform (1,4));
		Sequencer.AddNavette (2,randomUniform (2,6),randomUniform (1,4));
		Sequencer.AddNavette (3,randomUniform (2,6),randomUniform (1,4));
	}
};

SequenceTourelle.prototype.IsFinished = function() {
	return (entityTerList.count == 0);
};





function SequenceTourelleMissil (nb,type) {
	Sequence.call (this);
	this.nb = nb;
	this.typeMissil = type;
}

SequenceTourelleMissil.prototype = Object.create(Sequence.prototype);
SequenceTourelleMissil.prototype.constructor = SequenceTourelleMissil;

SequenceTourelleMissil.prototype.Start = function() {
	this.Reset ();
	
	Sequencer.AddTuretMissil (this.nb,this.typeMissil)
};

SequenceTourelleMissil.prototype.IsFinished = function() {
	return (entityTerList.count == 0);
};





function SequenceBaricade (timeLen) {
	Sequence.call (this);
	this.timeLen = timeLen;
	this.spentTime = 0;
	this.newBaricadeTime = 0;
	this.spentNavetteTime = 0;
	this.spentTuretTime = 0
	this.spentFomationTime = 0;
	this.nextNavetteTime = randomUniform (4,8);
	this.nextTuretTime = randomUniform (15,26);
	this.nextFormationTime = randomUniform (20,31);
}

SequenceBaricade.prototype = Object.create(Sequence.prototype);
SequenceBaricade.prototype.constructor = SequenceBaricade;

SequenceBaricade.prototype.Start = function() {
	this.Reset ();
	this.spentTime = 0;
	this.newBaricadeTime = 0;
	this.spentNavetteTime = 0;
	this.spentTuretTime = 0
	this.spentFomationTime = 0;
	Goldo.StopMegaMach ();
	scrollZone.SetSpeedTarget (100,100);

	this.lastBaricade = Sequencer.AddBaricade ();
};

SequenceBaricade.prototype.Finish = function() {
	Sequence.prototype.Finish.call(this);
	if (Goldo.IsInMegaMach () == false) scrollZone.SetSpeedTarget (50,100);
};

SequenceBaricade.prototype.IsFinished = function() {
	return (this.spentTime > this.timeLen);
};

SequenceBaricade.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	
	this.spentTime += deltaTime;
	this.newBaricadeTime += deltaTime;
	this.spentNavetteTime += deltaTime;
	this.spentTuretTime += deltaTime;
	this.spentFomationTime += deltaTime;

	if (this.lastBaricade != null)
	{
		if (this.lastBaricade.posy > 450)
		{
			this.lastBaricade = Sequencer.AddBaricade ();
			this.lastBaricade = Sequencer.AddBaricade ();
		}
	}
	
	var isInMegaMach = Goldo.IsInMegaMach ();
	if (isInMegaMach == true)
	{
		AppViewModel.points += Math.ceil (deltaTime);
	}

	var nextBarcadeTime = (isInMegaMach == true) ? 1 : 7; 
	if (this.lastBaricade == null && this.newBaricadeTime >= nextBarcadeTime) 
	{
		this.lastBaricade = Sequencer.AddBaricade ();
		this.lastBaricade = Sequencer.AddBaricade ();
		this.newBaricadeTime = 0;
	}
	
	if (this.spentNavetteTime > this.nextNavetteTime) 
	{
		Sequencer.AddRandomNavette ();
		this.nextNavetteTime = randomUniform (4,9);
		this.spentNavetteTime = 0;
	}

	if (this.spentFomationTime > this.nextFormationTime) 
	{
		if (randomUniform (1,11) < 6) Sequencer.AddRandomFormationNavetteDelta ();
		else Sequencer.AddRandomFormationNavetteInvader ();
		this.nextFormationTime = randomUniform (15,26);
		this.spentFomationTime = 0;
	}

	if (this.spentTuretTime > this.nextTuretTime) 
	{
		Sequencer.AddTuret (1,randomUniform (1,4));
		if (isInMegaMach == false) this.nextTuretTime = randomUniform (15,21);
		else this.nextTuretTime = randomUniform (3,7);
		this.spentTuretTime = 0;
	}
}




/*
function SequenceCyberMine (timeLen) {
	Sequence.call (this);
	this.timeLen = timeLen;
	this.spentTime = 0;
	this.cyberMineTime = 0;
}

SequenceCyberMine.prototype = Object.create(Sequence.prototype);
SequenceCyberMine.prototype.constructor = SequenceCyberMine;

SequenceCyberMine.prototype.Start = function() {
	this.Reset ();
	this.spentTime = 0;
	this.cyberMineTime = 0;
	Goldo.StopMegaMach ();
	scrollZone.SetSpeedTarget (100,100);
	this.AddCyberMineTime = 0.4;

};

SequenceCyberMine.prototype.Finish = function() {
	Sequence.prototype.Finish.call(this);
	if (Goldo.IsInMegaMach () == false) scrollZone.SetSpeedTarget (50,100);
};


SequenceCyberMine.prototype.IsFinished = function() {
	return (this.spentTime > this.timeLen);
};

SequenceCyberMine.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	
	this.spentTime += deltaTime;
	this.cyberMineTime += deltaTime;
	this.AddCyberMineTime -= 0.005 * deltaTime;
	if (this.cyberMineTime > this.AddCyberMineTime)
	{
		this.cyberMineTime = 0;
		Sequencer.AddCyberMine ();
	}
}
*/






function SequenceCyberMine (timeLen) {
	Sequence.call (this);
	this.timeLen = timeLen;
	this.spentTime = 0;
	this.cyberMineTime = 0;
}

SequenceCyberMine.prototype = Object.create(Sequence.prototype);
SequenceCyberMine.prototype.constructor = SequenceCyberMine;

SequenceCyberMine.prototype.Start = function() {
	this.Reset ();
	this.spentTime = 0;
	this.cyberMineTime = 0;
	Goldo.StopMegaMach ();
	scrollZone.SetSpeedTarget (100,100);
	this.AddCyberMineTime = 0.4;

	Sequencer.ManageSoucoupeAmiralePassage ();
};

SequenceCyberMine.prototype.Finish = function() {
	Sequence.prototype.Finish.call(this);
	if (Goldo.IsInMegaMach () == false) scrollZone.SetSpeedTarget (50,100);
};


SequenceCyberMine.prototype.IsFinished = function() {
	return (this.spentTime > this.timeLen);
};

SequenceCyberMine.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	
	this.spentTime += deltaTime;
	this.cyberMineTime += deltaTime;
	this.AddCyberMineTime -= 0.005 * deltaTime;
	if (this.cyberMineTime > this.AddCyberMineTime)
	{
		this.cyberMineTime = 0;
		Sequencer.AddCyberMine ();
	}
	
	Sequencer.ManageSoucoupeAmiralePassage ();
}









function SequenceSoucoupeAmirale () {
	Sequence.call (this);
	this.soucoupe = null;
	this.newNavetteTime = 0;
	this.newFormationTime = 0;
	this.newTuretTime = 0;
}

SequenceSoucoupeAmirale.prototype = Object.create(Sequence.prototype);
SequenceSoucoupeAmirale.prototype.constructor = SequenceSoucoupeAmirale;

SequenceSoucoupeAmirale.prototype.Reset = function() {
	Sequence.prototype.Reset.call(this);
	this.newNavetteTime = 0;
	this.newFormationTime = 0;
	this.newTuretTime = 0;
	
};

SequenceSoucoupeAmirale.prototype.Start = function() {
	this.Reset ();
	this.soucoupe = Sequencer.AddSoucoupeAmiral ();
};

SequenceSoucoupeAmirale.prototype.IsFinished = function() {
	return (this.soucoupe != null && this.soucoupe.vie <= 0)
};

SequenceSoucoupeAmirale.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);

	this.newNavetteTime += deltaTime;
	this.newFormationTime += deltaTime;
	this.newTuretTime += deltaTime;
	
	if (this.newNavetteTime > 10) 
	{
		Sequencer.AddNavette (4,5,randomUniform (1,5));
		this.newNavetteTime = 0;
	}

	if (this.newFormationTime > 20) 
	{
		if (randomUniform (1,11) < 6) Sequencer.AddRandomFormationNavetteDelta ();
		else Sequencer.AddRandomFormationNavetteInvader ();
		this.newFormationTime = 0;
	}
	
	if (scrollZone.IsTerrestre () == true)
	{
		if (this.newTuretTime > 15) 
		{
			Sequencer.AddTuret (randomUniform (2,6),randomUniform (1,4));
			this.newTuretTime = 0;
		}
	}
}





function SequenceSoucoupeMinos () {
	Sequence.call (this);
	this.soucoupe = null;
	this.newNavetteTime = 0;
	this.newFormationTime = 0;
}

SequenceSoucoupeMinos.prototype = Object.create(Sequence.prototype);
SequenceSoucoupeMinos.prototype.constructor = SequenceSoucoupeMinos;

SequenceSoucoupeMinos.prototype.Reset = function() {
	Sequence.prototype.Reset.call(this);
	this.newNavetteTime = 0;
	this.newFormationTime = 0;
	
};

SequenceSoucoupeMinos.prototype.Start = function() {
	this.Reset ();
	this.soucoupe = Sequencer.AddSoucoupeMinos ();
};

SequenceSoucoupeMinos.prototype.IsFinished = function() {
	return (this.soucoupe != null && this.soucoupe.vie <= 0)
};

SequenceSoucoupeMinos.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);

	this.newNavetteTime += deltaTime;
	this.newFormationTime += deltaTime;
	
	if (this.newNavetteTime > 10) 
	{
		Sequencer.AddNavette (4,5,randomUniform (1,5));
		this.newNavetteTime = 0;
	}

	if (this.newFormationTime > 35) 
	{
		if (randomUniform (1,11) < 6) Sequencer.AddRandomFormationNavetteDelta ();
		else Sequencer.AddRandomFormationNavetteInvader ();
		this.newFormationTime = 0;
	}
}





function SequenceGolgoth (type) {
	Sequence.call (this);
	this.golgoth = null;
	this.newNavetteTime = 0;
	this.nextNavetteTime = randomUniform (8,16);
	this.type = type;
}

SequenceGolgoth.prototype = Object.create(Sequence.prototype);
SequenceGolgoth.prototype.constructor = SequenceGolgoth;

SequenceGolgoth.prototype.Reset = function() {
	Sequence.prototype.Reset.call(this);
	this.newNavetteTime = 0;
	this.golgoth = null;
};

SequenceGolgoth.prototype.Start = function() {
	this.Reset ();
	
	if ((this.type < 1 || this.type > 6) && this.type != 999) this.type = randomUniform (1,7);
	
	switch (this.type)
	{
		case SeqEnum.GoruGoru : 
		this.golgoth = Sequencer.AddGoruGoru ();
		Sequencer.AddRandomNavette ();
		break;
		case SeqEnum.Golgoth40 : this.golgoth = Sequencer.AddGolgoth40 ();break;
		case SeqEnum.Golgoth28 : this.golgoth = Sequencer.AddGolgoth28 ();break;
		case SeqEnum.GinGin : this.golgoth = Sequencer.AddGinGin ();break;
		case SeqEnum.Ergastul : this.golgoth = Sequencer.AddErgastul ();break;
		case SeqEnum.Golgoth27 : this.golgoth = Sequencer.AddGolgoth27 ();break;
		case 999 : 
		this.golgoth = Sequencer.AddGoruGoru ();
		Sequencer.AddGolgoth40 ();
		Sequencer.AddGolgoth28 ();
		Sequencer.AddGinGin ();
		Sequencer.AddErgastul ();
		Sequencer.AddGolgoth27 ();
		break;
	}
};

SequenceGolgoth.prototype.IsFinished = function() {
	return (this.golgoth != null && this.golgoth.vie <= 0);
};

SequenceGolgoth.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	this.newNavetteTime += deltaTime

	
	if (this.type == SeqEnum.GinGin || this.type == SeqEnum.Golgoth27)
	{
		if (this.newNavetteTime >= 20) 
		{
			if (this.type == SeqEnum.GinGin) loader.PlaySound ('JanusAttaqueGenerale',0.8);
		
			if (randomUniform (1,11) < 6) Sequencer.AddRandomFormationNavetteDelta ();
			else Sequencer.AddRandomFormationNavetteInvader ();

			this.newNavetteTime = 0;
		}
		
	}
	else
	{
		if (this.newNavetteTime >= this.nextNavetteTime) 
		{
			Sequencer.AddRandomNavette ();
			
			if (randomUniform (1,11) < 6) Sequencer.AddRandomFormationNavetteDelta ();
			else Sequencer.AddRandomFormationNavetteInvader ();

			this.newNavetteTime = 0;
			this.nextNavetteTime = randomUniform (8,16);
		}
	}
}





function SequenceTimeWaiting (timeOut) {
	Sequence.call (this);
	this.timeOut = timeOut;
	this.timeSpent = 0;
}

SequenceTimeWaiting.prototype = Object.create(Sequence.prototype);
SequenceTimeWaiting.prototype.constructor = SequenceTimeWaiting;

SequenceTimeWaiting.prototype.Reset = function() {
	Sequence.prototype.Reset.call(this);
	this.timeSpent = 0;
};

SequenceTimeWaiting.prototype.Start = function() {
	this.Reset ();
};

SequenceTimeWaiting.prototype.IsFinished = function() {
	return (this.timeSpent >= this.timeOut)
};

SequenceTimeWaiting.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	this.timeSpent += deltaTime;
}





/*
function SequenceWaitNoEntity () {
	Sequence.call (this);
}

SequenceWaitNoEntity.prototype = Object.create(Sequence.prototype);
SequenceWaitNoEntity.prototype.constructor = SequenceWaitNoEntity;


SequenceWaitNoEntity.prototype.IsFinished = function() {
	return (entityList.count == 0 && entityTerList.count == 0);	
};
*/

function SequenceWaitNoEntityList (list) {
	Sequence.call (this);
	this.list = list;
}

SequenceWaitNoEntityList.prototype = Object.create(Sequence.prototype);
SequenceWaitNoEntityList.prototype.constructor = SequenceWaitNoEntityList;


SequenceWaitNoEntityList.prototype.IsFinished = function() {
	return (this.list.count == 0);	
};








function SequenceBonus (bonusType,nb) {
	Sequence.call (this);
	this.bonusType = bonusType;
	this.nb = nb;
	this.bonus = null;
}

SequenceBonus.prototype = Object.create(Sequence.prototype);
SequenceBonus.prototype.constructor = SequenceBonus;

SequenceBonus.prototype.Start = function() {
	this.Reset ();
	var bonusName;
	switch (this.bonusType)
	{
		case AppViewModel.bonusPlanitron:bonusName = 'PlanitronBonus';break;
		case AppViewModel.bonusMegavolt:bonusName = 'BonusMegavolt';break;
		case AppViewModel.bonusAlcorak:bonusName = 'BonusAlcorak';break;
		case AppViewModel.bonusFossoirak:bonusName = 'BonusFossoirak';break;
		case AppViewModel.bonusVenusiak:bonusName = 'BonusVenusiak';break;
		case AppViewModel.bonusOVTerre:bonusName = 'BonusOVTerre';break;
		case AppViewModel.bonusMegaMach:bonusName = 'BonusMegaMach';break;
		case AppViewModel.bonusFulguroPoing:bonusName = 'BonusFulguroPoing';break;
		case AppViewModel.bonusCorneAuFulgure:bonusName = 'BonusCorneAuFulgure';break;
		case AppViewModel.BonusGlKgo:bonusName = 'BonusGlKgo';break;
		case AppViewModel.BonusPlanitronExt:bonusName = 'BonusPlanitronExt';break;
		
		default:
		bonusName = 'Bonus';
		break;
	}

	var bonus;
	for (var i = 1; i <= this.nb ; i++)
	{
		bonus = new Bonus (bonusName);
		bonus.Init ();
		otherList.AddObject (bonus);	
	}
	
	if (this.bonusType == AppViewModel.BonusGlKgo)
	{
		bonus.speed *= 2;
	}

	this.bonus = bonus;
};

SequenceBonus.prototype.IsFinished = function() {
	return (this.bonus != null);
};





function SequenceBonusGlKgo () {
	SequenceBonus.call (this,AppViewModel.BonusGlKgo,1);
}

SequenceBonusGlKgo.prototype = Object.create(SequenceBonus.prototype);
SequenceBonusGlKgo.prototype.constructor = SequenceBonusGlKgo;

SequenceBonusGlKgo.prototype.IsFinished = function() {
	return (this.bonus.posy >  AppViewModel.canvasize.height || AppViewModel.hasBonusGlkGo == true);
};





function SequenceBaseVega () {
	Sequence.call (this);
	this.baseVega = null;
	this.newNavetteTime = 0;
}

SequenceBaseVega.prototype = Object.create(Sequence.prototype);
SequenceBaseVega.prototype.constructor = SequenceBaseVega;

SequenceBaseVega.prototype.Reset = function() {
	Sequence.prototype.Reset.call(this);
	this.newNavetteTime = 0;
};

SequenceBaseVega.prototype.Start = function() {
	this.Reset ();
	this.baseVega = Sequencer.AddBaseVega ();
	Sequencer.AddRandomFormationNavetteInvader ();
	Goldo.StopMegaMach ();
};

SequenceBaseVega.prototype.IsFinished = function() {

	return this.baseVega.IsDestroyed ();
};

SequenceBaseVega.prototype.Animate = function(deltaTime) {
	Sequence.prototype.Animate.call(this,deltaTime);
	
	this.newNavetteTime += deltaTime
	if (this.newNavetteTime >= 16) 
	{
		Sequencer.AddRandomFormationNavetteInvader ();
		this.newNavetteTime = 0;
	}	
}

SequenceBaseVega.prototype.Finish = function() {

	Sequence.prototype.Finish.call(this);	
	for (var i = 1; i <= 10; i++)
	{
		var posx = this.baseVega.posx + randomUniform (this.baseVega.model.img.width / 4, this.baseVega.model.img.width * 3 / 4);
		var posy = this.baseVega.posy + randomUniform (this.baseVega.model.img.height / 4, this.baseVega.model.img.height * 3 / 4);
		NewCrosseExplosionPos (posx,posy);
	}		

	scrollZone.DisableStaticMode ();
	scrollZone.SetSpeedTarget (50,100);
};





FormationType = {
	formationNavetteInvader : 1,
	formationNavetteDelta : 2,
};

function Formation() {
	this.type = 0;
	this.startPosx = 0;
	this.navtype = 0;
	this.mvtype = 0;
	this.speed = 0;
	this.nbHorz = 0;
	this.nbVert = 0;
	this.navColSize = 0;
	
	this.NewFormationNavetteInvader = function(navtype,mvtype,speed,startPosx,nbHorz,nbVert){
		this.type = FormationType.formationNavetteInvader;
		this.mvtype = mvtype;

		this.SetNavType (navtype);

		if (speed != undefined) this.speed = speed;
		else this.speed = this.RandomSpeed ();

		this.nbHorz = nbHorz;
		this.nbVert = nbVert;

		if (startPosx != undefined) this.startPosx = startPosx;
		else this.startPosx = this.RandomPosition(this.nbHorz);

	};
	
	this.NewRandomFormationNavetteInvader = function(navtype){
		this.type = FormationType.formationNavetteInvader;

		this.mvtype = 1;

		this.SetNavType ((navtype == undefined) ? randomUniform (1,4) : navtype);

		this.nbHorz = 4 + randomUniform (0,5);
		this.nbVert = randomUniform (1,7);

		this.speed = this.RandomSpeed ();
		this.startPosx = this.RandomPosition(this.nbHorz);
	};

	this.NewFormationNavetteDelta = function(navtype,mvtype,speed,startPosx,nbHorz,nbVert){
		this.type = FormationType.formationNavetteDelta;
		this.mvtype = mvtype;

		this.SetNavType (navtype);

		if (speed != undefined) this.speed = speed;
		else this.speed = this.RandomSpeed ();

		this.nbHorz = nbHorz;
		this.nbVert = nbVert;

		if (startPosx != undefined) this.startPosx = startPosx;
		else this.startPosx = this.RandomPosition(this.nbHorz);
	};

	this.NewRandomFormationNavetteDelta = function(navtype){
		this.type = FormationType.formationNavetteDelta;
		this.mvtype = 1;
		
		this.SetNavType ((navtype == undefined) ? randomUniform (1,4) : navtype);

		this.nbHorz = 4 + randomUniform (2,6);
		this.nbVert = randomUniform (1,5);

		this.speed = this.RandomSpeed ();
		this.startPosx = this.RandomPosition(this.nbHorz);
	};
	
	this.RandomPosition = function(nbHorz){
		return randomUniform (0,AppViewModel.canvasize.width - nbHorz * this.navColSize);
	}
	
	this.RandomSpeed = function(){
		return randomUniform (150,300);
	}

	this.SetNavType = function(navtype){
		
		this.navtype = navtype;
		if (this.navtype < 1 || this.navtype > 3) this.navtype = randomUniform (1,4);

		switch (this.navtype)
		{
			case 1 : model = loader.GetModel ('navette01');break;
			case 2 : model = loader.GetModel ('navette02');break;
			case 3 : model = loader.GetModel ('navette03');break;
		}
		this.navColSize = Math.max (model.img.width,model.img.height) + 20;
	}


}





function SequenceFormation (formation) {
	Sequence.call (this);
	this.formation = formation;
}

SequenceFormation.prototype = Object.create(Sequence.prototype);
SequenceFormation.prototype.constructor = SequenceFormation;


SequenceFormation.prototype.Start = function() {
	this.Reset ();
	switch (this.formation.type)
	{
		case FormationType.formationNavetteInvader:
		Sequencer.AddFormationNavetteInvader (this.formation);
		break;
		case FormationType.formationNavetteDelta:
		Sequencer.AddFormationNavetteDelta (this.formation);
		break;
	}
};





function SequenceScrollFading (fadingLen,fadingBackImage,enableCloud) {
	Sequence.call (this);
	this.fadingLen = fadingLen;
	this.fadingBackImage = (fadingBackImage == undefined) ? null : fadingBackImage;
	this.enableCloud = (enableCloud == undefined) ? null : enableCloud;
}

SequenceScrollFading.prototype = Object.create(Sequence.prototype);
SequenceScrollFading.prototype.constructor = SequenceScrollFading;

SequenceScrollFading.prototype.Start = function() {
	this.Reset ();
	
	if (this.fadingBackImage != null && scrollZone.MainImg != this.fadingBackImage)
	{
		scrollZone.FadeImg = this.fadingBackImage;
	}
	else if (scrollZone.MainImg == this.fadingBackImage) alert ('ERROR SequenceScrollFading : two same image');
	
	scrollZone.StartFading (this.fadingLen);
	
	if (this.enableCloud  != null) scrollZone.EnableCloud (this.enableCloud);
};

SequenceScrollFading.prototype.Animate = function(deltaTime) {
};


SequenceScrollFading.prototype.IsFinished = function() {
	return (scrollZone.IsInFading () == false);
};





function SequenceScrollCloud () {
	Sequence.call (this);
}

SequenceScrollCloud.prototype = Object.create(Sequence.prototype);
SequenceScrollCloud.prototype.constructor = SequenceScrollCloud;

SequenceScrollCloud.prototype.Start = function() {
	this.Reset ();
	scrollZone.CloudChange ();
};


SequenceScrollCloud.prototype.IsFinished = function() {
	return (scrollZone.IsInFading () == false);
};





function SequenceScrollSpeed (targetSpeed,acceleration,endtime) {
	Sequence.call (this);
	this.targetSpeed = targetSpeed;
	this.acceleration = acceleration;
	this.endtime = (endtime == undefined) ? 0 : endtime;
	this.spentTime = 0;
}

SequenceScrollSpeed.prototype = Object.create(Sequence.prototype);
SequenceScrollSpeed.prototype.constructor = SequenceScrollSpeed;

SequenceScrollSpeed.prototype.Start = function() {
	this.Reset ();
	this.spentTime = 0;
	
	if (Goldo.IsInMegaMach () == false)
		scrollZone.SetSpeedTarget (this.targetSpeed,this.acceleration);
};

SequenceScrollSpeed.prototype.Animate = function(deltaTime) {
	
	if (this.endtime != 0)
	{
		if (scrollZone.Speed == this.targetSpeed)
		{
			this.spentTime += deltaTime;
		}
	}
}

SequenceScrollSpeed.prototype.IsFinished = function() {
	
	
	if (Goldo.IsInMegaMach () == true)
	{
		return true;
	}
	
	if (this.endtime == 0)
	{
		return (scrollZone.Speed == this.targetSpeed);
	}
	
	return (this.spentTime >= this.endtime);
};





function ImgDisplay (imageName,posx,posy,timeStart) {
	this.imageName = imageName;
	this.posx = posx;
	this.posy = posy;
	this.timeStart = timeStart;
	this.model = loader.GetModel (this.imageName);
}

function SequencePlaySound (soundname,volume,waitTimeParam) {
	Sequence.call (this);
	this.soundname = soundname;

	this.waitTimeParam = (waitTimeParam == undefined) ? 0 : waitTimeParam;
	this.waitTime = this.waitTimeParam;

	this.spenttime = 0;
	this.volume = volume;
	this.Audio = null;
	this.AudioNode = null;
	this.imageList = new Array ();
	
	this.AddImage = function(imageName,posx,posy,timeStart){
		var img = new ImgDisplay (imageName,posx,posy,timeStart);
		this.imageList.push (img);
	}
}

SequencePlaySound.prototype = Object.create(Sequence.prototype);
SequencePlaySound.prototype.constructor = SequencePlaySound;

SequencePlaySound.prototype.Reset = function() {
	this.spenttime = 0;
	this.waitTime = this.waitTimeParam;
}


SequencePlaySound.prototype.Start = function() {
	this.Reset ();

	this.Audio = loader.GetSoundByName (this.soundname);
	this.AudioNode = loader.PlaySoundAudio (this.Audio,this.volume);
	
	if (this.waitTime < 0) this.waitTime = this.Audio.duration;
};

SequencePlaySound.prototype.Animate = function(deltaTime) {
	this.spenttime += deltaTime;
}


SequencePlaySound.prototype.Draw = function(ctx,drawOnFront) {
	if (this.DrawOnFront != drawOnFront) return;
	if (this.imageList.length > 0)
	{
		for (var i = 0 ; i < this.imageList.length; i++)
		{
			var img = this.imageList [i];
			if (this.spenttime > img.timeStart)
			{
				ctx.drawImage(img.model.img, img.posx, img.posy);
			}
		}
	}
}

SequencePlaySound.prototype.IsFinished = function() {
	return (this.spenttime > this.waitTime);
};

SequencePlaySound.prototype.Abort = function() {
	if (this.AudioNode != null)
	{
		this.AudioNode.stop ();
		this.AudioNode = null;
	}
};





function SequenceAsteroid (timeLen,type,withAccel) {
	Sequence.call (this);
	this.timeLen = timeLen;
	this.timeSpent = 0;
	this.type = (type == undefined) ? 4 : type;
	
	this.timeNextAsteroidStart = 0.25;
	this.timeNextAsteroid = randomUniform (0, 3);
	this.newNavetteTime = 0;
	this.withAccel = (withAccel == undefined) ? false : withAccel;

	this.GetRandomAsteroid = function () {
		var type = randomUniform (1,31);

		if (type >= 13 && type <= 30) return new SmallAsteroid ();
		
		if (type > 2 && type <= 12) return new MediumAsteroid ();
		
		return new BigAsteroid ();
	};
	
	this.NewAsteroid = function () {
		
		var asteroid;
		
		switch (this.type)
		{
			case 1:asteroid = new SmallAsteroid ();break;
			case 2:asteroid = new MediumAsteroid ();break;
			case 3:asteroid = new BigAsteroid ();break;
			default:asteroid = this.GetRandomAsteroid ();break;
		}

		asteroid.Init ();
		entityList.AddObject (asteroid);
	};
}

SequenceAsteroid.prototype = Object.create(Sequence.prototype);
SequenceAsteroid.prototype.constructor = SequenceAsteroid;

SequenceAsteroid.prototype.Start = function() {
	this.Reset ();

	this.timeSpent = 0;
	
	switch (this.type)
	{
		case 1: this.timeNextAsteroidStart = 0.15;break;
		case 2: this.timeNextAsteroidStart = 0.25;break;
		case 3: this.timeNextAsteroidStart = 2.5;break;
		default : this.timeNextAsteroidStart = 0.35;break;
	}

	this.timeNextAsteroid = this.timeNextAsteroidStart;
	this.newNavetteTime = 0;
	
	this.accelTime = randomUniform (1,this.timeLen/2);
};

SequenceAsteroid.prototype.Animate = function(deltaTime) {
	this.timeSpent += deltaTime;
	
	if (this.timeSpent <= this.timeLen)
	{
		this.timeNextAsteroid -= deltaTime;
		if (this.timeNextAsteroid <= 0)
		{
			this.timeNextAsteroid = this.timeNextAsteroidStart;
			this.NewAsteroid ();
		}
		
		this.newNavetteTime += deltaTime;
		if (this.newNavetteTime >= 8) 
		{
			Sequencer.AddRandomNavette ();
			this.newNavetteTime = 0;
		}

		if (Goldo.IsInMegaMach ())
		{
			AppViewModel.points += Math.ceil (deltaTime);
		}
	}
	
	if (this.withAccel == true && this.timeSpent >= this.accelTime)
	{
		Goldo.NewMegaMach ();
		this.withAccel = false;
	}
}

SequenceAsteroid.prototype.IsFinished = function() {
	return (this.timeSpent >= this.timeLen && entityList.count == 0);
};





function SequenceSoucoupeImperiale () {
	Sequence.call (this);
	this.newFormationTime = 0;
	this.soucoupeImperiale = null;
	this.vieInitial = 0;
}

SequenceSoucoupeImperiale.prototype = Object.create(Sequence.prototype);
SequenceSoucoupeImperiale.prototype.constructor = SequenceSoucoupeImperiale;

SequenceSoucoupeImperiale.prototype.Start = function() {
	this.Reset ();
	
	scrollZone.ForceSpeedTarget (50,100);
	this.newFormationTime = 0;

	this.soucoupeImperiale = Sequencer.AddSoucoupeImperiale ();
	this.vieInitial = this.soucoupeImperiale.vie;
};

SequenceSoucoupeImperiale.prototype.Animate = function(deltaTime) {

	this.newFormationTime += deltaTime;

	if (this.newFormationTime >= 4) 
	{
		if (randomUniform (1,11) < 6) Sequencer.AddRandomFormationNavetteDelta ();
		else Sequencer.AddRandomFormationNavetteInvader ();
		this.newFormationTime = 0;
	}
}

SequenceSoucoupeImperiale.prototype.IsFinished = function() {
	if (this.soucoupeImperiale.IsValid () == false)
	{
		EagleWin ();
		return true;
	}
	
	return false;
};





function SequenceGroundDecor (enable,waitTime) {
	Sequence.call (this);
	this.memSpeed = scrollZone.speed;
	this.enable = enable;
	this.waitTime = (waitTime == undefined) ? -1 : waitTime;
	this.spentTime = 0;
}

SequenceGroundDecor.prototype = Object.create(Sequence.prototype);
SequenceGroundDecor.prototype.constructor = SequenceGroundDecor;

SequenceGroundDecor.prototype.Start = function() {
	this.Reset ();
	
	decorManager.EnableDecor (this.enable);
};

SequenceGroundDecor.prototype.Animate = function(deltaTime) {
	this.spentTime += deltaTime;
}

SequenceGroundDecor.prototype.IsFinished = function() {
	
	if (this.enable == true) return true;
	
	if (this.waitTime > 0 && this.spentTime > this.waitTime) return true;
	
	return (groundDecorsList.count == 0);
};





function SequenceCloud (enable) {
	Sequence.call (this);
	this.enable = enable;
}

SequenceCloud.prototype = Object.create(Sequence.prototype);
SequenceCloud.prototype.constructor = SequenceCloud;

SequenceCloud.prototype.Start = function() {
	this.Reset ();
	scrollZone.EnableCloud (this.enable);
};

SequenceCloud.prototype.IsFinished = function() {
	return true;
};





function SequenceMegamach (timeWait) {
	Sequence.call (this);
	this.timeWait = timeWait;
	this.timeSpent = 0;
}

SequenceMegamach.prototype = Object.create(Sequence.prototype);
SequenceMegamach.prototype.constructor = SequenceMegamach;

SequenceMegamach.prototype.Start = function() {
	this.Reset ();
	Goldo.NewMegaMach ();
};

SequenceMegamach.prototype.Animate = function(deltaTime) {
	this.timeSpent += deltaTime;
}

SequenceMegamach.prototype.IsFinished = function() {
	return (this.timeSpent > this.timeWait);
};





function SequenceEarth (showing) {
	Sequence.call (this);
	this.DrawOnFront = false;
	this.earthMod = loader.GetModel ('Earth');
	this.IsEnded = false;
	this.showing = showing;
}

SequenceEarth.prototype = Object.create(Sequence.prototype);
SequenceEarth.prototype.constructor = SequenceEarth;

SequenceEarth.prototype.Start = function() {
	this.Reset ();
	if (this.showing == true) 
	{
		Goldo.StopMegaMach ();
		scrollZone.ForceSpeedTarget (50,200);		
		scrollZone.EnableStaticMode ();
		this.earthPosy = AppViewModel.canvasize.height;
	}
	else
	{
		scrollZone.EnableEarthBack (false);
		this.earthPosy = AppViewModel.canvasize.height - this.earthMod.img.height;
	}
	this.IsEnded = false;
};

SequenceEarth.prototype.Animate = function(deltaTime) {
	
	
	if (this.showing == true)
	{
		this.earthPosy -= 100 * deltaTime;
		if (this.earthPosy < AppViewModel.canvasize.height - this.earthMod.img.height)
		{
			this.earthPosy = AppViewModel.canvasize.height - this.earthMod.img.height;
			this.IsEnded = true;
		}
	}
	else
	{
		this.earthPosy += 100 * deltaTime;
		if (this.earthPosy >= AppViewModel.canvasize.height)
		{
			this.IsEnded = true;
		}
	}
}

SequenceEarth.prototype.IsFinished = function() {
	
	if (this.IsEnded == true && this.showing == true)
	{
		scrollZone.EnableEarthBack (true);
	}
	return this.IsEnded;
};

SequenceEarth.prototype.Draw = function(ctx,drawOnFront) {
	if (this.DrawOnFront != drawOnFront) return;




	// var Sun = loader.GetModel ('Sun');
	// ctx.drawImage (Sun.img,200,100);

	ctx.drawImage (this.earthMod.img,0,0,this.earthMod.img.width,this.earthMod.img.height,
	0,this.earthPosy,AppViewModel.canvasize.width,this.earthMod.img.height);

}













function SequenceMoon (showing) {
	Sequence.call (this);
	this.DrawOnFront = false;
	this.moonMod = loader.GetModel ('Moon');
	this.IsEnded = false;
	this.showing = showing;
	this.moonPosy = -this.moonMod.img.height;
	this.moonPosx = AppViewModel.canvasize.width / 2 - this.moonMod.img.width / 2;
}

SequenceMoon.prototype = Object.create(Sequence.prototype);
SequenceMoon.prototype.constructor = SequenceMoon;

SequenceMoon.prototype.Start = function() {
	this.Reset ();
	if (this.showing == true) 
	{
		Goldo.StopMegaMach ();
		scrollZone.EnableStaticMode ();
		scrollZone.ForceSpeedTarget (50,200);
		this.moonPosy = -this.moonMod.img.height;
	}
	else
	{
		scrollZone.EnableMoonBack (false);
		this.moonPosy = 0;
	}
	this.IsEnded = false;
};

SequenceMoon.prototype.Animate = function(deltaTime) {
	
	
	if (this.showing == true)
	{
		this.moonPosy += 100 * deltaTime;
		if (this.moonPosy > 0)
		{
			this.moonPosy = 0;
			this.IsEnded = true;
		}
	}
	else
	{
		this.moonPosy -= 100 * deltaTime;
		if (this.moonPosy <= -this.moonMod.img.height)
		{
			this.IsEnded = true;
		}
	}
}

SequenceMoon.prototype.IsFinished = function() {
	
	if (this.IsEnded == true && this.showing == true)
	{
		scrollZone.EnableMoonBack (true);
	}
	return this.IsEnded;
};

SequenceMoon.prototype.Draw = function(ctx,drawOnFront) {
	if (this.DrawOnFront != drawOnFront) return;
	ctx.drawImage (this.moonMod.img,this.moonPosx,this.moonPosy);
}







function SequenceEagleWin () {
	Sequence.call (this);
	this.Audio = null;
	this.AudioNode = null;
	this.SpenTime = 0;
}

SequenceEagleWin.prototype = Object.create(Sequence.prototype);
SequenceEagleWin.prototype.constructor = SequenceEagleWin;

SequenceEagleWin.prototype.Start = function() {
	this.SpenTime = 0;
	loader.StopCurrentAudio ();
	this.Audio = loader.GetSoundByName ('ActarusOnAGagne');
	this.waitTime = this.Audio.duration;
	this.AudioNode = loader.PlaySoundAudio (this.Audio,1);
};

SequenceEagleWin.prototype.Animate = function(deltaTime) {
	this.SpenTime += deltaTime;
}

SequenceEagleWin.prototype.IsFinished = function() {
	
	return (this.SpenTime > this.waitTime);
};

SequenceEagleWin.prototype.Draw = function(ctx,drawOnFront) {

	
	var modPerso = loader.GetModel ('PersoAlcor');
	var partSize = AppViewModel.canvasize.width / 4;
	var posx = partSize / 2 - modPerso.img.width / 2;
	
	
	ctx.drawImage (modPerso.img,posx,100);
	
	if (this.SpenTime > 1.6)
	{
		modPerso = loader.GetModel ('PersoVenusia');
		posx += partSize;
		ctx.drawImage (modPerso.img,posx,100);
	}
	
	if (this.SpenTime > 3.3)
	{
		modPerso = loader.GetModel ('PersoPhenicia');
		posx += partSize;
		ctx.drawImage (modPerso.img,posx,100);
	}

	if (this.SpenTime > 8.8)
	{
		modPerso = loader.GetModel ('PersoActarus');
		posx += partSize;
		ctx.drawImage (modPerso.img,posx,100);
	}
}

SequenceEagleWin.prototype.Abort = function() {
	this.waitTime = 0;
	if (this.AudioNode != null)
	{
		this.AudioNode.stop ();
		this.AudioNode = null;
	}
};





function SequenceEnd () {
	Sequence.call (this);
	this.Audio = null;
	this.AudioNode = null;
	this.SpenTime = 0;
}

SequenceEnd.prototype = Object.create(Sequence.prototype);
SequenceEnd.prototype.constructor = SequenceEnd;

SequenceEnd.prototype.Start = function() {
	if (this.CanPlay () == false) 
	{
		this.ended = true;
		return;
	}

	this.SpenTime = 0;
	loader.StopCurrentAudio ();
	this.Audio = loader.GetSoundByName ('MusiqueFin');
	this.waitTime = this.Audio.duration;
	this.AudioNode = loader.PlaySoundAudio (this.Audio,1);
	scrollZone.Sun.dx = 0;
	scrollZone.Sun.dy = -1;
	scrollZone.Sun.speed = 40;
	scrollZone.Sun.posx = AppViewModel.canvasize.width/2 - scrollZone.Sun.model.img.width / 2;
	scrollZone.Sun.posy = AppViewModel.canvasize.height - scrollZone.Sun.model.img.height / 2;
	scrollZone.Sun.globalAlpha = 0;
	this.ActaMod = loader.GetModel ('ActarusFin');
	this.GoldoMod = loader.GetModel ('GoldoFin');
	this.LogoMod = loader.GetModel ('GoldoLogo');
	this.TrioMod = loader.GetModel ('AigleTrio');
	
	

	this.phase = 1;
	this.ended = false;
	this.sceneAlpha = 0;
	
};

SequenceEnd.prototype.Animate = function(deltaTime) {
	if (this.CanPlay () == false) return;
	
	this.SpenTime += deltaTime;
	
	switch (this.phase)
	{
		case 1:
		scrollZone.Sun.globalAlpha += 1.5*deltaTime;
		if (scrollZone.Sun.globalAlpha >= 1)
		{
			scrollZone.Sun.globalAlpha = 1;
			this.phase ++;
		}
		break;
		case 2: 
		this.sceneAlpha += 0.15*deltaTime;
		if (this.sceneAlpha >= 1)
		{
			this.sceneAlpha = 1;
		}
		if (this.SpenTime > this.waitTime)
		{
			this.phase ++;
		}
		break;
		case 3: 
		scrollZone.Sun.globalAlpha -= 1.5*deltaTime;
		this.sceneAlpha -= 1.5*deltaTime;
		if (this.sceneAlpha <= 0) this.sceneAlpha = 0;
		if (scrollZone.Sun.globalAlpha <= 0)
		{
			scrollZone.Sun.globalAlpha = 0;
			scrollZone.Sun.dx = 0;
			scrollZone.Sun.dy = 0;

			this.ended = true;
		}
		
		break;
	}
	
	
	scrollZone.Sun.Animate (deltaTime);
}

SequenceEnd.prototype.IsFinished = function() {
	
	return (this.ended == true);
	
};

SequenceEnd.prototype.Draw = function(ctx,drawOnFront) {
	// scrollZone.Sun.Draw (ctx);
	if (this.CanPlay () == false) return;
	
	
	var globalAlphaMem = ctx.globalAlpha;	
	ctx.globalAlpha = this.sceneAlpha;

	var posx = this.ActaMod.img.width / 2;
	var posy = AppViewModel.canvasize.height/2 - this.ActaMod.img.height/2;
	ctx.drawImage(this.ActaMod.img, posx,posy);

	posx = AppViewModel.canvasize.width - this.GoldoMod.img.width; // - this.ActaMod.img.width / 2;
	posy = AppViewModel.canvasize.height/2 - this.GoldoMod.img.height/2;
	ctx.drawImage(this.GoldoMod.img, posx,posy);
	
	
	posx = AppViewModel.canvasize.width/2 - this.TrioMod.img.width/2;
	posy = AppViewModel.canvasize.height/2 - this.TrioMod.img.height/2;
	ctx.drawImage(this.TrioMod.img, posx,posy);

	posx = AppViewModel.canvasize.width/2 - this.LogoMod.img.width/2;
	posy = AppViewModel.canvasize.height - this.LogoMod.img.height*1.8;
	ctx.drawImage(this.LogoMod.img, posx,posy);

	ctx.globalAlpha = globalAlphaMem;	
}

SequenceEnd.prototype.CanPlay = function() {
	return (this.nbPlayed == 0) ? true : false;
}

SequenceEnd.prototype.Abort = function() {
	this.ended = true;
	if (this.AudioNode != null)
	{
		this.AudioNode.stop ();
		this.AudioNode = null;
	}
};





function SequenceStart () {
	Sequence.call (this);
}

SequenceStart.prototype = Object.create(Sequence.prototype);
SequenceStart.prototype.constructor = SequenceStart;

SequenceStart.prototype.Start = function() {
	if (this.CanPlay ()) loader.PlayAutoAudioList ();
	
	// Passer au tour suivant au départ initialisé à zero
	AppViewModel.nbtour ++;
};

SequenceStart.prototype.IsFinished = function() {
	
	return true;
};

SequenceStart.prototype.CanPlay = function() {
	return (loader.currentAudio == null) ? true : false;
}





ToDayEnum = {
	SpeedPercentFast : 150,
	SpeedPercentSlow : 5,
	SizePercentInit : 10,
};

function AnimatedImage (mod,ang,sizePercent,speedPercent,speedRotate,globalAlpha,globalAlphaInc) {
	this.mod = mod;
	this.ang = ang;
	this.sizePercent = sizePercent;
	this.speedPercent = speedPercent;
	this.speedRotate = speedRotate;
	this.globalAlpha = globalAlpha ;
	this.globalAlphaInc = globalAlphaInc;
	
	this.DrawCenter = function (ctx)
	{
		var posx = AppViewModel.canvasize.width/2;
		var posy = AppViewModel.canvasize.height/2;
		this.Draw (ctx,posx,posy);
	
	}

	this.Draw = function (ctx,posx,posy)
	{
		var cx = this.mod.img.width * this.sizePercent / 100;
		var cy = this.mod.img.height * this.sizePercent / 100;

		ctx.globalAlpha = this.globalAlpha;
		ctx.save();
		ctx.translate(posx,posy);
		ctx.rotate(this.ang * Math.PI/180);
		ctx.drawImage(mod.img, -cx/2,-cy/2,cx,cy);
		ctx.restore();		
		ctx.globalAlpha = 1;
	}
	
	this.Animate = function(deltaTime) {
	
		if (this.globalAlphaInc != 0)
		{
			this.globalAlpha += this.globalAlphaInc * deltaTime;
			if (this.globalAlpha < 0) this.globalAlpha = 0;
			else if (this.globalAlpha > 1) this.globalAlpha = 1;
		}
		
		if (this.speedPercent != 0)
		{
			this.sizePercent += this.speedPercent * deltaTime;
		}
		
		if (this.speedRotate != 0)
		{
			this.ang += this.speedRotate * deltaTime;
		}
	
	}
}


function SequenceToDay () {
	Sequence.call (this);
	this.AujMod = loader.GetModel ('Aujourdhui');
	this.VicMod = loader.GetModel ('AdVictoriam');
	this.BackMod = loader.GetModel ('TitleBack');
	this.SignMod = loader.GetModel ('TitleSign');

	this.AujAnim = null;
	this.VicAnim = null;
	this.BackAnim = null;
	this.SignAnim = null;

	this.phase = 1;
	this.SpenTime = 0;
	this.Audio = loader.GetSoundByName ('ToDay');
	this.waitTime = this.Audio.duration;
	this.sizePercent = ToDayEnum.SizePercentInit;
	this.speedPercent = ToDayEnum.SpeedPercentFast;
	this.ang = 0;
	this.generic = null;

}

SequenceToDay.prototype = Object.create(Sequence.prototype);
SequenceToDay.prototype.constructor = SequenceToDay;

SequenceToDay.prototype.Start = function() {
	if (this.CanPlay () == false) return;
	loader.StopCurrentAudio ();
	// AppViewModel.drawGoldo = false;
	// $('#Canvas').css('cursor','default');
	DrawGoldo (false);
	
	this.SpenTime = 0;
	this.phase = 1;
	this.generic = loader.PlaySoundAudio (this.Audio,1);
	
	// AnimatedImage (mod,ang,sizePercent,speedPercent,speedRotate,globalAlpha,globalAlphaInc) {
	this.BackAnim = new AnimatedImage (this.BackMod,0, 100, 2, 0, 0, 0.2);
	this.SignAnim = new AnimatedImage (this.SignMod,0, 70, 2, -1, 0, 0.2);
	this.AujAnim = new AnimatedImage  (this.AujMod, 0, 10, 120, -1.5, 0, 1);
	this.VicAnim = new AnimatedImage  (this.VicMod, 0, 10, 170, -1.5, 0, 1);

};

SequenceToDay.prototype.Animate = function(deltaTime) {
	if (this.CanPlay () == false) return;
	
	this.SpenTime += deltaTime;

	switch (this.phase)
	{
		case 1:
		this.BackAnim.Animate (deltaTime);
		this.SignAnim.Animate (deltaTime);
		if (this.SpenTime > 0.2) this.phase ++
		break;

		case 2:
		this.BackAnim.Animate (deltaTime);
		this.SignAnim.Animate (deltaTime);
		this.AujAnim.Animate (deltaTime);
		if (this.AujAnim.sizePercent >= 100) this.AujAnim.speedPercent = 5;
		if (this.SpenTime >= 6) this.phase ++;
		break;

		case 3:
		this.BackAnim.Animate (deltaTime);
		this.SignAnim.Animate (deltaTime);
		this.VicAnim.Animate (deltaTime);
		if (this.VicAnim.sizePercent >= 100) this.VicAnim.speedPercent = 5;
		break;

		default:
		break;
	}
}

SequenceToDay.prototype.Draw = function(ctx,drawOnFront) {
	if (this.CanPlay () == false) return;
	

	this.BackAnim.DrawCenter (ctx);
	this.SignAnim.Draw (ctx
			,AppViewModel.canvasize.width/2+this.SignMod.img.width/2
			,AppViewModel.canvasize.height - 1.5*this.SignMod.img.height);
	
	
	switch (this.phase)
	{
		case 2:this.AujAnim.DrawCenter (ctx);break;
		case 3:this.VicAnim.DrawCenter (ctx);break;
	}
	
}


SequenceToDay.prototype.IsFinished = function() {
	if (this.CanPlay () == false) return true;
	
	return (this.SpenTime > this.waitTime);
};

SequenceToDay.prototype.CanPlay = function() {
	return (this.nbPlayed == 0) ? true : false;
}

SequenceToDay.prototype.Finish = function() {
	if (this.CanPlay ())
	{
		// AppViewModel.drawGoldo = true;
		// $('#Canvas').css('cursor','none');
		DrawGoldo (true);
		
		loader.PlaySound ('GoldorakGo',1);
	}
	Sequence.prototype.Finish.call(this);
}

SequenceToDay.prototype.Abort = function() {
	if (this.generic != null)
	{
		this.generic.stop ();
		this.generic = null;
	}
};





function ScrollBackImage (srcImg,zoneWidth,zoneHeight,isTerrestre,shadowEnable)
{
	this.img = srcImg;
	this.nbHorzDraw = Math.ceil (zoneWidth / srcImg.width);
	this.nbVertDraw = Math.ceil (zoneHeight / srcImg.height);
	this.globalAlpha = 1;
	this.scroll = 0;
	this.shadowEnable = shadowEnable;
	this.isTerrestre = isTerrestre;
	
	this.Scroll = function(speed,deltaTime){
		this.scroll += speed * deltaTime;
		if (this.scroll >= this.img.height)
		{
			this.scroll = this.scroll - this.img.height;
		}
	}	
}

function ScrollZone (zoneWidth,zoneHeight)
{
	this.MainImg = null;
	this.FadeImg = null;
	this.CloudImg = null;

	this.enable = true;

	this.Speed = 0;
	this.SpeedTarget = 0;
	this.Accel = 0;
	this.SpeedMax = 2000;	
	this.StaticMode = false;

	this.zoneWidth = zoneWidth;
	this.zoneHeight = zoneHeight;
	
	this.InBackFading = false;
	this.InCloudFading = false;

	this.BackFadingTimeLen = 2;
	this.CloudOpacity = 0;
	this.CloudOpacityInc = 1;
	this.CloudOpacityInc = 1;
	
	this.enableEarthBack = false;
	this.enableMoonBack = false;
	this.earthMod = loader.GetModel ('Earth');
	this.moonMod = loader.GetModel ('Moon');
	this.Sun = new Sun ();
	


	this.Init = function(Speed,MainImg,FadeImg,CloudImg){
		
		this.Speed = Speed;
		this.SpeedTarget = Speed;
		
		this.MainImg = MainImg;
		this.FadeImg = FadeImg;
		this.CloudImg = CloudImg;

		this.InBackFading = false;
		this.InCloudFading = false;

		this.CloudOpacity = 0;
		this.CloudOpacityInc = 1;

		this.StaticMode = false;
		
		decorManager.Reset ();
		this.EnableEarthBack (false);
		this.EnableMoonBack (false);
	}

	this.IsTerrestre = function(){
		return this.MainImg.isTerrestre;
	}

	this.StartFading = function(fadTimeLen){
		this.BackFadingTimeLen = fadTimeLen;
		if (this.BackFadingTimeLen <= 1) this.BackFadingTimeLen = 1;
		this.FadeImg.globalAlpha = 0;
		this.InBackFading = true;
	}	

	this.IsInFading = function(){
		return (this.InBackFading == true || this.InCloudFading == true);
	}

	this.SetSpeedTarget = function(target,accel){
		if (this.StaticMode == false)
		{
			this.SpeedTarget = target;
			this.Accel = accel;
		}
	}	

	this.ForceSpeedTarget = function(target,accel){
		this.SpeedTarget = target;
		this.Accel = accel;
	}	

	this.SetSpeed = function(speed){
		
		this.Speed = speed;
		this.SpeedTarget = speed;
		if (speed == 0) this.StaticMode = true;
	}	
	

	this.EnableStaticMode = function(){
		this.StaticMode = true;
	}	

	this.DisableStaticMode = function(){
		this.StaticMode = false;
	}	

	this.EnableCloud = function(enable)
	{
		if (enable == true)
		{
			if (this.CloudOpacity == 0)
			{
				this.CloudChange ();
			}
		}
		else
		{
			if (this.CloudOpacity == 1)
			{
				this.CloudChange ();
			}
		}
	}

	this.CloudChange = function()
	{
		if (this.InCloudFading == false)
		{
			this.InCloudFading = true;
			this.CloudOpacityInc = (this.CloudOpacity == 0) ? 1 : -1;
		}
	}

	this.Animate = function(deltaTime){
		
		this.MainImg.Scroll (this.Speed,deltaTime);
		if(this.InBackFading) this.FadeImg.Scroll (this.Speed,deltaTime);

		if (this.CloudOpacity > 0) this.CloudImg.Scroll (this.Speed + 50,deltaTime);
		if (this.InCloudFading == true)
		{
			this.CloudOpacity += this.CloudOpacityInc * deltaTime;
			if (this.CloudOpacity < 0)
			{
				this.CloudOpacity = 0;
				this.InCloudFading = false;
			}
			else	if (this.CloudOpacity > 2)
			{
				this.CloudOpacity = 1;
				this.InCloudFading = false;
			}
		}
		
		if (this.InBackFading == true)
		{
			this.FadeImg.globalAlpha += deltaTime / this.BackFadingTimeLen;
			if (this.FadeImg.globalAlpha >= 1)
			{
				this.InBackFading = false;
				
				var membackimg = this.MainImg;
				this.MainImg = this.FadeImg;
				this.FadeImg = membackimg;

				this.MainImg.globalAlpha = 1;
				this.FadeImg.globalAlpha = 0;
			}
		}
		
		if (this.Speed != this.SpeedTarget)
		{
			if (this.Speed < this.SpeedTarget)
			{
				this.Speed += this.Accel * deltaTime;
				if (this.Speed > this.SpeedTarget) this.Speed = this.SpeedTarget;
			}
			else
			{
				this.Speed -= this.Accel * deltaTime;
				if (this.Speed < this.SpeedTarget) this.Speed = this.SpeedTarget;
			}
		}
		
		decorManager.Animate (deltaTime);
	};	

	this.Draw = function(ctx){

		this.DrawBackImage (this.MainImg,ctx);
		
		if (this.InBackFading == true)
		{
			ctx.globalAlpha = this.FadeImg.globalAlpha;
			this.DrawBackImage (this.FadeImg,ctx);
			ctx.globalAlpha = 1;
		}
		
		if (this.enableEarthBack == true)
		{
			this.Sun.Draw (ctx);

			var earthPosy = AppViewModel.canvasize.height - this.earthMod.img.height;
			ctx.drawImage (this.earthMod.img,0,0,this.earthMod.img.width,this.earthMod.img.height,
			0,earthPosy,AppViewModel.canvasize.width,this.earthMod.img.height);
		}
		
		if (this.enableMoonBack == true)
		{
			ctx.drawImage (this.moonMod.img,AppViewModel.canvasize.width / 2 - this.moonMod.img.width / 2,0);
		}
	};

	this.DrawCloud = function(ctx){

		if (this.CloudOpacity > 0) 
		{
			var globalAlphaMem = ctx.globalAlpha;	
			ctx.globalAlpha = this.CloudOpacity;
			this.DrawBackImage (this.CloudImg,ctx);
			ctx.globalAlpha = globalAlphaMem;	
		}
	};

	this.DrawBackImage = function(backImg,ctx){
		
		var imx = 0;
		var imy = 0;

		for(var j = 0; j < backImg.nbVertDraw; j++)
		{
			for(var i = 0; i < backImg.nbHorzDraw; i++)
			{
				var width = backImg.img.width;
				var height = backImg.img.height;
				var totalwidth = (i + 1) * backImg.img.width;
				var totalheight = (j + 1) * backImg.img.height;
				if (totalwidth >= this.zoneWidth)
				{
					width = backImg.img.width - (totalwidth - this.zoneWidth);
				}
				if (totalheight >= this.zoneHeight)
				{
					height = backImg.img.height - (totalheight - this.zoneHeight);
				}

				imx = i * backImg.img.width;
				imy = j * backImg.img.height;

				if (j == 0)
				{
					
					ctx.drawImage(backImg.img, 
						0, backImg.img.height - backImg.scroll,
						width, backImg.scroll,
						imx, imy, width, backImg.scroll);

				}
				
				if (j >= 0)
				{
					ctx.drawImage(backImg.img, 
						0, 0,width, height,
						imx, imy + backImg.scroll, width, height);
				}
			}
		}
	};	

	this.DrawShadowEntity = function(ctx,entity){
		if (this.MainImg.shadowEnable == true && entity.model.imgShadow != null)
		{
			entity.DrawShadow (ctx);
		}
	}
	
	this.EnableEarthBack = function(enable){
		this.enableEarthBack = enable;
		if (this.enableEarthBack == true) this.EnableStaticMode ();
		else this.DisableStaticMode ();
		
	}
	
	this.EnableMoonBack = function(enable){
		this.enableMoonBack = enable;
		if (this.enableMoonBack == true) this.EnableStaticMode ();
		else this.DisableStaticMode ();
	}
}





DecorEnum = {
	forest : 1,
	rock : 2,
	town : 3,
	field: 4,
	other: 5
}

function DecorType (type,modelName,ang)
{
	this.type = type;
	this.ang = ang;
	this.model = loader.GetModel (modelName);
	this.posx = 0;
	this.posxy = 0;
}

function DecorManager () {

	this.enableDecor = false;
	this.spentTime = 0;

	this.Animate = function(deltaTime){
		
		if (this.enableDecor == false) return;

		if (scrollZone.IsTerrestre () == true) this.AddRandomGroundDecor (deltaTime);
	};

	this.AddRandomGroundDecor = function(deltaTime){
	
		this.spentTime += deltaTime;
		var nextDecorTime = (scrollZone.speed < 200) ? 3 : 1.5;
		if (this.spentTime > nextDecorTime)
		{
			this.spentTime = 0;
			this.NewRandomDecorPass ();
		}
	}
	
	this.NewRandomNatureDecor = function()
	{
		var decorType;
		if (randomUniform (1,11) < 6)	decorType = this.NewRandomForestDecor ();
		else							decorType = this.NewRandomRockDecor ();

		decorType.posx = randomUniform (
			-decorType.model.img.width/3,
			AppViewModel.canvasize.width - decorType.model.img.width/2);
		
		decorType.posy = -decorType.model.img.height;
		// decorType.posy -= randomUniform (1,decorType.model.img.height*1.5);
		decorType.posy -= randomUniform (1,decorType.model.img.height*2);



		return decorType;
	}

	this.NewRandomForestDecor = function()
	{
		var modelName;
		switch(randomUniform (1,4))
		{
			case 1:modelName = 'Foret01';break;
			case 2:modelName = 'Foret02';break;
			case 3:modelName = 'Foret03';break;
		}
		return new DecorType (DecorEnum.forest,modelName,0);
	}

	this.NewRandomRockDecor = function()
	{
		var modelName;
		switch(randomUniform (1,5))
		{
			case 1:modelName = 'Rock01';break;
			case 2:modelName = 'Rock02';break;
			case 3:modelName = 'Rock03';break;
			default:modelName = 'Rock04';break;
		}
		return new DecorType (DecorEnum.rock,modelName,randomUniform (0,360));
	}
	
	this.NewRandomTownDecor = function()
	{
		var decorType = new DecorType (DecorEnum.town,'Town01',0);
		decorType.posx = randomUniform (0,AppViewModel.canvasize.width - decorType.model.img.width);
		decorType.posy = - decorType.model.img.height;
		return decorType;
	}

	this.NewRandomDecorPass = function(){
	
		var posxStart = -randomUniform (0,100);
		var decorType;
		var town = false;
		while (posxStart < AppViewModel.canvasize.width)
		{
			if (town == false && randomUniform (1,31) <= 2 )	decorType = this.NewRandomTownDecor ();
			else							decorType = this.NewRandomNatureDecor ();			
			
			var model = decorType.model;
			
			decorType.posx = posxStart;
			posxStart += model.img.width + randomUniform (0,model.img.width/2);
			
			// Checker si on peu le placer à cet endroit
			if (this.CheckGroundPlacement (decorType.posx,decorType.posy,
				model.img.width,model.img.height) == false) continue;

			if (decorType == DecorEnum.town) town = true;

			var decor = new GroundDecor (DecorType.type);
			decor.SetModel (model);
			decor.posx = decorType.posx;
			decor.posy = decorType.posy;
			decor.valid = true;
			decor.ang = decorType.ang;
			groundDecorsList.AddObject (decor);
		}
	}	

	// Checker si on peut le placer à cet endroit
	this.CheckGroundPlacement = function(posx,posy,width,height){
	
		// Y a t'il une entité terrestre animée à cet emplacement
		var interset01 = this.IsIntersectEnityList(entityTerList,
			posx,posy,width,height);
			
		var interset02 = this.IsIntersectEnityList(groundDecorsList,
			posx,posy,width,height);
		
		return (interset01 == false && interset02 == false);
	}		

	this.Reset = function(){
		this.enableDecor = false;
		this.spentTime = 0;
	}

	this.EnableDecor = function(enable){
		this.enableDecor = enable;
	}

	this.IsDecorEnabled = function(){
		return this.enableDecor;
	}

	this.IsIntersectEnityList = function(entityList,posx,posy,width,height){
		var node = entityList.firstnode;
		while (node != null)
		{
			var decor = node.obj;
			if (IntersectRect (posx,posy,width,height,
			decor.posx,decor.posy,decor.model.img.width,decor.model.img.height)) return true;
			node = node.next;
		}
		return false;
	}
	
	this.NewGroundDecor = function(decorType,posx,posy,modelName,ang){
		
		if (scrollZone.IsTerrestre () == false) return;
		var model = loader.GetModel (modelName);

		var posy = posy-model.img.height/2; 
		if (posy > AppViewModel.canvasize.height) return;

		var posx = posx-model.img.width/2;
		if (posx + model.img.width < 0 || posx > AppViewModel.canvasize.width) return;

		var decor = new GroundDecor (decorType);
		decor.SetModel (model);
		decor.posx = posx;
		decor.posy = posy;
		decor.valid = true;
		if (ang != undefined) decor.ang = ang;

		groundDecorsList.AddObject (decor);
	}
}






























function SequenceNavetteMissilEx (nbnav,mvtype,navetteType,lazerType,missilType) {
	SequenceNavetteMissil.call (this,nbnav,mvtype,navetteType,lazerType,missilType);
}

SequenceNavetteMissilEx.prototype = Object.create(SequenceNavetteMissil.prototype);
SequenceNavetteMissilEx.prototype.constructor = SequenceNavetteMissilEx;

SequenceNavetteMissilEx.prototype.Start = function() {

	SequenceNavetteMissil.prototype.Start.call(this);

	Sequencer.ManageSoucoupeAmiralePassage ();

};


SequenceNavetteMissilEx.prototype.Animate = function(deltaTime) {
	SequenceNavetteMissil.prototype.Animate.call(this,deltaTime);
	
	Sequencer.ManageSoucoupeAmiralePassage ();
}

SequenceNavetteMissilEx.prototype.IsFinished = function() {
	return (entityList.count == 0 && entityTerList.count == 0);
};










