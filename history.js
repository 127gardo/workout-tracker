document.addEventListener("DOMContentLoaded", () => {
  const getCurrentLanguage = () => localStorage.getItem("language") || "en";

  const container = document.getElementById("historyContainer");
  const workoutHistory =
    JSON.parse(localStorage.getItem("workoutHistory")) || {}; // Tries to load saved workout history from localStorage. JSON.parse turns it back into usable JS object. || {} says "if there's no history saved, just use an empty object {} instead."

  if (Object.keys(workoutHistory).length === 0) {
    // If there are no saved workouts (the object is empty)
    container.innerHTML = "<p>No workouts logged yet.</p>"; //show a simple message saying there's nothing logged yet.
    return; // stop running the rest of the function, because there's no workouts to display.
  }

  for (const date in workoutHistory) {
    //For every date that workouts are logged (like "2025-04-27", "2025-04-28", etc), dateHeading will create a new <h2> heading elements to show the date.
    const dateHeading = document.createElement("h2");
    dateHeading.textContent = date; // set the heading's text to the date itself.
    container.appendChild(dateHeading); // Stick that <h2> onto the page inside the container.

    const ul = document.createElement("ul"); // Make an unordered list <ul> to hold each workout.

    const language = getCurrentLanguage();
    const unitOfMeasurement = language === "ja" ? "kg" : "lbs";

    workoutHistory[date].forEach((workout) => {
      // Go through all workouts saved under that date.
      const li = document.createElement("li"); // Make a <li> list item
      li.textContent = `${workout.exercise}: ${workout.sets} sets of ${workout.reps} reps at ${workout.weight} ${unitOfMeasurement}`; // Set the text to something like: "Bench Press: 3 sets x 10 reps"
      ul.appendChild(li); // Add the <li> to the <ul>.
    });

    container.appendChild(ul); // After making all <li>s for a day, add the <ul> to the container under that date heading.
  }
});
