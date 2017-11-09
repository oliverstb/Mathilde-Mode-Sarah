

var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;
var text

exports.action = function(data, callback, config,SARAH){


SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;
SCRIBE.activePlugin('radio web');

//console.log("text dans radio js "+JSON.stringify(SARAH.context.scribe.lastReco))
var request = require('request'); var cheerio = require('cheerio'); var exec = require('child_process').exec;
        
           exec("taskkill /f /im VLC.exe")

setTimeout(function(){

//radio=SARAH.context.scribe.FULL_RECO;
      try{
      var radio=data.radio.toLowerCase()
            }
      catch(err){var radio=JSON.stringify(SARAH.context.scribe.lastReco)}
      var radio=radio.replace(new RegExp("\\b" + " " + "\\b","gi"),"")
      //radio=radio.replace(new RegExp("france","gi"),"");
      
     // console.log('on recois de cortana dans radio js '+radio)
     
          request('http://fluxradios.blogspot.fr/p/flux-radios-francaise.html', function (error, response, html) {//var $ = cheerio.load(html);
          var $ = cheerio.load(html);
            
          count=0
       
              $('li a').each(function(i, element){
                    var a = $(this);
                 count=count+1
                    var url = a.attr('href'); 
                    var a1=a.text().toLowerCase()

                    var a1=a1.replace(new RegExp("\\b" + " & " + "\\b","gi")," et ");
                    var a1=a1.replace(new RegExp("\\b" + " " + "\\b","gi"),"");
                    var a1=a1.replace(new RegExp("france","gi"),"");
                    //if ( ((a.text().toLowerCase()).search 'radio france' >-1) && (count==0) ){
                    //console.log(a1)
                    //console.log(count)
                            if ( (radio.search(new RegExp(a1,"gi"))>-1) && (count!==3) ){
                               
                                //console.log("on aaaa"+a1)
                                count++
                                console.log('recherche la radio '+a.text())
                                console.log(url)

                                                request(url, function (error, response, html1) {
                                                var $ = cheerio.load(html1);
                                               // var url1 = $('table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(2) > span:nth-child(1) > span:nth-child(1)').text();
                                                var url1 = $( 'table > tbody > tr:nth-child(5) > td:nth-child(2) > span').text()//;console.log("eeeeeee "+u)

                                                console.log('on va '+url1)
                                                     
                                                var exec = require('child_process').exec;
                                              
                                                var proc = '"C:/Program Files/VideoLAN/VLC/vlc.exe"'
                                                  url1=url1.trim()      
                                                console.log(proc+" "+url1+" --qt-start-minimized")
                                                var child = exec(proc+" "+url1+" --qt-start-minimized");
                                                })//fin request
                                callback({'tts' : ""}) ; return false
                            }//fin if     
               });// fin each
              ScribeSpeak("")
callback({'tts' : ""}) ; console.log('') ; return false
      })//fin resquest
          
}, 2000);//fin timeout

}