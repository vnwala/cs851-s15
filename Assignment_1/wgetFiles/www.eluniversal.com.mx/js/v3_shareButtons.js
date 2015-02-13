function tweetMemeButton() {
    if (document.getElementById("tm_box")) {			    
        var iframeCode;
        //iframetmCode='<iframe allowtransparency="true" frameborder="0" scrolling="no" src="http://platform.twitter.com/widgets/tweet_button.html?url=' + escape(document.URL) + '&via=El_Universal_Mx" style="width:100px; height:21px;"></iframe>';

//	iframetmCode='<iframe scrolling="no" frameborder="0" allowtransparency="true" src="http://platform.twitter.com/widgets/tweet_button.1347008535.html#_=1349801586796&amp;count=horizontal&amp;id=twitter-widget-0&amp;lang=es&amp;original_referer=' + escape(document.URL) + '&amp;size=m&amp;text=TexodeNota&amp;url=' + escape(document.URL) + '&amp;via=ElUniversalMx" class="twitter-share-button twitter-count-horizontal" style="width: 120px; height: 20px;" title="Twitter Tweet Button" data-twttr-rendered="true"></iframe>'; 

        iframefbCode='<iframe scrolling="no" frameborder="0" allowtransparency="true" style="border:none; overflow:hidden; width:120px; height:21px;" src="http://www.facebook.com/plugins/like.php?href=' + escape(document.URL) + '&amp;send=false&amp;layout=button_count&amp;width=120&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21"></iframe>';					
      // 	document.getElementById("tm_box").innerHTML = iframetmCode+'&nbsp;&nbsp;'+iframefbCode;
     document.getElementById("tm_box").innerHTML = iframefbCode;
	    }
	}
	 
	//window.onload = 
	tweetMemeButton();
