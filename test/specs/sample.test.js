describe("Sample test for assesment", ()=>{
    it('should verify title is displayed', ()=> {
        browser.url('/')
        const title = $("h3")
        console.log(title.isDisplayed())
    })
})