package com.elan.empApp.controller;

import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.elan.empApp.dto.UserDataViewDTO;
import com.elan.empApp.model.EmployeeDetailsLog;
import com.elan.empApp.model.User;
import com.elan.empApp.repository.EmployeeDetailsLogRepository;
import com.elan.empApp.repository.UserRepository;

@Controller
@RequestMapping("/rest/admin")
public class UserController extends AdminController{

	@Inject
	private UserRepository userRepository;
	
	@Inject
	EmployeeDetailsLogRepository employeeDetailsLogRepository;
    
    /**
     * This method is used to Create/update the user.
     */
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<User> createUser(@RequestBody User user) throws Exception {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		//Following condition to check password has been edited or not
		if (user.getId() != null) {
			User editedUser = userRepository.findOne(user.getId());
			
			if (!editedUser.getPassword().equals(user.getPassword())) {
				String hashedPassword = passwordEncoder.encode(user.getPassword());
				user.setPassword(hashedPassword);
			}
		} else {
			String hashedPassword = passwordEncoder.encode(user.getPassword());
			user.setPassword(hashedPassword);
		}
		user = userRepository.saveAndFlush(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
    
    /**
     * This method is used to delete the Employee
     */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) throws Exception {
		User user = userRepository.findOne(id);
		user.setSystemDelete(true);
		user = userRepository.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
    
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<User>> fetchUser() throws Exception {
		List<User> users = userRepository.findAllUsers();
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}
    
    /**
     * 
     * @param userEmail
     * @return Employee details after login
     * @throws Exception
     */
    @RequestMapping(value = "/listByEmail", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> fetchUserByUserEmail(String userEmail) throws Exception {
		User users = userRepository.findOneByEmail(userEmail);
		if (users != null) {
			//Saves Employee Logs
			EmployeeDetailsLog employeeDetailsLog = new EmployeeDetailsLog();
			
			employeeDetailsLog.setEmpID(users.getId());
			employeeDetailsLog.setCheckInTime(new Date());
			employeeDetailsLog.setStatus("Logged In");
			employeeDetailsLog.setRole(users.getRole());
			
			users.setCurrentStatus("Logged In");
			users.setUpdatedDate(new Date());
			userRepository.saveAndFlush(users);
			
			employeeDetailsLogRepository.save(employeeDetailsLog);
			
			return new ResponseEntity<User>(users, HttpStatus.OK);
		}
		return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
    
    /**
	 * This method is used to fetch data based on selected user under dashboard dropdown.
	 */
	@RequestMapping(value = "/fetchBySelectedCustomer", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> fetchUserBySelectedCustomer(String userEmail, Long customerIDs) throws Exception {
		User users = userRepository.findOneByEmail(userEmail);
		if (users != null) {

			UserDataViewDTO userDataViewDTO = new UserDataViewDTO();
			userDataViewDTO.setCustList(customerIDs.toString());
			USER_DATA.put(users.getEmail(), userDataViewDTO);
			return new ResponseEntity<User>(users, HttpStatus.OK);
		}
		return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}