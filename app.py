# Import Dependencies 
from flask import Flask, render_template, redirect , url_for, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
#import scrape_mars
import os
# Create an instance of Flask app
app = Flask(__name__)

app.config['MONGO_URI']="mongodb+srv://user1:Test1234@cluster0-hbedt.mongodb.net/restaurantratings?retryWrites=true&w=majority"
mongo1 = PyMongo(app)
rest_info= mongo1.db.restaurantscore
resp = dumps(rest_info.find())
# Main route for the flask application index.html will be served form here 
@app.route("/")
def home(): 

    # Find data
    
    #print(restaurant_info)
    # Return template and data
    return render_template("index.html")
    
#Rest API to get all the business from the DB
@app.route("/getallbusiness", methods= ['GET'])
def getAllBusiness():
      
    return resp


#Rest API to get one  business given an ID from the DB
@app.route("/getbusiness/<id>", methods= ['GET'])
def getOneBusiness(id):
    print(id)
    resp= []
    for d in data:
        if d['business_id']== str(id):
            resp.append(dumps(d))
            print( resp)
    #rest_info= mongo1.restaurantscore.find_one({'id':ObjectId(id)})    
    #resp = dumps(rest_info.find_one({'business_id':ObjectId(id)}))
    return resp

@app.route("/search")
def search(): 
    title = "Search you favorite restaurant"
    return  render_template("search.html" )

@app.route("/mapsui")    
def mapsui():       
    title = "View restaurants in map"
    #restaurant_info = mongo.db.restaurantratings
    #return render_template("index.html", restaurant_info=restaurant_info)
    return render_template("map.html" )

@app.route("/stats")
def stats():
    #restaurant_info = mongo.db.restaurantratings
    return render_template("stats.html" )
@app.route("/about")
def about():
    return render_template("about.html" )

if __name__ == "__main__": 
    app.run(debug= True)
