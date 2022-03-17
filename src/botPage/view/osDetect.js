export const isIOS = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return !!(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
}