const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    itemName: {
      type: String,
      required: true
    },
    itemVariant:{
      type: String,
      required: true
    },
    orderDate:{
       type: Date,
       required: true,
       default: Date.now
    }
})

module.exports = mongoose.model('Item', itemSchema)