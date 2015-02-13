/*

  Ajax Code Display 

  written by Christian Heilmann (http://wait-till-i.com)

  license:http://creativecommons.org/licenses/by/3.0/

  requires on jQuery 1.2.2 or newer

*/

// when the web page is ready

$(document).ready(

  function(){

    // get all links with the class codeexample and apply a function

    $('a.codeexample').each(

      function(){

        // if the class 'dodisplay' is present

        if(this.className.indexOf('dodisplay') !==- 1){

          // add functionality to toggle the display of the output 

          $(this).toggle(

            // on the first click and subsequent odd clicks

            function(){

              // create an IFRAME after the element that shows the document 

              // the original link points to 

              $(this).after('<iframe class="codeexample" src='+this.href+'></iframe>');

              // store the original text in the link and change it to 'close'

              this.oldhtml = this.innerHTML;

              this.innerHTML = 'close';

            },

            // on the second and subsequent even clicks 

            function(){

              // remove the IFRAME and change the link text back to the old text

              this.parentNode.removeChild(this.nextSibling);

              this.innerHTML = this.oldhtml;

            }

          );

        }

        // store the link reference in 'link'

        var link = this;

        // are there any highlights to be done?

        var highlights = this.className.match(/highlight\[([^\]]+)/);

        // shall I only display a range of lines?

        var boundaries = this.className.match(/lines\[([^\]]+)/);

        // convert the ranges defined in classes to arrays

        // [1,5-7,12-15] => [1,5,6,7,12,13,14,15]

        var getrange = function(range){

          var elms = range.split(',');

          var range = [];

          for(var i=0,j=elms.length;i<j;i++){

             if(elms[i].indexOf('-')===-1){

              range.push(+elms[i]);

            } else {

              var s = +elms[i].split('-')[0];

              var e = +elms[i].split('-')[1];

              for(s;s<=e;s++){

                range.push(+s);

              };

            };

          };

          return range;

        };

        // convert code returned from the Ajax call

        var convert = function(code){

          // define output array

          var codeout = [];

          // replace HTML special chars

          // change tabs to spaces

          code = code.replace(/\t/g,'  ');

          // split code on newlines to get the lines

          var lines = code.split(/\r?\n/);

          // if there are highlights to be done 

          if(highlights){

            // get the full highlight range and loop over it

            var tohighlight = getrange(highlights[1]);

            for(var i=0,j=tohighlight.length;i<j;i++){

              // ger the appropriate line and add strong elements

              // around it

              var line = lines[tohighlight[i]-1];

              if(line){

                lines[tohighlight[i]-1] = '<strong>' + line + '</strong>';

              };

            };

          };

          // if there are only a few lines to be displayed

          if(boundaries){

            // get all the needed lines and loop over them

            var chunk = getrange(boundaries[1]);

            for(var i=0,j=chunk.length;i<j;i++){

              var line = lines[chunk[i]-1];

                // add spacers in between different line blocks

              if(i>0 && chunk[i] !== (chunk[i-1])+1){

                codeout.push('[...]');

              };

              // add a span with the line number, followed by a tab 

              if(line){

                var html = '<span>'+(chunk[i])+'</span>\t'+line;

                codeout.push(html);

              };

            };

          // if there are no boundaries just add line numbers to each line

          } else {

            for(var i=0,j=lines.length;i<j;i++){

              var html = lines[i];

              codeout.push(html);

            };

          };

          // create a pre with a code and the joined output after the link

          $(link).after(

            '<div class="codeexample"><span>' +

              codeout.join('\n') +

            '</span></div>'

          );

        };

        // do the ajax, timeout after 100 milliseconds if the 

        // document is not available

        $.ajax({

            url:this.href,

            timeout:500,
		
			async: false,

            success:convert

        });

      }

    );

  }

);