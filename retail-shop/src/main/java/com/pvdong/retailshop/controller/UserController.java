package com.pvdong.retailshop.controller;

import com.pvdong.retailshop.dto.LoginRequest;
import com.pvdong.retailshop.dto.UserDto;
import com.pvdong.retailshop.entity.Item;
import com.pvdong.retailshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping(value = "/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody UserDto userDto) {
        userService.create(userDto);
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        return new ResponseEntity<>(userService.login(loginRequest), HttpStatus.OK);
    }

    @PostMapping("/buy/{itemId}/{quantity}")
    @ResponseStatus(HttpStatus.OK)
    public void buyItem(@PathVariable("itemId") long itemId, @PathVariable("quantity") long quantity) {
        userService.buy(itemId, quantity);
    }

    @GetMapping("/get-cart")
    @ResponseStatus(HttpStatus.OK)
    public List<Item> getCart() {
        return userService.getCart();
    }
}
