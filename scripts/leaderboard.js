var frequency = {}
var value;
var leaderBoard = [];
var results = [];

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
        		
        		// create a frequency object with title:freq
        		if(value in frequency) {
            			frequency[value]++;
        				}
        		else {
            			frequency[value] = 1;
        		}

    				}   

    				console.log(frequency)
    				//add an li for each object and add them to the results array
    				$.each( frequency, function( key, val ) {
			    			results.push( "<li class='" + key.toLowerCase() + "'>" + key + " : " + val + "</li>" );	
			    			results.sort(function(a,b) {
			    				return b.val - a.val 
			    			})		   
		  			}); 
		  			
		  			console.dir(results)       			   	
		  			$(".leaderBoard").append(results)
           }
	})

};

			
    
getLeaderBoard();

				
		