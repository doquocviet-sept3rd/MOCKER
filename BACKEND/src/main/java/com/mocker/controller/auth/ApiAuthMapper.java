package com.mocker.controller.auth;

import com.mocker.domain.dto.AuthRequestDto;
import com.mocker.domain.dto.AuthResponseDto;
import com.mocker.domain.model.AuthRequest;
import com.mocker.domain.model.AuthResponse;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
@DecoratedWith(ApiAuthMapperDecorator.class)
public interface ApiAuthMapper {

    AuthRequest map(AuthRequestDto authRequestDto);

    AuthResponseDto map(AuthResponse authResponse);

}
