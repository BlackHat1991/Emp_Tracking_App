describe('Location', function () {
	
    it('Login TO RMC and selecting Location', function () {
		browser.waitForAngularEnabled(false);
        browser.get('http://localhost:3000/');
		
        browser.sleep('5000');
		browser.executeScript('document.querySelector(\'[id="demo"]\').style.display = "block"');
		browser.executeScript('document.querySelector(\'[id="demo1"]\').style.display = "none"');
        
        /*var loginForm = element(by.id('loginFormID'));
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(loginForm), 60000);
		//login.click();
        loginForm.click();
		browser.sleep('5000');*/
        browser.sleep('5000');
		element(by.id('username')).sendKeys('user1@testing.com');
		element(by.id('password')).sendKeys('123456');
		var loginId = element(by.id('loginButton'));
		loginId.click();
		browser.sleep('2000');
		
		//Selecting the customers
		var locationHeader = element(by.id('locationLinkHeader'));
		locationHeader.click();
		browser.sleep('3000');
		
	});
	
	it(' Adding Location',  function (){
		//Adding the customer to the list
		element(by.cssContainingText('.btn-primary', 'Add Location')).click();
		browser.sleep('3000');
		element(by.css('[name="locationName"]')).sendKeys('TestsLocationName');
		element(by.css('[name="locAddress"]')).sendKeys('TestsLocationCity');
		element(by.css('[name="locZipcode"]')).sendKeys('12345');
		browser.sleep('3000');
		element(by.css('[name="locCountry"]')).sendKeys('India');
		browser.sleep('3000');
		
		var selectDropdownElement= element(by.css('[name="customer"]'));
		selectDropdownElement.all(by.tagName('option'))
			  .then(function (options) {
				  options[2].click();
			  });
		
		element(by.id('customerRole')).click();
		element.all(by.css('.dropdown-item')).get(0).click();
		element(by.id('csrRole')).click();
		element.all(by.css('.dropdown-item')).get(0).click();
		element(by.id('csrRole')).click();
		browser.sleep('1000');
		element(by.id('saveLocationButton')).click();
		browser.sleep('3000');		
		
	});
	
	it(' Editing Location',  function (){
		
		//Edit the customer and will save the customer		
		element.all(by.css('.fa-pencil')).get(0).click();
		element(by.css('[name="locationName"]')).sendKeys('Tests1234');		
		element(by.css('[name="locAddress"]')).sendKeys('TestsCity123');
		element(by.id('saveLocationButton')).click();
		browser.sleep('3000');	
		
	});
	
	it(' deleting Location',  function (){	
		//Delete the customer and will add the customer
		element.all(by.css('.fa-trash')).get(0).click();
		browser.sleep('3000');
    });
   
});

