




/*
     FILE ARCHIVED ON 10:59:59 Jun 6, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 6:18:52 Feb 10, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
FUNCTIONS FOR VALIDATING A FORM ACCORDING TO SPECIFIED CONTENT PATTERNS
*** v5.5
*** (c) Futurniture

-------------------------------------------------------------------------------------------------------------------------
function for constructing VALIDATION FIELDS:
  obj = createValidationField(String formname, String elementname, String elementtype, String description, Boolean isRequired)

String elementtype can be any of the following:
  "numeric", requires numeric content (whitespace between numeric blocks is ok, ie nnnn nnnn nn)
  "alphanumeric", any content is ok
  "strictalphanumeric", any content except " or ' or whitespace is ok
  "email", content must be of e-mail format.
  "phonenr", content must be of format nnnn-nnnnnn, or nnnnnnn.
  "zip", requires content format nnnnn or nnn nn.
  "radio", refers to a radio button group, if required at least one radiobutton must be checked.
  "checkbox", is not tested, can be used for conditions

createValidationField returns an object. You may set maxLength and minLength on this object:
  obj.minLength / obj.maxLength
If either or both is set, these conditions will automatically be validated.

You may also set maxValue and/or minValue on this object. It will only apply on numeric fields:
  obj.minValue / obj.maxValue
If either or both is set, these conditions will automatically be validated.
-------------------------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------------------------
function for constructing CONDITIONS:
  createCondition(String conditiontype, String errormessage, validationFieldObject a, validationFieldObject b, ...validationFieldObject n)

String conditiontype can be any of the following:
  "equals", requires the values of entered fields to be identical
  "or", requires a value of either of the entered fields
-------------------------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------------------------
As either constructor function is called, a corresponding object will be pushed to the validationFields- or the
conditions Array of the corresponding formobject.

Set all forms using this validation functions to catch the submit event:
  <form onsubmit="return validate(String formname)">
-------------------------------------------------------------------------------------------------------------------------
*/

var formObjects = new Array();
var errors = new Array();
// formObject
function formObject(formname) {
    this.validationObjects = new Array();
    this.obj = document.forms[formname];
}
formObject.prototype.addValidationObject = formObject_addValidationObject;
function formObject_addValidationObject(valObj) {
    this.validationObjects[this.validationObjects.length] = valObj;
    return(valObj);
}

// the form validation functions (calls each belonging fieldobjects isValid/testCondition-function)
function validate(form) {
  errors.length = 0;
  var error = "";
  var formname = form.id;
  
  for(var i=0;i<formObjects[formname].validationObjects.length;i++) {
    error = formObjects[formname].validationObjects[i].isValid();
    if (error != "") {
        errors[errors.length] = error;
    }
  }
  if (errors.length == 0) {
      return(true);
  }
  else { // errors found
    displayErrors(form);
    if(window.event) window.event.returnValue = false;
    return(false);
  }
  return(false);
}

function displayErrors(form) {
    var errorContainer = document.getElementById(form.id + "_error");
    if (errorContainer != null) {
        errorHTML = "<ul>";
        for(i=0;i<errors.length; i++) {
            errorHTML += "<li>" + errors[i] + "</li>";
        }
        errorHTML += "</ul>";
        errorContainer.innerHTML = errorHTML;
    }
    else {
        errorString = "";
        for(i=0;i<errors.length; i++) {
            errorString += "- " + errors[i] + "\n";
        }
        alert(errorString);
    }
}

// constructor function for validation fields
function createValidationField(formname, elementname, elementtype, description, isRequired) {
    if (formObjects[formname] == null) formObjects[formname] = new formObject(formname);
    return(formObjects[formname].addValidationObject((eval("new "+elementtype+"Field((document.forms[formname].elements[elementname]),\""+ description+"\", isRequired)"))));
}

// constructor function for validation fields of a grp of checkboxes
function createValidationForCheckBoxGrp(formName, grpName, errMsg){
    var form =  document.getElementById(formName);
    var fieldCount = form.fieldCount.value;
    var validationObj = new Array();
    for(i=0;i<fieldCount;i++){
        validationObj.push(createValidationField(formName, grpName+i, "checkbox", "", false));
    }
    createConditionFromArray("or", errMsg, validationObj);
}

// constructor function for conditions
function createCondition() {
    var type = createCondition.arguments[0];
    var errormessage = createCondition.arguments[1];
    var args = new Array();
    for (i=0;i<createCondition.arguments.length-2;i++) {
        args[i] = createCondition.arguments[i+2];
    }
    return(formObjects[args[0].obj.form.id].addValidationObject(eval("new "+type+"Condition(errormessage, args)")));
}

