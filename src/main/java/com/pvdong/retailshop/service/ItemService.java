package com.pvdong.retailshop.service;

import com.pvdong.retailshop.dto.ItemDto;
import com.pvdong.retailshop.entity.Item;

public interface ItemService {
    void create(ItemDto itemDto);
    Item getItem(long itemId);
}
