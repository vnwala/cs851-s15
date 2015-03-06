import requests
import urllib2
import urllib
from urlparse import urlparse
import subprocess
import os, sys
import httplib
import re

fh = open("sample.txt",'r')
count = 0
for line in fh:
	try:
		url=line

		proc = subprocess.Popen(["wget --warc-file="+str(count)+" -p -l 1 "+url+"  "], stdout=subprocess.PIPE, shell=True)
		(out, err) = proc.communicate()
		count = count + 1
	except BaseException, e:
		print 'failed ',str(e)