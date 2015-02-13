$(function()
{
	var Info = new infobar();
	Info.check();
});

function infobar()
{
	var _parent = this;
	
	this.check = function()
	{
		if ($.cookie("vergetenkind.info") != 'false')
		{
			_parent.show();
		}
	},
	
	this.show = function()
	{
		$("#infobar").show();
		$("#infobar .close").click(function()
		{
			$.cookie("vergetenkind.info", 'false', { expires: 365, path: '/' });
			$("#infobar").hide();
		});
	}
	
}