import { socketInstanceMain } from "../server.js";


const io = socketInstanceMain();

console.log("Total Currently Connected Users", io.engine.clientsCount);

io.on('connection', (e)=>{
    console.log("When user is connected", e);

});