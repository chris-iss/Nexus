const mongoose = require("mongoose");

const bcryptj = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// Hash password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcryptj.hash(this.password, 10);
    next();
});
  
userSchema.methods.comparePassword = async function (password) {
return bcryptj.compare(password, this.password);
};

module.exports = mongoose.model('users', userSchema);
