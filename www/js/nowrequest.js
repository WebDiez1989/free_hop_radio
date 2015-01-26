function show()  
        {  
            $.ajax({  
                url: "http://autodj.shiza.fm/radio/nowrequest.php",  
                cache: false,  
                success: function(html){  
                    $("#nowrequest").html(html);  
                }  
            });  
        }  
      
        $(document).ready(function(){  
            show();  
            setInterval('show()',1000);  
        });  