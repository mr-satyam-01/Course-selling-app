const { Router } = require("express");
const userRouter = Router();
const { UserModel, PurchaseModel } = require("./db")
const { z } = require("zod");                       // It is used to validate the user input
const bcrypt = require("bcrypt");                   // It is used to hash the password
const jwt = require("jsonwebtoken");
const { UserMiddleware } = require("./MIddleware/user");
const JWT_SECRET_user = process.env.JWT_SECRET_user;
//--------------------------------------------------------------------------------------------------------------------------------------------
userRouter.post("/signup", async (req, res) => {
    const userDetails = z.object({
        email: z.string(),
        password: z.string(),
        name: z.string()
    });

    const parseData = await userDetails.safeParseAsync(req.body);
    if (!parseData.success) {
        res.json({
            msg: "incorrect format"
        })
    }
    const { email, password, name } = parseData.data;
        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);

        await UserModel.create({
            Email: email,
            Password: hashedPassword,
            Name: name
        })
    
    
    res.json({
        msg: "User successfully signed up"
    })
});

//--------------------------------------------------------------------------------------------------------------------------------------------
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
        email: email,
        password: password
    });
    if (user) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET_user);

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            msg: "Incorrect credentials "
        })
    }
});


//--------------------------------------------------------------------------------------------------------------------------------------------
userRouter.post("/purchases", UserMiddleware, async (req, res) => {
    const { courseId } = req.body;
    const purchases = await PurchaseModel.find({
        userId: req.userId
    });

    res.json({
        purchases: purchases
    });
});


//--------------------------------------------------------------------------------------------------------------------------------------------
module.exports = {
    userRouter: userRouter
};