package com.pvdong.retailshop.service;

import com.pvdong.retailshop.dto.UserDto;

public interface UserService {
    void create(UserDto userDto);
    void buy(long userId, long itemId);
}
