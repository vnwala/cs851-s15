import os
import glob
import subprocess
import re
from decimal import *
from collections import Counter

fh = glob.glob("/home/vnwala/File/*.txt")
for line in fh:
	url=line
	url=url.replace('\n','')
	with url as f1,open('y.txt','w') as f2:
	    c=Counter(x.strip() for x in f1)
	    for x in c:
	        print x,c[x]