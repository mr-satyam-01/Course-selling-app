const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const { UserModel, AdminModel, CourseModel, PurchaseModel } = require("./routes/db");
require("dotenv").config();

async function main() {
    try {
        await mongoose.connect(process.env.connection_string).then(() => console.log("DB conneected"))
    }
    catch (err) {
        console.log(err)
    };
};
main();

const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

console.log(process.env.connection_string);


app.listen(3000, ()=>{
    console.log("server running on port 3000")
});