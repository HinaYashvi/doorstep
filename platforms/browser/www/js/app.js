// Initialize your app
var $$ = Dom7;
var app = new Framework7({  
  root: '#app', // App root element
  pushState: true, 
  //popupCloseByOutside:true,
  name: 'DOORSTEP',// App Name 
  id: 'com.phonegap.doorstep', // App id //
  panel: {
    //swipe: 'left', // Enable swipe panel //
    closeByBackdropClick : true,    
  },  
  input: {
    scrollIntoViewOnFocus: true,
    scrollIntoViewCentered: true,
  },
  animateNavBackIcon:true,  
  dynamicNavbar: true,  
  //theme:'material',
  //material: true, //enable Material theme
  //materialRipple: false,
  routes: routes, 
  clicks: { 
    externalLinks: '.external',
  },
  navbar: {     
    hideOnPageScroll: false,
    iosCenterTitle: false,
    closeByBackdropClick: true,
  },
  picker: {
    rotateEffect: true,
    //openIn: 'popover', 
  },
  popover: {
    closeByBackdropClick: true,
  },  
  on:{
    pageInit: function(e, page) {    
      //console.log(e+"-----"+page); 
    }
  },
  // Hide and show indicator during ajax requests
  onAjaxStart: function (xhr) {
    app.showIndicator();
  },
  onAjaxComplete: function (xhr) {
    app.hideIndicator();
  }
});
var base_url = 'http://oteqprojects.co.in/doorstep/';
var mainView = app.views.create('.view-main');
document.addEventListener("deviceready", checkStorage, false); 
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackKeyDown, false);

