const express = require('express');
const app = express();
const mountRoutes = require('./routes');

const PORT = process.env.PORT || 5000;

async function start(app){
    try{
        app.use(express.json({limit:'1mb'}));
        app.listen(PORT, ()=>{console.log(`Server Listening on Port ${PORT}`)});
        mountRoutes(app); 
    }catch(exception){
        console.error(exception);
        //TODO: send error logs elsewhere 
    }
}

start(app);