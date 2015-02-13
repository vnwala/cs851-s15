jQuery(function() {
	jQuery("#cuenta_envio").click(function(){
		jQuery('#hitter_email').remove();
		jQuery('body').append(
			'<iframe id="hitter_email" src="'+jQuery(this).attr('rel')+'" style="width:0;height:0;visibility:hidden;"></iframe>'
		);
	});
});