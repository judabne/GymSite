import express from 'express';
import data from './data';

const app = express();

app.get("/api/branches", (req, res) => {
    res.send(data.branches);
})

app.listen(5000, () => { console.log("Server started at port 5000") });

