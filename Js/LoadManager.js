function LoadManager () {
	this.imageMap = {
		
      'BackSpace01': './Images/BackSpace01.jpg',
      'BackSpace02': './Images/BackSpace02.jpg',
	  'BackMoon01': './Images/BackMoon01.jpg',
      'BackMoon02': './Images/BackMoon02.jpg',
      'OverlayCloud01': './Images/Cloud.png',
      'BackCloud01': './Images/BackCloud01.jpg',
      'BackCloud02': './Images/BackCloud02.jpg',
      'BackTerre01': './Images/BackTerre01.jpg',
	  
      'SoucoupeImperialeMap': './Images/SoucoupeImperialeMap.png',
      'ImperialShieldMap': './Images/ImperialShieldMap.png',
	  
      'SoucoupeMinos': './Images/SoucoupeMinos.png',
      'TentaculesMap': './Images/TentaculesMap.png',
      'MinosFireHeaderMap': './Images/MinosFireHeaderMap.png',
      'MinosFireBodyMap': './Images/MinosFireBodyMap.png',

      'GinGinUfoMap': './Images/GinGinUfoMap.png',
      'GinGinAnterakMap': './Images/GinGinAnterakMap.png',
      'GinGinSawMap': './Images/GinGinSawMap.png',
      'GinGinLazernium': './Images/GinGinLazernium.png',
	  
      'ErgastulMap': './Images/ErgastulMap.png',
      'ErgastulLazernium': './Images/ErgastulLazernium.png',
      'ErgastulTorseFire': './Images/ErgastulTorseFire.png',
      'ErgastuLame': './Images/ErgastuleLame.png',
	  
      'Golgoth27Map':'./Images/Golgoth27Map.png',
      'Golgoth27Tentacule':'./Images/Golgoth27Tentacule.png',
      'Golgoth27Lame':'./Images/Golgoth27Lame.png',

      'Bonus': './Images/Bonus.png',
      'BonusMegavolt': './Images/BonusMegavolt.png',
      'BonusAlcorak': './Images/BonusAlcorak.png',
      'BonusFossoirak': './Images/BonusFossoirak.png',
      'BonusVenusiak': './Images/BonusVenusiak.png',
      'BonusCorneAuFulgure': './Images/BonusCorneAuFulgure.png',
      'PlanitronBonus': './Images/PlanitronBonus.png',
      'BonusGlKgo': './Images/BonusGlKgo.png',
      'BonusPlanitronExt': './Images/BonusPlanitronExt.png',
      'BonusMegaMach': './Images/BonusMegaMach.png',
      'BonusFulguroPoing': './Images/BonusFulguroPoing.png',
      'BonusOVTerre': './Images/BonusOVTerre.png',

      'goldorak':'./Images/Goldo.png',
      'GoldoPoing':'./Images/GoldoPoing.png',
      'GoldoBrasGauche':'./Images/GoldoBrasGauche.png',
      'GoldoPoingFeuGauche':'./Images/GoldoPoingFeuGauche.png',
      'GoldoBrasDroite':'./Images/GoldoBrasDroite.png',
      'GoldoPoingFeuDroite':'./Images/GoldoPoingFeuDroite.png',

      'Alcorak': './Images/Alcorak.png',
      'Fossoirak': './Images/Fossoirak.png',
      'Venusiak': './Images/Venusiak.png',
      'OVTerre': './Images/OVTerre.png',

      'missilgamma': './Images/MissilGamma.png',
      'Planitron': './Images/Planitron02.png',
      'Megavolt': './Images/Megavolt.png',
      'MissilSigma': './Images/MissilSigma.png',
      'PyroBombe': './Images/PyroBombe.png',
      'Victorang': './Images/Victorang.png',
      'DeltaLame': './Images/DeltaLame.png',
      'GoldoMegaMach': './Images/GoldoMegaMach.png',
      'CorneAuFulgure': './Images/CorneAuFulgure.png',
      'NbCorneAuFulgure': './Images/NbCorneAuFulgure.png',
      'NbFulguroPoing': './Images/NbFulguroPoing.png',
	  
      'explosion01': './Images/Explosion.png',
      'explosion02': './Images/Explosion02.png',
      'explosion03': './Images/Explosion03.png',
      'GrosseExplosion': './Images/GrosseExplosion.png',
      'SparkBlue': './Images/SparkBlue.png',

      'navette01':'./Images/Navette01.png',
      'navette02':'./Images/Navette02.png',
      'navette03':'./Images/Navette03.png',
      'SoucoupeAmirale': './Images/SoucoupeAmirale.png',
      'Missil05': './Images/Missil05.png',

      'LazerNavette': './Images/LazerNavette.png',
      'LazerNavette02': './Images/LazerNavette02.png',

      'GoruGoru01': './Images/GoruGoru01.png',
      'GoruGoru02': './Images/GoruGoru02.png',
      'GoruGoru03': './Images/GoruGoru03.png',
      'GoruGoru04': './Images/GoruGoru04.png',
      'GoruFire01': './Images/GoruFire01.png',
      'GoruFire02': './Images/GoruFire02.png',
      'GoruHeadLeft': './Images/GoruHeadLeft.png',
      'GoruHeadRight': './Images/GoruHeadRight.png',
      'CourteFlamme': './Images/CourteFlamme.png',
      'LongueFlamme': './Images/LongueFlamme.png',

      'GrandeNavette': './Images/GrandeNavette.png',
      'NavetteShield': './Images/NavetteShield.png',
      'GrandeNavetteLazer': './Images/GrandeNavetteLazer.png',

      'Golgoth40': './Images/Golgoth40.png',
      'Golgoth40Tir01Bleu': './Images/Golgoth40Tir01Bleu.png',
      'Lazernium40': './Images/Lazernium40.png',

      'Golgoth28': './Images/Golgoth28.png',
      'RayonTracteur': './Images/RayonTracteur.png',
      'RayonTracteurMask': './Images/RayonTracteurMask.png',
      'FireBall03': './Images/FireBall03.png',
      'FireBall04': './Images/FireBall04.png',
      'Flamme03': './Images/Flamme03.png',
      'Golgoth28Head': './Images/Golgoth28Head.png',

      'Tourelle01': './Images/Tourelle01.png',
      'Tourelle02': './Images/Tourelle02.png',
      'Tourelle03': './Images/Tourelle03.png',
      'TourelleSupport': './Images/TourelleSupport.png',
      'TourelleFire01': './Images/TourelleFire01.png',
      'TourelleFire02': './Images/TourelleFire02.png',
      'TourelleLazer': './Images/TourelleLazer.png',
      'TourelleDebris': './Images/TourelleDebris.png',

      'NavetteCorpPique': './Images/NavetteCorpPique.png',
      'NavettePique': './Images/NavettePique.png',
      'LazerPique': './Images/LazerPique.png',
      'Pique': './Images/Pique.png',

      'TourelleMissil': './Images/TourelleMissil.png',
      'TourelleMissilSupport': './Images/TourelleMissilSupport.png',
      'TourelleMissilDebris': './Images/TourelleMissilDebris.png',
      'Missil01': './Images/Missil01.png',
      'Missil02': './Images/Missil02.png',

      'BaseVega': './Images/BaseVega.png',
      'BaseVegaBigShield': './Images/BaseVegaBigShield.png',
      'BaseVegaSmallShield': './Images/BaseVegaSmallShield.png',
      'BaseVegaQG': './Images/BaseVegaQG.png',
      'BaseVegaCelluleBottomLeft': './Images/BaseVegaCelluleBottomLeft.png',
      'BaseVegaCelluleBottomRight': './Images/BaseVegaCelluleBottomRight.png',
      'BaseVegaCelluleLeft': './Images/BaseVegaCelluleLeft.png',
      'BaseVegaCelluleRight': './Images/BaseVegaCelluleRight.png',
      'BaseVegaCelluleTopLeft': './Images/BaseVegaCelluleTopLeft.png',
      'BaseVegaCelluleTopRight': './Images/BaseVegaCelluleTopRight.png',

      'SmallAsteroidMap': './Images/SmallAsteroidMap.png',   // 195 * 177 ---> 65 * 59
      'MediumAsteroidMap': './Images/MediumAsteroidMap.png', // 450 * 474 ---> 150 * 158
      'GrosAsteroid01': './Images/GrosAsteroid01.png',
      'GrosAsteroid02': './Images/GrosAsteroid02.png',
      'GrosAsteroid03': './Images/GrosAsteroid03.png',
      'GrosAsteroid04': './Images/GrosAsteroid04.png',
      'GrosAsteroid05': './Images/GrosAsteroid05.png',
	  
      'LazerImperialMap': './Images/LazerImperialMap.png',
      'SoucoupeAmiraleRayon': './Images/SoucoupeAmiraleRayon.png',
      'NavetteMissil': './Images/NavetteMissil.png',
      'NavetteMissilRouge': './Images/NavetteMissilRouge.png',
      'NavetteMissilNoire': './Images/NavetteMissilNoire.png',
      'LazerNavetteMissil': './Images/LazerNavetteMissil.png',
	  
      'Foret01': './Images/Foret01.png',
      'Foret02': './Images/Foret02.png',
      'Foret03': './Images/Foret03.png',

      'Rock01': './Images/Rock01.png',
      'Rock02': './Images/Rock02.png',
      'Rock03': './Images/Rock03.png',
      'Rock04': './Images/Rock04.png',
	  
      'Town01': './Images/Town01.png',
      'Impact': './Images/Impact.png',
	  
      'PersoActarus': './Images/PersoActarus.png',
      'PersoErgastule': './Images/PersoErgastule.png',
      'PersoHydargos': './Images/PersoHydargos.png',
      'PersoJanus': './Images/PersoJanus.png',
      'PersoMinos': './Images/PersoMinos.png',
      'PersoVega01': './Images/PersoVega01.png',
      'PersoVega02': './Images/PersoVega02.png',
      'PersoRiggel': './Images/PersoRiggel.png',

      'PersoPhenicia': './Images/PersoPhenicia.png',
      'PersoVenusia': './Images/PersoVenusia.png',
      'PersoAlcor': './Images/PersoAlcor.png',
	  
      'MagnetGolgoth27': './Images/MagnetGolgoth27.png',
      'MagnetGolgoth28': './Images/MagnetGolgoth28.png',
      'MagnetGolgoth40': './Images/MagnetGolgoth40.png',
      'MagnetGoruGoru': './Images/MagnetGoruGoru.png',
      'MagnetBaseVega': './Images/MagnetBaseVega.png',
	  
      'Baricade': './Images/Baricade.png',
      'CyberMine': './Images/CyberMine.png',
	  
      'Earth': './Images/Earth.png',
      'Moon': './Images/Moon.png',
      'Sun': './Images/Sun.png',
	  
      'ActarusFin': './Images/ActarusFin.png',
      'GoldoFin': './Images/GoldoFin.png',
      'GoldoLogo': './Images/GoldoLogo.png',
      'AigleTrio': './Images/AigleTrio.png',
	  
      'Aujourdhui': './Images/title_Aujourdhui.png',
      'AdVictoriam': './Images/title_AdVictoriam.png',
      'TitleBack': './Images/title_back.png',
      'TitleSign': './Images/title_Signature.png',
	  
      'NavetteFoudreBody':'./Images/NavetteFoudreBody.png',
      'NavetteFoudreDisk':'./Images/NavetteFoudreDisk.png',
      'FoudreMap':'./Images/FoudreMap.png',
	  
      'Silo':'./Images/Silo.png',
      'SiloSocle':'./Images/SiloSocle.png',
      'SiloDetruit':'./Images/SiloDetruit.png',
      'SiloInside':'./Images/SiloInside.png',
      'SiloMissil':'./Images/SiloMissil.png',

    };

	this.audioMap = {
      'Victoire01':'./Music/Victoire01.mp3',
      'Combat01':'./Music/Combat01.mp3',
      'Combat02':'./Music/Combat02.mp3',
      'Combat03':'./Music/Combat03.mp3',
      'Combat04':'./Music/Combat04.mp3',
      'Combat05':'./Music/Combat05.mp3',
      'Combat06':'./Music/Combat06.mp3',
      'Combat07':'./Music/Combat07.mp3',
      'GoldorakFailed':'./Music/GoldorakFailed.mp3',
      'Intro':'./Music/Intro.mp3',
    };

	this.soundMap = {
      'MissilGamma':'./Sound/MissilGamma.mp3',
      'GoldorakGo':'./Sound/GoldorakGo.mp3',
      'Planitron':'./Sound/Planitron.mp3',
      'Bonus':'./Sound/Bonus.mp3',
	  'Explosion':'./Sound/Explosion.mp3',
	  'Lazernium':'./Sound/Lazernium.mp3',
	  'GoruFlamme':'./Sound/GoruFlamme.mp3',
	  'GrosseExplosion':'./Sound/GrosseExplosion.mp3',
	  'Megavolt':'./Sound/Megavolt.mp3',
	  'GoruFire':'./Sound/GoruFire.mp3',
	  'FireBall':'./Sound/FireBall.mp3',
	  'TourelleFire':'./Sound/TourelleFire.mp3',
	  'TourelleActive':'./Sound/TourelleActive.mp3',
	  'Ohlalalala':'./Sound/Ohlalalala.mp3',
	  'MegaMach':'./Sound/MegaMach.mp3',
	  'Missil':'./Sound/Missil.mp3',
	  'Pyrobombe':'./Sound/Pyrobombe.mp3',
	  'DeltaLame':'./Sound/DeltaLame.mp3',
	  'MegavoltBonus':'./Sound/MegavoltBonus.mp3',

	  'BonusCorneAuFulgure':'./Sound/BonusCorneAuFulgure.mp3',
	  'CorneAuFulgureFire':'./Sound/CorneAuFulgureFire.mp3',
	  
	  'JanusAmuse':'./Sound/JanusAmuse.mp3',
	  'JanusAnterak':'./Sound/JanusAnterak.mp3',
	  'JanusAttaqueGenerale':'./Sound/JanusAttaqueGenerale.mp3',
	  'JanusChemin':'./Sound/JanusChemin.mp3',
	  'JanusEnfer':'./Sound/JanusEnfer.mp3',
	  'JanusSaw':'./Sound/JanusSaw.mp3',
	  'ImperialLazernium':'./Sound/ImperialLazernium.mp3',
	  'HydargosPlusFort':'./Sound/HydargosPlusFort.mp3',
	  
	  'VegaMaitre01':'./Sound/VegaMaitre01.mp3',
	  'VegaMaitre02':'./Sound/VegaMaitre02.mp3',
	  'Minos':'./Sound/Minos.mp3',
	  
	  'Ergastule01':'./Sound/Ergastule01.mp3',
	  'Golgoth':'./Sound/Golgoth.mp3',
	  'Riggel':'./Sound/Riggel.mp3',
	  'CyberMine':'./Sound/CyberMine.mp3',
	  'DeuxiemePhase':'./Sound/DeuxiemePhase.mp3',
	  'FulguroPoing':'./Sound/FulguroPoing.mp3',
	  'ChampCyberMines':'./Sound/ChampCyberMines.mp3',
	  

	  'ActarusIlPleutLazernium':'./Sound/Fin_ActarusIlPleutLazernium.mp3',
	  'ActarusJamaisPlaneteBleu':'./Sound/Fin_ActarusJamaisPlaneteBleu.mp3',
	  'ActarusOnAGagne':'./Sound/Fin_ActarusOnAGagne.mp3',
      'MusiqueFin':'./Sound/MusiqueFin.mp3',
      'ToDay':'./Sound/ToDay.mp3',
	  
      'AUnContreDeux':'./Sound/AUnContreDeux.mp3',
      'LeCirqueVaCommencer':'./Sound/LeCirqueVaCommencer.mp3',
    };

	this.imageArray = new Array ();
	this.modelArray = new Array ();
	this.audioArray = new Array ();
	this.soundArray = new Array ();
	this.jsonModelArray = new Array ();
	
	this.NbLoadedAudio = 0;
	this.NbLoadedSound = 0;
	this.NbJsonModels = 0;
	this.MusicVolume = 0.15;
	this.GeneralVolume = 1;

	this.currentAudio = null;
	this.audioAutoList = new ChainedList ();
	this.currentAudioNode = null;

	this.InitLoader = function ()
	{
		this.currentAudioNode = this.audioAutoList.AddObject (this.GetAudioByName('Victoire01'));
		this.audioAutoList.AddObject (this.GetAudioByName('Combat06'));
		this.audioAutoList.AddObject (this.GetAudioByName('Combat04'));
		this.audioAutoList.AddObject (this.GetAudioByName('Combat03'));
		this.audioAutoList.AddObject (this.GetAudioByName('Combat05'));
		this.audioAutoList.AddObject (this.GetAudioByName('Combat02'));
		this.audioAutoList.AddObject (this.GetAudioByName('Combat01'));
		this.audioAutoList.AddObject (this.GetAudioByName('Combat07'));

		// Pour boucler
		this.audioAutoList.lastnode.next = this.audioAutoList.firstnode;
	}

	// PopulateJsonModels
	this.loadResource = function ()
	{
		this.LoadJsonModels ();
	}

	this.LoadImages = function ()
	{
		_this = this;
		for(var imagename in this.imageMap)
		{
			if(this.imageMap.hasOwnProperty(imagename))
			{
				var img = new Image ();
				img.imagename = imagename;
				img.addEventListener('load', function() {
					_this.LoadedImage (this.imagename,this);
					
				}, false);
				
				img.src = this.imageMap [imagename];
			}
		}
	};

	this.LoadAudio = function ()
	{
		_this = this;
		for(var audioname in this.audioMap)
		{
			if(this.audioMap.hasOwnProperty(audioname))
			{
				var audio = new Audio (this.audioMap [audioname]);
				this.audioArray[audioname] = audio;
				audio.addEventListener("canplaythrough", event => {
					_this.LoadedAudio ();
				});	
			}
		}
	};
	
	// WEBAUDIO17056: Invalid ArrayBuffer.
	// You must provide an ArrayBuffer that contains audio data to decode.
	// Pour le multi request j'ai trouvé ca
	// https://stackoverflow.com/questions/46503558/how-to-use-multiple-xmlhttprequest/46503763
	this.LoadSound = function ()
	{
		_this = this;
		for(var soundname in this.soundMap)
		{
			var url = this.soundMap [soundname];
			let request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';
			request.soundname = soundname;

			request.onload = function() {
				context.decodeAudioData(request.response, function(buffer) {
					_this.LoadedSound (request.soundname,buffer);
				}, this.onError);
			}
			request.send();
		}		
	};	

	this.LoadedSound = function (soundname,buffer)
	{	
		this.soundArray[soundname] = buffer;
		this.NbLoadedSound ++;
		if (this.NbLoadedSound == Object.keys(this.soundMap).length)
		{
			this.InitLoader ();
			let event = new CustomEvent("StartGame");
			window.dispatchEvent(event);
		}			
	}	

	this.onError = function onError ()
	{
		alert ('onError');
	}

	this.LoadedImage = function (imagename,img)
	{	
		this.imageArray[imagename] = img;
		this.NewEntityModel (imagename,img);
		
		if (Object.keys(this.imageArray).length == Object.keys(this.imageMap).length)
		{
			this.CreateShadows ();
			this.CreateAllQuadTree ();
			this.LoadAudio ();
		}			
	}
	
	this.CreateAllQuadTree = function ()
	{	
		var model = null;
		for (var key in this.modelArray) 
		{
			var model = this.GetModel (key);
			model.Init ();
		}		
	}

	this.CreateShadows = function ()
	{	
		var model = null;
		for (var key in this.imageMap) 
		{
			
			switch (key)
			{
				case 'GinGinUfoMap':
				model = this.GetModel ('GinGinUfoMap1');
				if (model != null && model.shadow == true)
				{
					this.CreateShadowImage (model);
				}
				break;

				case 'GinGinAnterakMap':
				for (var i = 1; i <= 7; i++)
				{
					model = this.GetModel ('GinGinAnterakMap'+i);
					if (model != null && model.shadow == true)
					{
						this.CreateShadowImage (model);
					}
				}
				break;
				
				case 'ErgastulMap':
				for (var i = 1; i <= 7; i++)
				{
					model = this.GetModel ('ErgastulMap'+i);
					if (model != null && model.shadow == true)
					{
						this.CreateShadowImage (model);
					}
				}
				break;

				case 'GinGinSawMap':
				for (var i = 1; i <= 8; i++)
				{
					model = this.GetModel ('GinGinSawMap'+i);
					if (model != null && model.shadow == true)
					{
						this.CreateShadowImage (model);
					}
				}
				break;
				
				case 'Golgoth27Map':
				for (var i = 1; i <= 4; i++)
				{
					model = this.GetModel ('Golgoth27Map'+i);
					if (model != null && model.shadow == true)
					{
						this.CreateShadowImage (model);
					}
				}
				break;

				default :
				model = this.GetModel (key);
				if (model != null && model.shadow == true)
				{
					this.CreateShadowImage (model);
				}
				break;
			}
		}		
	}

	this.CreateShadowImage = function (model)
	{
		var srcImage = model.img;
		var canvas = document.createElement("CANVAS"); 
		canvas.width = srcImage.width;
		canvas.height = srcImage.height;

		var ctx = canvas.getContext("2d");
		ctx.filter = 'blur(3px)';
		ctx.drawImage(srcImage,0,0);

		var srcImageData = ctx.getImageData(0,0,canvas.width, canvas.height);
		var dstImageData = ctx.createImageData(srcImageData);

		for (var i = 0; i < srcImage.width; i ++)
		{
			for (var j = 0; j < srcImage.height; j ++)
			{
				var index = i*4 + srcImage.width*4*j;
				var alphaIndex = index + 3;
				dstImageData.data [index] = 0;
				dstImageData.data [index+1] = 0;
				dstImageData.data [index+2] = 0;
				dstImageData.data [alphaIndex] = srcImageData.data [alphaIndex];
				if (dstImageData.data [alphaIndex] > 100) dstImageData.data [alphaIndex] = 100;
			}
		}
		
		ctx.putImageData(dstImageData, 0, 0);

		model.imgShadow = new Image(srcImage.width,srcImage.height);
		model.imgShadow.src = canvas.toDataURL();		
	}

	this.LoadedAudio = function ()
	{	
		this.NbLoadedAudio ++;
		if (this.NbLoadedAudio == Object.keys(this.audioMap).length)
		{
			this.LoadSound();
		}			
	}

	this.GetImage = function (imagename)
	{
		return this.imageArray[imagename];
	}

	this.GetModel = function (imagename)
	{
		return this.modelArray[imagename];
	}

	this.LimitVolume = function (volume) {
		return (volume > this.GeneralVolume) ? this.GeneralVolume : volume;
	}

	this.GetSoundByName = function (soundname)
	{
		return this.soundArray[soundname];
	}

	this.GetSoundByIndex = function (index)
	{
		var indexfound = 0;
		for (var key in this.soundArray) 
		{
			if (indexfound == index)
			{
				return this.soundArray[key];
			}
			indexfound ++;
		}
		return null;
	}
	
	this.PlaySoundAudio = function (audio,volume) {
		return this.PlaySoundVolume(audio,volume);
	}
	

	this.PlaySound = function (soundname,volume) {
		var buffer = this.GetSoundByName (soundname);
		return this.PlaySoundVolume(buffer,volume);
	}

	this.PlaySoundVolume = function (buffer,volume) {
		
		if (AppViewModel.playWithSoundEffect == false) return;

		var source = context.createBufferSource(); // creates a sound source
		source.buffer = buffer;                    // tell the source which sound to play
		var mainGainNode = context.createGain();
		mainGainNode.gain.value = this.LimitVolume (volume);
		source.connect(mainGainNode);
		mainGainNode.connect(context.destination);
		source.start(0);                           // play the source now
		return source;
	}
	
	this.GetAudioByName = function (audioname)
	{
		return this.audioArray[audioname];
	}

	this.GetAudioByIndex = function (index)
	{
		var indexfound = 0;
		for (var key in this.audioArray) 
		{
			if (indexfound == index)
			{
				return this.audioArray[key];
			}
			indexfound ++;
		}
		return null;
	}
	
	this.PlayAudioName = function (audioname,volume,loop)
	{
		var audio = this.GetAudioByName (audioname);
		this.PlayAudio (audio,volume,loop);
	}

	this.PlayAudioName = function (audioname)
	{
		var audio = this.GetAudioByName (audioname);
		this.PlayAudio (audio,this.MusicVolume,false);
	}
	
	this.PlayFailed = function ()
	{
		this.StopCurrentAudio ();
		this.PlaySound ('Ohlalalala',1);
	}
	
	this.PlayAudio = function (audio,volume,loop)
	{
		_this = this;
		if (AppViewModel.playWithMusic == true)
		{
			this.StopCurrentAudio ();
			audio.volume = this.LimitVolume (volume);
			audio.loop = loop;
			audio.play ();
			this.currentAudio = audio;
		}
	}

	this.ContinuePlayAutoAudioList = function ()
	{
		if (this.currentAudio == null) this.PlayAutoAudioList ();
	}

	this.PlayAutoAudioList = function ()
	{
		_this = this;
		if (AppViewModel.playWithMusic == true)
		{
			this.StopCurrentAudio ();
			
			var audio = this.currentAudioNode.obj;
			audio.onended = function() {
				_this.currentAudioNode = _this.currentAudioNode.next;
				// if (_this.currentAudioNode == null) _this.currentAudioNode = _this.audioAutoList.firstnode;
				_this.PlayAutoAudioList();
			};		
			
			audio.volume = this.LimitVolume (this.MusicVolume);
			audio.loop = false;
			this.currentAudio = audio;
			audio.play ();
		}
	}
	
	this.PlayIntro = function ()
	{
		this.PlayAudioName ('Intro');
	}
	
	this.StopCurrentAudio = function ()
	{
		if (this.currentAudio != null) 
		{
			this.StopAudio (this.currentAudio);
			this.currentAudio = null;
		}
	}

	this.StopAudio = function (audio)
	{
		audio.currentTime = 0;
		audio.pause();
	}

	this.PauseCurrentAudio = function (pause)
	{
		if (this.currentAudio != null) 
		{
			if (pause == true) this.currentAudio.pause();
			else this.currentAudio.play();
		}
	}

	this.NewEntityModel = function (imagename,img)
	{
		var imagelist = null;
		var jsonmodel = null;
		switch (imagename)
		{
			case 'GoruGoru01':
			case 'GoruGoru02':
			case 'GoruGoru03':
			case 'GoruGoru04':
			jsonmodel = this.jsonModelArray['GoruGoru'];
			break;
			
			case 'BaseVegaCelluleBottomLeft':
			case 'BaseVegaCelluleBottomRight':
			case 'BaseVegaCelluleLeft':
			case 'BaseVegaCelluleRight':
			case 'BaseVegaCelluleTopLeft':
			case 'BaseVegaCelluleTopRight':
			jsonmodel = this.jsonModelArray['BaseVegaCellule'];
			break;
			
			case 'GinGinUfoMap':
			jsonmodel = this.jsonModelArray['GinGin'];
			imagelist = this.BuildImageList (img,3,3,198,198);
			break;
			
			case 'GinGinAnterakMap':
			jsonmodel = this.jsonModelArray['GinGin'];
			imagelist = this.BuildImageList (img,4,7,302,336);
			break;
			
			case 'ErgastulMap':
			jsonmodel = this.jsonModelArray['Ergastul'];
			imagelist = this.BuildImageList (img,4,8,350,434);
			break;
			
			case 'Golgoth27Map':
			jsonmodel = this.jsonModelArray['Golgoth27'];
			imagelist = this.BuildImageList (img,4,4,172,320);
			break;

			case 'NavetteFoudreBody':
			jsonmodel = this.jsonModelArray['NavetteFoudre'];
			break;

			case 'FoudreMap':
			jsonmodel = this.jsonModelArray['Foudre'];
			imagelist = this.BuildImageList (img,3,3,43,368);
			break;

			case 'GinGinSawMap':
			jsonmodel = this.jsonModelArray['GinGinSaw'];
			imagelist = this.BuildImageList (img,4,8,161,161);
			break;

			case 'SmallAsteroidMap':
			jsonmodel = this.jsonModelArray['SmallAsteroid'];
			imagelist = this.BuildImageList (img,3,9,65,59);
			break;

			case 'MediumAsteroidMap':
			jsonmodel = this.jsonModelArray['MediumAsteroid'];
			imagelist = this.BuildImageList (img,3,9,150,158);
			break;
			
			// 462
			case 'SoucoupeImperialeMap':
			jsonmodel = this.jsonModelArray['SoucoupeImperiale'];
			imagelist = this.BuildImageList (img,5,5,462,574);
			break;
			
			case 'ImperialShieldMap':
			jsonmodel = this.jsonModelArray['ImperialShield'];
			imagelist = this.BuildImageList (img,5,5,536,672);
			break;
			
			case 'LazerImperialMap':
			jsonmodel = this.jsonModelArray['ImperialLazernium'];
			imagelist = this.BuildImageList (img,3,3,110,1160);
			break;

			case 'TentaculesMap':
			jsonmodel = this.jsonModelArray['SoucoupeMinosTentacule'];
			imagelist = this.BuildImageList (img,4,16,200,177);
			break;
			
			case 'MinosFireHeaderMap':
			imagelist = this.BuildImageList (img,3,3,130,112);
			break;

			case 'MinosFireBodyMap':
			jsonmodel = this.jsonModelArray['MinosFireLazernium'];
			imagelist = this.BuildImageList (img,3,3,64,789);
			break;

			case 'LazerNavette':
			case 'LazerNavetteMissil':
			jsonmodel = this.jsonModelArray['LazerNavette'];
			break;

			case 'NavetteMissil':
			case 'NavetteMissilRouge':
			case 'NavetteMissilNoire':
			jsonmodel = this.jsonModelArray['NavetteMissil'];
			break;

			case 'GrosAsteroid01':
			case 'GrosAsteroid02':
			case 'GrosAsteroid03':
			case 'GrosAsteroid04':
			case 'GrosAsteroid05':
			jsonmodel = this.jsonModelArray['GrosAsteroid'];
			break;
			
			case 'GoldoPoingFeuGauche':
			case 'GoldoPoingFeuDroite':
			jsonmodel = this.jsonModelArray['FulguroPoing'];
			break;
			
			case 'GoruHeadLeft':
			case 'GoruHeadRight':
			jsonmodel = this.jsonModelArray['GoruHead'];
			break;

			default:
			jsonmodel = this.jsonModelArray[imagename];
			break;
		}
		
		if (imagelist != null)
		{
			for (var i = 1; i <= Object.keys(imagelist).length ; i++)
			{
				var modelName = imagename + i;
			
				var model = new EntityModel (modelName,imagelist[i]);
				this.JsonModelToEntityModel (model,jsonmodel);
				this.modelArray[modelName] = model;
			}			
		}
		else
		{
			var model = new EntityModel (imagename,img);
			this.JsonModelToEntityModel (model,jsonmodel);
			this.modelArray[imagename] = model;
		}
	}

	this.JsonModelToEntityModel = function (model,jsonmodel)
	{
		if (jsonmodel != undefined)
		{
			model.hasQuadNode = jsonmodel.hasQuadNode;
			model.points = jsonmodel.points;
			model.vie = jsonmodel.vie;
			model.degat = jsonmodel.degat;
			model.isBonus = jsonmodel.isBonus;
			model.camp = jsonmodel.camp;
			model.isMissil = jsonmodel.isMissil;
			model.speed = jsonmodel.speed;
			model.isGroundEntity = jsonmodel.isGroundEntity;
			model.speedRot = jsonmodel.speedRot;
			model.shadow = jsonmodel.shadow;
		}
	}
	
	this.BuildImageList = function (imgsrc,nbcol,nbimage,width,height)
	{
		var imageList = new Array ();
		var canvas = document.createElement("CANVAS"); 
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		var imgdst;

		for (var i = 1; i <= nbimage; i++)
		{
			var ix = Math.floor ((i-1) % nbcol);
			var iy = Math.floor ((i-1) / nbcol);
			var sx = ix * width;
			var sy = iy * height;
			
			ctx.clearRect(0,0,width, height);
			ctx.drawImage(imgsrc, sx, sy, width, height, 0, 0, width, height);

			imgdst = new Image(width,height);
			imgdst.src = canvas.toDataURL();
			
			imageList[i] = imgdst;
		}

		return imageList;
	}

	this.LoadJsonModels = function ()
	{
		var _this = this;
		var requestURL = './Json/ModelsParameters.json';
		var request = new XMLHttpRequest();
		request.open('GET', requestURL);
		request.responseType = 'json';
		request.send();
		request.loader = this;
		request.onload = function() {
		  _this.PopulateJsonModels (request.response);
		}
	}

	this.PopulateJsonModels = function (jsonObj) {

		var jsonmodels = jsonObj['models'];
		for (var i = 0; i < jsonmodels.length; i++) {

			var jsonmodel = new JsonModel ();
			jsonmodel.name = jsonmodels[i].name;
			jsonmodel.hasQuadNode = jsonmodels[i].hasQuadNode === 'true';
			jsonmodel.points = parseInt(jsonmodels[i].points);
			jsonmodel.vie = parseInt(jsonmodels[i].vie);
			jsonmodel.degat = parseInt(jsonmodels[i].degat);
			jsonmodel.isBonus = jsonmodels[i].isBonus === 'true';
			jsonmodel.camp = parseInt(jsonmodels[i].camp);
			jsonmodel.isMissil = jsonmodels[i].isMissil === 'true';

			// jsonmodel.speed = parseInt(jsonmodels[i].speed);
			jsonmodel.speed = parseFloat(jsonmodels[i].speed);

			jsonmodel.isGroundEntity = jsonmodels[i].isGroundEntity === 'true';
			jsonmodel.shadow = jsonmodels[i].shadow === 'true';
			jsonmodel.speedRot = parseInt(jsonmodels[i].speedRot);

			this.jsonModelArray[jsonmodels[i].name] = jsonmodel;
			this.NbJsonModels ++;
		}

		this.LoadImages ();
	}	
}





function EntityModel (modelname,img) {
	this.name = modelname;
	this.img = img;
	this.imgShadow = null;
	this.quadNode = null;
	this.hasQuadNode = false;
	this.points = 0;
	this.vie = 1;
	this.degat = 0
	this.isBonus = false;
	this.camp = 0;
	this.isMissil = false;
	this.speed = 0;
	this.isGroundEntity = false;
	this.shadow = false;
	this.speedRot = 0;
	this.Init = function ()
	{
		if (this.hasQuadNode == true) 
		{
			this.quadNode = BuildQuadTree (this.img);
		}
	}
}

function JsonModel (){
	this.name = '';
	this.hasQuadNode = false;
	this.points = 0;
	this.vie = 0;
	this.degat = 0;
	this.isBonus = false;
	this.camp = 0;
	this.isMissil = false;
	this.speed = 0;
	this.isGroundEntity = false;
	this.shadow = false;
	this.speedRot = 0;
}