// --------------------------- C H E C K  I N T E R N E T  C O N N E C T I O N --------------------------- //
function checkConnection(){  
  var networkState = navigator.connection.type;
  if(networkState=='none'){  
      mainView.router.navigate('/internet/');   
  }
}
// -------------------------------------- C H E C K  S T O R A G E --------------------------------- //
function checkStorage(){
  checkConnection();  
  //alert("in checkStorage");
  var version=1;  
  /*$.ajax({
    url: base_url+'app_controller/chk_version/'+version, 
    success: function(result){ 
      //alert(result);
      if(result==0 && result!=""){
          app.dialog.confirm('A new update is available for Your Collector. Please update your app.', function () { 
                navigator.app.clearHistory(); 
                navigator.app.exitApp();
          });  
      }
  }});*/
  var session_pid = window.localStorage.getItem("session_pid");
  var session_cid = window.localStorage.getItem("session_cid");
  console.log(session_pid+"-----"+session_cid);
  if(session_pid!=null && session_cid==null){  
    mainView.router.navigate("/partner_dash/");
  }else if(session_cid!=null && session_pid==null){
    mainView.router.navigate("/customer_dash/");
  }else{
    mainView.router.navigate("/");
  }
}
function onBackKeyDown() {
  checkConnection(); 
  if(app.views.main.router.history.length==2 || app.views.main.router.url=='/'){
    app.dialog.confirm('Do you want to Exit ?', function () {
      navigator.app.clearHistory(); navigator.app.exitApp();
    });
  }else{ 
    $$(".back").click();
  } 
}
// -------------------------------------- DATA NAME : INDEX --------------------------------- //
var swiper;
$(document).on('page:init', '.page[data-name="index"]', function (e) {  
  /*$(".gotit").hide();
  swiper = new Swiper('.swiper-container', {
    parallax: true,
    autoHeight: true,
    setWrapperSize: true,
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true, 
      dynamicBullets: true,
    },
    observer: true,
    observeParents: true, 
  });    
  var totalSlides = swiper.slides.length-1;
  swiper.init(); 
  var sliderDiv='';
  swiper.on('slideChange', function () {
    var last_slide = swiper.realIndex;
    if(totalSlides == last_slide){      
      //$(".lastslide").html('<a class="link text-white text-uppercase" href="/login/">got it</a>');
      $(".gotit").show();
      $(".fnext").hide();
    }else{
      $(".gotit").hide();
      $(".fnext").show();
      //$(".lastslide").html('<a class="link text-white text-uppercase fnext" >next-1</a>');
    }
    swiper.init(); 
    $(".dynamic_toolbar").html(sliderDiv);
  });*/
});
$('.fnext').on('click', function(e) { 
  //alert("called");
  swiper.slideNext();
});
// -------------------------------------- DATA NAME : PARTNER REGISTER --------------------------------- //
$$(document).on('page:init', '.page[data-name="partner_register"]', function (e) { 
  $("#mobile").focus();
  checkConnection();      
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/getServingAreas',    
    success:function(res){
      var result = $.parseJSON(res);
      var serv_area = result.serving_areas;
      var serv_cat = result.serving_category;
      var serv_opt = '';
      serv_opt='<option value="">--- SELECT ---</option>';
      for(var i=0;i<serv_area.length;i++){
        var a_id = serv_area[i].a_id;
        var a_name = serv_area[i].a_name;
        serv_opt+='<option value="'+a_id+'">'+a_name+'</option>';
      }
      $("#serving_area").html(serv_opt);
      var cat_opt = '';
      cat_opt='<option value="">--- SELECT ---</option>';
      for(var j=0;j<serv_cat.length;j++){
        var c_id = serv_cat[j].c_id;
        var c_name = serv_cat[j].c_name;
        cat_opt+='<option value="'+c_id+'">'+c_name+'</option>';
      } 
      $("#serving_category").html(cat_opt); 
    }
  }); 
});
$$(document).on('page:init', '.page[data-name="partner_otpverify"]', function (page) {  
  checkConnection();
  //console.log(page.detail.route.params);
  var mobile_no = page.detail.route.params.mobile; 
  var pid = page.detail.route.params.pid;
  $("#hidd_mob").val(mobile_no);
  $("#hidd_pid").val(pid);
  $(".otp_txt").html('Your mobile number is already registered with Doorstep.Please enter and verify the OTP sent to your registered mobile number '+mobile_no+' by doorstep.');
});
function getServices(sc_id){
  checkConnection();
  app.dialog.preloader('Loading Services...');
  $.ajax({
    type:'POST',
    data:{'sc_id':sc_id} ,
    url:base_url+'APP/Appcontroller/getServices', 
    success:function(result){
      var json_serv = $.parseJSON(result);
      var serv = json_serv.services;
      var service_opt = '';
      service_opt='<option value="">--- SELECT ---</option>';
      for(var i=0;i<serv.length;i++){
        var s_id = serv[i].s_id;
        var s_name = serv[i].s_name;
        service_opt+='<option value="'+s_id+'">'+s_name+'</option>';
      }
      $("#service").html('<span class="text-left">'+service_opt+'</span>');
      //$("#serv_lbl").html("");   
      app.dialog.close();
    }
  });
}
function getJob(serv_id){
  checkConnection();
  app.dialog.preloader('Loading Jobs...');
  $.ajax({
    type:'POST',
    data:{'serv_id':serv_id},
    url:base_url+'APP/Appcontroller/getJobs', 
    success:function(job_result){
      var json_jobs = $.parseJSON(job_result);
      var job = json_jobs.jobs;
      var job_opt = '';
      //job_opt='<option value="">--- SELECT ---</option>';
      for(var i=0;i<job.length;i++){
        var j_id = job[i].j_id;
        var j_name = job[i].j_name;
        job_opt+='<option value="'+j_id+'">'+j_name+'</option>';
      }      
      $("#job").append(job_opt);
      app.dialog.close();
      //$("#job_lbl").html("");   
    }
  });
}
function partner_exists(mobile_no){
  //$("#hidd_mob").val(mobile_no);
  if(mobile_no!=''){
    if(mobile_no.length==10){
      $.ajax({
        type:'POST', 
        url:base_url+'APP/Appcontroller/partnerExistsChk',
        data:{'mobile':mobile_no},
        success:function(mob_res){        
          var json_msg = $.parseJSON(mob_res);
          var msg = json_msg.msg;
          //console.log(msg);
          var split_msg = msg.split("-");
          //console.log(split_msg);
          var spl_zero = split_msg[0];
          var spl_one = split_msg[1];          
          if(spl_zero=="exists"){ 
            var split_spl_one = spl_one.split("_");
            //console.log(split_spl_one);
            var p_id = split_spl_one[0];
            var spl_spl_one = split_spl_one[1];         
            app.dialog.alert("Mobile Number already exists!");  
            //mainView.router.navigate('/partner_otpverify/');              
            mainView.router.navigate('/partner_otpverify/'+spl_spl_one+'/'+p_id+'/');
          }else{}
        }
      });
    }else{}
  } 
}
function verify_otp(){
  checkConnection(); 
  app.preloader.show();
  var partner_otpverify_form = $(".partner_otpverify").serialize();
  var hidd_mob=$('input[name="hidd_mob"]').val();
  var hidd_pid=$('input[name="hidd_pid"]').val();
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/verifyOTP_partner',
    data:partner_otpverify_form,
    success:function(data){
      var datamsg = $.parseJSON(data);
      var v_msg = datamsg.v_msg;
      var status = datamsg.status;
      if(status=="Active"){
        app.dialog.alert(v_msg);
        mainView.router.navigate('/login/');
      }else if(status=="Inactive"){        
        var toastIcon = app.toast.create({
        icon: app.theme === 'ios' ? '<i class="f7-icons">multiply</i>' : '<i class="f7-icons">multiply</i>',
        text: v_msg,
        position: 'center',
        closeTimeout: 3000,
        });       
        app.preloader.hide(); 
        toastIcon.open();
        mainView.router.navigate('/partner_otpverify/'+hidd_mob+'/'+hidd_pid+'/');
      }
    }
  });
}
function register_part(){
  //alert("called");
  checkConnection(); 
  var i_mode = device.platform;
  var partner_register = $(".partner_register").serialize();
  //console.log(partner_register);
  var mobile = $('#mobile_partner').val();
  //var password = $('#pass').val();
  var password = $(".p_pass").val();
  var name = $('#name').val();
  var email = $('#email').val();
  var add_line1 = $('#add_line1').val();
  var add_line2 = $('#add_line2').val();
  var serving_area = $("#serving_area").val();
  var serving_category = $("#serving_category").val();
  var service = $("#service").val();
  var job = $("#job").val();
  if(!validateEmail(email) ) {
    //$("#emailerror").html("Invalid email address");
    app.dialog.alert("Invalid email address");
    return false;
  } 
  if(mobile==''){
    //$("#mobreq").html("Mobile is required");
    app.dialog.alert("Mobile is required");
    return false;
  }else if(password==''){
    //$("#passerror").html("Password is required");
    app.dialog.alert("Password is required");
    return false;
  }else if(name==''){
    //$("#name").html("Fullname is required");
    app.dialog.alert("Fullname is required");
    return false;
  }else if(email==''){
    //$("#email").html("Email is required");
    app.dialog.alert("Email is required");
    return false;
  }else if(add_line1==''){
    //$("#add_line1").html("Address line 1 is required");
    app.dialog.alert("Address line 1 is required");
    return false;
  }else if(add_line2==''){
    //$("#add_line2").html("Address line 2 is required");
    app.dialog.alert("Address line 2 is required");
    return false;
  }else if(serving_area==''){
    //$("#sareaerror").html("Select Serving Area");
    app.dialog.alert("Select Serving Area");
    return false;
  }else if(serving_category==''){
    //$("#scaterror").html("Select Serving Category");
    app.dialog.alert("Select Serving Category");
    return false;
  }else if(service==''){
    //$("#serverror").html("Select Service");
    app.dialog.alert("Select Service");
    return false;
  }else if(job==''){
    //$("#joberror").html("Select Job");
    app.dialog.alert("Select Job");
    return false; 
  }else{
    app.preloader.show();
    //console.log(partner_register);
    $.ajax({
      type:'POST', 
      url:base_url+'APP/Appcontroller/register_partner',
      data:partner_register+"&i_mode="+i_mode,
      success:function(int_result){
        var split_res = int_result.split("_");
        var db_mob = split_res[0];
        var pid = split_res[1];
        //alert(db_mob+"######"+pid);        
        var toastIcon = app.toast.create({
          icon: app.theme === 'ios' ? '<i class="f7-icons">checkmark_alt_circle</i>' : '<i class="f7-icons">checkmark_alt_circle</i>',
          text: 'Registered successfully.',
          position: 'center',
          closeTimeout: 2000,
        });
        app.preloader.hide();        
        toastIcon.open();   
        mainView.router.navigate('/partner_otpverify/'+db_mob+'/'+pid+'/');     
      }
    });
    //app.preloader.hide();
  }  
}
// -------------------------------------- DATA NAME : CUSTOMER REGISTER --------------------------------- //
$$(document).on('page:init', '.page[data-name="customer_register"]', function (e) { 
  checkConnection();
  $("#mobile").focus();
});
$$(document).on('page:init', '.page[data-name="customer_otpverify"]', function (page) {  
  checkConnection();
  //console.log(page.detail.route.params);
  var mobile_no = page.detail.route.params.mobile; 
  var cid = page.detail.route.params.cid;
  $("#hidd_mob").val(mobile_no);
  $("#hidd_cid").val(cid);
  $(".otp_txt").html('Your mobile number is already registered with Doorstep.Please enter and verify the OTP sent to your registered mobile number '+mobile_no+' by doorstep.');
});
function customer_exists(mobile_no){
  if(mobile_no!=''){
    if(mobile_no.length==10){
      $.ajax({
        type:'POST', 
        url:base_url+'APP/Appcontroller/customerExistsChk',
        data:{'mobile':mobile_no},
        success:function(mob_res){        
          var json_msg = $.parseJSON(mob_res);
          var msg = json_msg.msg;
          //console.log(msg);
          var split_msg = msg.split("-");
          console.log(split_msg);
          var spl_zero = split_msg[0];
          var spl_one = split_msg[1];          
          if(spl_zero=="exists"){ 
            var split_spl_one = spl_one.split("_");
            //console.log(split_spl_one);
            var c_id = split_spl_one[0];
            var spl_spl_one = split_spl_one[1];         
            app.dialog.alert("Mobile Number already exists!");  
            //mainView.router.navigate('/partner_otpverify/');              
            mainView.router.navigate('/customer_otpverify/'+spl_spl_one+'/'+c_id+'/');
          }else{}
        }
      });
    }else{} 
  } 
}
// -------------------------------------- DATA NAME : CUSTOMER DASHBOARD --------------------------------- //
function onDeviceReady(){
  //alert("onDeviceReady");
  //openLOC();
  //logOut();
  //navigator.geolocation.getCurrentPosition(onSuccess, onError);
  
}
function openLOC(){
  //alert("openLOC");
    cordova.plugins.diagnostic.isLocationEnabled(function(enabled){ //isLocationEnabled
  console.log("GPS location is " + (enabled ? "enabled" : "disabled"));
      if(!enabled){
        alert("Enabled GPS manually");
        cordova.plugins.diagnostic.switchToLocationSettings(onRequestSuccess,onRequestFailure);
         //mainView.loadPage("current-location.html");
      }else{
        alert("Location service is ON");        
        mainView.router.navigate("/customer_dash/");
      }
  }, function(error){
    console.error("The following error occurred: "+error);
  });   
}
function onRequestSuccess(success){
  //if(success){
    cordova.plugins.locationAccuracy.request(successCallback, errorCallback, accuracy);      
  //}
}  
function onRequestFailure(error){
   //if(error){
     alert(error.message);
   //}
}
/*function onSuccess(pos){
    if(pos){
      var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            alert("lat : " + lat + " lng : " + lng);
      mainView.router.navigate("/current-location/");
    }
}  
function onError(error){
   if(error){
     alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
   }
}*/

