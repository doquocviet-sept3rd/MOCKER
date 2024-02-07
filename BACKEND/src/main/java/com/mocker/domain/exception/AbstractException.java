package com.mocker.domain.exception;

import com.mocker.domain.dto.ErrorDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AbstractException extends RuntimeException {
    private String message;
    private String additionalMessage;
    private ErrorDto.CodeEnum codeEnum;

    public AbstractException(String additionalMessage) {
        super(additionalMessage);
        this.additionalMessage = additionalMessage;
    }
}
