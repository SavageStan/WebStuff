// General variables.
var timerInterval;
var currentActionEnum = {
    WORK: 1,
    REST: 2
};
var currentAction = currentActionEnum.WORK;

// Global timer variables.
const GLOBAL_TIMER_MINUTES = 20;
const GLOBAL_TIMER_SECONDS = 0;
var globalTimerMinutes = GLOBAL_TIMER_MINUTES;
var globalTimerSeconds = GLOBAL_TIMER_SECONDS;
var globalTimerString = "";
var globalTimerMinutesString = "";
var globalTimerSecondsString = "";

// Work timer variables.
const WORK_TIMER_MINUTES = 0;
const WORK_TIMER_SECONDS = 30;
var workTimerMinutes = WORK_TIMER_MINUTES;
var workTimerSeconds = WORK_TIMER_SECONDS;
var workTimerString = "";
var workTimerMinutesString = "";
var workTimerSecondsString = "";

// Rest timer variables.
const REST_TIMER_MINUTES = 0;
const REST_TIMER_SECONDS = 10;
var restTimerMinutes = REST_TIMER_MINUTES;
var restTimerSeconds = REST_TIMER_SECONDS;
var restTimerString = "";
var restTimerMinutesString = "";
var restTimerSecondsString = "";

function displayTimers()
{
    // Set the value of the global timer minutes string.
    if(globalTimerMinutes < 10)
    {
        globalTimerMinutesString = "";
        globalTimerMinutesString += "0";
        globalTimerMinutesString += globalTimerMinutes;
    }
    else
    {
        globalTimerMinutesString = "";
        globalTimerMinutesString += globalTimerMinutes;
    }

    // Set the value of the global timer seconds string.
    if(globalTimerSeconds < 10)
    {
        globalTimerSecondsString = "";
        globalTimerSecondsString += "0";
        globalTimerSecondsString += globalTimerSeconds;
    }
    else
    {
        globalTimerSecondsString = "";
        globalTimerSecondsString += globalTimerSeconds;
    }

    // Set the value of the work timer minutes string.
    if(workTimerMinutes < 10)
    {
        workTimerMinutesString = "";
        workTimerMinutesString += "0";
        workTimerMinutesString += workTimerMinutes;
    }
    else
    {
        workTimerMinutesString = "";
        workTimerMinutesString += workTimerMinutes;
    }

    // Set the value of the work timer seconds string.
    if(workTimerSeconds < 10)
    {
        workTimerSecondsString = "";
        workTimerSecondsString += "0";
        workTimerSecondsString += workTimerSeconds;
    }
    else
    {
        workTimerSecondsString = "";
        workTimerSecondsString += workTimerSeconds;
    }

    // Set the value of the rest timer minutes string.
    if(restTimerMinutes < 10)
    {
        restTimerMinutesString = "";
        restTimerMinutesString += "0";
        restTimerMinutesString += restTimerMinutes;
    }
    else
    {
        restTimerMinutesString = "";
        restTimerMinutesString += restTimerMinutes;
    }

    // Set the value of the rest timer seconds string.
    if(restTimerSeconds < 10)
    {
        restTimerSecondsString = "";
        restTimerSecondsString += "0";
        restTimerSecondsString += restTimerSeconds;
    }
    else
    {
        restTimerSecondsString = "";
        restTimerSecondsString += restTimerSeconds;
    }

    // Set the strings to the html elements.
    globalTimerString = globalTimerMinutesString + " : " + globalTimerSecondsString;
    document.getElementById("globalTimer").innerHTML = globalTimerString;

    workTimerString = workTimerMinutesString + " : " + workTimerSecondsString;
    document.getElementById("workTimer").innerHTML = workTimerString;

    restTimerString = restTimerMinutesString + " : " + restTimerSecondsString;
    document.getElementById("restTimer").innerHTML = restTimerString;
}

function swapWorkRestTimers()
{
    if(workTimerMinutes === 0 && workTimerSeconds === 0 && currentAction === currentActionEnum.WORK)
    {
        currentAction = currentActionEnum.REST;
        restTimerMinutes = REST_TIMER_MINUTES;
        restTimerSeconds = REST_TIMER_SECONDS;
        displayTimers();
        playBeepSound();
    }
    else if(restTimerMinutes === 0 && restTimerSeconds === 0 && currentAction === currentActionEnum.REST)
    {
        currentAction = currentActionEnum.WORK;
        workTimerMinutes = WORK_TIMER_MINUTES;
        workTimerSeconds = WORK_TIMER_SECONDS;
        playBeepSound();
        displayTimers();
    }
}

function startTimers()
{
    document.getElementById("startButton").disabled = true;

    timerInterval = setInterval(
        function()
        {
            // Global timer ticking.
            if(globalTimerSeconds > 0)
            {
                globalTimerSeconds--;
            }
            else if(globalTimerSeconds === 0 && globalTimerMinutes !== 0)
            {
                globalTimerMinutes--;
                globalTimerSeconds = 59;
            }

            // Work timer ticking.
            if(currentAction === currentActionEnum.WORK)
            {
                if(workTimerSeconds > 0)
                {
                    workTimerSeconds--;
                }
                else if(workTimerSeconds === 0 && workTimerMinutes !== 0)
                {
                    workTimerMinutes--;
                    workTimerSeconds = 59;
                }
            }

            // Rest timer ticking.
            if(currentAction === currentActionEnum.REST)
            {
                if(restTimerSeconds > 0)
                {
                    restTimerSeconds--;
                }
                else if(restTimerSeconds === 0 && restTimerMinutes !== 0)
                {
                    restTimerMinutes--;
                    restTimerSeconds = 59;
                }
            }

            swapWorkRestTimers();
            displayTimers();

            // When the count down is finished, stop the function, reset the timers and enable the start button.
            if(globalTimerMinutes === 0 && globalTimerSeconds === 0)
            {
                clearInterval(timerInterval);
                resetTimers();
                playEndSound();
                displayTimers();
                document.getElementById("startButton").disabled = false;
            }
        }, 1000);
}

function resetTimers()
{
    clearInterval(timerInterval);
    globalTimerMinutes = GLOBAL_TIMER_MINUTES;
    globalTimerSeconds = GLOBAL_TIMER_SECONDS;
    workTimerMinutes = WORK_TIMER_MINUTES;
    workTimerSeconds = WORK_TIMER_SECONDS;
    restTimerMinutes = REST_TIMER_MINUTES;
    restTimerSeconds = REST_TIMER_SECONDS;
    currentAction = currentActionEnum.WORK;
    displayTimers();
    document.getElementById("startButton").disabled = false;
}

function playBeepSound()
{
    var audio = new Audio('src/beep.wav');
    audio.play();
}

function playEndSound()
{
    var audio = new Audio('src/end.wav');
    audio.play();
}