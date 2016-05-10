var fs = require('fs');

new Promise(function(resolve,reject){
console.log("sup")
resolve("hey Andrew")

}).then(function(result){
console.log(result);
return "BLEH"
}).then(function(dyon){
console.log(dyon)
})
.catch(function(err){
console.log(err);
})