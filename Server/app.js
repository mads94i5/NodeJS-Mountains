const express = require("express");

const app = express();

app.use(express.json());

const mountains = [
    { id: 1, name: "K2", height: 4675 },
    { id: 2, name: "Mt. Everest", height: 6162 },
    { id: 3, name: "Kilimanjaro", height: 5895 }
];

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

app.get("/mountains", (req, res) => {
    res.send({ data: mountains });
});

app.get("/mountains/:id", (req, res) => {
    const paramsMountainId = Number(req.params.id);
    if (!paramsMountainId) {
        res.send({ error: "The mountain id must be a number!" });
        return;
    }
    const foundMountain = mountains.find((mountain) => mountain.id === paramsMountainId);
    res.send({ data: foundMountain });
});

app.post("/mountains", (req, res) => {
    mountains.push(req.body)
    res.send(req.body);
});

app.put("/mountains/:id", (req, res) => {
    const paramsMountainId = Number(req.params.id);
    if (!paramsMountainId) {
        res.send({ error: "The mountain id must be a number!" });
        return;
    }
    const updatedData = req.body;
    const foundMountain = mountains.find((mountain) => mountain.id === paramsMountainId);
    if (!foundMountain) {
        return res.status(404).send("Mountain not found!");
    }
    foundMountain.name = updatedData.name;
    foundMountain.height = updatedData.height;
    res.send(foundMountain);
});

app.patch("/mountains/:id", (req, res) => {
    const paramsMountainId = Number(req.params.id);
    if (!paramsMountainId) {
        res.send({ error: "The mountain id must be a number!" });
        return;
    }
    const updatedData = req.body;
    const foundMountain = mountains.find((mountain) => mountain.id === paramsMountainId);
    if (!foundMountain) {
        return res.status(404).send("Mountain not found!");
    }
    if (updatedData.name !== undefined) {
        foundMountain.name = updatedData.name;
    }
    if (updatedData.height !== undefined) {
        foundMountain.height = updatedData.height;
    }
    res.send(foundMountain);
});

app.delete("/mountains/:id", (req, res) => {
    const paramsMountainId = Number(req.params.id);
    if (!paramsMountainId) {
        res.send({ error: "The mountain id must be a number!" });
        return;
    }
    const mountainIndex = mountains.findIndex((mountain) => mountain.id === paramsMountainId);
    if (mountainIndex === -1) {
        return res.status(404).send("Mountain not found!");
    }
    const deletedMountain = mountains.splice(mountainIndex, 1).pop();
    res.send(deletedMountain);
});


const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log("Error starting the server: " + error);
        return;
    }
    console.log("Server is running on port: " + PORT);
});