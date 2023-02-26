package com.pvdong.retailshop.entity;

import com.pvdong.retailshop.dto.ItemDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "item")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private double price;

    public Item(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public static Item mapToEntity(ItemDto itemDto) {
        return new Item(itemDto.getName(), itemDto.getPrice());
    }
}
