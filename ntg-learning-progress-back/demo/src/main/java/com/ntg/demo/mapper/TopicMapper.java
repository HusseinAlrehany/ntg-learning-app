package com.ntg.demo.mapper;

import com.ntg.demo.dto.TopicDTO;
import com.ntg.demo.dto.UpdateTopicRequest;
import com.ntg.demo.entity.Topic;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TopicMapper {

    public TopicDTO toDTO(Topic topic){
        if(topic == null){
            throw new NullPointerException("Topic is NULL");
        }

        TopicDTO topicDTO = new TopicDTO();
        topicDTO.setId(topic.getId());
        topicDTO.setName(topic.getName());
        topicDTO.setDescription(topic.getDescription());
        topicDTO.setCategoryId(topic.getCategory().getId());

        return topicDTO;
    }

    public Topic toEntity(TopicDTO topicDTO){
        if(topicDTO == null){
            throw new NullPointerException("TopicDTO is NULL");
        }

        Topic topic = new Topic();
        topic.setName(topicDTO.getName());
        topic.setDescription(topicDTO.getDescription());
        return topic;
    }

    public List<TopicDTO> toTopicDTOList(List<Topic> topicList){

        return topicList != null ? topicList.stream()
                .map(this::toDTO)
                .toList() : new ArrayList<>();

    }

    public Topic updateTopicFromDTO(Topic topic, UpdateTopicRequest updateTopicRequest){

        topic.setName(updateTopicRequest.getTopicName());

        return topic;
    }

}
