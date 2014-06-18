from win32com.client import Dispatch

class TDT ( object ):

	"""
	TDT ActiveX Wrapper

	- a very thin wrapper around the TDT ActiveX API

	"""


	def __init__( self ):
		super(TDT , self).__init__()
		self.TTX = Dispatch('TTank.X')
		self.TTX.ConnectServer('Local','python-rpc')

	def open ( self, tank, block ) :
		return True if self.TTX.OpenTank( tank,'R') and self.TTX.SelectBlock( '~' + block ) else False


	# make the output javascript safe
	# TODO typecast output
	def datawrap ( func ) :
		def datawrapCall(*args, **kwargs):
			return func(*args,**kwargs)
		return datawrapCall


	@datawrap
	def parseEv ( self, recIndex, numRecs ) :
		return self.TTX.ParseEvV( recIndex, numRecs )


	def readEventsSimple ( self, storeName ) :		
		return self.TTX.ReadEventsSimple( storeName )



if __name__ == "__main__":

	tdt = TDT()

	tank = 'C:\\TDT\\OpenEx\\MyProjects\\OptoTaggingTest_6-05\\DataTanks\\Demotank2'
	block = '6_13_14_10Min_stim2'

	tdt.open( tank, block )
	n = tdt.readEventsSimple( 'eNeu' )
	tdt.parseEv(0,n)

	{
		eNeu

	}
		