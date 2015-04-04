
file = open ( "HtmlResults.txt", "r" )
text = file.read()
file.close()
word_list = text.lower().split(' ')
word_freq = {}
saveFile = open('word.txt','a')
for word in word_list:
    word_freq[word] = word_freq.get(word, 0) + 1
keys = sorted(word_freq.keys())
for word in keys:
    print "%-10s %d" % (word, word_freq[word])
    saveFile.write(word+' '+str(word_freq[word])+'\n')
saveFile.close()
