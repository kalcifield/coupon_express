const puppeteer = require('puppeteer');

(async () => {


})();

var user = { 
    title: "7", // could be mapped, but I suspect mr, mrs to be used mostly
    firstName: "Marion", 
    surname: "Morrow",
    dateOfBirthDay: "8",
    dateOfBirthMonth: "11", // means december, month will be input then mapped
    dateOfBirthYear: "1960",
    email: "test@test.validmail.ru", // const 
    phone: "07191729391", // const
    address: "4 Kenneth Street",
    // streetName: "Kenneth street",
    city: "Wick", // only needed if not autofilled
    postCode: "kw1 5ln",
    username: "oruyiu6744test", // todo has to be generated & retried until successful,
    password: "uoioibF1", // const
    fourDigitPin: "5783", // const
 };