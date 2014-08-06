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
(function(e){e.fn.sayt=function(t){function l(t){var r="";jQuery.each(t,function(e,t){r=r+t.name+":::--FIELDANDVARSPLITTER--:::"+t.value+":::--FORMSPLITTERFORVARS--:::"});e.cookie(s,r,{expires:n["days"]});if(typeof Storage!=="undefined"){localStorage.setItem(s,r)}else{e.cookie(s,r,{expires:n["days"]})}}function c(e,t,n){var r=(e+"").indexOf(t,n||0);return r===-1?false:r}function h(t,n){var r=e.extend({},t);var s=r.find("[data-sayt-exclude]");s.remove();for(i in n){s=r.find(n[i]);s.remove()}var o=r.serializeArray();return o}var n=e.extend({prefix:"autosaveFormCookie-",erase:false,days:3,autosave:true,savenow:false,recover:false,autorecover:true,checksaveexists:false,exclude:[]},t);var r=this;var s=n.prefix+r.attr("id");if(n["erase"]==true){e.cookie(s,null);if(typeof Storage!=="undefined"){localStorage.removeItem(s)}else{e.cookie(s,null)}return true}var o;if(typeof Storage!=="undefined"){o=localStorage.getItem(s)}else{o=e.cookie(s)}if(n["checksaveexists"]==true){if(o){return true}else{return false}return false}if(n["savenow"]==true){var u=h(r,n["exclude"]);l(u);return true}if(n["autorecover"]==true||n["recover"]==true){if(o){var a=o.split(":::--FORMSPLITTERFORVARS--:::");var f={};e.each(a,function(t,n){var r=n.split(":::--FIELDANDVARSPLITTER--:::");if(e.trim(r[0])!=""){if(e.trim(r[0])in f){f[e.trim(r[0])]=f[e.trim(r[0])]+":::--MULTISELECTSPLITTER--:::"+r[1]}else{f[e.trim(r[0])]=r[1]}}});e.each(f,function(t,n){if(c(n,":::--MULTISELECTSPLITTER--:::")>0){var r=n.split(":::--MULTISELECTSPLITTER--:::");e.each(r,function(n,r){e('input[name="'+t+'"], select[name="'+t+'"], textarea[name="'+t+'"]').find('[value="'+r+'"]').prop("selected",true);e('input[name="'+t+'"][value="'+r+'"], select[name="'+t+'"][value="'+r+'"], textarea[name="'+t+'"][value="'+r+'"]').prop("checked",true)})}else{e('input[name="'+t+'"], select[name="'+t+'"], textarea[name="'+t+'"]').val([n])}})}if(n["recover"]==true){return true}}if(n["autosave"]==true){this.find("input, select, textarea").each(function(t){e(this).change(function(){var e=h(r,n["exclude"]);l(e)});e(this).keyup(function(){var e=h(r,n["exclude"]);l(e)})})}}})(jQuery)
