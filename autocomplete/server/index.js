const express = require("express");
const cors = require('cors');

const trieRoute = require("./trie/route");

const app = express();

app.use(cors());


app.use(express.json())

app.use("/api/trie", trieRoute);

app.listen(3001, ()=>{
    console.log("app is listening to you in port 3001");
},)