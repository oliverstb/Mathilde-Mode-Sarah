var exec = require('child_process').exec;
var fs = require("fs");
var urlfile = __dirname+'\\';
// ECRIRE LA MAC ADRESSE EN MINUSCULE De votre téléphone ou votre pc portable ou autre apariel
  var mac_mobiles=new Array('84-98-66-bf-1f-58');
// -- LIGNE  A COPIER nom_mobile 
  var nom_mobiles=new Array('Sébastien');
//========================================================================================  
// ------------------------------------------
//  CRON
// ------------------------------------------
exports.cron = function(callback, task , SARAH ){
   // ===============================================================================================
  // LECTURE DU FICHIER ATTENDRE 1 MINUTE AVANT DE LANCER LA DETECTION
setTimeout(function(){
    // DEBUT DE LA BOUCLE DE RECHERCHE DE PLUSIEUR ADRESS MAC
    var donne=0; 
		mac_mobiles.forEach(function(mac_mobile){
				// DEBUT LECTURE FICHER DES MAC ADRESS
				var resulat = readfile(urlfile+'mac_adres.txt');
				// ------ FIN
				// RECHERCHE DE LA MAC ADRESS
				var machello="";
				machello = resulat.search(mac_mobile);
				// SI TU TROUVE LA MAC ADDRESS CONTINUE
						if (machello !== "-1" || machello !== "" ){
									// EXTRACTION DE L'ADRESSE IP
									var ip_mobile=resulat.substring(machello-24,machello-2);
									var mobile_present="";
											if ( ip_mobile.length >= 1  ){
														// MAC ADRESS PRESENTE SUR LE RESEAU 
														var mobile_present= 3;		
									}
						}
				// -- FIN
				// LECTURE DE L'ETAT AVANT MODIFICATION
				var retour_etat = readfile(urlfile+nom_mobiles[donne]+".txt");
				var retour_pos = readfile(urlfile+nom_mobiles[donne]+"_pos.txt");
// debug
		console.log( nom_mobiles[donne]+' ETAT_'+retour_etat+'  POSITION_'+retour_pos);
//		
							if (mobile_present >= 1 ){
									//
									// mac adresse on line
									console.log( nom_mobiles[donne]+' ON LINE ');
									save_file(urlfile+nom_mobiles[donne]+"_pos.txt","TRUE");
									save_file(urlfile+nom_mobiles[donne]+".txt",'TRUE');
									// NOTIFICATION ne pas notifier si deja fais
									if (retour_etat != "TRUE" && retour_pos !="TRUE" ) {
												// Debut sequence presence
												// Fin sequence presence
												if (task.notification == "TRUE") {
															 SARAH.speak(nom_mobiles[donne]+' vient de rentrer a la maison');
															 }
												}
																
									//================================================================================================							
							} else{
									// mac adresse off line
									console.log(nom_mobiles[donne]+' OFF LINE ');
									save_file(urlfile+nom_mobiles[donne]+"_pos.txt","FALSE");
									save_file(urlfile+nom_mobiles[donne]+".txt",'FALSE');
									// NOTIFICATION ne pas notifier si déja fais
									if (retour_etat != "FALSE" && retour_pos !="FALSE" ) {
												// Debut sequence absence
												// Fin sequence absence
												if (task.notification == "TRUE") {
															 SARAH.speak(nom_mobiles[donne]+' vient de sortir de la maison');
															 }
												}
															
							}
				// -- FIN BOUCLE IP 
				++donne;	  
		});	
	  //  
},1000);
	// ==========================================================================	
	// CREATION DES FICHIERS EQUIPEMENT BOUCLE 
	// ==========================================================================
	console.log( 'creation_file_'+task.creation_file);
	if (task.creation_file=="TRUE"){
		nom_mobiles.forEach(function(nom_mobile){
						// LECTURE DU TABLEAU DES NOM
						var rab=save_file(urlfile+nom_mobile+".txt", "FALSE");
						var rab=save_file(urlfile+nom_mobile+"_pos.txt", "FALSE");
						});
						// CHANGE LA VARIABLE POUR EVITE DE LE REFAIRE 							
		task.creation_file="FALSE";
	}
	// CREATION FICHIER FIN 
    // =========================================================================	
	// DEBUT DU SCAN IP MAC ADRESS DU RESEAU
    // SCAN LES IP DU RESEAU 
	var mac_adres  = urlfile+"ping_range.bat";
    var child = exec(mac_adres, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('exec scan:' +error);
					}
			}); 
	// GEGERE LE FICHIER IP,MAC ADRESSE
	var mac_adres  = " arp -a > "+urlfile+"mac_adres.txt";
    var child = exec(mac_adres, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('exec arp:' +error);
					}
			}); 

