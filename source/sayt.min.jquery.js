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
 * Version: 1.1.1
 * Updated: April 8th, 2012
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
(function(a){a.fn.sayt=function(b){function i(b){var e="";jQuery.each(b,function(a,b){e=e+b.name+":::--FIELDANDVARSPLITTER--:::"+b.value+":::--FORMSPLITTERFORVARS--:::"});a.cookie("autosaveFormCookie-"+d.attr("id"),e,{expires:c["days"]})}function j(a,b,c){var d=(a+"").indexOf(b,c||0);return d===-1?false:d}var c=a.extend({erase:false,days:3,autosave:true,savenow:false,recover:false,autorecover:true,checksaveexists:false},b);var d=this;if(c["erase"]==true){a.cookie("autosaveFormCookie-"+d.attr("id"),null,{expires:c["days"]});return true}var e=a.cookie("autosaveFormCookie-"+d.attr("id"));if(c["checksaveexists"]==true){if(e){return true}else{return false}return false}if(c["savenow"]==true){var f=d.serializeArray();i(f);return true}if(c["autorecover"]==true||c["recover"]==true){if(e){var g=e.split(":::--FORMSPLITTERFORVARS--:::");var h={};a.each(g,function(b,c){var d=c.split(":::--FIELDANDVARSPLITTER--:::");if(a.trim(d[0])!=""){if(a.trim(d[0])in h){h[a.trim(d[0])]=h[a.trim(d[0])]+":::--MULTISELECTSPLITTER--:::"+d[1]}else{h[a.trim(d[0])]=d[1]}}});a.each(h,function(b,c){if(j(c,":::--MULTISELECTSPLITTER--:::")>0){var d=c.split(":::--MULTISELECTSPLITTER--:::");a.each(d,function(c,d){a('input[name="'+b+'"], select[name="'+b+'"], textarea[name="'+b+'"]').find('[value="'+d+'"]').prop("selected",true);a('input[name="'+b+'"][value="'+d+'"], select[name="'+b+'"][value="'+d+'"], textarea[name="'+b+'"][value="'+d+'"]').prop("checked",true)})}else{a('input[name="'+b+'"], select[name="'+b+'"], textarea[name="'+b+'"]').val([c])}})}if(c["recover"]==true){return true}}if(c["autosave"]==true){this.find("input, select, textarea").each(function(b){a(this).change(function(){var a=d.serializeArray();i(a)});a(this).keyup(function(){var a=d.serializeArray();i(a)})})}}})(jQuery)