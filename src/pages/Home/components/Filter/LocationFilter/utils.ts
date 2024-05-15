type IgetOS = 'Windows' | 'Linux' | 'Android' | 'iOS' | 'Unknown OS';

export function getOS(): IgetOS {
  let OSName = 'Unknown OS';
  if (navigator.userAgent.indexOf('Win') != -1) OSName = 'Windows';
  if (navigator.userAgent.indexOf('Linux') != -1) OSName = 'Linux';
  if (navigator.userAgent.indexOf('Android') != -1) OSName = 'Android';
  if (navigator.userAgent.indexOf('like Mac') != -1) OSName = 'iOS';
  return OSName as IgetOS;
}
