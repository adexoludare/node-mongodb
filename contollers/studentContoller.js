const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require("../models/student.model");

router.get('/', (req, res) => {
    res.render("student/addOrEdit", {
        viewTitle: "Insert Student"
    })
})

router.post('/', (req, res) => {
    // console.log("Request Body: ", req.body)
    if (req.body._id == "") {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    const student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;
    student.save()
            .then(() => res.redirect("student/list"))
            .catch(err => {
                console.log("Error during insert ".concat(err));
                res.status(500).send("Error during insert");
            })   
}

function updateRecord(req, res) {
    Student.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
            .then(doc => {
                console.log(req.body.id)
                if (doc) {
                    res.redirect("student/list");
                } else {
                    console.log("Record not found for update");
                    res.status(404).send("Record not found for update")
                }
            })
            .catch(err => {
                console.log("Error during update: ", err);
                res.status(500).send("Error during update");
            })};


router.get('/list', (req, res) => {
    Student.find().exec()
        .then(docs => {
            res.render("student/list", {
                list: docs,
            });
        })
        .catch(err => {
            console.log("Error in retrieval:", err);
            res.status(500).send("Error in retrieval");
        });
});


router.get('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then(doc => {
            res.render("student/addOrEdit", {
                viewTitle: "Update Student",
                student: doc
            })
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/delete/:id', async (req, res) => {
    try {
        // Find and delete the specified record
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        if (deletedStudent) {
            // Find the latest record after deletion
            const latestStudent = await Student.findOne().sort({ _id: -1 });

            // Redirect to the latest student list record
            if (latestStudent) {
                //res.redirect(`/student/${latestStudent._id}`);
                res.redirect("/student/list");
            } else {
                console.log("No records found after deletion");
                res.status(404).send("No records found after deletion");
            }
        } else {
            console.log("Record not found for deletion");
            res.status(404).send("Record not found for deletion");
        }
    } catch (err) {
        console.log("Error in deletion: ", err);
        res.status(500).send("Error in deletion");
    }
});

module.exports = router