package com.pvdong.retailshop.service;

import com.pvdong.retailshop.dto.UserDto;
import com.pvdong.retailshop.entity.Item;

import java.util.List;

public interface UserService {
    void create(UserDto userDto);
    void buy(long userId, long itemId);
    List<Item> getCart(long userId);
}
