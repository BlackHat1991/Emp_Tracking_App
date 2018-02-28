package com.elan.empApp.controller;

import java.util.HashMap;
import java.util.Map;

import com.elan.empApp.dto.UserDataViewDTO;

public class AbstractController {
	protected static  Map<String, UserDataViewDTO> USER_DATA = new HashMap<String, UserDataViewDTO>();
	protected static  Map<String, UserDataViewDTO> USER_SpecificDATA = new HashMap<String, UserDataViewDTO>();

}
