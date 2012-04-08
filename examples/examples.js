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
	
});