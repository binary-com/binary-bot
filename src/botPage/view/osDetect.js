
export const MOBILE_TYPE = {
  WINDOWS_PHONE: 'Windows Phone',
  ANDROID: 'Android',
  IOS: 'iOS',
  UNKNOWN: 'unknown',
}


export const mobileOSDetect = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return MOBILE_TYPE.WINDOWS_PHONE;
  }

  if (/android/i.test(userAgent)) {
    return MOBILE_TYPE.ANDROID;
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return MOBILE_TYPE.IOS;
  }

  return MOBILE_TYPE.UNKNOWN;
};

export const isIOS = () => !!(mobileOSDetect() === MOBILE_TYPE.IOS);