package com.mocker.domain.exception;

import com.mocker.domain.dto.ErrorDto;

public class AuthenticationException extends AbstractException {

    public AuthenticationException(String message, String additionalMessage, ErrorDto.CodeEnum codeEnum) {
        super(message, additionalMessage, codeEnum);
    }


}
