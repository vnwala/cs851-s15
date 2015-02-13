        <!-- sof active user count -->
                (function($) { //jQuery
                        $(document).ready(function(){
                                ajax_get_active_user_count();
                        })

                        function ajax_get_active_user_count() {
                                var param_is_login = isLogin();
                                param_is_login = (param_is_login==true)?1:0;
                                $.ajax({
                                        type: "post",
                                        url: "http://www.heyzo.com/app_v2/monthly/user_get_online_user_count",
                                        data: {
                                                provider_id:3000 ,
                                                is_login:param_is_login
                                        },
                                        timeout: 100000,
                                        error: onFailure,
                                        success: function(data) {
                                                $("#search_box_inner_frame").append(data);
                                        }
                                })
                        };

                        function onFailure(xhr,reason,ex) {
/*
                                if (reason == "error") {
                                        alert("Error");
                                } else if (reason == "timeout") {
                                        alert("Loading Taking Too Long...");
                                } else {
                                        alert("Failed");
                                }
*/
                        }
                })(jQuery)
        <!-- eof active user count -->
