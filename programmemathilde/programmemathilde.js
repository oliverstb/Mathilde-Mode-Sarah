var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE; 


exports.init = function(data, callback, config,SARAH) {

colour = require(path.resolve('%CD%', './plugins/modules/colour').replace('\\%CD%', ''))

files="" ; fs = require('fs') ; path = require('path') ; chemin="C:/program files"////changer si cela beug
recursiveReadSync = require(path.resolve('%CD%', './plugins/modules/recursive').replace('\\%CD%', '')), files  ;


console.log("le chemin des logiciels est : "+chemin+" changer dans le :   programmemathilde.js    :si cela beug".red)

try {
  filePathphrasescles1 = path.resolve('%CD%', './plugins/programmemathilde/memoireprogrammemathilde/listprogramme.json').replace('\\%CD%', '')
  content = fs.readFileSync(filePathphrasescles1,'utf8') 
  console.log("fichier programme existe")
}//fin try

catch(err){
  console.log("mise à jour des fichiers, peut etre long (3 à 4 minutes), seulement cette fois ci")
     
      try { 
        files = recursiveReadSync(chemin);
      } 
      catch(err){ 
        if(err.errno === 34){ console.log('Path does not exist')  }
          else {  console.log(err.red) }
      }

          filePathphrasescles1 = path.resolve('%CD%', './plugins/programmemathilde/memoireprogrammemathilde/listprogramme.json').replace('\\%CD%', '')
          fs.writeFileSync(filePathphrasescles1,files)

}//fin catch (err)
}//fin export


exports.action = function(data, callback, config, SARAH) {

SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;
SCRIBE.activePlugin('programme mathilde');

recherche=SARAH.context.scribe.lastReco

if (recherche.indexOf("ferme")>-1){on=0}else(on=1);

rgxp = /logiciel (.+)/i; match1 = recherche.match(rgxp);

recherche=match1[1]
recherche=recherche.toLowerCase()
recherche1=recherche.replace(new RegExp(" ","gi"),"");
recherche1=recherche1.replace(new RegExp("-","gi"),"");
recherche1=recherche1.replace(new RegExp("_","gi"),"");
recherche1=recherche1.replace("à" ,"a");console.log('********'+recherche1)

//console.log("en attente de : "+recherche + " ou : " + recherche1)
fs = require('fs') ; p = require('path') ; exec = require('child_process').exec ; path = require('path') ; list1=[]
filePathphrasescles1 = path.resolve('%CD%', './plugins/programmemathilde/memoireprogrammemathilde/listprogramme.json').replace('\\%CD%', '')

content = fs.readFileSync(filePathphrasescles1,'utf8')
contentsplit=content.split(",")

for(i=0;i<contentsplit.length;i++){
  
  contentsplit1=contentsplit[i].replace(new RegExp(" ","gi"),"");
  contentsplit1=contentsplit1.replace(new RegExp("-","gi"),"");
  contentsplit1=contentsplit1.replace(new RegExp("_","gi"),"");
  contentsplit1=contentsplit1.toLowerCase();
contentsplit1=contentsplit1+" "
        if ( ( contentsplit1.search(recherche+".exe ","gi")>-1 ) || ( contentsplit1.search(recherche1+".exe ","gi")>-1 ) ){
  
                    substring=recherche.toLowerCase();
                    string=contentsplit[i].toLowerCase()

                    var a=[],x=-1;
                    while((x=string.indexOf(substring,x+1)) >= 0) a.push(i);

                    console.log("lancement de : "+contentsplit[i]+ a.length)
    
                        //if(a.length>1){
                            
                            if(on==0){ console.log('on ferme')
                                
                                var exec = require('child_process').exec;
                                var nircmd =path.resolve('./plugins/infomathilde/nircmd/nircmd.exe').replace('\\%CD%', '')
                                var nircmd=nircmd+' closeprocess '+'" '+contentsplit[i]+'"'
                                var child2 = exec(nircmd);console.log(nircmd)
                                callback({'tts' : " "})
                                return false
                            }//fin if on
                            
                            else{console.log('on ouvre')
                                
                                SARAH.runApp(contentsplit[i])
                                callback({'tts' : " "}) ; return false
                        
                            }//fin else on
                        
                       // }//fin if
        }

}//fin for  

console.log("pas trouvé !!!") ; callback({'tts' : " "}) ; return false

}