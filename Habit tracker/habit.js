const addHabits = document.querySelector(".add-habit");
const habitsList = document.querySelector(".habits");
const habits = JSON.parse(localStorage.getItem("habits")) || [];

function addHabit(e) {
  e.preventDefault();
  const text = this.querySelector("[name=habit]").value;
  const totalCounts = +this.querySelector("[name=reps]").value;
  const timeframe = this.querySelector("[name=timeframe]").value;
  const habit = {
    text: text,
    reps: 0,
    totalCounts: totalCounts,
    timeframe: timeframe,
    completed: false,
    lastCompleted: new Date().toISOString()
  };

  habits.push(habit);
  listHabits(habits, habitsList);
  localStorage.setItem("habits", JSON.stringify(habits));
  this.reset();
  console.log(habit);
}

function listHabits(habit = [], habitsList) {
  habitsList.innerHTML = habits
    .map((habit, i) => {
      return `
            <li>
            <input type="checkbox" data-index=${i} id="habit${i}" ${
        habit.completed ? "checked" : ""
      } />
            <label for="habit${i}"><span>${habit.reps}/${habit.totalCounts} ${
        habit.timeframe
      }</span> </label>
      <label class="task">${habit.text}</label>
        <button class="delete" data-index=${i} id="delete${i}">Delete</button>
        </li>
        `;
    })
    .join("");
}

function toggleCompleted(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  const habit = habits[index];

  const currentDate = new Date();

  if (habit.timeframe === "daily") {
    const lastCompleted = new Date(habit.lastCompleted);
    if (currentDate.getDate() !== lastCompleted.getDate()) {
      habit.reps = 0;
      habit.completed = false;
    }
  } else if (habit.timeframe === "monthly") {
    const lastCompleted = new Date(habit.lastCompleted);
    if (
      currentDate.getMonth() !== lastCompleted.getMonth() ||
      currentDate.getFullYear() !== lastCompleted.getFullYear()
    ) {
      habit.reps = 0;
      habit.completed = false;
    }
  } else if (habit.timeframe === "weekly") {
    const lastCompleted = new Date(habit.lastCompleted);
    const currentWeekStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const lastCompletedWeekStart = new Date(
      lastCompleted.getFullYear(),
      lastCompleted.getMonth(),
      lastCompleted.getDate() - lastCompleted.getDay()
    );
    if (
      currentWeekStart.getTime() !== lastCompletedWeekStart.getTime() ||
      currentDate.getFullYear() !== lastCompleted.getFullYear()
    ) {
      habit.reps = 0;
      habit.completed = false;
    }
  } else if (habit.timeframe === "yearly") {
    const lastCompleted = new Date(habit.lastCompleted);
    if (currentDate.getFullYear() !== lastCompleted.getFullYear()) {
      habit.reps = 0;
      habit.completed = false;
    }
  }

  habit.reps += 1;
  habit.lastCompleted = currentDate.toISOString();

  listHabits(habits, habitsList);
  localStorage.setItem("habits", JSON.stringify(habits));
}

function deleteHabit(e) {
  if (!e.target.matches("button")) return;
  const el = e.target;
  constindex = el.dataset.index;

  habits.splice(index, 1);
  
  listHabits(habits, habitsList);
  localStorage.setItem("habits", JSON.stringify(habits));
  }
  
  addHabits.addEventListener("submit", addHabit);
  habitsList.addEventListener("click", toggleCompleted);
  habitsList.addEventListener("click", deleteHabit);
  
  listHabits(habits, habitsList);
