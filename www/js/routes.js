var routes = [
  // Index page
  {
    //path: '/index/',
    path: '/',
    url: './index.html',
    name: 'index',
  },
  {
    path: '/login/',
    url: './login.html',
    name: 'login',
  },
  {
    path: '/current-location/',
    url: './current-location.html',
    name: 'current-location',
  },
  {
    //path: '/index/',
    path: '/internet/',
    url: './internet.html',
    name: 'internet',
  },
  {
    path: '/location_on/',
    url: './location_on.html',
    name: 'location_on',
  },
  {
    path: '/partner_register/',
    url: './partner/partner_register.html',
    name: 'partner_register',
    options: {
      animate: true,
    },
  },
  {
    path: '/partner_editprof/',
    url: './partner/partner_editprof.html',
    name: 'partner_editprof',
    options: {
      animate: true,
    },
  },
  {
    path: '/partner_changepass/',
    url: './partner/partner_changepass.html',
    name: 'partner_changepass',
    options: {
      animate: true,
    },
  },  
  {
    path: '/partner_profile/',
    url: './partner/partner_profile.html',
    name: 'partner_profile',
    options: {
      animate: true,
    },
  },
  {
    path: '/partner_dash/',
    url: './partner/partner_dash.html',
    name: 'partner_dash',
    options: {
      animate: true,
    },
  },
  {
    path: '/partner_orders/',
    url: './partner/partner_orders.html',
    name: 'partner_orders',
    options: {
      animate: true,
    },
  },
  {
    path: '/partner_mycart/',
    url: './partner/partner_mycart.html',
    name: 'partner_mycart',
    options: {
      animate: true,
    },
  },{
    path: '/partner_reviews/',
    url: './partner/partner_reviews.html',
    name: 'partner_reviews',
    options: {
      animate: true,
    },
  },
  {
    path: '/partner_payment/',
    url: './partner/partner_payment.html',
    name: 'partner_payment',
    options: {
      animate: true,
    },
  },
  {
    path: '/partner_buy_credit/',
    url: './partner/partner_buy_credit.html',
    name: 'partner_buy_credit',
    options: {
      animate: true,
    },
  },
  {
    path: '/partner_shopping_cart/',
    url: './partner/partner_shopping_cart.html',
    name: 'partner_shopping_cart',
    options: {
      animate: true,
    },
  },
  {
    path: '/customer_dash/',
    url: './customer/customer_dash.html',
    name: 'customer_dash',
    options: {
      animate: true,
    },
  },
  {
    //path: '/partner_otpverify/',
    //url: './partner/partner_otpverify.html',
    path: '/partner_otpverify/:mobile/:pid/',
    url: './partner/partner_otpverify.html?mobile={{mobile}}/pid={{pid}}',
    name: 'partner_otpverify',
    options: {
      animate: true,
    },
  },
  {
    path: '/customer_register/',
    url: './customer/customer_register.html',
    name: 'customer_register',
    options: {
      animate: true,
    },
  },
  {
    path: '/customer_editprof/',
    url: './customer/customer_editprof.html',
    name: 'customer_editprof',
    options: {
      animate: true,
    },
  },
  {
    path: '/customer_changepass/',
    url: './customer/customer_changepass.html',
    name: 'customer_changepass',
    options: {
      animate: true,
    },
  },
  {
    //path: '/partner_otpverify/',
    //url: './partner/partner_otpverify.html',
    path: '/customer_otpverify/:mobile/:cid/',
    url: './customer/customer_otpverify.html?mobile={{mobile}}/cid={{cid}}',
    name: 'customer_otpverify',
    options: {
      animate: true,
    },
  },  
  {
    path: '/customer_servicelist/',
    url: './customer/customer_servicelist.html',
    name: 'customer_servicelist',
    options: {
      animate: true,
    },
  },
  {
    //path: '/partner_otpverify/',
    //url: './partner/partner_otpverify.html',
    path: '/customer_service_types/:sid/:sname/:cimg/:cat_id/',
    url: './customer/customer_service_types.html?sid={{sid}}/sname={{sname}}/cimg={{cimg}}/cat_id={{cat_id}}',
    name: 'customer_service_types',
    options: {
      animate: true,
    },
  }, 
  {
    //path: '/partner_otpverify/',
    //url: './partner/partner_otpverify.html',
    path: '/customer_servicedet/:j_id/:j_name/:j_price/:sid/',
    url: './customer/customer_servicedet.html?j_id={{j_id}}/j_name={{j_name}}/j_price={{j_price}}/sid={{sid}}',
    name: 'customer_servicedet',
    options: {
      animate: true,
    },
  }, 
  {
    path: '/customer_loc/',
    url: './customer/customer_loc.html',
    name: 'customer_loc',
  }, 
];
