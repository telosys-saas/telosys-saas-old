# Python class for table  
# Created on 6 janv. 2016 ( Time 20:03:00 )


#
# This class defines the Book object 
#
 
class Book:
	
	# Default constructor.
	def __init__(self):
		pass
     
	def __init__(self ,date ,title ):
		# super(BookData,self).__init__();
		self.date = date;
		self.title = title;
		