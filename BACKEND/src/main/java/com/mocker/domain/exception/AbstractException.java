package com.mocker.domain.exception;

import com.mocker.domain.dto.ErrorDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AbstractException extends RuntimeException {
    private String type;
    private String message;
    private ErrorDto.CodeEnum codeEnum;

    public AbstractException(String message, Throwable cause) {
        super(message, cause);
        this.message = message;
    }
}
