var ScribeAskMe; var ScribeSpeak; var maConfig; var SCRIBE;

exports.action = function(data, callback, config, SARAH){

 SCRIBE = SARAH.context.scribe; ScribeAskMe = SARAH.ScribeAskMe; ScribeSpeak = SARAH.ScribeSpeak;
 SCRIBE.activePlugin('traduction');

nomchercher=JSON.stringify(SARAH.context.scribe.lastReco);nomchercher=JSON.parse(nomchercher)

rgxp = /traduction de (.+)/i; nomchercher = nomchercher.match(rgxp);
 nomchercher=nomchercher[1]
 //console.log(match[1])
 //nomchercher=data.chercher;
  console.log('traduire : *'+nomchercher+'*')
 reponse=""; fs = require('fs');exec = require('child_process').exec; 
 maConfig = config.modules.scribe; util = require('util'); path = require('path');cheerio = require('../modules/cheerio');



anglaisfrancais= function(nomchercher){
nomchercher=nomchercher.replace(" ","+")
	nomchercher = nomchercher.trim(); nomchercher =nomchercher.toLowerCase()
	nomcherchercomplet='https://translate.google.com/?q='+nomchercher+'&sl=en&tl=fr#en/fr/'+nomchercher
				//		https://translate.google.com/?q=salu           &sl=en&tl=fr#en/fr/what%20esle
	console.log(nomcherchercomplet)

	 url=nomcherchercomplet
		//#result_box > span
		request({ 'uri' : url, 'headers':{'Accept-Charset': 'utf-8'}, 'encoding':'binary' }, function(error, response, html){//ma fonction...});﻿

			    var $ = cheerio.load(html, { xmlMode: false, ignoreWhitespace: false, lowerCaseTags: false });
						var traduction=$('#result_box > span:nth-child(1)').text()
						traduction=traduction.toLowerCase()
						nomchercher=nomchercher.toLowerCase()
						nomchercher=nomchercher.replace("+"," ")
							console.log("***"+traduction)
							console.log("***"+nomchercher)
							if(traduction==nomchercher){
								
											console.log('alerte  francais anglais');
													francaisanglais(nomchercher)
											callback();return false
							}
										//}
							
							console.log('anglais francais') ;ScribeSpeak(traduction)
								callback();return false


									//	}//fin if
							//})//fin each

         });//fin request
 
} //fin fnct anglaisfrancais

francaisanglais= function(nomchercher){

 nomchercher = nomchercher.trim(); 
 nomcherchercomplet='https://translate.google.com/?q='+nomchercher+'&sl=fr&tl=en#fr/en/'+nomchercher

 console.log(nomcherchercomplet);

		request(nomcherchercomplet, function (error, response, html) {
    		var $ = cheerio.load(html, { xmlMode: false, ignoreWhitespace: false, lowerCaseTags: false });
					var traduction=$('#result_box > span:nth-child(1)').text()
					ScribeSpeak(traduction)
					callback();return false
         });//fin $

} //fin fnct anglaisfrancais

anglaisfrancais(nomchercher)
}