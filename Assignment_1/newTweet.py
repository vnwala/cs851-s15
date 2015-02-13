import tweepy
import time
from datetime import datetime
import datetime

access_token = "384946837-aPnqh9DAtOKljCShMepwPJVg27dROGGysYuy9xog"
access_token_secret = "ow458SMzbIcAVZ3RL2nypCGYuqmkaoHTNlbZCVBiHG6FC"
consumer_key = "c3SExFZ3K6Do6Yw2Kwi84Strl"
consumer_secret = "CXobLgtdn8feYInLs659BxsjnBTCgfpmD5eEyENi1Bu6ttbfau"



#today = utc_datetime.strftime("%Y-%m-%d %H:%M:%S")


auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
count = 0
req = 0
while count < 10000:
    
    query = 'http%3A%2F%2Fwww%2E-filter:link'
    for tweet in tweepy.Cursor(api.search, q=query).items(30):
            #utc_datetime = datetime.datetime.utcnow()
            date_str = str(tweet.created_at)
            #dt_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
            #Age  = utc_datetime - dt_obj
            for s in tweet.entities['urls']:
                print s['url']
                saveFile = open('urls3.txt','a')
                url = s['url']
                saveFile.write(url)
                saveFile.write('\n')
                saveFile.close()
                saveFile = open('tweetAge3.txt','a')
                saveFile.write(date_str)
                saveFile.write('\n')
                saveFile.close()
                count = count + 1
            length =  len(tweet.entities['urls'])
            if length > 0:
                saveFile = open('length3.txt','a')
                saveFile.write(str(length))
                saveFile.write('\n')
                saveFile.close()
            req = req + 1
            if req == 50: 
                time.sleep(15)
                req = 0
                           