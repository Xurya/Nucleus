const discord = require("./discord.js");
const { GoogleSpreadsheet } = require('google-spreadsheet');

//Check and load config files
const ini = require('ini');
const fs = require('fs');
const { Console } = require("console");

const days = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Friday', 'Sat'];

//Reminder Script
async function callback(){
    var config = ini.parse(fs.readFileSync("./backend/config/discord.conf", 'utf-8'));
    var doc = new GoogleSpreadsheet(config.google.tmSheetID);
    doc.useApiKey(config.google.apiKey);
    await doc.loadInfo().catch(function () {
        discord.error("Failed to load document info");
    });
    var sheet = doc.sheetsByIndex[config.google.sheetIndex];
    var rows = await sheet.getRows().catch(function () {
        discord.error("Failed to load sheet info");
    });

    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/" + currentdate.getMonth() 
    + "/" + currentdate.getFullYear() + " " 
    + currentdate.getHours() + ":" 
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    var hrs = currentdate.getHours();
    var mins = currentdate.getMinutes();
    if(hrs < 7){
        return;
    }
    //Get Row based on current time segment
    var row = hrs - 7;
    if(mins > 30){
        row+=1;
    }

    //Get Col based on current day of week
    var col = days[currentdate.getDay()];

    var curr = rows[row][col];
    var next = rows[row+1][col];

    if(curr !== next){
        discord.send(next + " in 15 Minutes!")
    }
}

var firstDate = new Date();
var firstMins = firstDate.getMinutes();
var wait = 0;
if(firstMins > 45 ){
    wait = 60-firstMins;
}
if(firstMins < 45)
{
    wait = 45 - firstMins;
}
if(firstMins < 15){
    wait = 15 - firstMins;
}
console.log("wait: " + wait);
setTimeout(function (){
    callback();
    setInterval(callback, 1000*60*60*0.5);
}, 60*1000*wait);

module.exports = app => {
    app.use("/discord", discord.router);
}