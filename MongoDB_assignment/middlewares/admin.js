const {admin, user} = require("../DB");
// this is also correct
// const {admin} = require("../DB/index");

async function adminMiddleware(req,res,next) {
    const username = req.headers.username;
    const password = req.headers.password;
    admin.findOne({
        username: username,
        password: password
    })
    .then(function(value) {
        if(value) {
            next();
        }else {
            res.status(400).json({
                msg: "Admin doesn't exist"
            })
        }
    })
};

module.exports = adminMiddleware;