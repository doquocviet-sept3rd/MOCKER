package com.mocker.domain.exception;

import com.mocker.domain.dto.ErrorDto;

public class UnauthorizedException extends AbstractException {
    public UnauthorizedException(String message, String additionalMessage, ErrorDto.CodeEnum codeEnum) {
        super(message, additionalMessage, codeEnum);
    }
}
