# Import Dependencies 
from flask import Flask, render_template, redirect , url_for, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps
#import scrape_mars
import os
# Create an instance of Flask app
app = Flask(__name__)

app.config['MONGO_URI']="mongodb+srv://user1:Test1234@cluster0-hbedt.mongodb.net/restaurantratings?retryWrites=true&w=majority"
mongo1 = PyMongo(app)
rest_info= mongo1.db.restaurantscore
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
    
    #print(restaurant_info)
    # Return template and data
    return render_template("index.html", restaurant_info = restaurant_info)
    
# Route that will trigger scrape function

@app.route("/getallbusiness", methods= ['GET'])
def getAllBusiness():
  

    #rest_info= mongo1.restaurantscore.find()
    resp = dumps(rest_info.find())
    print(resp[0])
    return resp

@app.route("/getbusiness/<id>", methods= ['GET'])
def getOneBusiness(id):
    #rest_info= mongo1.restaurantscore.find_one({'id':ObjectId(id)})
    resp = dumps(rest_info.find_one({'_id':ObjectId(id)}))
    return resp

@app.route("/search")
def search(): 
    title = "Search you favorite restaurant"
    return  render_template("search.html", restaurant_info = restaurant_info, title= title )

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
