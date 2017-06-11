
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
 $("form").on("submit", function(e) {
  e.preventDefault();
  var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#searchbox").val()).replace(/%20/g, "+"),
            order: "viewCount"
       }); 
	   request.execute(function(response) {
		  console.log(response);
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("./item.html", function(data) {
             $("#results").append(tplawesome(data, [{"title":item.snippet.title, 
            	 "videoid":item.id.videoId,
            	 "channelTitle": item.snippet.channelTitle,
            	 "description": item.snippet.description,
            	 "publishedAt": item.snippet.publishedAt
            	 }]));
            });
          });
          resetVideoHeight();
       });
    });
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyCwMJiDR9Aajg5kBfV3hrOBQTG8_wv1eTk");
    gapi.client.load("youtube", "v3", function() {
       
    });
}