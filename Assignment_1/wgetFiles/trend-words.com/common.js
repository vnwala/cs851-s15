
/*navi出力*/
function tabChange (btnId, iName) {
  var url = document.getElementById(btnId).href;
  //alert(url);
  var baseHtml = "<iframe name=\"twiFrame\" sandbox=\"allow-same-origin allow-forms allow-scripts\" src="+url+"\ align=\"center\" frameborder=\"0\" width=\"100%\" height=\"300px\"> </iframe>";        
  document.getElementById(iName).innerHTML = baseHtml;
}

$('.nav-tabs').on('show.bs.tab', tabChange ('btwitter', 'itwitter'));
$('.nav-tabs').on('show.bs.tab', tabChange ('bwiki', 'iwiki'));

$(function () {
    $('#myTab a:first').tab('show')
  });


//scroll to Top
$("#myTab").on('shown.bs.tab', function (e) {
                //alert("hello");
		$('html, body').animate({scrollTop:0},'fast');
		return false;
});

//modal action



//KeyWords 出力
function getTrends (webName) {
var targetId = "#"+webName;
var htmlName = "words/"+webName+".html";
jQuery . ajax(
                htmlName ,
                {
                    success: function( data ) {
                        jQuery( targetId ) . html( data );
                   },
                    error: function( data ) {
                        //alert( '読み込み失敗' );
                    }
                }
            );
       
}

$('#myKeyTab a[href="#tyahootime"]').on('shown.bs.tab', getTrends("yahootime"));
$('#myKeyTab a[href="#tgoogletrend"]').on('shown.bs.tab', getTrends("googletrend"));
$('#myKeyTab a[href="#tyahoopicup"]').on('shown.bs.tab', getTrends("yahoopicup"));

$(function () {
$('#myKeyTab a[href="#tyahootime"]').tab('show');
});

$('#myKeyTab a[href="#ttvactor"]').on('show.bs.collapse', getTrends("tvactor"));
$('#myKeyTab a[href="#tidol"]').on('show.bs.collapse', getTrends("idol"));
$('#myKeyTab a[href="#tgravia"]').on('show.bs.collapse', getTrends("gravia"));
$('#myKeyTab a[href="#thaiyu"]').on('show.bs.collapse', getTrends("haiyu"));
$('#myKeyTab a[href="#tseiyu"]').on('show.bs.collapse', getTrends("seiyu"));



//リンクテキスト　取得
//trend
function test(e){    
var values = e.innerText;
var encoded = encodeURI(values);
var categoryName = $("meta[name=category]").attr("content");

var host = location.hostname;
var path = location.pathname;

location.href='http://'+host+path+'?keyword='+encoded+'&category='+categoryName+'#top';

//alert("text=" + e.innerText + " link=" + e.href);
}

function nextSearch(){
var forms = document.getElementById("seachwords");
var values = forms.value;
var encoded = encodeURI(values);
var categoryName = $("meta[name=category]").attr("content");

var host = location.hostname;
var path = location.pathname;

location.href='http://'+host+path+'?keyword='+encoded+'&category='+categoryName+'#top';
}


/*shuffle*/

  function shuffle(){  
  var i = 1;  
  for (i = 1; i < 4; i++){
  try{
     src = document.getElementById( "adcnt"+i ).src;
     var timestamp = new Date().getTime();
     var url = src+'?var='+timestamp;
     //alert( url );
  if (url !== null){
      document.getElementById( "adcnt"+i ).src = url; 
  }
  }catch(e){
  }
  }        
  }

/**
 * minとmaxの間ランダム数値を取得
 */
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}
  
   function refresh()
{
  //関数をx000ミリ秒間隔で呼び出す
  var randInt = getRandomArbitary (20, 30);
  var time = randInt*1000;
  //alert( time );
  setInterval("shuffle()", time);
}
refresh();



$('a[href=#tec]').on('shown.bs.tab', function (e) {
                //alert("hello");
                $('iframe[name=popo]').remove();
		return false;
});


/*youtube*/
$(document).ready(function() {
    //alert("hallo");
    var val = Math.floor( Math.random()*4 );
    var number = $("div#iyoutube").attr("value");
      switch ( val ) {
    case 0 :
    getNameList(number,"relevance");  
    $('button[id=more_name]').attr("name","relevance");
    break;
    case 1:
    getNameList(number,"published");  
    $('button[id=more_name]').attr("name","published");
    break;
    case 2:
    getNameList(number,"viewCount");  
    $('button[id=more_name]').attr("name","viewCount");
    break;
    case 3:
    getNameList(number,"rating");  
    $('button[id=more_name]').attr("name","rating");
   break;    
  }
});

