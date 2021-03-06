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
document.addEventListener("resume", onResume, false);
window.setInterval(function(){
   checkConnection();
   //onResume()
   var totalcartqty=parseInt(window.localStorage.getItem("totalcartqty"));
   //console.log(totalcartqty);
    if (totalcartqty>0) {
       $('.totalcartqty').html(totalcartqty);
    }else{
       totalcartqty=0;
       $('.totalcartqty').html(totalcartqty);
       window.localStorage.setItem("totalcartqty", totalcartqty);
    }
}, 5000);

function onResume() { 
  //console.log("Handle the resume event");
  var session_cid = window.localStorage.getItem("session_cid");
  if(session_cid){
    if(session_cid!=''){
      $.ajax({
        type:"POST",
        dataType:"json",  
        data:{'session_cid':session_cid},
        url: base_url+'APP/Appcontroller/checkForreview', 
        success: function(result){ 
          var status = result.status;
          var modal = result.modal;
          //console.log(status+"!!!!!!!! "+modal);
          var o_id = result.o_id;
          var c_id = result.c_id;
          var p_id = result.p_id;
          var ser_id = result.ser_id;
          var job_id = result.job_id;
          var city_id = result.city_id;
          var area_id = result.area_id;
          var j_name = result.j_name;
          var p_name = result.p_name;          
          //var rate_form='';
          if(status=='success'){ 
            if(modal=='true'){
            var span = document.createElement("div");
            span.innerHTML = '<div class="rating_form list w-100"><form id="ratelast"><ul class="w-100"><li class="item-content item-input item-input-outline w-100 row"><div class="item-inner"><div class="item-title item-label fw-600 mb-5 l-0">Give rates<br/></div><div class="w-100 text-center"><div class="rating-widget"><!-- Rating Stars Box --><div class="rating-stars text-center"><ul id="stars" class="display-if pl-0"><input type="hidden" name="hidd_rate_home" id="hidd_rate_home" /><input type="hidden" name="o_id" id="o_id" value="'+o_id+'" /><input type="hidden" name="c_id" id="c_id" value="'+c_id+'" /><input type="hidden" name="p_id" id="p_id" value="'+p_id+'" /><input type="hidden" name="ser_id" id="ser_id" value="'+ser_id+'" /><input type="hidden" name="job_id" id="job_id" value="'+job_id+'" /><input type="hidden" name="city_id" id="city_id" value="'+city_id+'" /><input type="hidden" name="area_id" id="area_id" value="'+area_id+'" /><li class="star" title="Poor" data-value="1" id="star_1" onclick="ratestar_home(this)"><i class="f7-icons lightgrey" id="fillstrhome_1">star_fill</i></li><li class="star" title="Fair" data-value="2" id="star_2" onclick="ratestar_home(this)"><i class="f7-icons lightgrey" id="fillstrhome_2">star_fill</i></li><li class="star" title="Good" data-value="3" id="star_3" onclick="ratestar_home(this)"><i class="f7-icons lightgrey" id="fillstrhome_3">star_fill</i></li><li class="star" title="Excellent" data-value="4" id="star_4" onclick="ratestar_home(this)"><i class="f7-icons lightgrey" id="fillstrhome_4">star_fill</i></li><li class="star" title="WOW!!!" data-value="5" id="star_5" onclick="ratestar_home(this)"><i class="f7-icons lightgrey" id="fillstrhome_5">star_fill</i></li></ul></div></div></div></div><div class="item-inner"><div class="item-input-wrap"><input type="text" placeholder="Give a review" name="review_txt" id="reviewtxt" class="fs-12"><span class="input-clear-button"></span></div></div>         <button class="col-33 button fs-10 mb-5 button-small seg_btn" type="button" onclick="return giveratelastservice('+c_id+','+o_id+')">Save</button><button class="col-33 button button-outline fs-10 mr-15 mb-5 button-small seg-outline" type="button" onclick="close_me()">Rate later</button></li></ul></form></div>';
              swal({
                title:"How's your last service?",
                text:'Your last service '+j_name+' was completed by '+p_name+'.'+' \n Your Feedback will be helpful!',
                content: span,                 
                buttons: false,                          
              }); 
              //$(".swal-overlay").addClass("swal-overlay--show-modal"); 
              $(".swal-footer").addClass("text-center");
            }
          }
        }
      });
    }
  }
}
function close_me(){
  swal.close();
}
function giveratelastservice(c_id,o_id){
  var review_txt=$('input[name="review_txt"]').val();
  var hidd_rate_home=$('input[name="hidd_rate_home"]').val();
  if(review_txt==''){
    app.dialog.alert("Enter review");
    return false;
  }else if(hidd_rate_home==''){
    app.dialog.alert("Please select the stars");
    return false;
  }else{  
    var ratelast = $("#ratelast").serialize();
    console.log(ratelast);
    $.ajax({
      type:'POST',
      url: base_url+'APP/Appcontroller/LastserviceRating', 
      data:ratelast,
      dataType:'json', 
      success: function(result){
      var status = result.status;
      var rate = result.rate; 
      alert(status+"-------"+rate);
        if(status=='success'){
          /*if(rate=='null'){
            app.dialog.alert("Please select the stars");
            return false;
          }else{*/
            app.dialog.alert("Thankyou for your feedback");
            swal.close(); 
            return false; 
          //}
        }
      }

    });
  }
}
// ------------------ C H E C K  I N T E R N E T  C O N N E C T I O N ------------------ //
function checkConnection(){  
  var networkState = navigator.connection.type;
  if(networkState=='none'){  
      mainView.router.navigate('/internet/');   
  }
}
// ----------------------- D E V I C E  R E A D Y ------------------------ //
function onDeviceReady(){
  onResume();  
}
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
    }
  });*/
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
/*var swiper;
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
/*    pagination: {
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

    //alert(totalSlides+"-----last_slide "+last_slide); 
/*    if(totalSlides == last_slide){      
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
/*function nextSlide(){
  console.log(swiper);  
  swiper.slideNext(); 
  console.log(swiper.snapIndex);
}*/
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
          //window.localStorage.setItem("totalcartqty", 0);     
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

