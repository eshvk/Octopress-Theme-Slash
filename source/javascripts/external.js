(function($){
	var host = location.host;
    // Replace any trailing and leading spaces
    var tld = host.replace(/^\s+/, "");
    tld = tld.replace(/\s+$/, "");
    // Remove http/https/ftp
    tld = tld.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");
    // Strip away www
    tld = tld.replace(new RegExp(/^www\./i),"");
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
})(jQuery);
