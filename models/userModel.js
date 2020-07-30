// Utilities
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
    },
    passwordChangedAt: Date,
    date: {
      type: Date,
      default: Date.now(),
    },
    account: {
      type: mongoose.Schema.ObjectId,
      ref: "Account",
    },
  }
);

//////////////////////
// Virtual Properties

// userSchema.virtual('account_history', {
//   ref: "Transaction",
//   localField: "_id",
//   foreignField: "customer_id",
//   justOne: false
// })

///////////////////////
// Document Middleware

// Pre-Save Password Encryption
userSchema.pre("save", async function (next) {
  // If password isn't modified, continue
  if (!this.isModified("password")) return next();

  // If password IS modified, encrypt
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

////////////////////
// Instance Methods

// bcrypt Password Comparison
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
