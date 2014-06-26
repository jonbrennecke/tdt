from win32com.client import Dispatch
import unicodedata

class TDT ( object ):

	"""
	TDT ActiveX Wrapper

	- a wrapper around TDT's OpenEx ActiveX API

	"""


	def __init__( self ):
		super(TDT , self).__init__()
		self.TTX = Dispatch('TTank.X')
		self.TTX.ConnectServer('Local','python-rpc')

	def setActive ( self, tank, block ) :
		self.TTX.CloseTank()
		return True if self.TTX.OpenTank( tank,'R') and self.TTX.SelectBlock( '~' + block ) else False


	def openTank ( self, tank ) :
		return self.TTX.OpenTank( tank,'R')

	# make the output javascript safe by
	# typecasting output to something that javascript can understand
	def normalize ( func ) :
		def normalizeCall(*args, **kwargs):
			call = func(*args,**kwargs)
			if isinstance(call, list) :
				return [ el.encode('ascii', 'ignore') for el in call ]
			else :
				return call.encode('ascii', 'ignore')
		return normalizeCall
		


	def parseEv ( self, recIndex, numRecs ) :
		return self.TTX.ParseEvV( recIndex, numRecs )


	def readEventsSimple ( self, storeName ) :		
		return self.TTX.ReadEventsSimple( storeName )


	def getBlockNames ( self, tank ) :
		i, blocks = 0, []
		if self.openTank( tank ) :
			while True :
				blockname = self.TTX.QueryBlockName(i)
				if not blockname :
					break
				else :
					blocks.append( blockname )
					i+=1
		return blocks


	def getTankNames ( self ) :
		i, tanks = 0, []
		while True :
			tankname = self.TTX.GetEnumTank(i)
			if not tankname :
				break
			else :
				tanks.append( tankname )
				i+=1
		return tanks

	def getStoreNames ( self ) :
		lStores = self.TTX.GetEventCodes(0)
		return [self.TTX.CodeToString(lStores[i]) for i in range(0,len(lStores)) ]



# testing
if __name__ == "__main__":

	tdt = TDT()

	tank = 'D:\\OptoTagging\\6_16_14'
	block = '6_16_14_10min_Stim'

	tdt.open( tank, block )
	# n = tdt.readEventsSimple( 'eNeu' )
	# print tdt.parseEv(0,n)
	print tdt.getTankNames()