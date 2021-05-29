$(document).on('turbolinks:load', function()
 {
  // .prop Disable true false works without Semantic UI dropdown class. Thats why all add .parent.
  //$("#person_state_id").prop("disabled", true); // States dropdown is disable while Country dropdown is empty
  //$("#person_city_id").prop("disabled", true); // Cities dropdown is disable while State dropdown is empty


  // Disable Dropdowns,
  //$("#person_state_id").parent('div').addClass("disabled");
  $("#person_state_id").prop("disabled", true);
  //$("#person_city_id").parent('div').addClass("disabled");
  $("#person_city_id").prop("disabled", true);


  // Country - States    WORKS
  $("#person_country_id").change(function(){
      $(this).addClass( "selected" );
    	var country = $(this).val();
      console.log("Country id: " + country);
    	if(country == ''){
        //console.log("if country == ");
        // Disable States dropdown
           $("#person_state_id").empty();
           //$("#person_state_id").prop("disabled", true);
           $("#person_state_id").val('');
           $("#person_state_id").append('<option>Please select a State...</option>');        // Disable Cities dropdown

        // Disable Cities dropdown
          $("#person_city_id").empty();
          //$("#person_city_id").prop("disabled", true);
          $("#person_city_id").val('');
          $("#person_city_id").append('<option>Please select a State first...</option>');


    	}else{
        //$("#person_state_id").prop("disabled", false);
        //$("div.ui.fluid.search.selection.dropdown.disabled").removeClass("disabled");
        //$(".field.disabled").removeClass("disabled");


        //Works
        //$(".field.state").removeClass("disabled");
        $("#person_state_id").parent().removeClass("disabled");
        $("#person_state_id").prop("disabled", false);

        //$("#person_state_id").parent('div').removeClass("disabled");
        //$("#person_city_id").parent('div').removeClass("disabled");


          //$("#person_state_id").prop("disabled", false);
          $("#person_state_id").append('<option>Please select a State...</option>');
          //console.log("Country - States (Enable)")

        // Disable Cities dropdown
          $("#person_city_id").empty();
          $("#person_city_id").append('<option>Please select a State first...</option>');
          //$("#person_city_id").prop("disabled", true);

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
            $("#person_state_id").val('');
            $("#person_state_id").append('<option>Please select a State...</option>');

  	      	for(var i = 0; i < states.length; i++){
  	      		$("#person_state_id").append('<option value="' + states[i]["id"] + '">' + states[i]["name"] + '</option>');
  	      	}
  	    }
    	});
    }; // End Else
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
          //$("#person_city_id").prop("disabled", true);


    	}else{
        //$(".field.city").removeClass("disabled");
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
