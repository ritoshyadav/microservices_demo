const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Tyre = require('./models')

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ msg: "Tyre" });
});

app.post("/tyre/create", async (req, res) => {
    let findQuery = { deleted: false, tyre_name: req.body.tyre_name };
    const tyreData = await Tyre.findOne(findQuery);
    if (tyreData) {
        res.json({ msg: "Sorry tyre name alredy exists" });
    } else {
        let tyreObj = new Tyre({
            tyre_id: req.body.tyre_id,
            tyre_name: req.body.tyre_name,
            brand_id: req.body.brand_id,
            size: req.body.size,
            profile: req.body.profile,
            rim: req.body.rim,
            price: req.body.price,
            availability: req.body.availability,
            created: Date.now()
        });
        const saveTyre = await tyreObj.save();
        res.json(saveTyre);
    }
});

app.get("/brand/list", async (req, res) => {
    let findQuery = { deleted: false };
    const tyreData = await Tyre.find(findQuery);
    if (tyreData) {
        res.json(tyreData);
    } else {
        res.json({ msg: "No record found." });
    }
});

// app.get("/tyre/name", async (req, res) => {
//     let findQuery = { deleted: false, brand_name: ReadableStream.body.brand_name };
//     const brandData = await Brand.findOne(findQuery);
//     if (brandData) {
//         res.json(brandData);
//     } else {
//         res.json({ msg: "No record found." });
//     }
// });

module.exports = app;