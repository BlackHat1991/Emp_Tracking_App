package com.elan.empApp.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "T_EMPLOYEE_LOG")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EmployeeDetailsLog extends AbstractAuditingEntity implements Serializable {
	
private static final long serialVersionUID = -7722544975069356302L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "EMP_ID", length = 250)
	private Long empID;
	
	@Column(name = "CHECK_IN")
    private Date checkInTime;
	
	@Column(name = "CHECK_OUT")
    private Date checkInOut;
	
	@Column(name = "STATUS", length = 250)
    private String status;
	
	@Column(name = "ROLE", length = 250)
    private String role;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getEmpID() {
		return empID;
	}

	public void setEmpID(Long empID) {
		this.empID = empID;
	}

	public Date getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(Date checkInTime) {
		this.checkInTime = checkInTime;
	}

	public Date getCheckInOut() {
		return checkInOut;
	}

	public void setCheckInOut(Date checkInOut) {
		this.checkInOut = checkInOut;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
