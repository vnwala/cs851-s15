import glob

read_files = glob.glob("/home/vnwala/TEXT/*.txt")

with open("HtmlResults.txt", "wb") as outfile:
    for f in read_files:
        with open(f, "rb") as infile:
            outfile.write(infile.read())