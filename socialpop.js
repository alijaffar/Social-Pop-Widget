/* *****************************************************************************
This is open source code.

This file is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU General Public License for more details.

Software: Social Pop!
Version:  0.10
Author:   Ali Jaffar
Email:    I a m ( a.t. ) t h e A . l i
Website:  http://thea.li/social-pop-widget
License:  GPLv3 (See https://www.gnu.org/licenses/gpl.txt)
***************************************************************************** */
/*
	----- TO USE ----- 
	1. Simply include the following where you want it to show:
	<script src="js/socialpop.js?tw|fb|gp|li"></script>
	
	----- CUSTOMIZE -----
	1. You can choose which icons to show; use their abbreviations (tw|fb|gp|li), seperated w/ the 'pipe' symbol ( | )
	2. You can set window dimensions below; height (h) and width (w), defaulted to 626x436
	3. Feel free to delete any comments for performance benefits (minimal file-size savings)

	----- CREDIT -----
	-This widget is built upon Compartir v0.04. Kudos to the team on the excellent work. 
	-I've never used AddThis, as I've always suspected privacy & security issues. 
	-This is also the main reason why I'm extending your work!
	
	----- UPCOMING -----
	in v0.2 -- I'll add base64 encoded icons to reduce http requests, 
	as well as more social sharing sources.	
	

*/

// --- The only thing you need to configure: The base URL where your icons live:
icons_home = 'icons'; // http://link.com/to/icons

function fixedEncodeURIComponent (str) {
  str = encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
  return str;
}

var network = new Array();

// --- Social network sharing services URL. The tags #url# and #title# will be replaced by the URL and title of the web page.
network['tw'] = 'http://twitter.com/share?url=#url#&amp;text=#title#';
network['fb'] = 'http://www.facebook.com/sharer.php?u=#url#&amp;t=#title#';
network['li'] = 'http://www.linkedin.com/shareArticle?mini=true&amp;url=#url#&amp;title=#title#';
network['gp'] = 'https://plus.google.com/share?url=#url#&amp;title=#title#';

// --- Strings to write before and after the icon. They are blank by default.
var icon_pre = '';
var icon_post = '';

var this_url = fixedEncodeURIComponent(document.location.href);
var this_title = fixedEncodeURIComponent(document.title);

scripts = document.getElementsByTagName('script');
index = scripts.length - 1;
this_script= scripts[index];
tmp = this_script.src;
tmp = tmp.split('?');
query_string = tmp[1];
var networks = query_string.split('|');

num_networks = networks.length;

function pop (url){
	w = 626;	
	h = 436;
	popit=window.open(url,'name','height='+h+',width='+w+'');
	if (window.focus) {popit.focus()}
	return false;	
}

i = 0;
while ( i < num_networks ) {

	share_link = network[networks[i]];

	re = /#url#/g;
	share_link = share_link.replace(re, this_url);

	re = /#title#/g;
	share_link = share_link.replace(re, this_title);

	icon = "<img class='icon' src='" + icons_home + '/' + networks[i] + ".png' />";
	poponclick = "pop('"+ share_link +"');";
	
	document.write(icon_pre);
	document.write("<a href='#!' onclick=\"return "+ poponclick +"\">" + icon + "</a>"); //" + share_link + "
	document.write(icon_post);

	i++;
}