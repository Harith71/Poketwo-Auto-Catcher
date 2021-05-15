exports.run = (name, msg, botPrefix) => {

    const fs = require('fs');

    var results = [];
    var sNames = [];
    var list = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
                "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    function findName(hint){
        hint = hint.toLowerCase();
        if(hint.charAt(0) != "_"){
            singleSearch(hint)
        }

        if(hint.charAt(0) == "_"){
            multiSearch(hint)
        }
    }

    function singleSearch(hint){
        var firstLetter = hint.charAt(0)
        fs.readFile(`Names/${firstLetter}.txt`, 'utf8', function(err, data) {
            if (err) throw err;
            data = data.split("\r\n");
            data.forEach(element => {
                if(element.length == hint.length){
                    results.push(element);
                }
            })
            compare(hint);
        });
    }

    function multiSearch(hint){
        var count = 0
        list.forEach(element => {
            fs.readFile(`Names/${element}.txt`, 'utf8', function(err, data) {
                if (err) throw err;
                data = data.split("\r\n");
                data.forEach(element => {
                    if(element.length == hint.length){
                        results.push(element);
                    }
                })
                count++;
                if(count == 26){
                    compare(hint);
                }
            });
        })
    }


    function compare(hint){
        var letters = 0;
        var count = 0;
        for(i = 0; i < hint.length; i++){
            if(hint.charAt(i) != "_"){
                letters++;
            }
        }

        results.forEach(element => {
            count = 0;
            for(j = 0; j < hint.length; j++){
                if(hint.charAt(j) == element.charAt(j)){
                    count++;
                }
            }
            if(count == letters){
                sNames.push(element);
            }
        })

        if(sNames.length == 0) return msg.channel.send(`${botPrefix}c alola-form`)
        sNames.forEach(element => {
            msg.channel.send(`${botPrefix}c ${element}`);
        }) 
        console.log(`Caught:${sNames}`);
        return;
    }

    findName(name);
}