// constructor function for conditions, args is an array
function createConditionFromArray(type, errormessage, args) {
    return(formObjects[args[0].obj.form.id].addValidationObject(eval("new "+type+"Condition(errormessage, args)")));
}


/* the fieldclass, all validationobjects of type field inherit this class   */
function fieldClass (elementobj, description, isRequired) {
  this.obj = elementobj;
  this.description = description;
  this.isRequired = isRequired;
  this.maxLength = null;
  this.minLength = null;
}
function obj_isEmpty() {
  if (this.obj.value.leftTrim().length == 0) {
    if (this.isRequired)
        return(parseDescriptionText(emptyErr1, this));
    else
      return("");
  }
  return(-1);
}
fieldClass.prototype.isEmpty = obj_isEmpty;

function obj_isOfCorrectLenght() {
  if (this.maxLength != null) {
    if (this.obj.value.length > this.maxLength)
        return(parseDescriptionText(isOfCorrectLengthErr1, this));
  }
  if (this.minLength != null) {
    if (this.obj.value.length < this.minLength)
        return(parseDescriptionText(isOfCorrectLengthErr2, this));
  }
  return(-1);
}
fieldClass.prototype.isOfCorrectLenght = obj_isOfCorrectLenght;

function obj_isOfCorrectValue() {
  if (this.maxValue != null) {
    if (this.obj.value > this.maxValue)
        return(parseDescriptionText(isOfCorrectValueErr1, this));
  }
  if (this.minValue != null) {
    if (this.obj.value < this.minValue)
        return(parseDescriptionText(isOfCorrectValueErr2, this));
  }
  return(-1);
}
fieldClass.prototype.isOfCorrectValue = obj_isOfCorrectValue;


/* --------------------------------------------------------- */

function parseDescriptionText(text, descObj) {
    text = text.replace(/\[description\]/g,descObj.description);
    text = text.replace(/\[value\]/g,descObj.obj.value);
    text = text.replace(/\[length\]/g,descObj.obj.value.length);
    if(descObj.minLength != null) text = text.replace(/\[minlength\]/g,descObj.minLength);
    if(descObj.maxLength != null) text = text.replace(/\[maxlength\]/g,descObj.maxLength);
    if(descObj.minValue != null) text = text.replace(/\[minvalue\]/g,descObj.minValue);
    if(descObj.maxValue != null) text = text.replace(/\[maxvalue\]/g,descObj.maxValue);
    return (text);
}

/* --------------------------------------------------------- */


function radioField(e, d, r) { this.base = fieldClass; this.base(e, d, r); }
radioField.prototype = new fieldClass;
radioField.prototype.isValid = radioField_isValid;
function radioField_isValid() {
  for (var btn = 0; btn < this.obj.length;btn++) {
    if (this.obj[btn].checked == true)
      return("");
  }
  return(parseDescriptionText(radioFieldErr1, this));
}

function emailField(e, d, r) { this.base = fieldClass; this.base(e, d, r); }
emailField.prototype = new fieldClass;
emailField.prototype.isValid = emailField_isValid;
function emailField_isValid() {
  if(this.isEmpty() != -1)
    return (this.isEmpty());
  if ((this.obj.value.rightTrim()).search(/(\w|\.|\-)+\@(\w|\.|\-)+\.[a-z]{2,6}$/))
     return(parseDescriptionText(emailFieldErr1, this));
  if(this.isOfCorrectLenght() != -1)
    return (this.isOfCorrectLenght());
  return("");
}

function zipField(e, d, r) { this.base = fieldClass; this.base(e, d, r); this.maxLength = 6; }
zipField.prototype = new fieldClass;
zipField.prototype.isValid = zipField_isValid;
function zipField_isValid() {
  if(this.isEmpty() != -1)
    return (this.isEmpty());
  if (this.obj.value.rightTrim().search(/(\d{3}\s\d{2})|(\d{5})/))
     return(parseDescriptionText(zipFieldErr1, this));
  if(this.isOfCorrectLenght() != -1)
    return (this.isOfCorrectLenght());
  return("");
}

