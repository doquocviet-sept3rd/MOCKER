package com.mocker.domain.exception;

import com.mocker.domain.dto.ErrorDto;

public class NotFoundException extends AbstractException {
    public NotFoundException(String message, String additionalMessage, ErrorDto.CodeEnum codeEnum) {
        super(message, additionalMessage, codeEnum);
    }
}
