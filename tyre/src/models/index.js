const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    tyre_id: String,
    tyre_name: String,
    brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'brands', require: true },
    size:Number,
    profile:Number,
    rim:Number,
    price:Number,
    availability:[],
    created: Number,
    deleted: { type: Boolean, default: false },
    deleted_timestamp: Number,
    updated: { type: Boolean, default: false },
    updated_timestamp: Number,
})

module.exports = mongoose.model("Brand", BrandSchema);