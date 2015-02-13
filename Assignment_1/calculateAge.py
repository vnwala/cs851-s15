import time
import datetime
import calendar

fh = open("carbonDate.txt",'r')

date1 = '2015-02-04T00:00:00'
date1 = date1.split(" ")
date1[-1] = date1[-1][:18]
date1 = " ".join(date1)
epoch1 = int(calendar.timegm(time.strptime(date1, '%Y-%m-%dT%H:%M:%S')))
print  epoch1

for line in fh:
	date=line
	try:
		date = date.split(" ")
		date[-1] = date[-1][:18]
		date = " ".join(date)
		epoch = int(calendar.timegm(time.strptime(date, '%Y-%m-%dT%H:%M:%S')))
		
		t2 =epoch1 - epoch
		day = (t2/86400)
		day = abs(day)
		print day
		if day > 0:
			saveFile = open("day.txt",'a')
			saveFile.write(str(day))
			saveFile.write('\n')
			saveFile.close()
	except BaseException, e:
		print e


fh.close()
