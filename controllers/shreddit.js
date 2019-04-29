const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Plan = require('../models/plan');
const Workout = require('../models/workout');
const Activities = require('../models/activities')


router.post('/', async (req, res, next) => {
	try{
			const createdPlan = await Plan.create(req.body)

			const prefs = [] 
				if(req.body.weights === 'on'){
					prefs.push('weights')
				}
				if(req.body.plyos === 'on'){
					prefs.push('plyos')
				}
				if(req.body.cardio === 'on'){
					prefs.push('cardio')
				}
			console.log(req.body);
			const howManyActivitiesYouWant = req.body.selectitem;
			const workoutDays = []
			const startDate = new Date(req.body.startDate)
			const allDays = [startDate]
			// creating an array of all days for the next 4 weeks
			for(let i = 0; i < 27; i++){
				// create the next date object -- 1 day after the last element in allDays
				const newDate = new Date(allDays[i].getTime() + (24 * 60 * 60 * 1000))
				allDays.push(newDate)
			}
			
			

			for(let i = 0; i < allDays.length; i++){
					if(allDays[i].getDay() === 1 || allDays[i].getDay() === 3 || allDays[i]
					.getDay() === 5) {
						// create a new blank workout
						const newWorkout = new Workout
						// build the workout
						for(let i = 0; i < howManyActivitiesYouWant; i++) { 
							// use modulo, i, and prefs.length (HINT HINT) to programmatically cycle thru prefs
							// this is the type
				
							// print the type of activity we should be generating
							const typeOfActivity = prefs[i % prefs.length]
							// console.log(typeOfActivity)
							// const dayActivity = await Activities.find({name:typeOfActivity})
							const activitiesOfType = await Activities.find({type:typeOfActivity})
							//console.log("activities of type " + typeOfActivity)
							//console.log(activitiesOfType)
							// once it correctly cycles thru -- and no sooner -- get a random activity for the type
				
							const randomActivityNumber = Math.floor(Math.random() * (activitiesOfType.length));
							
							newWorkout.activities.push(activitiesOfType[randomActivityNumber])
						
						} // end of for loop that adds activities to workout
						createdPlan.workouts.push(newWorkout)
				} // end of if its MWF

			} // end of looping over days



			await createdPlan.save()
			console.log("\n here is the createdPlan")
			console.log(createdPlan)

			
		

			// create the plan		

			// figure out what days the workouts should be
			/// this could be up to 20 lines of code

			// store those days in an array

			// loop over array of dates. in the loop:

			// convert this to array of date objects
		
			// figure out all the types of workouts the user wants req.body
			

			// put those types in an array
			// console.log("------------------------");

			
		
	

		

	
		

		

			


		//workout.// 	res.render('index.ejs', {
		// 		plan: createdPlan
		// 	})

		// 	})
		// }
			
		 res.send('check terminal')
		}catch(err){
		next(err)
	}
})





router.get('/select-plan', (req, res) => {
	res.render('selectPlan.ejs')
})


router.get('/seed', async (req, res, next) => {
	
	const activities = [
		//cardio
		{
			type: "cardio",
			duration: "30 minute",
			quantity: null,
			name: "Run"
		},
		{
			type: "cardio",
			duration: "1 hr 30 minute",
			quantity: null, 
			name: "Bikeride"
		},
		{
			type: "cardio",
			duration: "1 hr 30 minute",
			quantity: null, 
			name: "Elipitcal"
		},
		//plyo
		{
			type: "plyo",
			duration: null,
			quantity: 50,
			name: "Burpies"
		},
		{
			type: "plyo",
			duration: null,
			quantity: 50,
			name: "Jumping Jacks"
		},
		{
			type: "plyo",
			duration: null,
			quantity: 50,
			name: "Super Mans"
		},
		//weights
		{
			type: "weights",
			duration: null,
			quantity: 50,
			name: "Bench Press"
		},
		{
			type: "weights",
			duration: null,
			quantity: 50,
			name: "Bicep Curls"
		},
		{
			type: "weights",
			duration: null,
			quantity: 50,
			name: "Sqaut"
		},
		
	]
		

	await Activities.create(activities)
  res.send('now there\'s some data')
})


module.exports = router;