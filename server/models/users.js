const mongoose = require('mongoose');

module.exports = mongoose.model('Reg', {
    name: {type: String},
    nick_name: {type: String},
    phone: {type: String},
    pass: {type: String},
    updated_date: {type: Date, default: Date.now}
});