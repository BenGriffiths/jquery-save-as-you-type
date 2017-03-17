# Save As You Type

* ##### Update v.1.4.5 #####
Added "id" to settings so you can allow several forms to share a common form save.

* ##### Update v.1.4.4 #####
Various bug fixes have been implemented. Also, thanks to @npostman you can now specify a prefix to the cookie name to help you have greater control over your code.

* ##### Update v.1.4.0 #####
Thanks to @BluntSporks this plugin will now utilize Local Storage if its available instead of a cookie, enabling the saved data stored to be of a much larger amount (~5mb). If local storage is not available it'll default back to a cookie.

* ##### Update v.1.3.0 ####
Thanks to @georgjaehnig you can now exclude certain fields from being included in the cookie. There are two ways to do this.

#### Features ####

This jQuery plugin autosaves (To either Local Storage or a cookie if it's not available) as you type, and autorecovers, form data. Auto saving will save as data is entered or changed.

You have the ability to disable autosaving and auto recovering, and instead use manual calls for each. You can also manually call an erase cookie feature, and manually call to see if a form actually has saved data.

Currently, the plugin works for the following form elements:

* Text boxes
* Text areas
* Select (Single AND multiple)
* Radio buttons
* Check boxes
* Hidden fields

Tested as working in:

* IE7
* IE8
* IE9
* Chrome
* Firefox
* Safari
* Opera

## Examples

Default's:

* prefix: 'autosaveFormCookie-'
* autosave: true
* savenow: false
* days: 3
* erase: false
* recover: false
* autorecover: true
* getformdata: false
* checksaveexists: false - (Returns true or false)
* exclude: []
* id: this.attr('id')      (defaults to form id)


```js
$(function()
{

	/**
	 * When building your forms, you MUST make sure your form has an ID, and that it's unique
	 * on the application.
	 *
	 * Ie, don't call all forms 'id="form"', even if they are on seperate pages.
	 */
	
	/*
	 * Attach to a form with default settings
	 */
	$('#form_id').sayt();
	
	
	/*
	 * Attach to a form with custom settings
	 *
	 * Autosave disabled (Must use manual save to save anything)
	 * Autorecover disabled (Must use a manual recover to recover anything)
	 * Days 7 (Keeps the save cookie for 7 days)
	 */
	$('#form_id').sayt({'autosave': false, 'autorecover': false, 'days': 7});
	
	/*
	 * Override form id so multiple forms can share one save.
	 * Useful for initialyzing fields in multiple forms or on different pages
	 * Or "wizard" style forms where an initial form's values are carried forward
	 * to the next form in the sequence.
	 * 
	 * Example:
	 * The first line will remember the fields typed in the first blank form of class "form_class".
	 * The second and third line will remember the state of a specific form.
	 *
	 * When the second blank form is opened it is first initialized with "form_class" 
	 * and then by its own specific id which being blank does nothing but take on the 
	 * initial values.
	 * From then on each form remembers it's own values because the second line always 
	 * overwrites the first line.
	 */
	 $('.form_class').sayt({ 'id': 'common' });  //class specific cookie id = prefix + 'common'
	 $('#form_id_1').sayt();                     //id specific cookie id = prefix + 'form_id_1'
	 $('#form_id_2').sayt();                     //id specific cookie id = prefix + 'form_id_2'
	 	
	/*
	 * Check to see if a form has a save
	 */
	if($('#form_id').sayt({'checksaveexists': true}) == true)
	{
		console.log('Form has an existing save cookie.');
	}
	
	
	/*
	 * Perform a manual save
	 */
	$('#forms_save_button').click(function()
	{
		$('#form_id').sayt({'savenow': true});
		
		console.log('Form data has been saved.');
		return false;
	});
	
	
	/*
	 * Perform a manual recover
	 */
	$('#forms_recover_button').click(function()
	{
		$('#form_id').sayt({'recover': true});
		
		console.log('Form data has been recovered.');
		return false;
	});
	
	
	/*
	 * To erase a forms cookie
	 */
	$('#forms_delete_save_button').click(function()
	{
		$('#form_id').sayt({'erase': true});
		
		console.log('Form cookie was deleted.');
		return false;
	});
	
	/*
	 * Get the form data
	 */
	var form_data = $('#form_id').sayt({ 'getformdata': true });
	console.log(form_data);
	
});
```

Cookies are saved with the name autosaveFormCookie-, and have the ID of the form on the end. For example, a form with the ID of "my_form", would result in a cookie named: autosaveFormCookie-my_form

This is useful is you'd like to delete a cookie via a different method (IE With your server side code after saving a forms input).


## Excluding Fields

Thanks to @georgjaehnig you can now exclude certain fields from being included in the cookie. There are two ways to do this.

### Adding an attribute on the form element

By adding the `data-sayt-exclude` attribute on the form element, the element's value will not be saved in the cookie. Example:
```
<input name="first" id="dontSaveMe" data-sayt-exclude>
<input name="second" id="saveMe">
```
The value of the first element will not be saved, the value of the second will be.

### Providing a list of CSS selectors on the function call

Alternatively, you may call the init function with the setting `exclude` containing a list of selectors that define elements to be excluded. This may be useful when having no access to the HTML source. For instance:
```
<input name="first" id="dontSaveMe">
<input name="second" class="dontSaveMeAsWell">
<input name="third" id="saveMe">
```
```
$('#form_id').sayt({'exclude': ['#dontSaveMe', '[name=second]']});
```
The value of the first and second element will not be saved, the value of the third will be.

## Dependencies

This plugin depends on the included jquery-cookie plugin. More information on that plugin can be found here: https://github.com/carhartl/jquery-cookie


## Author

[Ben Griffiths]


## License

Copyright (c) 2012 Ben Griffiths. Licensed under the MIT License. Redistributions of files must retain the above copyright notice.
