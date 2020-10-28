const Router = require('express-promise-router');
const router = new Router();
const ini = require('ini');
const { Webhook } = require('discord-webhook-node');

//Check and load config files
const fs = require('fs');
const config = ini.parse(fs.readFileSync("./backend/config/discord.conf", 'utf-8'));

var hooks = [];

for(link of config.webhook.links){
    hooks.push(new Webhook(link)); 
}

const send = (payload) => {
    for(hook of hooks){
        hook.send(payload);
    }
}

var error = [];

for(link of config.debug.error){
    error.push(new Webhook(link)); 
}

const sendError = (payload) => {
    var date = new Date();
    for(hook of error){
        hook.send("Error " + date.toLocaleString() + ": " + payload);
    }
}



module.exports = {
    router,
    send,
    sendError
};