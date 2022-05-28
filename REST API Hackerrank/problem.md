# REST API: Transaction By Avg Monthly Spending

In this challenge, use the HTTP GET method to retrieve information from a db of credit card transactions for users. Query *https:jsonmock.hackerrank.com/api/transactions/search?userId=uid* where uid is the id of the user that made the transaction. This will return all records that belong to the given userId. The query response is paginated and can be further accessed by appending to the query string *&page=num* where num is the page number.

The query response from the API is a JSON response with the following five fields:
  - *page*: the current page
  - *per_page*: the maximum number of results per page
  - *total*: total number of records in the search result
  - *total_pages*: the total number of pages which must be queried to get all the results. 
  - *data*: an array of JSON objects that contain transaction records.

The data field in the response contains a list of transaction records, with each transaction record following the below-described schema:

  - *id*: the unique ID of the record
  - *timestamp*: the timestamp when the record was generated (in UTC milliseconds)
  - *userId*: the user id of the user who performed the transaction
  - *userName*: the user name of the user who performed the transaction
  - *txnType*: the transaction type on the transaction. Allowed values are *debit* and *credit*.
  - *amount*: the transaction amount, stored as a string with the currency structure and prefixed with the $ sign, e.g. '2,273.95'.
  - *location*: object, the location description of the transaction
      -*location.id*: the id of the location where the transaction took place
      -*location.address*: the address of the location where the transaction took place
      -*location.city*: the city where the transaction took place
      -*location.zipCode*: the zip code of the location where the transaction took place.
  - *ip*: the IP address of the device which was used to perform the transaction.

 There will be a given user-id, *uid*, a transaction type, *txnType*, and a date in the format *MM-YYYY* as *monthYear*. Find the number of records that have been generated in *monthYear* which belong to the user uid, ahve a transaction type of *txnType*, and the transaction amount is greater than the monthly average spending. Average spending is calculated using *txnType = debit* records for the user in the given month *monthYear*. Note that the search is not case sensitive.

## Function Description

 Complete the function *getUserTransactions* using the given code. 

*getUserTransactions* has the following parameter(s):
  - *int uid*: the *id* for which records will be fetched, matched with *user.id* in the returned response from the API.
  - *string txnType*: the transaction type for which the records will be filtered.
  - *string monthYear*: the month and year for which the records will be filtered in the format MM-YYYY

Returns:
  - *int[]*: an array of *ids* containing the records matching the above criteria and sorted ascending. If no records are matched, return *[-1]*.

---
 ### Input Format for Custom Testing
 The first line contains an integer, *uid*
 The second line contains a string, *txnType*
 The third line contains a string *monthYear* in the format MM-YYYY.

 ### Sample Case 0

 #### Sample Input for Custom Testing

 STDIN         Function
 -----         --------
 4        =>   uid = 4
 debit    =>   txnType = 'debit'
 02-2019  =>   monthYear = '02-2019'

 #### Sample Output

 78
 88
 98

Given *uid* = 4, the query is *https:jsonmock.hackerrank.com/api/transactions/search?userId=4* and the response is:

[
    {id: 8,
     userId: 4,
     userName: 'Francesco de Mello',
     timestamp: 1548805761859,
     txnType: 'credit',
     amount: '$1,214.44',
     location:
        {id:1,
         address: '948 Entroflex, Franklin Avenue',
        city: 'Ilchester', 
        zipCode: 84181
        },
     ip: '35, 151.1.82'
    }...
]

 Calculate the average spending of the user (using transactions of type 'debit' for the user) in the *monthYear='02-2019'* which comes to 1509.16. After filtering the response of the API with *txnType = debit*, *monthYear = 02-2019*, the data has 5 records. There are 3 records in this set that have the transaction amount greater than the monthly spending average. Return an array that contains the *id*s of the transactions that match the criteria which are [76,88,98].