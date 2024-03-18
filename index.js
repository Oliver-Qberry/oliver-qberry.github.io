// Add a model for if right or wrong. or quick color change
//import day from './dayClass.js';

//F - French and English horn
//G - alto Flute

// Notes
let given_notes;
let input_notes;

// Stuff to select the keys to transpose to and from
const selectDiv = document.querySelector('.select');
const nextButton = document.querySelector('.next');

// div with all the practice
const practiceDiv = document.querySelector('.practice');

const given_note_output = document.querySelector('.given_note_output');
const given_title = document.querySelector('.given_title');
const not_given_title = document.querySelector('.b_flat');
const note_input = document.querySelector('.input');

const score = document.querySelector('.score');
const high_score_display = document.querySelector('.high_score');

//Given notes selectors
const concert_given = document.querySelector('#concert_given');
const b_flat_given = document.querySelector('#b_flat_given');
const e_flat_given = document.querySelector('#e_flat_given');

//Not given notes selectors
const concert_not_given = document.querySelector('#concert_not_given');
const b_flat_not_given = document.querySelector('#b_flat_not_given');
const e_flat_not_given = document.querySelector('#e_flat_not_given');

var concert_pitch_display = "";
var answer = "";
var answer2 = "";

// Score
var total = 0;
var correct = 0;
var high_score = 0;

// Timer
let startTime;
let running = false;
let interval;
let times = []; //get averages of these and output them
const averageTimeDisplay = document.querySelector('.averageTime');

//Add a class

function startStop() {
    //stops the timer
    if (running) {
        //console.log("Stopping Timer");
        running = false;
        clearInterval(interval);
        logElapsedTime();
    } else {
        //Starts the timer
        //console.log('Starting Timer');
        running = true;
        startTime = new Date().getTime();
        interval = setInterval(noop, 10); // Placeholder function, doesn't do anything
    }
}

/**
 * A function that does nothing except to make the interval 
 * think its running some code every 10 milliseconds.
 */
function noop() {
    // I love empty functions
}

function reset() {
    running = false;
    clearInterval(interval);
}

function logElapsedTime() {
    let currentTime = new Date().getTime();
    let elapsedTime = new Date(currentTime - startTime);
    let hours = elapsedTime.getUTCHours().toString().padStart(2, '0');
    let minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
    let seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = elapsedTime.getUTCMilliseconds().toString().padStart(3, '0');
    console.log(`Elapsed Time: ${hours}:${minutes}:${seconds}:${milliseconds}`);
    times.push(`${hours}:${minutes}:${seconds}:${milliseconds}`);
    reset();
}

function setNotGivenType(){
    //given
    if(concert_not_given.checked === true){
        input_notes = {
            name: "Concert Pitch",
            notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
            notes_flat: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
        };
        return true;
    }
    else if(b_flat_not_given.checked === true) {
        input_notes = {
            name: "B Flat",
            notes: ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#','A', 'A#', 'B', 'C', 'C#'],
            notes_flat: ['D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab','A', 'Bb', 'B', 'C', 'Db'],
        };
        return true;
    }
    else if(e_flat_not_given.checked === true) {
        input_notes = {
            name: "E Flat",
            notes:['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
            notes_flat: ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'],
        };
        return true;
    }
    return false;
}
// funtion for not given types
function setGivenType(){
    //given
    if(concert_given.checked === true){
        given_notes = {
            name: "Concert Pitch",
            notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
            notes_flat: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
        };
        return true;
    }
    else if(b_flat_given.checked === true) {
        given_notes = {
            name: "Bb",
            notes: ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#','A', 'A#', 'B', 'C', 'C#'],
            notes_flat: ['D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab','A', 'Bb', 'B', 'C', 'Db'],
        };
        return true;
    }
    else if(e_flat_given.checked === true) {
        given_notes = {
            name: "Eb",
            notes:['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
            notes_flat: ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'],
        };
        return true;
    }
    return false;
}
function start(){
    if(setGivenType() && setNotGivenType()){
        //console.log(`given: ${given_notes.name} input: ${input_notes.name}`);
        selectDiv.style.display = 'none';
        nextButton.hidden = true;
        practiceDiv.hidden = false;
        given_title.textContent = given_notes.name;
        not_given_title.textContent = input_notes.name;
        note_input.placeholder = input_notes.name;
        high_score = parseInt(JSON.parse(localStorage.getItem('highScore')));
        // If no saved highscore set it to 0
        if(high_score.isNaN){
            high_score = 0;
        }
        high_score_display.textContent = `High Score: ${high_score}`;
        getRandom();
    }
}

function getRandom(){
    //console.log('Generating new note');
    var flat_sharp = Math.round(Math.random() * 2);
    var index = Math.round(Math.random() * (given_notes.notes.length-1));
    if(flat_sharp < 1){
        concert_pitch_display = given_notes.notes[index];
    }
    else{
        concert_pitch_display = given_notes.notes_flat[index];
    }
    given_note_output.textContent = concert_pitch_display;
    answer = input_notes.notes[index];
    answer2 = input_notes.notes_flat[index];
}

function getAverage(times){
    let totalMilliseconds = 0;
    
    // Convert each time string to milliseconds and sum them up
    for (let i = 0; i < times.length; i++) {
        let timeParts = times[i].split(':');
        let hours = parseInt(timeParts[0], 10);
        let minutes = parseInt(timeParts[1], 10);
        let seconds = parseInt(timeParts[2], 10);
        let milliseconds = parseInt(timeParts[3], 10);
        
        totalMilliseconds += (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + milliseconds;
    }
    
    // Calculate the average time in milliseconds
    let averageMilliseconds = totalMilliseconds / times.length;
    
    // Convert milliseconds to seconds
    let averageSeconds = averageMilliseconds / 1000;
    
    // Round to the nearest 100th place
    let roundedAverageSeconds = Math.round(averageSeconds * 100) / 100;
    
    return roundedAverageSeconds;
}

function setScore(){
    // Set Score
    score.textContent = `Correct: ${correct}`;

    // Set High Score
    if(correct > high_score){
        high_score_display.textContent = `High score: ${correct}`;
        high_score = correct;
    }
    else{
        high_score_display.textContent = `High score: ${high_score}`;
    }
    function stringifySafe(value) {
        // Check for null or undefined before stringifying
        return value !== null && value !== undefined ? JSON.stringify(value) : null;
    }
    localStorage.setItem('highScore', stringifySafe(high_score));

    averageTimeDisplay.textContent = `Average Time: ${getAverage(times)}s`;
}

function check(){
    let right = false;
    total++;
    if(note_input.value.toUpperCase() === answer.toUpperCase() || note_input.value.toUpperCase() === answer2.toUpperCase()){
        //The note was correct
        startStop();
        correct++;
        right = true;
        console.log('Correct');
    }
    else{
        //the note was wrong
        correct = 0;
        console.log(`Wrong. Answer: ${answer} or ${answer2}`);
    }
    note_input.value = "";
    setScore();
    if(right){
        getRandom();
        startStop();
    }
}

window.addEventListener('keydown', function(e){
    if(e.key === 'Enter' && note_input.value !== null){
        check();
    }
});
nextButton.addEventListener('click', start);
note_input.addEventListener('click', startStop); // This is for users first note 
