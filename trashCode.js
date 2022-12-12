
// Using Set

// const express = require('express')
// const app = express()
// const bodyParser = require("body-parser");
// const port = 8080
// app.use(express.urlencoded());
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/school");
// const preLoad = require("./InitialData")

// const Schema = new mongoose.Schema({
//     id: { type: Number, unique: true, required: true},
//     name: { type: String, required: true },
//     currentClass: { type: Number, required: true },
//     division: { type: String, required: true }
// }) 

// const Students = mongoose.model("data", Schema);
// const set = new Set(); 
// for (let i = 0; i < preLoad.length; i++) {
//     set.add(preLoad[i].id);
// }
// // const list = Students.insertMany(preLoad); 

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// // your code goes here 

// app.get("/api/student", async (req, res) => {
//     try {
//         const students = await Students.find();
//         res.status(200).json({
//             Student_List: students
//         })
//     }
//     catch {
//         res.status(404).json({
//             status: "Failed"
//         })
//     }
// })

// app.get("/api/student/:id", async (req, res) => {
//     try {
//         if (set.has(Number(req.params.id))) {
//             const student = await Students.find({ id: req.params.id });
//             if (student.length === 0) {
//                 res.status(404).json({
//                     message: "This student ID was deleted"
//                 })
//             }
//             else {
//                 res.status(200).json({
//                     Student_Info: student
//                 })
//             }
//         }
//         else {
//             res.status(404).json({
//                 message: "Invalid ID"
//             })
//         }
//     }
//     catch {
//         res.status(404).json({
//             status: "Failed"
//         })
//     }
// })

// app.post("/api/student", async (req, res) => {
//     try {
//         if (!set.has(Number(req.body.id))) {
//             try {
//                 await Students.create(req.body);
//                 set.add(Number(req.body.id))
//                 // res.setHeader({ 'Content-type': 'application/x-www-form-urlencoded' })
//                 res.status(200).json({
//                     message: "Student added successfully"
//                 })
//             }
//             catch (e) { 
//                 res.status(400).json({
//                     message: e.message 
//                 })
//             }
//         }
//         else {
//             res.status(404).json({
//                 message: "Invalid ID"
//             })
//         }
//     }
//     catch {
//         res.status(404).json({
//             status: "Failed"
//         })
//     }
// })

// app.delete("/api/student/:id", async (req, res) => {
//     try {
//         if (set.has(Number(req.params.id))) {
//             await Students.deleteOne({ id: req.params.id });
//             res.status(200).json({
//                 message: "Student deleted successfully"
//             })
//         }
//         else {
//             res.status(404).json({
//                 message: "Invalid ID"
//             })
//         }
//     }
//     catch {
//         res.status(404).json({
//             status: "Failed"
//         })
//     }
// })

// app.put("/api/student/:id", async (req, res) => {
//     try {
//         if (set.has(Number(req.params.id))) {
//             if (await Students.find({ id: req.params.id }).length === 0){
//                 res.status(404).json({
//                     message: "This student was deleted. Cannot perform operation"
//                 })
//             }
//             else{
//                 await Students.updateOne({ id: req.params.id }, { $set: { name: req.body.name, currentClass: req.body.currentClass, division: req.body.division } });
//                 // res.setHeader({ 'content-type': 'application/x-www-form-urlencoded' })
//                 res.status(200).json({
//                     message: "Student details updated successfully"
//                 })
//             }
//         }
//         else {
//             res.status(404).json({
//                 message: "Invalid ID"
//             })
//         }
//     }
//     catch {
//         res.status(404).json({
//             status: "Failed"
//         })
//     }
// })


// app.listen(port, () => console.log(`App listening on port ${port}!`))

// module.exports = app;     