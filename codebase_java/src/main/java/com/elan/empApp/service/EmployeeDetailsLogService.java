package com.elan.empApp.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.elan.empApp.model.EmployeeDetailsLog;
import com.elan.empApp.model.User;

@Service("employeeDetailsLogService")
public class EmployeeDetailsLogService {
	
	@PersistenceContext
	private EntityManager entityManager;
	
	public EmployeeDetailsLog findByEmployeeID(User user){
			
			String hql="select c from EmployeeDetailsLog c where c.empID = :id order by id desc";
			
			Query query= entityManager.createQuery(hql);
			query.setParameter("id", user.getId()); 
			
			EmployeeDetailsLog  employeeDetailsLog = (EmployeeDetailsLog) query.getResultList().get(0);
		return employeeDetailsLog;
	}
	
	public List<EmployeeDetailsLog> fetchAllEmployeeLog(User user){
		
		String hql="select c from EmployeeDetailsLog c where c.empID = :id order by id desc";
		
		Query query= entityManager.createQuery(hql);
		query.setParameter("id", user.getId());
		
		return query.getResultList();
	}

}
