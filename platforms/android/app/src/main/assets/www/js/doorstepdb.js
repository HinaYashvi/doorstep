var request = window.indexedDB.open("service_cart", 1);
request.onupgradeneeded = function(event) {
	var db = event.target.result;
	if (!db.objectStoreNames.contains("service_cart")) {
	  	var objectStore = db.createObjectStore("service_cart", { keyPath: "id",autoIncrement:true });
	  	objectStore.createIndex("product_id", "product_id", { unique: false });
	  	objectStore.createIndex("name", "name", { unique: false });
	  	objectStore.createIndex("Price", "Price", { unique: false });
	  	objectStore.createIndex("p_image", "p_image", { unique: false });
	  	objectStore.createIndex("p_image_path", "p_image_path", { unique: false });
       	objectStore.createIndex("qty", "qty", { unique: false });
        //objectStore.createIndex("multy_img", "multy_img", { unique: false });
	}
}
request.onsuccess = function( event ) {  
	db= event.target.result;
	$$(document).on('page:init', '.page[data-name="partner_mycart"]', function (page) {
		getaddcartitem();
		var session_pid = window.localStorage.getItem("session_pid"); 
		var totalcartqty = window.localStorage.getItem("totalcartqty");
		if(totalcartqty!=0){
		  	app.preloader.show();
			  $.ajax({
			    type:'POST', 
			    url:base_url+'APP/Appcontroller/partnerData',
			    data:{'session_pid':session_pid},
			    success:function(part_data){
			      var parse_part = $.parseJSON(part_data);
			      var partner = parse_part.partner;
			      var p_credit_amount = partner[0].amount;
			      var credits = parse_part.credits;
			      var neword_cnt = parse_part.neword_cnt;
			      //console.log(partner);
			      //console.log(credits);
			      //console.log(neword_cnt);
			      $(".creditDivcart").html("<div class='chip color-red float-right mt-5 mr-5'><div class='chip-label credits text-uppercase fs-10 fw-600'>credits : "+credits+" ($ "+p_credit_amount+".00)</div></div>");	     
			    }
			  });
		  	app.preloader.hide();
	  	}
	});
}
function getaddcartitem(){
	checkConnection();
	app.preloader.show();
	setTimeout(function () { 
  	var os = db.transaction(['service_cart'], "readonly");
  	var store=os.objectStore('service_cart');
  	//console.log("!!!!!!!!!!!! "+store);
  	var output='';
  	var total=0;
  	
  	
  	store.openCursor().onsuccess = function(event) {
  	var cursor = event.target.result;
  	//console.log("cursor "+cursor.value);
    if(cursor) {
    	
        //output+='<li>'+'<div class="item-content">'+'<div class="item-media"><img src="'+base_url+cursor.value.image_path+'" height="50" width="50"></div>'+'<div class="item-inner">'+'<div class="item-title-row">'+'<div class="item-title">'+cursor.value.name+'</div>'+'<div class="item-after" id="priceview"><a href="" onClick="addcartremove('+cursor.value.id+')"><i class="fa fa-trash"></i></a></div>'+'</div>'+'<div class="item-subtitle" id="priceview"><i class="fa fa-inr"></i>'+cursor.value.Price+'</div>'+'<div class="item-text"><span class="qty">Qty</span><input type="number"  onfocus="this.select();" onmouseup="return false;" onfocusout="changeqty('+cursor.value.id+')" value="'+cursor.value.qty+'" class="unit" id="unit'+cursor.value.id+'"/> </div>'+'</div>'+'</div>'+'</li>';
        output+='<li><div class="item-content"><div class="item-media elevation-9"><img src="'+base_url+cursor.value.image_path+'" height="60" width="60"></div><div class="item-inner"><div class="item-title fw-600">'+cursor.value.name+'<div class="item-subtitle"><i class="f7-icons fs-18 fw-500 txt-amaz">money_dollar</i><span class="fw-500 txt-amaz">'+cursor.value.Price+'</span></div></div></div><div class="item-inner"><div class="col-20 fs-12 fw-500">Qty:&nbsp;&nbsp;</div><div class="col-35 item-input-wrap"><input type="number"  onfocus="this.select();" min="1" max="20" onmouseup="return false;" onchange="changeqty('+cursor.value.id+')" value="'+cursor.value.qty+'" class="qty" id="qty'+cursor.value.id+'"/></div></div><div class="item-after"><a href="" onClick="addcartremove('+cursor.value.id+')"><i class="f7-icons fs-18 txt-amaz">trash</i></a></div></div></div></li>'; 

        //output+='<li><div class="item-content"><div class="item-media elevation-9"><img src="'+base_url+cursor.value.image_path+'" height="60" width="60"></div><div class="item-inner"><div class="item-title fw-600">'+cursor.value.name+'<div class="item-subtitle"><i class="f7-icons fs-18 fw-500 txt-amaz">money_dollar</i><span class="fw-500 txt-amaz">'+cursor.value.Price+'</span></div></div></div><div class="item-inner"><div class="col-20 fs-12 fw-500">Qty:&nbsp;&nbsp;</div><input type="number" name="qty" id="qty'+cursor.value.id+'" value="'+cursor.value.qty+'" onfocus="this.select();" onmouseup="return false;" onfocusout="changeqty('+cursor.value.id+')" class="seg-outline p-15 fs-12"/></div></div><div class="item-after"><a href="" onClick="addcartremove('+cursor.value.id+')"><i class="f7-icons fs-18 txt-amaz">trash</i></a></div></div></div></li>';
 
        total+=(cursor.value.Price*cursor.value.qty);              
        cursor.continue();
    }
    var li_len = $(".mycart li").length;
    if(li_len > 0){
  		$(".emptycart").removeClass("display-none");
    	$(".emptycart").addClass("display-block");
  	}else{
  		$(".emptycart").removeClass("display-block");
    	$(".emptycart").addClass("display-none");
  	}
   	if(total==0){
       $('#addcart').hide();
       output= '<img src="img/cart-empty.png" alt="Empty Cart" id="emptycart" height="200" width="200" class="emptycart mb-10">'+ '<a href="/partner_shopping_cart/" class="button button-big seg_btn button-raised mycolor">Continue Shopping</a>';
       $('.mycart').html(output);
       app.preloader.hide();
   	}else{
       $('#addcart').show(); 
       $('.mycart').html(output);
       $("#hidd_payble").val(total);
       $('.total').html('TOTAL PAY:: <i class="f7-icons fs-18">money_dollar</i>'+total.toFixed(2)); 
   	} 
    app.preloader.hide();              
    }
    },2000);
	app.preloader.hide();
}
 function emptycart() 
 {
   app.dialog.confirm('Delete all item ?','<i class="f7-icons">multiply</i> Delete', 
      function () {
    var os = db.transaction(['service_cart'], "readwrite");
    var store=os.objectStore('service_cart');
    store.openCursor().onsuccess = function(event) {
             var cursor = event.target.result;
             if(cursor)
              {  
                 store.delete(cursor.value.id);
                 cursor.continue(); 
              }
            }
    mainView.router.refreshPage();
    window.localStorage.setItem("totalcartqty", 0);
  });
 }
