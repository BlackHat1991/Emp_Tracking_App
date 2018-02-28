package com.elan.empApp.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.elan.empApp.model.EmployeeDetailsLog;
import com.elan.empApp.model.User;
import com.elan.empApp.repository.EmployeeDetailsLogRepository;
import com.elan.empApp.repository.UserRepository;
import com.elan.empApp.service.EmployeeDetailsLogService;

@Controller
@RequestMapping("/rest/employeeLog")
public class EmployeeDetailsLogController extends AbstractController {
	
	@Inject
	EmployeeDetailsLogService employeeDetailsLogService;
	
	@Inject
	EmployeeDetailsLogRepository employeeDetailsLogRepository;
	
	@Inject
	private UserRepository userRepository;
	
	@RequestMapping(value = "/allLogs",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EmployeeDetailsLog>> allEmployee() throws Exception {
		List<EmployeeDetailsLog> employeeDetailsLogs = new ArrayList<EmployeeDetailsLog>();
		employeeDetailsLogs = employeeDetailsLogRepository.findAll();
		return new ResponseEntity<List<EmployeeDetailsLog>>(employeeDetailsLogs, HttpStatus.OK);
    }
	
	@RequestMapping(value = "/allEmpLogs",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EmployeeDetailsLog>> allEmployeeLogs(String userEmail) throws Exception {
		User users = userRepository.findOneByEmail(userEmail);
		List<EmployeeDetailsLog> employeeDetailsLogs = new ArrayList<EmployeeDetailsLog>();
		employeeDetailsLogs = employeeDetailsLogService.fetchAllEmployeeLog(users);
		return new ResponseEntity<List<EmployeeDetailsLog>>(employeeDetailsLogs, HttpStatus.OK);
    }
	
	@RequestMapping(value = "/update",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EmployeeDetailsLog> updateEmployeeLog(String userEmail) throws Exception {
		User users = userRepository.findOneByEmail(userEmail);
		EmployeeDetailsLog  employeeDetailsLog = null;
		if (users != null) {
			
			 employeeDetailsLog = employeeDetailsLogService.findByEmployeeID(users);
			 employeeDetailsLog.setCheckInOut(new Date());
			 employeeDetailsLog.setStatus("Logged Out");
			 
			 users.setUpdatedDate(new Date());
			 users.setCurrentStatus("Logged Out");
			 userRepository.saveAndFlush(users);
			 
			 employeeDetailsLogRepository.save(employeeDetailsLog);
			
		}
		
		return new ResponseEntity<EmployeeDetailsLog>(employeeDetailsLog, HttpStatus.OK);
    }

}
