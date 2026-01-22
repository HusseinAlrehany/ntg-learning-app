package com.ntg.demo.token.jwtservice;


import com.ntg.demo.dto.AuthenticationResponse;
import com.ntg.demo.dto.SigninRequest;
import com.ntg.demo.dto.SignupRequest;
import com.ntg.demo.dto.UserDTO;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticationService {

    boolean hasUserWithEmail(String email);

    UserDTO signup(SignupRequest patientSignupRequest);


    AuthenticationResponse signIn(SigninRequest signInRequest, HttpServletResponse httpServletResponse);

}
