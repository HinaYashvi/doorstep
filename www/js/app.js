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

// ----------------------- C H E C K  I N T E R N E T  C O N N E C T I O N ------------------------ //
function checkConnection(){  
  var networkState = navigator.connection.type;
  if(networkState=='none'){  
      mainView.router.navigate('/internet/');   
  }
}
// ----------------------- D E V I C E  R E A D Y ------------------------ //
function onDeviceReady(){}
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
  //console.log(session_pid+"-----"+session_cid);
  if(session_pid!=null && session_cid==null){  
    mainView.router.navigate("/partner_dash/");
  }else if(session_cid!=null && session_pid==null){
    mainView.router.navigate("/customer_dash/");
    //mainView.router.navigate("/location_on/");
  }else{ 
    mainView.router.navigate("/");
  } 
}
function onBackKeyDown() {
  checkConnection(); 
  if(app.views.main.router.history.length==2 || app.views.main.router.url=='/'){
    app.dialog.confirm('Do you want to Exit ?', function () {
      navigator.app.clearHistory(); 
      navigator.app.exitApp();
    });
  }else{ 
    $$(".back").click();
  } 
}
// -------------------------------------- DATA NAME : INDEX --------------------------------- //
var swiper;
$(document).on('page:init', '.page[data-name="index"]', function (e) {  
  $(".gotit").hide();
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
    /*navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },*/ 
    /*a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },*/
    pagination: {
      el: '.swiper-pagination',
      clickable: true, 
      dynamicBullets: true,
    },
    observer: true,
    observeParents: true, 
  });    
  var totalSlides = swiper.slides.length-1;
  //swiper.init(); 
  var sliderDiv='';
  swiper.on('slideChange', function () {
    //console.log("slideChange called");
    var last_slide = swiper.realIndex;
    //alert(last_slide);
    if(totalSlides == last_slide){      
      //$(".lastslide").html('<a class="link text-white text-uppercase" href="/login/">got it</a>');
      $(".gotit").show();
      $(".fnext").hide();
    }else{
      $(".gotit").hide();
      $(".fnext").show();
      //$(".lastslide").html('<a class="link text-white text-uppercase fnext" >next-1</a>');
    }
    //swiper.init();  
    $(".dynamic_toolbar").html(sliderDiv);
  });
});  
$('.fnext').on('click', function(e) { 
  //alert("called");
  swiper.slideNext();
});
// ----------------------------------- DATA NAME : PARTNER REGISTER --------------------------------- //
$$(document).on('page:init', '.page[data-name="partner_register"]', function (e) { 
  $("#mobile").focus();
  checkConnection();      
  $.ajax({
    type:'POST', 
    //url:base_url+'APP/Appcontroller/getServingAreas',   
    url:base_url+'APP/Appcontroller/getServingCity',   
    success:function(res){
      var result = $.parseJSON(res);
      //var serv_area = result.serving_areas;
      var serv_city = result.serving_city;
      var serv_cat = result.serving_category;
      var serv_opt = '';
      serv_opt='<option value="">--- SELECT CITY ---</option>';
      for(var i=0;i<serv_city.length;i++){
        var city_id = serv_city[i].city_id;
        var city_name = serv_city[i].city_name;
        serv_opt+='<option value="'+city_id+'">'+city_name+'</option>';
      }
      $("#serving_city").html(serv_opt);
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
          }else if(spl_zero=='Active'){ 
            app.dialog.alert('Try to login with Doorstep you are an active user.'); 
            mainView.router.navigate('/login/'); 
          }else{
            //app.dialog.alert(msg); 
            //mainView.router.navigate('/partner_register/');
          }
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
        app.preloader.hide();  
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
  //var add_line2 = $('#add_line2').val();
  var serving_city = $("#serving_city").val();
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
  }/*else if(add_line2==''){
    //$("#add_line2").html("Address line 2 is required");
    app.dialog.alert("Address line 2 is required");
    return false;
  }*/
  else if(serving_city==''){
    //$("#sareaerror").html("Select Serving Area");
    app.dialog.alert("Select Serving City");
    return false;
  }  else if(serving_area==''){
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
  $.ajax({
    type:'POST', 
    //url:base_url+'APP/Appcontroller/getServingAreas',    
    url:base_url+'APP/Appcontroller/getServingCity',    
    success:function(res){
      var result = $.parseJSON(res);
      var serv_city = result.serving_city;
      var serv_opt = '';
      serv_opt='<option value="">--- SELECT CITY ---</option>';
      for(var i=0;i<serv_city.length;i++){
        var city_id = serv_city[i].city_id;
        var city_name = serv_city[i].city_name;
        serv_opt+='<option value="'+city_id+'">'+city_name+'</option>';
      }
      $("#serving_city").html(serv_opt);
    }
  });
});
function getservingArea(cityid){
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/getServingAreas',  
    data:{'city_id':cityid},
    success:function(res_area){
      var area_parse = $.parseJSON(res_area);
      var serv_area = area_parse.serving_areas;
      var servar = '';
      servar='<option value="">--- SELECT AREA ---</option>';
      for(var i=0;i<serv_area.length;i++){
        var a_id = serv_area[i].a_id;
        var a_name = serv_area[i].a_name;
        servar+='<option value="'+a_id+'">'+a_name+'</option>';
      }
      $("#serving_area").html(servar);
    }
  });
}
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
          //console.log(split_msg);
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
          }else if(spl_zero=='Active'){ 
            app.dialog.alert('Try to login with Doorstep you are an active user.'); 
            mainView.router.navigate('/login/'); 
          }else{
            //app.dialog.alert(msg); 
            //mainView.router.navigate('/customer_register/');
          }
        }
      });
    }else{} 
  } 
}
// ---------------------------------- DATA NAME : CUSTOMER DASHBOARD --------------------------------- //

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
function clicked_me(){
  var active_tab = $(".tab-active").attr('id');
  $("#hidd_proftab").val(active_tab);
  //alert("tab-active "+active_tab); 
}
$$(document).on('page:init', '.page[data-name="customer_dash"]', function (page) { 
  //logOut(); 
  checkConnection();  
  var session_cid = window.localStorage.getItem("session_cid");  
  var session_current_city = window.localStorage.getItem("session_current_city");
  if(session_current_city!=''){
    alert("session_current_city ^^^ customer dashboard "+session_current_city);
  }
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
  //currentCity();  // uncomment this for apk //



  //navigator.geolocation.getCurrentPosition(onSuccess, onError);
  app.preloader.show();
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/getServiceCategory',
    success:function(cat_result){
      var cat = $.parseJSON(cat_result);
      var ser_cat = cat.ser_cat;
      var cat_blocks='';
      for(var i=0;i<ser_cat.length;i++){
        var cat_id = ser_cat[i].c_id; 
        var c_name = ser_cat[i].c_name;
        var c_img_path = ser_cat[i].c_img_path;
        cat_blocks+='<div class="col-33 text-center elevation_blocks elevation-9" onclick="getcatServices('+cat_id+','+"'"+c_img_path+"'"+')"><img src="'+base_url+c_img_path+'" class="block_img lazy lazy-fade-in demo-lazy" height="50" width="50"/><div class="fs-12">'+c_name+'</div></div>';
      }
      $(".catblocks").html(cat_blocks);
    }
  });


  var button_active=$(".button-active").val();
  //alert(button_active+"button_active");
  var divname="pen_orders";
  getBookingbyStatus(button_active,divname);
  /*$.ajax({
    type:'POST', 
    data:{'session_cid':session_cid,'button_active':button_active},
    url:base_url+'APP/Appcontroller/getMyBookings',
    success:function(book_result){
      var book_res = $.parseJSON(book_result);
      var cust = book_res.cust;
      var order = book_res.order;
      var order_cnts = book_res.order_cnts;
      var order_cnts_pen = book_res.order_cnts_pen;
      var order_cnts_start = book_res.order_cnts_start;
      var order_cnts_fin =book_res.order_cnts_fin;

      //console.log(order_cnts_pen+"----"+order_cnts_start+"*****"+order_cnts_fin);
      var c_id = cust.c_id;      
      //console.log(order_cnts);
      var ord_list='';
      $(".bookings_tot").html(order_cnts);
      $(".pen_badge").html(order_cnts_pen);
      $(".start_badge").html(order_cnts_start);
      $(".fin_badge").html(order_cnts_fin);
      if(order.length==0){
        ord_list+='<li class="text-red fw-500 text-capitalize">No bookings available.</li>';
      }else{
        for(var i=0;i<order.length;i++){
          var ord_no = order[i].o_num;
          var o_code = order[i].order_code;
          var order_status = order[i].order_status;
          var s_name = order[i].s_name;
          var j_name = order[i].j_name;
          var p_name = order[i].p_name;
          var date_time = order[i].date_time;
          var rep_dt = date_time.replace("`"," ");
          var finaldt = rep_dt.replace("`","");
          var acpt_status = order[i].acpt_status;
          var p_phone = order[i].p_phone;
          var p_email = order[i].p_email;  
          var request_day = order[i].request_day;   
          var review_count = order[i].review_count;
          var order_status = order[i].order_status;
          var time = order[i].time;   
          var part_reschedule_req = order[i].part_reschedule_req;
          var acpt_id = order[i].acpt_id;
          var o_id = order[i].o_id;
          var change_address = order[i].change_address;

          if(order_status==0){
            var status_cls='pending'; 
            var status_txt='Pending';
            var rev_btn='';
            if(change_address!=null && change_address==''){ 
              var change_loc='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button><div class="locchange_form_'+i+' list display-none w-100"><ul class="w-100"><li class="item-content item-input item-input-outline w-100 row"><div class="item-inner"><div class="item-title item-label l-0">Change Location<br/><span class="text-red fw-600 fs-9">NOTE : Address can be change if partner will accept your request.</span></div><div class="item-input-wrap"><input type="text" name="name"><span class="input-clear-button"></span></div></div><button class="col-33 button fs-10 mb-5 button-small seg_btn">Change</button><button class="col-33 button button-outline fs-10 mr-15 mb-5 button-small seg-outline" onclick="showLocbtn('+i+')">Cancel</button></ul></div>';  
            }else{
              var change_loc='';  
            } 
          }else if(order_status==1){
            var status_cls='started';
            var status_txt='Started';
            var rev_btn='';
            var change_loc='';
          }else{
            var status_cls='finished';
            var status_txt='Finished';
            if(review_count==0){
              var rev_btn='<button class="col-33 button button-small button-fill fs-10 for_green" ><i class="f7-icons fs-12 mr-5">star_fill</i>Rate</button>';
            }else{
              var rev_btn='';
            }
            
            var change_loc='';
          } 
          if(order_status==0){
            if(part_reschedule_req!=null || part_reschedule_req==1){
              var req_res = '<button class="col-75 button button-small button-fill fs-10 for_green" ><i class="f7-icons fs-12 mr-5">arrow_clockwise</i>Reschedule Request</button>';
            }else{
              var req_res = '';
            }
          }else{
            var req_res = '';
          }
          if(acpt_status==0){
            var accept_status='<span class="pending fs-10 mt-5">Not accepted yet</span>';
          }else{
            var accept_status=status_txt+ ' By '+p_name+'<br/><i class="f7-icons fs-12 text-grey mr-5">phone_fill</i><span class="fs-10">'+p_phone+'</span><br/><i class="f7-icons fs-12 text-grey mr-5">envelope_fill</i><span class="fs-10">'+p_email+'</span>';
          }
          //ord_list+='<li class="accordion-item lightblue mb-5"><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title text-blue fw-500 fs-14"><span class="mr-5">'+ord_no+'</span><!--span class="text-red fw-500 fs-12">(code: '+o_code+')</span--></div><span class="float-right fs-10 fw-600 '+status_cls+'">'+status_txt+'</span></div></a><div class="accordion-item-content nobg"><div class="block"><div class="row"><div class="col-50 mt-2 fs-12"><span class="fw-500">Order code: '+o_code+'</span><br/><span class="fw-600 text-blue bord-bot-blue">'+s_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">circle_fill</i>'+j_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">calendar_fill</i>'+finaldt+'<span class="text-capitalize badge fs-10 ml-5"> '+request_day+'</span></span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">timer_fill</i>'+time+'</span></div><div class="col-50 mt-2 fs-12"><span class="fw-500">'+accept_status+'</span></div></div></div><div class="action_line block"><div class="row"><span class="float-left">'+change_loc+req_res+'</span><span class="float-right">'+rev_btn+'</span></div></div></div></li>'; 

          ord_list+='<li class="accordion-item lightblue mb-5"><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title text-blue fw-500 fs-14"><span class="mr-5">'+ord_no+'</span><!--span class="text-red fw-500 fs-12">(code: '+o_code+')</span--></div><span class="float-right fs-10 fw-600 '+status_cls+'">'+status_txt+'</span></div></a><div class="accordion-item-content nobg"><div class="block"><div class="row"><div class="col-50 mt-2 fs-12"><span class="fw-500">Order code: '+o_code+'</span><br/><span class="fw-600 text-blue bord-bot-blue">'+s_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">circle_fill</i>'+j_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">calendar_fill</i>'+finaldt+'<span class="text-capitalize badge fs-10 ml-5"> '+request_day+'</span></span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">timer_fill</i>'+time+'</span></div><div class="col-50 mt-2 fs-12"><span class="fw-500">'+accept_status+'</span></div></div></div>';
          if(change_loc!='' || req_res!=''){
            ord_list+='<div class="action_line" id="action_line_'+i+'"><div class="row"><span class="float-left leftdiv_'+i+'">'+change_loc+req_res+'</span></div></div>';
          }
          if(rev_btn!=''){
            ord_list+='<div class="action_line"><div class="row"><span class="float-right">'+rev_btn+'</span></div></div>';
          } 
          ord_list+='</div></li>';
        } 
      }  
      $("#pen_orders").html(ord_list);
    }
  });*/
  
  
  $.ajax({
    type:'POST', 
    data:{'session_cid':session_cid},
    url:base_url+'APP/Appcontroller/userProfile',
    success:function(prof_result){
      var prf = $.parseJSON(prof_result);
      var profile = prf.profile;
      //console.log(profile);
      var cid = profile[0].c_id;
      //alert(cid);
      var nm_fltr = (profile[0].c_name.charAt(0));
      $(".nmfltr").html(nm_fltr);
      var c_name = profile[0].c_name;
      var c_email = profile[0].c_email;
      var c_phone = profile[0].c_phone;
      var c_addr = profile[0].c_addr;
      var a_id = profile[0].a_id;
      var city_id = profile[0].city_id;
      var c_created_on = profile[0].c_created_on;
      $(".cname").html(c_name);
      $(".email_icon").html('<i class="f7-icons fs-18">envelope_fill</i>');
      $(".cemail").html(c_email);

      $(".phone_icon").html('<i class="f7-icons fs-18">phone_fill</i>');
      $(".cphone").html(c_phone);

      $(".addr_icon").html('<i class="f7-icons fs-18">placemark_fill</i>');
      $(".caddr").html(c_addr);

      $(".lock_icon").html('');
      $(".changepass").html('<a href="/customer_changepass/" class="text-red fw-600 text-center">Change Password <i class="f7-icons fs-18">lock_fill</i></a>');

      $.ajax({
        type:'POST', 
        data:{'a_id':a_id,'city_id':city_id},
        url:base_url+'APP/Appcontroller/userAreaCity',
        success:function(areacity){
          var parsearea = $.parseJSON(areacity);
          var area = parsearea.area;
          var city = parsearea.city;
          //console.log(area);
          //console.log(city);
          var carea = area[0].a_name;
          console.log("****"+carea);
          var ccity = city[0].city_name;
          $(".area_icon").html('<i class="f7-icons fs-18">map_pin_ellipse</i>');
          $(".carea").html(carea);

          $(".city_icon").html('<i class="f7-icons fs-18">location_circle_fill</i>');
          $(".ccity").html(ccity);
          app.preloader.hide();
        }
      });
    }
  });   
});
function getBookingbyStatus(button_active,divname){
  checkConnection();  
  app.preloader.show();
  var session_cid = window.localStorage.getItem("session_cid");  
  $.ajax({
    type:'POST', 
    data:{'session_cid':session_cid,'button_active':button_active},
    url:base_url+'APP/Appcontroller/getMyBookings',
    success:function(book_result){
      var book_res = $.parseJSON(book_result);
      var cust = book_res.cust;
      var order = book_res.order;
      var order_cnts = book_res.order_cnts;
      var order_cnts_pen = book_res.order_cnts_pen;
      var order_cnts_start = book_res.order_cnts_start;
      var order_cnts_fin =book_res.order_cnts_fin;

      //console.log(order_cnts_pen+"----"+order_cnts_start+"*****"+order_cnts_fin);
      var c_id = cust.c_id;      
      console.log(order);
      var ord_list=''; 
      $(".bookings_tot").html(order_cnts);
      $(".pen_badge").html(order_cnts_pen);
      $(".fin_badge").html(order_cnts_start);
      $(".start_badge").html(order_cnts_fin);
      if(order.length==0){
        ord_list+='<div class="block fs-12 text-red fw-500 text-capitalize">No bookings available.</div>';
      }else{
        for(var i=0;i<order.length;i++){
          var ord_no = order[i].o_num;
          var o_code = order[i].order_code;
          var order_status = order[i].order_status;
          var s_name = order[i].s_name;
          var j_name = order[i].j_name;
          var p_name = order[i].p_name;
          var date_time = order[i].date_time;
          var rep_dt = date_time.replace("`"," ");
          var finaldt = rep_dt.replace("`","");
          var acpt_status = order[i].acpt_status;
          var p_phone = order[i].p_phone;
          var p_email = order[i].p_email;  
          var request_day = order[i].request_day;   
          var review_count = order[i].review_count;
          var order_status = order[i].order_status;
          var time = order[i].time;   
          var part_reschedule_req = order[i].part_reschedule_req;
          var acpt_id = order[i].acpt_id;
          var o_id = order[i].o_id;
          var address = order[i].address;
          var change_address = order[i].change_address;
          var change_add_status = order[i].change_add_status;
          var btn_loc='';
          var loc_apprv='';
          //console.log("acpt_status "+acpt_status+"******* change_address "+change_address+"!!!!!!!!! change_add_status "+ change_add_status);

          if(order_status==0){
            var status_cls='pending'; 
            var status_txt='Pending';
            var reviewbtn='';
            //$("#action_line_"+i).removeClass("display-block");
            //$("#action_line_"+i).addClass("display-none");
            if(part_reschedule_req==1){
              //$("#action_line_"+i).removeClass("display-none");
              //$("#action_line_"+i).addClass("display-block");
              var req_res = '<span class="col-75 fw-600 fs-10 mt-2" ><i class="f7-icons fs-12 mr-5">arrow_clockwise</i>Requested for reschedule </span>';
            }else if(part_reschedule_req!=1){
              //$("#action_line_"+i).removeClass("display-block");
              //$("#action_line_"+i).addClass("display-none");
              var req_res='';
            } 

            if(acpt_status==0){
              //console.log(i+"if -----"+acpt_status);
              var patner_det='<span class="pending fs-10 mt-5">Not accepted yet</span>';
              var thumb='';
              //$("#action_line_"+i).removeClass("display-block");
              //$("#action_line_"+i).addClass("display-none");
              
            }else if(acpt_status==1){              
              var patner_det=status_txt+ ' By '+p_name+'<br/><i class="f7-icons fs-12 text-grey mr-5">phone_fill</i><span class="fs-10">'+p_phone+'</span><br/><i class="f7-icons fs-12 text-grey mr-5">envelope_fill</i><span class="fs-10">'+p_email+'</span>';
              var thumb='<i class="f7-icons text-blue fs-14">hand_thumbsup_fill</i>';
              /*if(change_address!='' && change_add_status==1){                
                //$("#action_line_"+i).removeClass("display-none");
                //$("#action_line_"+i).addClass("display-block");
                btn_loc+='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>';      
              }else if(change_address=='' && change_add_status==0){                
                //$("#action_line_"+i).removeClass("display-block");
                //$("#action_line_"+i).addClass("display-none");
                btn_loc+='';                
              }*/
              /*if((change_address!=null || change_address!='') && change_add_status==0){                 
                 btn_loc+='<button class="col-60 button button-small button-fill loc_btn submitbtn fs-10 display-block reqsent_'+i+'"><i class="f7-icons fs-13 mr-5">checkmark_alt</i>Location Request Sent </button>'; 
                }
*/ 
              //console.log(i+"@@@@@@@@@@@@@@@@@@@@@"+change_add_status);
              if((change_address!='' && change_add_status==1) || (address!='' && change_add_status!=1 && (change_address=='' || change_address==null))){
                /*btn_loc+='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>'; 
                if((change_address!=null || change_address!='') && change_add_status==1){
                btn_loc+='<button class="col-66 button button-small button-fill loc_btn submitbtn fs-10 display-block w-100 mr-5" id="seal_'+i+'"><i class="f7-icons fs-13 text-red mr-5">checkmark_seal_fill</i>Location approved</button>';
                }*/
                //console.log(i+"^^^^^^^"+change_add_status);
                if((address!='' && change_add_status!=1 && (change_address=='' || change_address==null))){
                  //console.log(i+"if"+change_add_status);
                  btn_loc+='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>';
                  loc_apprv+='';
                }else{  
                  //console.log(i+"else"+change_add_status);
                  if(change_add_status==1){
                    btn_loc+='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>';
                    //btn_loc+='<button class="col-66 button button-small button-fill loc_btn submitbtn fs-10 display-block w-100 mr-5" id="seal_'+i+'"><i class="f7-icons fs-13 text-red mr-5">checkmark_seal_fill</i>Location approved</button>';
                    loc_apprv+='<button class="col-50 seg-outline loc_btn p-2 nobg fs-11 display-block w-100 mr-5" id="seal_'+i+'"><i class="f7-icons fs-13 text-red mr-5">checkmark_seal_fill</i>Location approved</button>';
                  }else if(change_add_status==0){
                    //console.log("else -----"+change_add_status);
                    btn_loc+='<span class="col-60 loc_btn fw-600 fs-10 display-block reqsent_'+i+'"><i class="f7-icons fs-13 mr-5">checkmark_alt</i>Location Request Sent </span>';
                    loc_apprv+='';
                  }
                } 
              }else if((change_address!='' && change_add_status==0) || (address!='' && change_add_status!=1 && (change_address=='' || change_address==null))){
                //console.log("else if%%% -----"+change_add_status);
                //btn_loc+='<button class="col-60 button button-small button-fill loc_btn submitbtn fs-10 display-block reqsent_'+i+'"><i class="f7-icons fs-13 mr-5">checkmark_alt</i>Location Request Sent </button>';
                btn_loc+='<span class="col-60 loc_btn fw-600 fs-10 display-block reqsent_'+i+'"><i class="f7-icons fs-13 mr-5">checkmark_alt</i>Location Request Sent </span>';
              }

            }
          }else if(order_status==1){
            var status_cls='started';    
            var status_txt='Started';
            var reviewbtn='';
            var patner_det=status_txt+ ' By '+p_name+'<br/><i class="f7-icons fs-12 text-grey mr-5">phone_fill</i><span class="fs-10">'+p_phone+'</span><br/><i class="f7-icons fs-12 text-grey mr-5">envelope_fill</i><span class="fs-10">'+p_email+'</span>';
            var thumb='';
          }else if(order_status==2){
            var status_cls='finished';
            var status_txt='Finished';
            var thumb='';
            var patner_det=status_txt+ ' By '+p_name+'<br/><i class="f7-icons fs-12 text-grey mr-5">phone_fill</i><span class="fs-10">'+p_phone+'</span><br/><i class="f7-icons fs-12 text-grey mr-5">envelope_fill</i><span class="fs-10">'+p_email+'</span>';
            if(review_count==0){
              var rate_form='<div class="rating_form_'+i+' list display-none w-100"><ul class="w-100"><li class="item-content item-input item-input-outline w-100 row"><div class="item-inner"><div class="item-title item-label l-0">Give rates<br/></div><div class="w-100 text-center"><div class="rating-widget"><!-- Rating Stars Box --><div class="rating-stars text-center"><ul id="stars" class="display-if"><input type="hidden" name="hidd_rate" id="hidd_rate" /><li class="star" title="Poor" data-value="1" id="star_'+i+'_1" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_1">star_fill</i></li><li class="star" title="Fair" data-value="2" id="star_'+i+'_2" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_2">star_fill</i></li><li class="star" title="Good" data-value="3" id="star_'+i+'_3" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_3">star_fill</i></li><li class="star" title="Excellent" data-value="4" id="star_'+i+'_4" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_4">star_fill</i></li><li class="star" title="WOW!!!"" data-value="5" id="star_'+i+'_5" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_5">star_fill</i></li></ul></div></div></div></div><div class="item-inner"><div class="item-input-wrap"><input type="text" placeholder="Give a review" name="review_txt" id="reviewtxt_'+i+'" class="fs-12"><span class="input-clear-button"></span></div></div>         <button class="col-33 button fs-10 mb-5 button-small seg_btn" onclick="giverate('+i+','+c_id+','+o_id+','+acpt_id+')">Rate it!</button><button class="col-33 button button-outline fs-10 mr-15 mb-5 button-small seg-outline" onclick="showRatebtn('+i+')">Cancel</button></li></ul></div>';
              var reviewbtn='<button class="col-33 button button-small button-fill fs-10 for_green display-block w-20" id="rate_'+i+'" onclick="showrateForm('+i+','+o_id+')"><i class="f7-icons fs-12 mr-5">star_fill</i>Rate</button>'+rate_form;
            }else{
              var rate_form='';
              var reviewbtn=''; 
            }
          }
          if(reviewbtn!=''){
            var rev_btn=reviewbtn;
          } else{
            var rev_btn='';
          }
          /*if(acpt_status==0){
            var thumb='';
            var accept_status='<span class="pending fs-10 mt-5">Not accepted yet</span>';
          }else{  
            var thumb='<i class="f7-icons text-blue fs-14">hand_thumbsup_fill</i>';          
            var accept_status=status_txt+ ' By '+p_name+'<br/><i class="f7-icons fs-12 text-grey mr-5">phone_fill</i><span class="fs-10">'+p_phone+'</span><br/><i class="f7-icons fs-12 text-grey mr-5">envelope_fill</i><span class="fs-10">'+p_email+'</span>';
          } 
          if(reviewbtn!=''){
            var rev_btn=reviewbtn;
          } else{
            var rev_btn='';
          }*/
          /*var rate_form='<div class="rating_form_'+i+' list display-none w-100"><ul class="w-100"><li class="item-content item-input item-input-outline w-100 row"><div class="item-inner"><div class="item-title item-label l-0">Give rates<br/></div><div class="item-input-wrap"><section class="rating-widget"><!-- Rating Stars Box --><div class="rating-stars text-center"><ul id="stars"><li class="star" title="Poor" data-value="1"><i class="f7-icons">star</i></li><li class="star" title="Fair" data-value="2"><i class="f7-icons">star</i></li><li class="star" title="Good" data-value="3"><i class="f7-icons">star</i></li><li class="star" title="Excellent" data-value="4"><i class="f7-icons">star</i></li><li class="star" title="WOW!!!"" data-value="5"><i class="f7-icons">star</i></li></ul></div></section>               </div></div><button class="col-33 button fs-10 mb-5 button-small seg_btn" onclick="giverate('+i+','+c_id+','+o_id+')">Rate it!</button><button class="col-33 button button-outline fs-10 mr-15 mb-5 button-small seg-outline" onclick="showRatebtn('+i+')">Cancel</button></li></ul></div>';*/


          var change_loc='<span id="btnLoc">'+btn_loc+'</span><div class="locchange_form_'+i+' list display-none w-100"><ul class="w-100"><li class="item-content item-input item-input-outline w-100 row"><div class="item-inner"><div class="item-title item-label l-0">Change Location<br/><span class="text-red fw-600 fs-9">NOTE : Address can be change if partner will accept your request.</span></div><div class="item-input-wrap"><input type="text" name="change_address" id="change_address_'+i+'" class="fs-12"><span class="input-clear-button"></span></div></div><button class="col-33 button fs-10 mb-5 button-small seg_btn" onclick="changeAddress('+i+','+c_id+','+acpt_id+','+o_id+','+"'"+ord_no+"'"+','+o_code+')">Change</button><button class="col-33 button button-outline fs-10 mr-15 mb-5 button-small seg-outline" onclick="showLocbtn('+i+')">Cancel</button></li></ul></div>';
          ord_list+='<li class="accordion-item lightblue mb-5" id="li_'+i+'"><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title text-blue fw-500 fs-14"><span class="mr-5">'+ord_no+'</span><!--span class="text-red fw-500 fs-12">(code: '+o_code+')</span--></div><!--span class="float-right fs-10 fw-600 '+status_cls+'">'+status_txt+'</span--><span class="float-right fs-10 fw-600">'+thumb+'</span></div></a><div class="accordion-item-content nobg"><div class="block"><div class="row"><div class="col-50 mt-2 fs-12"><span class="fw-500">Order code: '+o_code+'</span><br/><span class="fw-600 text-blue bord-bot-blue">'+s_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">circle_fill</i>'+j_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">calendar_fill</i>'+finaldt+'<span class="text-capitalize badge fs-10 ml-5"> '+request_day+'</span></span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">timer_fill</i>'+time+'</span></div><div class="col-50 mt-2 fs-12"><span class="fw-500">'+patner_det+'</span></div></div></div>';
          if(rev_btn!=''){
            ord_list+='<div class="action_line" id="action_line_'+i+'"><div class="row"><span class="float-right w-100">'+rev_btn+'</span></div></div>';
          }
          if(btn_loc!=''){            
            ord_list+='<div class="action_line" id="action_line_'+i+'"><div class="row"><span class="float-left leftdiv_'+i+'">'+change_loc+req_res+'</span>'+loc_apprv+'</div></div>';
          }
          ord_list+='</div></li>';
          /* 
          ACTION LINE 
          <div class="action_line display-none" id="action_line_'+i+'"><div class="row"><span class="float-left leftdiv_'+i+'">change_loc---req_res</span><span class="float-right rightdiv_'+i+'">'+rev_btn+'</span></div></div>  */



         // alert(change_address);
          /*if(order_status==0){
            console.log("cond 1 - order_status 0");
            var status_cls='pending'; 
            var status_txt='Pending';
            var rev_btn='';
            if(change_address==null || change_address==''){ 
              if(acpt_status==0){
                var btn_loc='';
                var change_loc='';
              }else{ 
                var btn_loc='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>';
                   
              console.log("cond 2");
              var change_loc='<span id="btnLoc">'+btn_loc+'</span><div class="locchange_form_'+i+' list display-none w-100"><ul class="w-100"><li class="item-content item-input item-input-outline w-100 row"><div class="item-inner"><div class="item-title item-label l-0">Change Location<br/><span class="text-red fw-600 fs-9">NOTE : Address can be change if partner will accept your request.</span></div><div class="item-input-wrap"><input type="text" name="change_address" id="change_address" class="fs-12"><span class="input-clear-button"></span></div></div><button class="col-33 button fs-10 mb-5 button-small seg_btn" onclick="changeAddress('+i+','+c_id+','+acpt_id+','+o_id+','+"'"+ord_no+"'"+','+o_code+')">Change</button><button class="col-33 button button-outline fs-10 mr-15 mb-5 button-small seg-outline" onclick="showLocbtn('+i+')">Cancel</button></ul></div>'; 
              } 
            }else if(change_address!=null && change_address!='' && change_add_status==0){ 
              console.log("cond 3");
              var change_loc='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block w-50 reqsent_'+i+'">Location Request Sent <i class="f7-icons fs-13 ml-5">checkmark_alt</i></button>';  
            }else if(change_address!=null && change_address!='' && change_add_status==1){
              console.log("cond 4");
              var change_loc='<span id="btnLoc"><button class="col-66 button button-small button-fill loc_btn submitbtn fs-10 display-block w-100 mr-5" id="seal_'+i+'"><i class="f7-icons fs-13 text-red mr-5">checkmark_seal_fill</i>Location approved</button></span><div class="locchange_form_'+i+' list display-none w-100"><ul class="w-100"><li class="item-content item-input item-input-outline w-100 row"><div class="item-inner"><div class="item-title item-label l-0">Change Location<br/><span class="text-red fw-600 fs-9">NOTE : Address can be change if partner will accept your request.</span></div><div class="item-input-wrap"><input type="text" name="change_address" id="change_address" class="fs-12"><span class="input-clear-button"></span></div></div><button class="col-33 button fs-10 mb-5 button-small seg_btn" onclick="changeAddress('+i+','+c_id+','+acpt_id+','+o_id+','+"'"+ord_no+"'"+','+o_code+')">Change</button><button class="col-33 button button-outline fs-10 mr-15 mb-5 button-small seg-outline" onclick="showLocbtn('+i+')">Cancel</button></ul></div>'; 
                if(change_loc!='' || req_res!=''){
                  //if(change_address==null || change_address==''){
                    var rechange_loc='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>';
                  //}else{
                    //var rechange_loc='';
                  //}
                }else{
                  var rechange_loc='';
                } 
            }  
          }else if(order_status==1){
            console.log("cond 5");
            var status_cls='started';
            var status_txt='Started';
            var rev_btn='';
            var change_loc='';
          }else{ 
            console.log("cond 6");
            var status_cls='finished';
            var status_txt='Finished';
            if(review_count==0){
              var rev_btn='<button class="col-33 button button-small button-fill fs-10 for_green" ><i class="f7-icons fs-12 mr-5">star_fill</i>Rate</button>';
            }else{
              var rev_btn='';
            }            
            var change_loc='';
          } 
          if(order_status==0){
            if(part_reschedule_req!=null || part_reschedule_req==1){
              var req_res = '<button class="col-75 button button-small button-fill fs-10 for_green" ><i class="f7-icons fs-12 mr-5">arrow_clockwise</i>Reschedule Request</button>';
            }else{
              var req_res = '';
            }
          }else{
            var req_res = '';
          }
          if(acpt_status==0){
            var accept_status='<span class="pending fs-10 mt-5">Not accepted yet</span>';
          }else{
            var btn_loc='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>';
            var accept_status=status_txt+ ' By '+p_name+'<br/><i class="f7-icons fs-12 text-grey mr-5">phone_fill</i><span class="fs-10">'+p_phone+'</span><br/><i class="f7-icons fs-12 text-grey mr-5">envelope_fill</i><span class="fs-10">'+p_email+'</span>';
          }
          ord_list+='<li class="accordion-item lightblue mb-5"><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title text-blue fw-500 fs-14"><span class="mr-5">'+ord_no+'</span><!--span class="text-red fw-500 fs-12">(code: '+o_code+')</span--></div><!--span class="float-right fs-10 fw-600 '+status_cls+'">'+status_txt+'</span--></div></a><div class="accordion-item-content nobg"><div class="block"><div class="row"><div class="col-50 mt-2 fs-12"><span class="fw-500">Order code: '+o_code+'</span><br/><span class="fw-600 text-blue bord-bot-blue">'+s_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">circle_fill</i>'+j_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">calendar_fill</i>'+finaldt+'<span class="text-capitalize badge fs-10 ml-5"> '+request_day+'</span></span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">timer_fill</i>'+time+'</span></div><div class="col-50 mt-2 fs-12"><span class="fw-500">'+accept_status+'</span></div></div></div>';
          if(change_loc!='' || req_res!=''){
            if(change_address==null || change_address==''){
              var colcls = ''
              ord_list+='';
            }else{
              if(change_add_status==1){
                var colcls = 'col-100';
              }else{
                var colcls = 'col-50';
              }
              ord_list+='<div class="action_line" id="action_line_'+i+'"><div class="row"><span class="float-left leftdiv_'+i+'">'+change_loc+req_res+'</span>'+rechange_loc+'</div></div>';
            }
            
          }
          if(rev_btn!=''){
            ord_list+='<div class="action_line"><div class="row"><span class="float-right">'+rev_btn+'</span></div></div>';
          } 
          ord_list+='</div></li>';
        } */

        /*if(order_status==0){
          //console.log("cond 1 - order_status 0");
          var status_cls='pending'; 
          var status_txt='Pending';
          var rev_btn='';
          if(acpt_status==0){
                var btn_loc='';
                var change_loc='';
                var thumb='';
          }else if(acpt_status==1){ 
            var btn_loc='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>';
               var thumb='<i class="f7-icons text-blue fs-14">hand_thumbsup_fill</i>';
          //console.log("cond 2");  
          if(change_address!=null && change_address!='' && change_add_status==0){ 
              //console.log("cond 3");
              var change_loc='<button class="col-60 button button-small button-fill loc_btn submitbtn fs-10 display-block reqsent_'+i+'"><i class="f7-icons fs-13 mr-5">checkmark_alt</i>Location Request Sent </button>';  
            }else if(change_address!=null && change_address!='' && change_add_status==1){
              var btn_loc='<button class="col-66 button button-small button-fill loc_btn submitbtn fs-10 display-block w-100 mr-5" id="seal_'+i+'"><i class="f7-icons fs-13 text-red mr-5">checkmark_seal_fill</i>Location approved</button>';
          var change_loc='<span id="btnLoc">'+btn_loc+'</span><div class="locchange_form_'+i+' list display-none w-100"><ul class="w-100"><li class="item-content item-input item-input-outline w-100 row"><div class="item-inner"><div class="item-title item-label l-0">Change Location<br/><span class="text-red fw-600 fs-9">NOTE : Address can be change if partner will accept your request.</span></div><div class="item-input-wrap"><input type="text" name="change_address" id="change_address" class="fs-12"><span class="input-clear-button"></span></div></div><button class="col-33 button fs-10 mb-5 button-small seg_btn" onclick="changeAddress('+i+','+c_id+','+acpt_id+','+o_id+','+"'"+ord_no+"'"+','+o_code+')">Change</button><button class="col-33 button button-outline fs-10 mr-15 mb-5 button-small seg-outline" onclick="showLocbtn('+i+')">Cancel</button></ul></div>'; 
        }
          } 
        }else if(order_status==1){
          //console.log("cond 5");
          var status_cls='started';
          var status_txt='Started';
          var rev_btn='';
          var change_loc='';
          var thumb='';
        }else{ 
          //console.log("cond 6");
          var status_cls='finished';
          var status_txt='Finished';
          if(review_count==0){
            var rev_btn='<button class="col-33 button button-small button-fill fs-10 for_green" ><i class="f7-icons fs-12 mr-5">star_fill</i>Rate</button>';
          }else{
            var rev_btn='';
          }
          var change_loc='';
          var thumb='';
        }
        if(acpt_status==0){
            var accept_status='<span class="pending fs-10 mt-5">Not accepted yet</span>';
        }else if(acpt_status==1){
          var accept_status=status_txt+ ' By '+p_name+'<br/><i class="f7-icons fs-12 text-grey mr-5">phone_fill</i><span class="fs-10">'+p_phone+'</span><br/><i class="f7-icons fs-12 text-grey mr-5">envelope_fill</i><span class="fs-10">'+p_email+'</span>';
          //var btn_loc='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>';          
        }
        if(order_status==0){
          if(part_reschedule_req!=null || part_reschedule_req==1){
            var req_res = '<button class="col-75 button button-small button-fill fs-10 for_green" ><i class="f7-icons fs-12 mr-5">arrow_clockwise</i>Reschedule Request</button>';
          }else{
            var req_res = '';
          }
        }else{
          var req_res = '';
        } */

        /*if(acpt_status==0){
            var accept_status='<span class="pending fs-10 mt-5">Not accepted yet</span>';
            var btn_loc='';
            var change_loc='';
        }else if(acpt_status==1){
          var btn_loc='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>';
          var accept_status=status_txt+ ' By '+p_name+'<br/><i class="f7-icons fs-12 text-grey mr-5">phone_fill</i><span class="fs-10">'+p_phone+'</span><br/><i class="f7-icons fs-12 text-grey mr-5">envelope_fill</i><span class="fs-10">'+p_email+'</span>';
          if(change_address!=null && change_address!='' && change_add_status==1){
            chnagetheAddress(address,change_address,o_id);
            var change_loc='';
          }
          var change_loc='<span id="btnLoc">'+btn_loc+'</span><div class="locchange_form_'+i+' list display-none w-100"><ul class="w-100"><li class="item-content item-input item-input-outline w-100 row"><div class="item-inner"><div class="item-title item-label l-0">Change Location<br/><span class="text-red fw-600 fs-9">NOTE : Address can be change if partner will accept your request.</span></div><div class="item-input-wrap"><input type="text" name="change_address" id="change_address" class="fs-12"><span class="input-clear-button"></span></div></div><button class="col-33 button fs-10 mb-5 button-small seg_btn" onclick="changeAddress('+i+','+c_id+','+acpt_id+','+o_id+','+"'"+ord_no+"'"+','+o_code+')">Change</button><button class="col-33 button button-outline fs-10 mr-15 mb-5 button-small seg-outline" onclick="showLocbtn('+i+')">Cancel</button></ul></div>'; 
          //changeAddress(i,c_id,acpt_id,o_id,ord_no,o_code);
          
        }*/
        
        //ord_list+='<li class="accordion-item lightblue mb-5"><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title text-blue fw-500 fs-14"><span class="mr-5">'+ord_no+'</span><!--span class="text-red fw-500 fs-12">(code: '+o_code+')</span--></div><!--span class="float-right fs-10 fw-600 '+status_cls+'">'+status_txt+'</span--><span class="float-right fs-10 fw-600">'+thumb+'</span></div></a><div class="accordion-item-content nobg"><div class="block"><div class="row"><div class="col-50 mt-2 fs-12"><span class="fw-500">Order code: '+o_code+'</span><br/><span class="fw-600 text-blue bord-bot-blue">'+s_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">circle_fill</i>'+j_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">calendar_fill</i>'+finaldt+'<span class="text-capitalize badge fs-10 ml-5"> '+request_day+'</span></span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">timer_fill</i>'+time+'</span></div><div class="col-50 mt-2 fs-12"><span class="fw-500">'+accept_status+'</span></div></div></div>';
        //console.log(ord_no+"====="+change_address+"*********"+acpt_status+"@@@@@@"+change_loc+"#########"+req_res);
        //ord_list+='<div class="action_line" id="action_line_'+i+'"><div class="row"><span class="float-left leftdiv_'+i+'">'+change_loc+'</span></div></div>';
        /*if(change_loc!='' || req_res!=''){
            if(change_address==null || change_address==''){
              var colcls = ''
              ord_list+='';
            }else{
              if(change_add_status==1){
                var colcls = 'col-100';
              }else{
                var colcls = 'col-50';
              }
              ord_list+='<div class="action_line" id="action_line_'+i+'"><div class="row"><span class="float-left leftdiv_'+i+'">'+change_loc+req_res+'</span></div></div>';
            }
            
         }*/
     /*if(change_address==null || change_address=='' || change_address!='' && change_add_status==0){    
var actionline='<div class="action_line" id="action_line_'+i+'"><div class="row"><span class="float-left leftdiv_'+i+'">'+change_loc+req_res+'</span></div></div>';
}else{
  var actionline='';
}
  ord_list+=actionline;
        if(rev_btn!=''){
        var reviewBtn='<div class="action_line"><div class="row"><span class="float-right">'+rev_btn+'</span></div></div>';
          }else{
            var reviewBtn='';
          }
ord_list+=reviewBtn;*/

      }

      }  
      $(".ordercls").html("");
      $("#"+divname).html(ord_list);

      
      app.preloader.hide();
    }
  });
}
function giverate(i,c_id,o_id,acpt_id){
  checkConnection();
  app.preloader.show();
  //console.log(i+"---"+c_id+"----"+o_id);
  var hidd_rate = $("#hidd_rate").val();
  var reviewtxt = $("#reviewtxt_"+i).val();
  if(hidd_rate==""){
    app.dialog.alert("Please select the star.");
    return false; 
  }else{ 
    //console.log(reviewtxt+"-----"+hidd_rate); 
    $.ajax({
      type:'POST', 
      data:{'hidd_rate':hidd_rate,'reviewtxt':reviewtxt,'o_id':o_id,'c_id':c_id,'acpt_id':acpt_id},
      url:base_url+'APP/Appcontroller/ratesandreviews',
      success:function(rate_res){
        //console.log(rate_res)
        if(rate_res.trim()=="inserted"){
          app.dialog.alert("Thank you for your feedback.");
          $(".rating_form_"+i).removeClass("display-block");
          $(".rating_form_"+i).addClass("display-none"); 
          mainView.router.navigate("/customer_dash/");
          app.preloader.hide();
        }else if(rate_res.trim()=="not inserted"){
          app.dialog.alert("Error in giving feedback.");
          mainView.router.navigate("/customer_dash/");
          app.preloader.hide(); 
        }          
      }  
    });
  }
} 
function ratestar(val,rowid){
  var click_rate=$(val).attr('data-value');
  var click_id=$(val).attr('id');
  var click_cls=$("#fillstr_"+rowid+"_"+click_rate).attr('class');  
  //console.log(click_cls+"***"+click_id);
  var onStar = parseInt($(val).data('value'), 10);
  $("#hidd_rate").val(onStar);
    $(val).parent().children('li.star').each(function(e){
      var j=e+1;
      if(click_cls=='f7-icons lightgrey'){
        //console.log("if click_cls "+click_cls);
        $("#fillstr_"+rowid+"_"+click_rate).removeClass("lightgrey");
        $("#fillstr_"+rowid+"_"+click_rate).addClass("hover");
      }else if(click_cls=='f7-icons hover'){
        console.log("else click_cls "+click_cls);
        $("#fillstr_"+rowid+"_"+click_rate).removeClass("hover");
        $("#fillstr_"+rowid+"_"+click_rate).addClass("lightgrey");
      }
      
      if(e < click_rate){
        $("#fillstr_"+rowid+"_"+j).removeClass("lightgrey");
        $("#fillstr_"+rowid+"_"+j).addClass("hover");
        //console.log(val.textContent+"-----"+e);
        
      }else{
        $("#fillstr_"+rowid+"_"+j).removeClass("hover");
        $("#fillstr_"+rowid+"_"+j).addClass("lightgrey");
      }
  }); 
}
function showRatebtn(rowid){
  $(".rating_form_"+rowid).removeClass("display-block");
  $(".rating_form_"+rowid).addClass("display-none");
  $("#rate_"+rowid).removeClass("display-none");
  $("#rate_"+rowid).addClass("display-block");
  $("#action_line_"+rowid).css("padding",'2%');
}
function showrateForm(rowid,o_id){
  //alert("called "+rowid);
  $(".rating_form_"+rowid).removeClass("display-none");
  $(".rating_form_"+rowid).addClass("display-block");
  $("#rate_"+rowid).removeClass("display-block");
  $("#rate_"+rowid).addClass("display-none");
  $("#action_line_"+rowid).css("padding",'0');
  //$(".rating_form_"+rowid).addClass("display-block");
}
function chnagetheAddress(address,change_address,o_id){
  $.ajax({
    type:'POST', 
    data:{'address':address,'change_address':change_address,'o_id':o_id},
    url:base_url+'APP/Appcontroller/chnageadd',
    success:function(add_result){
      if(add_result=="updated"){
        app.dialog.alert("Location change request sent.");
      }else{
        app.dialog.alert("Location not chnaged");
      }
    }
  });  
}
function getActivate(btn_tab){
  app.preloader.show();
  if(btn_tab==0){
    var divname="pen_orders";
    getBookingbyStatus(btn_tab,divname);
    $(".pen_btn").removeClass("seg-outline");
    $(".start_btn").removeClass("button-active");
    $(".finish_btn").removeClass("button-active");    
    $(".start_btn").removeClass("seg_btn");
    $(".finish_btn").removeClass("seg_btn");
    $(".start_btn").addClass("seg-outline");
    $(".finish_btn").addClass("seg-outline");
    $(".pen_btn").addClass("button-active");
    $(".pen_btn").addClass("seg_btn");  

    $("#pen_orders").removeClass("display-none");
    $("#pen_orders").addClass("display-block");
    $("#start_orders").removeClass("display-block");
    $("#start_orders").addClass("display-none");
    $("#finish_orders").removeClass("display-block");
    $("#finish_orders").addClass("display-none");
  }else if(btn_tab==1){ 
    var divname="start_orders";
    getBookingbyStatus(btn_tab,divname);
    $(".start_btn").removeClass("seg-outline");
    $(".pen_btn").removeClass("button-active");
    $(".finish_btn").removeClass("button-active");
    $(".pen_btn").removeClass("seg_btn");
    $(".finish_btn").removeClass("seg_btn");
    $(".pen_btn").addClass("seg-outline");
    $(".finish_btn").addClass("seg-outline");
    $(".start_btn").addClass("button-active");  
    $(".start_btn").addClass("seg_btn");  

    $("#start_orders").removeClass("display-none");
    $("#start_orders").addClass("display-block");
    $("#pen_orders").removeClass("display-block");
    $("#pen_orders").addClass("display-none");
    $("#finish_orders").removeClass("display-block");
    $("#finish_orders").addClass("display-none");

  }else if(btn_tab==2){
    var divname="finish_orders";
    getBookingbyStatus(btn_tab,divname);
    $(".finish_btn").removeClass("seg-outline");
    $(".start_btn").removeClass("button-active");
    $(".pen_btn").removeClass("button-active");
    $(".start_btn").removeClass("seg_btn");
    $(".pen_btn").removeClass("seg_btn");
    $(".start_btn").addClass("seg-outline");
    $(".pen_btn").addClass("seg-outline");
    $(".finish_btn").addClass("button-active");
    $(".finish_btn").addClass("seg_btn"); 

    $("#finish_orders").removeClass("display-none");
    $("#finish_orders").addClass("display-block");
    $("#pen_orders").removeClass("display-block");
    $("#pen_orders").addClass("display-none");
    $("#start_orders").removeClass("display-block");
    $("#start_orders").addClass("display-none");
  }
  app.preloader.hide();
}
function changeServiceLoc(rowid,c_id,acpt_id,o_id){
  $("#loc_btn_"+rowid).removeClass("display-block");
  $("#loc_btn_"+rowid).addClass("display-none");
  $("#seal_"+rowid).removeClass("display-block");
  $("#seal_"+rowid).addClass("display-none");
  $(".locchange_form_"+rowid).removeClass("display-none");
  $(".locchange_form_"+rowid).addClass("display-block");
  $(".leftdiv_"+rowid).addClass("w-100");
  $("#action_line_"+rowid).css("padding",'0');
}
function showLocbtn(rowid){
  $("#loc_btn_"+rowid).removeClass("display-none");
  $("#loc_btn_"+rowid).addClass("display-block");
  $("#seal_"+rowid).removeClass("display-none");
  $("#seal_"+rowid).addClass("display-block");
  $(".locchange_form_"+rowid).removeClass("display-block");
  $(".locchange_form_"+rowid).addClass("display-none");
  $(".leftdiv_"+rowid).removeClass("w-100");
  $("#action_line_"+rowid).css("padding",'2%');
}
function changeAddress(rowid,c_id,acpt_id,o_id,o_num,o_code){
  var change_address = $("#change_address_"+rowid).val();
  checkConnection();   
  app.preloader.show();
  var session_cid = window.localStorage.getItem("session_cid"); 
  var session_cphone = window.localStorage.getItem("session_cphone"); 
  if(change_address==''){
    app.preloader.hide();
    app.dialog.alert("Please enter location."); 
    return false;
  }else{ 
    $.ajax({ 
      type:'POST', 
      data:{'session_cid':session_cid,'change_address':change_address,'o_id':o_id,'session_cphone':session_cphone,'o_num':o_num},
      url:base_url+'APP/Appcontroller/changeServiceAdd',
      success:function(add_chnaged){
        var add_res = $.parseJSON(add_chnaged);
        var st = add_res.status;
        if(st='success'){ 
          //$("#btnLoc").html(' ');
          //$("#loc_btn_"+rowid).removeClass("display-block");
          //$("#loc_btn_"+rowid).addClass("display-none");
          $(".locchange_form_"+rowid).removeClass("display-block");
          $(".locchange_form_"+rowid).addClass("display-none");
          //$(".leftdiv_"+rowid).addClass("w-100");
          //$("#action_line_"+rowid).css("padding",'0');
          /*mainView.router.navigate("/customer_dash/",{
            reloadCurrent : true
          });*/

          
          
          //$("#reqsent_"+rowid).removeClass("display-none");
          /*$("#reqsent_"+rowid).addClass("display-block");

          $("#loc_btn_"+rowid).removeClass("display-block");
          $("#loc_btn_"+rowid).addClass("display-none");
  
          $(".locchange_form_"+rowid).removeClass("display-block");
          $(".locchange_form_"+rowid).addClass("display-none");
          $(".leftdiv_"+rowid).addClass("w-100");
          $("#action_line_"+rowid).css("padding",'2%');*/

          //$("#tab-2").load(location.href + " .list");
          /**/
          mainView.router.navigate("/customer_dash/");
          app.preloader.hide(); 
          //$("#btnLoc").html('<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>');
        }else if(st=='error'){
          app.dialog.alert("Error in changing location!");           
          app.preloader.hide(); 
        }
      }

    });
  }
}
$$(document).on('page:init', '.page[data-name="customer_changepass"]', function (page) { 
  //logOut(); 
  checkConnection();
  app.preloader.show();
  $("#conf_newpass").keyup(validate);  
  app.preloader.hide();
});
function validate() {
  var password1 = $("#new_pass").val();
  var password2 = $("#conf_newpass").val();
  if(password1 == password2) {
    $("#success-badge").removeClass("display-none");
    $(".unmatch-text").css("display",'none');
    $(".match-text").css("display",'block');
    $(".match-text").text("Passwords match.");        
  }
  else{
    $("#warning-badge").removeClass("display-none");
    $(".match-text").css("display",'none');
    $(".unmatch-text").css("display",'block');
    $(".unmatch-text").text("Passwords do not match!");  
  }    
}
function change_custpass(){
  checkConnection();  
  app.preloader.show();
  var session_cid = window.localStorage.getItem("session_cid");
  var edit_cpass = $(".edit_cpass").serialize();
  $.ajax({
    type:'POST', 
    data:edit_cpass+"&session_cid="+session_cid,
    url:base_url+'APP/Appcontroller/changeCust_pass',
    success:function(pass){
      var pwdparse = $.parseJSON(pass);
      var p_change = pwdparse.p_change;
      //console.log(pass); 
      /*if(pass=='updated'){
        app.dialog.alert("Password updated successfully!");
      }*/
      if(p_change=='wrongoldpwd'){
        app.dialog.alert("Entered OldPassword is incorrect.");
      }else if(p_change=='updated'){
        app.dialog.alert("Password updated successfully!");
      }else if(p_change=='newpwdnotmatch'){
        app.dialog.alert("New and confirm password are not same!");
      }  
      //app.tab.show("#tab-3"); 
      mainView.router.navigate("/customer_changepass/");
      app.preloader.hide();  
    }
  });
  $("#old_pass").val('');
  $("#new_pass").val('');
  $("#conf_newpass").val('');
  $(".match-text").css("display",'none');
  $(".unmatch-text").css("display",'none');
  $("#warning-badge").addClass("display-none");
  $("#success-badge").addClass("display-none");  
}

