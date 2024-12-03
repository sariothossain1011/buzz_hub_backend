const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    otp:{
        type:String,
    },
    status:{
        type:Number,
        default:0,
    },
    createDate:{
        type:Date,
        default:Date.now(),
    }
},{versionKey:false});

OTPSchema.virtual("id").get(function () {
    // Use regular function declaration
    return this._id.toHexString();
  });
  OTPSchema.set("toJSON", {
    // Remove virtuals: true
    getters: true, // Use getters option instead
  });

const OTPModel = mongoose.model("OTP",OTPSchema);

module.exports = OTPModel ;