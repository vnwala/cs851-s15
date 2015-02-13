str = '';
link = new Array();
link[0]='<a href="http://alfalfalfa.com/archives/cat_0019.html"><img src="http://alfalfalfa.com/blog/img/btn-cat-anime.jpg" id="random-cate"></a>';
link[1]='<a href="http://alfalfalfa.com/tag/%E5%8B%95%E7%94%BB"><img src="http://alfalfalfa.com/blog/img/btn-cat-douga.jpg" id="random-cate"></a>';
link[2]='<a href="http://alfalfalfa.com/archives/cat_0016.html"><img src="http://alfalfalfa.com/blog/img/btn-cat-game.jpg" id="random-cate"></a>';
link[3]='<a href="http://alfalfalfa.com/tag/%E7%94%BB%E5%83%8F"><img src="http://alfalfalfa.com/blog/img/btn-cat-gazou.jpg" id="random-cate"></a>';
link[4]='<a href="http://alfalfalfa.com/archives/cat_0018.html"><img src="http://alfalfalfa.com/blog/img/btn-cat-geinou.jpg" id="random-cate"></a>';
link[5]='<a href="http://alfalfalfa.com/archives/cat_0035.html"><img src="http://alfalfalfa.com/blog/img/btn-cat-manga.jpg" id="random-cate"></a>';
link[6]='<a href="http://alfalfalfa.com/archives/cat_0032.html"><img src="http://alfalfalfa.com/blog/img/btn-cat-seijikeizai.jpg" id="random-cate"></a>';
link[7]='<a href="http://alfalfalfa.com/tag/%E3%81%8A%E3%81%99%E3%81%99%E3%82%81"><img src="http://alfalfalfa.com/blog/img/btn-cat-osusume.jpg" id="random-cate"></a>';
for(i = 0; i < 3; i++){
rand = Math.floor(Math.random()*link.length);
str += link[rand];
link.splice(rand, 1);
}
document.write(str);