jQuery(document).ready(function() {

        //PARÁMETROS
          var params = leerGET();
          for (obj in params){
           // document.write("'"+obj+"''vale<b>"+params[obj]+"</b><br>");
            if(obj=='s'){ var seccionIni= params[obj]; }
            if(obj=='w'){ var anchoIni=params[obj]; }
            if(obj=='h'){ var altoIni=params[obj]; }
            if(obj=='t'){ var tipo=params[obj]; }
          }         
        if(!anchoIni){ var anchoIni=300; }         
        if(!altoIni){ var altoIni=470; }
        if(!tipo){ var tipo='m'; }
        //DEFAULTS
        jQuery("#Widget").width(anchoIni);
        $("#Player").width(anchoIni-2);
        $("#Player").height(anchoIni*0.6);
        $("#imgPrincipal").width(anchoIni);
        $("#imgPrincipal").height(anchoIni*0.6);
        jQuery("#Widget").height(altoIni);
        jQuery("#Noticias").height(altoIni-100);
        
        //DATOS
        if(tipo=='m')
        {
            if(!seccionIni){ var seccionIni='universalmxm'; }
            loadSectionsMxM(seccionIni,0);     
            $("#Secciones option[value="+seccionIni+"]").attr("selected",true);   
            jQuery("#Secciones").change(function(){                
                    loadSectionsMxM(this.value,0);            
            });                                                    
        }else if(tipo=='v'){
            if(!seccionIni){ var seccionIni='canalDestacados'; }            
            loadSectionsVideos(seccionIni,0);        
            $("#Secciones option[value="+seccionIni+"]").attr("selected",true);            
            jQuery("#Secciones").change(function(){
                    loadSectionsVideos(this.value,0);            
            });                                                                
        }

});

  function loadSectionsMxM(s,tiposeccion) {    
    if (s && s.length > 0) {
        var data; 
        var incremento=1;
        var url = 'http://www.eluniversal.com.mx/rss/'+s+'.xml';
        var html = '';
                
           $.ajax({
                url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
                dataType: 'json',
                success: function(data) {
                  $.each(data.responseData.feed.entries, function() {   
                        var horario = this.publishedDate.split(" ");
                        var hora = horario[4].substring(0, 5);                         
                        
                        html += '<li class="clisttabs">'
                        + '<a target="_blank" href="'
                        + this.link
                        + '" title="'
                        + this.title
                        +'"><span class="fecha">'
                        + hora
                        +' </span><p class="timeIndent">&nbsp;'
                        + this.title
                        + '</p></a>'
                        + '</li>';                    
                    
                  })
                
                  $('#Noticias').html(html);
                }
              });        
                   
         /*$.getFeed({
                url: 'http://www.eluniversal.com.mx/rss/'+s+'.xml',
                success: function(feed) {
                                    
                    var html = '';
                    
                    for(var i = 0; i < feed.items.length; i++) {
                    
                        var item = feed.items[i];
                        var horario = item.updated.split(" ");
                        var hora = horario[4].substring(0, 5);
                        
                        html += '<li class="clisttabs">'
                        + '<a target="_blank" href="'
                        + item.link
                        + '" title="'
                        + item.title
                        +'"><span class="fecha">'
                        + hora
                        +' </span><p class="timeIndent">&nbsp;'
                        + item.title
                        + '</p></a>'
                        + '</li>';

                    }
                                        
                    $('#Noticias').html(html);
                }    
            });*/
                            
    }    
  }
    
  function loadSectionsVideos(s,tiposeccion) {    
    if (s && s.length > 0) {
        var data; 
        var incremento=1;
                   
        $.ajax({
            url: "http://www.eluniversal.com.mx/UniversalTV/cajallnw/datos/"+s+".json",
            data: "" ,
            type: "GET",
            dataType: "json",
            success: function(source){
                data = source;
                var playlistHTML = "";
                /*showInfo();*/            
                $.each(data['media_list'], function(index, value) {
                    if(index<12)
                    {      
                            incremento++;

                                    var d_id= data['media_list'][index]['media_id'];                                                                
                                    var titulo=data['media_list'][index]['title'];
                                    var url = "http://www.eluniversaltv.com.mx/videos/v_"+d_id+".html";                                    
                                    var imagen= data['media_list'][index]['thumbnails'][1]['url'];                                    
                                                                
                                    //CARGA DATOS E IMAGEN
                                    if( index==0){                                    
                                        $("#Player").attr('src',imagen);             
                                        $("#videoPrincipal").attr("href",url); 
                                        $("#tituloPrincipal").html(titulo);                                                          
                                    }                                 
        
                                        playlistHTML += '<li>';                                        
                                        playlistHTML += '<a href="'+url+'" target="_new">';
                                        playlistHTML += '<img width="87" height="52" src="' + data['media_list'][index]['thumbnails'][0]['url'] + '"/>';
                                        playlistHTML += '<span id="thumbwrap-title">' + titulo + '</span>';
                                        playlistHTML += '</a>';
                                        playlistHTML += '</li>';
                    }
                });     
                
                playlistHTML += '<br style="clear:both;" />';                       
                $("#videosSecundarios").html('<ul id="MasVideos" class="jcarousel jcarousel-skin-tango">'+playlistHTML+'</ul>');                  
                $('#MasVideos').jcarousel({
                visible: '3',
                vertical: false,
                scroll: 3
                });       
            },
            error: function(dato){
                //alert("ERROR");
            }
        });     
                            
    }    
  }
  
function remover_acentos(str) {
    var map={ 'á':'a','é':'e','í':'i','ó':'o','ú':'u' };
    var res=''; //Está variable almacenará el valor de str, pero sin acentos y tildes
    for (var i=0;i<str.length;i++)
    {
    c=str.charAt(i);res+=map[c]||c;
    }
    return res;
}

function timeConverter(UNIX_timestamp){
 var a = new Date(UNIX_timestamp*1000);
 var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
     var year = a.getFullYear();
     var month = months[a.getMonth()];
     var date = a.getDate();
     var hour = a.getHours();
     var min = a.getMinutes();
     var sec = a.getSeconds();
     //var time = date+', '+month+' '+year+' '+hour+':'+min+':'+sec ;
     var time = date+' de '+month+' de '+year+' ';
     return time;
 }
   
function leerGET(){
  var cadGET = location.search.substr(1,location.search.length);
  var arrGET = cadGET.split("&");
  var asocGET = new Array();
  var variable = "";
  var valor = "";
  for(i=0;i<arrGET.length;i++){
    var aux = arrGET[i].split("=");
    variable = aux[0];
    valor = aux[1];
    asocGET[variable] = valor;
  }
  return asocGET;
} 





