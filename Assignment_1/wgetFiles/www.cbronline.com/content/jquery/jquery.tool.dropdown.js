
/** Clears the content of a textbox or textarea.  *****************************************/
$(document).ready(function() {

});
function DropdownValidation(controlId, controlID2) {
    var temp = document.getElementsByName(controlID2);
    var selectedValue = controlId.options[controlId.selectedIndex].text;
    try {
        if (selectedValue == "Other Please specify" || selectedValue == "Other" || selectedValue == "Other (please specify)" || selectedValue == "") {
           
           
            temp[0].removeAttribute('readOnly');

            //temp[0].setAttribute('readonly', false);
            temp[0].focus();
            temp[0].style.backgroundColor = '#ffffff';
      }
      else {
          
          temp[0].setAttribute('readonly', true);
          temp[0].style.backgroundColor = '#cccccc';
          temp[0].value = "";
      }
 } 
    catch (err) {
        alert("JS error in Selecting the Dropdown: " + err.message);
    }
    
    
}