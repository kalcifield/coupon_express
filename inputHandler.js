const fs = require('fs');
// const parse = require('csv-parse')

const titleMap = {}
titleMap["Mr"] = "4"
titleMap["Mrs"] = "7"
titleMap["Ms"] = "3"
titleMap["Miss"] = "5"
// console.log(titleMap['Mr'])  

// test.txt
exports.generateUsersFromFile = function() {
    let text = fs.readFileSync('kuld.txt','utf8');
    let rows = text.split('\n');
    let userlist = [];
    rows.forEach(elem => {
        let userPropList = elem.split(', ')
        if (userPropList.length != 6) {
            console.warn("Property amount too many. Input is malformed: " + userPropList)
            return;
        }
        console.log("......User properties......")
        console.log(userPropList)
        console.log(".........................")

        let user = convertDtoToUser(userPropList)
        userlist.push(user)
    })
    //console.log(userlist)
    return userlist;
}

function convertDtoToUser(userPropList) {
    console.log("converting to user: " + userPropList)
    let user = {};
    user.title = titleMap[userPropList[0]]
    // fog jonni 3 nevu? vszeg still good
    user.firstName = userPropList[1].split(' ')[0];
    user.surname = userPropList[1].split(' ')[1];
    let date = userPropList[2].split('.');
    // + means: 05 -> 5
    user.dateOfBirthDay = String(+date[0]);
    user.dateOfBirthMonth = String(+date[1]);
    user.dateOfBirthYear = date[2];
    user.address = userPropList[3]
    user.city = userPropList[4]
    // user.postCode = userPropList[5].replace(/\s+/g, ' ').trim();
    user.postCode = userPropList[5];
    return user;
 }

// row separated on lines
// validated there are 5 params
// explode params to object fields

// var parsedJSON = require('./users.json');
/* parsedJSON.forEach( function(user) {

    user.email = "test@test.validmail.ru"
    user.phone = "07191729391"
    user.username = "oruyiu6744test" // getGeneratedUsername()
	user.password = "uoioibF1"
    user.fourDigitPin = "5783"
    
    
}) */
// console.log(parsedJSON);

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