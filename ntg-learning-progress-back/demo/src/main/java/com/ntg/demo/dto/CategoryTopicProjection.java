package com.ntg.demo.dto;

import com.ntg.demo.enums.Status;

public interface CategoryTopicProjection {

    Integer getCategoryId();
    String getCategoryName();
    Integer getTopicId();
    String getTopicName();
    String getTopicDescription();
    String getTopicStatus();

}
