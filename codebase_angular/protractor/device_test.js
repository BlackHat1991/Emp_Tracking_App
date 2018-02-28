describe('Login for user Tests', function () {
	
    it('Login TO RMC AS User and Select Device', function () {
		browser.waitForAngularEnabled(false);
        browser.get('http://31.220.7.107:8080/IOT/');
		
		browser.executeScript('document.querySelector(\'[id="demo"]\').style.display = "block"');
		browser.executeScript('document.querySelector(\'[id="demo1"]\').style.display = "none"');
		browser.sleep('3000');	
		element(by.id('username')).sendKeys('csr1@test.com');
		element(by.id('password')).sendKeys('test');
		var loginId = element(by.id('loginButton'));
		loginId.click();
		browser.sleep('8000');
		
		//Selecting the Device
		var deviceHeader = element(by.id('devicesLinkHeader'));
		deviceHeader.click();
		browser.sleep('3000');
		
	});
	
	/*it(' Testing Device', function () {
		//Adding the customer to the list		
		element(by.css('[(userRowSelect)]')).click();
		browser.sleep('1000');		
	});*/	
	
	it(' Selecting Group', function () {
		//Selecting the User
		var groupHeader = element(by.id('groupLinkHeader'));
		groupHeader.click();
		browser.sleep('3000');
    });
	
	it(' Adding Group',  function (){
		//Adding the Location to the list
		element(by.cssContainingText('.btn-primary', 'Add Group')).click();
		browser.sleep('3000');
		element(by.css('[name="groupName"]')).sendKeys('Test Group Name');
		element(by.css('[name="email"]')).sendKeys('group@test.com');
		element(by.css('[name="phone"]')).sendKeys('12345');
		element(by.css('[name="messageContent"]')).sendKeys('test message');
		
		var selectDropdownElement= element(by.id('actionTypes'));
		selectDropdownElement.all(by.tagName('option'))
		  .then(function (options) {
			  options[0].click();
		  });
		browser.sleep('1000');
		
		var selectDropdownElement= element(by.id('associateType'));
		selectDropdownElement.all(by.tagName('option'))
		  .then(function (options) {
			  options[0].click();
		  });
		browser.sleep('1000');
		
		var selectDropdownElement= element(by.id('associated_key'));
		selectDropdownElement.all(by.tagName('option'))
		  .then(function (options) {
			  options[0].click();
		  });
		browser.sleep('1000');
		
		element(by.id('saveGroupButton')).click();
		browser.sleep('3000');		
		
	});
	
	it(' Editing Group',  function (){
		
		//Edit the Location and will save the customer		
		element.all(by.css('.fa-pencil')).get(0).click();
		element(by.css('[name="groupName"]')).sendKeys('Test Group1234');		
		element(by.css('[name="email"]')).sendKeys('group@test12.com');
		element(by.id('saveGroupButton')).click();
		browser.sleep('3000');	
		
	});
	
	/*it(' deleting Location',  function (){	
		//Delete the Location and will add the customer
		element.all(by.css('.fa-trash')).get(0).click();
		browser.sleep('3000');
    });*/
	
   
});

