const { Router } = require("express");
const courseRouter = Router();
const { CourseModel } = require("./db");


courseRouter.get("/course/preview", (req, res) => {

});

courseRouter.get("/course/purchases", (req, res) => {

});

module.exports = {
    courseRouter: courseRouter
};