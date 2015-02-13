$(document).ready(function() {
	        
    // newsletter subscribe: validate form on keyup and submit
	$("#frm_nl_subscribe").validate({
		//errorLabelContainer: $("div.nl_error_container"),
		//onkeyup: false,
		rules: {
			nl_email: { email: true }
		},
		messages: {
			nl_email: { email: "Please enter a valid email address" }
		},
		errorPlacement: function(error, element) {
			$("div.nl_error_container").html(error).show();
		},
		success: function(){
			$("div.nl_error_container").hide();
		},
		// specifying a submitHandler prevents the default submit, good for the demo
		submitHandler: function() {
			
			var nl_email = $("#nl_email").val();
			var nl_uri   = $("#nl_uri").val();
			var NewsletterKey = $("#navNewsletterSignup").val();
			var businessUnit = $("#businessUnit").val();    
			var NewsletterSignup = $("#NewsletterSignup").val(); 
			var RegistrationWebsite = $("#RegistrationWebsite").val(); 
			$.ajax({
		    	type: "POST",
	            url: "/nlsub",
	            data: {email: nl_email, uri: nl_uri, NewsletterKey:NewsletterKey,RegistrationWebsite:RegistrationWebsite,businessUnit:businessUnit,NewsletterSignup:NewsletterSignup},
	            dataType:"json",
	            async: false,
	            success:function(data) {
	            	var ele = '';
					if (data.result == "success") {
						ele = '<label class="success">'+ data.message +'</label>';
						$("#frm_nl_subscribe").hide();
					}
					else {
						ele = '<label class="error">'+ data.message +'</label>';
					}
					//console.log(ele);
					$("div.nl_error_container").html(ele).show();
				}
	    	});
			return false;
		}
	});
		
});

	/*!
	* jQuery Cookie Plugin
	*/
	(function($) {
		$.cookie = function(key, value, options) {

			// key and at least value given, set cookie...
			if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
				options = $.extend({}, options);

				if (value === null || value === undefined) {
					options.expires = -1;
				}

				if (typeof options.expires === 'number') {
					var days = options.expires, t = options.expires = new Date();
					t.setDate(t.getDate() + days);
				}

				value = String(value);

				return (document.cookie = [
					encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
					options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					options.path ? '; path=' + options.path : '',
					options.domain ? '; domain=' + options.domain : '',
					options.secure ? '; secure' : ''
				].join(''));
			}

			// key and possibly options given, get cookie...
			options = value || {};
			var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

			var pairs = document.cookie.split('; ');
			for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
				if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
			}
			return null;
		};
	})(jQuery);

function welcomeUser(){
    
    if($.cookie('fn')!=null && $.cookie('ln')!=null){
        var firstName = decodeURIComponent($.cookie('fn'));
        var lastName = decodeURIComponent($.cookie('ln'));
        firstName = firstName.replace("+"," ");
        lastName = lastName.replace("+"," ");
        $("#logo #guest").html("");
        $("#loginregisterlinks").remove();
		$('#guest').html('Hi, <a href="/accountManagement?formType=userProfile">'+firstName+' '+lastName+'</a> | <a href="/accountManagement?logout=true&formType=logoutForm">Logout</a>');

    }else{
	    $("#logo #welcome").html("");
		$('#welcome').html('Welcome, Guest <br/><a href="/accountManagement?formType=loginForm">Log in</a> | <a href="/subscribe/subscribe1.aspx">Register</a>');
      }
  
    //  && userId!='undefined'
    if( fromUri != '' && $.cookie('USERID_COOKIE')!=null) {
        window.location.href = fromUri+'?action=allowDownload';
    }
}

var userId = '';
if($.cookie('USERID_COOKIE')!=null){
    userId =  decodeURIComponent($.cookie('USERID_COOKIE'));
}
else if($.cookie('STAGE_USERID_COOKIE')!=null && userId==''){
    userId =  decodeURIComponent($.cookie('STAGE_USERID_COOKIE'));		
}
else if($.cookie('TEST_USERID_COOKIE')!=null && userId==''){
    userId =  decodeURIComponent($.cookie('TEST_USERID_COOKIE'));		
}
else if($.cookie('DEV_USERID_COOKIE')!=null && userId==''){
    userId =  decodeURIComponent($.cookie('DEV_USERID_COOKIE'));		
}
else
    userId = 'undefined';


if(userId!='undefined'){
    var meta = document.createElement('meta');
    meta.name = 'DCS.dcsaut';		
    meta.content = userId;
    document.getElementsByTagName('head')[0].appendChild(meta);	
}

// Newsletters page - subscribe: validate form on keyup and submit
function validateNLs(){
	$("div.nl_error_container").hide();
	$("div.nl_error").hide();	
	var error = 'false';
	var itbeEmail = $("#itbeEmail").val();
	 var sEmail = $('#txtEmail').val();
        if (itbeEmail=="Enter E-mail Address" || $.trim(itbeEmail).length == 0) {
			$("div.nl_error_container").html('<label class="error">Please enter a valid email id</label>').show();
			error = 'true';
        }
        if (validateEmail(itbeEmail)) {
			error = 'false';
        }
        else {
			$("div.nl_error_container").html('<label class="error">Please enter a valid email id</label>').show();
			error = 'true';
        }

	var selectedValues="";
	$checkedCheckboxes = $("input:checkbox[name=Newsletter]:checked");
	if($checkedCheckboxes.length>0 && error=='false'){
		$checkedCheckboxes.each(function () {
		selectedValues += $(this).val()+",";
		});
		document.getElementById('newsletterlist').value = selectedValues;
		document.getElementById('uid').value = userId;

	}
	else if(error=='false')
	{
		$("div.nl_error_container").html('<label class="error">Please select at least one newsletter</label>').show();
		error = 'true';
		
	}
	if(error=='true'){
		return false;
	}else{
		return true;
	}
}

function updateIFrame(aclformData) { //only used for lead form pages
			welcomeUser();	
			var iframe = document.getElementById( 'myframe' );   
			if(typeof( aclformData['height'] )!=undefined && aclformData['height'] !=0)			 
				iframe.setAttribute( 'height', aclformData['height']);
}

function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}

var loadPage = 0;

function updateComment(commentCount) {
    $('#commentCount').html(commentCount);
}

function setReply(commentID) {
    document.getElementById('comment_parent').value = commentID;
}

function getComments(page) {
    var key = document.commentform.key.value;
    var params = {
        key: key,
        page: page
    };
    $('#top_loading').show();
    $('#bottom_loading').show();
    $('#comment_container').load("/comments", params, function () {
        $('#top_loading').hide();
        $('#bottom_loading').hide();
        if (loadPage == 1) {
            window.location = '#comment_container';
        }
        loadPage = 1;
    });
}

