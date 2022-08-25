const express = require("express");
const languages = express.Router();
const Language = require("../models/language.js");
const languageSeed = require("../models/language-seed.js");

//GET languages/seed
languages.get("/seed", async (req, res) => {
    await Language.insertMany(languageSeed);
    res.json({
        message: "Seed successful"
    });
});

//GET /languages
languages.get("/", async (req, res) => {
    const foundLanguages = await Language.find();
    res.json(foundLanguages);
});

//GET /languages/random
languages.get("/random", async (req, res) => {
    const foundLanguages = await Language.find();
    const randomLanguage = Math.floor(Math.random() * foundLanguages.length);
    res.json(foundLanguages[randomLanguage]);
})

//GET /languages/:name
languages.get("/:name", async (req, res) => {
    const foundLanguage = await Language.findOne({ name: req.params.name.toLowerCase() });
    res.json(foundLanguage);
});

module.exports = languages;