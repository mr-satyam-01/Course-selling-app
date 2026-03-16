const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const User = new schema({
    Name: String,
    Email: { type: String, unique: true },
    Password: String
});

const Admin = new schema({
    Name: String,
    Email: { type: String, unique: true },
    Password: String
});

const Course = new schema({
    Name: String,
    Description: String,
    Duration: String,
    Price: String,
    Content: [String],
    CreatorId: ObjectId
});

const Purchase = new schema({
    userId: ObjectId,
    courseId: ObjectId

});

const UserModel = mongoose.model('User', User);
const AdminModel = mongoose.model('Admin', Admin);
const CourseModel = mongoose.model('Course', Course);
const PurchaseModel = mongoose.model('Purchase', Purchase);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
};