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
// ------------------ C H E C K  I N T E R N E T  C O N N E C T I O N ------------------ //
function checkConnection(){  
  var networkState = navigator.connection.type;
  if(networkState=='none'){  
      mainView.router.navigate('/internet/');   
  }
}
// ----------------------- D E V I C E  R E A D Y ------------------------ //
function onDeviceReady(){}
// ---------------------------- C H E C K  S T O R A G E ---------------------------- //
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
    var previousIndex = swiper.previousIndex;
    //alert(previousIndex);
    //alert("slideChange called"+$(this).attr('class'));
    var last_slide = swiper.realIndex;
    //var last_slide1 = swiper.activeIndex;
    var arr_slides = swiper.slides;
    /*var clickedIndex = swiper.clickedIndex;
    alert("clickedIndex "+clickedIndex);
    var isEnd = swiper.isEnd;
    alert("isEnd "+isEnd);    
    var clickedSlide = swiper.clickedSlide;
    alert("clickedSlide "+clickedSlide);*/

    //alert(totalSlides+"-----last_slide "+last_slide+" last_slide1 "+last_slide1); 
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
  });
});  
/*$('.fnext').on('click', function(e) { 
  alert("called"); 
  swiper.slideNext();
});*/
function nextSlide(){
  console.log(swiper);  
  swiper.slideNext(); 
  console.log(swiper.snapIndex);
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
// ********************************** CUSTOMER FUNCTIONS ********************************** //
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
  //var add_line1 = $('#add_line1').val();
  var street_no =$("#street_no").val();
  var street_name = $("#street_name").val();
  var street_unit = $("#street_unit").val();
  var pincode = $("#pincode").val();

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
  }else if(street_no==''){
    //$("#email").html("Email is required");
    app.dialog.alert("Street no is required");
    return false;
  }else if(street_name==''){
    //$("#email").html("Email is required");
    app.dialog.alert("Street name is required");
    return false;
  }else if(street_unit==''){
    //$("#email").html("Email is required");
    app.dialog.alert("Street unit is required");
    return false;
  }else if(pincode==''){
    //$("#email").html("Email is required");
    app.dialog.alert("Pincode is required");
    return false;
  }/*else if(add_line1==''){
    //$("#add_line1").html("Address line 1 is required");
    app.dialog.alert("Address line 1 is required");
    return false;
  }*/else if(serving_city==''){
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
function change_day(obj){
  var day = obj.attr("data-day");
  //alert(day);
  $('.day').val(day);
  var jobid=$("#jobid").val();
  timeSlotTabs(jobid,day);
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
// ********************************** PARTNER FUNCTIONS ********************************** //
// ------------------------- DATA NAME : PARTNER DASHBOARD ------------------------- //
$$(document).on('page:init', '.page[data-name="partner_dash"]', function (page) {  
  checkConnection();
  app.preloader.show();
  //getPartnerData();
  app.preloader.hide();
  //logOut();     
});
function getPartnerData(){
  checkConnection();
  var session_pid = window.localStorage.getItem("session_pid"); 
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
      $(".creditDiv").html("<div class='chip seg-outline'><div class='chip-label credits text-uppercase fs-10 fw-600'>credits : "+credits+" ($ "+p_credit_amount+".00)</div></div>");
      $(".partner_ordcnt").html(neword_cnt.length);
    }
  });
  app.preloader.hide();
}
$$(document).on('page:init', '.page[data-name="partner_shopping_cart"]', function (page) {
  //$("span .tab-link-highlight").addClass("tab-highlight");
  //$(".tab-link-highlight").css('background','#232F3E!important');
  //$(".tab-link-highlight").css('top','94%!important');
  $('img.lazy').trigger('lazy');
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/partnerShop',
    //data:{'session_pid':session_pid},
    success:function(prod_data){
      var parse_prod = $.parseJSON(prod_data);
      var newarival = parse_prod.newarival;
      var popularprd = parse_prod.popularprd;
      console.log(newarival);
      console.log(popularprd);
      var new_prods = '';
      var popular_prods = '';
      //var jqstep = '';
      //new_prods+='<div class="stepper stepper-small stepper-fill stepper-init color-orange"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input type="text" value="0" min="0" max="20" step="1" readonly></div><div class="stepper-button-plus"></div></div>';
      for(var i=0;i<newarival.length;i++){
        var p_img_path = newarival[i].p_img_path;
        var p_name = newarival[i].p_name;
        var p_price = newarival[i].p_price;
         //jqstep+="<div class='stepper stepper-small stepper-init'> <div class='stepper-button-minus'></div> <div class='stepper-input-wrap'> <input type='text' value='0' min='0' max='100' step='1' readonly> </div> <div class='stepper-button-plus'></div> </div>";
        /*var stepper = app.stepper.create({
          el: '.stepper',
          on: {
            change: function () {
              console.log('Stepper value changed');
            }
          }
        });*/
        var triangle='<div id="triangle-topleft-dev"><span class="impfont fw-700 r-3"><i class="f7-icons fs-18">cart</i></span></div>';
        new_prods+='<li class="col-50 elevation-19 mb-10">'+triangle+'<img src="'+base_url+p_img_path+'" class="prod_img lazy lazy-fade-in demo-lazy" /><div class="text-center text-grey fw-600">'+p_name+'</div><div class="text-center text-grey fw-600"><i class="f7-icons fs-18">money_dollar</i>'+p_price+'</div><div class="text-center"><!--div class="jqstepper_'+i+'"></div--><div class="stepper stepper-init stepper-fill color-red"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input type="text" value="0" min="0" max="100" step="1" readonly></div><div class="stepper-button-plus"></div></div></div></li>';
        var stepper = app.stepper.get('.stepper');
        //console.log(jqstep);
        //stepper.open();
       //$(".jqstepper_"+i).html(jqstep);
      }
      for(var j=0;j<popularprd.length;j++){
        var pop_img_path = popularprd[j].p_img_path;
        var pop_name = popularprd[j].p_name;
        var pop_price = popularprd[j].p_price;
        popular_prods+='<li class="col-50 elevation-19 mb-10">'+triangle+'<img src="'+base_url+pop_img_path+'" class="prod_img lazy lazy-fade-in demo-lazy" /><div class="text-center text-grey fw-600">'+pop_name+'</div><div class="text-center text-grey fw-600"><i class="f7-icons fs-18">money_dollar</i>'+pop_price+'</div></li>';
      }
     //$(".jqstepper_"+i).html(jqstep);
      $("#new_arrivals").html(new_prods);
      $("#popular_prods").html(popular_prods);
    }
  });
});
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
// ----------------------------------- VALIDATIONS ENDS ---------------------------------- //

// -------------------------------- L O G O U T -------------------------------- //
function logOut(){
  checkConnection();
  window.localStorage.removeItem("session_pid"); 
  window.localStorage.removeItem("session_pname"); 
  window.localStorage.removeItem("session_pphone"); 
  window.localStorage.removeItem("session_pemail"); 
  window.localStorage.removeItem("session_pcreated"); 
  window.localStorage.removeItem("session_pcity"); 
  window.localStorage.removeItem("session_pcityid"); 
  window.localStorage.removeItem("session_cid");  
  window.localStorage.removeItem("session_cname"); 
  window.localStorage.removeItem("session_cphone"); 
  window.localStorage.removeItem("session_cemail"); 
  window.localStorage.removeItem("session_ccreated"); 
  window.localStorage.removeItem("session_ccity");
  window.localStorage.removeItem("session_ccityid");
  window.localStorage.removeItem("session_current_city");
  window.localStorage.removeItem("session_current_loc");
  mainView.router.navigate("/login/");
}