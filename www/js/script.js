var Page = {
    options: null,
    init: function(options) {

        var defaults = {
            container: $('#main-content'),
            content: $('#main-content').html(),
            lasturl: null,
            interval : 250,
            
        };

        Page.options = $.extend(defaults, options);
        
        Page.check();
        setInterval("Page.check()", Page.options.interval);
    },
    check: function(hash) {
	
        if(!hash)
        {
            hash = window.location.hash;
        }
	
	if(hash != Page.options.lasturl)
	{
            Page.options.lasturl = hash;

            if(hash == "")
            {
                Page.options.container.html(Page.options.content);
            }
            else
            {
                Page.load(hash);
            }
	}
    },
    load: function(url) {
	url = url.replace('#','');

	$.ajax({
		type: "POST",
		url: "/ajax/page/load/"+url,
		dataType: "html",
		success: function(res){
                    if(parseInt(res) != 0)
                    {
                        Page.options.container.html(res);
                    }
                    else
                    {
                        alert('500 Internal Server Error');
                    }
		}
		
	});
    },
};

$(document).ready(function(){
    Page.init();
	
    $('ul li a').click(function (e){
        Page.check(this.hash);
    });
});