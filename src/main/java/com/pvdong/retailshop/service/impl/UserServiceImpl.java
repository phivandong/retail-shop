package com.pvdong.retailshop.service.impl;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.pvdong.retailshop.dto.UserDto;
import com.pvdong.retailshop.entity.Item;
import com.pvdong.retailshop.entity.User;
import com.pvdong.retailshop.repository.ItemRepository;
import com.pvdong.retailshop.repository.UserRepository;
import com.pvdong.retailshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    @Override
    public void create(UserDto userDto) {
        userRepository.save(User.mapToEntity(userDto));
    }

    @Override
    public void buy(long userId, long itemId) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        User user = userRepository.findById(userId).get();
        Item item = itemRepository.findById(itemId).get();
        List<Item> itemList = gson.fromJson(user.getCart(), List.class);
        if (itemList == null) {
            itemList = new ArrayList<>();
        }
        itemList.add(item);
        String newCart = gson.toJson(itemList);
        user.setCart(newCart);
        userRepository.save(user);
    }
}
