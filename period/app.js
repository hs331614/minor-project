var currentDate = new Date();
currentDate.setDate(1);

function createCalendar() {
    var calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    var monthDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    for (var i = 1; i <= monthDays; i++) {
        var day = document.createElement('div');
        day.classList.add('day');
        day.innerText = i;

        var lastPeriodDate = new Date(localStorage.getItem('lastPeriodDate'));
        var cycleLength = parseInt(localStorage.getItem('cycleLength'));

        if (lastPeriodDate && cycleLength) {
            var periodDay = new Date(lastPeriodDate.getTime() + cycleLength * 24 * 60 * 60 * 1000 * Math.floor((currentDate.getTime() - lastPeriodDate.getTime()) / (cycleLength * 24 * 60 * 60 * 1000)));
            if (periodDay.getMonth() == currentDate.getMonth() && periodDay.getDate() == i) {
                day.classList.add('period');
            }
        }

        calendar.appendChild(day);
    }
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    createCalendar();
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    createCalendar();
}

function saveData() {
    var lastPeriod = document.getElementById('lastPeriod').value;
    var cycleLength = document.getElementById('cycleLength').value;
    localStorage.setItem('lastPeriodDate', lastPeriod);
    localStorage.setItem('cycleLength', cycleLength);
    createCalendar();
}

createCalendar();
