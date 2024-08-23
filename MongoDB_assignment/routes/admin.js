const { Router } = require("express");
const adminMiddleware = require("../middlewares/admin");
const users = require("..");
const { admin,course } = require("../DB");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // creating the user
    admin.create({
        username: username,
        password: password
    }).then(function(value) {
        res.json({
            msg: "Admin already exist"
        })
    })
    .catch(function() {
        res.status(200).json({
            msg: "admin added"
        })
    });
});

router.post("/courses", adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const mycourse = await course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        msg: "course created successfully",
        courseId: mycourse._id
    })
});

router.get("/courses", adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const all_courses = await course.find({});
    res.json({
        all_courses
    })
});

module.exports = router;