package com.pvdong.retailshop.service;

import com.pvdong.retailshop.dto.LoginRequest;
import com.pvdong.retailshop.dto.UserDto;
import com.pvdong.retailshop.entity.Item;

import java.util.List;

public interface UserService {
    void create(UserDto userDto);
    String login(LoginRequest request);
    void buy(long itemId, long quantity);
    List<Item> getCart();
}