$(document).ready(function () {
    
    $("#message").charCounter(1200, {
        container: "#message_counter",
        format: "(Maximum characters: 1200). You have %1 characters left.",
        pulse: false
    });
    
    // validate the comment form when it is submitted
    $("#commentform").validate({
        errorLabelContainer: $("#comment_wrapper .error ul"),
        wrapper: 'li',
        rules: {
            username: "required",
            message: {
                required: true,
                maxlength: 1200
            },
            email: {
                required: true,
                email: true
            },
            userWebSite: {
                url: true
            },
            subject: "required",
            recaptcha_response_field: "required"
        },
        messages: {
            username					: "Please enter your name/nickname",
            message						: "Please enter the message",
            email						: {
        									required	: "Please enter an email address",
        									email		: "Please enter a valid email address"
        								  },
        	userWebSite					: {
          									url		: "Please enter a valid website url"
          								  },
            recaptcha_response_field	: "Please enter the captcha",
            subject : "Please enter the subject"
        },
        submitHandler: function (form) {
            var params = $('#commentform').serialize();
            $('#ajax_loading_img').show();
            $.ajax({
                type: "POST",
                url: "/comments/post",
                data: params,
                dataType: "json",
                success: function (msg) {
                    $('#ajax_loading_img').hide();
                    Recaptcha.reload();
                    if(msg.status){
                    	document.commentform.reset();
                    	$('#comment_wrapper div.fail').hide();
                    	$('#comment_wrapper div.success').show();
                    	$('#commentsuccess').html(msg.Message);
                    }else{
                    	$('#comment_wrapper div.success').hide();
                    	$('#comment_wrapper div.fail').show();
                    	$('#commentfail').html(msg.Message);
                    }
                }
            });
            return false;
        }
    });
    
    //getComments(1);
});(function($){$.fn.charCounter=function(max,settings){max=max||100;settings=$.extend({container:"<span></span>",classname:"charcounter",format:"(%1 characters remaining)",pulse:true,delay:0},settings);var p,timeout;function count(el,container){el=$(el);if(el.val().length>max){el.val(el.val().substring(0,max));if(settings.pulse&&!p){pulse(container,true)}};if(settings.delay>0){if(timeout){window.clearTimeout(timeout)}timeout=window.setTimeout(function(){container.html(settings.format.replace(/%1/,(max-el.val().length)))},settings.delay)}else{container.html(settings.format.replace(/%1/,(max-el.val().length)))}};function pulse(el,again){if(p){window.clearTimeout(p);p=null};el.animate({opacity:0.1},100,function(){$(this).animate({opacity:1.0},100)});if(again){p=window.setTimeout(function(){pulse(el)},200)}};return this.each(function(){var container;if(!settings.container.match(/^<.+>$/)){container=$(settings.container)}else{$(this).next("."+settings.classname).remove();container=$(settings.container).insertAfter(this).addClass(settings.classname)}$(this).unbind(".charCounter").bind("keydown.charCounter",function(){count(this,container)}).bind("keypress.charCounter",function(){count(this,container)}).bind("keyup.charCounter",function(){count(this,container)}).bind("focus.charCounter",function(){count(this,container)}).bind("mouseover.charCounter",function(){count(this,container)}).bind("mouseout.charCounter",function(){count(this,container)}).bind("paste.charCounter",function(){var me=this;setTimeout(function(){count(me,container)},10)});if(this.addEventListener){this.addEventListener('input',function(){count(this,container)},false)};count(this,container)})}})(jQuery);/**
 * jQuery Validation Plugin 1.8.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(c){c.extend(c.fn,{validate:function(a){if(this.length){var b=c.data(this[0],"validator");if(b)return b;b=new c.validator(a,this[0]);c.data(this[0],"validator",b);if(b.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){b.cancelSubmit=true});b.settings.submitHandler&&this.find("input, button").filter(":submit").click(function(){b.submitButton=this});this.submit(function(d){function e(){if(b.settings.submitHandler){if(b.submitButton)var f=c("<input type='hidden'/>").attr("name",
b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);b.settings.submitHandler.call(b,b.currentForm);b.submitButton&&f.remove();return false}return true}b.settings.debug&&d.preventDefault();if(b.cancelSubmit){b.cancelSubmit=false;return e()}if(b.form()){if(b.pendingRequest){b.formSubmitted=true;return false}return e()}else{b.focusInvalid();return false}})}return b}else a&&a.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing")},valid:function(){if(c(this[0]).is("form"))return this.validate().form();
else{var a=true,b=c(this[0].form).validate();this.each(function(){a&=b.element(this)});return a}},removeAttrs:function(a){var b={},d=this;c.each(a.split(/\s/),function(e,f){b[f]=d.attr(f);d.removeAttr(f)});return b},rules:function(a,b){var d=this[0];if(a){var e=c.data(d.form,"validator").settings,f=e.rules,g=c.validator.staticRules(d);switch(a){case "add":c.extend(g,c.validator.normalizeRule(b));f[d.name]=g;if(b.messages)e.messages[d.name]=c.extend(e.messages[d.name],b.messages);break;case "remove":if(!b){delete f[d.name];
return g}var h={};c.each(b.split(/\s/),function(j,i){h[i]=g[i];delete g[i]});return h}}d=c.validator.normalizeRules(c.extend({},c.validator.metadataRules(d),c.validator.classRules(d),c.validator.attributeRules(d),c.validator.staticRules(d)),d);if(d.required){e=d.required;delete d.required;d=c.extend({required:e},d)}return d}});c.extend(c.expr[":"],{blank:function(a){return!c.trim(""+a.value)},filled:function(a){return!!c.trim(""+a.value)},unchecked:function(a){return!a.checked}});c.validator=function(a,
b){this.settings=c.extend(true,{},c.validator.defaults,a);this.currentForm=b;this.init()};c.validator.format=function(a,b){if(arguments.length==1)return function(){var d=c.makeArray(arguments);d.unshift(a);return c.validator.format.apply(this,d)};if(arguments.length>2&&b.constructor!=Array)b=c.makeArray(arguments).slice(1);if(b.constructor!=Array)b=[b];c.each(b,function(d,e){a=a.replace(RegExp("\\{"+d+"\\}","g"),e)});return a};c.extend(c.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",
validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:c([]),errorLabelContainer:c([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(a){this.lastActive=a;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass);this.addWrapper(this.errorsFor(a)).hide()}},onfocusout:function(a){if(!this.checkable(a)&&(a.name in this.submitted||!this.optional(a)))this.element(a)},
onkeyup:function(a){if(a.name in this.submitted||a==this.lastElement)this.element(a)},onclick:function(a){if(a.name in this.submitted)this.element(a);else a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).addClass(b).removeClass(d):c(a).addClass(b).removeClass(d)},unhighlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).removeClass(b).addClass(d):c(a).removeClass(b).addClass(d)}},setDefaults:function(a){c.extend(c.validator.defaults,
a)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:c.validator.format("Please enter no more than {0} characters."),
minlength:c.validator.format("Please enter at least {0} characters."),rangelength:c.validator.format("Please enter a value between {0} and {1} characters long."),range:c.validator.format("Please enter a value between {0} and {1}."),max:c.validator.format("Please enter a value less than or equal to {0}."),min:c.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){function a(e){var f=c.data(this[0].form,"validator");e="on"+e.type.replace(/^validate/,
"");f.settings[e]&&f.settings[e].call(f,this[0])}this.labelContainer=c(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||c(this.currentForm);this.containers=c(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=this.groups={};c.each(this.settings.groups,function(e,f){c.each(f.split(/\s/),function(g,h){b[h]=e})});var d=this.settings.rules;
c.each(d,function(e,f){d[e]=c.validator.normalizeRule(f)});c(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",a).validateDelegate(":radio, :checkbox, select, option","click",a);this.settings.invalidHandler&&c(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){this.checkForm();c.extend(this.submitted,this.errorMap);this.invalid=c.extend({},this.errorMap);this.valid()||c(this.currentForm).triggerHandler("invalid-form",
[this]);this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(a){this.lastElement=a=this.clean(a);this.prepareElement(a);this.currentElements=c(a);var b=this.check(a);if(b)delete this.invalid[a.name];else this.invalid[a.name]=true;if(!this.numberOfInvalids())this.toHide=this.toHide.add(this.containers);this.showErrors();return b},showErrors:function(a){if(a){c.extend(this.errorMap,
a);this.errorList=[];for(var b in a)this.errorList.push({message:a[b],element:this.findByName(b)[0]});this.successList=c.grep(this.successList,function(d){return!(d.name in a)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){c.fn.resetForm&&c(this.currentForm).resetForm();this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},
objectLength:function(a){var b=0,d;for(d in a)b++;return b},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()==0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{c(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},findLastActive:function(){var a=this.lastActive;return a&&c.grep(this.errorList,function(b){return b.element.name==
a.name}).length==1&&a},elements:function(){var a=this,b={};return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&a.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in b||!a.objectLength(c(this).rules()))return false;return b[this.name]=true})},clean:function(a){return c(a)[0]},errors:function(){return c(this.settings.errorElement+"."+this.settings.errorClass,
this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=c([]);this.toHide=c([]);this.currentElements=c([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset();this.toHide=this.errorsFor(a)},check:function(a){a=this.clean(a);if(this.checkable(a))a=this.findByName(a.name).not(this.settings.ignore)[0];var b=c(a).rules(),d=false,e;for(e in b){var f={method:e,parameters:b[e]};try{var g=
c.validator.methods[e].call(this,a.value.replace(/\r/g,""),a,f.parameters);if(g=="dependency-mismatch")d=true;else{d=false;if(g=="pending"){this.toHide=this.toHide.not(this.errorsFor(a));return}if(!g){this.formatAndAdd(a,f);return false}}}catch(h){this.settings.debug&&window.console&&console.log("exception occured when checking element "+a.id+", check the '"+f.method+"' method",h);throw h;}}if(!d){this.objectLength(b)&&this.successList.push(a);return true}},customMetaMessage:function(a,b){if(c.metadata){var d=
this.settings.meta?c(a).metadata()[this.settings.meta]:c(a).metadata();return d&&d.messages&&d.messages[b]}},customMessage:function(a,b){var d=this.settings.messages[a];return d&&(d.constructor==String?d:d[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(arguments[a]!==undefined)return arguments[a]},defaultMessage:function(a,b){return this.findDefined(this.customMessage(a.name,b),this.customMetaMessage(a,b),!this.settings.ignoreTitle&&a.title||undefined,c.validator.messages[b],"<strong>Warning: No message defined for "+
a.name+"</strong>")},formatAndAdd:function(a,b){var d=this.defaultMessage(a,b.method),e=/\$?\{(\d+)\}/g;if(typeof d=="function")d=d.call(this,b.parameters,a);else if(e.test(d))d=jQuery.format(d.replace(e,"{$1}"),b.parameters);this.errorList.push({message:d,element:a});this.errorMap[a.name]=d;this.submitted[a.name]=d},addWrapper:function(a){if(this.settings.wrapper)a=a.add(a.parent(this.settings.wrapper));return a},defaultShowErrors:function(){for(var a=0;this.errorList[a];a++){var b=this.errorList[a];
this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length)this.toShow=this.toShow.add(this.containers);if(this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight){a=0;for(b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass)}this.toHide=this.toHide.not(this.toShow);
this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return c(this.errorList).map(function(){return this.element})},showLabel:function(a,b){var d=this.errorsFor(a);if(d.length){d.removeClass().addClass(this.settings.errorClass);d.attr("generated")&&d.html(b)}else{d=c("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(a),generated:true}).addClass(this.settings.errorClass).html(b||
"");if(this.settings.wrapper)d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,c(a)):d.insertAfter(a))}if(!b&&this.settings.success){d.text("");typeof this.settings.success=="string"?d.addClass(this.settings.success):this.settings.success(d)}this.toShow=this.toShow.add(d)},errorsFor:function(a){var b=this.idOrName(a);return this.errors().filter(function(){return c(this).attr("for")==b})},
idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(a){var b=this.currentForm;return c(document.getElementsByName(a)).map(function(d,e){return e.form==b&&e.name==a&&e||null})},getLength:function(a,b){switch(b.nodeName.toLowerCase()){case "select":return c("option:selected",b).length;case "input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return a.length},
depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):true},dependTypes:{"boolean":function(a){return a},string:function(a,b){return!!c(a,b.form).length},"function":function(a,b){return a(b)}},optional:function(a){return!c.validator.methods.required.call(this,c.trim(a.value),a)&&"dependency-mismatch"},startRequest:function(a){if(!this.pending[a.name]){this.pendingRequest++;this.pending[a.name]=true}},stopRequest:function(a,b){this.pendingRequest--;if(this.pendingRequest<
0)this.pendingRequest=0;delete this.pending[a.name];if(b&&this.pendingRequest==0&&this.formSubmitted&&this.form()){c(this.currentForm).submit();this.formSubmitted=false}else if(!b&&this.pendingRequest==0&&this.formSubmitted){c(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}},previousValue:function(a){return c.data(a,"previousValue")||c.data(a,"previousValue",{old:null,valid:true,message:this.defaultMessage(a,"remote")})}},classRuleSettings:{required:{required:true},
email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(a,b){a.constructor==String?this.classRuleSettings[a]=b:c.extend(this.classRuleSettings,a)},classRules:function(a){var b={};(a=c(a).attr("class"))&&c.each(a.split(" "),function(){this in c.validator.classRuleSettings&&c.extend(b,c.validator.classRuleSettings[this])});return b},attributeRules:function(a){var b=
{};a=c(a);for(var d in c.validator.methods){var e=a.attr(d);if(e)b[d]=e}b.maxlength&&/-1|2147483647|524288/.test(b.maxlength)&&delete b.maxlength;return b},metadataRules:function(a){if(!c.metadata)return{};var b=c.data(a.form,"validator").settings.meta;return b?c(a).metadata()[b]:c(a).metadata()},staticRules:function(a){var b={},d=c.data(a.form,"validator");if(d.settings.rules)b=c.validator.normalizeRule(d.settings.rules[a.name])||{};return b},normalizeRules:function(a,b){c.each(a,function(d,e){if(e===
false)delete a[d];else if(e.param||e.depends){var f=true;switch(typeof e.depends){case "string":f=!!c(e.depends,b.form).length;break;case "function":f=e.depends.call(b,b)}if(f)a[d]=e.param!==undefined?e.param:true;else delete a[d]}});c.each(a,function(d,e){a[d]=c.isFunction(e)?e(b):e});c.each(["minlength","maxlength","min","max"],function(){if(a[this])a[this]=Number(a[this])});c.each(["rangelength","range"],function(){if(a[this])a[this]=[Number(a[this][0]),Number(a[this][1])]});if(c.validator.autoCreateRanges){if(a.min&&
a.max){a.range=[a.min,a.max];delete a.min;delete a.max}if(a.minlength&&a.maxlength){a.rangelength=[a.minlength,a.maxlength];delete a.minlength;delete a.maxlength}}a.messages&&delete a.messages;return a},normalizeRule:function(a){if(typeof a=="string"){var b={};c.each(a.split(/\s/),function(){b[this]=true});a=b}return a},addMethod:function(a,b,d){c.validator.methods[a]=b;c.validator.messages[a]=d!=undefined?d:c.validator.messages[a];b.length<3&&c.validator.addClassRules(a,c.validator.normalizeRule(a))},
methods:{required:function(a,b,d){if(!this.depend(d,b))return"dependency-mismatch";switch(b.nodeName.toLowerCase()){case "select":return(a=c(b).val())&&a.length>0;case "input":if(this.checkable(b))return this.getLength(a,b)>0;default:return c.trim(a).length>0}},remote:function(a,b,d){if(this.optional(b))return"dependency-mismatch";var e=this.previousValue(b);this.settings.messages[b.name]||(this.settings.messages[b.name]={});e.originalMessage=this.settings.messages[b.name].remote;this.settings.messages[b.name].remote=
e.message;d=typeof d=="string"&&{url:d}||d;if(this.pending[b.name])return"pending";if(e.old===a)return e.valid;e.old=a;var f=this;this.startRequest(b);var g={};g[b.name]=a;c.ajax(c.extend(true,{url:d,mode:"abort",port:"validate"+b.name,dataType:"json",data:g,success:function(h){f.settings.messages[b.name].remote=e.originalMessage;var j=h===true;if(j){var i=f.formSubmitted;f.prepareElement(b);f.formSubmitted=i;f.successList.push(b);f.showErrors()}else{i={};h=h||f.defaultMessage(b,"remote");i[b.name]=
e.message=c.isFunction(h)?h(a):h;f.showErrors(i)}e.valid=j;f.stopRequest(b,j)}},d));return"pending"},minlength:function(a,b,d){return this.optional(b)||this.getLength(c.trim(a),b)>=d},maxlength:function(a,b,d){return this.optional(b)||this.getLength(c.trim(a),b)<=d},rangelength:function(a,b,d){a=this.getLength(c.trim(a),b);return this.optional(b)||a>=d[0]&&a<=d[1]},min:function(a,b,d){return this.optional(b)||a>=d},max:function(a,b,d){return this.optional(b)||a<=d},range:function(a,b,d){return this.optional(b)||
a>=d[0]&&a<=d[1]},email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(a)},
url:function(a,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},
date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a))},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9-]+/.test(a))return false;var d=0,e=0,f=false;a=a.replace(/\D/g,"");for(var g=a.length-1;g>=
0;g--){e=a.charAt(g);e=parseInt(e,10);if(f)if((e*=2)>9)e-=9;d+=e;f=!f}return d%10==0},accept:function(a,b,d){d=typeof d=="string"?d.replace(/,/g,"|"):"png|jpe?g|gif";return this.optional(b)||a.match(RegExp(".("+d+")$","i"))},equalTo:function(a,b,d){d=c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){c(b).valid()});return a==d.val()}}});c.format=c.validator.format})(jQuery);
(function(c){var a={};if(c.ajaxPrefilter)c.ajaxPrefilter(function(d,e,f){e=d.port;if(d.mode=="abort"){a[e]&&a[e].abort();a[e]=f}});else{var b=c.ajax;c.ajax=function(d){var e=("port"in d?d:c.ajaxSettings).port;if(("mode"in d?d:c.ajaxSettings).mode=="abort"){a[e]&&a[e].abort();return a[e]=b.apply(this,arguments)}return b.apply(this,arguments)}}})(jQuery);
(function(c){!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.handle.call(this,e)}c.event.special[b]={setup:function(){this.addEventListener(a,d,true)},teardown:function(){this.removeEventListener(a,d,true)},handler:function(e){arguments[0]=c.event.fix(e);arguments[0].type=b;return c.event.handle.apply(this,arguments)}}});c.extend(c.fn,{validateDelegate:function(a,
b,d){return this.bind(b,function(e){var f=c(e.target);if(f.is(a))return d.apply(f,arguments)})}})})(jQuery);var getBrowser = function() {
	var userAgent = navigator.userAgent.toLowerCase();
	if (/webkit/.test( userAgent )) {
		return "safari";
	}
	if (/opera/.test( userAgent )) {
		return "opera";
	}
	if (/msie/.test( userAgent ) && !/opera/.test( userAgent )) {
		return "msie";
	}
	if (/mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )) {
		return "mozilla";
	}
};

var getBrowserVersion = function() {
	var userAgent = navigator.userAgent.toLowerCase();
	return (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1];
};

var hasClass = function(element, className) {
	var array = (element.className || element).toString().split(/\s+/);
	
	var j=-1;
	for (var i=0;i<array.length;i++) {
		if (array[i] === className) {
			j=i;
		}
	}
	return (j > -1);
}

var removeClass = function(element, className) {
	var arr = (element.className || element).toString().split(/\s+/);
	
	var newArr = new Array();
	var j = 0;
	for (var i=0;i<arr.length;i++) {
		if (arr[i] != className) {
			newArr[j] = arr[i];
			j++;
		}
	}
	element.className = newArr.join(" ");
}

var addClass = function(element, className) {
	if (!hasClass(element,className)) {
		element.className += (element.className ? " " : "") + className;
	}
}

var searchChilds = function(element, childClassName, level, maxLevel) {
	maxLevel = maxLevel || 0;
	level = level || 0;
	
	var childs = new Array();
	for(var i=0;i<element.childNodes.length;i++) {
		if (hasClass(element.childNodes[i],childClassName)) {
			childs.push(element.childNodes[i]);
		}
		if (element.childNodes[i].childNodes.length > 0 && (maxLevel == 0 || level < maxLevel)) {
			childs = childs.concat(searchChilds(element.childNodes[i],childClassName,level+1,maxLevel));
		}
	}
	return childs;
}

var searchChildsByTagName = function(element, childTagName, level, maxLevel) {
	maxLevel = maxLevel || 0;
	level = level || 0;
	
	var childs = new Array();
	for(var i=0;i<element.childNodes.length;i++) {
		if (element.childNodes[i].tagName == childTagName) {
			childs.push(element.childNodes[i]);
		}
		if (element.childNodes[i].childNodes.length > 0 && (maxLevel == 0 || level < maxLevel)) {
			childs = childs.concat(searchChildsByTagName(element.childNodes[i],childTagName,level+1,maxLevel));
		}
	}
	return childs;
}

function getStyleValue(elem, prop) {
	var ret, style = elem.style;
	
	if (prop == "opacity" && getBrowser() == "msie") {
		return style.filter && style.filter.indexOf("opacity=") >= 0 ?
			(parseFloat( style.filter.match(/opacity=([^)]*)/)[1] ) / 100) + '':
			"";
	} else {
		return parseInt(style[prop],10) || 0;
	}
}

function setStyleValue(elem, prop, value) {	
	if (prop == "opacity" && getBrowser() == "msie") {
		elem.style.zoom=1;
		elem.style.filter = (elem.style.filter || "").replace( /alpha\([^)]*\)/, "" ) +
			(parseInt( value ) + '' == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
		
	} else {
		elem.style[prop]=value;
	}
}

function getWidth(elem, p, b, m) {
	w = elem.offsetWidth;
	
	p = p || true;
	b = b || true;
	m = m || false;
	
	padding = 0;
	border = 0;
	margin = 0;
	
	if (p)
		padding = getStyleValue(elem, "paddingLeft") + getStyleValue(elem, "paddingRight");
		
	if (b)
		border = getStyleValue(elem, "borderLeftWidth") + getStyleValue(elem, "borderRightWidth");
		
	if (m) 
		margin = getStyleValue(elem, "marginLeft") + getStyleValue(elem, "marginRight");
		
	return w + padding + border + margin;
}

function noww() {
	return +new Date;
}

var Animation = function(duration,step,complete,cancel) {
	var startTime = noww();
	var dur = duration;
	var self=this;
	
	var timerId = window.setInterval(function() {
		var n  = noww() - startTime;
		var state = n / dur;
		if (state > 1) {
			state = 1;
		}
		if (step != undefined && typeof(step) == "function") {
			
			var r = step.call(self,state,n,dur) || true;
			if (!r || state >= 1) {
				window.clearInterval(timerId);
				if (!r && cancel != undefined && typeof(cancel) == "function") {
					cancel.call(state);
				}
				if (r && complete != undefined && typeof(complete) == "function") {
					complete.call(state);
				}
			}
		}
	},13);
	
}

function quadinit()
{
	var querystring = window.location.search;

	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{ 

		var quadresponse = xmlhttp.responseText;
		var responsearray = quadresponse.split("#####");	
		demandBaseResponse = responsearray[1]; 
		demandBaseResponse = eval("(" + demandBaseResponse + ")");
		demandbaseQual = responsearray[2]; 
		criteria = responsearray[3];
	
		}
	}
	
	var randomnumber=Math.floor(Math.random()*9876543210);
	if (querystring.indexOf("ip")>=0){
		querystring = querystring+'&randN='+randomnumber;
	}
	else
		querystring = '?randN='+randomnumber;

	xmlhttp.open("GET",'/front_page/quadinit'+querystring, false);
	xmlhttp.send();
}

function initFeatureBox(element,autoNextDelay) {
	if (autoNextDelay == undefined) {
		autoNextDelay = 10000;
	}
	return new FeatureBox(element,autoNextDelay);
}

function FeatureBox(element,d) {
	var self = this;
	var items = new Array();
	var p = element;
	var cur, cur_item, bAnim, nextTitle, autoNextTimeout=0;
	var browser = getBrowser();
	var anim = {};
	var autoNextDelay=d;
	
	var anim_step = function(state,n,d) {
		var diff = anim.to - anim.from;
		var r = anim.to;
		if (state >= 1) {
			r = anim.from + diff;
		} else {
			if (anim.easing == "swing") {
				r = ((-Math.cos(state*Math.PI)/2) + 0.5);
				r = r * diff + anim.from;
			} else if (anim.easing == "easeOutExpo") {
				if (n==d) {
					r = 1;
				} else {
					r = 1 * (-Math.pow(2, -10 * n/d) + 1);
				}
				r = anim.from + diff * r;
			} else {
				r = anim.from + diff * state;
			}
		}
		
        //alert(anim.obj.target+'---'+anim.obj.img);
		setStyleValue(anim.obj.target,"opacity",r);
		/*if (anim.obj.img) {
			setStyleValue(anim.obj.img,"opacity",r);
		}*/
		
	};
	
	var anim_step2 = function(state,n,d) {
		var xdiff = anim.to_left - anim.from_left;
		var x = anim.to_left;
		
		if (state >= 1) {
			x = anim.from_left + xdiff;
		} else {
			if (anim.easing == "swing") {
				r = ((-Math.cos(state*Math.PI)/2) + 0.5);
				x = r * xdiff + anim.from_left;
			} else if (anim.easing == "easeOutExpo") {
				if (n==d) {
					r = 1;
				} else {
					r = 1 * (-Math.pow(2, -10 * n/d) + 1);
				}
				x = anim.from_left + xdiff * r;
			} else {
				x = anim.from_left + xdiff * state;
			}
		}
		
		//setStyleValue(anim.obj.img,"left",x+"px");
	};
	
	var anim_complete = function(state) {
		anim.state++;
		if (anim.state > 1) {
			bAnim = false;
		} else {
			setStyleValue(anim.obj.target,"display","none");
            
			/*if (browser == "msie" && anim.obj.img) {
				setStyleValue(anim.obj.img,"display","none");
			}*/
			anim.from=0;
			anim.to=1;
			anim.obj=anim.toShow;
			anim.from_left = 200;
			anim.to_left = 0;
			
			setStyleValue(anim.obj.target,"display","block");
			setStyleValue(anim.obj.target,"opacity",0);
			/*if (anim.obj.img) {
				setStyleValue(anim.obj.img,"display","block");
				setStyleValue(anim.obj.img,"opacity",0);
			}
			
			if (anim.obj.img) {
				setStyleValue(anim.obj.img,"left",anim.from_left);
			}*/
			
			new Animation(anim.duration, anim_step, anim_complete);
			new Animation(300, anim_step2);
		}
	};
	
	
	var show = function(item) {
		
		var toHide = cur;
		var toShow = item;
		
		if (toHide.target && toShow.target) {
			anim.toHide = toHide;
			anim.toShow = toShow;
			
			anim.obj = toHide;
			anim.state = 0;
			anim.from = 1;
			anim.to = 0;
			anim.duration = 600;
			anim.easing = "swing";
			
			bAnim = true;
			new Animation(anim.duration, anim_step, anim_complete);
		}
	};
	
	var getNextItem = function() {
		var item;
		for (var i=0,n=items.length;i<n;i++) {
			if (cur.id == items[i].id) {
				i++;
				if (i >= n) {
					i=0;
				}
				item = items[i];
				break;
			}
		}
		return item;
	};
	
	var showNextTitle = function() {
		var item = getNextItem();
		
		nextTitle.innerHTML = (item.link.title.length < 55)?item.link.title:item.link.title.substring(0, 55) + '...';
	};
	
	var item_onClick = function() {
		var item;
		if (bAnim) return false;
		if (cur.link.id == this.id) return false;
		
		for (var i=0,n=items.length;i<n;i++) {
			if (this.id == items[i].id) {
				item = items[i];
				break;
			}
		}
		if (item) {
			cancelAutoNext();
			show(item);
			removeClass(cur.link,"active");
			cur = item;
			addClass(cur.link,"active");
			showNextTitle();
			initAutoNext();
		}
		
		return false;
	};
	
	var cancelAutoNext = function() {
		if (autoNextTimeout != 0) {
			window.clearTimeout(autoNextTimeout);
		}
		autoNextTimeout = 0;
	};
	var initAutoNext = function() {
		cancelAutoNext();
		autoNextTimeout = window.setTimeout(function() {
			var item = getNextItem();
			item_onClick.apply(item.link);
		},autoNextDelay);
	};
	
	var init = function() {
		var nav_holder = (searchChilds(p,"feature_nav"))[0];
		//var nav_label = (searchChilds(nav_holder,"next_label"))[0];
		nextTitle = (searchChilds(nav_holder,"next_title"))[0];
		
		var nav = (searchChilds(nav_holder,"nav"))[0];
		a = searchChildsByTagName(nav,"A");
		
		for (var i=0,n=a.length,j=0 ; i < n ; i++) {
			var link = a[i];
			var obj = document.getElementById((link.href.split("#",2))[1]);
			
			if (obj) {
				items[j] = {};
				items[j].link = link;
				items[j].target = obj;
				
				if (!link.id) {
					link.id = "featureBox_link_" + j;
				}
				items[j].id = link.id;
				
				items[j].img = (searchChilds(obj, "item_image"))[0] || null;
				
				j++;
			}

		}
		
		for(var i=0,n=items.length;i<n;i++) {
			var display,opacity;
			if (i==0) {
				cur = items[i];
				addClass(items[i].link,"active");
				display="block";
				opacity=0.99;
			} else {
				display="none";
				opacity=0;
			}
			
			setStyleValue(items[i].target,"display",display);
			setStyleValue(items[i].target,"opacity",opacity);
			if (items[i].img) {
				setStyleValue(items[i].img,"display",display);
				setStyleValue(items[i].img,"opacity",opacity);
			}
			
			var item = items[i];
			items[i].link.onclick = item_onClick;
		}
		
	}
	
	init();
	showNextTitle();
	initAutoNext();
}/*
* $ lightbox_me
* By: Buck Wilson
* Version : 2.4
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


(function($) {

    $.fn.lightbox_me = function(options) {

        return this.each(function() {

            var
                opts = $.extend({}, $.fn.lightbox_me.defaults, options),
                $overlay = $(),
                $self = $(this),
                $iframe = $('<iframe id="foo" style="z-index: ' + (opts.zIndex + 1) + ';border: none; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; top: 0; left: 0; filter: mask();"/>');

            if (opts.showOverlay) {
                //check if there's an existing overlay, if so, make subequent ones clear
               var $currentOverlays = $(".js_lb_overlay:visible");
                if ($currentOverlays.length > 0){
                    $overlay = $('<div class="lb_overlay_clear js_lb_overlay"/>');
                } else {
                    $overlay = $('<div class="' + opts.classPrefix + '_overlay js_lb_overlay"/>');
                }
            }

            /*----------------------------------------------------
               DOM Building
            ---------------------------------------------------- */
            $('body').append($self.hide()).append($overlay);


            /*----------------------------------------------------
               Overlay CSS stuffs
            ---------------------------------------------------- */

            // set css of the overlay
            if (opts.showOverlay) {
                setOverlayHeight(); // pulled this into a function because it is called on window resize.
                $overlay.css({ position: 'absolute', width: '100%', top: 0, left: 0, right: 0, bottom: 0, zIndex: (opts.zIndex + 2), display: 'none' });
				if (!$overlay.hasClass('lb_overlay_clear')){
                	$overlay.css(opts.overlayCSS);
                }
            }

            /*----------------------------------------------------
               Animate it in.
            ---------------------------------------------------- */
               //
            if (opts.showOverlay) {
                $overlay.fadeIn(opts.overlaySpeed, function() {
                    setSelfPosition();
                    $self[opts.appearEffect](opts.lightboxSpeed, function() { setOverlayHeight(); setSelfPosition(); opts.onLoad()});
                });
            } else {
                setSelfPosition();
                $self[opts.appearEffect](opts.lightboxSpeed, function() { opts.onLoad()});
            }

            /*----------------------------------------------------
               Hide parent if parent specified (parentLightbox should be jquery reference to any parent lightbox)
            ---------------------------------------------------- */
            if (opts.parentLightbox) {
                opts.parentLightbox.fadeOut(200);
            }


            /*----------------------------------------------------
               Bind Events
            ---------------------------------------------------- */

            $(window).resize(setOverlayHeight)
                     .resize(setSelfPosition)
                     .scroll(setSelfPosition);

            $(window).bind('keyup.lightbox_me', observeKeyPress);

            if (opts.closeClick) {
                $overlay.click(function(e) { closeLightbox(); e.preventDefault; });
            }
            $self.delegate(opts.closeSelector, "click", function(e) {
                closeLightbox(); e.preventDefault();
            });
            $self.bind('close', closeLightbox);
            $self.bind('reposition', setSelfPosition);



            /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
              -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


            /*----------------------------------------------------
               Private Functions
            ---------------------------------------------------- */

            /* Remove or hide all elements */
            function closeLightbox() {
                var s = $self[0].style;
                if (opts.destroyOnClose) {
                    $self.add($overlay).remove();
                } else {
                    $self.add($overlay).hide();
                }

                //show the hidden parent lightbox
                if (opts.parentLightbox) {
                    opts.parentLightbox.fadeIn(200);
                }
                if (opts.preventScroll) {
                    $('body').css('overflow', '');
                }
                $iframe.remove();

				        // clean up events.
                $self.undelegate(opts.closeSelector, "click");
                $self.unbind('close', closeLightbox);
                $self.unbind('repositon', setSelfPosition);
                
                $(window).unbind('resize', setOverlayHeight);
                $(window).unbind('resize', setSelfPosition);
                $(window).unbind('scroll', setSelfPosition);
                $(window).unbind('keyup.lightbox_me');
                opts.onClose();
            }


            /* Function to bind to the window to observe the escape/enter key press */
            function observeKeyPress(e) {
                if((e.keyCode == 27 || (e.DOM_VK_ESCAPE == 27 && e.which==0)) && opts.closeEsc) closeLightbox();
            }


            /* Set the height of the overlay
                    : if the document height is taller than the window, then set the overlay height to the document height.
                    : otherwise, just set overlay height: 100%
            */
            function setOverlayHeight() {
                if ($(window).height() < $(document).height()) {
                    $overlay.css({height: $(document).height() + 'px'});
                     $iframe.css({height: $(document).height() + 'px'});
                } else {
                    $overlay.css({height: '100%'});
                }
            }


            /* Set the position of the modal'd window ($self)
                    : if $self is taller than the window, then make it absolutely positioned
                    : otherwise fixed
            */
            function setSelfPosition() {
                var s = $self[0].style;

                // reset CSS so width is re-calculated for margin-left CSS
                $self.css({left: '50%', marginLeft: ($self.outerWidth() / 2) * -1,  zIndex: (opts.zIndex + 3) });


                /* we have to get a little fancy when dealing with height, because lightbox_me
                    is just so fancy.
                 */

                // if the height of $self is bigger than the window and self isn't already position absolute
                if (($self.height() + 80  >= $(window).height()) && ($self.css('position') != 'absolute')) {

                    // we are going to make it positioned where the user can see it, but they can still scroll
                    // so the top offset is based on the user's scroll position.
                    var topOffset = $(document).scrollTop() + 40;
                    $self.css({position: 'absolute', top: topOffset + 'px', marginTop: 0})
                } else if ($self.height()+ 80  < $(window).height()) {
                    //if the height is less than the window height, then we're gonna make this thing position: fixed.
                    if (opts.centered) {
                        $self.css({ position: 'fixed', top: '50%', marginTop: ($self.outerHeight() / 2) * -1})
                    } else {
                        $self.css({ position: 'fixed'}).css(opts.modalCSS);
                    }
                    if (opts.preventScroll) {
                        $('body').css('overflow', 'hidden');
                    }
                }
            }

        });



    };

    $.fn.lightbox_me.defaults = {

        // animation
        appearEffect: "fadeIn",
        appearEase: "",
        overlaySpeed: 250,
        lightboxSpeed: 300,

        // close
        closeSelector: ".close",
        closeClick: true,
        closeEsc: true,

        // behavior
        destroyOnClose: false,
        showOverlay: true,
        parentLightbox: false,
        preventScroll: false,

        // callbacks
        onLoad: function() {},
        onClose: function() {},

        // style
        classPrefix: 'lb',
        zIndex: 999,
        centered: false,
        modalCSS: {top: '40px'},
        overlayCSS: {background: 'black', opacity: .3}
    }
})(jQuery);
$(document).ready(function() {

	/***** HOME PAGE TOP ROTATOR *****/
	// ref: http://slidesjs.com/
    $("#slides").slides({
    	play: 15000,
    	effect: 'fade',
    	slideSpeed: 550,
    	paginationClass:'slidePagination',
    	pagination:true
	});

	
	// CURRENT TOPICS: more content
	if ($('#morecontent')) {
		$("#morecontent").click(function() {
			if($(this).hasClass("showHidedisplayTextDown")) {
				$('#inactive').fadeIn(2000);
				$(this).removeClass('showHidedisplayTextDown').addClass('showHidedisplayTextUp');
				$(this).text('Hide More Content');
			} else {
				$('#inactive').fadeOut(2000);
				$(this).removeClass('showHidedisplayTextUp').addClass('showHidedisplayTextDown');
				$(this).text('Display More Content');
			}			
			return false;
		});
	}   
	
	// More content slideshow
	$(".slidingDiv").hide();
	$(".show_hide").show();		
	$('.show_hide').click(function(){
		if ( !$(".slidingDiv").is(':animated') ) {  // To prevent animation queue
			$(".slidingDiv").slideToggle(2000);    
		}//end if
	});
	
});

