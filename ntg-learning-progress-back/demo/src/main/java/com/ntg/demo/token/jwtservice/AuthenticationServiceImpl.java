package com.ntg.demo.token.jwtservice;

import com.ntg.demo.dto.*;
import com.ntg.demo.entity.User;
import com.ntg.demo.enums.UserRole;
import com.ntg.demo.exception.InvalidUserNameOrPasswordException;
import com.ntg.demo.exception.UserAlreadyExistsException;
import com.ntg.demo.mapper.UserMapper;
import com.ntg.demo.repository.UserRepository;
import com.ntg.demo.token.utils.JwtUtils;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService{

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final UserMapper userMapper;

    //configured in env variables in the project
    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    @Value("${admin.name}")
    private String adminName;


    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @PostConstruct
    public void createAdmin(){

        User adminUser = userRepository.findByRole(UserRole.ADMIN);
        if(adminUser == null){
            User admin = new User();
            admin.setName(adminName);
            admin.setEmail(adminEmail);
            admin.setRole(UserRole.ADMIN);
            admin.setPassword(new BCryptPasswordEncoder().encode(adminPassword));

            userRepository.save(admin);
            log.info("Admin user created successfully");
        }
    }

    @Override
    public UserDTO signup(SignupRequest signupRequest) {

        if(hasUserWithEmail(signupRequest.getEmail())){
            throw new UserAlreadyExistsException("User already exists with this email");
        }

        User user = new User();
        user.setRole(UserRole.DEVELOPER);
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));

        return userMapper.toDTO(userRepository.save(user));
    }

    @Override
    public AuthenticationResponse signIn(SigninRequest signInRequest, HttpServletResponse httpServletResponse) {

        //check if this user is authenticated(have email, password in database)
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    signInRequest.getEmail(),
                    signInRequest.getPassword()
            ));
        }catch(BadCredentialsException bce){
            throw new InvalidUserNameOrPasswordException("Invalid username or password");
        }

        final UserDetails userDetails = appUserDetailsService.loadUserByUsername(
                signInRequest.getEmail());
        final String jwtToken = jwtUtils.generateToken(userDetails);

        Optional<User> optionalUser = userRepository.findFirstByEmail(signInRequest.getEmail());

        //check if the logged in user(if he is a doctor) is actually a registered doctor
        if(optionalUser.isEmpty()){
            throw new UsernameNotFoundException("No User Found with that email");
        }

        //store the jwt in http only cookie
        //because httpOnlyCookie can not be read via (javascript, so it is XSS safe)
        //also it send only with http request to the backend
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", jwtToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("strict")
                .path("/")
                .maxAge(24 * 60 * 60)
                .build();

        httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());
        AuthenticationResponse response = new AuthenticationResponse();
        response.setJwtToken(jwtToken);
        response.setUserId(optionalUser.get().getId());
        response.setUserRole(optionalUser.get().getRole());

        return response;

    }
}
