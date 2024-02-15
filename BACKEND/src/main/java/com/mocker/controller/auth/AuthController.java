package com.mocker.controller.auth;

import com.mocker.api.AuthApi;
import com.mocker.domain.dto.AuthRequestDto;
import com.mocker.domain.dto.AuthResponseDto;
import com.mocker.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AuthController implements AuthApi {

    private final ApiAuthMapper apiAuthMapper;
    private final AuthService authService;

    @Override
    public ResponseEntity<AuthResponseDto> register(AuthRequestDto authRequestDto) {
        return ResponseEntity.ok(apiAuthMapper.map(authService.register(apiAuthMapper.map(authRequestDto))));
    }

    @Override
    public ResponseEntity<AuthResponseDto> authenticate(AuthRequestDto authRequestDto) {
        return ResponseEntity.ok(apiAuthMapper.map(authService.authenticate(apiAuthMapper.map(authRequestDto))));
    }

    @Override
    public ResponseEntity<Void> verify(String username) {
        authService.verify(username);
        return ResponseEntity.ok().build();
    }

}
