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
!function(a){a.fn.sayt=function(b){function k(b){var d="";jQuery.each(b,function(a,b){d=d+b.name+":::--FIELDANDVARSPLITTER--:::"+b.value+":::--FORMSPLITTERFORVARS--:::"}),"undefined"!=typeof Storage?localStorage.setItem(e,d):a.cookie(e,d,{expires:c.days})}function l(a,b,c){var d=(a+"").indexOf(b,c||0);return d!==-1&&d}function m(b,c){var d=a.extend({},b),e=d.find("[data-sayt-exclude]");e.remove();for(i in c)e=d.find(c[i]),e.remove();var f=d.serializeArray();return f}var c=a.extend({prefix:"autosaveFormCookie-",erase:!1,days:3,autosave:!0,savenow:!1,recover:!1,autorecover:!0,checksaveexists:!1,exclude:[],id:this.attr("id")},b),d=this,e=c.prefix+c.id;if(1==c.erase)return a.cookie(e,null),"undefined"!=typeof Storage&&localStorage.removeItem(e),!0;var f;if(f="undefined"!=typeof Storage?localStorage.getItem(e):a.cookie(e),1==c.checksaveexists)return!!f;if(1==c.savenow){var g=m(d,c.exclude);return k(g),!0}if(1==c.autorecover||1==c.recover){if(f){var h=f.split(":::--FORMSPLITTERFORVARS--:::"),j={};a.each(h,function(b,c){var d=c.split(":::--FIELDANDVARSPLITTER--:::");""!=a.trim(d[0])&&(a.trim(d[0])in j?j[a.trim(d[0])]=j[a.trim(d[0])]+":::--MULTISELECTSPLITTER--:::"+d[1]:j[a.trim(d[0])]=d[1])}),a.each(j,function(b,c){if(l(c,":::--MULTISELECTSPLITTER--:::")>0){var e=c.split(":::--MULTISELECTSPLITTER--:::");a.each(e,function(c,e){a('input[name="'+b+'"], select[name="'+b+'"], textarea[name="'+b+'"]',a(d)).find('[value="'+e+'"]').prop("selected",!0),a('input[name="'+b+'"][value="'+e+'"], select[name="'+b+'"][value="'+e+'"], textarea[name="'+b+'"][value="'+e+'"]',a(d)).prop("checked",!0)})}else a('input[name="'+b+'"], select[name="'+b+'"], textarea[name="'+b+'"]',a(d)).val([c])})}if(1==c.recover)return!0}1==c.autosave&&this.find("input, select, textarea").each(function(b){a(this).change(function(){var a=m(d,c.exclude);k(a)}),a(this).keyup(function(){var a=m(d,c.exclude);k(a)})})}}(jQuery);