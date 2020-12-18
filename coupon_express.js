const puppeteer = require('puppeteer');

let userlist = [{
	couponCode: "2333",
	email: "test@test.validmail.ru",
	phone: "07191729391"
}];
userlist.forEach(function (user) {
	createCoupon(user);
})


function createCoupon(user) {
	(async () => {
		const BASE_URL = 'https://netpincer.com/'

		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();
		// faking chrome
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'platform', { get: () => 'Win32' })
			Object.defineProperty(navigator, 'productSub', { get: () => '20030107' })
			Object.defineProperty(navigator, 'vendor', { get: () => 'Google Inc.' })
			Object.defineProperty(navigator, 'oscpu', { get: () => '' })

		})
		// set user agent (override the default headless User Agent)
		await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.0 Safari/537.36');

		await page.goto(BASE_URL);

		delay(4000)

		// mouse click
		await page.click('.banner-close-button')

		delay(4000)
		await page.click('.pink-banner__close-button')
		// await page.type('input[id=form_elem]', 'valami');



		await page.keyboard.type(user.couponCode);

		// await browser.close();
	})();
}


function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	});
}