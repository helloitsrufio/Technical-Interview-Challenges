'use strict';

// The following is minimized under 'use strict' until otherwise indicated
const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}
//end minimized text under 'use strict'

/*
 * Complete the 'getUserTransaction' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER uid
 *  2. STRING txnType
 *  3. STRING monthYear
 *
 *  https://jsonmock.hackerrank.com/api/transactions/search?userId=
 */

async function getUserTransaction(uid, txnType, monthYear) {

}
async function main() {
    //the following is minimized in the editor until otherwise indicated
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const uid = parseInt(readLine().trim(), 10);

    const txnType = readLine();

    const monthYear = readLine();

    const result = await getUserTransaction(uid, txnType, monthYear);

    ws.write(result.join('\n') + '\n');

    ws.end();
    //end minimized text under async function main()
}