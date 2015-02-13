    var last_real_time = 0;
    var realtime_duration = 10000;

    var realtime_count_duration = 1000;
    var place_type = '';
    var place_arr = new Array('','diary','video','picture','mail','guest');
    var rt_num = 0;

    var t;
    var timer_on = 0;
    var current_place = '';

    function startRealTimeLog(place_type){
        
        if(current_place != place_type){
            timer_on = 0;
            clearTimeout(t);
        }

        $.getJSON('/realTime/get/'+place_type+'?_rand='+Math.random(), function(data){
            if(data){
                $.each(data, function(key, val){
                
                    if(val.place != 'mail' || val.action != 'send'){

                        rt_template(key, val, 0);
                        last_real_time = val.time;

                    }

                });
            }
        });

        if(!timer_on){
            timer_on = 1;
            current_place = place_type;
            getRealTimeLogNew(place_type); 
        }
    }

    function getRealTimeLogNew(place_type){

        $.getJSON('/realTime/getNew/'+last_real_time+'/'+place_type+'?_rand='+Math.random(), function(data){
            if(data){
                $.each(data, function(key, val){

                    if(last_real_time != val.time){

                        rt_template(key, val, 1);
                        last_real_time = val.time;

                    }
                });
            }
        });
        t = setTimeout(function () { getRealTimeLogNew(place_type); }, realtime_duration);

    }

    function startRealTimeCount(){
        var count = rt_num % 6;
        var place_type = place_arr[count];
        var elem_type = 'rt_'+place_type;
        rt_num++;

        if(place_type == ''){
            elem_type = 'guest';
            place_type = '';
        }

        $.getJSON('/realTime/count/'+place_type+'?_rand='+Math.random(), function(data){
            var cur_val = $('#'+elem_type+'_count').text() - 0;
            var val = data.total - 0;
            if(cur_val != val){
                displayRealTimeCount(cur_val, val, elem_type);
            }
        });
        setTimeout(function () { startRealTimeCount(); }, realtime_count_duration);
    }

   
    function displayRealTimeCount(start, end, elem_type){
        $('#'+elem_type+'_count').text(start);
        if(end != start){
            if(start < end){
                start++;
            }else{
                start--;
            }
            setTimeout(function() { displayRealTimeCount(start, end, elem_type); }, 10);
        }
    }

    function rt_template(key, val, is_new){//rt_profile_name, rt_message, rt_pic_url, rt_gender, rt_id_length, rt_place, rt_prid, rt_pr_name){
        /*var japan_time = val.time + 57600; // 16*60*60
        var d = new Date(japan_time*1000);
        var hour = d.getHours();
        var min  = d.getMinutes();if(min<10) min = '0'+min;
        var sec  = d.getSeconds();if(sec<10) sec = '0'+sec;*/
		var vt=val.time;
		var d=new Date(vt*1000);
		var hour=d.getUTCHours()+9;if(hour>24) hour=hour-24;
		var min=d.getUTCMinutes();if(min<10) min = '0'+min;
		var sec =d.getUTCSeconds();if(sec<10) sec = '0'+sec;
        var rt_profile_name = val.profile_name;
        var rt_place = val.place;
        var rt_action = val.action;
        var rt_pid = val.pid;
        var rt_pr_name = val.product_rate_name;
        var rt_gender = val.gender;
        var rt_message = val.message;
        var rt_product_profile_id = val.product_profile_id;
        var rt_product_profile_name = val.product_profile_name;
        var rt_product_profile_gender = val.product_profile_gender;
        var rt_pic_url = val.pic_url+'/pprofile.jpg';
        var rt_id_length = key.length;

        var rt_profile_id = key;
        if(rt_product_profile_id){
            rt_profile_id = rt_product_profile_id;
        }

        if(rt_product_profile_name){
            rt_profile_name = rt_product_profile_name;
        }

        if(rt_product_profile_gender){
            rt_gender = rt_product_profile_gender;
        }

        var thumb_class = 'borderM';
        if(rt_gender == 'f'){
            thumb_class = 'borderF';
        }

        var url = '/';//+rt_place;
        if((rt_pid && rt_place == 'profile') || (rt_pid && rt_id_length > 8)){
            url = url+'/'+rt_pid;
        }else if(rt_pid){
            if(rt_product_profile_id){
                url = url+'/view/'+rt_pid;
            }else{
                url = url+'/'+rt_pid;
            }
        }

        if(rt_action == 'comment'){
            url = url+'#comment';
        }
        else if(rt_action == 'eroine'){
            if(rt_pr_name == 'profile'){
                url = '/'+rt_pr_name+'/'+rt_pid;
            }else{
                url = '/'+rt_pr_name+'/view/'+rt_pid;
            }
        }else if(rt_action == 'add'){
            url = '/'+rt_place+'/view/'+rt_pid;
        }

        var message = '<a style="float:left; color:#3198bd; text-decoration:underline" href="'+url+'" >'+rt_message+'</a>';

        if(val.place != 'mail' || val.action != 'send'){
            if(rt_product_profile_id || rt_id_length > 8){

                $('#realtime_'+key).hide();
                if(isLogin() && rt_id_length > 8){
                    $("#guest_lists_box").prepend('<dl id="realtime_'+key+'"><dd class="tplLeft"><div class="thumbImgS '+thumb_class+'"><a href="javascript:;" onclick="startGuestTextChat(\''+key+'\',5)" title="テキストチャット"><img src="/img/profDefaultSmall.jpg" /></a></div></dd><dd class="tplRight"><div class="dataTop"><span class="eachName" style="float:left;"><a href="javascript:;" onclick="startGuestTextChat(\''+key+'\',5)" title="テキストチャット">'+rt_profile_name+'</a></span><span class="upTime" style="float:right;">['+hour+':'+min+']</span></div><div class="userLinks">'+message+'<a href="javascript:;" onclick="startGuestTextChat(\''+key+'\',5)" title="テキストチャット" style="margin-right:5px;"><i class="fa fa-comments-o"></i></a></div></dd></dl>');
                } else if(rt_id_length > 8) {
                    $("#guest_lists_box").prepend('<div id="realtime_'+key+'" class="guest_lists_each"><a href="#"><img src="/img/profDefaultSmall.jpg" class="'+thumb_class+'"><span class="realtimeName">'+rt_profile_name+'</span></a><br>'+message+'<span class="realtimeTime">['+hour+'時'+min+'分]</span></div>');
                } else {
                    $("#guest_lists_box").prepend('<div id="realtime_'+key+'" class="guest_lists_each"><a href="/profile/'+rt_profile_id+'"><img src='+rt_pic_url+' class="'+thumb_class+'"><span class="realtimeName">'+rt_profile_name+'</span></a><br>'+message+'<span class="realtimeTime">['+hour+'時'+min+'分]</span></div>');
                }
            }
        }


        if(!is_new){
            $('#guest_lists_box').scrollTop(0);
        }


        if(is_new){
            if(val.action == 'add' || val.action == 'comment' || val.action == 'eroine' || val.action == 'answer' || val.action == 'win' || val.action == 'send') {
                var balloon_profile_name = val.product_profile_name ? val.product_profile_name : val.profile_name;
                if(val.place == 'mail' && val.action == 'send'){
                    balloon_profile_name = '匿名';
                }
                displayBalloon(val.place, balloon_profile_name, rt_message, url);
            }
        }

    }

    function displayBalloon(place, profile_name, message, url) {

        var delay_time = 900 + Math.floor( Math.random() * 450 );

        if(place && profile_name) {
            setTimeout(function() {
                $(".realtime_balloon_" + place).prepend('<p class="balloon"><a href="'+url+'">'+profile_name+'さん'+message+'!</a><img src="/image/realtime_arrow.png" class="realtime_arrow"></p>');
                $(".realtime_balloon_" + place).children("p").fadeOut(5000);
            }, delay_time);
        }
    }

