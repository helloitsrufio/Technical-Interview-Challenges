//This is a Shopify interview, so they kind of tried to make it "real life"
//There is a vendor, Sharon. Vendor Sharon wants people to spend money in her shop. So, she wants people to spend the most money possible.
/**
You want to help Sharon to encourage her customers to buy the most expensive items. 
We are given two params:
- An arr of arrs with this sort of format:
[['pencil', 3], ['chalkboard', 10], ['paper', 2]]
- Another param that is supposed to represent the customer basket. like so
['pencil', 'marker]
We want to get the most expensive item and return it 
INSOFAR as it is not already in the customer basket. 
Supposed to return 'chalkboard'.
**/

//Recreation of Rufio soln from the interview
function recommend(pair, customerBasket) {
  let numericalPair = pair.sort((a, b) => b[1] - a[1]);
  // console.log(newPair)
  let newestPair = numericalPair.filter(
    (elem) => !customerBasket.includes(elem[0])
  );
  // console.log(newestPair)
  return newestPair[0][0];
}

recommend(
  [
    ["pencil", 3],
    ["marker", 4],
    ["chalkboard", 10],
    ["paper", 2],
  ],
  ["pencil", "marker"]
);

//pilferz soln
// let items = [ ['pencil', 3], ['marker', 4], ['chalkboard', 10], ['paper', 2] ];
// let cart = ['pencil', 'marker'];

// let mostExpensiveItem = items.filter(i => !cart.includes(i[0])).reduce((e, i) => i[1] > e[1] ? i : e, ['', 0]);