function successCallback(success){
  alert("in successCallback *******");
    //if(success){
      mainView.router.navigate("/customer_dash/");
    //}
} 
function errorCallback(error){
  alert("in errorCallback ############");
   //if(error){
     alert(error.message);
   //} 
}
/*function openLOC(){
  alert("openLOC");
    cordova.plugins.diagnostic.isLocationEnabled(function(enabled){ //isLocationEnabled
  console.log("GPS location is " + (enabled ? "enabled" : "disabled"));
      if(!enabled){
        alert("Enabled GPS manually");
        cordova.plugins.diagnostic.switchToLocationSettings(onRequestSuccess,onRequestFailure);
         //mainView.loadPage("current-location.html");
      }else{
        alert("Location service is ON");
        mainView.router.navigate("/current-location/");
      }
  }, function(error){
    console.error("The following error occurred: "+error);
  });   
}
$("#openclick").click(function(){
  getLatlong();
});
function onRequestSuccess(success){
    if(success){
      mainView.router.navigate("/current-location/");
    }
}  
function onRequestFailure(error){
   if(error){
     alert(error.message);
   }
}

/*function onDeviceReady(){   
  openLOC();  
}
function openLOC(){
  alert("openLOC");
  cordova.plugins.diagnostic.isLocationEnabled(function(enabled){ //isLocationEnabled
  alert("GPS location is " + (enabled ? "enabled" : "disabled"));
      if(!enabled){
        alert("Enabled GPS manually");
        cordova.plugins.diagnostic.switchToLocationSettings(onRequestSuccess,onRequestFailure);
         //mainView.loadPage("current-location.html");
      }else{
        alert("Location service is ON");
        navigator.geolocation.getCurrentPosition(onSuccess, onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
        //app.router.navigate("/current-location/");
      }
  }, function(error){
    console.error("The following error occurred: "+error);
  });   
}
function onSuccess(position){ 
    alert("in function");
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    cordova.plugins.locationAccuracy.request();
    var LatLong = new google.maps.LatLng(latitude,longitude);
    alert(LatLong);
    var mapOptions = {
        center : LatLong,
        zoom : 17,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}
function onError(error){
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}*/
$$(document).on('page:init', '.page[data-name="customer_dash"]', function (page) {  
  checkConnection();  
  initMap();
  //openLOC();  
  swiper = new Swiper('.swiper-container_dash', {
    parallax: true,
    //autoHeight: true,
    setWrapperSize: true,
    slidesPerView: 1,
    spaceBetween: 15,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    /*navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },*/
    pagination: {
      el: '.swiper-pagination',
      clickable: true, 
      dynamicBullets: true,
    },
    observer: true,
    observeParents: true, 
  });  

 // navigator.geolocation.getCurrentPosition(onSuccess, onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
  //navigator.geolocation.getCurrentPosition(onSuccess, onError);
});
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 40.731, lng: -73.997}
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  document.getElementById('submit').addEventListener('click', function() {
    geocodeLatLng(geocoder, map, infowindow);
  });
}

