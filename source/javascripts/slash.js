(function($){
	/* external.js */
	var host = location.host;
    // Replace any trailing and leading spaces
    var tld = host.replace(/^\s+/, "");
    tld = tld.replace(/\s+$/, "");
    // Remove http/https/ftp
    tld = tld.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");
    // Strip away www
    tld = tld.replace(new RegExp(/^www\./i),"");
    // Strip away forward slash if any
    tld = tld.replace(new RegExp(/\/(.*)/),"");
    var parts = tld.split('.');
    var type = parts.pop();
    var domain = parts.pop();
    var tld = domain + '.' + type;
   	$('a').on('click', function(e){
        var href = $(this).attr('href');
        // Remove http/https/ftp
        var link = href.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");
        // Remove stuff after first forward slash
        link = link.replace(new RegExp(/\/(.*)/),"");
        // Strip away www
        link = link.replace(new RegExp(/^www\./i),"");
        var parts = link.split('.');
        var type = parts.pop();
        var domain = parts.pop();
        var curr_tld = domain + '.' + type;
		if (href.match('https?') && curr_tld != tld){
			window.open(href);
			e.preventDefault();
		}
	});

	/* navigation.js */
	var appends = '<option>Menu</option>';

	$('.menu .main > li').each(function(){
		var link = $(this).children('a');
		appends += '<option value="'+link.attr('href')+'">'+link.html()+'</option>';
		$(this).find('li').each(function(){
			var link = $(this).children('a');
			appends += '<option value="'+link.attr('href')+'">- '+link.html()+'</option>';
		});
	});

	$('nav.menu').append('<select>'+appends+'</select>').on('change', 'select', function(){
		location.href = $(this).val();
	});

	/* caption.js */
	$('.entry').each(function(i){
		var _i = i;
		$(this).find('img').each(function(){
			var alt = $(this).attr('alt');

			if (alt == '' || typeof alt == 'undefined'){
				$(this).wrap('<a href="'+$(this).attr('src')+'" class="fancybox" rel="gallery'+_i+'" />');
			} else {
				$(this).after('<span class="caption">'+alt+'</span>').wrap('<a href="'+$(this).attr('src')+'" class="fancybox" title="'+alt+'" rel="gallery'+_i+'" />');
			}
		});
	});
	$('.fancybox').fancybox();
})(jQuery);
