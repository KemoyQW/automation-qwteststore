class ShopPage extends Page{

    get parent() { return $('div.stackable') }
    get items() { return this.parent.$$('<a>') }
    get addToCartBtn () { return $('button.orange') }
    get cart () { return $('*=Cart') }

    selectItem(){
        // Item at index 5 (Black Mod) was problematic so omitted it.
        const goodIndices = [0,1,2,3,4,6,7,8]

        let index = goodIndices[Math.floor(Math.random() * Math.floor(8))];

        let item = this.items[index]
        item.click()
    }

    selectMultipleItems(index){
        let item = this.items[index]
        item.click()
    }

    addToCart(){
        this.addToCartBtn.waitForExist(1000)
        this.addToCartBtn.click()
    }

    emptyCart(){
        browser.url('/')
        this.cart.click()

        $('strong*=Sub total:').waitForDisplayed()

        let clearButtons = $$('button.icon')

        clearButtons.forEach(button => {
            button.click()
            browser.pause(500)
        });

    }
}
module.exports = new ShopPage();