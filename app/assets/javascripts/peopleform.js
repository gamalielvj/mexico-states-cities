$(document).on('turbolinks:load', function()
 {

  // Disable Dropdowns States Cities and Time Zones
  $("#person_state_id").prop("disabled", true);
  $("#person_city_id").prop("disabled", true);
  $("#person_time_zone").prop("disabled", true);


  // Country - States    WORKS
  $("#person_country_id").change(function(){
      $(this).addClass( "selected" );
    	var country = $(this).val();


        // Enable Dropdowns States and Time Zones
        $("#person_state_id").parent().removeClass("disabled");
        $("#person_state_id").prop("disabled", false);
        //$("#person_state_id").append('<option>Please select a State...</option>');

        $("#person_time_zone").parent().removeClass("disabled");
        $("#person_time_zone").prop("disabled", false);
        //$("#person_time_zone").append('<option>Please select a Time Zone...</option>');

        // Disable Cities dropdown
          $("#person_city_id").empty();
          $("#person_city_id").val('');
          $("#person_city_id").append('<option>Please select a State first...</option>');
          $("#person_city_id").parent('div').addClass("disabled");
          $("#person_city_id").prop("disabled", true);


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
            // Fill States by Country selected
            var states = response["states"];
            $("#person_state_id").empty();
            $("#person_state_id").val('');
            $("#person_state_id").append('<option>Please select a State...</option>');

  	      	for(var i = 0; i < states.length; i++){
  	      		$("#person_state_id").append('<option value="' + states[i]["id"] + '">' + states[i]["name"] + '</option>');
  	      	}

            // Fill time Zones by Country selected
            var timezones = response["zones"];
            $("#person_time_zone").empty();
            $("#person_time_zone").val('');
            $("#person_time_zone").append('<option>Please select a Time Zone...</option>');

  	      	for(var i = 0; i < timezones.length; i++){
  	      		$("#person_time_zone").append('<option value="' + timezones[i]["name"] + '">' + timezones[i]["name"] + '</option>');
  	      	}
  	    }
    	});
  });

  // States - Cities "
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
          $("#person_city_id").append('<option>Please select a State first...</option>');
          $("#person_city_id").parent('div').addClass("disabled");
          $("#person_city_id").prop("disabled", true);


    	}else{

        // Enable Cities Dropdown
        $("#person_city_id").empty();
        $("#person_city_id").val('');
        $("#person_city_id").append('<option>Please select a City...</option>');
        $("#person_city_id").parent('div').removeClass("disabled");
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

            for(var i = 0; i < cities.length; i++){
  	      		$("#person_city_id").append('<option value="' + cities[i]["id"] + '">' + cities[i]["name"] + '</option>');
  	      	}
  	    }
    	});
    }; // End else
  });
})
