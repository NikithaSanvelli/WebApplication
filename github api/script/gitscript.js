$(function(){
  $('#gitbtn').on('click', function(e){
    e.preventDefault();
    $('#gitdata').html('<div id="loader"><img src="images/loader.gif" alt="loading..."></div>');
    
    var username = $('#gitusername').val();
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';
    
    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('#gitdata').html("<h2>No User Info Found</h2>");
      }
      
      else {
        var jsondata = JSON.stringify(json)
        $('#gitdata').html('<div>'+jsondata+'</div>');
        console.log(jsondata);
		
		var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;
		var repositories;
		
		if(fullname == undefined) { 
		fullname = username; 
		}
		
		var outhtml = '<h3 class="headname">'+ fullname +'<span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h3>';
		outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
		outhtml = outhtml + '<p><b>UserName: </b>'+username+'</p>';
		outhtml = outhtml + '<p><b>Followers: </b>'+followersnum+'</p>';
		outhtml = outhtml + '<p><b>Following: </b>'+followingnum+'</p>';
		outhtml = outhtml + '<p><b>Repos: </b>'+reposnum+'</p>';
		outhtml = outhtml + '<div class="repolist clearfix">';
		
        $.getJSON(repouri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          if(repositories.length == 0) {outhtml = outhtml + '<p>No repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>'; 
          }
          $('#gitdata').html(outhtml);
        } 
      } 
    })
  });
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});
