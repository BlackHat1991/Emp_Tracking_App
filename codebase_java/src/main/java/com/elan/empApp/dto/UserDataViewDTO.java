package com.elan.empApp.dto;

import java.io.Serializable;

public class UserDataViewDTO implements Serializable {
	private static final long serialVersionUID = -7722544975069356302L;
	
	String custList;
	
	public String getCustList() {
		return custList;
	}
	public void setCustList(String custList) {
		this.custList = custList;
	}
}
