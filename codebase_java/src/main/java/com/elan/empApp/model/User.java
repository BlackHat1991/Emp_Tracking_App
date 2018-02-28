package com.elan.empApp.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "T_USER")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class User extends AbstractAuditingEntity implements Serializable {
	
	private static final long serialVersionUID = -7722544975069356302L;
    
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 5, max = 100)
    @Column(length = 100)
    private String password;

    @Size(max = 250)
    @Column(name = "first_name", length = 250)
    private String firstName;
    
    @Size(max = 250)
    @Column(name = "last_name", length = 250)
    private String lastName;

    @Size(max = 250)
    @Column(name = "email", length = 250)
    private String email;
    
    @Size(max = 250)
    @Column(name = "role", length = 250)
    private String role;
    
    @JsonIgnore
  	@Column(name = "SYSTEM_DELETE")
  	private Boolean systemDelete;
    
    @Size(max = 250)
    @Column(name = "CURRENT_STATUS", length = 250)
    private String currentStatus;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Boolean getSystemDelete() {
		return systemDelete;
	}

	public void setSystemDelete(Boolean systemDelete) {
		this.systemDelete = systemDelete;
	}

	public String getCurrentStatus() {
		return currentStatus;
	}

	public void setCurrentStatus(String currentStatus) {
		this.currentStatus = currentStatus;
	}
	
}
