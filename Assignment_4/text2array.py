import collections
import itertools 
import numpy as np
from sklearn.metrics import jaccard_similarity_score
import glob
import os

def find_ngrams(input_list, n):
  return zip(*[input_list[i:] for i in range(n)])


def jack(a,b):
    x=a.split()
    y=b.split()
    k=float(len(list(set(x)&set(y))))/float(len(list(set(x) | set(y))))
    return k

path1 = '/home/vnwala/NTEXT/'

path2 = '/home/vnwala/TEXT/'
for filename1 in glob.glob(os.path.join(path1, '*.txt')):
    for filename2 in glob.glob(os.path.join(path2, '*.txt')):
    	filename1.strip('/home/vnwala/NTEXT/')
    	filename2.strip('/home/vnwala/TEXT/')
	if filename1.strip('/home/vnwala/NTEXT/') == filename2.strip('/home/vnwala/TEXT/'):
		infile = open(filename1)
		words = collections.Counter()

		array = []
		for line in infile:
				  words.update(line.split())

				                              
		for word, count in words.iteritems():
				  array.append(word)



		infile = open(filename2)
		words = collections.Counter()
		array2 = []
		for line in infile:
				  words.update(line.split())
				                              
		for word, count in words.iteritems():
				  array2.append(word)
		array = find_ngrams(array,3)
		array2 = find_ngrams(array2,3)
		index  = jack(str(array),str(array2))
		print index
		saveFile = open("3gram_jacc.txt",'a')
		saveFile.write(str(index) + '\n')
		saveFile.close()



