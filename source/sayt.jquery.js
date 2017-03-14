/*
 *******************************************************************************
 *
 * sayt - Save As You Type
 *
 *******************************************************************************
 *
 * This plugin autosaves form input as it is being entered by the
 * user. It is saved to a cookie during each keyup and change.
 *
 * When a page is reloaded for any reason, the form data is automatically
 * re-entered for the user by reading the cookie. The cookie can be deleted
 * on the fly by the plugin if required.
 *
 *******************************************************************************
 *
 * Intructions:
 * By: Ben Griffiths, ben@ben-griffiths.com
 * Version: 1.4.3
 *
 * Dependencies:
 *
 * jquery-cookie 1.0.0 (Relies on the jQuery Cookie plugin https://github.com/carhartl/jquery-cookie)
 * - Included.
 *
 *******************************************************************************
 *
 * Licensed under The MIT License (MIT)
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2011 Ben Griffiths (mail@thecodefoundryltd.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 *******************************************************************************
 */
(function($)
{
    $.fn.sayt = function(options)
    {

        /*
         * Get/Set the settings
         */
        var settings = $.extend(
        {
            'prefix'         : 'autosaveFormCookie-',
            'erase'          : false,
            'days'           : 3,
            'autosave'       : true,
            'savenow'        : false,
            'recover'        : false,
            'autorecover'    : true,
            'checksaveexists': false,
            'exclude'        : [],
            'id'             : this.attr('id'), 
        }, options);

        /*
         * Define the form
         */
        var theform = this;

        /*
         * Define the cookie name
         */
        var cookie_id = settings.prefix + settings.id;

        /*
         * Erase a cookie
         */
        if(settings['erase'] == true)
        {
            $.cookie( cookie_id, null);
            if (typeof(Storage) !== "undefined") {
                localStorage.removeItem(cookie_id);
            }
//            else {
//                $.cookie(cookie_id, null);
//            }

            return true;
        }


        /*
         * Get the forms save cookie (if it has one of course)
         */
        var autoSavedCookie;
        if (typeof(Storage) !== "undefined") {
            autoSavedCookie = localStorage.getItem(cookie_id);
        }
        else {
            autoSavedCookie = $.cookie(cookie_id);
        }



        /*
         * Check to see if a save exists
         */
        if(settings['checksaveexists'] == true)
        {
            if(autoSavedCookie)
            {
                return true;
            }
            else
            {
                return false;
            }

            return false;
        }


        /*
         * Perform a manual save
         */
        if(settings['savenow'] == true)
        {
            var form_data = getFormData(theform, settings['exclude']);
            autoSaveCookie(form_data);

            return true;
        }


        /*
         * Recover the form info from the cookie (if it has one)
         */
        if(settings['autorecover'] == true || settings['recover'] == true)
        {
            if(autoSavedCookie)
            {
                var newCookieString = autoSavedCookie.split(':::--FORMSPLITTERFORVARS--:::');

                var field_names_array = {};

                $.each(newCookieString, function(i, field)
                {
                    var fields_arr = field.split(':::--FIELDANDVARSPLITTER--:::');

                    if($.trim(fields_arr[0]) != '')
                    {
                        if($.trim(fields_arr[0]) in field_names_array)
                        {
                            field_names_array[$.trim(fields_arr[0])] = (field_names_array[$.trim(fields_arr[0])] + ':::--MULTISELECTSPLITTER--:::' + fields_arr[1]);
                        }
                        else
                        {
                            field_names_array[$.trim(fields_arr[0])] = fields_arr[1];
                        }
                    }
                });

                $.each(field_names_array, function(key, value)
                {
                    if(strpos(value, ':::--MULTISELECTSPLITTER--:::') > 0)
                    {
                        var tmp_array = value.split(':::--MULTISELECTSPLITTER--:::');

                        $.each(tmp_array, function(tmp_key, tmp_value)
                        {
                            // added $(theform) to selectors
                            $('input[name="' + key + '"], select[name="' + key + '"], textarea[name="' + key + '"]', $(theform) ).find('[value="' + tmp_value + '"]').prop('selected', true);
                            $('input[name="' + key + '"][value="' + tmp_value + '"], select[name="' + key + '"][value="' + tmp_value + '"], textarea[name="' + key + '"][value="' + tmp_value + '"]', $(theform) ).prop('checked', true);
                        });
                    }
                    else
                    {
                        $('input[name="' + key + '"], select[name="' + key + '"], textarea[name="' + key + '"]', $(theform) ).val([value]);
                    }
                });
            }

            /*
             * if manual recover action, return
             */
            if(settings['recover'] == true)
            {
                return true;
            }
        }


        /*
         * Autosave - on typing and changing
         */
        if(settings['autosave'] == true)
        {
            this.find('input, select, textarea').each(function(index)
            {
                $(this).change(function()
                {
                    var form_data = getFormData(theform, settings['exclude']);
                    autoSaveCookie(form_data);
                });

                $(this).keyup(function()
                {
                    var form_data = getFormData(theform, settings['exclude']);
                    autoSaveCookie(form_data);
                });
            });
        }


        /*
         * Save form data to a cookie
         */
        function autoSaveCookie(data)
        {
            var cookieString = '';

            jQuery.each(data, function(i, field)
            {
                cookieString = cookieString + field.name + ':::--FIELDANDVARSPLITTER--:::' + field.value + ':::--FORMSPLITTERFORVARS--:::';
            });

//            $.cookie(cookie_id, cookieString, { expires: settings['days'] });
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem(cookie_id, cookieString);
            }
            else {
                $.cookie(cookie_id, cookieString, { expires: settings['days'] });
            }

        }

        /*
         * strpos - equiv to PHP's strpos
         */
        function strpos(haystack, needle, offset)
        {
            var i = (haystack+'').indexOf(needle, (offset || 0));
            return i === -1 ? false : i;
        }

        /*
         * Serialize the form data, omit excluded fields marked with data-sayt-exclude attribute.
         */
        function getFormData(theform, excludeSelectors)
        {
            //
            // This is here because jQuery's clone method is basically borked.
            //
            // Once they fix that, we'll put it back.
            //
            var workingObject = $.extend({}, theform);

            var elementsToRemove = workingObject.find('[data-sayt-exclude]');
            elementsToRemove.remove();
            for (i in excludeSelectors) {
                elementsToRemove = workingObject.find(excludeSelectors[i]);
                elementsToRemove.remove();
            }

            var form_data = workingObject.serializeArray();
            return form_data;
        }
    };
})(jQuery);
