const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, "Enter your first name!"],
    },
    lName: {
      type: String,
      required: [true, "Enter your last name!"],
    },
    phone: {
      type: String,
      required: [true, "Enter your phone number!"],
    },
    email: {
      type: String,
      required: [true, "Enter your e-mail!"],
    },
    password: {
      type: String,
      required: [true, "Enter your password!"],
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.virtual("id").get(function () {
  // Use regular function declaration
  return this._id.toHexString();
});
UserSchema.set("toJSON", {
  // Remove virtuals: true
  getters: true, // Use getters option instead
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
