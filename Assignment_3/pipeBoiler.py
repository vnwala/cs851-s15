import requests
import justext
import hashlib
from hashlib import md5
import os

fh = open("NonDup.txt",'r')
for line in fh:
	def computeMD5hash(message):
		m = hashlib.md5()
		m.update(message)
		return m.hexdigest()
	hashMessage = computeMD5hash(line)
	try:
			url=line
			response = requests.get(line)
			code = str(response.status_code)
			if code == '200':
				paragraphs = justext.justext(response.content, justext.get_stoplist("English"))
				for paragraph in paragraphs:
					if not paragraph.is_boilerplate:
						if len(paragraph.text) > 1:
							saveFile = open("successUrl.txt",'a')
							saveFile.write(str(line))
							saveFile.write('\n')
							saveFile.close()	
					
				for paragraph in paragraphs:
			  		if not paragraph.is_boilerplate:
			   			print paragraph.text
			   			saveFile = open("/home/vnwala/File/"+hashMessage+".txt",'a')
						saveFile.write(paragraph.text.encode('utf-8') + '\n')
						saveFile.close()
							
	except BaseException, e:
			print 'failed because,',str(e)
		


		