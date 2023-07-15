package com.pvdong.retailshop.controller;

import com.pvdong.retailshop.dto.ItemDto;
import com.pvdong.retailshop.entity.Item;
import com.pvdong.retailshop.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody ItemDto itemDto) {
        itemService.create(itemDto);
    }

    @GetMapping("/get-item/{itemId}")
    @ResponseStatus(HttpStatus.OK)
    public Item getItem(@PathVariable("itemId") long itemId) {
        return itemService.getItem(itemId);
    }

    @GetMapping("/get-all")
    @ResponseStatus(HttpStatus.OK)
    public List<Item> getAllItem() {
        return itemService.getAllItem();
    }
}
