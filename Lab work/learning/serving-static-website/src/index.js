const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const staticPath = path.join(__dirname, '../public');
// console.log(path.join(__dirname, '../public'));

// middleware for static files
app.use(express.static(staticPath));

app.get("/", ()=>{
});

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});