// -------------------------------------------
// FIN CRON
// -------------------------------------------
   console.log('cron: Scan network');
   }

exports.action = function(data, callback, config, SARAH){
  // config module
  config = config.modules.WifiConecte;
 // ==================================================================================================================== 		
 // COMPTE LES PRESENTS 
  var donne=0;
		nom_mobiles.forEach(function(nom_mobile){
			var retour_etat = readfile(urlfile+nom_mobile+".txt");
			if (retour_etat == "TRUE") {++donne; }
		});	
  // FIN DE LA BOUCLE DE COMPTAGE
  
  switch(data.key)
  		{
		case "IN":
		// ON LINE  VUE
			SARAH.speak('Je detecte une présence de ');
			    // BOUCLE DE LECTUER
				nom_mobiles.forEach(function(nom_mobile){
					// LECTURE FICHIER DE L ETAT
					var retour_etat = readfile(urlfile+nom_mobile+".txt");
							if (retour_etat == "TRUE") {
										SARAH.speak(nom_mobile);
										}
					});	
		break;
		
		case "OUT":
		// OFF LINE NON VUE
		// COMPTE LES NON VUE
		var nonvu =0;
		nom_mobiles.forEach(function(nom_mobile){
					// LECTURE FICHIER DE L ETAT
					var retour_etat = readfile(urlfile+nom_mobile+".txt");
						if (retour_etat == "FALSE") {
										++nonvu;
										}
								});
		//--------------------------------------------
		
		console.log('rt:'+ donne);
		if (donne == nonvu ){
				SARAH.speak('Tout le monde est de sortie');	
				break;
				} 
				
		if (nouvu == '0'){
		        SARAH.speak('Tout le monde est a la maison');
				break;			   
			   }
		if (nouvu != donne){
					SARAH.speak('Je detecte pas ');
					// BOUCLE DE LECTUER
					nom_mobiles.forEach(function(nom_mobile){
					// LECTURE FICHIER DE L ETAT
					var retour_etat = readfile(urlfile+nom_mobile+".txt");
						if (retour_etat == "FALSE") {
										SARAH.speak(nom_mobile);
										}
								});	
								
			}					
		break;
		
		case "CALL":
		// COMPTE LES PRESENCES
			if (donne >=1){
			            SARAH.speak('Je détécté '+donne+' personnes ');
						} else {
								 SARAH.speak('Je détécté personnes ');
								 }
		break;
		
		}
callback({});
}
 //**********************************************************************************************************************
// ======================= subroutine sauver fichier
var save_file = function(filesave,txtsave) {
        var fs = require('fs');
		fs.writeFile(filesave, txtsave, function(err) {
				if(err) {
					console.log('err save file:'+err);
				return "ERROR";
			} 
 }); 
return
}

//  ============================= subroutine lecture fichier
var readfile = function(fileread){
		var fs = require('fs');
		var resulat_read = fs.readFileSync(fileread, 'UTF-8', function(err, content) {
				if (err) {
						console.log('err lecture fichier:'+fileread);
						return "ERROR";
						} 
				
		});
return resulat_read
}