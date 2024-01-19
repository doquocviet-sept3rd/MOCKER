package com.mocker.controller;

import com.mocker.api.UsersApi;
import com.mocker.domain.dto.UserDto;
import com.mocker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api")
public class UserController implements UsersApi {

    private final UserService userService;

    @Override
    public ResponseEntity<UserDto> getUser(UUID id) {
        return ResponseEntity.ok(new UserDto());
    }
}
