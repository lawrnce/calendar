#Availability Calendar

<p align="center">
<img src="/assets/preview.png" />
</p>

A calendar that highlights an array of dates taken from an api endpoint.

##Installation

Download or clone the repo. Install [MongoDB](https://www.mongodb.org/downloads#production) and create a database called 'availabledates'.

##Usage

* Make sure MongoDB is running.
* In the root directory run `npm start`. 
* Open `http://localhost:3000` in your browser. 
* Refresh the page when database is updated.

####Create date
```
curl --data "date=YYYY-MM-DD" http://localhost:3000/api/date
```
Date must be in `YYYY-MM-DD` format. No duplicate dates.

####Delete date
```
curl -X DELETE http://localhost:3000/api/date/YYYY-MM-DD
```

##Author
Lawrence Tran

##License
GPL