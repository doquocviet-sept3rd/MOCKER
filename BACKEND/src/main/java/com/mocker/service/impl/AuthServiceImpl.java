package com.mocker.service.impl;

import com.mocker.configuration.security.authentication.UserDetail;
import com.mocker.configuration.security.jwt.JwtService;
import com.mocker.domain.exception.BadRequestException;
import com.mocker.domain.model.AuthRequest;
import com.mocker.domain.model.AuthResponse;
import com.mocker.domain.model.entity.User;
import com.mocker.repository.UserRepository;
import com.mocker.service.AuthService;
import com.mocker.service.OtpService;
import com.mocker.util.MessageContextHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final OtpService otpService;

    @Override
    public AuthResponse register(AuthRequest authRequest) {
        final String username = authRequest.getUsername();
        otpService.verify(username, authRequest.getOtpCode());
        final User user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(authRequest.getPassword()))
                .build();
        userRepository.save(user);
        final String jwtToken = jwtService.generateToken(UserDetail.of(user));
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public AuthResponse authenticate(AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authRequest.getUsername(),
                    authRequest.getPassword()
            ));
        } catch (BadCredentialsException badCredentialsException) {
            throw new BadRequestException("The username or password are incorrect");
        }
        final User user = userRepository.findByUsername(authRequest.getUsername()).orElseThrow();
        final String jwtToken = jwtService.generateToken(UserDetail.of(user));
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public void verify(String username) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new BadRequestException(MessageContextHelper.getMessage("auth.username_exists", username));
        }
    }
}
