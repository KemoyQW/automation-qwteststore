const Page = require('./page')

class CheckoutPage extends Page{

    get checkOutButton () { return $('button=Check out') }
    get paymentButton () { return $('Button.Button')  }

    get emailInput() { return $('//input[@type="email"]') }
    get nameInput() { return $('//input[@placeholder="Name"]') }
    get streetInput() { return $('//input[@placeholder="Street"]') }
    get cityInput() { return $('//input[@placeholder="City"]') }

    get countryDropDown() { return $('select') }
    get dropDownOption() { return $('//option[@value="JM"]') }

    get cardNumberInput() { return $('//input[@placeholder="Card number"]') }
    get expDate() { return $('//input[@placeholder="MM / YY"]') }
    get cardCVC() { return $('//input[@placeholder="CVC"]') }
    
    selectOption(){
        this.dropDownOption.click()
        browser.pause(500)
    }

   
}
module.exports = new CheckoutPage()