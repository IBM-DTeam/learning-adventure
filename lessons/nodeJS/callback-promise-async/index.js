var fs = require('fs');

// what is asynchronosity?
// the first example shows how node is asynchromous.

console.log("Before fs.readFile")
fs.readFile('text.txt', 'utf8', function(err, text) {
    console.log('fs.readFile() ', text.length);
});
console.log("After fs.readFile");

lets try using readFileSync, this function will wait for the read to happen
and then the process moves on

console.log("Before fs.readFileSync");
var text = fs.readFileSync('text.txt', 'utf-8');
console.log("fs.readFileSync ", text.length);
console.log("After fs.readFileSync");


//so what is a callback
function readFileCallback(fileName, callback) {
    console.log("In the function");
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, data);
        }
    })
} //readFile


//here is the callback section
console.log("Before");
readFileCallback('text.txt', function(err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log("Callback function ", data.length)
    }


})
console.log("After");


//here is the promises section
new Promise((resolve, reject) => {
    fs.readFile('text.txt', 'utf-8', (err, result) => {
        if (err)
            reject(err)
        else {
            //if the data was read correctly
            resolve(result);
        }
    })
}).then((result) => {
    console.log("First then()")
    console.log("Promise result ", result.length)
    return result.length;
}).then((result) => {
    console.log("Second then()")
    console.log("Promise result ", result)
}).catch(function(err) {
    console.log("catch");
    console.log(err)
})
//
// // //readFileAsync
function readFileAsync() {
    return new Promise(function(resolve, reject) {
        fs.readFile('text.txt', 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

async function read() {
    try {
        var text = await readFileAsync();
        console.log("Async Await", text.length);
    } catch (err) {
        console.log(err);
    }
}
read();
console.log("Yaroslav")
