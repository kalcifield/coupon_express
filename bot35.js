const puppeteer = require('puppeteer');
const inputHandler = require('./inputHandler')
var Chance = require('chance');
var chance = new Chance();

let userlist = inputHandler.generateUsersFromFile();
userlist.forEach( function(user) {

    user.email = "test@test.validmail.ru"
	user.phone = "07191729391"

	// random username generation
	let name = chance.name({ nationality: 'it' })
	let postFixNumber = Math.floor(Math.random() * Math.floor(100)); // oruyiu44test getGeneratedUsername()
	user.username = name.substring(0, Math.min(name.length, 11)) + postFixNumber 
	
	user.password = "uoioibF1"
    user.fourDigitPin = "5783"

	// could-be-async NOT, because node cant do that
	crawlSkybet(user);
})

function crawlSkybet(user) {
	(async () => {
	// START common with bet
	console.log("started crawling ..")
	const BASE_URL = 'https://m.skybet.com/lp/ftp-bet-10-get-40?sba_promo=B10G40FTP&aff=123456789&dcmp=SL_EnhancedOffer'

	const browser = await puppeteer.launch({ 
		headless: false,
		// if rotating proxy is enabled 
		// args: ['--proxy-server=192.187.125.234:19018'] 
	});

	const page = await browser.newPage();
	// faking chrome
	await page.evaluateOnNewDocument(() => {
		Object.defineProperty(navigator, 'platform', { get: () => 'Win32'})
		Object.defineProperty(navigator, 'productSub', { get: () => '20030107'})
		Object.defineProperty(navigator, 'vendor', { get: () => 'Google Inc.'})
		Object.defineProperty(navigator, 'oscpu', { get: () => ''})

	})

	// set user agent (override the default headless User Agent)
	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.0 Safari/537.36');
	await page.goto(BASE_URL);

	// END common with bet
	await page.click('.js-register');
	console.log("waiting..")
	await page.waitFor(2000)
	
	const frame = await page.frames().find(frame => frame.name() === 'SkyBetAccount');
	const searchInput = await frame.$('input[data-qa=FirstNameInput]');
	await searchInput.focus();
	await page.keyboard.type(user.firstName);
	
	const LastNameInput = await frame.$('input[data-qa=LastNameInput]');
	await LastNameInput.focus();
	await page.keyboard.type(user.surname);

	const submitButton = await frame.$('button[data-qa=SubmitForm]');
	submitButton.click();
	await page.waitFor(1000)

	// birth date page
	await (await frame.$('input[data-qa=DOBDayInput]')).focus();
	await page.keyboard.type(user.dateOfBirthDay);
	await (await frame.$('input[data-qa=DOBMonthInput]')).focus();
	await page.keyboard.type(user.dateOfBirthMonth);
	await (await frame.$('input[data-qa=DOBYearInput]')).focus();
	await page.keyboard.type(user.dateOfBirthYear);
	const submitButton2 = await frame.$('button[data-qa=SubmitForm]');
	submitButton2.click();
	await page.waitFor(1000)
	// address page
	await (await frame.$('input[data-qa=AddressSearch]')).focus();
	await page.keyboard.type("mock");
	await page.waitFor(1000)
	const manualEntry = await frame.$('a[data-qa=manualEntry]');
	manualEntry.click();
	await page.waitFor(1000)

	await (await frame.$('input[data-qa=AddressLine1Input]')).focus();
	await page.keyboard.type(user.address);
	await (await frame.$('input[data-qa=CityInput]')).focus();
	await page.keyboard.type(user.city, { delay: 20 });
	await (await frame.$('input[data-qa=PostcodeInput]')).focus();
	await page.keyboard.type(user.postCode, { delay: 20 });
	await page.waitFor(1000)
	
	await (await frame.$('input[data-qa=EmailInput]')).focus();
	await page.keyboard.type(user.email);
	const submitButton3 = await frame.$('button[data-qa=SubmitForm]');
	submitButton3.click();
	await page.waitFor(1000)

	await (await frame.$('input[data-qa=PhoneNumberInput]')).focus();
	await page.keyboard.type(user.phone);
	const submitButton4 = await frame.$('button[data-qa=SubmitForm]');
	submitButton4.click();
	await page.waitFor(1000)

	await (await frame.$('input[data-qa=UsernameInput]')).focus();
	await page.keyboard.type(user.username);
	const submitButton5 = await frame.$('button[data-qa=SubmitForm]');
	submitButton5.click();
	await page.waitFor(1000)

	await (await frame.$('input[data-qa=MothersMaidenInput]')).focus();
	await page.keyboard.type("Chanel");
	let submitButton6 = await frame.$('button[data-qa=SubmitForm]');
	submitButton6.click();
	await page.waitFor(1000)
	
	await frame.select('select[data-qa=SecurityQuestionInput]', "Name your favourite teacher?");
	await (await frame.$('input[data-qa=SecurityAnswerInput]')).focus();
	await page.keyboard.type("Chanel");
	submitButton6 = await frame.$('button[data-qa=SubmitForm]');
	submitButton6.click();
	await page.waitFor(1000)

	await (await frame.$('input[data-qa=Pin1Input]')).focus();
	await page.keyboard.type("5");
	await (await frame.$('input[data-qa=Pin2Input]')).focus();
	await page.keyboard.type("7");
	await (await frame.$('input[data-qa=Pin3Input]')).focus();
	await page.keyboard.type("8");
	await (await frame.$('input[data-qa=Pin4Input]')).focus();
	await page.keyboard.type("3");
	submitButton6 = await frame.$('button[data-qa=SubmitForm]');
	// pin cant be part of username Xddd
	submitButton6.click();
	await page.waitFor(1000)

	await frame.evaluate(() => {
		document.querySelector('input[data-qa=MarketingInputNo]').parentElement.click();
	});

	await frame.evaluate(() => {
		document.querySelector('input[data-qa=TermsPPCheck]').parentElement.click();
	});
	submitButton6 = await frame.$('button[data-qa=SubmitForm]');
	// submitButton6.click();

	// await (await frame.$('select[data-qa=SecurityQuestionInput]')).click();
	// await page.select('select[data-qa=SecurityQuestionInput"]', "Name your favourite teacher?");
	
	/*await (await frame.$('input[data-qa=EmailInput]')).focus();
	await page.keyboard.type(user.email);
	*/
	/* await page.waitForSelector('input[data-qa=FirstNameInput]');
	await page.focus('input[data-qa=FirstNameInput]');
	const searchInput = await page.$('input[data-qa=FirstNameInput]');
	await searchInput.focus();
	await page.keyboard.type(user.firstName);
	*/
	})();
}

