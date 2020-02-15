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
          /*window.localStorage.setItem("session_pcity",sess_city);
          window.localStorage.setItem("session_pcityid",sess_cityid); */
          window.localStorage.setItem("session_reg_partcity",sess_city);
          window.localStorage.setItem("session_reg_partcityid",sess_cityid);         
        }else if(parse_authmsg=="c_success"){  
          //alert("customer_dash");
          mainView.router.navigate("/location_on/");
          //mainView.router.navigate("/customer_dash/");
          window.localStorage.setItem("session_cid",result.user_session[0].c_id);
          window.localStorage.setItem("session_cname",result.user_session[0].c_name);
          window.localStorage.setItem("session_cphone",result.user_session[0].c_phone);
          window.localStorage.setItem("session_cemail",result.user_session[0].c_email);
          window.localStorage.setItem("session_ccreated",result.user_session[0].c_created_on);
          /*window.localStorage.setItem("session_ccity",sess_city); 
          window.localStorage.setItem("session_ccityid",sess_cityid);*/
          window.localStorage.setItem("session_reg_custcity",sess_city); 
          window.localStorage.setItem("session_reg_custcityid",sess_cityid);    
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
var swiper1;
$$(document).on('page:init', '.page[data-name="customer_dash"]', function (page) { 
  //logOut(); 
  checkConnection();
  app.preloader.show();
  var session_cid = window.localStorage.getItem("session_cid");  
  var session_cust_current_city  = window.localStorage.getItem("session_cust_current_city");
  var session_cust_current_loc = window.localStorage.getItem("session_cust_current_loc");
  alert("session_cust_current_city "+session_cust_current_city+"********* "+session_cust_current_loc);
  swiper1 = new Swiper('.swiper-container_dash', {
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
        cat_blocks+='<div class="col-33 text-center elevation_blocks elevation-9" onclick="getcatServices('+cat_id+','+"'"+c_img_path+"'"+')"><img src="'+base_url+c_img_path+'" class="block_img lazy lazy-fade-in" height="50" width="50"/><div class="fs-12">'+c_name+'</div></div>';
      }
      $(".catblocks").html(cat_blocks);
    }
  });
  var button_active=$(".button-active").val();
  //alert(button_active+"button_active");
  var divname="pen_orders";
  //alert(session_cid);
  if(session_cid!='' && session_cid!=null){ 
    $(".center-screen").remove(); 
    $(".booking_btns").removeClass("display-none");
    $(".booking_btns").addClass("display-block"); 
    $(".bookserbtn").removeClass("display-block");
    $(".bookserbtn").addClass("display-none");
    getBookingbyStatus(button_active,divname);
  }else{
    //console.log("ELSE");
    $(".bookings_tot").remove();
    $(".booking_btns").removeClass("display-block");
    $(".booking_btns").addClass("display-none");
    $(".bookserbtn").removeClass("display-none");
    $(".bookserbtn").addClass("display-block");
  }
  if(session_cid!='' && session_cid!=null){  
    $(".no_session_profile").removeClass("display-block");
    $(".no_session_profile").addClass("display-none");
    $(".prof_info").removeClass("display-none");
    $(".prof_info").addClass("display-block");
    $(".profile_div").removeClass("display-none");   
    $(".profile_div").addClass("display-block");
    $(".editprofbtn").removeClass("display-none");
    $(".editprofbtn").addClass("display-block");
    $(".no_sess_list").removeClass("display-block");
    $(".no_sess_list").addClass("display-none");
    $.ajax({
      type:'POST', 
      data:{'session_cid':session_cid},
      url:base_url+'APP/Appcontroller/userProfile',
      success:function(prof_result){
        var prf = $.parseJSON(prof_result);
        var profile = prf.profile;
        //console.log("profile "+profile);
        var cid = profile[0].c_id;
        //alert(cid);
        var nm_fltr = (profile[0].c_name.charAt(0));
        $(".nmfltr").html(nm_fltr);
        var c_name = profile[0].c_name;
        var c_email = profile[0].c_email;
        var c_phone = profile[0].c_phone;
        //var c_addr = profile[0].c_addr;
        var street_no = profile[0].street_no;
        var street_name = profile[0].street_name;
        var street_unit = profile[0].street_unit;
        var pin = profile[0].pin;
        var a_id = profile[0].a_id;
        var city_id = profile[0].city_id;
        var c_created_on = profile[0].c_created_on;
        $(".cname").html(c_name);
        $(".email_icon").html('<i class="f7-icons fs-18">envelope_fill</i>');
        $(".cemail").html(c_email);

        $(".phone_icon").html('<i class="f7-icons fs-18">phone_fill</i>');
        $(".cphone").html(c_phone);

        //$(".addr_icon").html();
        //$(".caddr").html(c_addr);

        if(street_no!=""){
          $(".strno_icon").html('<i class="f7-icons fs-18">placemark</i>');
          $(".cstno").html(street_no);
          //$(".caddr").html(c_addr);
        }else{
          $(".street_no").remove();
        }
 
        if(street_name!=""){
          $(".strnm_icon").html('<i class="f7-icons fs-18">placemark_fill</i>');
          $(".cstnm").html(street_name);
        }else{
          $(".street_nm").remove();        
        }

        if(street_unit!=""){
          $(".struniy_icon").html('<i class="f7-icons fs-18">map_pin_ellipse</i>');
          $(".cstuny").html(street_unit);
        }else{
          $(".unit_str").remove();
        }
        if(pin!=""){
          $(".pin_icon").html('<i class="f7-icons fs-18">map_pin</i>');
          $(".cpincode").html(pin);
        }else{
          $(".pinico").remove();
        }

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
            //console.log("****"+carea);
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
  }else{
    $(".prof_info").removeClass("display-block");
    $(".prof_info").addClass("display-none"); 
    $(".profile_div").removeClass("display-block");   
    $(".profile_div").addClass("display-none");
    $(".editprofbtn").removeClass("display-block");
    $(".editprofbtn").addClass("display-none");
    $(".no_session_profile").removeClass("display-none");
    $(".no_session_profile").addClass("display-block");
    $(".no_sess_list").removeClass("display-none");
    $(".no_sess_list").addClass("display-block");
    app.preloader.hide();
  }
  app.preloader.hide();
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
      //console.log(order);
      var ord_list=''; 
      $(".booking_btns").removeClass("display-none");
      $(".booking_btns").addClass("display-block"); 
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
               
              //alert(i+"-----"+change_add_status);
              if(change_add_status==1){
                //alert("if 1");
                btn_loc+='<button class="col-50 seg-outline loc_btn p-2 nobg fs-11 display-block w-100 mr-5" id="seal_'+i+'"><i class="f7-icons fs-13 text-red mr-5">checkmark_seal_fill</i>Location approved</button>';
                btn_loc+='';
              }else if(change_add_status==2){
                //alert("else if 2");
                btn_loc+='<button class="col-50 seg-outline loc_btn p-2 nobg fs-11 display-block w-100 mr-5" id="seal_'+i+'"><i class="f7-icons fs-13 text-red mr-5">multiply_circle_fill</i>Change location request decline</button>';
              }else if(change_add_status==0){
                //alert("else if 0");
                btn_loc+='<button class="col-33 button button-small button-fill loc_btn submitbtn fs-10 display-block" id="loc_btn_'+i+'" onclick="changeServiceLoc('+i+','+c_id+','+acpt_id+','+o_id+')"><i class="f7-icons fs-12 mr-5">placemark_fill</i>Location</button>';
              }  


              /*if((change_address!='' && change_add_status==1) || (address!='' && change_add_status!=1 && (change_address=='' || change_address==null))){
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
              }*/

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
      }

      }  
      $(".ordercls").html("");
      $("#"+divname).html(ord_list);      
      app.preloader.hide();
    }
  });
}
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
        list+='<li><a href="/customer_service_types/'+s_id+'/'+s_name+'/'+cimg+'/'+cat_id+'/" class="item-link item-content"><div class="item-media"><img src="'+base_url+s_img_path+'" class="block_img lazy lazy-fade-in" height="60" width="60"/></div><div class="item-inner"><div class="item-title fs-12">'+s_name+'</div></div></a></li>';
      }
      $(".servList").html(list);
      app.preloader.hide();
    }
  });
}
function service_pg(){  
  var hidd_catid=$("#hidd_catid").val();
  var hidd_c_img_path=$("#hidd_c_img_path").val();
  //alert(hidd_catid+"======"+hidd_c_img_path);
  getcatServices(hidd_catid,hidd_c_img_path);
}
$$(document).on('page:init', '.page[data-name="customer_service_types"]', function (page) {  
  checkConnection();
  //console.log(page.detail.route.params);
  var sid = page.detail.route.params.sid; 
  var sname = page.detail.route.params.sname;
  var c_img_path = page.detail.route.params.cimg; 
  var catid = page.detail.route.params.cat_id;
  var session_cust_current_city  = window.localStorage.getItem("session_cust_current_city");
  var session_cust_current_loc = window.localStorage.getItem("session_cust_current_loc");
  var session_cid = window.localStorage.getItem("session_cid"); 
  $("#hidd_catid").val(catid);
  $("#hidd_c_img_path").val(c_img_path);
  var c_img = c_img_path.replace(/-/g, '/');
  $(".serv_title").html(sname);
  app.preloader.show();
  if(session_cid!='' && session_cid!=null){
    session_cust_current_city = session_cust_current_city;
  }else{
    alert("OPEN GPS SERVICE AND GET CURRENT CITY");
    openLOC();
    navigator.geolocation.getCurrentPosition(function(position){
      var longitude = position.coords.longitude;
      var latitude = position.coords.latitude;
      var session_cid = window.localStorage.getItem("session_cid"); 
      $("#hidd_currlat").val(latitude);
      $("#hidd_currlon").val(longitude);
      var geocoder = new google.maps.Geocoder();
      var LatLong = new google.maps.LatLng(latitude,longitude);
      geocoder.geocode({'latLng': LatLong}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          //alert(results[0].formatted_address);
          var addressComponents = results[0].address_components;
          var res = results[0].formatted_address;
          var city = "";        
          var types;
          var state = "";
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
          $("#formatted_address").html(res);
          window.localStorage.setItem("session_cust_current_city",city);
          window.localStorage.setItem("session_cust_current_loc",res);
          //updateCurrLocCust(session_cid,res,city);
          session_cust_current_city = city;
          app.preloader.hide();             
        } else {
          app.dialog.alert('No results found');
        }
      } else {
        app.dialog.alert('Geocoder failed due to: ' + status);
      }
    });
        app.preloader.hide();
    },
    function(err){
      alert('code: '    + err.code    + '\n' + 'message: ' + err.message + '\n');
    },{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
  }


  $.ajax({
    type:'POST', 
    data:{'sid':sid,'session_cust_current_city':session_cust_current_city},
    url:base_url+'APP/Appcontroller/getJoblist',
    success:function(job_res){
      var jobparse = $.parseJSON(job_res);
      var job_list = jobparse.job_list;
      var jimg = jobparse.j_img;
      var search = jobparse.search;
      var job = search['jobs'];
      var partner = search['partner'];
      console.log(job.length);
      console.log(partner);
      var jlist = '';
      var slides = ''; 
      if(partner.length==0){
        jlist='<div class="block text-red fw-600 fs-12">No Provider Available In This Location</div>';
      }else{
        alert("ELSE");
        if(job.length > 0 ){
          $(".no-service").removeClass("display-block");
          $(".no-service").addClass("display-none");
          if(job.length==0){
            jlist='<div class="block text-red fw-600 fs-12">No Provider Available In This Location</div>';
          }else{
            for(var i=0;i<job.length;i++){
              var j_id = job[i].j_id;
              var j_name = job[i].j_name;
              var j_desc = job[i].j_desc;
              var j_duration = job[i].j_duration;
              var j_price = job[i].j_price;
              var time_slot = job[i].time_slot;
              var ji_id = job[i].ji_id;
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
  }
  });

  $.ajax({
    type:'POST', 
    data:{'sid':sid,'session_ccity':session_cust_current_city},
    url:base_url+'APP/Appcontroller/getCustReviews', 
    success:function(rev_res){
      var rev = $.parseJSON(rev_res);
      var review_rate = rev.review_rate;      
      var partner_rev = review_rate.partner;
      //console.log(partner_rev);
      //console.log(partner_rev.length+"***************");
      var rev_list='';
      if(partner_rev.length==0){
        rev_list='<div class="block text-red fw-600 fs-12">No Provider Available In This Location</div>';
      }else{
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
              if(c_name!=null){
                c_name=c_name;
              }else{
                c_name='';
              }    
              rev_list+='<li class="list-border"><div class="item-content"><div class="item-media"><i class="f7-icons fs-24 text-grey">person_crop_circle_fill</i></div><div class="item-inner"><div class="item-title fs-14 text-grey fw-600">'+c_name+'<br/><i class="f7-icons fs-12 light-grey mr-5">calendar</i><span class="light-grey fs-12">'+final_dt+'</span></div><div class="item-after lh-12"><i class="f7-icons fs-14 subrate mr-5">star_fill</i><span class="fw-500">'+rates+'</span></div></div></div><span><img class="ml-20" src="img/double-quote-grey.png" height="10" width="10"></span>&nbsp;<div class="fs-12 light-grey rev_div">'+review+'</div></li>';
            }
          }else{
            rev_list+='<li><div class="item-content"><div class="item-inner"><div class="item-title fs-14 text-red fw-500">Reviews not available.</div></div></li>';
          }
          rev_list+='</ul></div></div></li>';
          
          //rev_list+='<li class="accordion-item lightblue mb-5"><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title fs-12 text-capitalize"><span class="text-blue fw-600">'+p_name+'</span><br><i class="f7-icons fs-12 fw-600 text-grey">phone :</i> &nbsp;'+p_phone+'<br><i class="f7-icons fs-12 fw-600 text-grey">at_circle :</i> &nbsp;'+p_email+'</div><span class="float-right">'+rt+'</span></div></a><div class="accordion-item-content no-bg"><div class="list no-hairlines-between"><ul><li><div class="item-content"><div class="item-media"><i class="f7-icons fs-24 text-grey">person_crop_circle_fill</i></div><div class="item-inner"><div class="item-title">Ivan Petrov</div><div class="item-after">CEO</div></div></div></li></ul></div></div></li>'; 
        }
      }
      $("#reviews").html(rev_list);
      app.preloader.hide();
    }
  });
  app.preloader.hide();
});
function chnagelocation(){
  mainView.router.navigate("/customer_loc/");
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
      var c_strno = profile[0].street_no;
      var c_sname = profile[0].street_name;
      var c_sunit = profile[0].street_unit;
      var c_pin = profile[0].pin;

      //var c_addr = profile[0].c_addr;
      var a_id = profile[0].a_id;
      var city_id = profile[0].city_id;
      $("#hidden_cid").val(c_id);
      $("#cname").val(c_name);
      $("#cemail").val(c_email);
      $("#cphone").val(c_phone);
      $("#str_no").val(c_strno);
      $("#str_nm").val(c_sname);
      $("#str_unit").val(c_sunit);
      $("#str_pin").val(c_pin);

      //$("#caddr").val(c_addr);
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
function curr_loc(){
  //alert("called");
  openLOC();
  navigator.geolocation.getCurrentPosition(onSuccess, onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
}
function openLOC(){ 
  cordova.plugins.diagnostic.isLocationEnabled(function(enabled){ //isLocationEnabled    
    if(!enabled){
      //cordova.plugins.diagnostic.switchToLocationSettings(onRequestSuccess,onRequestFailure);
      cordova.plugins.diagnostic.switchToLocationSettings();
      cordova.plugins.diagnostic.isLocationAuthorized(successCallback, errorCallback);
       //mainView.loadPage("current-location.html");
    }else{
      alert("Location service is ON");        
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
function onSuccess(position){
  app.preloader.show();
  alert("in onSuccess function");
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
  var session_cid = window.localStorage.getItem("session_cid"); 
  $("#hidd_currlat").val(latitude);
  $("#hidd_currlon").val(longitude);
  var geocoder = new google.maps.Geocoder();
  var LatLong = new google.maps.LatLng(latitude,longitude);
  geocoder.geocode({'latLng': LatLong}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        //alert(results[0].formatted_address);
        var addressComponents = results[0].address_components;
        var res = results[0].formatted_address;
        var city = "";        
        var types;
        var state = "";
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
        $("#formatted_address").html(res);
        window.localStorage.setItem("session_cust_current_city",city);
        window.localStorage.setItem("session_cust_current_loc",res);
        //updateCurrLocCust(session_cid,res,city);
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
function geolocate() {
  var hidd_currlat = $("#hidd_currlat").val();
  var hidd_currlon = $("#hidd_currlon").val();

  alert("hidd_currlat "+hidd_currlat+" ^^^ hidd_currlon "+hidd_currlon);
  var session_cid = window.localStorage.getItem("session_cid"); 
  //var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(-33.8902, 151.1759), new google.maps.LatLng(-33.8474, 151.2631)); // STATIC //

  var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(hidd_currlat, hidd_currlon));
  alert(defaultBounds);
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
  alert("HINA "+ct_LatLong);
  ct_geocoder.geocode({'latLng': ct_LatLong}, function(city_res, city_sta) {
    if (city_sta === 'OK') {
      if (city_res[0]) {
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
        $("#formatted_address").html(res);
        window.localStorage.setItem("session_cust_current_city",city);
        window.localStorage.setItem("session_cust_current_loc",res);        
        //updateCurrLocCust(session_cid,res,city);
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
function clicked_me(){
  var active_tab = $(".tab-active").attr('id');
  $("#hidd_proftab").val(active_tab);
  //alert("tab-active "+active_tab); 
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
  /*window.localStorage.removeItem("session_ccity");
  window.localStorage.removeItem("session_ccityid");*/
  //window.localStorage.removeItem("session_reg_custcity");
  //window.localStorage.removeItem("session_reg_custcityid");
  window.localStorage.removeItem("session_current_city");
  window.localStorage.removeItem("session_current_loc");
  mainView.router.navigate("/login/");
}