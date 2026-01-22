package com.ntg.demo.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {

    private Integer httpStatus;
    private String message;
    private LocalDateTime timeStamp;
}
