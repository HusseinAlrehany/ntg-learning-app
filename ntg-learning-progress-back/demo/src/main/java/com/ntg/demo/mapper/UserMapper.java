package com.ntg.demo.mapper;

import com.ntg.demo.dto.UserDTO;
import com.ntg.demo.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {


    public UserDTO toDTO(User user){

        if(user == null){
            throw new NullPointerException("User is Null");
        }
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        return userDTO;
    }

}
