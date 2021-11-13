const express = require("express");
const mongoose = require("mongoose");
const db = require("./models")
const path = require("path")

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb+srv://emilyelizabethdaniel:4xkbL3Z8YMmH-UF@cluster0.ye2wb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"|| "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

var ObjectId = require('mongodb').ObjectId;

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"))
});

app.get("/stats", (req, res)=> {
    res.sendFile(path.join(__dirname + "/public/stats.html"))
})

app.post("/api/stats", (req, res) => {
    db.Workout.find()
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find()
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
})
// to do
app.get("/api/workouts/range", (req, res) => {
    // db.Workout.find()
    //     .then(dbWorkout => {
    //         console.log(dbWorkout)
    //         res.json(dbWorkout);
    //     })
    //     .catch(err => {
    //         res.json(err);
    //     });
    const aggregate = Workout.aggregate([
        
    ])
})

app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
})

app.put("/api/workouts/:id", ({ params }, res) => {
    db.Workout.updateOne({
            _id: ObjectId(params.id)
        }, {
            $set: {
                ifRead: true
            }
        },

        (error, edited) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(edited);
                res.send(edited);
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});