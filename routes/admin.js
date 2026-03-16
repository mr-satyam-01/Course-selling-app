const { Router } = require("express");
const adminRouter = Router();
const { UserModel, AdminModel, CourseModel, PurchaseModel } = require("./db");
const { z } = require("zod");                       // It is used to validate the user input
const bcrypt = require("bcrypt");                   // It is used to hash the password
const jwt = require("jsonwebtoken");
const { AdminMiddleware } = require("./MIddleware/admin");

//--------------------------------------------------------------------------------------------------------------------------------------------
adminRouter.post("/signup", async (req, res) => {
    const adminDetails = z.object({
        email: z.string().min().max(),
        password: z.string().min().max(),
        name: z.string().min().max()
    });

    const parseData = await adminDetails.safeParseAsync(req.body);
    if (!parseData) {
        res.json({
            msg: "incorrect format"
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);

        await AdminModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });
    }
    catch (e) {
        res.json({
            msg: "Admin already exits"
        })
    }
    res.json({
        msg: "Admin successfully signed up"
    })
});

//--------------------------------------------------------------------------------------------------------------------------------------------
adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const admin = await AdminModel.find({
        email: email,
        password: password
    });
    if (admin) {
        const token = jwt.sign({ id: admin._id }, JWT_SECRET_admin);

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
adminRouter.post("/create-course", AdminMiddleware, async (req, res) => {

    const { Title, description, price, duration } = req.body;
    await CourseModel.create({
        Name: Title,
        Description: description,
        Duration: duration,
        Price: price,
        CreatorId: req.adminId
    });
    res.json({
        msg: "course created successfully"
    })

});

//--------------------------------------------------------------------------------------------------------------------------------------------
adminRouter.post("/delete-course", AdminMiddleware, async (req, res) => {

    const { courseId } = req.body;
    await CourseModel.deleteOne({
        _id: courseId,
        CreatorId: req.adminId
    });
    res.json({
        msg: "course deleted successfully"
    })
});

//--------------------------------------------------------------------------------------------------------------------------------------------
adminRouter.put("/add-course-content", AdminMiddleware, async (req, res) => {
    const { courseId, content } = req.body;
    const course = await CourseModel.updateOne({
        _id: courseId,
        CreatorId: req.adminId
    })
    if (!course) {
        res.status(403).json({
            msg: "The course is not found"
        });
    }

    course.Content.push(content);
    await course.save();

    res.json({
        msg: "course added successfully"
    })
});

//--------------------------------------------------------------------------------------------------------------------------------------------
module.exports = {
    adminRouter: adminRouter
};