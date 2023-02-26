package com.pvdong.retailshop.controller;

import com.pvdong.retailshop.dto.ItemDto;
import com.pvdong.retailshop.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody ItemDto itemDto) {
        itemService.create(itemDto);
    }
}
