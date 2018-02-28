package com.elan.empApp.configuration;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Inject
    private UserDetailsService userDetailsService;
	@Inject
	private AjaxAuthenticationSuccessHandler ajaxAuthenticationSuccessHandler;
	@Inject
	private AjaxAuthenticationFailureHandler ajaxAuthenticationFailureHandler;
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
    @Inject
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    	// @formatter:off
        	auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        // @formatter:on
    }
    
    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        webSecurity.ignoring().antMatchers("/static/**");
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	// @formatter:off
    	http.csrf().disable();
    	
    	/*http
        .authorizeRequests()
        .anyRequest().permitAll();
    	// @formatter:on
    	*/
    	http.formLogin()
    	.loginProcessingUrl("/j_spring_security_check")
        .successHandler(ajaxAuthenticationSuccessHandler)
        .failureHandler(ajaxAuthenticationFailureHandler)
        .usernameParameter("username")
        .passwordParameter("password")
        .permitAll()
        .and()
    .logout()
        .logoutUrl("/api/logout")
        .deleteCookies("JSESSIONID")
        .permitAll()
    .and()
        .headers()
        .frameOptions()
        .disable()
        .authorizeRequests();
    }
    
   
    @EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true)
    private static class GlobalSecurityConfiguration extends GlobalMethodSecurityConfiguration {
    }
}
