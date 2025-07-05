const express = require("express");

const router = express.Router();
const Trie = require("./index");
const trie = new Trie();

router.post("/insert", (req, res)=>{

    console.log("inside here", req);
    const { term } = req.body;
    if (!term) return res.status(400).json({ error: 'Missing term' });
    trie.insert(term.toLowerCase());
    res.json({ success: true });
})


router.get("/autocomplete", (req, res)=>{

    const queryParams = req.query.q?.toLowerCase()||"";
    
    const suggestions = trie.autocomplete(queryParams);

    res.json(suggestions);

})

router.get("/toJson", (req, res)=>{

     let data = trie.toJSON();
     res.json(data);

})

module.exports = router