var swiper1;
$$(document).on('page:init', '.page[data-name="customer_dash"]', function (page) { 
  //logOut(); 
  checkConnection();
  onResume();
  app.preloader.show();
  var session_cid = window.localStorage.getItem("session_cid");  
  var session_cust_current_city  = window.localStorage.getItem("session_cust_current_city");
  var session_cust_current_loc = window.localStorage.getItem("session_cust_current_loc");
  //alert("session_cust_current_city "+session_cust_current_city+"********* "+session_cust_current_loc);
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
  $("#formatted_address").html(session_cust_current_loc);
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
        cat_blocks+='<div class="col-50 text-center elevation_blocks elevation-15" onclick="getcatServices('+cat_id+','+"'"+c_img_path+"'"+')"><img src="'+base_url+c_img_path+'" class="block_img lazy lazy-fade-in" height="50" width="50"/><div class="fs-12">'+c_name+'</div></div>';
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
/*function getBookingbyStatus(button_active,divname){
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
      
      console.log(cust);
      console.log(order);
      console.log(order_cnts);
      console.log(order_cnts_pen);
      console.log(order_cnts_start);
      console.log(order_cnts_fin); 
      var c_id = cust.c_id; 
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
        var z=0;
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
          var review_status = order[i].review_status;

          var street_no = order[i].street_no;
          var street_name = order[i].street_name;
          var street_unit = order[i].street_unit;
          var pin = order[i].pin;
          var a_name = order[i].a_name;

          if(order_status==0){
            var status_cls='pending'; 
            var status_txt='Pending';
            var review='';
            var rate_form='';
          }else if(order_status==1){
            var status_cls='started';    
            var status_txt='Started';
            var review='';
            var rate_form='';
          }else{
            var status_cls='finished';
            var status_txt='Finished';
            var rate_form='<div class="rating_form_'+i+' list display-none w-100"><ul class="w-100"><li class="item-content item-input item-input-outline w-100 row"><div class="item-inner"><div class="item-title item-label l-0">Give rates<br/></div><div class="w-100 text-center"><div class="rating-widget"><!-- Rating Stars Box --><div class="rating-stars text-center"><ul id="stars" class="display-if"><input type="hidden" name="hidd_rate" id="hidd_rate" /><li class="star" title="Poor" data-value="1" id="star_'+i+'_1" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_1">star_fill</i></li><li class="star" title="Fair" data-value="2" id="star_'+i+'_2" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_2">star_fill</i></li><li class="star" title="Good" data-value="3" id="star_'+i+'_3" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_3">star_fill</i></li><li class="star" title="Excellent" data-value="4" id="star_'+i+'_4" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_4">star_fill</i></li><li class="star" title="WOW!!!"" data-value="5" id="star_'+i+'_5" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_5">star_fill</i></li></ul></div></div></div></div><div class="item-inner"><div class="item-input-wrap"><input type="text" placeholder="Give a review" name="review_txt" id="reviewtxt_'+i+'" class="fs-12"><span class="input-clear-button"></span></div></div>         <button class="col-33 button fs-10 mb-5 button-small seg_btn" onclick="giverate('+i+','+c_id+','+o_id+','+acpt_id+')">Rate it!</button><button class="col-33 button button-outline fs-10 mr-15 mb-5 button-small seg-outline" onclick="showRatebtn('+i+')">Cancel</button></li></ul></div>';
            if(review_status==0){
              if(z!=0){
                var review='<button class="col-33 button button-small button-fill fs-10 for_green display-block w-20" id="rate_'+i+'" onclick="showrateForm('+i+','+o_id+')"><i class="f7-icons fs-12 mr-5">star_fill</i>Rate</button>'+rate_form;
              }else{
                var review='';
              }
            }else if(review_status==2){
              var review='<button class="col-33 button button-small button-fill fs-10 for_green display-block w-20" id="rate_'+i+'" onclick="showrateForm('+i+','+o_id+')"><i class="f7-icons fs-12 mr-5">star_fill</i>Rate</button>'+rate_form;
            }else{
              var review='';
            }
          }

          ord_list+='<li class="accordion-item lightblue mb-5" id="li_'+i+'"><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title text-blue fw-500 fs-14"><span class="mr-5">'+ord_no+'</span></div><span class="float-right fs-10 fw-600">thumb</span></div></a><div class="accordion-item-content nobg"><div class="block"><div class="row"><div class="col-50 mt-2 fs-12"><span class="fw-500">Order code: '+o_code+'</span><br/><span class="fw-600 text-blue bord-bot-blue">'+s_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">circle_fill</i>'+j_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">calendar_fill</i>'+finaldt+'<span class="text-capitalize badge fs-10 ml-5"> '+request_day+'</span></span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">timer_fill</i>'+time+'</span></div><div class="col-50 mt-2 fs-12"><span class="fw-500">'+patner_det+'</span></div><div><a class="button dynamic-popup txt-amaz fs-12 fw-600" href="#" onclick="openpopup('+"'"+ord_no+"'"+','+"'"+o_code+"'"+','+"'"+street_no+"'"+','+"'"+street_name+"'"+','+"'"+street_unit+"'"+','+"'"+pin+"'"+','+"'"+a_name+"'"+')">Address Details</a></div></div></div>';

          ord_list+='<div class="action_line" id="action_line_'+i+'"><div class="row"><span class="float-right w-100">'+review+'</span></div></div>';

          ord_list+='</li>';
          z++;
        }
      }      
      $(".ordercls").html("");
      $("#"+divname).html(ord_list);
      app.preloader.hide();
    }
  });
}*/
function getBookingbyStatus(button_active,divname){
  checkConnection();  
  onResume();
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
      $(".booking_btns").removeClass("display-none");
      $(".booking_btns").addClass("display-block"); 
      $(".bookings_tot").html(order_cnts);
      $(".pen_badge").html(order_cnts_pen);
      $(".fin_badge").html(order_cnts_start);
      $(".start_badge").html(order_cnts_fin);
      if(order.length==0){
        ord_list+='<div class="block fs-12 text-red fw-500 text-capitalize">No bookings available.</div>';
      }else{
        var z=0;
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
          var review_status = order[i].review_status;
          var order_status = order[i].order_status;
          var time = order[i].time;   
          var part_reschedule_req = order[i].part_reschedule_req;
          var acpt_id = order[i].acpt_id;
          var o_id = order[i].o_id;
          var address = order[i].address;
          var change_address = order[i].change_address;
          var change_add_status = order[i].change_add_status;
          var part_ord_cancel = order[i].part_ord_cancel;
          var street_no = order[i].street_no;
          var street_name = order[i].street_name;
          var street_unit = order[i].street_unit;
          var pin = order[i].pin;
          var a_name = order[i].a_name;

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
                btn_loc+='<button class="row col-66 seg-outline loc_btn p-2 nobg fs-11 display-block mr-5" id="seal_'+i+'"><i class="f7-icons fs-13 text-red mr-5">checkmark_seal_fill</i>Change location request accepted</button>';
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
            var rate_form='<div class="rating_form_'+i+' list display-none w-100"><ul class="w-100"><li class="item-content item-input item-input-outline w-100 row"><div class="item-inner"><div class="item-title text-center fw-600 mb-5 item-label l-0">Give rates<br/></div><div class="w-100 text-center"><div class="rating-widget"><!-- Rating Stars Box --><div class="rating-stars text-center"><ul id="stars" class="display-if"><input type="hidden" name="hidd_rate" id="hidd_rate" /><li class="star" title="Poor" data-value="1" id="star_'+i+'_1" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_1">star_fill</i></li><li class="star" title="Fair" data-value="2" id="star_'+i+'_2" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_2">star_fill</i></li><li class="star" title="Good" data-value="3" id="star_'+i+'_3" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_3">star_fill</i></li><li class="star" title="Excellent" data-value="4" id="star_'+i+'_4" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_4">star_fill</i></li><li class="star" title="WOW!!!"" data-value="5" id="star_'+i+'_5" onclick="ratestar(this,'+i+')"><i class="f7-icons lightgrey" id="fillstr_'+i+'_5">star_fill</i></li></ul></div></div></div></div><div class="item-inner"><div class="item-input-wrap"><input type="text" placeholder="Give a review" name="review_txt" id="reviewtxt_'+i+'" class="fs-12"><span class="input-clear-button"></span></div></div>         <button class="col-33 button fs-10 mb-5 button-small seg_btn" onclick="giverate('+i+','+c_id+','+o_id+','+acpt_id+')">Rate it!</button><button class="col-33 button button-outline fs-10 mr-15 mb-5 button-small seg-outline" onclick="showRatebtn('+i+')">Cancel</button></li></ul></div>';
            var status_cls='finished';
            var status_txt='Finished';
            var thumb='';
            var patner_det=status_txt+ ' By '+p_name+'<br/><i class="f7-icons fs-12 text-grey mr-5">phone_fill</i><span class="fs-10">'+p_phone+'</span><br/><i class="f7-icons fs-12 text-grey mr-5">envelope_fill</i><span class="fs-10">'+p_email+'</span>';
            if(review_status==0){
              if(z!=0){
                var reviewbtn='<button class="col-33 button button-small button-fill fs-10 for_green display-block w-20" id="rate_'+i+'" onclick="showrateForm('+i+','+o_id+')"><i class="f7-icons fs-12 mr-5">star_fill</i>Rate</button>'+rate_form;
              }else{
                var reviewbtn='';
              }
            }else if(review_status==2){
              var reviewbtn='<button class="col-33 button button-small button-fill fs-10 for_green display-block w-20" id="rate_'+i+'" onclick="showrateForm('+i+','+o_id+')"><i class="f7-icons fs-12 mr-5">star_fill</i>Rate</button>'+rate_form;
            }else{
              var reviewbtn='';
            }
            //if(review_count==0){
              
              //var reviewbtn='<button class="col-33 button button-small button-fill fs-10 for_green display-block w-20" id="rate_'+i+'" onclick="showrateForm('+i+','+o_id+')"><i class="f7-icons fs-12 mr-5">star_fill</i>Rate</button>'+rate_form;
            //}else{
            //  var rate_form='';
            //  var reviewbtn=''; 
            //}
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
          ord_list+='<li class="accordion-item lightblue mb-5 elevation-1" id="li_'+i+'"><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title text-blue fw-500 fs-14"><span class="mr-5">'+ord_no+'</span><!--span class="text-red fw-500 fs-12">(code: '+o_code+')</span--></div><!--span class="float-right fs-10 fw-600 '+status_cls+'">'+status_txt+'</span--><span class="float-right fs-10 fw-600">'+thumb+'</span></div></a><div class="accordion-item-content nobg"><div class="block"><div class="row"><div class="col-50 mt-2 fs-12"><span class="fw-500">Order code: '+o_code+'</span><br/><span class="fw-600 text-blue bord-bot-blue">'+s_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">circle_fill</i>'+j_name+'</span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">calendar_fill</i>'+finaldt+'<span class="text-capitalize badge fs-10 ml-5"> '+request_day+'</span></span><br/><span class="fs-10 fw-500"><i class="f7-icons fs-10 text-grey mr-5">timer_fill</i>'+time+'</span></div><div class="col-50 mt-2 fs-12"><span class="fw-500">'+patner_det+'</span></div><div><a class="button dynamic-popup txt-amaz fs-12 fw-600" href="#" onclick="openpopup('+"'"+ord_no+"'"+','+"'"+o_code+"'"+','+"'"+street_no+"'"+','+"'"+street_name+"'"+','+"'"+street_unit+"'"+','+"'"+pin+"'"+','+"'"+a_name+"'"+')">Address Details</a></div></div></div>'; 
          
          if(rev_btn!=''){
            ord_list+='<div class="action_line" id="action_line_'+i+'"><div class="row"><span class="float-right w-100">'+rev_btn+'</span></div></div>';
          }
          if(btn_loc!=''){  
            if(part_ord_cancel==0){          
              ord_list+='<div class="action_line" id="action_line_'+i+'"><div class="row"><span class="float-left leftdiv_'+i+'">'+change_loc+req_res+'</span>'+loc_apprv+'</div></div>';
            }else{
              ord_list+='<div class="action_line bg-danger" id="action_line_'+i+'"><div class="row"><span class="float-left leftdiv_'+i+'">This order is cancelled</div></div>';
            }
          }
          ord_list+='</div></li>';
          z++;
      }

      }  
      $(".ordercls").html("");
      $("#"+divname).html(ord_list);      
      app.preloader.hide();
    }
  });
}
function cl_status(ord_id){
  checkConnection();  
  app.preloader.show();
  $.ajax({
    type:'POST', 
    data:{'ord_id':ord_id},
    dataType: 'json', 
    url:base_url+"APP/Appcontroller/orderDetail",  
    success:function(cl_res){ 
      var cl_stus = cl_res.status;
      var cancel_order_status = cl_res.cancel_order_status;
      var change_add_status = cl_res.change_add_status;
      var oldadd = cl_res.old;
      var newadd = cl_res.new;
      if(cl_stus=='success'){
        if(cancel_order_status==1){
          var toastMsg = app.toast.create({
            text: 'Sorry, Order is canceled',
            position: 'bottom',
            closeTimeout: 2000,
          });
          toastMsg.open();
          app.preloader.hide();
        }

        if(change_add_status==1){
          app.dialog.alert("Sorry, You already accepted the request");
          return false;
        }else if(change_add_status==2){
          app.dialog.alert("Sorry, You already declined the request");
          return false;
        }

        app.dialog.confirm('Old address:'+oldadd+'\n New address:'+newadd+'', function (yesadd) {
          if(yesadd){
            $.ajax({
              type:'POST', 
              data:{'ord_id':ord_id,'change_add_status':'1'},
              dataType: 'json', 
              url:base_url+"APP/Appcontroller/change_location_status",  
              success:function(cl_res){ 
                app.dialog.alert("Accepted");
                return false;
              }
            });
          }else{
            $.ajax({
              type:'POST', 
              data:{'ord_id':ord_id,'change_add_status':'2'},
              dataType: 'json', 
              url:base_url+"APP/Appcontroller/change_location_status",  
              success:function(cl_res){ 
                app.dialog.alert("Declined");
                return false;
              }
            });
          }
        });

      }
    }
  });
  app.preloader.hide();
}
function rr_status(ord_id){
  checkConnection();  
  app.preloader.show();
  $.ajax({
    type:'POST', 
    data:{'ord_id':ord_id},
    dataType: 'json', 
    url:base_url+"APP/Appcontroller/check_cancel_order_status",  
    success:function(cancel_res){ 
      var res_status = cancel_res.status;
      var cancel_order_status = cancel_res.cancel_order_status;
      if(res_status=='success'){
        if(cancel_order_status==1){
          app.dialog.alert("Sorry, Order is canceled");
          app.preloader.hide();
          return false;
        }else{
          $.ajax({
            type:'POST', 
            data:{'ord_id':ord_id},
            dataType: 'json', 
            url:base_url+"APP/Appcontroller/check_rr",  
            success:function(rr_res){ 
              var rr_status = rr_res.status;
              var requested = rr_res.requested;
              if(requested=='yes'){
                app.dialog.alert("Sorry, You already requested for reschedule");
              }else{
                app.dialog.confirm('Are you sure you want to reschedule ?', function (yes_rr) {
                  if(yes_rr){
                    $.ajax({
                      type:'POST', 
                      data:{'ord_id':ord_id},
                      dataType: 'json', 
                      url:base_url+"APP/Appcontroller/rr_form",  
                      success:function(rr_submit){ 
                        var status = rr_submit.status;
                        if(status=='success'){
                          var toastMsg = app.toast.create({
                            text: 'Request for reschedule has been sent',
                            position: 'bottom',
                            closeTimeout: 2000,
                          });
                          toastMsg.open();
                          app.preloader.hide();
                        }
                      }
                    });
                  }
                });
              }
            }
          });
        }
      }
    }
  });
  app.preloader.hide();
}
function cancel_click(ord_id,session_pid){  
  checkConnection();  
  app.preloader.show(); 
  $.ajax({
    type:'POST', 
    data:{'ord_id':ord_id},
    dataType: 'json', 
    url:base_url+"APP/Appcontroller/check_cancel_order_status",  
    success:function(cancel_res){ 
      var res_status = cancel_res.status;
      var cancel_order_status = cancel_res.cancel_order_status;
      if(res_status=='success'){
        if(cancel_order_status==1){
          app.dialog.alert("Sorry, You already canceled the order");
          app.preloader.hide();
          return false;
        }
        app.preloader.hide();
        app.dialog.confirm('20% of order amount will be decreased', function (yes) {
          if(yes){
            //alert("Yes");
            $.ajax({
              type:'POST', 
              data:{'ord_id':ord_id,'session_pid':session_pid},
              dataType: 'json',
              url:base_url+"APP/Appcontroller/cancel_order_status",  
              success:function(res){ 
                var amt = res.amount;
                if(amt=='not_avail'){
                  app.dialog.alert("Not enough amount to cancel the order");
                }else{
                  app.dialog.alert("Your order has been canceled");
                }
                app.preloader.hide();
              }
            });
          }
        });
      }
    }
  });  
}
function accept_order(ord_id,session_pid){
  //alert("in accept_order "+ord_id+"---"+session_pid);
  checkConnection();  
  app.preloader.show();    
  $.ajax({
    type:'POST', 
    data:{'session_pid':session_pid,'ord_id':ord_id},
    url:base_url+"APP/Appcontroller/accept_order",    
    success:function(accept_res){ 
    var acc_st = $.parseJSON(accept_res);
    var stus = acc_st.status;   
    //alert(stus);
      if(stus=='Success'){
        var order_notification = app.notification.create({
          icon: '<i class="f7-icons">checkmark_alt_circle</i>',
          title: 'Order Status',
          titleRightText: 'now',
          subtitle: 'Order has been accepted',
          //text: 'This is a simple notification message',
          closeTimeout: 3000,
        });
      }else if(stus=='Fail'){
        var order_notification = app.notification.create({
          icon: '<i class="f7-icons">multiply_circle</i>',
          title: 'Order Status',
          titleRightText: 'now',
          subtitle: 'Sorry, Order already accepted',
          //text: 'This is a simple notification message',
          closeTimeout: 3000, 
        });
      }  
      order_notification.open();
      app.preloader.hide();
    }
  });
}
function order_status(ord_id){
  checkConnection();  
  app.preloader.show();
  var os = $('.os_'+ord_id).val();
  if(os == '0'){
    $('.oid').val(ord_id);
    app.preloader.hide();
    app.dialog.prompt('Ordercode', function (ocode) {
      if(ocode){
        $.ajax({
          type:'POST', 
          data:{'ord_id':ord_id,'ocode':ocode},
          dataType: 'json',
          url:base_url+"APP/Appcontroller/star_work_form",    
          success:function(code_res){
            var check_cancel = code_res.check_cancel;
            var st = code_res.status;
            if(st=='success'){
              if(check_cancel=='yes'){
                var toastbott = app.toast.create({
                  text: 'Sorry, Order is canceled',
                  position: 'bottom',
                  closeTimeout: 2000,
                });
              }else{
                var toastbott = app.toast.create({
                  text: 'Your work status has been updated',
                  position: 'bottom',
                  closeTimeout: 2000,
                });
              }
              toastbott.open();
              app.preloader.hide();
            }else{
              var toastbott = app.toast.create({
                text: 'Sorry, Wrong order code',
                position: 'bottom',
                closeTimeout: 2000,
              });
              toastbott.open();
              app.preloader.hide();
            }
          }
        });
      }        
    });
    return false;
  }
  
  $.ajax({
    type:'POST', 
    data:{'ord_id':ord_id},
    dataType: 'json',
    url:base_url+"APP/Appcontroller/order_status",    
    success:function(ord_res){
      var stus = ord_res.status;
      if(stus=='Success'){
        var toastTop = app.toast.create({
          text: 'Order status has been changed',
          position: 'top',
          closeTimeout: 2000,
        });
      }else{
        var toastTop = app.toast.create({
          text: 'Sorry, Order already accepted',
          position: 'top',
          closeTimeout: 2000,
        });
      }
      toastTop.open();
      app.preloader.hide();
    }
  });
}
function part_getCustOrders(act_tab){
  app.preloader.show();  
  if(act_tab==0){
    var divname="new_orders";    
    $(".new_btn").removeClass("seg-outline");
    $(".accept_btn").removeClass("button-active");
    $(".accept_btn").removeClass("seg_btn");
    $(".accept_btn").addClass("seg-outline");
    $(".new_btn").addClass("button-active");
    $(".new_btn").addClass("seg_btn");  
    
    $("#new_orders").removeClass("display-none");
    $("#new_orders").addClass("display-block");
    $("#accepted_orders").removeClass("display-block");
    $("#accepted_orders").addClass("display-none");
  }else if(act_tab==1){
    var divname="accepted_orders";
    //getOrders(button_active,divname,act_tab);
    $(".new_btn").removeClass("button-active");
    $(".new_btn").removeClass("seg_btn");
    $(".new_btn").addClass("seg-outline");
    $(".accept_btn").removeClass("seg-outline");
    $(".accept_btn").addClass("button-active");  
    $(".accept_btn").addClass("seg_btn");

    $("#accepted_orders").removeClass("display-none");
    $("#accepted_orders").addClass("display-block");
    $("#new_orders").removeClass("display-block");
    $("#new_orders").addClass("display-none");
  }
  var button_active=$(".button-active").val();
  getOrders(button_active,divname,act_tab);
  app.preloader.hide();
}
$$(document).on('page:init', '.page[data-name="partner_orders"]', function (page) { 
  checkConnection();
  app.preloader.show();
  var session_pid = window.localStorage.getItem("session_pid");
  var button_active=$(".button-active").val();
  var divname="new_orders"; 
  getOrders(button_active,divname,0);   
  /*var $ptrContent = $$('.ptr-content');
  $ptrContent.on('ptr:refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () { 
      getOrders(button_active,divname,0); 
      app.ptr.done(); // or e.detail();
    }, 2000);
  }); */ 
  app.preloader.hide();
});

