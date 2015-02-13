




/*
     FILE ARCHIVED ON 11:22:57 Jun 6, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 6:18:52 Feb 10, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
Tillg�ngliga taggar �r:
[description] som evaluerar till den beskrivning som getts till g�llande f�lt.
[value] som evaluerar till det v�rde som matats in i g�llande f�lt vid valideringstillf�llet.
[length] som evaluerar till antalet tecken i det v�rde som matats in i g�llande f�lt vid valideringstillf�llet.
[minlength] som evaluerar till den maxl�ngd som getts till g�llande f�lt.
[maxlength] som evaluerar till den minl�ngd som getts till g�llande f�lt.
[minvalue] som evaluerar till den maxv�rde som getts till g�llande f�lt. Fungerar endast p� numeriska f�lt.
[maxvalue] som evaluerar till den minv�rde som getts till g�llande f�lt. Fungerar endast p� numeriska f�lt.
*/

// generella felmeddelanden
var emptyErr1 = "Du har gl�mt att fylla i [description]."; // om anv�ndarten gl�mt fylla i ett obligatoriskt f�lt
var isOfCorrectLengthErr1 = "[description] f�r som mest vara [maxlength] tecken l�ngt. Du har skrivit [length] tecken."; // om anv�ndaren anger f�r m�nga tecken i ett f�lt
var isOfCorrectLengthErr2 = "[description] skall inte vara kortare �n [minlength] tecken l�ngt. Du har skrivit [length] tecken."; // om anv�ndaren anger f�r f� tecken i ett f�lt
var isOfCorrectValueErr1 = "Du f�r som mest best�lla [maxvalue] exemplar av den h�r publikationen. Du har angivit [value]."; // om anv�ndaren anger f�r m�nga tecken i ett f�lt
var isOfCorrectValueErr2 = "[description] f�r inte vara mindre �n [minvalue]."; // om anv�ndaren anger f�r f� tecken i ett f�lt

// f�lttyps-specifika felmeddelanden
var radioFieldErr1 = "Du har gl�mt att v�lja [description]."; // om anv�ndaren gl�mt v�lja en radioknapp ur en radioknapp-grupp
var emailFieldErr1 = "[value] �r inte en giltig e-postadress."; // om anv�ndaren angett en felaktig e-postadress
var zipFieldErr1 = "[value] �r inte ett giltigt postnummer."; // om anv�ndaren angett ett felaktigt svenskt postnummer
var phonenrFieldErr1 = "Du har inte fyllt i [description] korrekt. (OBS! T�nk p� att skriva bindestreck efter riktnumret.)"; // om anv�ndaren inte anget telefonnummer korrekt
var numericFieldErr1 = "[description] inneh�ller tecken som inte �r siffror."; // om anv�ndaren angett felaktiga tecken i ett nummer-f�lt
var strictalphanumericFieldErr1 = "[description] f�r inte inneh�lla citationstecken."; // om anv�ndaren skrivit in citationstecken i ett alias-f�lt
var strictalphanumericFieldErr2 = "[description] f�r inte inneh�lla blanksteg."; // om anv�ndaren skrivit in blanksteg i ett alias-f�lt
