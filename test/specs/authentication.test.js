const { assert } = require('chai')
const loginPage = require('../pageobjects/login.page')

describe("User Login Tests", () => {

    var login = '/login/'

    it("should login with valid email and password", () => {
        browser.url(login)

        let email = "desk@desk.com";
        let password = "desk1";

        loginPage.login(email, password)

        loginPage.myAccountTab.waitForExist(3000)

        assert.equal(true, loginPage.myAccountTab.isDisplayed(), "Unsucccesful");

    })

    it("should NOT login with valid email and invalid password", () => {

        browser.url(login)

        let email = "desk@desk.com";
        let password = "1desk";

        loginPage.login(email,password)

        loginPage.errorPrompt.waitForExist(2000);

        assert.equal(true, loginPage.errorPrompt.isDisplayed(), "Oops! Check again");

        // assert.equal("https://qw-test-store-prod.netlify.app/login/", browser.getUrl(), "oops");

    })

    it("should NOT login with valid email and no password", () => {

        browser.url(login)

        let email = "desk@desk.com";
        let password = "";

        loginPage.login(email,password)

        loginPage.noPasswordPrompt.waitForExist(2000);

        assert.equal(true, loginPage.noPasswordPrompt.isDisplayed(), "Oops! Check again");

    })

    it("should NOT login with invalid email and valid password", () => {

        browser.url(login)

        let email = "desker@desk.com";
        let password = "desk1";

        loginPage.login(email,password)

        loginPage.errorPrompt.waitForExist(2000);

        assert.equal(true, loginPage.errorPrompt.isDisplayed(), "Oops! Check again");

    })

    it("should NOT login without an email and a password", () => {

        browser.url(login)

        let email = "";
        let password = "";

        loginPage.login(email,password)

        loginPage.noPasswordPrompt.waitForExist(2000);
        loginPage.noEmailPrompt.waitForExist(2000);

        let status = (loginPage.noPasswordPrompt.isDisplayed() && loginPage.noEmailPrompt.isDisplayed())

        assert.equal(true, status, "Oops! Check again");

    })
})