//----------------working through the problem----------
//Supposed to use GET method to get info from a cc db.
//Supposed to query a URL that has uid at the end (user id). When I do, will return all records in uid obj.
//  Paginated but can navigate by tacking on &page=num

//5 fields returned from API: page, num of results per page, total num of records in search res, total num of pages to be queried, and the data.

//The data has the id, timestamp when it was generated, the userId, the user name, the transaction type (credit vs debit), the amount, the location where the transaction happened, incl. id, address, city, and zip, and the IP address of the device who did the transaction.
//  user-id => uid, transaction type => txnType, and date/monthYear => MM-YYYY
// WANTS num of records generated by uid in monthYear which has a transaction type of txnType (so cc or dc?). Transaction must be greater than monthly avg spending.
//  So I also need to calculate monthly avg spending.

//Params: Not case-sensitive.


//why are we only getting 1 page? We need to modify the fetch such that it returns a range.

//function will take uid, txnType, and monthYear
//Array of ids that match the query params. Wants it sorted
//Query https://jsonmock.hackerrank.com/api/transactions/search?userId=${uid}, which will return first page of records attached to id, also info on total num of records/pages that that id shows up in. 
//Second query: Query `https://jsonmock.hackerrank.com/api/transactions/search?userId=${uid}&page=${user.total_pages[i]}` as many times as you need to get the remaining pages. 
//Could call 'user' jsonData. Will have the given properties, such as total_pages and data arr. 
//Need to store the json response from first page and from each additional page. 
  // append them to an array (but don't append arrays to arrays). .forEach() b/c you don't need the return val that .map() provides.
//------------end working through the problem----------

"use strict";

const res = require("express/lib/response");
const { append, json } = require("express/lib/response");
// The following is minimized under 'use strict' until otherwise indicated
const fs = require("fs");
const { ppid } = require("process");

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
//uid: id for which records will be fetched but matched with user.id in the returned response (INTEGER), given txnType (STRING), given timeframe by which it needs to be filtered(MM-YYYY).
//

//-------------begin initial attempt----------------
async function getUserTransaction(uid, monthYear, txnType) {
  let response = await fetch(
    `https://jsonmock.hackerrank.com/api/transactions/search?userId=${uid}`
  );
  let user = await response.json();
	
    let sortedUsers = user.data.filter((e) => {
      let month = `${new Date(e.timestamp).getMonth()}`;
      let year = `${new Date(e.timestamp).getFullYear()}`;
      let fullDate = `${month}-${year}`;

      return fullDate === monthYear && e.txnType === txnType 
    }                   
  )
  return sortedUsers.map(e=>e.id)
}

getUserTransaction(4, '2-2019', 'credit').then(result=>console.log(result))

let total_results = []
for (page_num in new Range(30)){
let url = `https://jsonmock.hackerrank.com/api/transactions/search?userId=${uid}&page=${page_num}`
  response = requests.get(url)
    data = response.json()
    total_results = total_results + data['results']
}

let url=`https://jsonmock.hackerrank.com/api/transactions/search?&page=${page_num}`
response = requests.get(url)

// helper function that awaits this function and then returns it when problem is fulfilled?
// Await the first fetch based on uid and grabbing the total amount of pages
// get total amount of pages and store as a var. do a loop to do what we did in the rest of the function and filter based on that
// don't return each page, return total
//at bottom of instructional (line 83), try to get that sample case to work. 
// First thing to do is to get every single transaction for an id
//-------------end initial attempt----------------

//-------------second attempt----------------
//So apparently I'm not really going about this the right way. 
//This challenge wants me to find the # of records that have been generated in a given month/year, belong to a single user id, are debit transactions AND
//this is the part I hadn't been taking into account
// The transaction amount is > monthly avg spending. 
//    Avg spending is calculated using the debit records in the given month. 

//this function is the parent function and the one given by Hackerrank.
async function getUserTransactions(uid, monthYear, txnType){
  const responseOne = await queryOne(uid)
 
  //do queries for extra pages if needed
  const extraResponses =
  responseOne.total_pages > 1 ?
     await extraQueries(uid, responseOne.total_pages) : []
  
  const txnArray = createTxnArray(responseOne, extraResponses)
  // return txnArray

  //calculate the average
  const avgTxnCost = calcAveragePerMonth(txnArray, monthYear)
  return avgTxnCost

    //filter for desired transactions
  const filteredArray = filterTransactions(txnArray, monthYear, txnType, avgTxnCost)

    //create list of txn ids sorted
  const result = sortTxnArray(filteredArray)

  return result
}


async function queryOne(uid){
  let response = await fetch(
    `https://jsonmock.hackerrank.com/api/transactions/search?userId=${uid}`
  );
  let jsonData = await response.json();     
  return jsonData
}

async function extraQueries(uid, totalPages){
  let totalData = []
  for(i=2;i<=totalPages;i++){
    let response = await fetch(`https://jsonmock.hackerrank.com/api/transactions/search?userId=${uid}&page=${i}`)
    const data = await response.json()
   totalData.push(data)
  }
  return totalData 
}

function createTxnArray(responseOne,extraResponses){
  const txnArray = []

  if(extraResponses){
    txnArray.push(responseOne)
    extraResponses.forEach((e)=> txnArray.push(e))
  }else{
    txnArray.push(responseOne)
  }
  console.log(txnArray)
  return txnArray.data
}

//TODO: See if we can make a helper function that get rids of individual pages so we can access the stuff w/in it easier. 
function calcAveragePerMonth(txnArray, monthYear){
  //calculate and return avg txn number. This has to be of the txnType = 'debit'
  return txnArray.map((e)=>
                      {return e.filter((e)=>
    {
    	let month = `${new Date(e.timestamp).getMonth()}`;
    let year = `${new Date(e.timestamp).getFullYear()}`;
     let fullDate = month < 10 ?  `0${month}-${year}` :  `${month}-${year}`
    // let sum
    return fullDate === monthYear
  	})           }
               )
  
  // if(fullDate = monthYear){
  //   for(let i in txnArray){
  //     sum += txnArray[i]
  //   }
  //   const numbersCount = txnArray.length
  //   return (sum / numbersCount)
  // }
}

function filterTransactions(txnArray, monthYear, txnType, avgTxnCost){
  //This is supposed  to be filtering for desired transactions. What are those transactions? 
  //Needs to be in a designated month: monthYear
  // Needs to have a designated txnType: txnType
  // The transaction amount (txnArray.amount) needs to be greater than the monthly avg spending (avgTxnCost) => txnArray.amount > avgTxnCost
//Return filtered arr
  let filteredArray = txnArray.filter((e)=>{
    e.amount > avgTxnCost[i] 
    && e.fullDate ==  monthYear 
    && e.txnType == txnType
  })
  return filteredArray;
}

function sortTxnArray(filteredArray){
//return the sorted arr
  return filteredArray.sort((a,b)=>a-b)
}

getUserTransactions(4,'2-2019').then((res)=>console.log(res))
//-------------end second attempt----------------

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