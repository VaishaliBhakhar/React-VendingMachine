# React-VendingMachine
Develop a vending machine of snicker bars. 


1. Clone the repo.

2. Go to project folder `cd React-VendingMachine`

3. Install all dependancies by `npm install`

4. Run it by command `npm start`

5. to run test cases `npm run test`



**Challenge**

You are to write an application to represent a very basic Snickers Machine.

● A machine currently holds 2 Snickers bars and allows for a maximum of 10

● Bars are to be sold at $1.60 each

● 5 coin banks (max 25 coins per row):

     ○ 10c (8 coins in the bank)
     ○ 20c (25 coins in the bank)
     ○ 50c (5 coins in the bank)
     ○ $1 (11 coins in the bank)
     ○ $2 (15 coins in the bank)

● Customers can cancel the transaction at any point prior to the dispensing of the snack.

● Coins will be inserted into the machine by the customer in the order given.

● Once the customer has put in sufficient coins they press a ‘Dispense’ button (bars are dispensed one at a time)

● If the machine does not have sufficient change when the ‘Dispense’ button is pressed, the transaction is cancelled.

● Aborted/cancelled transaction does not need to have the original coins returned, but must be the same amount.

● Bonus points for alerting the operator that the machine is running low.


<br/><br/>
<br/>
**Scenarios (to be executed in succession)**

● Customer 1

○ Attempts to purchase a Snickers Bar with $1.70 (50c, 50c, 50c, 20c)

○ Expected: Coin bank full, 20c immediately returned, the customer chooses to cancel, $1.50 is returned

● Customer 2

○ Attempts to purchase a Snickers with $2 ($1, 10c, 10c, 10c, 10c, 10c, 50c)

○ Expected: Snickers issued, 40c change

● Customer 3

○ Attempts to purchase a Snickers Bar with $1.60 (50c, 50c, 50c, 10c)

○ Expected: Snickers Bar is issued, no change

● Customer 4

○ Attempts to purchase a Snickers Bar with $2 ($2)

○ Expected: Transaction cancelled, insufficient snacks, $2 is returned

● Operator 1

○ Restocks machine with 10 Snickers, but leaves the coin banks untouched

● Customer 5

○ Attempts to purchase a Snickers with $1.65 (50c, 50c, 50c, 5c, 10c)

○ Expected: Coin unsupported warning displayed, 5c is returned, Snickers Bar issued
