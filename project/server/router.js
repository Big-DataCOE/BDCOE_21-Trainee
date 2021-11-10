const express = require("express");
const router = express.Router();

router.get('/admin', (req,res)=>{
    res.send("admin page for team-chat application");
});

module.exports = router;