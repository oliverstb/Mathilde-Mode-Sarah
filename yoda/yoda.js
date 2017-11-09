var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;

exports.action = function(data, callback, config,SARAH){

var fs = require('fs');var exec = require('child_process').exec;var path = require('path');
var maConfig = config.modules.scribe; var util = require('util');

 SCRIBE = SARAH.context.scribe;  ScribeAskMe = SARAH.ScribeAskMe;   ScribeSpeak = SARAH.ScribeSpeak;  SCRIBE.activePlugin('cortana');

 var phraserecus= JSON.stringify(SARAH.context.scribe.lastReco).toLowerCase();phraserecus=JSON.parse(phraserecus)

console.log(phraserecus+'""""')
var rgxp = /yoda(.+)/; var match = phraserecus.match(rgxp);

//console.log(match+"*******")
var phraserecus=match[1]
var dico=require(path.resolve('%CD%', './plugins/modules/mathildedico').replace('\\%CD%', '')) ; dico(phraserecus)

console.log('traitement : '+phraserecus)
//on regarde les noms, adverbe....
var testphrase = require(path.resolve('%CD%', './plugins/modules/testphrase').replace('\\%CD%', '')) ;
 
var resultats=testphrase(phraserecus)
 console.log("resultats : "+resultats)

parle=""
for(var j=0;j<resultats.length;j++){
if(resultats[j].search('adverbe')>-1){resultats[j]=resultats[j]+resultats[j+1]; resultats[j+1]=""}

}
for(var j=0;j<resultats.length;j++){
if(resultats[j].search('pronom')>-1){resultats[j]=resultats[j]+resultats[j+1]; resultats[j+1]=""}

}
console.log("eeeeeeeeeee "+resultats)

//console.log(resultats.length)
x=0
for(var i=resultats.length-1;i>=0;i-=1){

    if((resultats[i].search(new RegExp("\\b" + 'verbe' ,"gi"))>-1)&&x==0){

        x=1
        parle=parle+","+resultats[i]+","
    }

    else{ 

         if (x==0){
               parle=resultats[i]+parle
         }
    
        else{
      
            for(var j=0;j<i+1;j++){
              if((j==i)&&(resultats[i].search(new RegExp("\\b" + 'pronom' ,"gi"))>-1)){
              //  parle=resultats[i]+parle
              console.log(parle.length)
              parle=parle+resultats[j]
              }
                  else{parle=parle+resultats[j]}
            }
      i=resultats.length;break
        }
   }
}

parle=parle.replace(new RegExp(" verbe","gi"),"")
parle=parle.replace(new RegExp(" adverbe","gi"),"")
parle=parle.replace(new RegExp(" nom","gi"),"")
parle=parle.replace(new RegExp(" pronom","gi"),"")
parle=parle.replace(new RegExp(" adjectif","gi"),"")
parle=parle.replace(new RegExp(" préposition","gi"),"")
parle=parle.replace(new RegExp(" article","gi"),"")
parle=parle.replace(new RegExp(" conjonction","gi"),"")
parle=parle.replace(new RegExp(" inconnuuuuu","gi"),"")
parle=parle.replace(new RegExp("undefined","gi"),"")
console.log("*****"+parle)
ScribeSpeak(parle)










callback({'tts' : ""}); return false

}  