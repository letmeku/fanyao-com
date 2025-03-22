interface BrowserInfo {
  name: string;
  version: string;
}
/**
 *返回版本信息
 * @returns {name: string, version: string}
 */
const detectBrowser = (ua: string): BrowserInfo => {
  const match = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  let name = match[1] || '';
  let version = match[2] || '';

  if (/trident/i.test(name)) {
    const rvMatch = /\brv[ :]+(\d+)/g.exec(ua);
    return { name: 'IE', version: rvMatch?.[1] || '' };
  }

  if (name === 'Chrome') {
    const specialMatch = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (specialMatch) {
      return { name: specialMatch[1] === 'OPR' ? 'Opera' : 'Edge', version: specialMatch[2] };
    }
  }

  const versionMatch = ua.match(/version\/(\d+)/i);
  if (versionMatch) version = versionMatch[1];
  name = name || navigator.appName;
  version = version || navigator.appVersion;

  return { name, version };
};

const browserSupportRules: Record<string, { minVersion: number; message: string }> = {
  Chrome: { minVersion: 73, message: '请使用 Chrome 73 或以上版本的浏览器' },
  Firefox: { minVersion: 69, message: '请使用 Firefox 69 或以上版本的浏览器' },
};

/**
 * 检测是否支持对应的版本
 * @returns boolean
 */
const checkCompatibility = ({ name, version }: BrowserInfo) => {
  const rule = browserSupportRules[name];
  const style = 'color: red; font-size: 20px; font-weight: bold;';

  if (!rule) {
    console.info(`%c不支持的浏览器：${name}，推荐使用 Chrome 73+`, style);
    return false;
  }

  const versionNum = parseInt(version, 10);
  if (versionNum < rule.minVersion) {
    console.info(`%c浏览器版本过低 (${name} ${version})，${rule.message}`, style);
    return false;
  }

  console.info(`%c支持 ${name} ${version}，推荐使用最新 Chrome 浏览器！`, 'color: green; font-size: 20px;');
  return true;
};

/**
 *
 * @returns
 */
function browserVersionTest(): BrowserInfo {
  const browser = detectBrowser(navigator.userAgent);
  console.table(browser);
  checkCompatibility(browser);
  return browser;
}

export default {
  browserVersionTest,
  checkCompatibility,
};
