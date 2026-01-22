package com.ntg.demo.ApiResponse;

public record ApiResponse<T>(String message, T payload) {

   public ApiResponse(String message){
        this(message, null);
    }
}
