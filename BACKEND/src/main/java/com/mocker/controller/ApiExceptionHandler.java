package com.mocker.controller;

import com.mocker.domain.dto.ErrorDto;
import com.mocker.domain.exception.AuthenticationException;
import com.mocker.domain.exception.BadRequestException;
import com.mocker.domain.exception.NotFoundException;
import com.mocker.domain.exception.UnauthorizedException;
import com.mocker.util.MessageContextHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDto> defaultExceptionHandler(final Exception exception) {
        exception.printStackTrace();
        ErrorDto error = new ErrorDto();
        error.timestamp(Instant.now().toString());
        error.status(HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.message(HttpStatus.INTERNAL_SERVER_ERROR.name());
        error.code(ErrorDto.CodeEnum.UNEXPECTED_EXCEPTION);
        error.additionalMessage(exception.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorDto> authenticationExceptionHandler(final AuthenticationException authenticationException) {
        authenticationException.printStackTrace();
        ErrorDto error = new ErrorDto();
        error.timestamp(Instant.now().toString());
        error.status(HttpStatus.FORBIDDEN.value());
        error.message(MessageContextHelper.getMessage("authentication.exception"));
        error.setCode(ErrorDto.CodeEnum.AUTHENTICATION_EXCEPTION);
        error.additionalMessage("Authentication exception occurred");
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorDto> badRequestExceptionHandler(final BadRequestException badRequestException) {
        badRequestException.printStackTrace();
        ErrorDto error = new ErrorDto();
        error.timestamp(Instant.now().toString());
        error.status(HttpStatus.BAD_REQUEST.value());
        error.message(MessageContextHelper.getMessage("bad_request.exception"));
        error.setCode(ErrorDto.CodeEnum.BAD_REQUEST);
        error.additionalMessage("Bad request exception occurred");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorDto> notFoundExceptionHandler(final NotFoundException notFoundException) {
        notFoundException.printStackTrace();
        ErrorDto error = new ErrorDto();
        error.timestamp(Instant.now().toString());
        error.status(HttpStatus.NOT_FOUND.value());
        error.message(MessageContextHelper.getMessage("not_found.exception"));
        error.setCode(ErrorDto.CodeEnum.NOT_FOUND);
        error.additionalMessage("Not found exception occurred");
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorDto> unauthorizedExceptionHandler(final UnauthorizedException unauthorizedException) {
        unauthorizedException.printStackTrace();
        ErrorDto error = new ErrorDto();
        error.timestamp(Instant.now().toString());
        error.status(HttpStatus.UNAUTHORIZED.value());
        error.message(MessageContextHelper.getMessage("unauthorized.exception"));
        error.setCode(ErrorDto.CodeEnum.PERMISSION_EXCEPTION);
        error.additionalMessage("Unauthorized exception occurred");
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

}
