const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Brand = require('./models')

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ msg: "Brand" });
});

app.post("/brand/create", async (req, res) => {
    let findQuery = { deleted: false, brand_name: req.body.brand_name };
    const brandData = await Brand.findOne(findQuery);
    if (brandData) {
        res.json({ msg: "Sorry brand name alredy exists" });
    } else {
        let brandObj = new Brand({
            brand_name: req.body.brand_name,
            created: Date.now()
        });
        const saveBrand = await brandObj.save();
        res.json(saveBrand);
    }
});

app.get("/brand/list", async (req, res) => {
    let findQuery = { deleted: false };
    const brandData = await Brand.find(findQuery);
    if (brandData) {
        res.json(brandData);
    } else {
        res.json({ msg: "No record found." });
    }
});

app.get("/brand/name", async (req, res) => {
    let findQuery = { deleted: false, brand_name: ReadableStream.body.brand_name };
    const brandData = await Brand.findOne(findQuery);
    if (brandData) {
        res.json(brandData);
    } else {
        res.json({ msg: "No record found." });
    }
});

module.exports = app;