$("#modalbtn").click(function() {
    //alert("hallo");
    var number = $("div#iyoutube").attr("value");
    getNameList(number,"viewCount");      
});

    function getNameList(number,sort){                                         
                  var keywords = $("div#iyoutube").attr("title");                    
                $.getJSON(
                    "http://gdata.youtube.com/feeds/api/videos", 
                    {   
                       "vq":keywords,
                       "orderby":sort, /*relevance、published、viewCount、rating*/
                       "max-results":number,
                       "lr":"ja", /* 日本語 */
                       v:2,
                       alt:"json"
                                              
                    },
                  function(xml) {
                     getList(xml);
                  }
               );               
    }
                 

              
         /* 日付フォーマット */
         var formatDate = function(dateString) {
/*
            var d = new Date(dateString);
            var day = d.getDate();
            var month = d.getMonth()+1;
            var year = d.getFullYear();
*/
            var dary=dateString.split("-");
            var year=dary[0];
            var month=dary[1];
            var day=dary[2].substring(0,2);
            return year+"年"+month+"月"+day+"日";
         }
         /* 3桁区切り */
         function addFigure(str) {
            var num = new String(str).replace(/,/g, "");
            while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
            return num;
         }
         function getList(xml){
             $('#load').fadeOut();
             var feed = xml.feed;
             var name = $("div#naver").attr("title");             
             $.each(feed.entry, function(i,item){
                var tmp=item.id.$t.split("video:");
                var vid=tmp[tmp.length-1];
                var linktxt = " <u>(YouTubeリンク)</u>";
                var target = encodeURIComponent( $("div#tg").attr("title") );                                   
                var s='';
                s+='<dt><img src="http://img.youtube.com/vi/'+vid+'/2.jpg" /></dt>';
                s+='<dd>';
                s+='<div class="title"><a href="http://trend-words.com/wikitubes.php?ytid='+vid+'&keyword='+name+'&group='+target+'" target="_blank">'+item.title.$t+linktxt+'</a></div>';
                s+='<p>';
                   s+='作成者：<a href="http://trend-words.com/wikitubes.php?user='+item.author[0].name.$t+'&keyword='+name+'&group='+target+'" target="_blank">'+item.author[0].name.$t+'</a>｜';
                   s+='公開日：'+formatDate(item.published.$t)+'';
                   s+='<br />';
                   if(item.gd$rating){
                      s+='評価平均：'+item.gd$rating.average+'｜';
                   }
                   if(item.yt$statistics){
                      s+='<span>再生回数：'+addFigure(item.yt$statistics.viewCount)+'回</span>';
                   }
                s+='</p>';
                s+='</dd>';
                 $("#demo").append('<dl class="video clearfix">'+s+'</dl>');
                 $(".video").fadeIn(1000);
             }); 
              }


/*Button for YouTube_Sort*/
$("button").click(function(e) {
  var btnid  = $(this).attr("id");  
  var btnName = $(this).attr("name");
  $("#demo").html("");
  var number = parseInt($("div#iyoutube").attr("value"));
  
  switch (btnid) {
    case "more_name" :
  var sum = number+5;
  getNameList(sum, btnName);
  $("div#iyoutube").attr("value",sum);
  break;
  
    case  "related_name":
    case  "view_name":
    case  "rating_name":
    case  "date_name":
  getNameList(number,btnName);
  $('button[id=more_name]').attr("name",btnName);
  break;
    
  }
  /*
  var p = $("#sortbtn").offset().top;
  var q = p + (95*number);
  //alert(q);
   $('html,body').animate({ scrollTop: q }, 'slow');
  */
});

/*読み込み後実行=>移動 if #youtube or #google = true */

$("#naverFrame").load(function () {
    var url = location.href;  
    // 実行したい処理
    if(url.match(/youtube/)){
         //alert('hello');
      // 移動先を取得
    var p = $("#youtube").offset().top;
    $('html,body').animate({ scrollTop: p }, 'fast');
		
    }else{
           if(url.match(/googlenews/)){
           var p = $("#googlenews").offset().top;
           $('html,body').animate({ scrollTop: p }, 'slow');
      }else{
          return false;
      }
    }
});


/* googleNews */

   function LoadNewsBar() {
      var root = document.getElementById("newsBar");
      var keyword = document.getElementById("newsword").innerHTML; 

      options = {
          largeResultSet : false,
          resultStyle : GSnewsBar.RESULT_STYLE_EXPANDED,
          linkTarget : GSearch.LINK_TARGET_BLANK,
          title : "",
          autoExecuteList : {
            executeList : [ keyword ]
            }
          };

      var newsBar = new GSnewsBar(root, options);
    }
 
 $(document).ready(function() {
    GSearch.setOnLoadCallback(LoadNewsBar);
});

/* Modal */
$(document).ready(function() {
    $('#myModal').modal('show');
 
    setTimeout(function () {
                $('#myModal').modal('hide');
        }, 3000); // x秒後に実行
 });


//Tabs
 $(document).ready(function() {

    /* ページ（タブ）をウィンドウ上端に固定表示 */
    offset = $('.nav-pills').offset().top;

  });

  $(window).scroll(function() {
    if($(window).scrollTop() > offset - 0) {  /* スクロールアウトしたら */
      $('.nav-pills').css('position', 'fixed');
      $('.nav-pills').css('z-index', '10');  /* 重なり順序：とりあえず 10 に */
      $('.nav-pills').css('top', '0px');     /* 固定ボックスの上端からの位置 */
    } else {
      $('.nav-pills').css('position', 'static');
    }
  });



//pr1
 $(document).ready(function() {

    /* ページ（タブ）をウィンドウ上端に固定表示 */
    offset = $('#pr1').offset().top;

  });



  $(window).scroll(function() {
    if($(window).scrollTop() > offset - 0) {  /* スクロールアウトしたら */
      $('#pr1').css('position', 'fixed');
      $('#pr1').css('z-index', '10');  /* 重なり順序：とりあえず 10 に */
      $('#pr1').css('top', '34px');     /* 固定ボックスの上端からの位置 */
    } else {
      $('#pr1').css('position', 'static');
    }
  });
  
  /*Back to top*/
  $(document).ready(function(){

	// hide #back-top first
	$("#back-top").hide();
	
	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

});


