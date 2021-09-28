const router = require('express').Router();
const db = require('../models');

router.get("/api/workouts", async (req, res) => {
  try {
    const response = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {$sum:"$exercises.duration"}
       }
      }
    ]);
    
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
 
});

router.put("/api/workouts/:id", async ( req  , res) => {

  try {
    const response = await db.Workout.updateOne( 
      {
        _id: req.params.id
      },
      { 
        $push: { 
          exercises :   req.body 
        } 
      }, 
    );
  
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/api/workouts", async ({ body }, res) => {
  try {
    const response = await db.Workout.create({body});
    
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
  
});

router.get("/api/workouts/range", async (req, res) => {
  try {
    const response = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {$sum:"$exercises.duration"}
       }
      }
    ]);
    
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
  
});

module.exports = router;