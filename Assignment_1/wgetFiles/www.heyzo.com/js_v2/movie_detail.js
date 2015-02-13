$.ajaxSetup({ cache: false }); // IE
$(function(){
	var score_get_url = "/app_v2/review_getscorejs";  // 評価取得URL
	var vote_get_url = "/app_v2/vote_getjs";          // 投票状況取得URL
	var navi_get_url = "/app_v2/movie_getpagenavijs"; // 投票状況取得URL

	var en = false;
	
	if (location.hostname.match("^en")) {
		en = true;
	}
	
 	function submit_vote(j) {
		var o = $("#vote_form");
		$("#vote_form input[name=judge]").val(j);
		o.attr("action", "/app_v2/vote_send/");
		o.submit();
	}
	function un_submit_vote(){
		$.msgBox({
			type:'join',
			content:"",
			autoClose:true,
			timeOut:1500
			});
	}

	
	if(!en) {
		$.ajax({

			url: navi_get_url, 

			type: 'GET',

			data: {id:movie_seq},

			success: function(data) {
				eval(data);
				var ul = $("#movie > ul.paginate");
				if (pagenavi['prev'] != "" && pagenavi['prev'] != null) ul.append($("<li>").addClass("previous").append($("<a>").attr({"class":"turn", "href":"/moviepages/"+pagenavi['prev']+"/index.html"}).append("« 前へ")));
				for (var i = 0; i < pagenavi['pages'].length; i ++) {

					if (pagenavi['pages'][i]['val'] != "") ul.append($("<li>").append($("<a>").attr({"onmouseover":"showActorImg('"+pagenavi['pages'][i]['val']+"',this)", "class":"trun", "href":"/moviepages/"+pagenavi['pages'][i]['val']+"/index.html"}).append(pagenavi['pages'][i]['key'])));
					else ul.append($("<li>").addClass("active").append(pagenavi['pages'][i]['key']));

				}
				if (pagenavi['next'] != "" && pagenavi['next'] != null) ul.append($("<li>").addClass("next").append($("<a>").attr({"class":"turn", "href":"/moviepages/"+pagenavi['next']+"/index.html"}).append("次へ »")));

			},

			error: function(xhr, status, err) {

			}

		});
	}
	
	$("#good-btn").append($("<a>").addClass("vote_good"));
	$("#bad-btn").append($("<a>").addClass("vote_bad"));

	// 評価取得
	$.ajax({

		url: score_get_url, 

		type: 'GET',

		data: {id:movie_seq},

		success: function(data) {
			eval(data);
			if(!en) {
				$("#review-value-stars").append($("<img>").attr({"src":"/images/common/parts/stars.png", "alt":"評価表示", "style":"margin-top:-" + score['star_css_pos'] + "px"}));
				$("#review-value").append(score['average_score']);

				if( score['hits'] > 0 ){
					joinBtnBoolen = true;
					$("#review-value").append("&nbsp;").append($("<a>").attr("href", "#review").append(score['hits'] + "投稿"));

				} else {
					joinBtnBoolen = false;
					$("#review-value").append("&nbsp;").append(score['hits'] + "投稿");
				}
			}
			else {
				$("#review-value-stars").append($("<img>").attr({"src":"/images/common/parts/stars.png", "alt":"assessment", "style":"margin-top:-" + score['star_css_pos'] + "px"}));
				$("#review-value").append(score['average_score']);
			}

		},

		error: function(xhr, status, err) {

		}

	});
	// // 投票状況取得
	// $.ajax({

		// url: vote_get_url, 

		// type: 'GET',

		// data: {id:movie_seq},

		// success: function(data) {
			// eval(data);
			// $("#good-btn > a").append(goodbad['good']);
			// $("#bad-btn > a").append(goodbad['bad']);

		// },

		// error: function(xhr, status, err) {
			// $.msgBox({
				// type:'error',
				// title:"エラーが発生しました。",
				// content:"",
				// autoClose:true,
				// timeOut:1500
				// });

		// }

	// });
	// // 投票部分書き出し
	// if(voteBoolean) {
		// var vote_form = $("<form>").attr({"id":"vote_form", "method":"POST", "name":"vote_form"});
		// vote_form.append($("<input>").attr({"type":"hidden", "name":"__action", "value":"post"}));
		// vote_form.append($("<input>").attr({"type":"hidden", "name":"emb", "value":"1"}));
		// vote_form.append($("<input>").attr({"type":"hidden", "name":"judge", "value":"good"}));
		// vote_form.append($("<input>").attr({"type":"hidden", "name":"is_monthly", "value":"1"}));
		// vote_form.append($("<input>").attr({"type":"hidden", "name":"score", "value":"5"}));
		// vote_form.append($("<input>").attr({"type":"hidden", "name":"movie_id", "value":movieId}));
		// vote_form.append($("<input>").attr({"type":"hidden", "name":"provider_id", "value":siteID}));
		// vote_form.append($("<input>").attr({"type":"hidden", "name":"ref", "value":base64encode(location.pathname)}));
		// $("#good-btn").append(vote_form);
		// $("#good-btn > a").click(function(){

	        // submit_vote("good");

	        // return false;

	    // });
		// $("#bad-btn > a").click(function(){

	        // submit_vote("bad");

	        // return false;

	    // });
    // }
    // else {
		// $("#good-btn > a").click(function(){

	        // un_submit_vote();

	        // return false;

	    // });
		// $("#bad-btn > a").click(function(){

	        // un_submit_vote();

	        // return false;

	    // });
    // }

});

