package com.pvdong.retailshop.controller;

import com.pvdong.retailshop.dto.UserDto;
import com.pvdong.retailshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody UserDto userDto) {
        userService.create(userDto);
    }

    @PostMapping("/buy/{userId}/{itemId}")
    @ResponseStatus(HttpStatus.OK)
    public void buyItem(@PathVariable("userId") long userId, @PathVariable("itemId") long itemId) {
        userService.buy(userId, itemId);
    }
}
