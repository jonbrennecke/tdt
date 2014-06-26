
"""

RPC server for TDT Data

"""

import tornado.ioloop
import tornado.options
import tornado.web
import tornado.websocket
import time, threading, json
from tdt.tdt import TDT

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
		tornado.web.Application.__init__(self, handlers)

		


class WSServer( tornado.websocket.WebSocketHandler ) :

	"""
	WebSocket server
	"""

	def __init__( self, application, request, **kwargs ) :
		super( WSServer, self ).__init__( application, request, **kwargs)
		self.tdt = TDT()

	def get(self):
		self.write('hello world')

	def open(self):
		print "WebSocket opened"

	# handle input from socket
	def on_message( self, message ) :

		# unstringify the JSON message
		data = json.loads( message )

		if hasattr( TDT, data["function"] ) and callable( getattr( TDT, data["function"] ) ) :
			
			if "args" in data :
				jsonEncoded = json.dumps( getattr(self.tdt, data["function"])( data["args"] ) )
			else :
				jsonEncoded = json.dumps( getattr(self.tdt, data["function"])() )

			self.write_message( jsonEncoded )

		else :
			self.write_message( json.dumps( AttributeError() ) )


	def on_close( self ):
		print "WebSocket closed"


def startTornado():
    tornado.options.parse_command_line()
    app = Application()
    app.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()

def stopTornado():
    tornado.ioloop.IOLoop.instance().stop()


if __name__ == "__main__":


	startTornado()

    # threading.Thread(target=startTornado).start()
    # time.sleep(50)
    # stopTornado()


