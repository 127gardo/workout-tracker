document.addEventListener("DOMContentLoaded", () => {
  // Delete object error from early test
  ["Back and Biceps", "Chest and Triceps", "Legs and Abs"].forEach((group) => {
    const key = `custom-${group}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    const filtered = saved.filter((e) => typeof e === "string");
    if (filtered.length !== saved.length) {
      localStorage.setItem(key, JSON.stringify(filtered));
    }
  });

  // Language selector
  const getCurrentLanguage = () => localStorage.getItem("language") || "en";

  // Home page buttons
  const backBtn = document.getElementById("backbtn");
  const chestBtn = document.getElementById("chestbtn");
  const legsBtn = document.getElementById("legsbtn");

  if (backBtn && chestBtn && legsBtn) {
    backBtn.onclick = () =>
      localStorage.setItem("muscleGroup", "Back and Biceps");
    chestBtn.onclick = () =>
      localStorage.setItem("muscleGroup", "Chest and Triceps");
    legsBtn.onclick = () => localStorage.setItem("muscleGroup", "Legs and Abs");
  }

  // Workout page inputs and buttons
  const exerciseInput = document.getElementById("exercise");
  const repsInput = document.getElementById("reps");
  const setsInput = document.getElementById("sets");
  const addWorkoutBtn = document.getElementById("addWorkoutBtn");
  const workoutList = document.getElementById("workoutList");
  const exerciseSelect = document.getElementById("exerciseSelect");

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
  };

  // Load exercises based on selected group and language
  function loadExercises(group) {
    const language = getCurrentLanguage();
    const placeholder =
      language === "ja"
        ? "以下から選択するか入力してください"
        : "Select or enter your own below";

    exerciseSelect.innerHTML = `<option value="">${placeholder}</option>`;

    const exercises =
      language === "ja"
        ? defaultJaExercises[group] || []
        : defaultExercises[group] || [];
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

  // Display muscle group title
  const targetMuscles = document.getElementById("targetMuscles");
  if (targetMuscles) {
    const group = localStorage.getItem("muscleGroup");
    targetMuscles.textContent = group || "Choose a workout";
    loadExercises(group);
  }

  // Update input when selecting from dropdown
  if (exerciseSelect) {
    exerciseSelect.addEventListener("change", () => {
      exerciseInput.value = exerciseSelect.value;
    });
  }

  let workouts = [];

  // Add workout to list
  if (addWorkoutBtn) {
    addWorkoutBtn.addEventListener("click", () => {
      const exercise = exerciseInput.value.trim();
      const reps = repsInput.value.trim();
      const sets = setsInput.value.trim();

      if (exercise && reps && sets) {
        workouts.push({ exercise, reps, sets });
        exerciseInput.value = "";
        repsInput.value = "";
        setsInput.value = "";
        displayWorkouts();

        // Save custom exercise
        const group = localStorage.getItem("muscleGroup");
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
        alert("Please fill in all fields.");
      }
    });
  }

  // Display workouts
  function displayWorkouts() {
    workoutList.innerHTML = "";
    workouts.forEach((workout) => {
      const li = document.createElement("li");
      li.textContent = `${workout.exercise} - ${workout.reps} reps, ${workout.sets} sets`;
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

  // Update language for home page
  function updateLanguage(lang) {
    const strings = languageStrings[lang];
    const h1 = document.querySelector("h1");
    if (h1) h1.textContent = strings.title;
    if (backBtn) backBtn.textContent = strings.backBtn;
    if (chestBtn) chestBtn.textContent = strings.chestBtn;
    if (legsBtn) legsBtn.textContent = strings.legsBtn;
    if (langSelector) langSelector.value = lang; // <- fix selector value
  }

  // Update language for workout page
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

    if (langSelector) langSelector.value = lang; // <- fix selector value again
  }

  // Handle language selector
  const langSelector = document.getElementById("language-selector");
  if (langSelector) {
    langSelector.addEventListener("change", (e) => {
      const selectedLang = e.target.value;
      localStorage.setItem("language", selectedLang);
      updateLanguage(selectedLang);
      updateWorkoutPageLanguage(selectedLang);
    });
  }

  // Initialize language on page load
  const savedLang = getCurrentLanguage();
  updateLanguage(savedLang);
  updateWorkoutPageLanguage(savedLang);
});
