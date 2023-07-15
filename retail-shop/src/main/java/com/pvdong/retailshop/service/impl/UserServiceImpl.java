package com.pvdong.retailshop.service.impl;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.pvdong.retailshop.config.JwtTokenProvider;
import com.pvdong.retailshop.dto.LoginRequest;
import com.pvdong.retailshop.dto.UserDto;
import com.pvdong.retailshop.entity.Item;
import com.pvdong.retailshop.entity.User;
import com.pvdong.retailshop.repository.ItemRepository;
import com.pvdong.retailshop.repository.UserRepository;
import com.pvdong.retailshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void create(UserDto userDto) {
        if (userRepository.existsByUsername(userDto.getUsername())) {
            throw new RuntimeException("There is an account with that username: " + userDto.getUsername());
        }
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(User.mapToEntity(userDto));
    }

    @Override
    public String login(LoginRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            User user = userRepository.findByUsername(request.getUsername());
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                JSONObject jsonObject = new JSONObject();
                try {
                    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
                    if (authentication.isAuthenticated()) {
                        jsonObject.put("name", authentication.getName());
                        jsonObject.put("authorities", authentication.getAuthorities());
                        jsonObject.put("token", tokenProvider.createToken(request.getUsername(), userRepository.findByUsername(request.getUsername()).getRole()));
                        return jsonObject.toString();
                    }
                } catch (AuthenticationException e) {
                    throw new RuntimeException("Invalid username/password");
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            } else {
                throw new RuntimeException("Invalid password");
            }
        } else {
            throw new RuntimeException("Invalid username");
        }
        return null;
    }

    @Override
    public void buy(long itemId, long quantity) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        User user = userRepository.findByUsername(getCurrentUsername());
        Item item = itemRepository.findById(itemId).get();
        List<Item> itemList = gson.fromJson(user.getCart(), List.class);
        if (itemList == null) {
            itemList = new ArrayList<>();
        }
        for (int i = 0; i < quantity; i++) {
            itemList.add(item);
        }
        String newCart = gson.toJson(itemList);
        user.setCart(newCart);
        userRepository.save(user);
    }

    @Override
    public List<Item> getCart() {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        User user = userRepository.findByUsername(getCurrentUsername());
        return gson.fromJson(user.getCart(), List.class);
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            return authentication.getName();
        } else {
            throw new RuntimeException("No user");
        }
    }
}
