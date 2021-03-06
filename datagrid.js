(function() {
	

	//Data for table
    var tree_inv = [
		{"ID":"1","Address":"3728","Street":"Fishcreek  Rd","Side":"Front","Site":"1","Species":"Acer Rubrum","DBH":"21","Condition":"Good"},
		{"ID":"2","Address":"3728","Street":"Fishcreek  Rd","Side":"Front","Site":"2","Species":"Acer Rubrum","DBH":"18","Condition":"Fair"},
		{"ID":"3","Address":"3728","Street":"Fishcreek  Rd","Side":"Front","Site":"3","Species":"Acer Rubrum","DBH":"19","Condition":"Poor"},
		{"ID":"4","Address":"3728","Street":"Fishcreek  Rd","Side":"Front","Site":"3","Species":"Vacant Planting Site","DBH":"0","Condition":"N/A"},
		{"ID":"5","Address":"3728","Street":"Fishcreek  Rd","Side":"Front","Site":"4","Species":"Acer Rubrum","DBH":"20","Condition":"Dead"},
		{"ID":"6","Address":"3738","Street":"Fishcreek  Rd","Side":"Front","Site":"1","Species":"Vacant Planting Site","DBH":"0","Condition":"N/A"},
		{"ID":"7","Address":"3738","Street":"Fishcreek  Rd","Side":"Front","Site":"1","Species":"Fraxinus spp.","DBH":"12","Condition":"Dead"}
	];
	
	var item_count = tree_inv.length;
	
	//Select / dropdown list for tree species
    var species_list = [
        { Name: "", Id: 0 },
        { Name: "Acer Rubrum", Id: 1 },
        { Name: "Fraxinus spp.", Id: 2 },
        { Name: "Vacant Planting Site", Id: 3 }
    ];
	
	//Select / dropdown list for tree condition
    var condition_list = [
        { Name: "", Id: 0 },
        { Name: "Good", Id: 1 },
        { Name: "Fair", Id: 2 },
        { Name: "Poor", Id: 3 },
        { Name: "Dead", Id: 4 },
        { Name: "N/A", Id: 5 }
    ];

	
	//-------------------------------------------------------------
	//This isn't implemented / doesn't work at the moment
	jsGrid.validators.custom = {
		message: function(value, item) {
			return "Custom -- " + item.count;
		},
		validator: function(value, item) {
			return false;
		}
    };	
	//This isn't implemented / doesn't work at the moment
    jsGrid.beforeSubmit = function(postdata) {
		alert("Test");
		return true;
	};
	//-------------------------------------------------------------


	//This is the beginning of the grid setup
    var mygrid = $("#jsGrid1").jsGrid({
        width: "100%",
        height: "60%",
	
		autoHeight:true,
        inserting: true,
		editing: true,
        sorting: true,
        paging: true,
		pageSize: 5,
		filtering: true,  //This is where you would turn on filter options, but 
		autoload: true,
        data: tree_inv,

		
		//When adding a new line, put a new unique ID number in, I couldn't figure how to make this field not editable during insertion
		onItemInserting: function(args) {
			args.item.ID = item_count;
			$("#jsGrid1").jsGrid("refresh");
		},
		
		//For this function, args is broken up into -grid- and -item-
		//-grid- is the entire grid - working on accessing this
		//-item- is the entry you're trying to work with		
		onItemInserting: function(args) {
			//var result = allow_changed_inventory(args.item.Species, args.item.DBH, args.item.Condition);
			//alert(result);
			if (!(allow_changed_inventory(args.item.Species, args.item.DBH, args.item.Condition))) {
				//Don't allow row to be edited/inserted
				args.cancel = true;
			} else args.item.ID = ++item_count;
			
		},
		onItemUpdating:  function(args) {
			//var result = allow_changed_inventory(args.item.Species, args.item.DBH, args.item.Condition);
			//alert(result);
			if (!(allow_changed_inventory(args.item.Species, args.item.DBH, args.item.Condition))) {
				//Don't allow row to be edited/inserted
				args.cancel = true;
			}
		}, 


		//Grid data setup / validation - validation is turned off
        fields: [
            { name: "ID", type: "number", width: 50, editing: false
		},
            { name: "Address", type: "number", width: 75
			//validate: {message: "Address field is required", validator: function(value) {return value > 0; } } 
	    },
            { name: "Street", type: "text", width: 150
			//validate: {message: "Street field is required", validator: function(value) {return value != ""; } } 
	    },
            { name: "Side", type: "text", width: 50
			//validate: {message: "Side field is required", validator: function(value) {return value != ""; } }
	    },
            { name: "Site", type: "number", width: 50
			//validate: {message: "Site field is required", validator: function(value) {return value != ""; } } 
	    },
            { name: "Species", type: "select", items: species_list, valueField: "Name", textField: "Name", width: 150,
			validate: {message: "Select species from list, required field", validator: function(value) {return value != ""; } }
	    },
            { name: "DBH", type: "number", width: 50
			//validate: {message: "DBH field is required, value greater than zero.", validator: function(value) {return value > 0; } }
	    },
            { name: "Condition", type: "select", items: condition_list, valueField: "Name", textField: "Name",
			validate: {message: "Select condition from list, required field", validator: function(value) {return value != ""; } }
	    },
            { type: "control" }
        ]
	
    });  //Ends jsGrid1

			
	

	<!-- Function to make sure that if (when add/edit a line) if species <> vacant, then user must have DBH>0 and condition <> "N/A"
	function allow_changed_inventory(check_species, check_DBH, check_condition) {

		//Get the N/A text from the condition list
		var NA_text = condition_list[5].Name;
		//Get the text from the species list
		var vacant_text = species_list[3].Name;
		
		//If the entry isn't a vacant tree input, we need to check to make sure user has input a CONDITION that isn't NA_text
		//and the DBH greater than 0
		if (check_species != vacant_text && check_species != "") {
			if (check_condition == NA_text || check_DBH <= 0) {
				//This will cancel the item update/insert
				alert('For any tree species that isn\'t vacant, DBH and condition are required.')
				return false;
			} 
		}
		//Otherwise, allow edit/insert to go through
		return true;
	};

	
	
	
	
	

	//This is where I'm working right now and doesn't work yet
	//I think we'll need the same function to be called on -onitemupdate- too
	//http://js-grid.com/docs/						-JS Grid Documentation
	//http://jsfiddle.net/tabalinas/rkxbgzrx/     -Maybe good examples
	//http://atott.ru/js-grid/
	//https://github.com/tabalinas/jsgrid/issues/44     --This was the best one so far
	//var myGrid = $("#jsGrid1").jsGrid.getName;	//This does stuff, keep for now
	//var grid = $("#jsGrid1").data("JSGrid");     //This doesn't seem to work either
	
		
	/*
	//Passing the grid without .slice() will edits the actual grid
	//mydata[0].ID = 77;
	//$("#jsGrid1").jsGrid("refresh");
	//return 0;		
	
	//Store row cound to iteration through
	var rows_count = data.length;
		
	console.log(data.length);			
		
	//This will get all the field data...
	//data_fields[i].name if you wanted the column names
	//Not used now
	var data_fields = $("#jsGrid1").jsGrid("option", "fields");
	*/
	
	
	function report_duplicates(){
		//Get the data from the current grid on page
		var data = new Array();
		//I wanted to edit the data without editing the actual grid, 
		//so I cloned the data, this would probably not be wise for large sets of data
		data = $("#jsGrid1").jsGrid("option", "data").slice();

		//Loop through each row, looking at all the following rows to check for any repeating entries (address/stress/side/site combo)
		for (var i = 0; i < data.length - 1; i++) {
			var compare_from = data[i].Address + data[i].Street + data[i].Side + data[i].Site;
			console.log("Compare ID " + data[i].ID + " (" + compare_from + ")");
			
			//Then look at all the following rows AFTER row i
			for (var j = i + 1; j < data.length; j++) {
				var compare_to = data[j].Address + data[j].Street + data[j].Side + data[j].Site;
				console.log("     To ID " + data[j].ID + " (" + compare_to + ")");
				if (compare_from === compare_to){
					console.log("Row ID " + data[i].ID + " and row ID " + data[j].ID + " are the same.");
					//Once we've found a matching row, remove it from the data set
					//If row 1==2==3, we don't want to store 1 sameas(2,3), and also 2 sameas(3), we already know 2==3 from row 1's comparison
					data.splice(j,1);
					j--;
				}
			}
		}
		//$("#jsGrid1").jsGrid("refresh");
		console.log("Function End");
	}
});