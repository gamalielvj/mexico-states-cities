$(document).on('turbolinks:load', function()
 {
  $("#person_state_id").prop("disabled", true); // States dropdown is disable while Country dropdown is empty
  $("#person_city_id").prop("disabled", true); // Cities dropdown is disable while State dropdown is empty

  // Country - States    WORKS
  $("#person_country_id").change(function(){
    	var country = $(this).val();
      console.log(country);
    	if(country == ''){
        //console.log("if country == ");
        // Disable States dropdown
          $("#person_state_id").empty();
          $("#person_state_id").prop("disabled", true);
          $("#person_state_id").val('');
          $("#person_state_id").append('<option>Please select a City...</option>');        // Disable Cities dropdown

        // Disable Cities dropdown
          $("#person_city_id").empty();
          $("#person_city_id").val('');
          $("#person_city_id").append('<option>Please select a City...</option>');
          $("#person_city_id").prop("disabled", true);

    	}else{

          $("#person_state_id").prop("disabled", false);

        // Disable Cities dropdown
          $("#person_city_id").empty();
          $("#person_city_id").append('<option>Please select a City...</option>');
          $("#person_city_id").prop("disabled", true);

    	//}
    	$.ajax({
  	    url: "/states",
  	    method: "GET",
  	    dataType: "json",
  	    data: {country: country},
  	    error: function (xhr, status, error) {
  	      	console.error('AJAX Error: ' + status + error);
  	    },
  	    success: function (response) {
  	      	console.log(response);
  	      	var states = response["states"];
  	      	$("#person_state_id").empty();

  	      	$("#person_state_id").append('<option>Please select a State...</option>');
  	      	for(var i = 0; i < states.length; i++){
  	      		$("#person_state_id").append('<option value="' + states[i]["id"] + '">' + states[i]["name"] + '</option>');
  	      	}
  	    }
    	});
    }; // End Else
  });

  // States - Cities   No works when select option "Please select a State..."
  $("#person_state_id").change(function(){
    	var state = $(this);
      var country = $("#person_country_id");
      console.log(state.val());

    	//if((state.val()== 'Please select a State...') || (state.val() == '') || (country.val() == '')){
      if((state.get(0).selectedIndex == 0 ) || (state.val() == '') || (country.val() == '')){
        console.log("if country == or state == ");

        // Disable Cities dropdown
          $("#person_city_id").empty();
          $("#person_city_id").val('');
          $("#person_city_id").append('<option>Please select a City...</option>');
          $("#person_city_id").prop("disabled", true);


    	}else{
    		$("#person_city_id").prop("disabled", false);
    	//}
    	$.ajax({
  	    url: "/cities",
  	    method: "GET",
  	    dataType: "json",
  	    data: {state: state.val()},
  	    error: function (xhr, status, error) {
  	      	console.error('AJAX Error: ' + status + error);
  	    },
  	    success: function (response) {
  	      	console.log(response);
  	      	var cities = response["cities"];
  	      	 $("#person_city_id").empty();
             $("#person_city_id").val('');
  	      	 $("#person_city_id").append('<option>Please select a City...</option>');


            for(var i = 0; i < cities.length; i++){
  	      		$("#person_city_id").append('<option value="' + cities[i]["id"] + '">' + cities[i]["name"] + '</option>');
  	      	}
  	    }
    	});
    }; // End else
  });
})
