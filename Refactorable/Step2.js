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

console.log('Now executing the Step2 example:');

while (inputStream.length > 0) {

    var input = inputStream.shift();

    switch (myAwesomeObject.status) {

        case Status.InQueue:

            if (input === BtnInput.Next) {
                console.log('I did some work.');
                myAwesomeObject.status = Status.Processed;
            }

            if (input === BtnInput.Cancel) {
                console.log('Work was canceled.');
                myAwesomeObject.status = Status.Canceled;
            }

            break;


        case Status.Processed:

            if (input === BtnInput.Next || input === BtnInput.Cancel) {
                console.log('Already processed!');
            }

            break;


        case Status.Canceled:

            if (input === BtnInput.Next || input === BtnInput.Cancel) {
                console.log('Already canceled!');
            }

            break;

        default:

            console.error(myAwesomeObject.status + ' is not a recognizable status.');

            break;
    }

}