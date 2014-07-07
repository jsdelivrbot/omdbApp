// hide any error messages + movie info 
$(".desc").hide();
$(".errorMessage").hide();
$(".searchResults").hide();
$(".movieDetails").hide();

function displayInfo() {

	// wipe out all existing html 
	$(".searchResults").html("");
	$(".movieDetails").html("");
	// first, a little validation to make sure there is some text
		var tomatoes = "";

		if ($(".movieVal").val()) {

				var title = encodeURI($(".movieVal").val());
				
				// clear the error message if it existed before
				$(".errorMessage").hide();
				
			// check to see if the user wants Rotten Tomatoes data
				if ($(".includeTomatoData").is(":checked")) {
					tomatoes = "&tomatoes=true";
				} 
				else {
					tomatoes = "";
				}

				//make an ajax call to get the omdb data 
				$.getJSON( "http://www.omdbapi.com/?t=" + title + tomatoes + "", function( response ) {
	  			
	  			
		  			var movieData = [];


		  			// push each key value pair into an array of list items (make the class lowercase to avoid calling classes that start with a capital letter)
		  			$.each( response, function( key, val ) {
		    		
		    		// let's show the poster image not just the URL
			    		if (key === "Poster") {
								movieData.push( "<p><li class='" + key.toLowerCase() + "'>" + key + " : "+  "<img src = " +  val + " alt ='Movie poster'>" + "</li><p>" );	
			    					
			    		}
			    		else {
			    			movieData.push( "<li class='" + key.toLowerCase() + "'>" + key + " : "+  val + "</li>" );	
			    		}
		  			});

		  			// pick the first four things (title, year, rating, release date) to appear as our "Movie Description"
		  			var searchResults = movieData.splice(0, 4)
		  			
		  			$(".desc").fadeIn();

		  			$(".searchResults").fadeIn();
		  			$(".searchResults").append(searchResults);


		  			$(".movieDetails").fadeIn();
		  			$(".movieDetails").append(movieData);

		  			//we don't really need to show the user if the response was true...
		  			$(".response").hide();

		  			// clear the input field after a search
		  			$(".movieVal").val("");
	  		});
		}

		// if no title is inputted, show the error message
		else {
			$(".errorMessage").show();
		}
	
}

// save the title of the movie for the leaderboard  
$("form").on("submit", function(e){
	
	var url = "/add"
	var parameters = {
		title: $(".movieVal").val() 
	}
	console.log(parameters)
	$.ajax({
		type: "POST",
		url: url,
		data: parameters, // serializes the form's elements.
    success: function(data)
           {
               console.log("Success!"); 
           },
    cache: false
	});
	// run this display function when enter is pressed on the form or when the search button is clicked + prevent form submission
	displayInfo();
	return false;
})




