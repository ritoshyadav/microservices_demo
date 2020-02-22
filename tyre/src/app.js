const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Tyre = require('./models')
const axios = require('axios');
var formidable = require('formidable');
var fs = require('fs');
var XLSX = require('xlsx');

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ msg: "Tyre" });
});

app.post("/tyre/create", async (req, res) => {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true; //keep file extension
    form.uploadDir = process.env.PWD + '/uploads';
    form.multiples = true;
    form.encoding = 'binary';

    form.parse(req, function (err, fields, files) {
        console.log(err, fields, "11111111111111111", files)
        var workbook = XLSX.readFile(files.file.path);
        var sheet_name_list = workbook.SheetNames;

        var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        if (data.length === 0) {
            next(true, {
                "success": "200",
                "status": false,
                "msg": "No data found in excel sheet"
            });
        } else {

            data.reduce((obj, item) => {
                axios.get("http://localhost:3000/brand/" + item.brand_name).then((response) => {
                    console.log("brand data", response);
                })
            }, [])
            // data.forEach(async function (item) {
            // 	console.log("otem.fdfsdfsd",item)
            // 	let newItem = {};
            // 	item['Beacon Name'] ? newItem['name'] = item['Beacon Name'] : '';
            // 	item['Zone Type'] ? newItem['area_type'] = item['Zone Type'] : '';
            // 	item['Major'] ? newItem['major'] = item['Major'] : '';
            // 	item['Minor'] ? newItem['minor'] = item['Minor'] : '';
            // 	item['Acceptable Range'] ? newItem['acceptable_range'] = item['Acceptable Range'] : '';
            // 	item['Beacon Id'] ? newItem['Beacon_ID'] = item['Beacon Id'] : '';
            // 	newItem['beacon_type'] = 'location';
            // 	newItem['protocol'] = 'ibeacon';
            // 	newItem['organization'] = fields.organization;
            // 	newItem['facility'] = fields.facility;
            // 	newItem['uuid'] = uuid;
            // 	newItem['floor'] = fields.floor;
            // 	newItem['sector'] = fields.sector;

            // 	arr.push(newItem)
            // })
            // console.log("aaaaaaaaaaaaa",arr)
            // setTimeout(function () {
            // 	if (arr.length && arr[0].name) {

            // 		db['WHC100'].beacons.insertMany(arr, function (err1, _beacon) {
            // 			console.log("eeeeeeeeeeeeeeeeeee",err1)
            // 			if (err1) {
            // 				if (err1.errors && err1.errors.acceptable_range) {
            // 					next(true, {
            // 						status: false,
            // 						type: 'success',
            // 						msg: 'Acceptable Range cannot be string'
            // 					});
            // 				}else{
            // 					next(true, {
            // 						status: false,
            // 						type: 'success',
            // 						msg: 'One or two beacons is added with the same name'
            // 					});
            // 				}
            // 			} else {
            // 				fs.unlink(files.file.path, function (err) {
            // 					if (err) {
            // 						console.log('err---->', err);
            // 						next(true, {
            // 							status: false,
            // 							type: 'failure',
            // 							msg: 'Failed to upload beacons'
            // 						});
            // 					} else {
            // 						console.log('eruoplaoded successfullly')
            // 						next(true, {
            // 							status: "200",
            // 							type: 'success',
            // 							msg: "Beacons uploaded successfully"
            // 						});
            // 					}
            // 				})
            // 			}
            // 		});
            // 	}else{
            // 		next(true, {
            // 			"success": "200",
            // 			"status": false,
            // 			"msg": "Use sample data to upload beacons"
            // 		});
            // 	}
            // }, 2000);
        }
    });

    // let findQuery = { deleted: false, tyre_name: req.body.tyre_name };
    // const tyreData = await Tyre.findOne(findQuery);
    // if (tyreData) {
    //     res.json({ msg: "Sorry tyre name alredy exists" });
    // } else {
    //     let tyreObj = new Tyre({
    //         tyre_id: req.body.tyre_id,
    //         tyre_name: req.body.tyre_name,
    //         brand_id: req.body.brand_id,
    //         size: req.body.size,
    //         profile: req.body.profile,
    //         rim: req.body.rim,
    //         price: req.body.price,
    //         availability: req.body.availability,
    //         created: Date.now()
    //     });
    //     const saveTyre = await tyreObj.save();
    //     res.json(saveTyre);
    // }
});

app.get("/tyre/list", async (req, res) => {
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