$$(document).on('page:init', '.page[data-name="customer_editprof"]', function (page) { 
  checkConnection(); 
  app.preloader.show();
  var session_cid = window.localStorage.getItem("session_cid");  
  $.ajax({
    type:'POST', 
    data:{'session_cid':session_cid},
    url:base_url+'APP/Appcontroller/userProfile',
    success:function(prof_result){
      var prf = $.parseJSON(prof_result);
      var profile = prf.profile;
      console.log(profile);
      var cid = profile[0].c_id;
      //alert(cid);
      var nm_fltr = (profile[0].c_name.charAt(0));
      $(".nmfltr").html(nm_fltr);
      var c_id = profile[0].c_id;
      var c_name = profile[0].c_name;
      var c_email = profile[0].c_email;
      var c_phone = profile[0].c_phone;
      var c_addr = profile[0].c_addr;
      var a_id = profile[0].a_id;
      var city_id = profile[0].city_id;
      $("#hidden_cid").val(c_id);
      $("#cname").val(c_name);
      $("#cemail").val(c_email);
      $("#cphone").val(c_phone);
      $("#caddr").val(c_addr);
      $.ajax({
        type:'POST', 
        data:{'a_id':a_id,'city_id':city_id},
        url:base_url+'APP/Appcontroller/userAreaCity',
        success:function(areacity){
          var parsearea = $.parseJSON(areacity);
          var area = parsearea.area;
          var city = parsearea.city;
          var carea = area[0].a_name;
          var ccity = city[0].city_name;
          $.ajax({
            type:'POST', 
            url:base_url+'APP/Appcontroller/AllActiveCityArea',
            success:function(actv_city){
              var cty = $.parseJSON(actv_city);
              var act_city = cty.act_city;
              var act_area = cty.act_area;
              var all_city = '';
              var all_area = '';
              //var j;
              for(var i=0;i<act_city.length;i++){
                var cty_nm = act_city[i].city_name;
                var cityid = act_city[i].city_id;
                if(cityid == city_id){
                  var sel='selected';
                }else{
                  var sel='';
                }
                all_city+='<option value='+cityid+' '+sel+'>'+cty_nm+'</option>';
              }
              $("#serving_city").html(all_city);
            //}

            for(var j=0;j<act_area.length;j++){
              var a_nm = act_area[j].a_name;
              var aid = act_area[j].a_id;
              if(aid == a_id){
                var sel_area='selected';
              }else{
                var sel_area='';
              }
              all_area+='<option value='+aid+' '+sel_area+'>'+a_nm+'</option>';
            }
            $("#serving_area").html(all_area);
          }
          }); 
        }
      });
      app.preloader.hide();
    }
  });    
});
function getcatServices(cat_id,c_img_path){
  mainView.router.navigate("/customer_servicelist/");  
  app.preloader.show();
  $.ajax({
    type:'POST', 
    data:{'cat_id':cat_id},
    url:base_url+'APP/Appcontroller/getServicelist',
    success:function(serv_res){
      $("#hidd_catid").val(cat_id);
      $("#hidd_c_img_path").val(c_img_path);
      var parseServ = $.parseJSON(serv_res);
      var serv_list = parseServ.serv_list;
      var list='';
      for(var j=0;j<serv_list.length;j++){
        var s_id = serv_list[j].s_id;
        var s_name = serv_list[j].s_name;  
        var s_img_path = serv_list[j].s_img_path;
        var cimg = c_img_path.replace(/\//g, "-"); 
        //alert(cimg); 
        list+='<li><a href="/customer_service_types/'+s_id+'/'+s_name+'/'+cimg+'/'+cat_id+'/" class="item-link item-content"><div class="item-media"><img src="'+base_url+s_img_path+'" class="block_img lazy lazy-fade-in demo-lazy" height="60" width="60"/></div><div class="item-inner"><div class="item-title fs-12">'+s_name+'</div></div></a></li>';
      }
      $(".servList").html(list);
      app.preloader.hide();
    }
  });
}
function edit_custprofile(){
  //alert("in edit_custprofile");
  checkConnection();
  app.preloader.show();
  var c_editprof_from = $(".edit_cprof").serialize();
  //var hidd_proftab = $("#hidd_proftab").val();
  //console.log(c_editprof_from);
  $.ajax({
    type:'POST', 
    data:c_editprof_from,
    url:base_url+'APP/Appcontroller/customer_edit',
    success:function(cedit_res){
      if(cedit_res=='updated'){
        app.dialog.alert("Profile updated successfully!");
        //mainView.router.navigate("/customer_dash/");
        //$("#tab-3").addClass("tab-active");
      }else if(cedit_res=='not'){
        app.dialog.alert("Problem updating profile");
        //mainView.router.navigate("/customer_dash/");
        //$("#tab-3").addClass("tab-active");
      }
      
      mainView.router.navigate("/customer_dash/");
       
      //$("#hidd_proftab").addClass("tab-active");
      app.preloader.hide();
    }
  });  
}
$$(document).on('page:init', '.page[data-name="customer_service_types"]', function (page) {  
  checkConnection();
  //console.log(page.detail.route.params);
  var sid = page.detail.route.params.sid; 
  var sname = page.detail.route.params.sname;
  var c_img_path = page.detail.route.params.cimg; 
  var catid = page.detail.route.params.cat_id; 
  var session_ccity = window.localStorage.getItem("session_ccity"); 
  $("#hidd_catid").val(catid);
  $("#hidd_c_img_path").val(c_img_path);
  var c_img = c_img_path.replace(/-/g, '/');
  //alert(sid+"-----"+sname);
  $(".serv_title").html(sname);
  app.preloader.show();
  $.ajax({
    type:'POST', 
    data:{'sid':sid},
    url:base_url+'APP/Appcontroller/getJoblist',
    success:function(job_res){
      var jobparse = $.parseJSON(job_res);
      var job_list = jobparse.job_list;
      var jimg = jobparse.j_img;
      //console.log(jimg);
      var jlist = '';
      var slides = ''; 
      if(job_list.length > 0 ){
        $(".no-service").removeClass("display-block");
        $(".no-service").addClass("display-none");
        for(var i=0;i<job_list.length;i++){
          var j_id = job_list[i].j_id;
          var j_name = job_list[i].j_name;
          var j_desc = job_list[i].j_desc;
          var j_duration = job_list[i].j_duration;
          var j_price = job_list[i].j_price;
          var time_slot = job_list[i].time_slot;
          var ji_id = job_list[i].ji_id;
          //var j_img_path = jimg[0].j_img_path;
          //alert(j_img_path);
          //if(i==0){
          //  var jimg = j_img_path.replace(/\//g, "-");
          //  alert(jimg);
          //}
          ///slides+='<a class="slide" title="Image '+i+'" href="#"><span class="animate down" style="background-image: '+base_url+j_img_path+'"></span></a>';
          slides='<div id="imageContainer"><img src="'+base_url+c_img+'" height="200" width="360"><div class="slider_txt">'+j_desc+'</div></div>'; 
          jlist+='<li><a href="/customer_servicedet/'+j_id+'/'+j_name+'/'+j_price+'/'+sid+'/" class="item-link item-content"><div class="item-inner"><div class="item-title fs-12">'+j_name+'</div></div></a></li>'; 
          $(".amazontxt").removeClass("display-none");
          $(".amazontxt").addClass("display-block");
          $(".jobList").html(jlist);
        }
      }else{
        $(".no-service").removeClass("display-none");
        $(".no-service").addClass("display-block");
        jlist+='<div class="container4 text-center"><img src="img/no-service.png" width="80" class="op-5"></div><br/><div class="txt-amaz fs-16 text-center fw-600 p-20">No Services Found.</div>';
        $(".amazontxt").removeClass("display-block");
        $(".amazontxt").addClass("display-none");
        $(".no-service").html(jlist);
      }
      $("#slides").html(slides);        
    }
  });
  $.ajax({
    type:'POST', 
    data:{'sid':sid,'session_ccity':session_ccity},
    url:base_url+'APP/Appcontroller/getCustReviews',
    success:function(rev_res){
      var rev = $.parseJSON(rev_res);
      var review_rate = rev.review_rate;      
      var partner_rev = review_rate.partner;
      //console.log(partner_rev);
      var rev_list='';
      for(var i=0;i<partner_rev.length;i++){
        var p_name = partner_rev[i].p_name;
        var rate = partner_rev[i].rate;
        //alert(rate);
        var rating = partner_rev[i].rating;
        var p_addr1 = partner_rev[i].p_addr1;
        var a_name = partner_rev[i].a_name;
        var city_name  = partner_rev[i].city_name;
        var p_phone = partner_rev[i].p_phone;
        var p_email = partner_rev[i].p_email;
        var rev2 = partner_rev[i].review2;
        //console.log(rev2);
        var add = p_addr1+", "+a_name+", "+city_name;
        var sub_rate = '';
        if(rate==undefined){
          var rt='<span class="text-red fw-600 fs-12">No ratings.</span>';
        }else{
          var rt='<i class="f7-icons fs-16 rate_star mr-5">star_fill</i><span class="fs-14 text-grey">'+rate+'</span>';
        }
        rev_list+='<li class="accordion-item accordion-item-opened lightblue mb-5"><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title fs-12 text-capitalize"><span class="text-blue fw-600">'+p_name+'</span><br><i class="f7-icons fs-12 fw-600 text-grey">phone :</i> &nbsp;'+p_phone+'<br><i class="f7-icons fs-12 fw-600 text-grey">at_circle :</i> &nbsp;'+p_email+'</div><span class="float-right">'+rt+'</span></div></a><div class="accordion-item-content nobg"><div class="list no-hairlines-between"><ul>'; 
        if(rev2.length > 0){
          for(var j=0;j<rev2.length;j++){
            
            var c_name = rev2[j].c_name; 
            var rates = rev2[j].rate+".0";
            var review = rev2[j].review;
            var date_time = rev2[j].date_time;
            var res_dt = date_time.replace("`", " ");
            var final_dt = res_dt.replace("`","");
            sub_rate+=rates;     
            rev_list+='<li class="list-border"><div class="item-content"><div class="item-media"><i class="f7-icons fs-24 text-grey">person_crop_circle_fill</i></div><div class="item-inner"><div class="item-title fs-14 text-grey fw-600">'+c_name+'<br/><i class="f7-icons fs-12 light-grey mr-5">calendar</i><span class="light-grey fs-12">'+final_dt+'</span></div><div class="item-after lh-12"><i class="f7-icons fs-14 subrate mr-5">star_fill</i><span class="fw-500">'+rates+'</span></div></div></div><span><img class="ml-20" src="img/double-quote-grey.png" height="10" width="10"></span>&nbsp;<div class="fs-12 light-grey rev_div">'+review+'</div></li>';
          }
        }else{
          rev_list+='<li><div class="item-content"><div class="item-inner"><div class="item-title fs-14 text-red fw-500">Reviews not available.</div></div></li>';
        }
        rev_list+='</ul></div></div></li>';
        
        //rev_list+='<li class="accordion-item lightblue mb-5"><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title fs-12 text-capitalize"><span class="text-blue fw-600">'+p_name+'</span><br><i class="f7-icons fs-12 fw-600 text-grey">phone :</i> &nbsp;'+p_phone+'<br><i class="f7-icons fs-12 fw-600 text-grey">at_circle :</i> &nbsp;'+p_email+'</div><span class="float-right">'+rt+'</span></div></a><div class="accordion-item-content no-bg"><div class="list no-hairlines-between"><ul><li><div class="item-content"><div class="item-media"><i class="f7-icons fs-24 text-grey">person_crop_circle_fill</i></div><div class="item-inner"><div class="item-title">Ivan Petrov</div><div class="item-after">CEO</div></div></div></li></ul></div></div></li>'; 
      }
      $("#reviews").html(rev_list);
      app.preloader.hide();
    }
  });
});
function service_pg(){  
  var hidd_catid=$("#hidd_catid").val();
  var hidd_c_img_path=$("#hidd_c_img_path").val();
  //alert(hidd_catid+"======"+hidd_c_img_path);
  getcatServices(hidd_catid,hidd_c_img_path);
}
$$(document).on('page:init', '.page[data-name="customer_servicedet"]', function (page) {  
  checkConnection();
  //console.log(page.detail.route.params);
  var session_cid = window.localStorage.getItem("session_cid"); 
  var session_ccityid = window.localStorage.getItem("session_ccityid");
  var j_id = page.detail.route.params.j_id; 
  var sid = page.detail.route.params.sid;
  var job_name = page.detail.route.params.j_name; 
  var job_price = page.detail.route.params.j_price; 
  $(".job_title").html(job_name);
  var hidd_day = $(".day").val();
  $("#jobid").val(j_id);
  $("#cid").val(session_cid);
  $("#city_id").val(session_ccityid);
  $("#sid").val(sid);
  timeSlotTabs(j_id,hidd_day);   
});
function timeSlotTabs(j_id,hidd_day){
  checkConnection();
  var session_cid = window.localStorage.getItem("session_cid"); 
  var session_current_city = window.localStorage.getItem("session_current_city");
  var session_ccity = window.localStorage.getItem("session_ccity");
  var session_ccityid = window.localStorage.getItem("session_ccityid");
  //alert(hidd_day);
  var d = new Date();
  var tm =Math.floor(d.getTime()/1000);
 //console.log(tm);
  app.preloader.show();
  $.ajax({
    type:'POST', 
    data:{'j_id':j_id,'session_cid':session_cid,'session_ccityid':session_ccityid},
    url:base_url+'APP/Appcontroller/getJobDetails',
    success:function(res){
      var jobdet = $.parseJSON(res);
      var job_det = jobdet.job_det;
      var j_img = jobdet.j_img;
      var ser = jobdet.ser;
      var servc = ser.servc;
      var slot = ser.slot;
      var tt_slot = ser.tt_slot;   
      var cust = jobdet.cust;   
      //console.log(cust);
      var cst_name = cust.c_name;
      //alert(cst_name);
      var c_phn = cust.c_phone;
      var c_reg = cust.city_name;

      var area = jobdet.area;

      //console.log(job_det);      
      var job_slide = '';
      var jdet='';  
      var today_slots='';
      var tomorrow_slots='';
      var bookdiv='';
      for(var i=0;i<job_det.length;i++){
        var j_desc = job_det[i].j_desc;
        var j_duration = job_det[i].j_duration;
        var j_price = job_det[i].j_price;
        var time_slot = job_det[i].time_slot;
        var j_img_path = j_img[0].j_img_path;

        $("#amount").val(j_price);
        $("#hidd_timeslot").val(time_slot);
        job_slide+='<div id="imageContainer"><img src="'+base_url+j_img_path+'" height="200" width="360"><!--div class="slider_txt">'+j_desc+'</div--></div>';         
      }
      
      if(hidd_day=='today'){
        today_slots+='<div class="list accordion-list"><ul><li class="accordion-item"><a href="#" class="item-content item-link lightblue"><div class="item-inner"><div class="item-title text-blue fw-600 fs-10">When would you like Doorstep to serve you?</br><span class="text-red fw-500 fs-10">(Tap to view timeslots)</span></div></div></a><div class="accordion-item-content nobg elevation-5"><div class="block"><div class="row">';      
        for(var j=0;j<slot.length;j++){
          var tslot = tt_slot[j];          
          if(tm < tslot){            
            var sl_from = slot[j].from;
            var sl_to = slot[j].to;
            var st_id = slot[j].id;
            var slot_string = sl_from+" - "+sl_to;
            var slot_string1 = sl_from+" to "+sl_to;
            today_slots+='<!--input type="hidden" name="slot_id" id="'+st_id+'" value="'+st_id+"|"+slot_string1+'" /--><div class="col-50 p-2"><span class="lh-12"><label class="radio"><input type="radio" name="slot_id" value="'+st_id+"|"+slot_string1+'"><i class="icon-radio mr-2"></i></label><span class="fs-9 fw-500">'+slot_string+'</span></span></div>'; 
            //console.log(sl_from+" "+sl_to);
            continue; 
          }
        }   
        today_slots+='</div></div></div></li></ul></div>';
      }else if(hidd_day=='tomorrow'){
        tomorrow_slots+='<div class="list accordion-list"><ul><li class="accordion-item"><a href="#" class="item-content item-link lightblue"><div class="item-inner"><div class="item-title text-blue fw-600 fs-10">When would you like Doorstep to serve you?</br><span class="text-red fw-500 fs-10">(Tap to view timeslots)</span></div></div></a><div class="accordion-item-content nobg elevation-5"><div class="block"><div class="row">';
        for(var j=0;j<slot.length;j++){
          var tslot = tt_slot[j];                       
          var sl_from = slot[j].from;
          var sl_to = slot[j].to;
          var st_id = slot[j].id;
          var slot_string = sl_from+" - "+sl_to;
          var slot_string1 = sl_from+" to "+sl_to;
          tomorrow_slots+='<!--input type="hidden" name="slot_id" id="'+st_id+'" value="'+st_id+"|"+slot_string1+'" /--><div class="col-50 p-2"><span class="lh-12"><label class="radio"><input type="radio" name="slot_id" value="'+st_id+"|"+slot_string1+'"><i class="icon-radio mr-2"></i></label><span class="fs-9 fw-500">'+slot_string+'</span></span></div>';      
        }
        tomorrow_slots+='</div></div></div></li></ul></div>';
      }
      
      var jobid=$("#jobid").val();
      bookdiv+='<li class="item-content item-input item-input-focused"><div class="item-inner"><div class="">Current City: <span class="badge">'+session_current_city+'</span></div><div class="text-capitalize">Your City: <div class="chip chip-outline color-orange"><span class="chip-label fw-600">'+session_ccity+'<span></div></div></div></li>   <li class="item-content item-input item-input-focused"><div class="item-inner"><div class="item-title item-floating-label">Name</div><div class="item-input-wrap"><input type="text" name="c_name" value="'+cst_name+'"><span class="input-clear-button"></span></div></div></li><li class="item-content item-input item-input-focused"><div class="item-inner"><div class="item-title item-floating-label">Phone</div><div class="item-input-wrap"><input type="text" name="c_phone" value='+c_phn+'><span class="input-clear-button"></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Gender</div><div class="item-input-wrap input-dropdown-wrap"><select name="c_area" id="c_area" onchange="check_service(this.value,'+jobid+')"><option value="">---SELECT AREA---</option>';
        for(var i=0;i<area.length;i++){
          var a_id=area[i].a_id;
          var a_name=area[i].a_name;
          //alert(a_name);
          bookdiv+='<option value='+a_id+'>'+a_name+'</option>';
        } 

      bookdiv+='</select></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Address</div><div class="item-input-wrap"><textarea placeholder="Please enter the address as per selected city and area." name="address" id="address"></textarea></div></div></li>';
      if(slot.length!=0){
        bookdiv+='<div class="block"><div class="col"><a class="button submitbtn no-radius mb-10" onclick="bookCustService()">Pay <i class="f7-icons fs-16">money_dollar</i> '+j_price+'</a></div></div>';
      }

      $("#bookser_div").html(bookdiv);
      $("#job_slides").html(job_slide);
      $(".jobdet").html(jdet);
      if(hidd_day=='today'){
        $(".today_slots").html(today_slots);
      }else if(hidd_day=='tomorrow'){
        $(".tomorrow_slots").html(tomorrow_slots);
      }else{
        $(".tabs").html('<div class="text-red fw-600">Time slots are not defined.</div>');
      }
      app.preloader.hide();
    }
  }); 
}
function bookCustService(){
  checkConnection();
  app.preloader.show();
  var cust_orderForm = $(".cust_orderForm").serialize();
  var slot_id = $('input[name="slot_id"]').val();
  var j_id = $('input[name="jobid"]').val();
  var j_name = $('.job_title').html();
  var j_price = $('input[name="amount"]').val();
  var sid = $('input[name="sid"]').val();
  //alert(slot_id+" slot_id");  
  //console.log(cust_orderForm);
  $.ajax({
    type:'POST',     
    data:cust_orderForm, 
    url:base_url+'APP/Appcontroller/cust_order',
    success:function(ord_res){
      var parseRes = $.parseJSON(ord_res);
      var msg_msg = parseRes.msg;
      if(msg_msg=="notime"){ 
        app.dialog.alert("Please select Time.Time is required OR Time not available.");
        mainView.router.navigate("/customer_servicedet/"+j_id+"/"+j_name+"/"+j_price+"/"+sid+"/");  
      //  /customer_servicedet/'+j_id+'/'+j_name+'/'+j_price+'/'+sid+'/
      }else if(msg_msg=="inserted"){
        app.dialog.alert("Your service request has been placed.");   
        mainView.router.navigate("/customer_dash/");     
      }else if(msg_msg=="not_inserted"){
        app.dialog.alert("Error in booking the service!");    
        mainView.router.navigate("/customer_dash/");    
      }
      /*$(".tab-link").removeClass("tab-link-active");
      $(".tab").removeClass("tab-active");
      app.tab.show("#tab-2");
      $("#tab-2").addClass("tab-active");*/
      app.preloader.hide();
    } 
  }); 
}
function check_service(a_id,jobid){
  checkConnection();
  app.preloader.show();
  $.ajax({
    type:'POST', 
    data:{'a_id':a_id,'jobid':jobid},
    url:base_url+'APP/Appcontroller/check_service',
    success:function(status_res){
      var st_res = $.parseJSON(status_res);
      var status = st_res.status;
      //alert(status);
      if(status=="error"){
        app.dialog.alert("Oops!Service provider is not available in selected area");
      }
    }
  });
  app.preloader.hide();
}
function change_day(obj){
  var day = obj.attr("data-day");
  //alert(day);
  $('.day').val(day);
  var jobid=$("#jobid").val();
  timeSlotTabs(jobid,day);
}
function curr_loc(){
  //alert("called");
  openLOC();
  navigator.geolocation.getCurrentPosition(onSuccess, onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
}
function currentCity(){
  //alert("in currentcity function");
  openLOC();
  navigator.geolocation.getCurrentPosition(onSuccessCity, onErrorCity,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
}
function onSuccessCity(position){
  var session_cid = window.localStorage.getItem("session_cid"); 
  //alert("in onSuccessCity");
  app.preloader.show();
  var city_longitude = position.coords.longitude;
  var city_latitude = position.coords.latitude;
  //alert(city_longitude+"******************"+city_latitude);

  var city_geocoder = new google.maps.Geocoder();
  var city_LatLong = new google.maps.LatLng(city_latitude,city_longitude);

  //alert("city_LatLong "+city_LatLong);
  city_geocoder.geocode({'latLng': city_LatLong}, function(city_results, city_status) {
    //alert("city_status "+city_status);
    if (city_status === 'OK') {
      //$("#map-canvas").html(results+" ^^^^^^^^^^^^");
      if (city_results[0]) {
        //alert(results[0].formatted_address);
       // $("#currentcity").html(city_results[0].formatted_address);

        //alert(city_results[0].formatted_address);
        var addressComponents = city_results[0].address_components;
        var res=city_results[0].formatted_address;
        var city = "";        
        var types;
        var state = "";
        //alert("addressComponents.length "+addressComponents.length);
        var address_components=[];
        for(var i=0;i<addressComponents.length;i++){
          //alert(addressComponents[i]+" addressComponents[i]");
          address_component = addressComponents[i];
          types = address_component.types;
          //alert(types.length+" types.length");
          for (var j = 0; j < types.length; j++) {
            //alert("types "+types[j]);
            if (types[j] === 'administrative_area_level_1') {
              state = address_component.long_name;
            }
            if (types[j] === 'administrative_area_level_2') {
              city = address_component.long_name;
            }
          }
        }
        window.localStorage.setItem("session_current_city",city);
        updateCurrLocCust(session_cid,res);
        //alert("city :" + city );
        app.preloader.hide();             
      } else {
        app.dialog.alert('No results found');
      }
    } else {
      app.dialog.alert('Geocoder failed due to: ' + city_status);
    }
  });
  app.preloader.hide();
}
function onErrorCity(error){
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}
function updateCurrLocCust(session_cid,res){
  app.preloader.show();
  $.ajax({
    type:'POST', 
    data:{'session_cid':session_cid,'res':res},
    url:base_url+'APP/Appcontroller/updateCurrLoc',
    success:function(loc_res){
      if(loc_res=="loc_updated"){        
        mainView.router.navigate("/customer_dash/");
      }else if(loc_res=="not_updated"){
        app.dialog.alert("Error updating change location");
      }
      app.preloader.hide();
    }
  })
}
function onSuccess(position){
  app.preloader.show();
  //alert("in function");
  /*alert('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');*/
  var longitude = position.coords.longitude;
  var latitude = position.coords.latitude;

  $("#hidd_currlat").val(latitude);
  $("#hidd_currlon").val(longitude);


  var geocoder = new google.maps.Geocoder();
  var LatLong = new google.maps.LatLng(latitude,longitude);
  geocoder.geocode({'latLng': LatLong}, function(results, status) {
    if (status === 'OK') {
      //$("#map-canvas").html(results+" ^^^^^^^^^^^^");
      if (results[0]) {
        //alert(results[0].formatted_address);
        $("#formatted_address").html(results[0].formatted_address);
        app.preloader.hide();             
      } else {
        app.dialog.alert('No results found');
      }
    } else {
      app.dialog.alert('Geocoder failed due to: ' + status);
    }
  });
  app.preloader.hide();
}
function onError(error){
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}
function openLOC(){ 
  cordova.plugins.diagnostic.isLocationEnabled(function(enabled){ //isLocationEnabled    
    if(!enabled){
      //cordova.plugins.diagnostic.switchToLocationSettings(onRequestSuccess,onRequestFailure);
      cordova.plugins.diagnostic.switchToLocationSettings();
      cordova.plugins.diagnostic.isLocationAuthorized(successCallback, errorCallback);
       //mainView.loadPage("current-location.html");
    }else{
      //alert("Location service is ON");        
      mainView.router.navigate("/customer_dash/");
    }
  }, function(error){
    app.dialog.alert("The following error occurred: "+error);
  });   
}
function successCallback(success){
  //if(success){
    mainView.router.navigate("/customer_dash/");
  //}
} 
function errorCallback(error){  
  //if(error){
   alert(error.message);
  //} 
}
function chnagelocation(){
  mainView.router.navigate("/customer_loc/");
}
var autocomplete;
function geolocate111() {
  var input = document.getElementById('autocomplete');
  //var input = $('#autocomplete').val();
  autocomplete = new google.maps.places.Autocomplete(input);     
}

function geolocate() {
  var hidd_currlat = $("#hidd_currlat").val();
  var hidd_currlon = $("#hidd_currlon").val();
  var session_cid = window.localStorage.getItem("session_cid"); 
  //var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(-33.8902, 151.1759), new google.maps.LatLng(-33.8474, 151.2631)); // STATIC //

  var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(hidd_currlat, hidd_currlon));
  //alert(defaultBounds);
  var input = document.getElementById('search');
  var options = {
    bounds: defaultBounds,
    types: ['geocode','establishment']
  };
  var autocomplete = new google.maps.places.Autocomplete(input,options);
  autocomplete.addListener('place_changed', function() {

  var place = autocomplete.getPlace();
  var lat = place.geometry.location.lat();
  var lng = place.geometry.location.lng();
  //alert("LAT "+lat+" LNG "+lng);
 // on 10-2-2020 start //
  var ct_geocoder = new google.maps.Geocoder();
  var ct_LatLong = new google.maps.LatLng(lat,lng);
  //alert("HINA "+ct_LatLong);
  ct_geocoder.geocode({'latLng': ct_LatLong}, function(city_res, city_sta) {
    //alert("city_sta "+city_sta);
    if (city_sta === 'OK') {
      //$("#map-canvas").html(results+" ^^^^^^^^^^^^");
      if (city_res[0]) {
        //alert(city_res[0].formatted_address);
       // $("#currentcity").html(city_res[0].formatted_address);

        //alert(city_res[0].formatted_address);
        var addressComponents = city_res[0].address_components;
        var res=city_res[0].formatted_address;
        var city = "";        
        var types;
        var state = "";
        //alert("addressComponents.length "+addressComponents.length);
        var address_components=[];
        for(var i=0;i<addressComponents.length;i++){
          //alert(addressComponents[i]+" addressComponents[i]");
          address_component = addressComponents[i];
          types = address_component.types;
          //alert(types.length+" types.length");
          for (var j = 0; j < types.length; j++) {
            //alert("types "+types[j]);
            if (types[j] === 'administrative_area_level_1') {
              state = address_component.long_name;
            }
            if (types[j] === 'administrative_area_level_2') {
              city = address_component.long_name;
            }
          }
        }
        window.localStorage.setItem("session_current_city",city);
        updateCurrLocCust(session_cid,res);
        //alert("city :" + city );
        app.preloader.hide();             
      } else {
        app.dialog.alert('No results found');
      }
    } else {
      app.dialog.alert('Geocoder failed due to: ' + city_sta);
    }
  });
// on 10-2-2020 end //
  //alert("place "+place);
  console.log("in place "+place.name);
  if (!place.geometry) {
    //alert("Autocomplete's returned place contains no geometry");
      return;
  } 
  // If the place has a geometry, then present it on a map.
  if (place.geometry.viewport) {
    //alert(" in place.geometry.viewport");
    //map.fitBounds(place.geometry.viewport);
  } else {
    //alert("in place.geometry.location");
  }

  });
}

/*function onRequestSuccess(success){
  alert("in onRequestSuccess");
  alert(success+" success");
  if(success){
    
    cordova.plugins.locationAccuracy.request(successCallback, errorCallback, accuracy);      
  }
}  
function onRequestFailure(error){
  alert("in onRequestFailure");
  alert(error+" error");
   if(error){
    
     app.dialog.alert(error.message);
   }
}*/


  
//function geocodeLatLng(geocoder,latlng){
/*function geocodeLatLng(latitude,longitude){
  var geocoder = new google.maps.Geocoder();    
  //alert("in geocodeLatLng function ");
  //var latlngStr = latlng.split(', ');
  //alert(latlngStr[0]+"**************"+latlngStr[1]);
  //$("#map-canvas").html(latitude+"*************"+longitude);
 // var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
  var LatLong = new google.maps.LatLng(latitude,longitude);
  //alert(LatLong+" @@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  geocoder.geocode({'latLng': LatLong}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              alert(results[0].formatted_address);
              
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
}*/

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
// -------------------------------------- DATA NAME : PARTNER DASHBOARD ------------------------------- //
$$(document).on('page:init', '.page[data-name="partner_dash"]', function (page) {  
  checkConnection();
  //logOut();   
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

  var serving_city = $('#serving_city').val();
  var serving_area = $('#serving_area').val();
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
  }else if(serving_city==''){
    //$("#add_line1").html("Address line 1 is required");
    app.dialog.alert("Select Serving City");
    return false;
  }else if(serving_area==''){
    //$("#add_line1").html("Address line 1 is required");
    app.dialog.alert("Select Serving Area");
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
        app.preloader.hide(); 
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
        mainView.router.navigate('/customer_otpverify/'+hidd_mob+'/'+hidd_cid+'/');        
      }
    }
  });  
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
        var sess_city = result.city;
        var sess_cityid = result.city_id;
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
          window.localStorage.setItem("session_pcity",sess_city);
          window.localStorage.setItem("session_pcityid",sess_cityid);          
        }else if(parse_authmsg=="c_success"){  
          //alert("customer_dash");
          mainView.router.navigate("/location_on/");
          //mainView.router.navigate("/customer_dash/");
          window.localStorage.setItem("session_cid",result.user_session[0].c_id);
          window.localStorage.setItem("session_cname",result.user_session[0].c_name);
          window.localStorage.setItem("session_cphone",result.user_session[0].c_phone);
          window.localStorage.setItem("session_cemail",result.user_session[0].c_email);
          window.localStorage.setItem("session_ccreated",result.user_session[0].c_created_on);
          window.localStorage.setItem("session_ccity",sess_city); 
          window.localStorage.setItem("session_ccityid",sess_cityid);    
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
  window.localStorage.removeItem("session_ccity");
  window.localStorage.removeItem("session_ccityid");
  mainView.router.navigate("/login/");
}