function registrationPopup() {
    if($.cookie('USERID_COOKIE')!=null && $.cookie('newuserregistration')=='y') {
        $("#newuserregistrationpopup").lightbox_me({
            centered: true,
            preventScroll: true,
            overlayCSS: {background: '#595959','opacity': 0.8},
            onClose: function   () {
                $.cookie("newuserregistration", 'n', { path: '/',domain:'.itbusinessedge.com'});
            }
        });
        setTimeout(function(){
            $("#newuserregistrationpopup").trigger("close");
            window.location.href = '/';
        }, 30000);
    }
}/*
* Slides, A Slideshow Plugin for jQuery
* Intructions: http://slidesjs.com
* By: Nathan Searles, http://nathansearles.com
* Version: 1.1.3
* Updated: February 21th, 2011
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function($){
	$.fn.slides = function( option ) {
		// override defaults with specified option
		option = $.extend( {}, $.fn.slides.option, option );

		return this.each(function(){
			// wrap slides in control container, make sure slides are block level
			$('.' + option.container, $(this)).children().wrapAll('<div class="slides_control"/>');
			
			var elem = $(this),
				control = $('.slides_control',elem),
				total = control.children().size(),
				width = control.children().outerWidth(),
				height = control.children().outerHeight(),
				start = option.start - 1,
				effect = option.effect.indexOf(',') < 0 ? option.effect : option.effect.replace(' ', '').split(',')[0],
				paginationEffect = option.effect.indexOf(',') < 0 ? effect : option.effect.replace(' ', '').split(',')[1],
				next = 0, prev = 0, number = 0, current = 0, loaded, active, clicked, position, direction, imageParent, pauseTimeout, playInterval;
			
			// animate slides
			function animate(direction, effect, clicked) {
				if (!active && loaded) {
					active = true;
					switch(direction) {
						case 'next':
							// change current slide to previous
							prev = current;
							// get next from current + 1
							next = current + 1;
							// if last slide, set next to first slide
							next = total === next ? 0 : next;
							// set position of next slide to right of previous
							position = width*2;
							// distance to slide based on width of slides
							direction = -width*2;
							// store new current slide
							current = next;
						break;
						case 'prev':
							// change current slide to previous
							prev = current;
							// get next from current - 1
							next = current - 1;
							// if first slide, set next to last slide
							next = next === -1 ? total-1 : next;								
							// set position of next slide to left of previous
							position = 0;								
							// distance to slide based on width of slides
							direction = 0;		
							// store new current slide
							current = next;
						break;
						case 'pagination':
							// get next from pagination item clicked, convert to number
							next = parseInt(clicked,10);
							// get previous from pagination item with class of current
							prev = $('.' + option.paginationClass + ' li.current a', elem).attr('href').match('[^#/]+$');
							// if next is greater then previous set position of next slide to right of previous
							if (next > prev) {
								position = width*2;
								direction = -width*2;
							} else {
							// if next is less then previous set position of next slide to left of previous
								position = 0;
								direction = 0;
							}
							// store new current slide
							current = next;
						break;
					}

					// fade animation
					if (effect === 'fade') {
						option.animationStart();
						// fade animation with crossfade
						if (option.crossfade) {
							// put hidden next above current
							control.children(':eq('+ next +')', elem).css({
								zIndex: 10
							// fade in next
							}).fadeIn(option.fadeSpeed, option.fadeEasing, function(){
								if (option.autoHeight) {
									// animate container to height of next
									control.animate({
										height: control.children(':eq('+ next +')', elem).outerHeight()
									}, option.autoHeightSpeed, function(){
										// hide previous
										control.children(':eq('+ prev +')', elem).css({
											display: 'none',
											zIndex: 0
										});								
										// reset z index
										control.children(':eq('+ next +')', elem).css({
											zIndex: 0
										});									
										// end of animation
										option.animationComplete(next + 1);
										active = false;
									});
								} else {
									// hide previous
									control.children(':eq('+ prev +')', elem).css({
										display: 'none',
										zIndex: 0
									});									
									// reset zindex
									control.children(':eq('+ next +')', elem).css({
										zIndex: 0
									});									
									// end of animation
									option.animationComplete(next + 1);
									active = false;
								}
							});
						} else {
							option.animationStart();
							// fade animation with no crossfade
							control.children(':eq('+ prev +')', elem).fadeOut(option.fadeSpeed,  option.fadeEasing, function(){
								// animate to new height
								if (option.autoHeight) {
									control.animate({
										// animate container to height of next
										height: control.children(':eq('+ next +')', elem).outerHeight()
									}, option.autoHeightSpeed,
									// fade in next slide
									function(){
										control.children(':eq('+ next +')', elem).fadeIn(option.fadeSpeed, option.fadeEasing);
									});
								} else {
								// if fixed height
									control.children(':eq('+ next +')', elem).fadeIn(option.fadeSpeed, option.fadeEasing, function(){
										// fix font rendering in ie, lame
										if($.browser.msie) {
											$(this).get(0).style.removeAttribute('filter');
										}
									});
								}									
								// end of animation
								option.animationComplete(next + 1);
								active = false;
							});
						}
					// slide animation
					} else {
						// move next slide to right of previous
						control.children(':eq('+ next +')').css({
							left: position,
							display: 'block'
						});
						// animate to new height
						if (option.autoHeight) {
							option.animationStart();
							control.animate({
								left: direction,
								height: control.children(':eq('+ next +')').outerHeight()
							},option.slideSpeed, option.slideEasing, function(){
								control.css({
									left: -width
								});
								control.children(':eq('+ next +')').css({
									left: width,
									zIndex: 5
								});
								// reset previous slide
								control.children(':eq('+ prev +')').css({
									left: width,
									display: 'none',
									zIndex: 0
								});
								// end of animation
								option.animationComplete(next + 1);
								active = false;
							});
							// if fixed height
							} else {
								option.animationStart();
								// animate control
								control.animate({
									left: direction
								},option.slideSpeed, option.slideEasing, function(){
									// after animation reset control position
									control.css({
										left: -width
									});
									// reset and show next
									control.children(':eq('+ next +')').css({
										left: width,
										zIndex: 5
									});
									// reset previous slide
									control.children(':eq('+ prev +')').css({
										left: width,
										display: 'none',
										zIndex: 0
									});
									// end of animation
									option.animationComplete(next + 1);
									active = false;
								});
							}
						}
					// set current state for pagination
					if (option.pagination) {
						// remove current class from all
						$('.'+ option.paginationClass +' li.current', elem).removeClass('current');
						// add current class to next
						$('.' + option.paginationClass + ' li:eq('+ next +')', elem).addClass('current');
					}
				}
			} // end animate function
			
			function stop() {
				// clear interval from stored id
				clearInterval(elem.data('interval'));
			}

			function pause() {
				if (option.pause) {
					// clear timeout and interval
					clearTimeout(elem.data('pause'));
					clearInterval(elem.data('interval'));
					// pause slide show for option.pause amount
					pauseTimeout = setTimeout(function() {
						// clear pause timeout
						clearTimeout(elem.data('pause'));
						// start play interval after pause
						playInterval = setInterval(	function(){
							animate("next", effect);
						},option.play);
						// store play interval
						elem.data('interval',playInterval);
					},option.pause);
					// store pause interval
					elem.data('pause',pauseTimeout);
				} else {
					// if no pause, just stop
					stop();
				}
			}
				
			// 2 or more slides required
			if (total < 2) {
				return;
			}
			
			// error corection for start slide
			if (start < 0) {
				start = 0;
			}
			
			if (start > total) {
				start = total - 1;
			}
					
			// change current based on start option number
			if (option.start) {
				current = start;
			}
			
			// randomizes slide order
			if (option.randomize) {
				control.randomize();
			}
			
			// make sure overflow is hidden, width is set
			$('.' + option.container, elem).css({
				overflow: 'hidden',
				// fix for ie
				position: 'relative'
			});
			
			// set css for slides
			control.children().css({
				position: 'absolute',
				top: 0, 
				left: control.children().outerWidth(),
				zIndex: 0,
				display: 'none'
			 });
			
			// set css for control div
			control.css({
				position: 'relative',
				// size of control 3 x slide width
				width: (width * 3),
				// set height to slide height
				height: height,
				// center control to slide
				left: -width
			});
			
			// show slides
			$('.' + option.container, elem).css({
				display: 'block'
			});

			// if autoHeight true, get and set height of first slide
			if (option.autoHeight) {
				control.children().css({
					height: 'auto'
				});
				control.animate({
					height: control.children(':eq('+ start +')').outerHeight()
				},option.autoHeightSpeed);
			}
			
			// checks if image is loaded
			if (option.preload && control.find('img').length) {
				// adds preload image
				$('.' + option.container, elem).css({
					background: 'url(' + option.preloadImage + ') no-repeat 50% 50%'
				});
				
				// gets image src, with cache buster
				var img = control.find('img:eq(' + start + ')').attr('src') + '?' + (new Date()).getTime();
				
				// check if the image has a parent
				if ($('img', elem).parent().attr('class') != 'slides_control') {
					// If image has parent, get tag name
					imageParent = control.children(':eq(0)')[0].tagName.toLowerCase();
				} else {
					// Image doesn't have parent, use image tag name
					imageParent = control.find('img:eq(' + start + ')');
				}

				// checks if image is loaded
				control.find('img:eq(' + start + ')').attr('src', img).load(function() {
					// once image is fully loaded, fade in
					control.find(imageParent + ':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, function(){
						$(this).css({
							zIndex: 5
						});
						// removes preload image
						elem.css({
							background: ''
						});
						// let the script know everything is loaded
						loaded = true;
					});
				});
			} else {
				// if no preloader fade in start slide
				control.children(':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, function(){
					// let the script know everything is loaded
					loaded = true;
				});
			}
			
			// click slide for next
			if (option.bigTarget) {
				// set cursor to pointer
				control.children().css({
					cursor: 'pointer'
				});
				// click handler
				control.children().click(function(){
					// animate to next on slide click
					animate('next', effect);
					return false;
				});									
			}
			
			// pause on mouseover
			if (option.hoverPause && option.play) {
				control.bind('mouseover',function(){
					// on mouse over stop
					stop();
				});
				control.bind('mouseleave',function(){
					// on mouse leave start pause timeout
					pause();
				});
			}
			
			// generate next/prev buttons
			if (option.generateNextPrev) {
				$('.' + option.container, elem).after('<a href="#" class="'+ option.prev +'">Prev</a>');
				$('.' + option.prev, elem).after('<a href="#" class="'+ option.next +'">Next</a>');
			}
			
			// next button
			$('.' + option.next ,elem).click(function(e){
				e.preventDefault();
				if (option.play) {
					pause();
				}
				animate('next', effect);
			});
			
			// previous button
			$('.' + option.prev, elem).click(function(e){
				e.preventDefault();
				if (option.play) {
					 pause();
				}
				animate('prev', effect);
			});
			
			// generate pagination
			if (option.generatePagination) {
				// create unordered list
				elem.append('<ul class='+ option.paginationClass +'></ul>');
				// for each slide create a list item and link
				control.children().each(function(){
					//Mahesh: added to check for last page and add class name
					if(number == total - 1)
						$('.' + option.paginationClass, elem).append('<li rel="noindex,nofollow" class="last"><a href="#'+ number +'">'+ (number+1) +'</a></li>');
					else
						$('.' + option.paginationClass, elem).append('<li><a rel="noindex,nofollow" href="#'+ number +'">'+ (number+1) +'</a></li>');
					
					number++;
				});
			} else {
				// if pagination exists, add href w/ value of item number to links
				$('.' + option.paginationClass + ' li a', elem).each(function(){
					$(this).attr('href', '#' + number);
					number++;
				});
			}
			
			// add current class to start slide pagination
			$('.' + option.paginationClass + ' li:eq('+ start +')', elem).addClass('current');
			
			// click handling 
			$('.' + option.paginationClass + ' li a', elem ).click(function(){
				// pause slideshow
				if (option.play) {
					 pause();
				}
				// get clicked, pass to animate function					
				clicked = $(this).attr('href').match('[^#/]+$');
				// if current slide equals clicked, don't do anything
				if (current != clicked) {
					animate('pagination', paginationEffect, clicked);
				}
				return false;
			});
			
			// click handling 
			$('a.link', elem).click(function(){
				// pause slideshow
				if (option.play) {
					 pause();
				}
				// get clicked, pass to animate function					
				clicked = $(this).attr('href').match('[^#/]+$') - 1;
				// if current slide equals clicked, don't do anything
				if (current != clicked) {
					animate('pagination', paginationEffect, clicked);
				}
				return false;
			});
		
			if (option.play) {
				// set interval
				playInterval = setInterval(function() {
					animate('next', effect);
				}, option.play);
				// store interval id
				elem.data('interval',playInterval);
			}
		});
	};
	
	// default options
	$.fn.slides.option = {
		preload: false, // boolean, Set true to preload images in an image based slideshow
		preloadImage: '/img/loading.gif', // string, Name and location of loading image for preloader. Default is "/img/loading.gif"
		container: 'slides_container', // string, Class name for slides container. Default is "slides_container"
		generateNextPrev: false, // boolean, Auto generate next/prev buttons
		next: 'next', // string, Class name for next button
		prev: 'prev', // string, Class name for previous button
		pagination: true, // boolean, If you're not using pagination you can set to false, but don't have to
		generatePagination: true, // boolean, Auto generate pagination
		paginationClass: 'pagination', // string, Class name for pagination
		fadeSpeed: 350, // number, Set the speed of the fading animation in milliseconds
		fadeEasing: '', // string, must load jQuery's easing plugin before http://gsgd.co.uk/sandbox/jquery/easing/
		slideSpeed: 350, // number, Set the speed of the sliding animation in milliseconds
		slideEasing: '', // string, must load jQuery's easing plugin before http://gsgd.co.uk/sandbox/jquery/easing/
		start: 1, // number, Set the speed of the sliding animation in milliseconds
		effect: 'slide', // string, '[next/prev], [pagination]', e.g. 'slide, fade' or simply 'fade' for both
		crossfade: false, // boolean, Crossfade images in a image based slideshow
		randomize: false, // boolean, Set to true to randomize slides
		play: 0, // number, Autoplay slideshow, a positive number will set to true and be the time between slide animation in milliseconds
		pause: 0, // number, Pause slideshow on click of next/prev or pagination. A positive number will set to true and be the time of pause in milliseconds
		hoverPause: false, // boolean, Set to true and hovering over slideshow will pause it
		autoHeight: false, // boolean, Set to true to auto adjust height
		autoHeightSpeed: 350, // number, Set auto height animation time in milliseconds
		bigTarget: false, // boolean, Set to true and the whole slide will link to next slide on click
		animationStart: function(){}, // Function called at the start of animation
		animationComplete: function(){} // Function called at the completion of animation
	};
	
	// Randomize slide order on load
	$.fn.randomize = function(callback) {
		function randomizeOrder() { return(Math.round(Math.random())-0.5); }
			return($(this).each(function() {
			var $this = $(this);
			var $children = $this.children();
			var childCount = $children.length;
			if (childCount > 1) {
				$children.hide();
				var indices = [];
				for (i=0;i<childCount;i++) { indices[indices.length] = i; }
				indices = indices.sort(randomizeOrder);
				$.each(indices,function(j,k) { 
					var $child = $children.eq(k);
					var $clone = $child.clone(true);
					$clone.show().appendTo($this);
					if (callback !== undefined) {
						callback($child, $clone);
					}
				$child.remove();
			});
			}
		}));
	};
})(jQuery); 
var tabdropdown={
	disappeardelay:150, 
	disablemenuclick: false, 
	enableiframeshim: 1, 
	
	dropmenuobj: null, ie: document.all, firefox: document.getElementById&&!document.all, previousmenuitem:null,
	currentpageurl: window.location.href.replace("http://"+window.location.hostname, "").replace(/^\//, ""), 

	getposOffset:function(what, offsettype){
		var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
		var parentEl=what.offsetParent;
			while (parentEl!=null){
				totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
				parentEl=parentEl.offsetParent;
			}
		return totaloffset;
	},

	showhide:function(obj, e, obj2){ 
		if (this.ie || this.firefox)
			this.dropmenuobj.style.left=this.dropmenuobj.style.top="-500px"
		if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover"){
			if (obj2.parentNode.className.indexOf("default")==-1) //if tab isn't a default selected one
				obj2.parentNode.className="selected"
			obj.visibility="visible"
			}
		else if (e.type=="click")
			obj.visibility="hidden"
	},

	iecompattest:function(){
		return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
	},

	clearbrowseredge:function(obj, whichedge){
		var edgeoffset=0
		if (whichedge=="rightedge"){
			var windowedge=this.ie && !window.opera? this.standardbody.scrollLeft+this.standardbody.clientWidth-15 : window.pageXOffset+window.innerWidth-15
			this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetWidth
		if (windowedge-this.dropmenuobj.x < this.dropmenuobj.contentmeasure)  //move menu to the left?
			edgeoffset=this.dropmenuobj.contentmeasure-obj.offsetWidth
		}
		else{
			var topedge=this.ie && !window.opera? this.standardbody.scrollTop : window.pageYOffset
			var windowedge=this.ie && !window.opera? this.standardbody.scrollTop+this.standardbody.clientHeight-15 : window.pageYOffset+window.innerHeight-18
			this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetHeight
			if (windowedge-this.dropmenuobj.y < this.dropmenuobj.contentmeasure){ //move up?
				edgeoffset=this.dropmenuobj.contentmeasure+obj.offsetHeight
				if ((this.dropmenuobj.y-topedge)<this.dropmenuobj.contentmeasure) //up no good either?
					edgeoffset=this.dropmenuobj.y+obj.offsetHeight-topedge
			}
			this.dropmenuobj.firstlink.style.borderTopWidth=(edgeoffset==0)? 0 : "1px" //Add 1px top border to menu if dropping up
		}
		return edgeoffset
	},

	dropit:function(obj, e, dropmenuID){
		if (this.dropmenuobj!=null){ //hide previous menu
			this.dropmenuobj.style.visibility="hidden" //hide menu
			if (this.previousmenuitem!=null && this.previousmenuitem!=obj){
				if (this.previousmenuitem.parentNode.className.indexOf("default")==-1) //If the tab isn't a default selected one
					this.previousmenuitem.parentNode.className=""
			}
		}
		this.clearhidemenu()
		if (this.ie||this.firefox){
			obj.onmouseout=function(){tabdropdown.delayhidemenu(obj)}
			obj.onclick=function(){return !tabdropdown.disablemenuclick} //disable main menu item link onclick?
			this.dropmenuobj=document.getElementById(dropmenuID)
			this.dropmenuobj.onmouseover=function(){tabdropdown.clearhidemenu()}
			this.dropmenuobj.onmouseout=function(e){tabdropdown.dynamichide(e, obj)}
			this.dropmenuobj.onclick=function(){tabdropdown.delayhidemenu(obj)}
			this.showhide(this.dropmenuobj.style, e, obj)
			this.dropmenuobj.x=this.getposOffset(obj, "left")
			this.dropmenuobj.y=this.getposOffset(obj, "top")
			this.dropmenuobj.style.left=this.dropmenuobj.x-this.clearbrowseredge(obj, "rightedge")+"px"
			this.dropmenuobj.style.top=this.dropmenuobj.y-this.clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+1+"px"
			this.previousmenuitem=obj 
			this.positionshim()
		}
	},

	contains_firefox:function(a, b) {
		while (b.parentNode)
		if ((b = b.parentNode) == a)
			return true;
		return false;
	},

	dynamichide:function(e, obj2){ 
		var evtobj=window.event? window.event : e
		if (this.ie&&!this.dropmenuobj.contains(evtobj.toElement))
			this.delayhidemenu(obj2)
		else if (this.firefox&&e.currentTarget!= evtobj.relatedTarget&& !this.contains_firefox(evtobj.currentTarget, evtobj.relatedTarget))
			this.delayhidemenu(obj2)
	},

	delayhidemenu:function(obj2){
		this.delayhide=setTimeout(function(){tabdropdown.dropmenuobj.style.visibility='hidden'; if (obj2.parentNode.className.indexOf('default')==-1) obj2.parentNode.className=''},this.disappeardelay) 
	},

	clearhidemenu:function(){
		if (this.delayhide!="undefined")
			clearTimeout(this.delayhide)
	},

	positionshim:function(){ 
		if (this.enableiframeshim && typeof this.shimobject!="undefined"){
			if (this.dropmenuobj.style.visibility=="visible"){
				this.shimobject.style.width=this.dropmenuobj.offsetWidth+"px"
				this.shimobject.style.height=this.dropmenuobj.offsetHeight+"px"
				this.shimobject.style.left=this.dropmenuobj.style.left
				this.shimobject.style.top=this.dropmenuobj.style.top
			}
		this.shimobject.style.display=(this.dropmenuobj.style.visibility=="visible")? "block" : "none"
		}
	},

	hideshim:function(){
		if (this.enableiframeshim && typeof this.shimobject!="undefined")
			this.shimobject.style.display='none'
	},

isSelected:function(menuurl){
	var menuurl=menuurl.replace("http://"+menuurl.hostname, "").replace(/^\//, "")
	return (tabdropdown.currentpageurl==menuurl)
},

	init:function(menuid, dselected){
		this.standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body //create reference to common "body" across doctypes
		var menuitems=document.getElementById(menuid).getElementsByTagName("a")
		for (var i=0; i<menuitems.length; i++){
			if (menuitems[i].getAttribute("rel")){
				var relvalue=menuitems[i].getAttribute("rel")
				document.getElementById(relvalue).firstlink=document.getElementById(relvalue).getElementsByTagName("a")[0]
				menuitems[i].onmouseover=function(e){
					var event=typeof e!="undefined"? e : window.event
					tabdropdown.dropit(this, event, this.getAttribute("rel"))
				}
			}
			if (dselected=="auto" && typeof setalready=="undefined" && this.isSelected(menuitems[i].href)){
				menuitems[i].parentNode.className+=" selected default"
				var setalready=true
			}
			else if (parseInt(dselected)==i)
				menuitems[i].parentNode.className+=" selected default"
		}
	}

}