const app = require('./src/app');
const { DB_URI } = require('./src/config');
const mongoose = require('mongoose');
console.log("DB_URI", typeof DB_URI, DB_URI)
mongoose.connect(DB_URI, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('mongo connection err', err);
    } else {
        console.log('database connected');
    }
});
// mongoose.connect(DB_URL);

app.listen(3000, () => {
    console.log("Running on port 3000");
    console.log("----------------------");
});