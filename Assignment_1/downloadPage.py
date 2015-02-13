import requests
import urllib2
import urllib
from urlparse import urlparse
import subprocess
import os, sys
import httplib
import re

fh = open("NewUrl.txt",'r')
count = 0
for line in fh:
	try:
		url=line

		proc = subprocess.Popen(["wget -e robots=off -P ./wgetFiles/ -p -k  "  + url ], stdout=subprocess.PIPE, shell=True)
		(out, err) = proc.communicate()
	except BaseException, e:
		print 'failed ',str(e)

