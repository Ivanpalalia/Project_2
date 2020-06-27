# Import Dependencies 
from flask import Flask, render_template, redirect 
from flask_pymongo import PyMongo
#import scrape_mars
import os




# Create an instance of Flask app
app = Flask(__name__)

# Use flask_pymongo to set up mongo connection locally 
#mongo = pymongo.MongoClient('mongodb+srv://user1:Test1234@cluster0-hbedt.mongodb.net/restaurantratings?retryWrites=true&w=majority', maxPoolSize=50, connect=False)
#app.config["MONGO_URI"] = "mongodb+srv://user1:Test1234@cluster0-hbedt.mongodb.net/restaurantratings?retryWrites=true&w=majority"
#mongo = PyMongo(app)
#col_results = json.loads(dumps(col.find().limit(5).sort("time", -1)))
#db = pymongo.database.Database(mongo, 'restaurantratings')
#col = pymongo.collection.Collection(db, 'restaurantscore')
# Create route that renders index.html template and finds documents from mongo
#restaurant_info = mongo.db.restaurantratings.find_one()
restaurant_info=[
    {
        "business_id": "1000",
        "business_name": "HEUNG YUEN RESTAURANT",
        "business_address": "3279 22nd St",
        "business_city": "San Francisco",
        "business_state": "CA",
        "business_postal_code": "94110",
        "business_latitude": "37.755282",
        "business_longitude": "-122.420493",
        "business_location": {
            "type": "Point",
            "coordinates": [
                -122.420493,
                37.755282
            ]
        },
        "inspection_id": "1000_20190712",
        "inspection_date": "2019-07-12T00:00:00.000",
        "inspection_type": "Reinspection/Followup"
    },
    {
        "business_id": "1000",
        "business_name": "HEUNG YUEN RESTAURANT",
        "business_address": "3279 22nd St",
        "business_city": "San Francisco",
        "business_state": "CA",
        "business_postal_code": "94110",
        "business_latitude": "37.755282",
        "business_longitude": "-122.420493",
        "business_location": {
            "type": "Point",
            "coordinates": [
                -122.420493,
                37.755282
            ]
        },
        "inspection_id": "1000_20190617",
        "inspection_date": "2019-06-17T00:00:00.000",
        "inspection_score": "72",
        "inspection_type": "Routine - Unscheduled",
        "violation_id": "1000_20190617_103109",
        "violation_description": "Unclean or unsanitary food contact surfaces",
        "risk_category": "High Risk"
    }
]


@app.route("/")
def home(): 

    # Find data
    
    print(restaurant_info)
    # Return template and data
    return render_template("index.html", restaurant_info = restaurant_info)
    
# Route that will trigger scrape function
@app.route("/search")
def search(): 

    
    
    #restaurant_info = mongo.db.restaurantratings
    
    #restaurant_info.update({}, restaurant_info, upsert=True)

    return  render_template("search.html", restaurant_info = restaurant_info)
    
    
@app.route("/mapsui")    
def mapsui():
    #restaurant_info = mongo.db.restaurantratings
    #return render_template("index.html", restaurant_info=restaurant_info)
    return restaurant_info

@app.route("/stats")
def stats():
    #restaurant_info = mongo.db.restaurantratings
    return restaurant_info


if __name__ == "__main__": 
    app.run(debug= True)
