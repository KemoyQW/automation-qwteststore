const CheckoutPage = require('../pageobjects/checkout.page')
const ShopPage = require('../pageobjects/shop.page')
const LoginPage = require('../pageobjects/login.page')

describe("Ensure users can check out successfully", () => {

    var cardNumber = 4242424242424242
    var exp = 1026
    var cvc = 132

    it("should allow a guess user to check out succesfully", () =>{
        browser.url('/')
        ShopPage.selectItem()
        ShopPage.addToCart()

        browser.waitUntil( () => {
            return ShopPage.cart.getText() === "Cart (1)"
        }, 2000, "Cart Changed")

        ShopPage.cart.click()
        CheckoutPage.checkOutButton.waitForDisplayed()
        CheckoutPage.checkOutButton.click()
        browser.pause()
        browser.switchToFrame($('//iframe[@name="stripe_checkout_app"]'))
    
        CheckoutPage.emailInput.setValue("test@test.com")
        CheckoutPage.nameInput.setValue("Jan")
        CheckoutPage.streetInput.setValue("Villa Rd")
        CheckoutPage.cityInput.setValue("Kingston")
        CheckoutPage.countryDropDown.click()
        CheckoutPage.dropDownOption.isSelected() ? CheckoutPage.paymentButton.click() : CheckoutPage.selectOption()
        browser.pause(500)
        CheckoutPage.cardNumberInput.waitForDisplayed()
        CheckoutPage.cardNumberInput.setValue(cardNumber)
        CheckoutPage.cardCVC.setValue(cvc)
        CheckoutPage.expDate.setValue(exp)

        CheckoutPage.paymentButton.click()
        
        browser.waitUntil( () => {
            return ShopPage.cart.getText() === "Cart (0)"
        }, 2000, "Cart Changed")

        assert.equal("Cart (0)", ShopPage.cart.getText(), "Never Change");
    })

    it("should allow a signed in user to check out succesfully", () =>{

        browser.url('/login/')
        LoginPage.login("desk@desk.com","desk1")
        LoginPage.myAccountTab.waitForExist(2000)

        browser.url('/')
        ShopPage.selectItem()
        ShopPage.addToCart()

    browser.waitUntil( () => {
            return ShopPage.cart.getText() === "Cart (1)"
        }, 2000, "Cart Changed")

        ShopPage.cart.click()
        CheckoutPage.checkOutButton.waitForDisplayed()
        CheckoutPage.checkOutButton.click()
        browser.pause()
        browser.switchToFrame($('//iframe[@name="stripe_checkout_app"]'))
    
        CheckoutPage.emailInput.setValue("test@test.com")
        CheckoutPage.nameInput.setValue("Jan")
        CheckoutPage.streetInput.setValue("Villa Rd")
        CheckoutPage.cityInput.setValue("Kingston")
        CheckoutPage.countryDropDown.click()
        CheckoutPage.dropDownOption.isSelected() ? CheckoutPage.paymentButton.click() : CheckoutPage.selectOption()
        browser.pause(500)
        CheckoutPage.cardNumberInput.waitForDisplayed()
        CheckoutPage.cardNumberInput.setValue(cardNumber)
        CheckoutPage.cardCVC.setValue(cvc)
        CheckoutPage.expDate.setValue(exp)

        CheckoutPage.paymentButton.click()

        browser.waitUntil( () => {
            return ShopPage.cart.getText() === "Cart (0)"
        }, 2000, "Cart Changed")

        assert.equal("Cart (0)", ShopPage.cart.getText(), "Never Change");


    })
})