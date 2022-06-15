/*
The following is the solution to the Hackerrank challenge, but with commentary added to it. This commentary includes things like what problems I faced, what I did to solve them, etc.
*/
//---------------final result--------------------
("use strict");

const fs = require("fs");
//so I initially tried to use fetch. Problem is, this is supposed to be 100% back-end, and fetch is attached to the browser. I tried to figure out what I could do instead, and the internet suggested that I try axios. So I required axios, as you see below. That's all I changed in this part before the parent function.
const axios = require("axios");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

//beginning of function I coded

async function getUserTransaction(uid, txnType, monthYear) {
  /*To make the function cleaner, I was advised to break up the parent function into something more async await-y, as well as abstracted. So you'll see that this function calls a bunch of external functions. Those functions are where the logic happens. 
  It was also interesting because I had never formatted anything this way before. I call the functions outside of this parent function and set them equal to vars, when I then use as parameters within other function calls. Pretty cool.
  */
 //do query #1. This was just getting the json response from the first page.
  const responseOne = await queryOne(uid);

  //do queries for extra pages if needed (which was)
  const extraResponses =
    responseOne.total_pages > 1
      ? await extraQueries(uid, responseOne.total_pages)
      : [];

    //This step combined the results of the prev two functions. 
  const combinedArray = createCombinedArray(responseOne, extraResponses);
  console.log(combinedArray.length);

  // This step filtered the results from combinedArray into a certain month and with a certain transaction type.
  const monthAndTxn = filterByMonthAndTxn(combinedArray, monthYear, txnType);

  //This is one of the newest things implemented. I had hard coded 'debit' within the filterByMonthAndTxn function, and as a consequence it was failing a bunch of test cases. 
  const monthAndTxnDebit = filterByMonthAndTxn(
    combinedArray,
    monthYear,
    "debit"
  );

  const avgTxnCost = calcAveragePerMonth(monthAndTxnDebit, monthYear);

  const greaterThanAverage = filterTransactions(monthAndTxn, avgTxnCost);
  return greaterThanAverage;
}

async function queryOne(uid) {
  let response = await axios.get(
    `https://jsonmock.hackerrank.com/api/transactions/search?userId=${uid}`
  );
  let jsonData = response.data;
  return jsonData;
}

async function extraQueries(uid, totalPages) {
  let totalData = [];
  for (let i = 2; i <= totalPages; i++) {
    let response = await axios.get(
      `https://jsonmock.hackerrank.com/api/transactions/search?userId=${uid}&page=${i}`
    );
    const data = response.data;
    totalData.push(data.data);
  }
  return totalData;
}

function createCombinedArray(responseOne, extraResponses) {
  const txnArray = [];
  let combinedArray = [];
  if (extraResponses) {
    txnArray.push(responseOne.data);
    extraResponses.forEach((e) => txnArray.push(e));
  } else {
    txnArray.push(responseOne.data);
  }

  txnArray.forEach((e) => {
    return e.forEach((f) => {
      return combinedArray.push(f);
    });
  });
  return combinedArray;
}

function filterByMonthAndTxn(combinedArray, monthYear, txnType) {
  let filteredArray = combinedArray.filter((e) => {
    let month = new Date(e.timestamp).getUTCMonth();
    let year = new Date(e.timestamp).getUTCFullYear();
    let fullDate =
      month < 10 ? `0${month + 1}-${year}` : `${month + 1}-${year}`;
    return fullDate === monthYear && e.txnType === txnType;
  });
  return filteredArray;
}

function convertStringToFloats(str) {
  return Number(str.replace(/\$|\,/g, ""));
}

function calcAveragePerMonth(monthAndTxn, monthYear) {
  let dollarAmounts = monthAndTxn.map((e) => e.amount);
  let dollarAmountsFloats = dollarAmounts.map((e) => convertStringToFloats(e));
  let average =
    dollarAmountsFloats.reduce((acc, c) => (acc += c), 0) / monthAndTxn.length;
  return average;
}

function filterTransactions(monthAndTxn, avgTxnCost) {
  let result = [];
  monthAndTxn.forEach((e) => {
    convertStringToFloats(e.amount) > avgTxnCost ? result.push(e.id) : null;
  });
  return result.length > 0 ? result : [-1];
}
//---------------end final result--------------------

//provided function
async function main() {
  //the following is minimized in the editor until otherwise indicated
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const uid = parseInt(readLine().trim(), 10);

  const txnType = readLine();

  const monthYear = readLine();

  const result = await getUserTransaction(uid, txnType, monthYear);

  ws.write(result.join("\n") + "\n");

  ws.end();
  //end minimized text under async function main()
}