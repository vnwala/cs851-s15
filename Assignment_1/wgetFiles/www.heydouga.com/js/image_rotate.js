var IR = {

    basePath : "/ir/",
    prefix : "img_",

    init : function()
    {
        this.currentId = null;
        this.setIntervalId = null;
        this.index = 1;
        this.count_s = {};
        this.imgSrc_s = {};
    },


    set : function( id, movie_id, site_id, count, servername )
    {
        IR.count_s[IR.prefix + id]  = parseInt(count);
        IR.imgSrc_s[IR.prefix + id] = ( ( servername ) ? "http://" + servername : "" ) + IR.basePath + site_id + "/" + movie_id + "/";

        $('#' + IR.prefix + id).hover(function (){$(this).css("opacity", "2");});

        $('#' + IR.prefix + id).mouseover(function()
        {
            IR.imgOrg = $(this).attr('src');
            IR.currentId = $(this).attr('id');
            IR.count = IR.count_s[IR.currentId];          
            IR.index = 2;

                 $('#' + IR.currentId)               
                  .attr('src', IR.imgSrc_s[IR.currentId] + "1.jpg" );


                 IR.setIntervalId = window.setInterval( function()
            {
                $('#' + IR.currentId)
                .attr('src', IR.imgSrc_s[IR.currentId] +  IR.index + ".jpg" );
 
                $('#' + IR.currentId).one('load', function() 
                {
                    if(this.complete) 
                    {
                        //$(this).css({top : parseInt( 100 * ( ( 92 - $('#' + IR.currentId).height() ) / (92*2) )) + "%", position : "absolute"});
                    }
                }); 
                IR.index = ( IR.index >= ( IR.count ) ) ? 1 : IR.index + 1;
            }, 500 );
 
            $(this).mouseout(function()
            {
                $('.icon').css({'z-index': "2"});
                $('.Sicon').css({'z-index': "2"});
                //$('#' + IR.currentId).css({top :"0%", position : "absolute"});
                $('#' + IR.currentId).attr('src', IR.imgOrg ); 
                window.clearInterval( IR.setIntervalId );
            });
        });
    }
}

window.IR = IR;
IR.init();


$(document).ready(function() {
    $('.Sicon').css({'z-index': "2"});
});