function phonenrField(e, d, r) { this.base = fieldClass; this.base(e, d, r); }
phonenrField.prototype = new fieldClass;
phonenrField.prototype.isValid = phonenrField_isValid;
function phonenrField_isValid() {
  if(this.isEmpty() != -1)
    return (this.isEmpty());
  if(this.isOfCorrectLenght() != -1)
    return (this.isOfCorrectLenght());
  if ((!this.obj.value.rightTrim().match(/(^\d+\-\d+)/)) || (this.obj.value.leftTrim().length < 4))
     return(parseDescriptionText(phonenrFieldErr1, this));
  return("");
}

function numericField(e, d, r) { this.base = fieldClass;  this.base(e, d, r); }
numericField.prototype = new fieldClass;
numericField.prototype.isValid = numericField_isValid;
numericField.prototype.maxValue = null;
numericField.prototype.minValue = null;
function numericField_isValid() {
  if(this.isEmpty() != -1)
    return (this.isEmpty());
  if (isNaN(this.obj.value.trimAll()))
     return(parseDescriptionText(numericFieldErr1, this));
  if(this.isOfCorrectValue() != -1)
    return (this.isOfCorrectValue());
  if(this.isOfCorrectLenght() != -1)
    return (this.isOfCorrectLenght());
  return("");
}

function alphanumericField(e, d, r) { this.base = fieldClass; this.base(e, d, r); }
alphanumericField.prototype = new fieldClass;
alphanumericField.prototype.isValid = alphanumericField_isValid;
function alphanumericField_isValid() {
  if(this.isEmpty() != -1)
    return (this.isEmpty());
  if(this.isOfCorrectLenght() != -1)
    return (this.isOfCorrectLenght());
  return("");
}

function strictalphanumericField(e, d, r) { this.base = fieldClass; this.base(e, d, r); }
strictalphanumericField.prototype = new fieldClass;
strictalphanumericField.prototype.isValid = strictalphanumericField_isValid;
function strictalphanumericField_isValid() {
  if(this.isEmpty() != -1)
    return (this.isEmpty());
  if (this.obj.value.match(/\"|\'/gi))
     return(parseDescriptionText(strictalphanumericFieldErr1, this));
  if (this.obj.value.match(/\s/gi))
     return(parseDescriptionText(strictalphanumericFieldErr2, this));
  if(this.isOfCorrectLenght() != -1)
    return (this.isOfCorrectLenght());
  return("");
}

function checkboxField(e, d, r) { this.base = fieldClass; this.base(e, d, r); }
checkboxField.prototype = new fieldClass;
checkboxField.prototype.isValid = new Function("return('')");


// conditions ----------------------------------------------------------------------------------

function orCondition(errormessage, args) { this.elems = args; this.errormessage = errormessage; }
orCondition.prototype.isValid = or_testCondition;
function or_testCondition() {
  var hasEnteredValue = false;
  for (i=0;i<this.elems.length;i++) {
    if (this.elems[i].obj.type == "checkbox") {
        if (this.elems[i].obj.checked == true)
            hasEnteredValue = true;
    }
    else if (this.elems[i].obj.value.leftTrim() != "") {
        hasEnteredValue = true;
    }
  }
  if (!hasEnteredValue)
      return(this.errormessage)
  return("");
}

// equals
function equalsCondition(errormessage, args) { this.elems = args; this.errormessage = errormessage; }
equalsCondition.prototype.isValid = equals_testCondition;
function equals_testCondition() {
  var isEqual = true;
  var bufferedElem = this.elems[0];
  for (i=1;i<this.elems.length;i++) {
    if (this.elems[i].obj.value.leftTrim() != bufferedElem.obj.value.leftTrim()) {
        isEqual = false;
    }
    bufferedElem = this.elems[i];
  }
  if (!isEqual)
      return(this.errormessage)
  return("");
}



/************ stringfunktioner */

// append leftTrim to String object
function String_leftTrim() {
  var i = 0;
  while(i < this.length && this.charAt(i) == ' ') {
    i++;
  }
  return this.substr(i);
}
String.prototype.leftTrim = String_leftTrim;

// append rightTrim to String object
function String_rightTrim() {
  var i = this.length-1;
  while(i > 0 && this.charAt(i) == ' ') {
    i--;
  }
  return this.substr(0, i+1);
}
String.prototype.rightTrim = String_rightTrim;

// append trimAll to String object (trims all whitespace in string)
function String_trimAll() {
  var i = 0;
  var temp = "";
  while(i < this.length) {
    if (this.charAt(i) != ' ')
        temp += this.charAt(i);
    i++;
  }
  return temp;
}
String.prototype.trimAll = String_trimAll;
