import requests
import urllib2
from urlparse import urlparse
fh = open("urls3.txt",'r')
saveFile = open("NewUrl.txt",'a')
for line in fh:
	url=line
	

	try:
		def get_redirected_url(url):

		    opener = urllib2.build_opener(urllib2.HTTPRedirectHandler)
		    request = opener.open(url)
		    return request.url
		k = get_redirected_url (url)

                
		print k
		saveFile.write(k)
		saveFile.write('\n')
		

	except BaseException, e:
		saveFile.write('0')
		saveFile.write('\n')
saveFile.close()
fh.close()