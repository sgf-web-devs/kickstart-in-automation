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

console.log('Now executing the Step1 example:');

while (inputStream.length > 0) {

    var input = inputStream.shift();

    if (myAwesomeObject.status === Status.InQueue && input === BtnInput.Next) {

        console.log('I did some work.');
        myAwesomeObject.status = Status.Processed;

    } else if (myAwesomeObject.status === Status.Processed && (input === BtnInput.Next || input === BtnInput.Cancel)) {

        console.log("Can't do anything. Already processed");

    } else if (myAwesomeObject.status === Status.InQueue && input === BtnInput.Cancel) {

        console.log('Work was canceled.');
        myAwesomeObject.status = Status.Canceled;

    } else if (myAwesomeObject.status === Status.Canceled && (input === BtnInput.Next || input === BtnInput.Cancel)) {

        console.log("Can't do anything");

    } else {

        console.error(myAwesomeObject.status + ' is not a recognizable status.');

    }

}