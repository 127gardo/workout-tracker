document.addEventListener("DOMContentLoaded", () => {
  // This waits until entire HTML is finished loading before running JS.
  // Delete object error from early test
  ["Back and Biceps", "Chest and Triceps", "Legs and Abs", "Cardio"].forEach(
    (group) => {
      const key = `custom-${group}`;
      const saved = JSON.parse(localStorage.getItem(key)) || [];
      const filtered = saved.filter((e) => typeof e === "string");
      if (filtered.length !== saved.length) {
        localStorage.setItem(key, JSON.stringify(filtered));
      }
    }
  );

  // getCurrentLanguage gets what language was most recently picked (saved in localStorage). If none, it defaults to English.
  const getCurrentLanguage = () => localStorage.getItem("language") || "en";
  // langSelector connects to the dropdown menu on the page where the language is chosen
  const langSelector = document.getElementById("language-selector");
  const language = getCurrentLanguage();

  // Finds the home page buttons
  const backBtn = document.getElementById("backbtn");
  const chestBtn = document.getElementById("chestbtn");
  const legsBtn = document.getElementById("legsbtn");
  const cardioBtn = document.getElementById("cardiobtn");

  // The following if statement saves your choice (Back/Chest/Legs) into localStorage upon clicking the button. Later pages will then remember which group you chose.
  if (backBtn && chestBtn && legsBtn && cardioBtn) {
    // the "if" here is a safety check to make sure all buttons are present, meaning we're on the right page.
    backBtn.onclick = () =>
      localStorage.setItem("muscleGroup", "Back and Biceps");
    chestBtn.onclick = () =>
      localStorage.setItem("muscleGroup", "Chest and Triceps");
    legsBtn.onclick = () => localStorage.setItem("muscleGroup", "Legs and Abs");
    cardioBtn.onclick = () => localStorage.setItem("muscleGroup", "Cardio");
  }

  // Grabs the workout page inputs and buttons
  const exerciseInput = document.getElementById("exerciseInput");
  const weightInput = document.getElementById("weightInput");
  const repsInput = document.getElementById("repsInput");
  const setsInput = document.getElementById("setsInput");
  const distanceInput = document.getElementById("distanceInput");
  const durationInput = document.getElementById("durationInput");
  const addWorkoutBtn = document.getElementById("addWorkoutBtn");
  const workoutList = document.getElementById("workoutList");
  const exerciseSelect = document.getElementById("exerciseSelect");
  // const unitOfMeasurement = language === "ja" ? "kg" : "lbs";
  const unitOfMeasurementInput = document.getElementById("unitOfMeasurement");

  if (unitOfMeasurementInput) {
    unitOfMeasurementInput.addEventListener("change", () => {
      localStorage.setItem("unitOfMeasurement", unitOfMeasurementInput.value);
    });
  }

  // Default exercises
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
      "Cable Row",
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
    Cardio: [
      // "Burpees",
      // "Mountain Climbers",
      // "High Knees",
      // "Butt Kicks",
      "Treadmill",
      // "Bike",
      // "Elliptical",
      // "Jump Rope",
      // "Stair Climbing",
      "Outdoor Running",
      // "Swimming",
    ],
  };

  // Japanese default exercises
  const defaultJaExercises = {
    "Back and Biceps": [
      "ハンマーカール",
      "バイセップカール",
      "バイセップウィンドミル",
      "懸垂",
      "バーベルロー",
      "膝をついたロー",
      "ラットプルダウン",
      "ショルダーパンプ",
      "ケーブルシュラッグ",
      "ケーブルロー",
    ],
    "Chest and Triceps": [
      "ベンチプレス",
      "インクラインダンベルプレス",
      "ケーブルトライセッププルダウン",
      "ケーブルチェストフライ",
      "スカルクラッシャー",
      "スタンディングチェストプレス",
    ],
    "Legs and Abs": [
      "スクワット",
      "レッグプレス",
      "カーフレイズ",
      "ゴブレットスクワット",
      "ランジ",
      "サイドランジ",
      "ブルガリアンスクワット",
      "シットアップ",
      "ディクラインシットアップ",
      "ロシアンツイスト",
    ],
    Cardio: [
      // "バーピー",
      // "マウンテンクライマー",
      // "ハイニー",
      // "バットキック",
      "ランニングマシン",
      // "バイク",
      // "クロストレーナー",
      // "縄跳び",
      // "階段昇降",
      "屋外ランニング",
      // "水泳",
    ],
  };

  // When a muscle group (like Back and Biceps) is chosen, this fills the dropdown (exerciseSelect) with the default exercises (based on language) and any custom exercises.
  function loadExercises(group) {
    // "group" is a parameter, or temporary nickname until something is passed in its place. So if Back and Bi gets passed group = Back and Biceps.
    const language = getCurrentLanguage();
    const placeholder =
      language === "ja"
        ? "以下から選択するか入力してください"
        : "Select or enter your own below";

    exerciseSelect.innerHTML = `<option value="">${placeholder}</option>`;

    const exercises =
      (language === "ja" ? defaultJaExercises : defaultExercises)[group] || [];
    exercises.forEach((exercise) => {
      const option = document.createElement("option");
      option.value = exercise;
      option.textContent = exercise;
      exerciseSelect.appendChild(option);
    });

    const customExercises =
      JSON.parse(localStorage.getItem(`custom-${group}`)) || [];
    customExercises.forEach((exercise) => {
      const option = document.createElement("option");
      option.value = exercise;
      option.textContent = exercise;
      exerciseSelect.appendChild(option);
    });
  }

  function showInputsForGroup(group) {
    const strengthInputs = document.getElementById("strengthInputs");
    const cardioInputs = document.getElementById("cardioInputs");

    if (group === "Cardio") {
      cardioInputs.style.display = "block";
      strengthInputs.style.display = "none";
    } else {
      cardioInputs.style.display = "none";
      strengthInputs.style.display = "block";
    }
  }

  const group = localStorage.getItem("muscleGroup");
  if (group) {
    showInputsForGroup(group);
  }

  // When on the workout page, this shows which muscle group is being trained and loads the exercise list for that group.
  const targetMuscles = document.getElementById("targetMuscles");
  if (targetMuscles) {
    targetMuscles.textContent = group || "Choose a workout";
    loadExercises(group);
  }

  // When an exercise is selected from the dropdown on the workout page, this automatically fills the exercise input box with that name.
  if (exerciseSelect) {
    exerciseSelect.addEventListener("change", () => {
      exerciseInput.value = exerciseSelect.value;
    });
  }

  // This stores all the workouts added by the user
  let workouts = [];

  // When "Add Workout" is clicked, this grabs whatever was typed: exercise name, reps, and sets. If everything is filled, it adds the workout to your list (workouts array), clears the input fields, displays the updated workout list, saved the workout to localStorage based on the selected date, and if a new exercise was typed that was not already on the list, it gets added to the dropdown and saves it in localStorage under whatever group it applies to.
  if (addWorkoutBtn) {
    addWorkoutBtn.addEventListener("click", () => {
      const exercise = exerciseInput.value.trim();
      const weight = weightInput.value.trim();
      const reps = repsInput.value.trim();
      const sets = setsInput.value.trim();
      const distance = distanceInput.value.trim();
      const duration = durationInput.value.trim();

      if (
        exercise &&
        ((group === "Cardio" && distance && duration) ||
          (group !== "Cardio" && weight && reps && sets))
      ) {
        const workout = {
          exercise,
          weight,
          reps,
          sets,
          distance,
          duration,
        };
        workouts.push(workout);

        // Clear inputs
        exerciseInput.value = "";
        weightInput.value = "";
        repsInput.value = "";
        setsInput.value = "";
        distanceInput.value = "";
        durationInput.value = "";

        displayWorkouts();

        // Save to localStorage under date
        const dateInput = document.getElementById("date");
        const date = dateInput?.value || "unspecified";
        let workoutHistory =
          JSON.parse(localStorage.getItem("workoutHistory")) || {};
        if (!workoutHistory[date]) workoutHistory[date] = [];
        workoutHistory[date].push(workout);
        localStorage.setItem("workoutHistory", JSON.stringify(workoutHistory));

        // Save custom exercise if new
        if (
          !Array.from(exerciseSelect.options).some(
            (opt) => opt.value === exercise
          )
        ) {
          const newOption = document.createElement("option");
          newOption.value = exercise;
          newOption.textContent = exercise;
          exerciseSelect.appendChild(newOption);

          const customKey = `custom-${group}`;
          const saved = JSON.parse(localStorage.getItem(customKey)) || [];
          saved.push(exercise);
          localStorage.setItem(customKey, JSON.stringify(saved));
        }
      } else {
        alert("Please fill in all required fields.");
      }
    });
  }

  // Shows all the workouts added to the page
  function displayWorkouts() {
    workoutList.innerHTML = "";
    workouts.forEach((workout) => {
      const li = document.createElement("li");
      let entry = `${workout.exercise} - `;
      if (group === "Cardio") {
        entry += `Distance: ${workout.distance} miles, Duration: ${workout.duration}`;
      } else {
        entry += `${workout.sets} sets x ${workout.reps} reps x ${workout.weight} ${unitOfMeasurementInput.value}`;
      }
      li.textContent = entry;
      workoutList.appendChild(li);
    });
  }

  // Language strings
  const languageStrings = {
    en: {
      title: "Select your workout",
      backBtn: "Back and Bi",
      chestBtn: "Chest and Tri",
      legsBtn: "Legs and Abs",
      cardioBtn: "Cardio",
      selectPlaceholder: "Select or enter your own below",
      workoutTitle: "Today's Workout",
      logWorkout: "Log Your Workout",
      dateLabel: "Date:",
      exerciseLabel: "Exercise:",
      repsLabel: "Reps:",
      setsLabel: "Sets:",
      addWorkoutBtn: "Add Workout",
      workoutLogTitle: "Workout Log",
      homeBtn: "Home",
      groupNames: {
        "Back and Biceps": "Back and Biceps",
        "Chest and Triceps": "Chest and Triceps",
        "Legs and Abs": "Legs and Abs",
      },
      placeholders: {
        exercise: "Enter exercise",
        reps: "Enter reps",
        sets: "Enter sets",
      },
    },
    ja: {
      title: "ワークアウトを選んでください",
      backBtn: "背中と上腕二頭筋",
      chestBtn: "胸と上腕三頭筋",
      legsBtn: "脚と腹筋",
      selectPlaceholder: "以下から選択するか入力してください",
      workoutTitle: "今日のワークアウト",
      logWorkout: "ワークアウトを記録する",
      dateLabel: "日付：",
      exerciseLabel: "種目：",
      repsLabel: "回数：",
      setsLabel: "セット数：",
      addWorkoutBtn: "ワークアウト追加",
      workoutLogTitle: "ワークアウト記録",
      homeBtn: "ホーム",
      groupNames: {
        "Back and Biceps": "背中と上腕二頭筋",
        "Chest and Triceps": "胸と上腕三頭筋",
        "Legs and Abs": "脚と腹筋",
      },
      placeholders: {
        exercise: "種目を入力",
        reps: "回数を入力",
        sets: "セット数を入力",
      },
    },
  };

  // Changes the button texts and title on the home page based on chosen language.
  function updateLanguage(lang) {
    const strings = languageStrings[lang];
    const h1 = document.querySelector("h1");
    if (h1) h1.textContent = strings.title;
    if (backBtn) backBtn.textContent = strings.backBtn;
    if (chestBtn) chestBtn.textContent = strings.chestBtn;
    if (legsBtn) legsBtn.textContent = strings.legsBtn;
    if (langSelector) langSelector.value = lang;
  }

  // Changes the button texts and title on the workout page based on chosen language.
  function updateWorkoutPageLanguage(lang) {
    const strings = languageStrings[lang];
    document.title = strings.workoutTitle;

    if (targetMuscles) {
      targetMuscles.textContent =
        localStorage.getItem("muscleGroup") || strings.workoutTitle;
    }
    const labels = document.querySelectorAll("h1 + div.labels label");
    if (labels.length >= 4) {
      labels[0].textContent = strings.dateLabel;
      labels[1].textContent = strings.exerciseLabel;
      labels[2].textContent = strings.repsLabel;
      labels[3].textContent = strings.setsLabel;
    }

    if (addWorkoutBtn) {
      addWorkoutBtn.textContent = strings.addWorkoutBtn;
    }
    const h2 = document.querySelector("h2");
    if (h2) h2.textContent = strings.workoutLogTitle;
    const homeBtn = document.getElementById("homeBtn");
    if (homeBtn) homeBtn.textContent = strings.homeBtn;

    if (langSelector) langSelector.value = lang;
  }

  // Handle language selector
  if (langSelector) {
    langSelector.addEventListener("change", () => {
      const newLang = langSelector.value;
      localStorage.setItem("language", newLang);
      updateLanguage(newLang);
      updateWorkoutPageLanguage(newLang);
    });
  }

  let startTime = null;
  let timerInterval = null;

  const startBtn = document.getElementById("startTimerBtn");
  const stopBtn = document.getElementById("stopTimerBtn");
  // const durationInput = document.getElementById("durationInput");

  if (startBtn && stopBtn && durationInput) {
    startBtn.addEventListener("click", () => {
      startTime = Date.now();
      timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        durationInput.value = new Date(elapsed).toISOString().substr(11, 8); // hh:mm:ss
      }, 1000);
      startBtn.disabled = true;
      stopBtn.disabled = false;
    });

    stopBtn.addEventListener("click", () => {
      clearInterval(timerInterval);
      startBtn.disabled = false;
      stopBtn.disabled = true;
    });
  }
});
