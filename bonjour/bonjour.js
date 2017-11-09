exports.action = function(data, callback, config, SARAH){

if(!data.bonjour){
  
   if (!data.dictation){
    return callback({'tts': "Je ne comprends pas"});
   }
      var search = data.dictation;
console.log(search)
      //var search = search.replace(/Sarah /i," ");
      //var search = search.replace(/dit /i," ");
     // var search = search.replace(/dis /i," ");
     // var search = search.replace(/bonjour /i," ");
     // var search = search.replace(/à /i," ");
     // var search = search.replace(/ a /i," ");
     // var search = search.replace(/aux /i,"les ");
var rgxp = /bonjour (.+)/i; var search = search.match(rgxp);
 console.log(search)
 search0=search[1]

      var answer = 'Bonjour' + search0 ;
        callback({'tts' : answer });

}//fin if !data.bonjour

else {
      callback({'tts' : "bonjour à toi" })
      return false
    }//fin else


}