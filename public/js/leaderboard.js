var frequency = {}
var value;
var leaderBoard = [];
var results = [];

// ajax call to retrieve top searches
function getLeaderBoard() {
	$.ajax({
		url: '/leaders',
		type: "GET",
    success: function(response)
        {
    	// go through all items and add the titles
     	for (var i = 0; i < response.length; i++) {
     		leaderBoard.push(response[i].title.toLowerCase())
     	};
     	
    	for(var i = 0; i < leaderBoard.length; i++) {
    	    
            value = leaderBoard[i];
    	// create a frequency object to sum up total occurances 
        	if(value in frequency) {
        			frequency[value]++;
        			}
        	else {
        			frequency[value] = 1;
        	}
    	}   
    	// add an li for each object and add them to the results array
    	$.each( frequency, function( key, val ) {
    			results.push( "<li class='" + key.toLowerCase() + "'>" + key + " : " + val + "</li>" );	
    			results.sort(function(a,b) {
    				return b.val - a.val;
    			})		   
    		}); 	
    	
        $(".leaderBoard").append(results);
        }
	})
};

getLeaderBoard();

// tiny ajax call to remove the leaderboard
function removeLeaderBoard() {
    $.ajax({
        url: '/remove',
        type: "GET"
    });
}

// clear the leaderboard and refresh page when it's done
$(".remove").on("click", function(){
    var doubleCheck = confirm("Are you sure you want to delete the leaderboard? This can not be undone.")
    if (doubleCheck == true) {
    removeLeaderBoard();
    location.reload();
    };
});
				
		