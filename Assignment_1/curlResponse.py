# -*- coding: utf-8 -*-
import requests
import urllib2
import urllib
from urlparse import urlparse
import subprocess
import os, sys
import httplib
import re



#saveFile = open("code.txt",'a')

fh = open("urls3.txt",'r')

for line in fh:
	count = 0
	try:
		url=line
		word = 'HTTP/1.'
		proc = subprocess.Popen(["curl $1 -s -L -I "  + url ], stdout=subprocess.PIPE, shell=True)
		(out, err) = proc.communicate()
		index = 0
		while index < len(out):
		        index = out.find(word, index)
		        if index == -1:
		            break
		        end = index + 13
		        res = out[index:end]
		        res1 = res.split()
		        #print res1[1]
		        if ( res1[1] == '301' or  res1[1] == '302' or  res1[1] == '303' or  res1[1] == '307'):
		        	count = count + 1
		        else:
		        	#count = 0
		        #if count != 0:
		        	print count
		        	if count != 0:
			        	saveFile1 = open("NewCount.txt",'a')
			        	saveFile1.write(str(count) + '\n')
			        	saveFile1.close()
		        #saveFile.write(str(res1[1]) + '\n')
	            #saveFile.write()
		        index +=7
	except BaseException, e:
		print 'failed ',str(e)
	



	        

