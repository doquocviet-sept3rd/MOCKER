package com.mocker.controller.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public abstract class ApiAuthMapperDecorator implements ApiAuthMapper {

    @Autowired
    @Qualifier("delegate")
    private ApiAuthMapper delegate;
}
