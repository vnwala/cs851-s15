/**
 * Converts a hyphen-separated string into camel-case.
 *
 * @owner this string.
 * @return string is the converted string. Ex. 'borderColor'
 * @example	'border-color'.camelCase() RETURNS 'borderColor'
 */
String.prototype.camelCase = function()
{
	return this.replace( /\-(.)/g, function (m, l) { return l.toUpperCase(); } );
}

/**
 * Capitalize the first character of a string.
 *
 * @owner this string.
 * @return string is the capitalized string.
 * @example	'border'.capitalize() RETURNS 'Border'
 */
String.prototype.capitalize = function()
{
	return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * Check for specific CSS property support in the DOM, trying all vendor prefixes.
 *
 * @owner this string.
 * @return string is a flag for supported {true} or not supported {false}
 * @example	'border-color'.supported() RETURNS true
 */
String.prototype.supported = function()
{
	var property = this,
		supported = false,
		domPrefixes = [ 'Webkit','Moz','O','ms','Khtml' ];

	// Convert to camel-case from hyphen separated
	if (this.match(/-/))
	{
		property = property.camelCase();
	}
	// Try the vanilla property
	if ( document.body.style[property] != undefined )
	{
		supported = true;
	}
	// If that didn't work...
	if ( supported === false )
	{
		// Loop over the vendor prefixes, checking for them
		for ( var i = 0; i < domPrefixes.length; i++ )
		{
			if ( document.body.style[ domPrefixes[i] + property.capitalize() ] !== undefined )
			{
				supported = true;
				break;
			}
		}
	}
	// return the results
	return supported;
}