function geocodeLatLng(geocoder, map, infowindow) {
  var input = document.getElementById('latlng').value;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}
function onSuccess(position){
    alert("in function");
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var LatLong = new google.maps.LatLng(latitude,longitude);
    alert(LatLong);
    var geocoder = new google.maps.Geocoder();
    $("#map-canvas").html("*************"+geocoder);
    alert("geocoder.geocode "+geocoder.geocode);
    geocoder.geocode({ 'latLng': LatLong }, function (results, status) {
      alert("results "+results);
      alert("status ="+status);
        /*if (status == google.maps.GeocoderStatus.OK) { 
            if (results[1]) {
                alert("Location: " + results[1].formatted_address);
            }
        }*/
        if (status == google.maps.GeocoderStatus.OK) {
                  if (results[0]) {

                      var address = "", city = "", state = "", zip = "", country = "", formattedAddress = "";
                      var lat;
                      var lng;

                      for (var i = 0; i < results[0].address_components.length; i++) {
                          var addr = results[0].address_components[i];
                          // check if this entry in address_components has a type of country
                          if (addr.types[0] == 'country')
                              country = addr.long_name;
                          else if (addr.types[0] == 'street_address') // address 1
                              address = address + addr.long_name;
                          else if (addr.types[0] == 'establishment')
                              address = address + addr.long_name;
                          else if (addr.types[0] == 'route')  // address 2
                              address = address + addr.long_name;
                          else if (addr.types[0] == 'postal_code')       // Zip
                              zip = addr.short_name;
                          else if (addr.types[0] == ['administrative_area_level_1'])       // State
                              state = addr.long_name;
                          else if (addr.types[0] == ['locality'])       // City
                              city = addr.long_name;
                      }


                      if (results[0].formatted_address != null) {
                          formattedAddress = results[0].formatted_address;
                      }

                      //debugger;

                      var location = results[0].geometry.location;

                      lat = location.lat;
                      lng = location.lng;

                      alert('City: '+ city + '\n' + 'State: '+ state + '\n' + 'Zip: '+ zip + '\n' + 'Formatted Address: '+ formattedAddress + '\n' + 'Lat: '+ lat + '\n' + 'Lng: '+ lng);

                  }

              }
    });

    var mapOptions = {
        center : LatLong,
        zoom : 17,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}
function onError(error){
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}
/*function openLOC(){
  alert("openLOC"); 
//alert(cordova.plugins.diagnostic.enableDebug());
//cordova.plugins.diagnostic.enableDebug();
    cordova.plugins.diagnostic.isLocationEnabled(function(enabled){ //isLocationEnabled
  alert("GPS location is " + (enabled ? "enabled" : "disabled"));
      if(!enabled){
        alert("Enabled GPS manually");
        cordova.plugins.diagnostic.switchToLocationSettings(onRequestSuccess,onRequestFailure);
         //mainView.loadPage("current-location.html");
      }else{
        alert("Location service is ON");
        //app.router.navigate("/current-location/");
        navigator.geolocation.getCurrentPosition(onSuccess, onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
      }
  }, function(error){
    console.error("The following error occurred: "+error);
  });   
}
function onRequestSuccess(success){
    if(success){
      //app.router.navigate("/current-location/");
      alert("success");
    }
}  
function onRequestFailure(error){
   if(error){
     alert(error.message);
   }
}
function onSuccess(position){
    alert("in function");
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var LatLong = new google.maps.LatLng(latitude,longitude);
    alert(LatLong);
    var mapOptions = {
        center : LatLong,
        zoom : 17,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}
function onError(error){
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}*/
/*var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };
     cordova.plugins.locationAccuracy.request();
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }*/
// -------------------------------------- DATA NAME : PARTNER DASHBOARD --------------------------------- //
$$(document).on('page:init', '.page[data-name="partner_dash"]', function (page) {  
  checkConnection();
});
// -------------------------------------- DATA NAME : PARTNER DASHBOARD --------------------------------- //
function register_cust(){
  checkConnection(); 
  var i_mode = device.platform;
  var customer_register = $(".customer_register").serialize();
  //var mobile = $('#mobile_no').val();
  var mobile = $("#mobile_cust").val();
  //var password = $('#pass').val();
  var password = $(".c_pass").val();
  var name = $('#name').val();
  var email = $('#email').val();
  var add_line1 = $('#add_line1').val();
  if(!validateEmail(email)){
    //$("#emailerror").html("Invalid email address");
    app.dialog.alert("Invalid email address");
    return false;
  } 
  if(mobile==''){
    //$("#mobreq").html("Mobile is required");
    app.dialog.alert("Mobile is required");
    return false;
  }else if(password==''){
    //$("#passerror").html("Password is required");
    app.dialog.alert("Password is required");
    return false;
  }else if(name==''){
    //$("#name").html("Fullname is required");
    app.dialog.alert("Fullname is required");
    return false;
  }else if(email==''){
    //$("#email").html("Email is required");
    app.dialog.alert("Email is required");
    return false;
  }else if(add_line1==''){
    //$("#add_line1").html("Address line 1 is required");
    app.dialog.alert("Address line 1 is required");
    return false;
  }else{
    app.preloader.show();
    $.ajax({
      type:'POST', 
      url:base_url+'APP/Appcontroller/register_customer',
      data:customer_register+"&i_mode="+i_mode,
      success:function(int_result){
        //if(int_result=="inserted"){
          var split_cres = int_result.split("_");
          var cmob_db = split_cres[0];
          var ccid = split_cres[1];
          var toastIcon = app.toast.create({
            icon: app.theme === 'ios' ? '<i class="f7-icons">checkmark_alt_circle</i>' : '<i class="f7-icons">checkmark_alt_circle</i>',
            text: 'Registered successfully.',
            position: 'center',
            closeTimeout: 2000,
          });
          app.preloader.hide();
          toastIcon.open();
          mainView.router.navigate('/customer_otpverify/'+cmob_db+'/'+ccid+'/');
        /*}else if(int_result=="not"){
          app.dialog.alert("Error Inserting Data");
          mainView.router.navigate('/customer_register/');
        } */       
      }
    });
    //app.preloader.hide();
  }  
}
function verifycust_otp(){
  checkConnection();   
  app.preloader.show();
  var customer_otpverify_form = $(".customer_otpverify").serialize();
  var hidd_mob=$('input[name="hidd_mob"]').val();
  var hidd_cid=$('input[name="hidd_cid"]').val();
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/verifyOTP_customer',
    data:customer_otpverify_form,
    success:function(data){
      var datamsg = $.parseJSON(data);
      var v_msg = datamsg.v_msg;
      var status = datamsg.status;
      if(status=="Active"){
        app.dialog.alert(v_msg);
        mainView.router.navigate('/login/');
      }else if(status=="Inactive"){        
        var toastIcon = app.toast.create({
        icon: app.theme === 'ios' ? '<i class="f7-icons">multiply</i>' : '<i class="f7-icons">multiply</i>',
        text: v_msg,
        position: 'center',
        closeTimeout: 3000,
        });        
        toastIcon.open();
        mainView.router.navigate('/customer_otpverify/'+hidd_mob+'/'+hidd_cid+'/');
      }
    }
  });
  app.preloader.hide();
}
// -------------------------------------- LOGIN CHECK -------------------------------------- //
function logincheck(){
  checkConnection();    
  var login_form = $(".login_form").serialize();
  //alert(login_form);
  var mobile_num = $("#mob_login").val();
  var u_pass = $(".l_pass").val();
  //alert(mobile_num+"------"+u_pass);
  if(mobile_num==''){
    //alert("mobile_num is empty");
    $("#passerror").html("");
    //app.dialog.alert("Mobile number is required.");
    $("#umoberror").html("Mobile number is required.");    
    return false;
  }else if(u_pass==''){
    //alert("password is empty");
    $("#umoberror").html("");
    //app.dialog.alert("Password is required");
    $("#passerror").html("Password is required.");
    return false;
  }else{
    //$("#umoberror").html("");
    //$("#passerror").html("");
    //alert("ELSE");
    //$("#umoberror").html("");
    //$("#passerror").html("");
    //alert(base_url+'APP/Appcontroller/authenticateUser');
    //app.preloader.show();
    $.ajax({
      type:'POST', 
      url:base_url+'APP/Appcontroller/authenticateUser',
      data:login_form,  
      success:function(authRes){
        //alert("succ "+authRes);
        var result = $.parseJSON(authRes);
        //console.log(result);
        var parse_authmsg = result.auth_msg;
        var user_session = result.user_session[0];
        //alert(parse_authmsg);
        //alert("user_session "+user_session);
        //console.log(user_session);        
        if(parse_authmsg=="p_success"){
          // partner dashboard //
          //alert("partner dashboard");
          mainView.router.navigate("/partner_dash/");
          window.localStorage.setItem("session_pid",result.user_session[0].p_id);
          window.localStorage.setItem("session_pname",result.user_session[0].p_name);
          window.localStorage.setItem("session_pphone",result.user_session[0].p_phone);
          window.localStorage.setItem("session_pemail",result.user_session[0].p_email);
          window.localStorage.setItem("session_pcreated",result.user_session[0].p_created_on);      
        }else if(parse_authmsg=="c_success"){  
          //alert("customer_dash");
          mainView.router.navigate("/customer_dash/");
          window.localStorage.setItem("session_cid",result.user_session[0].c_id);
          window.localStorage.setItem("session_cname",result.user_session[0].c_name);
          window.localStorage.setItem("session_cphone",result.user_session[0].c_phone);
          window.localStorage.setItem("session_cemail",result.user_session[0].c_email);
          window.localStorage.setItem("session_ccreated",result.user_session[0].c_created_on); 
        }else if(parse_authmsg=="Inc_pass"){
          //alert("Incorrect Password!");
          app.dialog.alert("Incorrect Password!");
        }else if(parse_authmsg=="Inc_mobpass"){
          //alert("Mobile no or password Incorrect");
          app.dialog.alert("Mobile no or password Incorrect");
        }
      }
    });
    //app.preloader.hide();
  }
}

