package com.pvdong.retailshop.service.impl;

import com.pvdong.retailshop.dto.ItemDto;
import com.pvdong.retailshop.entity.Item;
import com.pvdong.retailshop.repository.ItemRepository;
import com.pvdong.retailshop.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;

    @Override
    public void create(ItemDto itemDto) {
        itemRepository.save(Item.mapToEntity(itemDto));
    }

    @Override
    public Item getItem(long itemId) {
        return itemRepository.findById(itemId).get();
    }

    @Override
    public List<Item> getAllItem() {
        return itemRepository.findAll();
    }
}
