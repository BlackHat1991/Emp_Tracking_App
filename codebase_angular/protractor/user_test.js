describe('Login for user Tests', function () {
	
    it('Login TO RMC and Select Customer', function () {
		browser.waitForAngularEnabled(false);
        browser.get('http://localhost:3000/');
		
		browser.executeScript('document.querySelector(\'[id="demo"]\').style.display = "block"');
		browser.executeScript('document.querySelector(\'[id="demo1"]\').style.display = "none"');
		browser.sleep('3000');	
		element(by.id('username')).sendKeys('user1@testing.com');
		element(by.id('password')).sendKeys('123456');
		var loginId = element(by.id('loginButton'));
		loginId.click();
		browser.sleep('3000');
		
	});
	
	/*it(' Adding User', function () {
		//Adding the customer to the list
		element(by.cssContainingText('.btn-primary', 'Add User')).click();
		browser.sleep('1000');
		element(by.css('[name="firstName"]')).sendKeys('Tests');
		element(by.css('[name="lastName"]')).sendKeys('TestsCity');
		element(by.css('[name="email"]')).sendKeys('TestsAdress');
		element(by.css('[name="pwd"]')).sendKeys('India');
		
		var selectDropdownElement= element(by.id('userRoles'));
		selectDropdownElement.all(by.tagName('option'))
		  .then(function (options) {
			  options[2].click();
		  });
		  
		browser.sleep('1000');
		element(by.id('saveUserButton')).click();
		browser.sleep('1000');		
	});	*/
		
	/*it(' Edit User', function () {
		//Edit the customer and will save the customer		
		//element.all(by.css('.fa-pencil')).get(0).click();
		browser.sleep('1000');	
		var fn = 'warner';
		var test = element.all(by.id('userLists')).all(by.id('fn'));
		var c = test.getSize();
		 console.log(c.getText());
		 //expect(organizations.get(0).getText()).toEqual('Bill');
		 console.log('outside');
		 element.all(by.id('userLists')).all(by.id('fn')).then(function(organizations) {
			  console.log('inside');
		  var total = organizations.count();
		  console.log(total);
		  for(var i  = 0 ; i <= total ; i++){
			  if(organizations.get(i).getText() == fn){
				  console.log(i+ '\n');
				   element.all(by.css('.fa-pencil')).get(i).click();
			  }
		  }	  
		});
		 
		 
		//element(by.css('[name="name"]')).sendKeys('Tests1234');
		//element(by.css('[name="customerCity"]')).sendKeys('TestsCity123');
		//element(by.id('saveUserButton	')).click();
		browser.sleep('1000');	
	});*/
	
	/*it(' Deleting User', function () {
		//Delete the customer and will add the customer
		element.all(by.css('.fa-trash')).get(0).click();
		browser.sleep('10000');
    });*/
   
});

