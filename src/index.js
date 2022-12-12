const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/school");
const preLoad = require("./InitialData")

const Schema = new mongoose.Schema({
    _id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    currentClass: { type: Number, required: true },
    division: { type: String, required: true }
})

const Students = mongoose.model("data", Schema);
const map = new Map();
for (let i = 0; i < preLoad.length; i++) {
    map.set(preLoad[i].id, 1);
}
const list = Students.insertMany(preLoad);

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here 

app.get("/api/student", async (req, res) => {
    try {
        const students = await Students.find();
        res.status(200).json({
            Student_List: students
        })
    }
    catch {
        res.status(404).json({
            status: "Failed"
        })
    }
})

app.get("/api/student/:id", async (req, res) => {
    try {
        if (map.has(Number(req.params.id)) && map.get(Number(req.params.id)) === 1) {
            const student = await Students.find({ id: req.params.id });
            res.status(200).json({
                Student_Info: student
            })
        }
        else {
            res.status(404).json({
                message: "Invalid ID"
            })
        }
    }
    catch {
        res.status(404).json({
            status: "Failed"
        })
    }
})

app.post("/api/student", async (req, res) => {
    try {
        if (!map.has(Number(req.body.id))) {
            try {
                await Students.create(req.body);
                map.set(Number(req.body.id), 1)
                // res.setHeader({ 'Content-type': 'application/x-www-form-urlencoded' })
                res.status(200).json({
                    message: "Student added successfully"
                })
            }
            catch (e) {
                res.status(400).json({
                    message: e.message
                })
            }
        }
        else {
            res.status(404).json({
                message: "Invalid ID"
            })
        }
    }
    catch {
        res.status(404).json({
            status: "Failed"
        })
    }
})

app.delete("/api/student/:id", async (req, res) => {
    try {
        if (map.has(Number(req.params.id)) && map.get(Number(req.params.id)) === 1) {
            await Students.deleteOne({ id: req.params.id });
            map.set(Number(req.params.id), 0);
            res.status(200).json({
                message: "Student deleted successfully"
            })
        }
        else {
            res.status(404).json({
                message: "Invalid ID"
            })
        }
    }
    catch {
        res.status(404).json({
            status: "Failed"
        })
    }
})

app.put("/api/student/:id", async (req, res) => {
    try {
        if (map.has(Number(req.params.id)) && map.get(Number(req.params.id)) === 1) {
            await Students.updateOne({ id: req.params.id }, { $set: { name: req.body.name, currentClass: req.body.currentClass, division: req.body.division } });
            // res.setHeader({ 'content-type': 'application/x-www-form-urlencoded' })
            res.status(200).json({
                message: "Student details updated successfully"
            })
        }
        else {
            res.status(404).json({
                message: "Invalid ID"
            })
        }
    }
    catch {
        res.status(404).json({
            status: "Failed"
        })
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
