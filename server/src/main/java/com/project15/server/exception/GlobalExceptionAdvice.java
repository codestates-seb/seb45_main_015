package com.project15.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler(GlobalException.class)
    public ResponseEntity handleGlobalException(GlobalException globalException) {
        String errorMessage = globalException.getExceptionCode().getMessage();
        int errorStatusCode = globalException.getExceptionCode().getStatusNum();

        return new ResponseEntity<>(errorMessage, HttpStatus.valueOf(errorStatusCode));
    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity handleSQLIntegrityConstraintViolationException(Exception sqlIntegrityConstraintViolationException) {
//        String message = sqlIntegrityConstraintViolationException.getCause().getMessage();
//        //String sqlState = sqlIntegrityConstraintViolationException.getSQLState();
//        String localizedMessage = sqlIntegrityConstraintViolationException.getLocalizedMessage();
//        StackTraceElement[] a = sqlIntegrityConstraintViolationException.getStackTrace();
//
//        ErrorResponse errorResponse = new ErrorResponse();
//        errorResponse.setMessage(message);
//        //errorResponse.setSqlState(sqlState);
//        errorResponse.setLocalizedMessage(localizedMessage);
//        errorResponse.setStackTraceElements(a);
//
//        //return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(sqlIntegrityConstraintViolationException.getErrorCode()));
//        return new ResponseEntity<>(errorResponse, HttpStatus.OK);
//    }
}
