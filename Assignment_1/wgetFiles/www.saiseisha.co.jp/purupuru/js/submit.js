function btnConform(){
	var inputs = document.getElementsByTagName("input");
	for( var i=0,j=inputs.length; i<j; i++){
		var btn = inputs[i]; 
		if(btn.getAttribute("class") == "submit"){
			btn.onmouseover = function(){
				this.style.backgroundPosition = 'left -33px';
				return false;
			}
			btn.onmouseout = function(){
				this.style.backgroundPosition = 'left top';
				return false;
			}
		}
		if(btn.getAttribute("className") == "submit"){
			btn.onmouseover = function(){
				this.style.backgroundPosition = 'left -33px';
				return false;
			}
			btn.onmouseout = function(){
				this.style.backgroundPosition = 'left top';
				return false;
			}
		}

		if(btn.getAttribute("class") == "submit02"){
			btn.onmouseover = function(){
				this.style.backgroundPosition = 'left -33px';
				return false;
			}
			btn.onmouseout = function(){
				this.style.backgroundPosition = 'left top';
				return false;
			}
		}

		if(btn.getAttribute("className") == "submit02"){
			btn.onmouseover = function(){
				this.style.backgroundPosition = 'left -33px';
				return false;
			}
			btn.onmouseout = function(){
				this.style.backgroundPosition = 'left top';
				return false;
			}
		}
	}
}

window.onload = btnConform;