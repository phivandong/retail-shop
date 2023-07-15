package com.pvdong.retailshop.entity;

import com.pvdong.retailshop.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String role;
    private Date createAt;
    private String cart;

    public User(String username, String password, String role, String firstName, String lastName) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createAt = new Date();
    }

    public static User mapToEntity(UserDto userDto) {
        return new User(userDto.getUsername(), userDto.getPassword(), userDto.getRole(), userDto.getFirstName(), userDto.getLastName());
    }
}
