/***********************************************************************************************************************
 *
 * Setup
 *
 **********************************************************************************************************************/

//
// State & Input definitions
//
var Status = {
    InQueue: 0,
    Processed: 1,
    Canceled: 2
};

var BtnInput = {
    Cancel: 0,
    Next: 1
};


//
// Transition function Definitions
//

// This is a generic transitionFromQueue
var transitionFromQueue = function(statefulObj, input) {
    statefulObj.doFromQueueCleanupWork();
    console.log('Transitioning from Queue');
};

// This is a highly specific transition from queue based off the "next" input
var transitionFromQueueNext = function(statefulObj, input) {
    statefulObj.doProcessedCleanupWork();
    console.log('This is a custom transition for the "Next" input in the InQueue state.');
};

var transitionFromProcessed = function (statefulObj, input) {
    console.log('Transitioning from Processed');
};

var transitionFromCanceled = function (statefulObj, input) {
    console.log('Transition from Canceled');
};

var handleEnqueuing = function(statefulObj) {
    console.log('Enqueuing');
};

var handleProcessing = function(statefulObj) {
    statefulObj.doWork();
    console.log('Processing');
};

var handleCanceling = function(statefulObj) {
    console.log('Canceling');
};


//
// Finite State Machine Definition
//
var FSMStructure = {
    CurrentState: 0,
    Input: 1,
    TransitionFunction: 2,
    NextState: 3
};

var FSMEnterStateHandlers = [];
FSMEnterStateHandlers[Status.InQueue] = handleEnqueuing;
FSMEnterStateHandlers[Status.Processed] = handleProcessing;
FSMEnterStateHandlers[Status.Canceled] = handleCanceling;

var FSM = [
    [Status.InQueue, BtnInput.Next, transitionFromQueueNext, Status.Processed], // Notice a different function!
    [Status.InQueue, BtnInput.Cancel, transitionFromQueue, Status.Canceled],
    [Status.Processed, BtnInput.Processed, transitionFromProcessed, Status.Processed],
    [Status.Processed, BtnInput.Cancel, transitionFromProcessed, Status.Processed],
    [Status.Canceled, BtnInput.Next, transitionFromCanceled, Status.Canceled],
    [Status.Canceled, BtnInput.Cancel, transitionFromCanceled, Status.Canceled]
];


/**
 * Transitions the machine
 *
 * @param statefulObj This object must contain a "status" property
 * @param input
 */
function transitionState(statefulObj, input) {
    // Find current position within the machine.
    var currentState = FSM.filter(function (state) {
        return state[FSMStructure.CurrentState] === statefulObj.status && state[FSMStructure.Input] === input
    });

    // State does not exist. Perform early termination.
    if (currentState.length <= 0) {
        console.error('The current status + input combination does not have a corresponding entry in the FSM.');
        return;
    }

    // .filter returns an array, make sure to grab first element.
    currentState = currentState[0];

    // Check for transition function. If exists, invoke.
    if (
        currentState[FSMStructure.TransitionFunction] !== null &&
        typeof currentState[FSMStructure.TransitionFunction] === 'function'
    ) {
        // Transition functions can accept two parameters: the statefulObj, and the input that was passed.
        currentState[FSMStructure.TransitionFunction](statefulObj, input);
    }

    // Assign object's status to the new status.
    statefulObj.status = currentState[FSMStructure.NextState];

    // Check for enter state function. If exists, invoke.
    if (
        typeof FSMEnterStateHandlers[statefulObj.status] === 'function'
    ) {
        FSMEnterStateHandlers[statefulObj.status](statefulObj);
    }
}



/***********************************************************************************************************************
 *
 * EXECUTION
 *
 **********************************************************************************************************************/

// An object that has a "state"
const myAwesomeObject = {
    alreadyProcessed: false,
    status: 0,
    doFromQueueCleanupWork: function() { },
    doProcessedCleanupWork: function() { },
    doWork: function () {
        if (!this.alreadyProcessed) {
            console.log('ET PHONE HOME!');
            this.alreadyProcessed = true;
        } else {
            console.log('Already phone home!');
        }
    }
};


// Input arrives in this order
const inputStream = [
    BtnInput.Next,
    BtnInput.Cancel,
    BtnInput.Cancel
];

console.log('Now executing the Step3-good example:');

// Execute automation
while (inputStream.length > 0) {
    var input = inputStream.shift();
    transitionState(myAwesomeObject, input);
}