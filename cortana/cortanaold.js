var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;

exports.action = function(data, callback, config,SARAH){

reponse=""; fs = require('fs');exec = require('child_process').exec; path = require('path');
filePath = path.resolve('%CD%', './plugins/mémoiredemathilde/memoire/memoire.json').replace('\\%CD%', '');
maConfig = config.modules.scribe; util = require('util');
configcortana = config.modules.cortana; debug = configcortana.debug
SCRIBE = SARAH.context.scribe; ScribeAskMe = SARAH.ScribeAskMe;  ScribeSpeak = SARAH.ScribeSpeak;SCRIBE.activePlugin('cortana');

nommathilde = configcortana.nommathilde ; nomchercher=data.reco ; console.log("mathilde s'appel dans cortana : "+nommathilde)
//nommathilde=nommathilde.toLowerCase()

//on regarde les noms, adverbe....
testphrase = require(path.resolve('%CD%', './plugins/modules/testphrase').replace('\\%CD%', '')) ;// console.log("resultats : "+testphrase(nomchercher))
// on envoie au dico
dico=require(path.resolve('%CD%', './plugins/modules/mathildedico').replace('\\%CD%', '')) ; dico(nomchercher)
//on ajoute les synonymes
synonyme = require(path.resolve('%CD%','./plugins/modules/synonyme').replace('\\%CD%', ''))
  
nomcherchersplit=nomchercher.split(' ')
	for (var i = 0  ; i < nomcherchersplit.length ; i++) {
			nomchercher=nomcherchersplit[i]
		 		synonyme(nomchercher,function(callback1){ 
			 		if(callback1!==" "){
			 			//console.log("réponse* : *"+nomchercher+" "+callback1+"*")
					 }//fin if
				}) //fin fnct syno 	
	}//fin for
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   







try{
if ( data.reco.search(nommathilde) >-1){
  //ScribeSpeak("heu allons y")
reco=data.reco.replace(new RegExp(nommathilde,"gi"),"") ; reco=reco.replace(new RegExp("-","gi")," ") ; query=reco
query=query.toLowerCase() ; query=query.trim()
console.log('phrase recu de scribe : *'+query+'*');

//on connais la phrase qui est dans un plugin si non => on questionne
function emulate0(query,reco){
envoie="";restant="";garbage="";nomplug	=""
	
	function finemul(envoie,restant,garbage,nomplug){//fin car on connais
		
		 try{  //nom de sarah pour l'emul en v3
	        var filePathcontent1 = path.resolve('%CD%', './custom.ini').replace('\\%CD%', '');
	        var content = fs.readFileSync(filePathcontent1,'utf8');ini = require('./ini/ini');fs = require('fs')
	        var nomappel = ini.parse(fs.readFileSync(filePathcontent1, 'utf-8')).common.name;//console.log('le nom : '+nomappel)
	    }//fin try
	    catch (Exception) {  //nom de sarah pour l'emul en v4
	        var filePathcontent1 = path.resolve('%CD%', './client/custom.ini').replace('\\%CD%', '');
	        var content = fs.readFileSync(filePathcontent1,'utf8');ini = require('./ini/ini');fs = require('fs')
	        var nomappel = ini.parse(fs.readFileSync(filePathcontent1, 'utf-8')).bot.name;//console.log('le nom : '+nomappel)
	    }//fin catch
		
		if(garbage==1){console.log("!!!!!!!! dication !!!!!!!!!!!")
			SARAH.run(nomplug, { 'dictation' : envoie});
            callback({'tts' : ""}); return false
		}
		else{
			var url1 = 'http://127.0.0.1:8888/?emulate='+nomappel+' '+envoie;
			console.log('on connais donc ont appel depuis cortana : '+url1)
		    var request = require('request') ; request({ url : url1 })
			//console.log(restant+"llllllllllllllllllllllll"	)   

//test les phrases clés et ajoute
//for(var d=0;d<restant.length;d++){
				if(  .length>0){
					d=0
		           restant[d]=restant[d].trim()
		           		
		           		for (var f=0;f<objet.phrasescles.length ; f++) {
		          	           		
		           			if(objet.phrasescles[f].search(restant[d])>-1){console.log("conuuuuuuuuuuuuu"+restant[d])
		           				f=objet.phrasescles.length;restant[d]="";//break
		           			}
		      		             
						}//fin for f	
				
					for(var x=0;x<longueurdataitemtotal;x++){
						if(objetdataitemtotal.nompluguine[x].search(restant[d])>-1){
							x=longueurdataitemtotal;f=objet.phrasescles.length;console.log("conuuuuuuuuuuuuu"+restant[d]);restant[d]="";//break
						}
											
					}
					if(restant[d]!==""){
					console.log("non conussssssss "+restant[d])
								            objet.phrasescles.push(restant[d]); var new_jsonStr = JSON.stringify(objet);
								            console.log("valeur rajoutée au json phrasescles & fini pour cortana, le plugin est actif : "+restant[d])
								           	x=longueurdataitemtotal
								           	f=objet.phrasescles.length
								           //	break
					}//fin for
				}//fin if

				//}//fin for d

				//objet123 = JSON.parse(data66) ;  jsonStr123 = JSON.stringify(objet123);
				//var data7=[],i=-1
				var triFn = function(a, b){
				  if (a.length > b.length) return -1;
				  if (a.length  < b.length) return 1;
				  if (a.length == b.length) return 0;
				}//fin var fnct
				objet.phrasescles.sort(triFn); // tri le tableau

				var new_jsonStr = JSON.stringify(objet) ; //data66=new_jsonStr123
				var filePathphrasescles1 = path.resolve('%CD%', './plugins/mémoiredemathilde/phrasescles/phrasescles.json').replace('\\%CD%', '')
	            fs.writeFile(filePathphrasescles1,new_jsonStr)
			    callback({'tts' : ""}); return false
			
		}//fin else
		callback({'tts' : ""}); return false	//on as finis
}//fin fnct emul

/////////debut

	levenshtein=require(path.resolve('%CD%', './plugins/modules/levenshtein').replace('\\%CD%', ''))
  	
    urlnomplugins = path.resolve('%CD%', './plugins/demarrage/item/plugins.json').replace('\\%CD%', '');//lis le nom des plugins
    datanomplugins=fs.readFileSync(urlnomplugins,'utf8').toString() ;
    objetnomplugins = JSON.parse(datanomplugins) ;  longueurnomplugins = objetnomplugins.nompluguine.length 


	var filePathrea = path.resolve('%CD%', './plugins/mémoiredemathilde/phrasescles/phrasescles.json').replace('\\%CD%', ''); 
	var data = fs.readFileSync(filePathrea)
	var objet = JSON.parse(data) ; var jsonStr = JSON.stringify(objet); 
//test la liste des items

//list les items totaux
function test(objet) {
	
//lis les phrases clés
    var queryrecherche=query             
		                        
		for(var ii=0;ii<objet.phrasescles.length;ii++){
		       	if (query.search(new RegExp(objet.phrasescles[ii],"gi"))>-1){			            
		            //console.log('phrasescles connus : '+objet.phrasescles[ii])
		            queryrecherche=queryrecherche.replace(objet.phrasescles[ii],"")
		        }//fin if 
		}//fin for ii

		queryrecherche=queryrecherche.trim()
		console.log("phrase apres mots clés*"+queryrecherche+"*") 

 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//debut du test

 pathname = './plugins/demarrage/item/itemtotal.json';//on lis les plusingstotaux
      pathname = path.resolve('%CD%', pathname).replace('\\%CD%', '');
        dataitemtotal= fs.readFileSync(pathname,'utf8',toString) ; objetdataitemtotal = JSON.parse(dataitemtotal) ;
          longueurdataitemtotal = objetdataitemtotal.nompluguine.length 
         	query=query.toLowerCase()
console.log("********"+query+"***********************")
tableau="";tableaulevi=100
conteur=0

//debut boucle
for(var i=0;i<longueurdataitemtotal;i++){
         		objetdataitemtotal.nompluguine[i]=objetdataitemtotal.nompluguine[i].toLowerCase().trim()
         		        	
         		      //////////////////////
                    levi=levenshtein(objetdataitemtotal.nompluguine[i],query)   
                    querylengthlevi=query.length
                    concordancelevi=(levi*100)/objetdataitemtotal.nompluguine[i].length
                    
                    levi1=levenshtein(query,objetdataitemtotal.nompluguine[i])   
                    querylengthlevi1=objetdataitemtotal.nompluguine[i].length
                    concordancelevi1=(levi1*100)/query.length

                    levi2=levenshtein(queryrecherche,objetdataitemtotal.nompluguine[i])   
                    querylengthlevi2=objetdataitemtotal.nompluguine[i].length
                    concordancelevi2=(levi2*100)/queryrecherche.length

									if ( (concordancelevi==0) ){
										console.log("trouvé00011 "+concordancelevi+objetdataitemtotal.nompluguine[i]);
										
										//itemtableau.push({'objetdataitemtotal.nompluguine[i]' : concordancelevi1})
										envoie=objetdataitemtotal.nompluguine[i]
										finemul(envoie,restant,garbage,nomplug)
										return false
									}

									if ( (concordancelevi2==0) ){
										console.log("trouvé00011000 "+concordancelevi2+objetdataitemtotal.nompluguine[i]);
										//itemtableau.push(objetdataitemtotal.nompluguine[i]+":"+concordancelevi2)
										envoie=objetdataitemtotal.nompluguine[i]
										finemul(envoie,restant,garbage,nomplug)
										return false
									};envoie=objetdataitemtotal.nompluguine[i]


if(tableaulevi>concordancelevi){tableaulevi=concordancelevi;tableau=envoie}
if(tableaulevi>concordancelevi1){tableaulevi=concordancelevi1;tableau=envoie}
if(tableaulevi>concordancelevi2){tableaulevi=concordancelevi2;tableau=envoie}
}//fin for
console.log("--------------"+tableaulevi+"--------------------"+tableau);
if(tableaulevi<=24){finemul(tableau,restant,garbage,nomplug);return false}
//retest query==motscles
									for(var i=0;i<longueurdataitemtotal;i++){
										if(query.search(objetdataitemtotal.nompluguine[i])>-1){
											console.log("eeeee111 "+query+"* *"+objetdataitemtotal.nompluguine[i])
											restant=query.replace(objetdataitemtotal.nompluguine[i],'')
												
												envoie=objetdataitemtotal.nompluguine[i]
											restant=restant.split("  ");//restant=restant.replace(new RegExp("/","gi"),"")
											//console.log("eee "+restant);
											finemul(envoie,restant,garbage,nomplug)
											return false 	
										}

										if(objetdataitemtotal.nompluguine[i].search(query)>-1){
											console.log("eeeee222 "+objetdataitemtotal.nompluguine[i]+"* *"+query)
											restant=objetdataitemtotal.nompluguine[i];restant.replace(query,'');
											restant=restant1.split("  ");//restant=restant.replace(new RegExp("/","gi"),"")
											//console.log(restant);
											envoie=objetdataitemtotal.nompluguine[i]
										finemul(envoie,restant,garbage,nomplug)
										return false 
										}

									}//fin for i

////test garbage
for(k=0;k<longueurnomplugins;k++){
 	if ( (objetnomplugins.nompluguine[k].search("garbage","gi")>-1) ){

		var urlgarbage = path.resolve('%CD%', './plugins/demarrage/item/'+objetnomplugins.nompluguine[k]+'item.json').replace('\\%CD%', '');//lis le nom des plugins
	    
	    dataurlgarbage=fs.readFileSync(urlgarbage,'utf8').toString() ;
	    objeturlgarbage = JSON.parse(dataurlgarbage) ;  longueururlgarbage = objeturlgarbage.nompluguine.length 

			for(var g=0;g<longueururlgarbage;g++){
				if((query.search(objeturlgarbage.nompluguine[g])>-1)){
					console.log("trouvé dans garbage"+query+" "+objeturlgarbage.nompluguine[g])
					garbage=1
					nomplug=objetnomplugins.nompluguine[k]
					nomplug=nomplug.replace('garbage','')
					envoie=query
					finemul(envoie,restant,garbage,nomplug)
					callback({'tts' : ""}); return false
				}//fin if
			}//fin for g

	}//if garbage

}//fin for k
//fin etst garbage

emulate(queryrecherche )

callback({'tts' : ""}); return false
}//fin fnct test objet

test(objet)

}// fin fnct emulate0




//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



function emulate(query){//on emul si rien ==>match 3
    
console.log('pas de reco dans mes xml je test en direct avec emul si one-of ou xml bizard')

// on test si un plug s'active au cas ou probleme xml si non match3
            function xmlinconnu(query){
                      //le nom de sarah en vrai
                      try{
                          filePathcontent1 = path.resolve('%CD%', './custom.ini').replace('\\%CD%', '');
                          content = fs.readFileSync(filePathcontent1,'utf8');ini = require('./ini/ini');fs = require('fs')
                          nomappel = ini.parse(fs.readFileSync(filePathcontent1, 'utf-8')).common.name;//console.log('le nom : '+nomappel)
                      }
                          catch (Exception) {
                            filePathcontent1 = path.resolve('%CD%', './client/custom.ini').replace('\\%CD%', '');
                            content = fs.readFileSync(filePathcontent1,'utf8');ini = require('./ini/ini');fs = require('fs')
                           nomappel = ini.parse(fs.readFileSync(filePathcontent1, 'utf-8')).bot.name;//console.log('le nom : '+nomappel)
                          }
 //on prends la date
var date = new Date();
heures=date.getHours();minutes=date.getMinutes();secondes=date.getSeconds();year=date.getFullYear();month=(date.getMonth())+1;day=date.getDate()
if((month)<10){month='0'+month};if((day)<10){day='0'+day};if((heures)<10){heures='0'+heures}
if((minutes)<10){minutes='0'+minutes};secondes=(secondes);if((secondes)<10){secondes='0'+secondes}
ladate=year+'-'+month+'-'+day;letemps='['+heures+':'+minutes+':'+secondes;//console.log(ladate);console.log(letemps)
// on emul pour voir
url1 = 'http://127.0.0.1:8888/?emulate='+nomappel+' '+query;console.log('on test pour vérifier si sarah a répondu à : '+url1)
request = require('request');

      function emulation(ladate,letemps) {console.log('on verifie dans le log')
          request({ url : url1 }, function (err, response, body){
			//on attends l'ecriture du log
              fs=require('fs')
                    try{
                        filePathfichier = path.resolve('%CD%', './bin/'+ladate+'.log').replace('\\%CD%', '');fichier=fs.readFileSync(filePathfichier,'utf-8')
                    }
                        catch (Exception) {
                          filePathfichier = path.resolve('%CD%', './client/AddOns/debug/'+ladate+'.log').replace('\\%CD%', '');fichier=fs.readFileSync(filePathfichier,'utf-8')
                        }
              longuerstring=fichier.length;//console.log(longuerstring);
              str = fichier;toSearch=letemps;
              lo='';pos=str.indexOf(toSearch)
 
                   if(pos==-1){match3(query);return false}
              	   lon=str.length
    
                  for( i = pos; i < lon ; i++) {
                      lo=lo+str[i]
                  };//fin for i
  //  console.log(pos);console.log(lon);console.log('rrrrrrrrr')
              if(lo.indexOf('Build')>-1){console.log("émulation trouvée donc plugin actif on s'arrete la");callback({'tts': ""});return false}; 
              console.log('pas d émulation trouvée')
                  match3(query)
                  return false
        
            });//fin request
        
        }//fin emulation
emulation(ladate,letemps)
}//fin fnct xmlinconnu

xmlinconnu(query)//appel fnct xmlinconnu
//fin screakspeak

callback({'tts': ""})
return false
}//fin fnct emulate






///////////////////////////////////////////////////////////////////////////////////////////////////////
//on connais la phrase recu==phrase d'un plug

//////////////////////////////////////////////////////////////////////////////////

// on traite la phrase recu

function ask(query) {
 ScribeAskMe("Que recherche tu", [
    {'answer':'age' }
    ], function(answer,phrase,match,wholeMatch) {
      if (phrase!=='undefined') {
        
        msg = phrase.trim();
      
        Match(query,msg)
      }
      else if (answer==false) {
        ScribeSpeak("Je ne suis pas sûr que tu aies répondu à ma question !", function () {
          ask(query);
        });
      }
      else ScribeSpeak("Tu n'as rien répondu. Tant pis.");//console.log(answer+phrase+match+wholeMatch);
    }, {'timeout':maConfig.timeout_msec, 'retryIfNoMatch': "Je ne suis pas sûr d'avoir compris. Peux-tu répéter ? quel est ton âge ?", 'essais': 2}
  );
}//fin fnct ask


//////////////////////////////////////////////////////////////////








function Match(query,msg){
reponse=msg;reponse2=''; reponse3=''; match=query.search(new RegExp("\\b" + reponse + "\\b","gi"))

	if(match<0){
	    reponse=reponse.toLowerCase(); query=query.toLowerCase();
	    match=query.search(new RegExp("\\b" + reponse + "\\b","gi"));
	}

	if(match<0){
	    reponse=reponse.toUpperCase();
	    match=query.search(new RegExp("\\b" + reponse + "\\b","gi")); 
	}

	if(match>-1){
	    //console.log('on a matché en 1')
	    reponselength=(reponse.length)
	    querylength=(query.length)

	        for (i=0;i<match;i++){reponse2=reponse2+query[i]}
	            
	        for (i=match;i<querylength;i++){reponse3=reponse3+query[i]}

	        ScribeSpeak(msg, function() {Match1(query,msg,reponse2);callback({'tts': ""});return false});
	       
	}//fin if

	else{ScribeSpeak('la phrase ne correspond pas, je sort') ; callback({'tts': ""}) ; return false }

return false
}//fin fnct Match1

///////////////////////////////////////////////////



function match3(query){// on va tester le pourcentage
SARAH.run('wiki', { 'phrase' : query});
callback({'tts': ""});return false
}//fin match3

////////////////////////////////////////////////////



emulate0(query,reco);//c'est la que l'on commence
 
}//fin if

    if ( data.reco.search("Siri") >-1){ScribeSpeak("tu ma appelé siri, et puis quoi encore, pourquoi pas cortana")}
callback({'tts' : ""});return false
}//fin try

  catch (err) {console.log(err)}
callback({'tts' : ""});return false

}//fin export