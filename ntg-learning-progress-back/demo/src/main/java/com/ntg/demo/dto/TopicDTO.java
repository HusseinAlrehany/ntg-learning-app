package com.ntg.demo.dto;

import lombok.Data;

@Data
public class TopicDTO {

    private Integer id;
    private String name;
    private String description;
    private Integer categoryId;
}
