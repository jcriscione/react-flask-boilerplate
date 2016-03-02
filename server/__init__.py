
from __future__ import print_function
import os
from os import path
import json
from flask import Flask, request, Response
from flask import render_template, send_from_directory, url_for

static_assets_path = path.join(path.dirname(__file__), "_assets")
app = Flask(__name__, static_folder=static_assets_path)

app.url_map.strict_slashes = False

import server.controllers