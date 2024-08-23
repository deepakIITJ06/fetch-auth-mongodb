const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kumar303:7CYJJIZIH1B6kQ2S@cluster0.f4gjk9s.mongodb.net/");
// here 👆🏻 you can put the name of your folder in mongodb too, puting name at the end

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    }]
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number,
});

const admin = mongoose.model("admin",adminSchema);
const user = mongoose.model("user",userSchema);
const course = mongoose.model("course",courseSchema);

// exporting syntax --> so that we can use these ones in other files too
module.exports = {
    admin,
    user,
    course
}