/**
 * @deprecated duplicated
 */
function crawlBet(user) {
	(async () => {
		console.log("started crawling ..")
		const BASE_URL = 'https://members.bet365.com/Members/Services/OpenAccount?lng=1'	
		// for testing user agent
		// const BASE_URL = 'https://i-know-you-faked-user-agent.glitch.me/new-window'
	
		const browser = await puppeteer.launch({ 
			headless: false,
			// args: ['--proxy-server=192.187.125.234:19018'] 
		});
	
		const page = await browser.newPage();
		// faking chrome, should I firefox?
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'platform', { get: () => 'Win32'})
			Object.defineProperty(navigator, 'productSub', { get: () => '20030107'})
			Object.defineProperty(navigator, 'vendor', { get: () => 'Google Inc.'})
			Object.defineProperty(navigator, 'oscpu', { get: () => ''})

		})

		// set user agent (override the default headless User Agent)
		await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.0 Safari/537.36');
		await page.goto(BASE_URL);
	
		await page.select('select[id="Country"]', '197');
		// await page.click('#confirm');
	
		await page.evaluate(() => {
			document.querySelector('button[id=Confirm]').click();
		});
		await delay(4000) // wait loading
		
		await page.select('select[id="Title"]', user.title);
		await page.type('input[id=FirstName]', user.firstName, { delay: 20 })
		await page.type('input[id=Surname]', user.surname, { delay: 20 })
		await page.select('select[id="DateOfBirthDay"]', user.dateOfBirthDay);
		await page.select('select[id="DateOfBirthMonth"]', user.dateOfBirthMonth);
		await page.select('select[id="DateOfBirthYear"]', user.dateOfBirthYear);
		await page.type('input[id=EmailAddress]', user.email, { delay: 20 })
		await page.type('input[id=PhoneNumber]', user.phone, { delay: 20 })
	
		await page.click('#NotificationMessageNo');
		await page.click('#TextMessageNo');
		await page.click('#EmailMessageYes');
		await page.click('#WebMessageNo');
	
		await page.type('input[id=CurrentBuildingNumberSearch]', user.address, { delay: 20 })
		// await page.type('input[id=CurrentStreetNameSearch]', user.streetName, { delay: 20 })
		await page.type('input[id=CurrentPostcodeSearch]', user.postCode, { delay: 20 })
		
		await page.click('#CurrentFindAddress');
		// wait a few sec for address request
		await delay(4000)
		
		// if city is not autofilled..?
		// await page.type('input[id=CurrentTownCity]', user.city, { delay: 20 })
		
		await page.type('input[id=UserName]', user.username, { delay: 20 })
		await page.type('input[id=Password]', user.password, { delay: 20 })
		await page.type('input[id=ConfirmPassword]', user.password, { delay: 20 })
		await page.type('input[id=FourDigitPin]', user.fourDigitPin, { delay: 20 })
		await page.type('input[id=FourDigitPinConfirmed]', user.fourDigitPin, { delay: 20 })
		await page.click('#PoliciesAcceptance');
	
		await page.screenshot({ path: 'example.png' });
		// await page.click('#Submit');
	
		// if #lightBoxMessage exists -> click -> generate new username
		console.log("closing browser...")
		// await browser.close();
	})();

}


function delay(time) {
	return new Promise(function(resolve) { 
		setTimeout(resolve, time)
	});
 }