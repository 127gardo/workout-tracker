document.addEventListener("DOMContentLoaded", () => {
  // One-time cleanup: remove any object-based exercises mistakenly saved
  ["Back and Biceps", "Chest and Triceps", "Legs and Abs"].forEach((group) => {
    const key = `custom-${group}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    const filtered = saved.filter((e) => typeof e === "string");
    if (filtered.length !== saved.length) {
      localStorage.setItem(key, JSON.stringify(filtered));
    }
  });

  // For index.html (Workout selection buttons)
  const backBtn = document.getElementById("backbtn");
  const chestBtn = document.getElementById("chestbtn");
  const legsBtn = document.getElementById("legsbtn");

  // localStorage is a javascript object. It lets your website save data between page loads. If a user selects "Back and Biceps" on one page, you can still access that selection on another page (like the workout page)

  if (backBtn && chestBtn && legsBtn) {
    backBtn.onclick = () => {
      //localStorage.setItem(key, value) muscleGroup is a "key" here (Not a variable yet. It becomes a variable later with "const"), similar to a label or folder name for storing data. "Back and Bicep is what is stored inside."
      localStorage.setItem("muscleGroup", "Back and Biceps");
    };
    chestBtn.onclick = () => {
      localStorage.setItem("muscleGroup", "Chest and Triceps");
    };
    legsBtn.onclick = () => {
      localStorage.setItem("muscleGroup", "Legs and Abs");
    };
  }

  // For workout list
  // Get references to the input fields and button
  const exerciseInput = document.getElementById("exercise");
  const repsInput = document.getElementById("reps");
  const setsInput = document.getElementById("sets");
  const addWorkoutBtn = document.getElementById("addWorkoutBtn");
  const workoutList = document.getElementById("workoutList");
  const defaultExercises = {
    "Back and Biceps": [
      "Hammer Curls",
      "Bicep Curls",
      "Bicep Windmills",
      "Pull Ups",
      "Barbell Row",
      "Kneeling Row",
      "Lat Pulldowns",
      "Shoulder Pump",
      "Cable Shrugs",
      "Cable Row,",
    ],
    "Chest and Triceps": [
      "Bench Press",
      "Incline Dumbbell Press",
      "Cable Tricep Pulldowns",
      "Cable Chest Flys",
      "Skullcrushers",
      "Standing Chest Press",
    ],
    "Legs and Abs": [
      "Squats",
      "Leg Press",
      "Calf Raises",
      "Goblet Squats",
      "Lunges",
      "Side Lunges",
      "Bulgarian Lunges",
      "Sit Ups",
      "Decline Sit Ups",
      "Russian Twists",
    ],
  };

  // For workoutpage.html (display muscle group)
  const exerciseSelect = document.getElementById("exerciseSelect");

  function loadExercises(group) {
    exerciseSelect.innerHTML =
      "<option value=''>Select or enter your own</option>"; //Clear old options

    // Load from default list
    const exercises = defaultExercises[group] || [];

    exercises.forEach((exercise) => {
      const option = document.createElement("option");
      option.value = exercise;
      option.textContent = exercise;
      exerciseSelect.appendChild(option);
    });

    //Load any custom saved exercises for this group
    const customExercises =
      JSON.parse(localStorage.getItem(`custom-${group}`)) || [];
    customExercises.forEach((exercise) => {
      const option = document.createElement("option");
      option.value = exercise;
      option.textContent = exercise + " (Custom)";
      exerciseSelect.appendChild(option);
    });
  }

  const targetMuscles = document.getElementById("targetMuscles");
  if (targetMuscles) {
    const group = localStorage.getItem("muscleGroup");

    targetMuscles.textContent = group || "Choose a workout"; // basically says if "group" has a value (is not null or undefined), show that. Otherwise, show "Choose a workout".
    loadExercises(group); // Load exercises into the dropdown
  }

  // Lets the user select from the dropdown and auto-fill the input box with that value.
  exerciseSelect.addEventListener("change", () => {
    exerciseInput.value = exerciseSelect.value;
  });

  // Initialize an empty array to store workouts
  let workouts = [];

  // Event listener for the button click
  addWorkoutBtn.addEventListener("click", () => {
    // Get the user input values
    const exercise = exerciseInput.value;
    const reps = repsInput.value;
    const sets = setsInput.value;

    // Check if the input values are valid (not empty)
    if (exercise && reps && sets) {
      // Create a new workout object and push it to the array
      const newWorkout = { exercise, reps, sets };
      workouts.push(newWorkout);

      // Clear the input fields after submission
      exerciseInput.value = "";
      repsInput.value = "";
      setsInput.value = "";

      // Update the displayed list of workouts
      displayWorkouts();

      // Add the manually entered exercise to the dropdown if not already present

      // Array.from creates a new array from an array-like or iterable object. In this case, Array.from(exerciseSelect.options) converts the options property of the <select> dropdown (which is a collection of <option> elements) into a real array that can be worked with. The ! is a logical NOT operator.

      //.some((opt) => opt.value === exercise) checks if any of the options have the value that matches the manually entered exercise.

      //!: If .some() returns true (meaning there is an option with the same value as the manually entered exercise), the ! flips it to false, indicating that the exercise should not be added again. Conversely, if .some() returns false (meaning the exercise is not already in the dropdown), the ! flips it to true, indicating the exercise can be added.
      const group = localStorage.getItem("muscleGroup");
      if (
        exercise &&
        !Array.from(exerciseSelect.options).some(
          (opt) => opt.value === exercise
        )
      ) {
        const newOption = document.createElement("option");
        newOption.value = exercise;
        newOption.textContent = exercise;
        exerciseSelect.appendChild(newOption);

        // Save it to localStorage so it's available next time
        const customKey = `custom-${group}`;
        const saved = JSON.parse(localStorage.getItem(customKey)) || [];
        saved.push(exercise);
        localStorage.setItem(customKey, JSON.stringify(saved));
      }
    } else {
      alert("Please fill in all fields.");
    }
  });

  // Function to display workouts in the <ul> element
  function displayWorkouts() {
    workoutList.innerHTML = ""; // Clear the existing list

    // Loop through each workout and create a list item
    workouts.forEach((workout) => {
      const li = document.createElement("li");
      li.textContent = `${workout.exercise} - ${workout.reps} reps, ${workout.sets} sets`;
      workoutList.appendChild(li);
    });
  }
});

// // Add an event listener to the "Clear Custom Exercises" button
// document
//   .getElementById("clearCustomExercisesBtn")
//   .addEventListener("click", () => {
//     const group = localStorage.getItem("muscleGroup"); // Get the current muscle group
//     if (group) {
//       clearCustomExercises(group); // Clear custom exercises for the current group
//     } else {
//       alert("Please select a muscle group first.");
//     }
//   });

document.addEventListener("DOMContentLoaded", () => {
  // One-time cleanup: remove any object-based exercises mistakenly saved
  ["Back and Biceps", "Chest and Triceps", "Legs and Abs"].forEach((group) => {
    const key = `custom-${group}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    const filtered = saved.filter((e) => typeof e === "string");
    if (filtered.length !== saved.length) {
      localStorage.setItem(key, JSON.stringify(filtered));
    }
  });

  // For index.html (Workout selection buttons)
  const backBtn = document.getElementById("backbtn");
  const chestBtn = document.getElementById("chestbtn");
  const legsBtn = document.getElementById("legsbtn");

  // localStorage is a javascript object. It lets your website save data between page loads. If a user selects "Back and Biceps" on one page, you can still access that selection on another page (like the workout page)

  if (backBtn && chestBtn && legsBtn) {
    backBtn.onclick = () => {
      //localStorage.setItem(key, value) muscleGroup is a "key" here (Not a variable yet. It becomes a variable later with "const"), similar to a label or folder name for storing data. "Back and Bicep is what is stored inside."
      localStorage.setItem("muscleGroup", "Back and Biceps");
    };
    chestBtn.onclick = () => {
      localStorage.setItem("muscleGroup", "Chest and Triceps");
    };
    legsBtn.onclick = () => {
      localStorage.setItem("muscleGroup", "Legs and Abs");
    };
  }

  // For workout list
  // Get references to the input fields and button
  const exerciseInput = document.getElementById("exercise");
  const repsInput = document.getElementById("reps");
  const setsInput = document.getElementById("sets");
  const addWorkoutBtn = document.getElementById("addWorkoutBtn");
  const workoutList = document.getElementById("workoutList");
  const defaultExercises = {
    "Back and Biceps": [
      "Hammer Curls",
      "Bicep Curls",
      "Bicep Windmills",
      "Pull Ups",
      "Barbell Row",
      "Kneeling Row",
      "Lat Pulldowns",
      "Shoulder Pump",
      "Cable Shrugs",
      "Cable Row,",
    ],
    "Chest and Triceps": [
      "Bench Press",
      "Incline Dumbbell Press",
      "Cable Tricep Pulldowns",
      "Cable Chest Flys",
      "Skullcrushers",
      "Standing Chest Press",
    ],
    "Legs and Abs": [
      "Squats",
      "Leg Press",
      "Calf Raises",
      "Goblet Squats",
      "Lunges",
      "Side Lunges",
      "Bulgarian Lunges",
      "Sit Ups",
      "Decline Sit Ups",
      "Russian Twists",
    ],
  };

  // For workoutpage.html (display muscle group)
  const exerciseSelect = document.getElementById("exerciseSelect");

  function loadExercises(group) {
    exerciseSelect.innerHTML =
      "<option value=''>Select or enter your own below</option>"; //Clear old options

    // Load from default list
    const exercises = defaultExercises[group] || [];

    exercises.forEach((exercise) => {
      const option = document.createElement("option");
      option.value = exercise;
      option.textContent = exercise;
      exerciseSelect.appendChild(option);
    });

    //Load any custom saved exercises for this group
    const customExercises =
      JSON.parse(localStorage.getItem(`custom-${group}`)) || [];
    customExercises.forEach((exercise) => {
      const option = document.createElement("option");
      option.value = exercise;
      option.textContent = exercise + " (Custom)";
      exerciseSelect.appendChild(option);
    });
  }

  const targetMuscles = document.getElementById("targetMuscles");
  if (targetMuscles) {
    const group = localStorage.getItem("muscleGroup");

    targetMuscles.textContent = group || "Choose a workout"; // basically says if "group" has a value (is not null or undefined), show that. Otherwise, show "Choose a workout".
    loadExercises(group); // Load exercises into the dropdown
  }

  // Lets the user select from the dropdown and auto-fill the input box with that value.
  exerciseSelect.addEventListener("change", () => {
    exerciseInput.value = exerciseSelect.value;
  });

  // Initialize an empty array to store workouts
  let workouts = [];

  // Event listener for the button click
  addWorkoutBtn.addEventListener("click", () => {
    // Get the user input values
    const exercise = exerciseInput.value;
    const reps = repsInput.value;
    const sets = setsInput.value;

    // Check if the input values are valid (not empty)
    if (exercise && reps && sets) {
      // Create a new workout object and push it to the array
      const newWorkout = { exercise, reps, sets };
      workouts.push(newWorkout);

      // Clear the input fields after submission
      exerciseInput.value = "";
      repsInput.value = "";
      setsInput.value = "";

      // Update the displayed list of workouts
      displayWorkouts();

      // Add the manually entered exercise to the dropdown if not already present

      // Array.from creates a new array from an array-like or iterable object. In this case, Array.from(exerciseSelect.options) converts the options property of the <select> dropdown (which is a collection of <option> elements) into a real array that can be worked with. The ! is a logical NOT operator.

      //.some((opt) => opt.value === exercise) checks if any of the options have the value that matches the manually entered exercise.

      //!: If .some() returns true (meaning there is an option with the same value as the manually entered exercise), the ! flips it to false, indicating that the exercise should not be added again. Conversely, if .some() returns false (meaning the exercise is not already in the dropdown), the ! flips it to true, indicating the exercise can be added.
      const group = localStorage.getItem("muscleGroup");
      if (
        exercise &&
        !Array.from(exerciseSelect.options).some(
          (opt) => opt.value === exercise
        )
      ) {
        const newOption = document.createElement("option");
        newOption.value = exercise;
        newOption.textContent = exercise;
        exerciseSelect.appendChild(newOption);

        // Save it to localStorage so it's available next time
        const customKey = `custom-${group}`;
        const saved = JSON.parse(localStorage.getItem(customKey)) || [];
        saved.push(exercise);
        localStorage.setItem(customKey, JSON.stringify(saved));
      }
    } else {
      alert("Please fill in all fields.");
    }
  });

  // Function to display workouts in the <ul> element
  function displayWorkouts() {
    workoutList.innerHTML = ""; // Clear the existing list

    // Loop through each workout and create a list item
    workouts.forEach((workout) => {
      const li = document.createElement("li");
      li.textContent = `${workout.exercise} - ${workout.reps} reps, ${workout.sets} sets`;
      workoutList.appendChild(li);
    });
  }
});

// // Add an event listener to the "Clear Custom Exercises" button
// document
//   .getElementById("clearCustomExercisesBtn")
//   .addEventListener("click", () => {
//     const group = localStorage.getItem("muscleGroup"); // Get the current muscle group
//     if (group) {
//       clearCustomExercises(group); // Clear custom exercises for the current group
//     } else {
//       alert("Please select a muscle group first.");
//     }
//   });
