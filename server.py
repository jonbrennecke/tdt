
"""

RPC server for TDT Data

"""

import tornado.ioloop
import tornado.options
import tornado.web
import tornado.websocket
import os.path
import uuid
import json

from tornado.options import define, options

define("port", default=8888, help="run on the given port", type=int)



class Application( tornado.web.Application ):

	"""
	Tornado Application
	"""

	def __init__(self):
		handlers = [
			(r"/websocket", WSServer),
		]
		settings = dict(
			cookie_secret="1234",
			template_path=os.path.join(os.path.dirname(__file__), "templates"),
			static_path=os.path.join(os.path.dirname(__file__), "static"),
			xsrf_cookies=True,
		)
		tornado.web.Application.__init__(self, handlers, **settings)




class WSServer( tornado.websocket.WebSocketHandler ) :

	"""
	WebSocket server
	"""

	def open(self):
		print "WebSocket opened"

	# handle input from socket
	def on_message( self, message ) :

		# unstringify the JSON message
		data = json.loads( message )

		self.write_message()


	def on_close( self ):
		print "WebSocket closed"



def main():
    tornado.options.parse_command_line()
    app = Application()
    app.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()

