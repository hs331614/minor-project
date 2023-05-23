let moodButtons = Array.from(document.getElementsByClassName("mood-button"));
let moodDate = document.getElementById("moodDate");
let submitMood = document.getElementById("submitMood");
let clearMood = document.getElementById("clearMood");
let moodList = document.getElementById("moodList");

let moodMap = {
  1: '😞',
  2: '😐',
  3: '😊',
  4: '😄'
};

let selectedMood = null;

moodButtons.forEach(button => {
  button.addEventListener('click', function() {
    if (selectedMood === this.getAttribute('data-mood')) {
      selectedMood = null;
      this.classList.remove('active');
    } else {
      selectedMood = this.getAttribute('data-mood');
      moodButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-mood') === selectedMood) {
          btn.classList.add('active');
        }
      });
    }
  });
});

submitMood.addEventListener('click', function() {
  if (selectedMood && moodDate.value) {
    let existingEntry = document.querySelector(`tr[data-date='${moodDate.value}']`);
    if (existingEntry) {
      existingEntry.querySelector('.mood-cell span').textContent = moodMap[selectedMood];
    } else {
      let tableRow = document.createElement("tr");
      let dateCell = document.createElement("td");
      let moodCell = document.createElement("td");
      let moodEmoji = document.createElement("span");

      dateCell.textContent = moodDate.value;
      dateCell.classList.add("date-cell");
      moodEmoji.textContent = moodMap[selectedMood];
      moodEmoji.classList.add("mood-emoji");
      moodCell.appendChild(moodEmoji);

      tableRow.appendChild(dateCell);
      tableRow.appendChild(moodCell);
      tableRow.setAttribute('data-date', moodDate.value);

      moodList.appendChild(tableRow);
      limitMoodHistory();
    }
  }
});

clearMood.addEventListener('click', function() {
  let moodEntry = document.querySelector(`tr[data-date='${moodDate.value}']`);
  if (moodEntry) {
    moodList.removeChild(moodEntry);
  }
});

function limitMoodHistory() {
  while (moodList.children.length > 7) {
    moodList.removeChild(moodList.firstChild);
  }
}
