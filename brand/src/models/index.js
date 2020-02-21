const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    brand_name: String,
    created: Number,
    deleted: { type: Boolean, default: false },
    deleted_timestamp: Number,
    updated: { type: Boolean, default: false },
    updated_timestamp: Number,
})


module.exports = mongoose.model("Brand", BrandSchema);