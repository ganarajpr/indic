import chrome from 'chrome-aws-lambda';
const exePath = process.platform === 'win32'
? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
: process.platform === 'linux'
? '/usr/bin/google-chrome'
: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export async function getOptions(isDev) {
    let options = {};
    await chrome.font('https://fonts.gstatic.com/s/vesperlibre/v19/bx6CNxyWnf-uxPdXDHUD_RdICUWM-KEGVJLW.woff2');
    if (isDev) {
        options = {
            args: ['--font-render-hinting=none', '--force-color-profile=srgb'],
            executablePath: exePath,
            headless: true
        };
    } else {
        options = {
            args: [...chrome.args, '--font-render-hinting=none', '--force-color-profile=srgb'],
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
        };
    }
    return options;
}
