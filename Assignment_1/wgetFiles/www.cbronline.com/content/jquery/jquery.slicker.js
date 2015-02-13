$(document).ready(function(){
	
	//$(".toggle_container").hide();

	$(".trigger").toggle(function(){
		$(this).addClass("active"); 
		}, function () {
		$(this).removeClass("active");
	});
	
	$(".trigger").click(function(){
		$(this).next(".toggle_container").slideToggle("normal,");
});




$('#EmailFriend').click(function() {

    var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (($('.SenderName').val() == '')) {
        $('#EmailReqired').show(1000);
        if (($('.SenderMailId').val().search(re) > -1) && ($('.ToEmailList').val().search(re) > -1)) {
            $('#EmailErrordevEmail').hide(2000);
        }
        return false
    }
    else {
        $('#EmailReqired').hide(1000);

        if (($('.SenderMailId').val().search(re) > -1) && ($('.ToEmailList').val().search(re) > -1)) {
            $('#EmailErrordevEmail').hide(2000);
            $('#maincontaner').hide(100);
            $('#ConfimMail').show(2000);

            return true;
        }
        else {
            $('#EmailErrordevEmail').show(1000);
            return false;
        }
    }


});

$("#emailAFriend").hide();
$("#create").click(function() {

    $("#emailAFriend").slideToggle(2000);

    $("#maincontaner").show(2000);


    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    $('#mask').css({ 'width': maskWidth, 'height': maskHeight, backgroundColor: "black" });

    $('#mask').fadeIn(1000);
    $('#mask').fadeTo("slow", 0.8);


});

$("#cls").click(function() {
    $('#mask').hide();
    $('#EmailErrordevEmail').hide(2000);
    $("#emailAFriend").hide('slow');
    $('#maincontaner').hide("slow");

});


// initial validation for dropdownlist
if ($("#FormViewModel_JobFunction option:selected").text() == "Other Please specify" || $("#FormViewModel_JobFunction option:selected").text() == "") {
    $('#FormViewModel_OtherJobFunction').attr('readonly', false);
    $('#FormViewModel_OtherJobFunction').css('background-color', '#ffffff');

}
else {
    $('#FormViewModel_OtherJobFunction').attr('readonly', true);
    $('#FormViewModel_OtherJobFunction').css('background-color', '#cccccc')
}
// validation for company activity
if ($("#FormViewModel_CompanyActivity option:selected").text() == "Others" || $("#FormViewModel_CompanyActivity option:selected").text() == "" || $("#FormViewModel_CompanyActivity option:selected").text() == "Other (please specify)") {
    $('#FormViewModel_OtherCompanyActivity').attr('readonly', false);
    $('#FormViewModel_OtherCompanyActivity').css('background-color', '#ffffff');

}
else {
    $('#FormViewModel_OtherCompanyActivity').attr('readonly', true);
    $('#FormViewModel_OtherCompanyActivity').css('background-color', '#cccccc')
}
//********Initial validation for registration page
// initial validation for dropdownlist
if ($("#registerDetails_JobFunction option:selected").text() == "Other Please specify" || $("#registerDetails_JobFunction option:selected").text() == "") {
    $('#registerDetails_OtherJobFunction').attr('readonly', false);
    $('#registerDetails_OtherJobFunction').css('background-color', '#ffffff');

}
else {
    $('#registerDetails_OtherJobFunction').attr('readonly', true);
    $('#registerDetails_OtherJobFunction').css('background-color', '#cccccc')
}
// validation for company activity
if ($("#registerDetails_CompanyActivity option:selected").text() == "Others" || $("#registerDetails_CompanyActivity option:selected").text() == "" || $("#registerDetails_CompanyActivity option:selected").text() == "Other (please specify)") {
    $('#registerDetails_OtherCompanyActivity').attr('readonly', false);
    $('#registerDetails_OtherCompanyActivity').css('background-color', '#ffffff');

}
else {
    $('#registerDetails_OtherCompanyActivity').attr('readonly', true);
    $('#registerDetails_OtherCompanyActivity').css('background-color', '#cccccc')
}


// ***********validation for dropdownlist in account page
if ($("#myAccountDetails_JobFunction option:selected").text() == "Other Please specify" || $("#myAccountDetails_JobFunction option:selected").text() == "") {
    $('#myAccountDetails_OtherJobFunction').attr('readonly', false);
    $('#myAccountDetails_OtherJobFunction').css('background-color', '#ffffff');

}
else {
    $('#myAccountDetails_OtherJobFunction').attr('readonly', true);
    $('#myAccountDetails_OtherJobFunction').css('background-color', '#cccccc')
}
// validation for company activity
if ($("#myAccountDetails_CompanyActivity option:selected").text() == "Others" || $("#myAccountDetails_CompanyActivity option:selected").text() == "" || $("#myAccountDetails_CompanyActivity option:selected").text() == "Other (please specify)") {
    $('#myAccountDetails_OtherCompanyActivity').attr('readonly', false);
    $('#myAccountDetails_OtherCompanyActivity').css('background-color', '#ffffff');

}
else {
    $('#myAccountDetails_OtherCompanyActivity').attr('readonly', true);
    $('#myAccountDetails_OtherCompanyActivity').css('background-color', '#cccccc')
}















});