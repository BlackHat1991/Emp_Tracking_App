package com.elan.empApp.service;

import java.util.ArrayList;
import java.util.Collection;

import javax.inject.Inject;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elan.empApp.model.User;
import com.elan.empApp.repository.UserRepository;

/**
 * Authenticate a user from the database.
 */
@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Inject
    private UserRepository userRepository;

    @Transactional
    public UserDetails loadUserByUsername(String username) {
        User userFromDatabase = userRepository.findOneByEmail(username);
        if (userFromDatabase == null) {
            throw new UsernameNotFoundException("User " + username + " was not found in the database");
        }
        
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLE_USER");
        grantedAuthorities.add(grantedAuthority);
        
        return new org.springframework.security.core.userdetails.User(username,
        		userFromDatabase.getPassword(), grantedAuthorities);
    }
}
