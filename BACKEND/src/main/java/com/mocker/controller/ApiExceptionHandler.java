package com.mocker.controller;

import com.mocker.domain.dto.ErrorDto;
import com.mocker.domain.exception.AuthenticationException;
import com.mocker.domain.exception.BadRequestException;
import com.mocker.domain.exception.NotFoundException;
import com.mocker.domain.exception.UnauthorizedException;
import com.mocker.util.MessageContextHelper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class ApiExceptionHandler {
    private static final Log LOG = LogFactory.getLog(ApiExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDto> defaultExceptionHandler(final Exception exception) {
        printStackTrace(exception);
        ErrorDto error = new ErrorDto();
        error.timestamp(Instant.now().toString());
        error.status(HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.type(HttpStatus.INTERNAL_SERVER_ERROR.name());
        error.code(ErrorDto.CodeEnum.UNEXPECTED_EXCEPTION);
        error.message(exception.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorDto> authenticationExceptionHandler(final AuthenticationException authenticationException) {
        printStackTrace(authenticationException);
        ErrorDto error = new ErrorDto();
        error.timestamp(Instant.now().toString());
        error.status(HttpStatus.FORBIDDEN.value());
        error.type(MessageContextHelper.getMessage("authentication.exception"));
        error.setCode(ErrorDto.CodeEnum.AUTHENTICATION_EXCEPTION);
        error.message(authenticationException.getMessage());
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorDto> badRequestExceptionHandler(final BadRequestException badRequestException) {
        printStackTrace(badRequestException);
        ErrorDto error = new ErrorDto();
        error.timestamp(Instant.now().toString());
        error.status(HttpStatus.BAD_REQUEST.value());
        error.type(MessageContextHelper.getMessage("bad_request.exception"));
        error.setCode(ErrorDto.CodeEnum.BAD_REQUEST);
        error.message(badRequestException.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorDto> notFoundExceptionHandler(final NotFoundException notFoundException) {
        printStackTrace(notFoundException);
        ErrorDto error = new ErrorDto();
        error.timestamp(Instant.now().toString());
        error.status(HttpStatus.NOT_FOUND.value());
        error.type(MessageContextHelper.getMessage("not_found.exception"));
        error.setCode(ErrorDto.CodeEnum.NOT_FOUND);
        error.message(notFoundException.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorDto> unauthorizedExceptionHandler(final UnauthorizedException unauthorizedException) {
        printStackTrace(unauthorizedException);
        ErrorDto error = new ErrorDto();
        error.timestamp(Instant.now().toString());
        error.status(HttpStatus.UNAUTHORIZED.value());
        error.type(MessageContextHelper.getMessage("unauthorized.exception"));
        error.setCode(ErrorDto.CodeEnum.PERMISSION_EXCEPTION);
        error.message(unauthorizedException.getMessage());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @SuppressWarnings("all")
    private void printStackTrace(Exception exception) {
        exception.printStackTrace();
    }

}
