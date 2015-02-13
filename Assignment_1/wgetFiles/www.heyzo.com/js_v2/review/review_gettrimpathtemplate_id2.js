
var string = '';

string += '{if review_error != "null"}';
string += '<p class="error">※${review_error}</p>';
string += '{/if}';

string += '{if reviews.comments != null}';

string += "{for comment in reviews.comments}";
string += '<div class="review-container">';
string += '<div class="review-box">';
string += '<div class="posted">';
string += '<span class="posted-day">${comment.date}</span>';
string += '<div><span class="satisfaction">満足度：</span><span class="review-value"><img style="margin-top: -${comment.score.overall|review_csspos:28}px;" src="/images/common/parts/stars.png" alt="評価表示"></span></div>';
string += '<span class="poster">投稿者： ${comment.user_name} さん</span>';
string += '</div><!--posted-->';
string += '<p class="review">${comment.comment}</p><!--review-->';
string += '{if comment.comment_res != ""}';
string += '<p class="review review_res"><span>管理者:</span> <br/>${comment.comment_res}</p><!--review res-->';
string += '{/if}';
/*string += '<div class="evaluates">';
string += '<div><span class="sexy">エロさ：</span><span class="review-value"><img style="margin-top: -${comment.score.quality|review_csspos:28}px;" src="/images/common/parts/stars.png" alt="エロさ"></span></div>';
string += '<div><span class="ecstasy">女優感度：</span><span class="review-value"><img style="margin-top: -${comment.score.actress|review_csspos:28}px;" src="/images/common/parts/stars.png" alt="女優感度"></span></div>';
string += '<div><span class="play">プレイ内容：</span><span class="review-value"><img style="margin-top: -${comment.score.play|review_csspos:28}px;" src="/images/common/parts/stars.png" alt="プレイ内容"></span></div>';
string += '<div><span class="looks">ルックス：</span><span class="review-value"><img style="margin-top: -${comment.score.content|review_csspos:28}px;" src="/images/common/parts/stars.png" alt="ルックス"></span></div>';
string += '</div><!--evaluates-->';*/
string += '</div><!--review-->';
string += '</div><!--review-container-->';
string += '<img src="/images/common/parts/review-bottom.png" alt="レビュー　ボーダー" class="review-border" />';

string += '{/for}';
string += '{/if}';

string += '{if review_lang == ""}';
string += '<a href="javascript:reviews_get({ movie_seq: \'${reviews.pages.movie_seq}\', page: \'1\', lang: \'ja\'})"><img src="/images/common/parts/review-btn-hide-english.png"/></a>'; 	
string += '{else}';
string += '<a href="javascript:reviews_get({ movie_seq: \'${reviews.pages.movie_seq}\', page: \'1\'})"><img src="/images/common/parts/review-btn-show-english.png"/></a>'; 	
string += '{/if}';

string += '{if typeof(reviews.pages.n) != \'undefined\'  && reviews.pages.n.length >= 1}';
string += '<ul class="Moviepagination">';
string += '{if reviews.pages.showall != \'1\'}';
string += '{if reviews.pages.first > 0}';
string += '<li>';
string += '<a href="javascript:reviews_get({ movie_seq: \'${reviews.pages.movie_seq}\', page: \'${reviews.pages.first}\', lang: \'${review_lang}\'})">\u6700\u521d\u3078</a>';
string += '</li>';
string += '{/if}';
string += '{if reviews.pages.prev > 0}';
string += '<li>';
string += '<a href="javascript:reviews_get({ movie_seq: \'${reviews.pages.movie_seq}\', page: \'${reviews.pages.prev}\', lang: \'${review_lang}\'})">\u524d\u3078</a>';
string += '</li>';
string += '{/if}';
string += '{/if}';

string += '{for n in reviews.pages.n}';
string += '{if reviews.pages.curr != n}';
string += '<li><a onclick="reviewTop();" href="javascript:reviews_get({ movie_seq: \'${reviews.pages.movie_seq}\', page: \'${n}\', lang: \'${review_lang}\'})">${n}</a></li>';
string += '{else}';
string += '<li class="active">${n}</li>';
string += '{/if}';
string += '{/for}';

string += '{if reviews.pages.showall != \'1\'}';
string += '{if reviews.pages.next > 0}';
string += '<li class="next">';
string += '<a onclick="reviewTop();" href="javascript:reviews_get({ movie_seq: \'${reviews.pages.movie_seq}\', page: \'${reviews.pages.next}\', lang: \'${review_lang}\'})">\u6b21\u3078</a>';
string += '</li>';
string += '{/if}';
string += '{if reviews.pages.last > 0}';
string += '<li class="next">';
string += '<a href="javascript:reviews_get({ movie_seq: \'${reviews.pages.movie_seq}\', page: \'${reviews.pages.last}\', lang: \'${review_lang}\'})">\u6700\u5f8c\u3078</a>';
string += '</li>';
string += '{/if}';
string += '{if reviews.pages.showall == \'1\'}';
string += '<li class="active">\u3059\u3079\u3066\u8868\u793a</li>';
string += '{else}';
string += '<li><a href="javascript:reviews_get({ movie_seq: \'${reviews.pages.movie_seq}\', page: -1, lang: \'${review_lang}\'})">\u3059\u3079\u3066\u8868\u793a</a></li>';
string += '{/if}';
string += '{/if}';
string += '</ul><br><br>';
string += '{/if}';


var review_template = {"html":string};

