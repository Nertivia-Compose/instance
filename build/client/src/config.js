const config = {
  devMode: false,
  breeMode: false,
  captchaSiteKey: process.env.VUE_APP_CLIENT_CAPTCHA_KEY,
  domain: process.env.VUE_APP_CLIENT_DOMAIN,
  nertiviaCDN: process.env.VUE_APP_CDN_DOMAIN,
  IP: [
    {
      domain: `${process.env.VUE_APP_SERVER_DOMAIN}:${process.env.VUE_APP_SERVER_PORT}/api`,
      socketIP: `${process.env.VUE_APP_SERVER_DOMAIN}:${process.env.VUE_APP_SERVER_PORT}`
    }
  ]
}

if (window.webpackHotUpdate) {
  config.devMode = true;
} else {
  config.devMode = false
}

if ( config.devMode ) {
  config.recaptcha = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  config['domain'] = config.IP[0].domain;
  config['socketIP'] = config.IP[0].socketIP;

  if( config.breeMode ) {
    config['domain'] = config.IP[0].domain;
    config['socketIP'] = config.IP[0].socketIP;
  }
} else {
  config.recaptcha = "6Ld0EIwUAAAAALJNTa-1s63l-w_jHyCY6dFAVwKe";
  config['domain'] = config.IP[0].domain;
  config['socketIP'] = config.IP[0].socketIP;
}

export default config;