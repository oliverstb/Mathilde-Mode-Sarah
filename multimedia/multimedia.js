var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;


exports.action = function(data, callback, config,SARAH){

SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;
SCRIBE.activePlugin('multimedia');


var request = require('request');
var cheerio = require('cheerio');
var exec = require('child_process').exec;

var recherche=JSON.stringify(SARAH.context.scribe.lastReco);var recherche=JSON.parse(recherche)

console.log("recus dans multimedia : "+recherche)

 recherche=recherche.replace(new RegExp("\\b" + "de" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "des" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "la" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "les" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "le" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "l'" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "au" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "à" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "du" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "aux" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "un" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "une" + "\\b","gi"),"");
 recherche=recherche.replace(new RegExp("\\b" + "d'" + "\\b","gi"),"");
console.log('la phrase traitée : '+recherche);




if (recherche.search("vidéos") >-1){
    rgxp = /vidéos (.+)/i; recherche = recherche.match(rgxp);
    recherche=recherche[1]
 
    recherche=recherche.replace(new RegExp(" ","gi"),"+")
        
        var proc = 'start chrome --new-window https://www.youtube.com/results?search_query='+ recherche;
        exec(proc)     
       
  callback({'tts': ""})
  return false
}

if (recherche.search("vidéo") >-1){
    rgxp = /vidéo (.+)/i; recherche = recherche.match(rgxp);
    recherche=recherche[1]
 
    recherche=recherche.replace(new RegExp(" ","gi"),"+")
   // SARAH.chromeless('http://www.google.com', 80);
          var proc = 'start chrome --new-window https://www.youtube.com/results?search_query='+ recherche;
          //exec(proc)
        
  callback({'tts': ""})
  return false
}

if (recherche.search("images") >-1){ 
    rgxp = /images (.+)/i; recherche = recherche.match(rgxp);
    recherche=recherche[1]

    recherche=recherche.replace(new RegExp(" ","gi"),"+")
          
        var proc = '%CD%/plugins/cortana/bin/searchimages.vbs ' + recherche 
        exec(proc);
           
  callback({'tts': ""})
  return false
}

if (recherche.search("image") >-1){ 
    rgxp = /image (.+)/i; recherche = recherche.match(rgxp);
    recherche=recherche[1]
 
    recherche=recherche.replace(new RegExp(" ","gi"),"+")
  
      var proc = '%CD%/plugins/cortana/bin/searchimages.vbs ' + recherche
      exec(proc)

  callback({'tts': ""})
  return false
}

console.log("riennnnnnnnnnnnnnnnnnnnnnnnnnnnn erreur")
          callback({'tts': ""})
return false


}