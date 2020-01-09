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
    path: '/partner_dash/',
    url: './partner/partner_dash.html',
    name: 'partner_dash',
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
    //path: '/partner_otpverify/',
    //url: './partner/partner_otpverify.html',
    path: '/customer_otpverify/:mobile/:cid/',
    url: './customer/customer_otpverify.html?mobile={{mobile}}/cid={{cid}}',
    name: 'customer_otpverify',
    options: {
      animate: true,
    },
  },  
];
