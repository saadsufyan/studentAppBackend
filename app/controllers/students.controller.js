const Student = require('../models/student.model.js');

// Create and Save a new Student form
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        console.log(req.body)
        return res.status(400).send({
            message: "Student form can not be empty"
        });
    }

    // Create a new student
    const student = new Student({

        fristName: req.body.fristName,
        lastName: req.body.lastName,
        rollNo: req.body.rollNo,
        className: req.body.className,
        DOB: req.body.DOB,
        city: req.body.city,
        email: req.body.email,
        phone: req.body.phone
    });

    // Save Student in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Student Form."
        });
    });
};

// Retrieve and return all student from the database.
exports.findAll = (req, res) => {
    Student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single student with a studentId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with this id " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with this id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving student with this id " + req.params.studentId
        });
    });
};

// Update a student identified by the studentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Student form can not be empty"
        });
    }

    // Find Student and update it with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        fristName: req.body.fristName,
        lastName: req.body.lastName,
        rollNo: req.body.rollNo,
        className: req.body.className,
        DOB: req.body.DOB,
        city: req.body.city,
        email: req.body.email,
        phone: req.body.phone
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with this id " + req.params.studentId
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with this id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error updating student with this id " + req.params.studentId
        });
    });
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with this id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with  this id " + req.params.studentId
        });
    });
};