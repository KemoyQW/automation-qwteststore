const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputEmail () { return $('#email') }
    get inputPassword () { return $('#password') }
    get btnSubmit () { return $('button.orange') }
    get errorPrompt () { return $('div=Sorry')}
    get noPasswordPrompt () { return $('p=Password is required') }
    get noEmailPrompt () { return $('p=Email address is required') }
    get myAccountTab () { return $('*=My') }

     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    login (email, password) {
        this.inputEmail.setValue(email);
        this.inputPassword.setValue(password);
        this.btnSubmit.click();

        // if(this.btnSubmit.isExisting()){
        //     //this.btnSubmit.click();
        //     console.log(this.btnSubmit.isClickable());
        //     console.log(this.btnSubmit.getText());
        //     console.log("Clickable");
        //     this.btnSubmit.click();
        // } else
        // console.log("Not Clickable");
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('/login');
    }
}

module.exports = new LoginPage();
