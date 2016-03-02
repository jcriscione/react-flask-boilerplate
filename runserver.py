import os
import sys
from server import app


def runserver():
    if len(sys.argv) > 1:
        portNum = sys.argv[1]
    else:
        portNum = '8000'
    port = int(os.environ.get('PORT', portNum))
    app.debug = True
    app.run(host='0.0.0.0', port=port)

if __name__ == '__main__':
    runserver()