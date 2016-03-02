
import os

from os import path
from flask import Flask, request, Response, render_template
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort
from server import app

import grp
import pam
import json
import flask
from flask_jwt import JWT, jwt_required, _jwt, current_identity
from flask import jsonify
from flask import current_app
from flask_restful import Resource
from flask.ext.cors import CORS
from datetime import timedelta, datetime
from random import randint

productionPath = "/some/path"
localPath = "server/data"


# Flask-JWT depends on this type of object to generate a new token
class User(object):
    def __init__(self, id, username, role):
        self.id = id
        self.username = username
        self.role = role

    def __str__(self):
        return "User(id='%s')" % self.id

# Checks whether the user is in the group
def checkRole(username, group):
    grpmem =  grp.getgrnam(group).gr_mem
    isValid = username in grpmem
    #print("User is in " + group +" "+ str(isValid))
    return isValid

# Use PAM for Linux authentication
def checkCredentials(username, password):
    # p = pam.pam()
    # isValid = p.authenticate(username, password)
    # return isValid 
    return True

# Defaults to /auth
def authenticate(username, password):
    if (checkCredentials(username, password) == True):
        role = getRole(username)
        print("User role is " + role)
        return User(id=1, username=username, role=role)

# Identity check, called each time before data is retrieved
def identity(payload):
    username = payload['identity']
    role = payload['role']
    if (checkRole(username, 'all_users') == True):
        return User(id=1, username=username, role=role)

# Retrieve user's role
def getRole(username):
     return 'user'
     # if (checkRole(username, 'web_adm') == True):
     #    return 'web_adm'
     # if (checkRole(username, 'all_users') == True):
     #    return 'all_users'
     # else:
     #    flask.abort(404)

# Check to see if we're in dev or in production, no identity required
def getDataPath():
     if (os.environ["HOME"] == productionPath):
        return productionPath + "/data" 
     else:
        return localPath

def getJSONData(filename):
  dataPath = getDataPath() + filename;
  if (os.path.exists(dataPath) == True):
    with open(dataPath) as json_file:
      json_data = json.load(json_file)
      return jsonify(json_data)
  else:
      flask.abort(404)

# Auth setup & Cross Origin Requests enabled
app.config['SECRET_KEY'] = 'jsik3ys3cr3tt1m3'
app.config['JWT_EXPIRATION_DELTA'] = timedelta(days=14) #seconds=300, days=14
jwt = JWT(app, authenticate, identity)
cors = CORS(app)

# Defines the contents of the JWT to be returned
@jwt.jwt_payload_handler
def make_payload(identity):
    iat = datetime.utcnow()
    exp = iat + app.config.get('JWT_EXPIRATION_DELTA')
    nbf = iat + app.config.get('JWT_NOT_BEFORE_DELTA')
    expiry = str(exp)
    print("Expiry time is " + str(exp))
    return {'exp': exp, 'iat': iat, 'nbf': nbf, 'identity': identity.username, "role": identity.role}

# Data routes
@app.route('/api/data/product')
@jwt_required()
def getPMProduct():
    return getJSONData("/test.json")  


# Index route
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def basic_pages(**kwargs):
    return render_template("index.html")
