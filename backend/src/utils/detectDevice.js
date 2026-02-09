export const detectDeviceInfo = (userAgent = "") => {
  const ua = userAgent.toLowerCase();

  const device = /mobile/.test(ua) ? "Mobile" : "Desktop";
  const browser =
    ua.includes("chrome") ? "Chrome" :
    ua.includes("firefox") ? "Firefox" :
    ua.includes("safari") ? "Safari" :
    "Unknown";

  const os =
    ua.includes("windows") ? "Windows" :
    ua.includes("android") ? "Android" :
    ua.includes("iphone") ? "iOS" :
    ua.includes("mac") ? "MacOS" :
    "Unknown";

  return { device, browser, os };
};
