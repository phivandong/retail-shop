package com.pvdong.retailshop.dto;

import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String password;
    private String role;
    private String firstName;
    private String lastName;
}
