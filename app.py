#!/usr/bin/env python

import os

from flask import (
	Flask,
	render_template
)

app = Flask(__name__)
log = app.logger

@app.route('/')
def index_page():
	return render_template('index.html')


if __name__ == '__main__':
	port = int(os.getenv('PORT', 5000))

	app.run(
		debug=True,
		port=port,
		host='0.0.0.0'
	)