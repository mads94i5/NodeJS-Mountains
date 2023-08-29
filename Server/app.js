const express = require("express");
const app = express();

const mountains = ["K2", "Mt. Everest", "Kilimanjaro"];

app.get("/", (req, res) => {
    res.send(`<h1>Mountains of the world!<h1>
    <a href="/mountains">All mountains</a>`);
});

app.get("/mountains", (req, res) => {
    res.send(mountains);
});

app.get("/mountains/:id", (req, res) => {
    if (mountains[parseInt(req.params.id)] === undefined) {
        res.send(`<p><b>No mountain found with id</b>: ${req.params.id}</p>`);
    } else {
        res.send(`<p><b>Found mountain</b>: ${mountains[parseInt(req.params.id)]}</p>`);
    }
});

app.post("/mountains", (req, res) => {
    res.send(res);
});

// needs security
app.patch("/mountains/:id", (req, res) => {
    res.send(res);
});

// needs security
app.put("/mountains/:id", (req, res) => {
    res.send(res);
});

// needs security
app.delete("/mountains/:id", (req, res) => {
    res.send(res);
});

function latifCalc(balance, amount) {
    // en lille joke med en unødvendig beregning fordi du mente 
    // at en hæveautomat fjerner et beløb fra en konto og lægger det til igen,
    // hvis ikke beløbet et tilgængeligt på kontoen, når man prøver at hæve et beløb ;-)
    balance - amount;
    return balance + amount;
}

app.listen(8080);