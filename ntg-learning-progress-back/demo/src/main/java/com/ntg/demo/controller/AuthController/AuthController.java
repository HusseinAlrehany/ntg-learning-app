package com.ntg.demo.controller.AuthController;

import com.ntg.demo.ApiResponse.ApiResponse;
import com.ntg.demo.dto.AuthenticationResponse;
import com.ntg.demo.dto.SigninRequest;
import com.ntg.demo.dto.SignupRequest;
import com.ntg.demo.dto.UserDTO;
import com.ntg.demo.token.jwtservice.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {


    private final AuthenticationService authenticationService;

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> signIn(@RequestBody SigninRequest signinRequest, HttpServletResponse httpServletResponse){

        return ResponseEntity.ok(new ApiResponse<>("Sign in successful",
                authenticationService.signIn(signinRequest, httpServletResponse)));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserDTO>> signUp(@RequestBody SignupRequest signupRequest){

        return ResponseEntity.ok(new ApiResponse<>("Sign up successful",
                authenticationService.signup(signupRequest)));
    }


    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletResponse response){
        try{

            ResponseCookie deletedCookie = ResponseCookie.from("jwt", "")
                    .httpOnly(true)
                    .secure(false)
                    .sameSite("strict")
                    .path("/")
                    .maxAge(0)
                    .build();


            response.addHeader(HttpHeaders.SET_COOKIE, deletedCookie.toString());
            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Logout Success"));

        }catch(Exception ex){

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>("Logout Failed!!"));
        }
    }


}
