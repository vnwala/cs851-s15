function filledCheck() {
	var $this = $(this), val = $this.val(), oldval = ($this.data('oldval') || '');
	if (val == '' && oldval != '') {
		$this.removeClass('filled');
	} else if (val != '' && oldval == '') {
		$this.addClass('filled');
	}
	$this.data('oldval', val);
	if ($this.attr('error') !== undefined) {
		if ($this.val() != $this.data('errorval')) {
			$this.removeAttr('error').off('.errorCheck').parent().find('.note.error').remove();
		}
	}
}
$(function() {
	$('input, textarea', $('.field'))
		.each(filledCheck)
		.on({
			'keyup change': filledCheck,
			'focus': function() {
				var $this = $(this);
				$this.data('errorval', $this.val());
			}
		}).filter('[error]').eq(0).focus();
});