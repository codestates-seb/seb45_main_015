package com.project15.server.exception;

import lombok.Getter;

public class GlobalException extends RuntimeException {

    @Getter
    private ExceptionCode exceptionCode;

    public GlobalException(ExceptionCode exceptionCode){
        super(exceptionCode.toString());
        this.exceptionCode = exceptionCode;
    }
}
