describe('Login For App Constant', function () {
	
    it('Login TO RMC and Select App const', function () {
		browser.waitForAngularEnabled(false);
        browser.get('http://localhost:3000/');
		
		browser.executeScript('document.querySelector(\'[id="demo"]\').style.display = "block"');
		browser.executeScript('document.querySelector(\'[id="demo1"]\').style.display = "none"');
		browser.sleep('5000');
		element(by.id('username')).sendKeys('user1@testing.com');
		element(by.id('password')).sendKeys('123456');
		var loginId = element(by.id('loginButton'));
		loginId.click();
		browser.sleep('5000');
		
		//Selecting the customers
		var customerHeader = element(by.id('applicationConstantLinkHeader'));
		customerHeader.click();
		browser.sleep('3000');
	});
	
	it(' Adding App Constant', function () {
		//Adding the customer to the list
		element(by.cssContainingText('.btn-primary', 'Add')).click();
		browser.sleep('3000');
		element(by.css('[ng-reflect-name="description"]')).sendKeys('TestsDesc');
		element(by.css('[ng-reflect-name="value"]')).sendKeys('d://Test//test//');
		
		element(by.id('saveAppConsButton')).click();
		browser.sleep('3000');		
	});	
		
	it(' Edit App Constant', function () {
		//Edit the customer and will save the customer		
		browser.sleep('3000');	
		element.all(by.css('.fa-pencil')).get(0).click();
		element(by.css('[ng-reflect-name="description"]')).clear().sendKeys('Tests1234');
		element(by.css('[ng-reflect-name="value"]')).clear().sendKeys('d://Test//test//2345');
		element(by.id('saveAppConsButton')).click();
		browser.sleep('2000');	
	})
   
});

