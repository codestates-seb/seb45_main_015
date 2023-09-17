package com.project15.server.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {

    private String message;
    private String sqlState;
    private String localizedMessage;

    private StackTraceElement[] stackTraceElements;
}