function changeqty(id){		
    checkConnection();
    app.preloader.show();
    var output=0;
	var qty=parseInt($("#qty"+id).val());
    if (qty==0) {
        qty=1;
    };
    $('.qty').each(function () {
    	output += parseInt(this.value); // "this" is the current element in the loop
	});
	//console.log(output);
	window.localStorage.setItem("totalcartqty", output);
	var os = db.transaction(['service_cart'], "readwrite");
    var store=os.objectStore('service_cart');
    var request = store.get(id);
    request.onsuccess = function(event) {
      // Get the old value that we want to update
      var data = request.result;      
      // update the value(s) in the object that you want to change
      //data.qty = qty;
      data.qty = qty;
      // Put this updated object back into the database.
      var requestUpdate = store.put(data);
       requestUpdate.onerror = function(event) {
         app.alert("Do something with the error");
       };
       requestUpdate.onsuccess = function(event) {
          getaddcartitem();
       };
    };
    app.preloader.hide(); 
}
function addtocart(p_id,p_name,p_img,p_img_path,p_price){
	checkConnection();
	app.preloader.show();
	var qty=1;
	app.dialog.confirm('Add item to cart? '+'<i class="f7-icons">cart</i>', function () {
    	//app.dialog.alert('Great!');
    	totalcartqty=parseInt(window.localStorage.getItem("totalcartqty"));
        totalcartqty++;
        window.localStorage.setItem("totalcartqty", totalcartqty);
        $('.totalcartqty').html(totalcartqty);
        var os = db.transaction(['service_cart'], "readwrite");
        var store=os.objectStore('service_cart');
        //var res = name.split("/");
        store.openCursor().onsuccess = function(event) {
         	var cursor = event.target.result;
         	//console.log(cursor);
            if(cursor){              	
                if(cursor.value.product_id==p_id){
                    qty+=cursor.value.qty;
                    store.delete(cursor.value.id);
                }
                cursor.continue(); 
            }
      	}
      	setTimeout(function () { 
            var os = db.transaction(['service_cart'], "readwrite");
            var store=os.objectStore('service_cart');
            var subtot = p_price * qty;
            var item={
              product_id:p_id,              
              name:p_name,
              Price:p_price,
              image:p_img,
              image_path:p_img_path,
              qty:qty,
              subtotal:subtot,
              //marketprice:market,
            }
            var request=store.add(item);
        },1500);
  	});
  	app.preloader.hide();
}
function checkqty(){
	checkConnection();
	app.preloader.show();
	var os = db.transaction(['service_cart'], "readonly");
    var store=os.objectStore('service_cart');
    var output='';
    var total=0;
    store.openCursor().onsuccess = function(event){
	    var cursor = event.target.result;
	    if(cursor){ 
	        output += cursor.value.product_id+','+cursor.value.qty+'-';
	        cursor.continue();
	    }    
	}
	var hidd_payble = $("#hidd_payble").val();
	/*setTimeout(function () { // stock mgmt uncomment when stock mgmt added //
		var url=base_url+'App/appcontroller/productschack/'+output;
		$.ajax({
			url:url,
			dataType:'json',
			success:function(response){
				var error=response['item'];
				if(jQuery.isEmptyObject(error)==false){
					for(var i = 0; i <error.length; i++) {
                        var msg=error[i].msg;
                        var notificationFull = app.notification.create({
                        	title: 'Doorstep',
  							titleRightText: 'now',
                            text:msg,
                        });
                        notificationFull.open();
                    }
				}else{
					mainView.router.navigate("/partner_payment/");
				}
			}
		});
	},3000); */
	checkOut(hidd_payble);
	app.preloader.hide();
}
function checkOut(hidd_payble){
  checkConnection();
  var session_pid = window.localStorage.getItem("session_pid");   
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/partnerData',
    data:{'session_pid':session_pid},
    success:function(part_data){
    	//app.preloader.show();
      	var parse_part = $.parseJSON(part_data);
      	var partner = parse_part.partner;
      	var p_credit_amount = partner[0].amount;
      	if(hidd_payble > p_credit_amount){
      		app.dialog.alert("Not enough credits to purchase.<i class='f7-icons mr-5'>hand_thumbsdown_fill</i>");
      		var os = db.transaction(['service_cart'], "readwrite");
  			var store=os.objectStore('service_cart');
  			store.openCursor().onsuccess = function(event) {
  				var cursor = event.target.result;
  				if (cursor) {
  					store.delete(cursor.value.id);
					cursor.continue();	
  				}
  				window.localStorage.setItem("totalcartqty", 0);
  			};
      		mainView.router.navigate("/partner_shopping_cart/");
      		app.preloader.hide();
      		return false;
      	}
      getPayment(p_credit_amount,hidd_payble);
      //app.preloader.hide();
    }
  });
}
function getPayment(p_credit_amount,hidd_payble){
	checkConnection();
	var os = db.transaction(['service_cart'], "readwrite");
  	var store=os.objectStore('service_cart');
  	
  	var mycart = $(".mycart li").length;  	
  	var prod_ids=[];
  	var customers = [];
  	var len=0;
  	var session_pid = window.localStorage.getItem("session_pid");
  	store.openCursor().onsuccess = function(event) {	
  		len++;
	    var cursor = event.target.result;
	    //alert("BEFORE "+cursor.value.id);
	    //customers.push(len);
	  	if (cursor) {	  		
	    	customers.push(cursor.value);
	    	
	  	}else {	  		
			//console.log("Got all customers************: " + customers);
		}
		if(mycart==len){
			$.ajax({
			    type:'POST', 
			    //dataType:'json',
			    url:base_url+'APP/Appcontroller/orderPayment',
			    data:{'session_pid':session_pid,'p_credit_amount':p_credit_amount,'hidd_payble':hidd_payble,'store':customers},
			    success:function(part_pay){
			    	if(part_pay.trim()=='inserted'){    				
	    				app.dialog.alert("Success! Thankyou for your ORDER.");
	    				mainView.router.navigate("/partner_shopping_cart/");
			    	} 					
			    }
			});
			
			//store.clear();
		}
		if(cursor){
			//console.log("AFTER " +cursor.value.id);
			//cursor.delete();
			store.delete(cursor.value.id);
			cursor.continue();	
		}		
		window.localStorage.setItem("totalcartqty", 0);
		
	}		
}	
function addcartremove(id){
	var qty=parseInt($("#qty"+id).val());
     app.dialog.confirm('Are you sure?', 'Delete item',
      function () {
      	app.preloader.show();
        var os = db.transaction(['service_cart'], "readwrite");
        var store=os.objectStore('service_cart');
        var request=store.delete(id);
        var totalcartqty=parseInt(window.localStorage.getItem("totalcartqty"));
        totalcartqty-=qty;
        window.localStorage.setItem("totalcartqty", totalcartqty);
        checkConnection();
        app.preloader.hide();
        mainView.router.refreshPage();
      }
    );
}