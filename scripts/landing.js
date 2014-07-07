// hide any error messages + movie info 
$(".desc").hide()
$(".errorMessage").hide()
$(".searchResults").hide()
$(".movieDetails").hide()


$(".searchButton").on("click", function() {
	
	// wipe out all existing html 
	$(".searchResults").html("")
	$(".movieDetails").html("")
	// first, a little validation to make sure there is some text
		var tomatoes = ""

		if ($(".movieVal").val()) {

				var title = encodeURI($(".movieVal").val())
				
				// clear the error message if it existed before
				$(".errorMessage").hide()
				
			// check to see if the user wants Rotten Tomatoes data
				if ($(".includeTomatoData").is(":checked")) {
					tomatoes = "&tomatoes=true"
				} 
				else {
					tomatoes = ""
				}

				//make an ajax call to get the omdb data 
				$.getJSON( "http://www.omdbapi.com/?t=" + title + tomatoes + "", function( response ) {
	  			
	  			
		  			var movieData = [];


		  			// push each key value pair into an array of list items (make the class lowercase to avoid calling classes that start with a capital letter)
		  			$.each( response, function( key, val ) {
		    		movieData.push( "<li class='" + key.toLowerCase() + "'>" + key + " : "+  val + "</li>" );
		  			});

		  			console.log(movieData)
		  			// 
		  			var searchResults = movieData.splice(0, 4)
		  			
		  			$(".desc").fadeIn()

		  			$(".searchResults").fadeIn()
		  			$(".searchResults").append(searchResults)


		  			$(".movieDetails").fadeIn()
		  			$(".movieDetails").append(movieData)

		  			//we don't really need to show the user if the response was true...
		  			$(".response").hide()

	  		});
		}

		// if no title is inputted, show the error message
		else {
			$(".errorMessage").show()
		}
	
})