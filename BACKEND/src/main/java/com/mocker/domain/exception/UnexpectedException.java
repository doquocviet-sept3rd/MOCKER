package com.mocker.domain.exception;

import com.mocker.domain.dto.ErrorDto;

public class UnexpectedException extends AbstractException {

    public UnexpectedException(String message, String additionalMessage, ErrorDto.CodeEnum codeEnum) {
        super(message, additionalMessage, codeEnum);
    }
}
