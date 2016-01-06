# Python class for table  
# Created on 6 janv. 2016 ( Time 18:22:18 )


#
# This class defines the Author object 
#
 
class Author:
	
	# Default constructor.
	def __init__(self):
		pass
     
	def __init__(self ,birthdate ,lastname ,firstname ):
		# super(AuthorData,self).__init__();
		self.birthdate = birthdate;
		self.lastname = lastname;
		self.firstname = firstname;
		