function getOrders(button_active,divname,act_tab){
  checkConnection();  
  app.preloader.show();
  var session_pid = window.localStorage.getItem("session_pid");  
  if(button_active==0){
    var url=base_url+'APP/Appcontroller/getNewBookings';
  }else if(button_active==1){
    var url=base_url+'APP/Appcontroller/getAcceptedBookings';
  } 
  $.ajax({
    type:'POST', 
    dataType:'json',    
    data:{'session_pid':session_pid},
    url:url,
    success:function(book_result){
      var status_order = book_result.status_order;
      var accept_cnts = book_result.accept_cnts;
      var new_cnts = book_result.new_cnts;
      var html = book_result.html;
      var html2 = book_result.html2;
      //console.log(html2+"----");
      if(act_tab==0){  
        $(".pen_badge").html(status_order.length);
        $(".start_badge").html(accept_cnts);
        
      }else if(act_tab==1){
        $(".pen_badge").html(new_cnts);
        $(".start_badge").html(status_order.length);
      }
      if(html.status=='Success'){
        $(".ordercls").html("");
        $("#"+divname).html(html);
      }else{
        $(".ordercls").html("");
        $("#"+divname).html(html);
        if(html==''){
          //console.log(html.length);
          $(".ordercls").html("");
          $("#"+divname).html('<div class="block fs-12 text-red fw-500 text-capitalize">No bookings available.</div>');
          $(".pen_badge").html(html.length);
        }
      }

      app.preloader.hide(); 
    } 

  });
}
function openpopup(ord_no,o_code,street_no,street_name,street_unit,pin,a_name){
  if(street_no!='' && street_no!=undefined){
    street_no=street_no;
  }else{
    street_no='';
  }
  if(street_name!='' && street_name!=undefined){
    street_name=street_name;
  }else{
    street_name='';
  }
  if(street_unit!='' && street_unit!=undefined){
    street_unit=street_unit;
  }else{
    street_unit='';
  }
  if(pin!='' && pin!=undefined){
    pin=pin;
  }else{
    pin='';
  }
  if(a_name!='' && a_name!="undefined" && a_name!=undefined){
    a_name=a_name;
  }else{
    a_name='';
  }

  
  var dynamicPopup = app.popup.create({
  content: '<div class="popup">'+'<div class="block">'+'<p class="text-blue fw-600">Order No : '+ord_no+'</p><p class="text-grey fw-600">Order Code : '+o_code+'</p><hr/><p class="fw-500">Suburb : '+a_name+'</p><p class="fw-500">Street no : '+street_no+'</p><p class="fw-500">Street name : '+street_name+'</p><p class="fw-500">Street unit : '+street_unit+'</p><p class="fw-500">Pincode : '+pin+'</p>'+'<hr/><p><a href="#" class="link popup-close text-red">Close me</a></p>'+'</div>'+'</div>',
  }); 
  dynamicPopup.open();
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
function ratestar_home(val){
  var click_rate_home=$(val).attr('data-value');
  var click_id_home=$(val).attr('id');
  var click_cls_home=$("#fillstrhome_"+click_rate_home).attr('class');
  //console.log(click_cls_home+"***"+click_id_home+"^^^^^"+click_rate_home);
  var onStar_home = parseInt($(val).data('value'), 10);
  $("#hidd_rate_home").val(onStar_home);
  var hov_len_home=$(".hover").length;
  $(".star i").addClass("lightgrey");
  $(val).parent().children('li.star').each(function(e){
    var j=e+1;
    //console.log(e+"------"+click_rate_home)   
    if(e < click_rate_home){
      //console.log("if "+e);
      $("#fillstrhome_"+j).removeClass("lightgrey");
      $("#fillstrhome_"+j).addClass("hover");     
    }else{
      //console.log("else "+e);
      $("#fillstrhome_"+j).removeClass("hover");
      $("#fillstrhome_"+j).addClass("lightgrey");
    }
    //console.log(click_rate_home+"------"+click_cls_home+"*********"+hov_len_home);
    if(click_rate_home==1 && click_cls_home=='f7-icons hover active-state' && hov_len_home==1){  
        $("#fillstrhome_"+click_rate_home).removeClass("hover");
        $("#fillstrhome_"+click_rate_home).addClass("lightgrey");  
    }
  });
}
function ratestar(val,rowid){
  //console.log(rowid+"####"+val);
  var click_rate=$(val).attr('data-value');
  var click_id=$(val).attr('id');
  var click_cls=$("#fillstr_"+rowid+"_"+click_rate).attr('class');  
  //console.log(click_cls+"***"+click_id+"^^^^^"+click_rate);
  var onStar = parseInt($(val).data('value'), 10);
  $("#hidd_rate").val(onStar);
  var hov_len=$(".hover").length;
  //alert($(".hover").length+"^^^^^^^^^^^^^^^^^^^^^");
  $(".star i").addClass("lightgrey");
    $(val).parent().children('li.star').each(function(e){ 
      var j=e+1;
      if(e < click_rate){
        //console.log("j = "+j+'====='+rowid);
        $("#fillstr_"+rowid+"_"+j).removeClass("lightgrey");
        $("#fillstr_"+rowid+"_"+j).addClass("hover");
        //console.log(val.textContent+"-----"+e);        
      }else{
        //console.log("else j = "+j+'====='+rowid);
        $("#fillstr_"+rowid+"_"+j).removeClass("hover");
        $("#fillstr_"+rowid+"_"+j).addClass("lightgrey");
      }
      if(click_rate==1 && click_cls=='f7-icons hover' && hov_len==1){  
        $("#fillstr_"+rowid+"_"+click_rate).removeClass("hover");
        $("#fillstr_"+rowid+"_"+click_rate).addClass("lightgrey");    
        //if(click_cls=='f7-icons lightgrey'){        
          //console.log("if click_cls "+click_cls);
          //$("#fillstr_"+rowid+"_"+click_rate).removeClass("lightgrey");
          //$("#fillstr_"+rowid+"_"+click_rate).addClass("hover");
          
        //}/*else if(click_cls=='f7-icons hover'){
          
         // console.log("else click_cls "+click_cls);
        //  $("#fillstr_"+rowid+"_"+click_rate).removeClass("hover");
         // $("#fillstr_"+rowid+"_"+click_rate).addClass("lightgrey");
       // }    */
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
function getcatServices(cat_id,c_img_path){
  mainView.router.navigate("/customer_servicelist/");  
  app.preloader.show();
  onResume();
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
    //alert("OPEN GPS SERVICE AND GET CURRENT CITY");
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
      var msg = jobparse.msg;
      if(msg=='not_avail'){
        //alert("not_avail");
        jlist='<div class="block text-red fw-600 fs-12">No services available in current city.</div>';
      }else{
      var job_list = jobparse.job_list;
      var jimg = jobparse.j_img;
      var search = jobparse.search;
      var job = search['jobs'];
      var partner = search['partner'];
      //console.log(job.length+" job.len");
      //console.log(partner);
      var jlist = '';
      var slides = ''; 
      if(partner.length==0){
        jlist='<div class="block text-red fw-600 fs-12">No Provider Available In This Location</div>';
        $(".jobList").html(jlist);
      }else{
        //alert("ELSE");
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
              if(session_cid!=null && session_cid!=undefined){
               $(".jobList").html(jlist);
              }
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
  }
  });

  $.ajax({
    type:'POST', 
    data:{'sid':sid,'session_ccity':session_cust_current_city},
    url:base_url+'APP/Appcontroller/getCustReviews', 
    success:function(rev_res){
      var rev = $.parseJSON(rev_res);
      var msg = rev.msg;
      
      //console.log(partner_rev);
      //console.log(partner_rev.length+"***************");
      var rev_list='';
      if(msg=='not_avail'){
          rev_list='<div class="block text-red fw-600 fs-12">No services available in current city</div>';
          $("#reviews").html(rev_list);
      }else{
        var review_rate = rev.review_rate;      
        var partner_rev = review_rate.partner;
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
      }
      app.preloader.hide();
    }
  });
  app.preloader.hide();
});
function chnagelocation(){
  mainView.router.navigate("/customer_loc/");
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
  city_geocoder.geocode({'latLng': city_LatLong}, function(city_results, city_status) {
    if (city_status === 'OK') {
      if (city_results[0]) {
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
        /*window.localStorage.setItem("session_current_city",city);
        window.localStorage.setItem("session_current_loc",res);*/ // cmnt on 27/2/2020 //
        window.localStorage.setItem("session_cust_current_city",city);
        window.localStorage.setItem("session_cust_current_loc",res);
        $("#formatted_address").html(res);
        updateCurrLocCust(session_cid,res,city);
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
/*
function updateCurrLocCust(session_cid,res,city){
  app.preloader.show();
  $.ajax({
    type:'POST', 
    data:{'session_cid':session_cid,'res':res,'city':city},
    url:base_url+'APP/Appcontroller/updateCurrLoc',
    success:function(loc_res){
      var parseres = $.parseJSON(loc_res);
      var resmsg = parseres.msg;
      alert(resmsg+" ::::::::::resmsg");
      if(resmsg=="loc_updated"){        
        mainView.router.navigate("/customer_dash/");
      }else if(resmsg=="not_updated"){
        app.dialog.alert("Error updating change location");
      }
      app.preloader.hide();
    }
  })
} */
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
function discontinue_doorstep(){
  var session_pid = window.localStorage.getItem("session_pid");
   app.dialog.prompt('Request for discontinue', function (disconti) {    
    if(disconti){
      if(disconti==''){
        app.dialog.alert("OOPS! you need to write something.");
      }else{
        $.ajax({
          type:'POST',
          dataType:'json', 
          data:{'disconti':disconti,'session_pid':session_pid},
          url:base_url+'APP/Appcontroller/rd',
          success:function(res){
            var status = res.status;
            if(status=='Success'){
              app.dialog.alert("Your request is accepted soon");
            }else{
              app.dialog.alert("Something went wrong!");              
            }
          }
        });
      }
    }else{
      var toastBottom = app.toast.create({
        text: 'OOPS! you need to write something.',
        closeTimeout: 2000,
      });
      toastBottom.open();
    }    
  });
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
          text:'Please check your registered mobile number '+hidd_mob+' to receive the resended OTP',
          position: 'center',
          closeTimeout: 10000,
        });        
        toastIcon.open();
        OTPtimer_cust(hidd_cid);
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
        //mainView.router.navigate('/login/');
        mainView.router.navigate('/index/');
      }else if(status=="otp_exp"){
        app.dialog.alert(v_msg);
        app.preloader.hide(); 
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
$$(document).on('page:init', '.page[data-name="customer_otpverify"]', function (page) {  
  checkConnection();
  //console.log(page.detail.route.params);
  var mobile_no = page.detail.route.params.mobile; 
  var cid = page.detail.route.params.cid;
  $("#hidd_mob").val(mobile_no);
  $("#hidd_cid").val(cid);
  $(".otp_txt").html('Your mobile number is already registered with Doorstep.Please enter and verify the OTP sent to your registered mobile number '+mobile_no+' by doorstep.');
  OTPtimer_cust(cid);
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
            //mainView.router.navigate('/login/'); 
            mainView.router.navigate('/index/');
          }else{
            //app.dialog.alert(msg); 
            //mainView.router.navigate('/customer_register/');
          }
        }
      });
    }else{} 
  } 
}
$$(document).on('page:init', '.page[data-name="customer_editprof"]', function (page) { 
  checkConnection(); 
  onResume();
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
$$(document).on('page:init', '.page[data-name="customer_changepass"]', function (page) { 
  //logOut(); 
  checkConnection();
  onResume();
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
$$(document).on('page:init', '.page[data-name="customer_servicedet"]', function (page) {  
  checkConnection();
  //console.log(page.detail.route.params);
  var session_cid = window.localStorage.getItem("session_cid"); 
  //var session_ccityid = window.localStorage.getItem("session_ccityid"); // 27-2-2020 //
  var session_ccityid = window.localStorage.getItem("session_reg_custcityid"); // 27-2-2020 //
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
  //var session_current_city = window.localStorage.getItem("session_current_city"); // 27-2-2020 //
  var session_current_city = window.localStorage.getItem("session_cust_current_city"); // 27-2-2020 // var session_ccity = window.localStorage.getItem("session_ccity");
  var session_ccity = window.localStorage.getItem("session_reg_custcity");
  //var session_ccityid = window.localStorage.getItem("session_ccityid");
  var session_ccityid = window.localStorage.getItem("session_reg_custcityid");
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
      var discount = jobdet.discount;
      //console.log("discount "+discount);

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
      //alert("******* session_current_city "+session_current_city);
      //alert("******* session_ccity "+session_ccity);
      bookdiv+='<li class="item-content item-input item-input-focused"><div class="item-inner"><div class="">Current City: <span class="badge">'+session_current_city+'</span></div><div class="text-capitalize">Your City: <div class="chip chip-outline color-orange"><span class="chip-label fw-600">'+session_ccity+'<span></div></div></div></li>   <li class="item-content item-input item-input-focused"><div class="item-inner"><div class="item-title item-floating-label">Name</div><div class="item-input-wrap"><input type="text" name="c_name" value="'+cst_name+'"><span class="input-clear-button"></span></div></div></li><li class="item-content item-input item-input-focused"><div class="item-inner"><div class="item-title item-floating-label">Phone</div><div class="item-input-wrap"><input type="text" name="c_phone" value='+c_phn+'><span class="input-clear-button"></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Gender</div><div class="item-input-wrap input-dropdown-wrap"><select name="c_area" id="c_area" onchange="check_service(this.value,'+jobid+')"><option value="">---SELECT AREA---</option>';
        for(var i=0;i<area.length;i++){
          var a_id=area[i].a_id;
          var a_name=area[i].a_name;
          //alert(a_name);
          bookdiv+='<option value='+a_id+'>'+a_name+'</option>';
        } 
 
      bookdiv+='</select></div></div></li><li class="item-content item-input item-input-focused"><div class="item-inner"><div class="item-title item-floating-label">Street No</div><div class="item-input-wrap"><input type="text" name="strt_no" id="strt_no"><span class="input-clear-button"></span></div></div></li><li class="item-content item-input item-input-focused"><div class="item-inner"><div class="item-title item-floating-label">Street Name</div><div class="item-input-wrap"><input type="text" name="strt_name" id="strt_name"><span class="input-clear-button"></span></div></div></li><li class="item-content item-input item-input-focused"><div class="item-inner"><div class="item-title item-floating-label">Street Unit</div><div class="item-input-wrap"><input type="text" name="strt_unit" id="strt_unit"><span class="input-clear-button"></span></div></div></li><li class="item-content item-input item-input-focused"><div class="item-inner"><div class="item-title item-floating-label">PIN</div><div class="item-input-wrap"><input type="text" name="pin" id="pin"><span class="input-clear-button"></span></div></div></li><!--li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Address</div><div class="item-input-wrap"><textarea placeholder="Please enter the address as per selected city and area." name="address" id="address"></textarea></div></div></li-->';
      if(slot.length!=0){
        var discount_cnt = discount.length;
        if(discount_cnt > 0 ){
          bookdiv+='<input type="hidden" name="disc_price" id="disc_price" /><input type="hidden" name="dis_id" value="'+discount[0].dis_id+'" /> <div class="block"><div class="col"><label class="checkbox" ><input type="checkbox" id="dis"  value="1" name="dis_check" onchange="checkme('+j_price+',this)"><i class="icon-checkbox"></i></label><span class="ml-5">You are eligible to get 10% discount, Check to apply</span> </div></div>';
        }
        bookdiv+='<div class="block"><div class="col"><a class="button submitbtn no-radius mb-10" onclick="bookCustService()">Pay <i class="f7-icons fs-16">money_dollar</i><span class="finale_price"> '+j_price+'</span></a></div></div>';
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
function checkme(j_price,chk){
  console.log(chk);
  //if(chk.checked){
  if($(chk).is(":checked")) {
    var returnVal = chk.checked;
    //alert(returnVal);
    $(chk).prop("checked", "checked");
  }
  $('#dis').val(chk.checked);
  //if($(chk).is(":checked")) {
  if (returnVal) { 
    var amt = j_price*10/100;
    var amt = j_price-amt;
    $('#disc_price').val(amt);
    $('.finale_price').html(amt);
  } else {
    var amt = j_price;
    $('#disc_price').val(amt);
    $('.finale_price').html(amt);
  }
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
function onSuccess(position){
  app.preloader.show();
  //alert("in onSuccess function");
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

 // alert("hidd_currlat "+hidd_currlat+" ^^^ hidd_currlon "+hidd_currlon);
  var session_cid = window.localStorage.getItem("session_cid"); 
  //var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(-33.8902, 151.1759), new google.maps.LatLng(-33.8474, 151.2631)); // STATIC //

  var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(hidd_currlat, hidd_currlon));
 // alert(defaultBounds);
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
        mainView.router.navigate("/customer_dash/");
        $("#formatted_address").html(res);
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
  onResume();
  var active_tab = $(".tab-active").attr('id');
  $("#hidd_proftab").val(active_tab);
  //alert("tab-active "+active_tab); 
}
// ********************************** PARTNER FUNCTIONS ********************************** //
// ------------------------- DATA NAME : PARTNER DASHBOARD ------------------------- //
$$(document).on('page:init', '.page[data-name="partner_dash"]', function (page) {  
  //console.log("partner dashboard");
  checkConnection();  
    setInterval(function(){
      var session_pid = window.localStorage.getItem("session_pid"); 
      //console.log(session_pid);
      //app.preloader.show();
      if(session_pid!='' && session_pid!=undefined && session_pid!=null){
        //console.log("called");
        getPartnerData();         
      }
    },2000);
    //app.preloader.hide();
});
  
  
  //logOut();     

$$(document).on('page:init', '.page[data-name="partner_profile"]', function (page) {  
  checkConnection();
  var session_pid = window.localStorage.getItem("session_pid"); 
  var session_reg_partcityid = window.localStorage.getItem("session_reg_partcityid");
  app.preloader.show();
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/partnerProf',  
    data:{'session_pid':session_pid,'session_reg_partcityid':session_reg_partcityid},
    success:function(prof){
      var prf = $.parseJSON(prof);
      var profile = prf.part;
      var service_info = prf.service_info;
      //console.log("profile "+profile);
      var pid = profile[0].p_id;
      //alert(pid);
      var nm_fltr = (profile[0].p_name.charAt(0));
      $(".nmfltr").html(nm_fltr);
      var pname = profile[0].p_name;
      var p_email = profile[0].p_email;
      var p_phone = profile[0].p_phone;
      var city_name = profile[0].city_name;
      var suburb = profile[0].a_name;
      var street_no = profile[0].street_no;
      var street_name = profile[0].street_name;
      var street_unit = profile[0].street_unit;
      var pin = profile[0].pin;

      $(".pname").html(pname);
      $(".p_email_icon").html('<i class="f7-icons fs-18">envelope_fill</i>');
      $(".pemail").html(p_email);

      $(".p_phone_icon").html('<i class="f7-icons fs-18">phone_fill</i>');
      $(".pphone").html(p_phone);

      //$(".addr_icon").html();
      //$(".caddr").html(c_addr);

      if(street_no!=""){
        $(".p_strno_icon").html('<i class="f7-icons fs-18">placemark</i>');
        $(".p_stno").html(street_no);
        //$(".caddr").html(c_addr);
      }else{
        $(".p_street_no").remove();
      }
 
      if(street_name!=""){
        $(".p_strnm_icon").html('<i class="f7-icons fs-18">placemark_fill</i>');
        $(".p_stnm").html(street_name);
      }else{
        $(".p_street_nm").remove();        
      }

      if(street_unit!=""){
        $(".p_struniy_icon").html('<i class="f7-icons fs-18">map_pin_ellipse</i>');
        $(".p_stuny").html(street_unit);
      }else{
        $(".p_unit_str").remove();
      }

      if(pin!=""){
        $(".p_pin_icon").html('<i class="f7-icons fs-18">map_pin</i>');
        $(".p_pincode").html(pin);
      }else{
        $(".p_pinico").remove();
      }

      if(suburb!=""){
        $(".p_area_icon").html('<i class="f7-icons fs-18">map_pin_ellipse</i>');
        $(".p_area").html(suburb);
      }else{
        $(".p_areaico").remove();
      }

      if(city_name!=""){
        $(".p_city_icon").html('<i class="f7-icons fs-18">location_circle_fill</i>');
        $(".p_city").html(city_name);
      }else{
        $(".p_ctyico").remove();
      }

      $(".lock_icon").html('');
      $(".changepass").html('<a href="/partner_changepass/" class="text-red fw-600 text-center">Change Password <i class="f7-icons fs-18">lock_fill</i></a>');

      $(".serviedets").html('<div class="list"><ul><li class="accordion-item lightblue mb-5"><a class="item-content item-link" href="#"><div class="item-inner"><div class="item-title text-blue fs-14 fw-500"><span class="txt-amaz">Partnership details</span> </div></div></a><div class="accordion-item-content nobg elevation-5"><div class="block"><p><span class="ml-2 fw-600 txt-amaz">Selected Category</span> : <span>'+service_info.cat+'</span></p><p><span class="ml-2 fw-600 txt-amaz">Selected Services</span> : <span>'+service_info.ser[0].s_name+',</span></p><p><span class="ml-2 fw-600 txt-amaz">Selected Jobs</span> : <span>'+service_info.job[0].j_name+',</span></p></div></div></li></ul></div>'); 

    }
  });  
  app.preloader.hide();
});
$$(document).on('page:init', '.page[data-name="partner_changepass"]', function (page) { 
  //logOut(); 
  checkConnection();
  app.preloader.show();
  $("#conf_newpass").keyup(validate);  
  app.preloader.hide();
});
$$(document).on('page:init', '.page[data-name="partner_editprof"]', function (page) { 
  checkConnection(); 
  app.preloader.show();
  var session_pid = window.localStorage.getItem("session_pid"); 
  var session_reg_partcityid = window.localStorage.getItem("session_reg_partcityid");
  app.preloader.show();
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/partnerProf',  
    data:{'session_pid':session_pid,'session_reg_partcityid':session_reg_partcityid},
    success:function(prof){
      var prf = $.parseJSON(prof);
      var profile = prf.part;
      //console.log("profile "+profile);
      var pid = profile[0].p_id;
      //alert(pid);
      var nm_fltr = (profile[0].p_name.charAt(0));
      $(".nmfltr").html(nm_fltr);
      var pname = profile[0].p_name;
      var p_email = profile[0].p_email;
      var p_phone = profile[0].p_phone;
      var city_name = profile[0].city_name;
      var suburb = profile[0].a_name;
      var street_no = profile[0].street_no;
      var street_name = profile[0].street_name;
      var street_unit = profile[0].street_unit;
      var pin = profile[0].pin;
      var p_id = profile[0].p_id;
      var a_id = profile[0].a_id;
      var city_id = profile[0].city_id;  

      $("#hidden_pid").val(p_id);
      $("#pname").val(pname);
      $("#pemail").val(p_email);
      $("#pphone").val(p_phone);
      $("#pstr_no").val(street_no);
      $("#pstr_nm").val(street_name);
      $("#pstr_unit").val(street_unit);
      $("#pstr_pin").val(pin);

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
              $("#pserving_city").html(all_city);
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
            $("#pserving_area").html(all_area);
          }
          }); 
        }
      });
    }
  });
  app.preloader.hide();
});
function edit_partnerprofile(){
  checkConnection();
  app.preloader.show();
  var p_editprof_form = $(".edit_pprof").serialize();
  //var hidd_proftab = $("#hidd_proftab").val();
  //console.log(c_editprof_from);
  $.ajax({ 
    type:'POST', 
    data:p_editprof_form,
    url:base_url+'APP/Appcontroller/partner_edit',
    success:function(pedit_res){
      if(pedit_res=='updated'){
        app.dialog.alert("Profile updated successfully!");
        //mainView.router.navigate("/customer_dash/");
        //$("#tab-3").addClass("tab-active");
      }else if(pedit_res=='not'){
        app.dialog.alert("Problem updating profile");
        //mainView.router.navigate("/customer_dash/");
        //$("#tab-3").addClass("tab-active");
      }      
      mainView.router.navigate("/partner_dash/");       
      //$("#hidd_proftab").addClass("tab-active");
      app.preloader.hide();
    }
  });
}
function change_partnerpass(){
  checkConnection();  
  app.preloader.show();
  var session_pid = window.localStorage.getItem("session_pid");
  var edit_ppass = $(".edit_ppass").serialize();
  $.ajax({
    type:'POST', 
    data:edit_ppass+"&session_pid="+session_pid,
    url:base_url+'APP/Appcontroller/changePartner_pass', 
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
function getservingArea(cityid){
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/getServingAreas',  
    data:{'city_id':cityid},
    success:function(res_area){
      var area_parse = $.parseJSON(res_area);
      var serv_area = area_parse.serving_areas;
      var servar = '';
      servar='<option value="">--- SELECT SUBURB ---</option>';
      for(var i=0;i<serv_area.length;i++){
        var a_id = serv_area[i].a_id;
        var a_name = serv_area[i].a_name;
        servar+='<option value="'+a_id+'">'+a_name+'</option>';
      }
      $("#serving_area").html(servar);
    }
  });
}
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
            //mainView.router.navigate('/login/'); 
            mainView.router.navigate('/index/');
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
        //mainView.router.navigate('/login/');
        mainView.router.navigate('/index/');
      }else if(status=="otp_exp"){
        app.dialog.alert(v_msg);
        app.preloader.hide(); 
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
      var html = parse_part.html;
      //console.log(html);
      //alert(html.length);
      //console.log(partner); 
      //console.log(credits);
      //console.log(neword_cnt);
      $(".creditDiv").html("<div class='chip seg-outline'><div class='chip-label credits text-uppercase fs-10 fw-600'>credits : "+credits+" ($ "+p_credit_amount+".00)</div></div>");
      
      //console.log("badge");
      if(html==''){
        $(".partner_ordcnt").html(html.length);
      }else{
        $(".partner_ordcnt").html(neword_cnt.length);
      }
      
      //$(".partner_ordcnt").html(neword_cnt.length);
    }
  });
  app.preloader.hide();
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
  var street_no = $("#street_no").val();
  var street_name = $("#street_name").val();
  var street_unit = $("#street_unit").val();  
  var street_no = $("#street_no").val();
  var street_name = $("#street_name").val();
  var street_unit = $("#street_unit").val();
  var pincode = $("#pincode").val(); 
  //var add_line1 = $('#add_line1').val();
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
  }else if(street_no==''){
    app.dialog.alert("Street no is required");
  }else if(street_name==''){
    app.dialog.alert("Street name is required");
  }else if(street_unit==''){
    app.dialog.alert("Street unit is required");
  }else if(pincode==''){
    app.dialog.alert("Pincode is required");
  }

  
  /*else if(add_line1==''){
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
        window.localStorage.setItem("totalcartqty", 0);
        mainView.router.navigate('/partner_otpverify/'+db_mob+'/'+pid+'/');     
      }
    });
    //app.preloader.hide();
  }  
}
function showcart(){
  mainView.router.navigate("/partner_mycart/");
}
$$(document).on('page:init', '.page[data-name="partner_buy_credit"]', function (page) {
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
      var p_id = partner[0].p_id;
      var credits = parse_part.credits;      
      var cr_data = parse_part.cr_data;
      var value = cr_data[0].value;
      var credit = cr_data[0].credit;
      $(".master_credit").html('<i class="f7-icons fs-16">money_dollar</i>'+value+' Equal to '+credit+' Credit');
      $(".credit_info").html('Available credits: '+credits+' (Amount: <i class="f7-icons fs-16">money_dollar</i>'+p_credit_amount+'.00)');
      $("#hidd_pid").val(p_id);
      $("#hidd_pamt").val(p_credit_amount);
      //console.log(cr_data);
      //console.log(partner); 
      //console.log(credits);
      //console.log(neword_cnt);
      //$(".creditDiv").html("<div class='chip seg-outline'><div class='chip-label credits text-uppercase fs-10 fw-600'>credits : "+credits+" ($ "+p_credit_amount+".00)</div></div>");
      //$(".partner_ordcnt").html(neword_cnt.length);
    }
  });
  app.preloader.hide();
});
$$(document).on('page:init', '.page[data-name="partner_shopping_cart"]', function (page) {
  //$("span .tab-link-highlight").addClass("tab-highlight");
  //$(".tab-link-highlight").css('background','#232F3E!important');
  //$(".tab-link-highlight").css('top','94%!important');
  //app.panel.close();
  //app.panel.destroy(); 
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
      //console.log(popularprd);
      var new_prods = '';
      var popular_prods = '';  
      //var jqstep = '';
      //new_prods+='<div class="stepper stepper-small stepper-fill stepper-init color-orange"><div class="stepper-button-minus"></div><div class="stepper-input-wrap"><input type="text" value="0" min="0" max="20" step="1" readonly></div><div class="stepper-button-plus"></div></div>';
      for(var i=0;i<newarival.length;i++){
        var p_img_path = newarival[i].p_img_path;
        var p_name = newarival[i].p_name;
        var p_price = newarival[i].p_price;
        var p_id = newarival[i].p_id;
        var p_img = newarival[i].p_img;

         
        //var triangle='<div id="triangle-topleft-dev"><span class="impfont fw-700 r-3"><i class="f7-icons fs-18">cart</i></span></div>';
        new_prods+='<li class="col-50 elevation-19 mb-10"><img src="'+base_url+p_img_path+'" class="prod_img lazy lazy-fade-in demo-lazy" /><div class="text-center text-grey fw-600">'+p_name+'</div><div class="text-center text-grey fw-600"><i class="f7-icons fs-18">money_dollar</i>'+p_price+'</div><div class="col-66 text-center"><button class="col button button-raised button-fill color-orange no-radius submitbtn" onclick="addtocart('+p_id+','+"'"+p_name+"'"+','+"'"+p_img+"'"+','+"'"+p_img_path+"'"+','+p_price+')"><i class="f7-icons fs-18 mr-2 mt-5">cart</i> Add</button></div></li>';  

        
        //console.log(jqstep);
        //stepper.open();
       //$(".jqstepper_"+i).html(jqstep);
      }  

      for(var j=0;j<popularprd.length;j++){  
        var pop_img_path = popularprd[j].p_img_path;
        var pop_name = popularprd[j].p_name;
        var pop_price = popularprd[j].p_price;
        var pop_id = popularprd[j].p_id;
        var pop_img = popularprd[j].p_img;

        //popular_prods+='<li class="col-50 elevation-19 mb-10"><img src="'+base_url+pop_img_path+'" class="prod_img lazy lazy-fade-in demo-lazy" /><div class="text-center text-grey fw-600">'+pop_name+'</div><div class="text-center text-grey fw-600"><i class="f7-icons fs-18">money_dollar</i>'+pop_price+'</div><div class="col-66 text-center"><button class="col button button-raised button-fill color-orange no-radius submitbtn"><i class="f7-icons fs-18 mr-2 mt-5">cart</i> Add</button></div></li>'; 

        popular_prods+='<li class="col-50 elevation-19 mb-10"><img src="'+base_url+pop_img_path+'" class="prod_img lazy lazy-fade-in demo-lazy" /><div class="text-center text-grey fw-600">'+pop_name+'</div><div class="text-center text-grey fw-600"><i class="f7-icons fs-18">money_dollar</i>'+p_price+'</div><div class="col-66 text-center"><button class="col button button-raised button-fill color-orange no-radius submitbtn" onclick="addtocart('+pop_id+','+"'"+pop_name+"'"+','+"'"+pop_img+"'"+','+"'"+pop_img_path+"'"+','+pop_price+')"><i class="f7-icons fs-18 mr-2 mt-5">cart</i> Add</button></div></li>';  
      }
      //$(".jqstepper_"+i).html(jqstep);
      $("#new_arrivals").html(new_prods);
      $("#popular_prods").html(popular_prods);
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
  OTPtimer(pid);    
});
function OTPtimer(pid){
  var timer2 = "10:01";
  //var timer2 = "00:10"; // for demo //
  var interval = setInterval(function() {
    var timer = timer2.split(':');
    //by parsing integer, I avoid all extra string processing
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = (seconds < 0) ? --minutes : minutes;
    seconds = (seconds < 0) ? 59 : seconds;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    //minutes = (minutes < 10) ?  minutes : minutes;
    $('.countdown').html(minutes + ':' + seconds);
    if (minutes < 0) clearInterval(interval);
    //check if both minutes and seconds are 0
    if ((seconds <= 0) && (minutes <= 0)) clearInterval(interval);
    timer2 = minutes + ':' + seconds;
    if(timer2=='0:00'){
      $(".resndotp").removeClass("display-none");
      $(".resndotp").addClass("display-block");
      resetOTPandTime_part(pid);
    }else{
      $(".resndotp").removeClass("display-block");
      $(".resndotp").addClass("display-none");
    }
    //console.log(timer2+" timer2");
  }, 1000); 
}
function OTPtimer_cust(cid){
  var timer2 = "10:01";
  //var timer2 = "00:10"; // for demo //
  var interval = setInterval(function() {
    var timer = timer2.split(':');
    //by parsing integer, I avoid all extra string processing
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = (seconds < 0) ? --minutes : minutes;
    seconds = (seconds < 0) ? 59 : seconds;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    //minutes = (minutes < 10) ?  minutes : minutes;
    $('.countdown').html(minutes + ':' + seconds);
    if (minutes < 0) clearInterval(interval);
    //check if both minutes and seconds are 0
    if ((seconds <= 0) && (minutes <= 0)) clearInterval(interval);
    timer2 = minutes + ':' + seconds;
    if(timer2=='0:00'){
      $(".resndotp").removeClass("display-none");
      $(".resndotp").addClass("display-block");
      resetOTPandTime_cust(cid);
    }else{
      $(".resndotp").removeClass("display-block");
      $(".resndotp").addClass("display-none");
    }
    //console.log(timer2+" timer2");
  }, 1000); 
}
function resetOTPandTime_part(pid){
  checkConnection();
  app.preloader.show();
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/partresetOTP',
    data:{'pid':pid},
    success:function(rev){
      app.preloader.hide();
    }
  })
}
function resetOTPandTime_cust(cid){
  checkConnection();
  app.preloader.show();
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/custresetOTP',
    data:{'cid':cid},
    success:function(rev){
      app.preloader.hide();
    }
  })
}
$$(document).on('page:init', '.page[data-name="partner_reviews"]', function (page) {  
  checkConnection();
  var session_pid = window.localStorage.getItem("session_pid"); 
  app.preloader.show();
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/partnercustRev',
    data:{'session_pid':session_pid},
    success:function(rev){
      var c_revs = $.parseJSON(rev);
      var review = c_revs.review;
      var avg = c_revs.avg;
      if(review.length==0){
        $(".cust_reviews").html('<li class="text-red fw-600">No reviews available.</li>');
      }else{
        console.log(review);
        console.log(avg);
        var rev_output='';
        for(var i=0;i<review.length;i++){
          var c_name = review[i].c_name;
          var review_txt = review[i].review;
          var rate =  review[i].rate;
          $(".avgrating").html('Average rating is : <span class="badge">'+avg+'</span>');
          rev_output+='<li class="accordion-item lightblue mb-5"><a class="item-content item-link" href="#"><div class="item-inner"><div class="item-title text-blue fs-14 fw-500"><span class="txt-amaz">'+rate+'</span> <i class="f7-icons rate_star fs-16 mr-15">star_fill</i><span class="text-capitalize">'+c_name+'</span></div></div></a><div class="accordion-item-content nobg elevation-5"><div class="block"><p><img src="img/double-quote-grey.png" height="10" width="10"><span class="ml-2">'+review_txt+'</span></p></div></div></li>';
          $(".cust_reviews").html(rev_output);
        }
      }
      app.preloader.hide();
    }   
  });
});
function savepartnerCredit(){
  var creditamtForm = $(".creditamtForm").serialize();
  //console.log(creditamtForm);
  var credit_amt=$('input[name="credit_amt"]').val();
  if(credit_amt==''){
    app.dialog.alert("Enter credit amount");
    return false;
  }else{
    $.ajax({
      type:'POST', 
      url:base_url+'APP/Appcontroller/partnerCreditadd',
      data:creditamtForm,
      success:function(credit_data){
        if(credit_data.trim()=='updated'){
          app.dialog.alert("Success! Amount has been Credited.");
          mainView.router.navigate("/partner_dash/");
        }
      }
    });
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
          text:'Please check your registered mobile number '+hidd_mob+' to receive the resended OTP',
          position: 'center',
          closeTimeout: 10000,
        });        
        toastIcon.open();
        OTPtimer(hidd_pid);
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
function sendrandompassword(){
  app.preloader.show();
  var registered_mob = $("#mobile_no").val();
  $.ajax({
    type:'POST', 
    url:base_url+'APP/Appcontroller/sendforgotpass',
    data:{'registered_mob':registered_mob},
    success:function(mob){
      var parsemob = $.parseJSON(mob);
      var updated = parsemob.updated;
      if(updated=='mob_not_exists'){
        app.dialog.alert("Sorry! Your mobile no is not registered with Doorstep.");
      }else{
        app.dialog.alert("Please check your registered mobile inbox to get the password.Try to login with the sent password.");
      }
      mainView.router.navigate("/index/");
    } 
  });
  app.preloader.hide();
}
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
  window.localStorage.removeItem("session_reg_partcityid");
  window.localStorage.removeItem("session_reg_partcity");
  window.localStorage.removeItem("session_current_city");
  window.localStorage.removeItem("session_current_loc");  
  //mainView.router.navigate("/login/");
  mainView.router.navigate('/index/');
  app.panel.close();
  //app.panel.destroy(); 
  mainView.router.refreshPage();
}