const express = require("express");
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("server for chat app is up and running");
});

router.get('/admin', (req,res)=>{
    res.redirect("https://google.com");
});

module.exports = router;