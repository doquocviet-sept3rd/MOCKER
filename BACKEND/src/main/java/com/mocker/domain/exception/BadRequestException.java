package com.mocker.domain.exception;

import com.mocker.domain.dto.ErrorDto;

public class BadRequestException extends AbstractException {

    public BadRequestException(String message, String additionalMessage, ErrorDto.CodeEnum codeEnum) {
        super(message, additionalMessage, codeEnum);
    }

    public BadRequestException(String additionalMessage) {
        super(additionalMessage);
    }

}
