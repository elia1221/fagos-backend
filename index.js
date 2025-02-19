const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(require("cors")());

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connesso"))
    .catch(err => console.error("Errore DB:", err));

// Endpoint per il menu
const menuSchema = new mongoose.Schema({ name: String, price: Number, description: String });
const MenuItem = mongoose.model("MenuItem", menuSchema);

app.get("/menu", async (req, res) => {
    const menu = await MenuItem.find();
    res.json(menu);
});

app.listen(3001, () => console.log("Server avviato su porta 3001"));