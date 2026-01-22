package com.ntg.demo.dto;

import com.ntg.demo.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {

    private Integer userId;
    private UserRole userRole;
    private String jwtToken;
}
