const {user} = require("../DB");

async function userMiddleware(req,res,next) {
    const username = req.headers.username;
    const password = req.headers.password;
    user.findOne({
        username: username,
        password: password
    })
    .then(function(value) {
        if(value) {
            next();
        }else {
            res.status(400).json({
                msg: "User doesn't exist"
            })
        }
    })
};

module.exports = userMiddleware;