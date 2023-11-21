const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  status: Boolean,
})

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});  

let model=mongoose.model('User',userSchema);


// async  function db(){
//   console.log("started");
// result = await model.find({email:'dileep@mail.com'}).exec(); 
// console.log("ended");
// console.log(result)
// }


module.exports =model;