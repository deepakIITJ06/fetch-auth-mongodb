const express = require("express");
const router = express.Router();
const {user, course} = require("../DB");
const userMiddleware = require("../middlewares/user");

router.post("/signup", async function(req, res) {
    // Add your signup logic here
    const username = req.body.username;
    const password = req.body.password;

    await user.create({
        username: username,
        password: password
    })
    res.json({
        msg: "User created"
    })
});

router.get("/courses", async (req, res) => {
    // Implement listing all courses logic
    const courses_available = await course.find({});
    res.json({
        courses_available
    })
});

router.post("/courses/:courseId", userMiddleware,async (req,res)=>{
    const username = req.body.username;
    const courseId = req.params.courseId;
    try{
        await user.updateOne({
            username: username,
        },{
            "$push": {
                purchasedCourses: courseId
            }
        })
    } catch(e){
        console.log(e);
    }
    res.json({
        msg: "purchase completed !"
    })
});

module.exports = router;