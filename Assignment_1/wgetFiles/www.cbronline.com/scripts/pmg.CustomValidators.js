function addCusomControlDetails() {
        var ctrl = $('#FormViewModel_CustomControlDetails');
        var finalDetails = '';        
if (ctrl != null && ctrl != undefined) {
    var arrCtrls = ctrl.val().split("|");
    for (i = 0; i < arrCtrls.length; i++) {
        var ctrDetails = arrCtrls[i].split(",");
        if (finalDetails != '')
            finalDetails += "| ";
        var txtCtrl = $('#txt' + ctrDetails[1].replace(/ /gi, '').replace(/&/gi, ''));
        var chkCtrl = $('#chk' + ctrDetails[1].replace(/ /gi, '').replace(/&/gi, ''));
        var radCtrl = $('#rad' + ctrDetails[1].replace(/ /gi, '').replace(/&/gi, ''));
        var radc = 'rad' + ctrDetails[1].replace(/ /gi, '').replace(/&/gi, '');
        //Store the value
        if (txtCtrl != null && txtCtrl.val() != undefined)
            finalDetails += txtCtrl.val() + "," + ctrDetails[1];
        else if (chkCtrl != null && chkCtrl.val() != undefined)
            finalDetails += chkCtrl.val() + "," + ctrDetails[1];
        else if (radCtrl != null && radCtrl.val() != undefined) {
        var selected = $("input[type='radio'][name="+radc+"]:checked");          
          finalDetails += selected.val() + "," + ctrDetails[1];
        }
 } 
        $("#FormViewModel_CustomControlDetails").attr("value", escape(finalDetails));
    }
    return true;
 }


 function openLocMap() {
     var longitute = $('#Evlongitute').val();
     var latitude = $('#Evlatitude').val();
     
////     var latitude = "0.000000";
////     var longitute = "51.000000";
////     alert(longitute);
////     alert(latitude);
     ShowDialog(true, longitute, latitude);
 }

//// $(document).ready(function() {
////     alert(1);
////     $('#my_map').gmap3({
////         map: {
////             options: {
////                 center: [-33, 151],
////                 zoom: 8
////             }
////         },
////         marker: {
////             latLng: [-33, 151],
////             callback: function() {
////                 $(this).css('border', '1px solid #000000');
////             }
////         }
////     });
 //// });latitude, longitute


 function ShowDialog(modal, longitute, latitude) {     
     $("#overlay").show();
     $("#dialog").fadeIn(300);
//     latitude = 151;
//     longitute = -33;    
     if (modal) {             
             $("#divmap").show(1000);
             $("#overlay").unbind("click");
             $('#my_map').gmap3({
                 map: {
                     options: {
                     center: [latitude, longitute],
                         zoom: 8
                     }
                 },
                 marker: {
                 latLng: [latitude, longitute],
                     callback: function() {
                         $(this).css('border', '1px solid #000000');
                     }
                 }
             });
     }
     else {
         $("#overlay").click(function(e) {
             HideDialog();
         });
     }
 }

 function HideDialog() {    
     $("#overlay").hide();     
     $("#overlay").hide();
     $("#dialog").fadeOut(300);
 }


function Equal(value, element, params) {
    var firstPropertyControl;
    var secondPropertyControl;    
    if ($(location).attr("href").search("loginandregister") != -1 && params.ControlIdPrefix != "registerDetails_RegisterModel")
     {
        params.ControlIdPrefix = params.ControlIdPrefix + "_RegisterModel";
    }    
    firstPropertyControl = document.getElementById(params.ControlIdPrefix + "_" + params.FirstPropertyName);
    secondPropertyControl = document.getElementById(params.ControlIdPrefix + "_" + params.SecondPropertyName);

    return firstPropertyControl.value == secondPropertyControl.value;
}

function EitherRequired(value, element, params) {
    try {        
        var firstPropertyControl;
        var secondPropertyControl;        
        if ($(location).attr("href").search("loginandregister") != -1 && params.ControlIdPrefix != "registerDetails_RegisterModel") {
        params.ControlIdPrefix = params.ControlIdPrefix + "_RegisterModel";  
        
        }
        firstPropertyControl = document.getElementById(params.ControlIdPrefix + "_" + params.FirstPropertyName);
        secondPropertyControl = document.getElementById(params.ControlIdPrefix + "_" + params.SecondPropertyName);        
        var firstValue = firstPropertyControl.value;
        var secondValue = secondPropertyControl.value;
        if (firstValue == params.FirstPropertyValue)
        {
            return (secondValue == "") ? false : true;
        }
        
        return (firstValue == "" && secondValue == "")? false:true;
    }
    catch (err) {
        alert("JavaScript error on form validation: " + err.description + " " + value + " " + element);
    }
}

function NotNullIf(value, element, params) {
    try {
  
        var firstPropertyControl;
        var secondPropertyControl;
        if ($(location).attr("href").search("loginandregister") != -1 && params.ControlIdPrefix != "registerDetails_RegisterModel") {
            params.ControlIdPrefix = params.ControlIdPrefix + "_RegisterModel";
        }
        firstPropertyControl = document.getElementById(params.ControlIdPrefix + "_" + params.FirstPropertyName);
        secondPropertyControl = document.getElementById(params.ControlIdPrefix + "_" + params.SecondPropertyName);

        var firstValue = firstPropertyControl.value;
        var secondValue = secondPropertyControl.value;

        if (firstValue != "" || firstValue != null) {

            if (secondValue == "" || secondValue == null) {
                return false;
            }
            else {
                return true;
             }
         }
         return true;
    }
    catch (err) {
        alert("JavaScript error on form validation: " + err.description + " " + value + " " + element);
    }
}


function checkSelectedCount() {
    if ($('input[type=checkbox][name*=editForm.RelatedCompanies]:checked').length == 0) {
        alert("Please select at least one related company to save");
        return false;   
    }
    else {
        return true;
    }
}

function ZipValidator(value, element, params) {
    try {
        var firstPropertyControl;
        firstPropertyControl = document.getElementById(params.ControlToValidateId);
        var regex = /^[a-zA-Z0-9- ]{0,10}$/;

        return regex.test(firstPropertyControl.value);
    }
    catch (err) {
        alert("JavaScript error on form validation: " + err.description + " " + value + " " + element);
    }
}


	
		