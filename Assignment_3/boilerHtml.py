import requests
import justext
import hashlib
from hashlib import md5
import os



from boilerpipe.extract import Extractor

fh = open("NonDup.txt",'r')
for line in fh:


    try:
		extractor = Extractor(extractor='ArticleExtractor', url=line)
		extracted_html = extractor.getHTML()
		print extracted_html
	except BaseException, e :
		print 'failed because,',str(e)