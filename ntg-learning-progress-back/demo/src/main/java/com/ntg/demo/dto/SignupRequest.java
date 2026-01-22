package com.ntg.demo.dto;

import com.ntg.demo.enums.UserRole;
import lombok.Data;

@Data
public class SignupRequest {

    private String name;
    private String email;
    private String password;
    private UserRole role;

}
