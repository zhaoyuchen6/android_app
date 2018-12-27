const config = {
  serviceNames: ['/servlets/CloudService/','csd/'],
  projectNames: ['bmmp/'],
  };
  
  const ajaxURL = {
  afaTrade:'AfaTrade.csd',
  login:'LoginCsd.csd'
  }
  
  export const LoginCsd = ''.concat(ajaxURL.login);
  export const AfaTradeUrl = ''.concat(config.serviceNames[0]).concat(config.projectNames[0]).concat(config.serviceNames[1]).concat(ajaxURL.afaTrade);
  export const LoginUrl = ''.concat(config.serviceNames[0]).concat(config.projectNames[0]).concat(config.serviceNames[1]).concat(ajaxURL.login);

  export const defaultCountdownValue = 900;
  export const TimeOut = 60000;