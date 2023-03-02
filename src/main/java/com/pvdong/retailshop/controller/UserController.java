package com.pvdong.retailshop.controller;

import com.pvdong.retailshop.dto.LoginRequest;
import com.pvdong.retailshop.dto.UserDto;
import com.pvdong.retailshop.entity.Item;
import com.pvdong.retailshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public String login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest);
    }

    @PostMapping("/buy/{itemId}")
    @ResponseStatus(HttpStatus.OK)
    public void buyItem(@PathVariable("itemId") long itemId) {
        userService.buy(itemId);
    }

    @GetMapping("/get-cart")
    @ResponseStatus(HttpStatus.OK)
    public List<Item> getCart() {
        return userService.getCart();
    }
}
