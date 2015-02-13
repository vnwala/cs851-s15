
/** Clears the content of a textbox or textarea.  *****************************************/
function ClearTheContent(controlId, initialValueOfTheControl) {
    try {
        $(document).ready(
  function() {
      var control = document.getElementById(controlId);
      if (initialValueOfTheControl == control.value) {
          control.value = "";
      }
  }
  );

    }
    catch (err) {
        alert("JS error in ClearTheContent: " + err.message);
    }
}