const Router = require('express-promise-router');
const router = new Router();
const ini = require('ini');
const { Webhook } = require('discord-webhook-node');

//Check and load config files
const fs = require('fs');
const config = ini.parse(fs.readFileSync("./backend/config/discord.conf", 'utf-8'));

const links = config.webhook.links;

var hooks = [];

for(link of links){
    hooks.push(new Webhook(link)); 
}

const send = (payload) => {
    for(hook of hooks){
        hook.send(payload);
    }
}

module.exports = {
    router,
    send
};