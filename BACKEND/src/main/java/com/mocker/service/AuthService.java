package com.mocker.service;

import com.mocker.domain.model.AuthRequest;
import com.mocker.domain.model.AuthResponse;

public interface AuthService {
    AuthResponse register(AuthRequest authRequest);
    AuthResponse authenticate(AuthRequest authRequest);
}
