




/*
     FILE ARCHIVED ON 11:22:57 Jun 6, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 6:18:52 Feb 10, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
Tillgängliga taggar är:
[description] som evaluerar till den beskrivning som getts till gällande fält.
[value] som evaluerar till det värde som matats in i gällande fält vid valideringstillfället.
[length] som evaluerar till antalet tecken i det värde som matats in i gällande fält vid valideringstillfället.
[minlength] som evaluerar till den maxlängd som getts till gällande fält.
[maxlength] som evaluerar till den minlängd som getts till gällande fält.
[minvalue] som evaluerar till den maxvärde som getts till gällande fält. Fungerar endast på numeriska fält.
[maxvalue] som evaluerar till den minvärde som getts till gällande fält. Fungerar endast på numeriska fält.
*/

// generella felmeddelanden
var emptyErr1 = "Du har glömt att fylla i [description]."; // om användarten glömt fylla i ett obligatoriskt fält
var isOfCorrectLengthErr1 = "[description] får som mest vara [maxlength] tecken långt. Du har skrivit [length] tecken."; // om användaren anger för många tecken i ett fält
var isOfCorrectLengthErr2 = "[description] skall inte vara kortare än [minlength] tecken långt. Du har skrivit [length] tecken."; // om användaren anger för få tecken i ett fält
var isOfCorrectValueErr1 = "Du får som mest beställa [maxvalue] exemplar av den här publikationen. Du har angivit [value]."; // om användaren anger för många tecken i ett fält
var isOfCorrectValueErr2 = "[description] får inte vara mindre än [minvalue]."; // om användaren anger för få tecken i ett fält

// fälttyps-specifika felmeddelanden
var radioFieldErr1 = "Du har glömt att välja [description]."; // om användaren glömt välja en radioknapp ur en radioknapp-grupp
var emailFieldErr1 = "[value] är inte en giltig e-postadress."; // om användaren angett en felaktig e-postadress
var zipFieldErr1 = "[value] är inte ett giltigt postnummer."; // om användaren angett ett felaktigt svenskt postnummer
var phonenrFieldErr1 = "Du har inte fyllt i [description] korrekt. (OBS! Tänk på att skriva bindestreck efter riktnumret.)"; // om användaren inte anget telefonnummer korrekt
var numericFieldErr1 = "[description] innehåller tecken som inte är siffror."; // om användaren angett felaktiga tecken i ett nummer-fält
var strictalphanumericFieldErr1 = "[description] får inte innehålla citationstecken."; // om användaren skrivit in citationstecken i ett alias-fält
var strictalphanumericFieldErr2 = "[description] får inte innehålla blanksteg."; // om användaren skrivit in blanksteg i ett alias-fält
