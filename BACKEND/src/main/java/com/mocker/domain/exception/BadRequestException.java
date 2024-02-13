package com.mocker.domain.exception;

import com.mocker.domain.dto.ErrorDto;

public class BadRequestException extends AbstractException {

    public BadRequestException(String type, String message, ErrorDto.CodeEnum codeEnum) {
        super(type, message, codeEnum);
    }

    public BadRequestException(String message) {
        super(message, null);
    }

}
