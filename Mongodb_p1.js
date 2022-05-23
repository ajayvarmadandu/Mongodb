

/* (1) Create Database */

   /*  1-1. Create a database called usermanaged, drop it and create it again. Check which database you are currently in.*/

use usermanaged

db.dropDatabase()



/*  (2) Create a Collection & Insert a Record */

 /*    1-2. Create a collection called customers in usermanaged created in Exercise 1 and insert the document below. Check if the document is inserted correctly. */

	use usermanaged
db.customers.insert(
        { "firstName":"John",
          "lastName":"West",
          "email":"john.west@mail.com",
          "phone":"032345432134",
          "BusinessType": ["Sell", "Sugar", "Drinks"],
          "Reference":100,
          "Company":"Coca-Cola"})
	  
db.customers.drop()

	  
/* (3) Bulk Load JSON File */









/*	3-1. Create a collection called transactions in usermanaged (drop if it already exists) and bulk load the data from a json file, transactions.json. */

/* mongoimport --db usermanaged --jsonArray --collection transactions --drop --file C:\tmp\transaction.json */


/*	3-2. Append the records with the same file, transactions.json */

/* mongoimport --db usermanaged --jsonArray --collection transactions --mode insert --file C:\tmp\transaction.json */



/*	3-3. Upsert the record from the new file called transactions_upsert.json*/

/* mongoimport --db usermanaged --jsonArray --collection transactions --mode upsert --upsertFields Id --file  C:\tmp\transaction_upsert.json */


mongo
db.transactions.count()
db.transactions.find().pretty()

/*(4) Bulk Load CSV File - customers.csv */

/*	4-1. Create a collection and load data from a CSV file will multiple rows. Define the keys from the header row. */

/*mongoimport --db usermanaged --collection online_news_popularity --type csv --headerline --file C:\tmp\OnlineNewsPopularity.csv */


/* (5) Query MongoDB with Conditions - This question uses the collection (transactions) created in Exercise 3. */

/*	5-1. Find any record where Name is Tom */

db.transactions.find({Name: 'Tom'})

/*	5-2. Find any record where total payment amount (Payment.Total) is 400. */

db.transactions.find({"Payment.Total": 400 })
db.transactions.find({"Payment.Total": {$eq: 400}})

/*	5-3. Find any record where price (Transaction.price) is greater than 400. */

db.transactions.find({"Transaction.price": {$gt: 400} })
db.transactions.find({"Transaction.price": {$gte: 400} })


/*	5-4. Find any record where Note is null or the key itself is missing. */

db.transactions.find({"Note": null})


/*	5-5. Find any record where Note exists and its value is null. */

db.transactions.find({Note: {$exists: false } })


/*	5-6. Find any record where the Note key does not exist. */

db.transactions.find({Note: {$type: 10 } })


/* (6) Aggregation with MongoDB - This question uses the collection (transactions) created in Exercise 3. */

/*	6-1. Calculate the total transaction amount by adding up Payment.Total in all records. */

db.transactions.aggregate({
    $group: {
        _id: '',
        TotalRevenue: { $sum: '$Payment.Total' }
    }
 })

/*	6-2. Get the total price per record by adding up the price values in the Transaction array (Transaction.price). */

db.transactions.aggregate([
   {
     $project: {
       revenueTotal: { $sum: "$Transaction.price"},
     }
   }
])

/*	6-3. Calculate total payments (Payment.Total) for each payment type (Payment.Type). */

db.transactions.aggregate([
     {
       $group:
         {
          _id: "$Payment.Type",
           totalAmount: { $sum: "$Payment.Total" },
           count: { $sum: 1 }
         }
     }
])

/*	6-4. Find the max Id. */
db.transactions.aggregate([
    {
        $group:
        {
            _id: '',
            maxId: {$max: "$Id"}
        }
    }
])

/*	6-5. Find the max price (Transaction.price). */

db.transactions.aggregate([
    {
        $group:
        {
            _id: '',
            maxPrice: {$max: {$max: "$Transaction.price"}}
        }
    }
])


/* (7) CRUD Operations - This question uses the collection (transactions) created in Exercise 3. CRUD: Create, Read, Update and Delete. */

/*	7-1. Insert a record below. */
db.transactions.insert(
    {
    "Id": 110,
    "Name": "Inserted Record",
    "TransactionId": "tranNew1",
  "Transaction": [
    {
    "ItemId":"c324",
    "price": 456
    },
    {
    "ItemId":"d456",
    "price": 543  
    }
  ],
  "Subscriber": false,
  "Payment": {
    "Type": "Debit-Card",
    "Total": 999,
    "Success": true
  },
  "Note":'Hello World'
})

db.transactions.find({Id:110})

/*	7-2. Updating the new inserted record above. Make Name=’Updated Record’ & Note=’Updated!’ */


db.transactions.update({Id:110},{$set:{Name:'Updated Record',Note:'Updated!'}})

/*	7-3. Delete the record inserted above by using Id. */

db.transaction.remove({Id:110})


/* (8) User Creation */

/*	8-1. Create a read only user who can query records from collections from all databases. */

/*	8-2. Create a writer user who can create collections and do CRUD operations in any collections.*/

/*	8-3. Create a usermanaged user who can do the writer operation in the usermanaged database and read only for the rest of the databases. */









