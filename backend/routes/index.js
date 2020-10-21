const discord = require("./discord.js");

module.exports = app => {
    app.use("/discord", discord.router);
}