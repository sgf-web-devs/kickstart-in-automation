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
var inQueueHandler = function(statefulObj, input) {
    console.log('Work queued');
};

var processedHandler = function (statefulObj, input) {
    console.log('Work processed');
};

var canceledHandeler = function (statefulObj, input) {
    console.log('Work canceled');
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

var FSM = [
    [Status.InQueue, BtnInput.Next, inQueueHandler, Status.Processed],
    [Status.InQueue, BtnInput.Cancel, inQueueHandler, Status.Canceled],
    [Status.Processed, BtnInput.Processed, processedHandler, Status.Processed],
    [Status.Processed, BtnInput.Cancel, processedHandler, Status.Processed],
    [Status.Canceled, BtnInput.Next, canceledHandeler, Status.Canceled],
    [Status.Canceled, BtnInput.Cancel, canceledHandeler, Status.Canceled]
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
}



/***********************************************************************************************************************
 *
 * EXECUTION
 *
 **********************************************************************************************************************/

// An object that has a "state"
const myAwesomeObject = {
    status: 0
};


// Input arrives in this order
const inputStream = [
    BtnInput.Next,
    BtnInput.Cancel,
    BtnInput.Cancel
];

console.log('Now executing the Step3-bad example:');

// Execute automation
while (inputStream.length > 0) {
    var input = inputStream.shift();
    transitionState(myAwesomeObject, input);
}