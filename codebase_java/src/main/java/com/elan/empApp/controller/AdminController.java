package com.elan.empApp.controller;

import javax.servlet.http.HttpSession;

public class AdminController extends AbstractController {
	
	public boolean validateSession(String userSessionId, HttpSession httpSession) throws Exception{
		if(userSessionId.equals(httpSession.getId())){
			return true;
		}else{
			httpSession.invalidate();
			throw new Exception("Session Expired");
		}
	}
}
