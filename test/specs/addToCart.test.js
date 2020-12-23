const ShopPage = require('../pageobjects/shop.page')
const LoginPage = require('../pageobjects/login.page') 

describe("Checks Add to Cart Functionality", () =>{

    let path = '/'

    it("should allow guess to add an item to cart", () => {
        browser.url(path)

        ShopPage.selectItem();
        ShopPage.addToCart()

        browser.waitUntil( () => {
            return ShopPage.cart.getText() === "Cart (1)"
        }, 2000, "Cart Changed")

       assert.equal("Cart (1)", ShopPage.cart.getText(), "Never Change");

       ShopPage.emptyCart()


    })


    it("should allow guess user to add multiple items to cart", () => {

        for (let index = 0; index < 2; index++) {
            browser.url(path)
            ShopPage.selectMultipleItems(index);
            ShopPage.addToCart();     
        }
        
        browser.waitUntil( () => {
            return ShopPage.cart.getText() === "Cart (2)"
        }, 3000, "Cart Changed")

        assert.equal("Cart (2)", ShopPage.cart.getText(), "Never Change");
        ShopPage.emptyCart()

    })

    it("should allow guess to add multiple of the same item", () => {

        for (let index = 0; index < 2; index++) {
            browser.url(path)
            ShopPage.selectMultipleItems(2);
            ShopPage.addToCart();     
        }
        
        browser.waitUntil( () => {
            return ShopPage.cart.getText() === "Cart (2)"
        }, 2000, "Cart Changed")

        assert.equal("Cart (2)", ShopPage.cart.getText(), "Never Change");
        ShopPage.emptyCart()
    })

    it("should show same price on product page and home for a signed in user", () =>{

        browser.url('/login/')
        LoginPage.inputPassword.waitForDisplayed()
        LoginPage.login("desk@desk.com", "desk1")
        LoginPage.myAccountTab.waitForExist(2000)

        browser.url(path)
        ShopPage.selectItem();

        ShopPage.addToCartBtn.waitForDisplayed()
        let priceAtDescription = $('.description').$('p').getText()
        ShopPage.addToCart()

        ShopPage.cart.click()

       
        let cartPriceHolder = $('.clearing span')
        let priceInCart ='$'+ cartPriceHolder.getText().split('$')[1]

        expect(priceAtDescription).to.equal(priceInCart);
        ShopPage.emptyCart()
    })

    it("should verify cart does not change after sign-out or sign-in", () =>{
     
        browser.url('/login/')

        LoginPage.inputPassword.waitForDisplayed()
        LoginPage.login("desk@desk.com", "desk1")
        LoginPage.myAccountTab.waitForDisplayed(1000)
        const signOut = $('a=Sign out')

        browser.url(path)
        ShopPage.selectItem();

        ShopPage.addToCartBtn.waitForDisplayed()
        ShopPage.addToCart()

        browser.waitUntil( () => {
            return ShopPage.cart.getText() === "Cart (1)"
        }, 2000, "Cart Changed")

        ShopPage.cart.click()

        let cartContents = []

        cartContents.push($('div.meta').getText())
        cartContents.push($('.content a').getText())
        cartContents.push($('.clearing span').getText())

        //sign out user
        signOut.click()
        browser.url(path)

        ShopPage.cart.click()

        let cartContents2 = []

        cartContents2.push($('div.meta').getText())
        cartContents2.push($('.content a').getText())
        cartContents2.push($('.clearing span').getText())

        let status = JSON.stringify(cartContents) === JSON.stringify(cartContents2)

        assert.equal(true, status, "Items Dfferent");



    })
})