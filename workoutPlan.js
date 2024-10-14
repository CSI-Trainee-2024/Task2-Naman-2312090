let exerciseList = JSON.parse(localStorage.getItem('exerciseList')) || [
   { exercise: 'Bench Press', number: 10, time: '0:05' },]

function addExercise() {
    const exerciseElement = document.querySelector('.input-exercise');
    const exercise = exerciseElement.value;

    const numberElement = document.querySelector('.input-number');
    const number = numberElement.value;

    const timeElement = document.querySelector('.input-timer');
    const time = timeElement.value;

    exerciseList.push({ exercise, number, time });


    saveToLocalStorage();


    exerciseElement.value = '';
    numberElement.value = '';
    timeElement.value = '';


    renderExercise();
}

function renderExercise() {
    let exerciseHTML = '';
    exerciseList.forEach((exerciseObject, i) => {
        exerciseHTML += `
            <div>${exerciseObject.exercise}</div>
            <div>-- x${exerciseObject.number}</div>
            <div>${exerciseObject.time}</div>
            <button onclick="deleteExercise(${i})" class="deleteButton">Delete</button>
        `;
    });
    document.querySelector('.js-exerciseList').innerHTML = exerciseHTML;
}

function deleteExercise(index) {
    exerciseList.splice(index, 1);
    saveToLocalStorage();
    renderExercise();
}

function saveToLocalStorage() {
    localStorage.setItem('exerciseList', JSON.stringify(exerciseList));
}

function beginWorkout() {
    if (exerciseList.length === 0) return alert('No exercises to perform.');

    let currentExerciseIndex = 0;
    startNextExercise(currentExerciseIndex);
}

function startNextExercise(index) {
    if (index >= exerciseList.length) {
        document.getElementById('timerDisplay').textContent = 'Workout complete!';
        return;
    }

    const exercise = exerciseList[index];
    const [mins, secs] = exercise.time.split(':').map(Number);
    const totalSeconds = (mins * 60) + secs;

    updateDisplay(totalSeconds);
    let remainingSeconds = totalSeconds;

    const countdown = setInterval(() => {
        if (remainingSeconds <= 0) {
            clearInterval(countdown);
            // Check if it's not the last exercise
            if (index < exerciseList.length - 1) {
                document.getElementById('timerDisplay').textContent = `Rest for 10 seconds`;
                setTimeout(() => {
                    startNextExercise(index + 1); // Move to the next exercise
                }, 10000); // 10 seconds break
            } else {
                document.getElementById('timerDisplay').textContent = 'Workout complete!';
            }
            return;
        }

        remainingSeconds--;
        updateDisplay(remainingSeconds);
    }, 1000);
}

function updateDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('timerDisplay').textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// function endWorkout() {
//     clearInterval(countdown); 
//     document.getElementById('End-result').textContent = 'Workout ended!';
// }

// Initial render of exercises
renderExercise();