// -------------------------------------- VALIDATIONS -------------------------------------- //
function isNumber(evt,number){
  if(number.length>10){    
    app.dialog.alert("Mobile number should be of 10 digits."); 
    $(".mobile_no").val("");   
    //return false;
  }
  /*evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
      //app.dialog.alert("Only numeric values are allowed for mobile");
  }
  return true; */
}
function isText(event){
  var key = event.keyCode;
  if (key >= 48 && key <= 57) {
      return false;
  }
  return true; 
}
function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( email );
} 
function pass_length(pwd){
  if(pwd.length <= 5 || pwd.length > 20){
    app.dialog.alert("Password must be more than 6 and less than 20 characters long");
    return false;
  }
}  
function resendOTP_partner(){
  app.preloader.show();
  var hidd_mob=$('input[name="hidd_mob"]').val();
  var hidd_pid=$('input[name="hidd_pid"]').val();
  //var hidd_cid=$('input[name="hidd_cid"]').val();
  //if(hidd_pid!=''){
   // var form_data = $(".partner_otpverify").serialize();
  //}
  //if(hidd_cid!=''){
  //  var form_data = $(".customer_otpverify").serialize();
  //}  
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/resendOTPPartner',
    data:{'mobile':hidd_mob,'hidd_pid':hidd_pid},
    //data:form_data,
    success:function(data){
      var json = $.parseJSON(data);
      var sent_json = json.sent;
      if(sent_json==1){
        var toastIcon = app.toast.create({
          text: 'Please check your registered mobile number '+hidd_mob+' to receive the resended OTP',
          position: 'center',
          closeTimeout: 10000,
        });        
        toastIcon.open();
      }  
      app.preloader.hide();    
    } 
  });
}
function resendOTP_customer(){
  app.preloader.show();
  var hidd_mob=$('input[name="hidd_mob"]').val();  
  var hidd_cid=$('input[name="hidd_cid"]').val();  
  //  var form_data = $(".customer_otpverify").serialize();
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/resendOTPCustomer',
    data:{'mobile':hidd_mob,'hidd_cid':hidd_cid}, 
    //data:form_data,
    success:function(data){
      var json = $.parseJSON(data);
      var sent_json = json.sent;
      if(sent_json==1){
        var toastIcon = app.toast.create({
          text: 'Please check your registered mobile number '+hidd_mob+' to receive the resended OTP',
          position: 'center',
          closeTimeout: 10000,
        });        
        toastIcon.open();
        app.preloader.hide();
      }        
    } 
  });
}
function showeye(){
  $(".showpass span").removeClass("display-none");
  $(".showpass span").addClass("display-block"); 
  /*var pass = $(".pass").val();
  console.log(pass+"^^^");
  if(pass!=''){
    $(".showpass span").removeClass("display-none");
    $(".showpass span").addClass("display-block");
  }else{
    $(".showpass span").removeClass("display-block");
    $(".showpass span").addClass("display-none");
  }*/
}
function showpassword(show){
  //alert(show);
  if(show=='show'){
    //$(".showpass span").html("");
    $(".pass").attr('type','text');    
    $(".showpass").html('<span class="f7-icons text-white fs-18" onclick="showpassword('+"'"+"hide"+"'"+')">eye_slash</span>');
  }else if(show=='hide'){
    //$(".showpass span").html("");
    $(".pass").attr('type','password');
    $(".showpass").html('<span class="f7-icons text-white fs-18" onclick="showpassword('+"'"+"show"+"'"+')">eye</span>');
  }
}
function showletter(show){
  if(show=='show'){
    $("#eyeicon").html("");
    $("#otp").attr('type','text');    
    $("#eyeicon").html('<i class="f7-icons text-white" onclick="showletter('+"'"+"hide"+"'"+')">eye_slash</i>');
  }else if(show=='hide'){
    $("#eyeicon").html("");
    $("#otp").attr('type','password');
    $("#eyeicon").html('<i class="f7-icons text-white" onclick="showletter('+"'"+"show"+"'"+')">eye</i>');
  }
}

// --------------------------------------------- L O G O U T ------------------------------------------ //
function logOut(){
  checkConnection();
  window.localStorage.removeItem("session_pid"); 
  window.localStorage.removeItem("session_pname"); 
  window.localStorage.removeItem("session_pphone"); 
  window.localStorage.removeItem("session_pemail"); 
  window.localStorage.removeItem("session_pcreated"); 
  window.localStorage.removeItem("session_cid"); 
  window.localStorage.removeItem("session_cname"); 
  window.localStorage.removeItem("session_cphone"); 
  window.localStorage.removeItem("session_cemail"); 
  window.localStorage.removeItem("session_ccreated"); 
}