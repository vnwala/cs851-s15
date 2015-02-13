var review_template = {	"html":	"<div class=\"reviewPost\">		<a href=\"javascript:show_review_form()\" class=\"btn\">			\u3053\u306e\u4f5c\u54c1\u306e\u30ec\u30d3\u30e5\u30fc\u3092\u6295\u7a3f\u3059\u308b<\/a>	<\/div>	{if typeof(reviews.pages.n) != 'undefined' && reviews.pages.n.length > 1}		<ul class=\"pagenation\">			{if reviews.pages.showall != '1'}				{if reviews.pages.first > 0}					<li class=\"previous\">						<a href=\"javascript:reviews_get({ movie_seq: '${reviews.pages.movie_seq}', page: '${reviews.pages.first}'})\">\u6700\u521d\u3078<\/a>					<\/li>				{\/if}				{if reviews.pages.prev > 0}					<li class=\"previous\">						<a href=\"javascript:reviews_get({ movie_seq : '${reviews.pages.movie_seq}', page: '${reviews.pages.prev}'})\">\u524d\u3078<\/a>					<\/li>				{\/if}			{\/if}						{for n in reviews.pages.n}				{if reviews.pages.curr != n}					<li><a href=\"javascript:reviews_get({ movie_seq: '${reviews.pages.movie_seq}', page: '${n}'})\">${n}<\/a><\/li>				{else}					<li class=\"active\"><a class=\"current\">${n}</a><\/li>				{\/if}			{\/for}						{if reviews.pages.showall != '1'}				{if reviews.pages.next > 0}					<li class=\"next\">						<a href=\"javascript:reviews_get({ movie_seq: '${reviews.pages.movie_seq}', page: '${reviews.pages.next}'})\">\u6b21\u3078<\/a>					<\/li>				{\/if}				{if reviews.pages.last > 0}					<li class=\"next\">						<a href=\"javascript:reviews_get({ movie_seq: '${reviews.pages.movie_seq}', page: '${reviews.pages.last}'})\">\u6700\u5f8c\u3078<\/a>					<\/li>				{\/if}				{if reviews.pages.showall == '1'}					<li class=\"active\">\u3059\u3079\u3066\u8868\u793a<\/li>				{else}					<li class=\"all\"><a href=\"javascript:reviews_get({ movie_seq: '${reviews.pages.movie_seq}', page: -1})\">\u3059\u3079\u3066\u8868\u793a<\/a><\/li>				{\/if}			{\/if}		<\/ul>	{\/if}{for comment in reviews.comments}	<div class=\"reviewBox Box\">		<ul class=\"reviewerInfo\">			<li>${comment.date}<\/li>			<li>				<dl>					<dt>\u7dcf\u5408\uff1a<\/dt>					<dd class=\"sp-star-matrix-${comment.score.overall*10}\"></dd>				<\/dl>			<\/li>						<li>				<dl>					<dt>BY\uff1a<\/dt>					<dd>						{if typeof(comment.point_flag) != 'undefined' && comment.point_flag == 1}							{if review_page_type == 'monthly'}<a href=\"\/app\/monthly\/reviewlist_user?h=${comment.hash}&provider_name=${review_provider_name}\">								{else}<a href=\"\/app\/ppv\/reviewlist_user?h=${comment.hash}\">							{\/if}							${comment.user_name} ${comment.base64}<\/a>						{else}						${comment.user_name}						{\/if}					<\/dd>				<\/dl>			<\/li>			<li>				{if typeof(comment.point_flag) != 'undefined' && comment.point_flag == 1}					<img src=\"\/common\/images1209\/bg_user_active.png\" alt=\"${comment.user_name} ${comment.base64}\" width=\"60\" height=\"22\" \/>				{else}					<img src=\"\/common\/images1209\/bg_user_nonactive.png\" alt=\"\" height=\"22\" width=\"60\">				{\/if}			<\/li>			<\/ul><!-- end reviewerInfo -->	<div class=\"reviewDetail\">		<p class=\"reviewcomment\">${comment.comment}<\/p>		{if comment.comment_res != \"\"}			<p class=\"comment_res\"><span>Re: <\/span>${comment.comment_res}<\/p>		{\/if}		<p>\u3053\u306e\u30ec\u30d3\u30e5\u30fc\u306f\u53c2\u8003\u306b\u306a\u308a\u307e\u3057\u305f\u304b\uff1f<input type=\"image\" src=\"\/common\/images1209\/but_reviewpoll_yes.png\" name=\"yes\" onclick=\"javascript:review_vote('${comment.id}','1')\" value=\"YES\" \/>\uff08${comment.vote.yes}\u4eba\uff09<\/p>	<\/div><!-- reviewDetail --><\/div><!-- reviewBox -->{\/for}{if typeof(reviews.pages.n) != 'undefined'  && reviews.pages.n.length > 1}	<ul class=\"pagenation\">		{if reviews.pages.showall != '1'}			{if reviews.pages.first > 0}				<li class=\"previous\">					<a href=\"javascript:reviews_get({ movie_seq: '${reviews.pages.movie_seq}', page: '${reviews.pages.first}'})\">\u6700\u521d\u3078<\/a>				<\/li>			{\/if}			{if reviews.pages.prev > 0}				<li class=\"previous\">					<a href=\"javascript:reviews_get({ movie_seq: '${reviews.pages.movie_seq}', page: '${reviews.pages.prev}'})\">\u524d\u3078<\/a>				<\/li>			{\/if}		{\/if}		{for n in reviews.pages.n}			{if reviews.pages.curr != n}				<li><a href=\"javascript:reviews_get({ movie_seq: '${reviews.pages.movie_seq}', page: '${n}'})\">${n}<\/a><\/li>			{else}				<li class=\"active\"><a class=\"current\">${n}</a><\/li>			{\/if}		{\/for}		{if reviews.pages.showall != '1'}			{if reviews.pages.next > 0}				<li class=\"next\">					<a href=\"javascript:reviews_get({ movie_seq: '${reviews.pages.movie_seq}', page: '${reviews.pages.next}'})\">\u6b21\u3078<\/a>				<\/li>			{\/if}			{if reviews.pages.last > 0}				<li class=\"next\">					<a href=\"javascript:reviews_get({ movie_seq: '${reviews.pages.movie_seq}', page: '${reviews.pages.last}'})\">\u6700\u5f8c\u3078<\/a>				<\/li>			{\/if}			{if reviews.pages.showall == '1'}				<li class=\"active\">\u3059\u3079\u3066\u8868\u793a<\/li>			{else}				<li class=\"all\"><a href=\"javascript:reviews_get({ movie_seq: '${reviews.pages.movie_seq}', page: -1})\">\u3059\u3079\u3066\u8868\u793a<\/a><\/li>			{\/if}		{\/if}	<\/ul>{\/if}{if typeof(reviews.comments) != 'undefined'}	<div class=\"reviewPost\">		<a href=\"javascript:show_review_form()\" class=\"btn\">\u3053\u306e\u4f5c\u54c1\u306e\u30ec\u30d3\u30e5\u30fc\u3092\u6295\u7a3f\u3059\u308b<\/a>	<\/div>{\/if}"};