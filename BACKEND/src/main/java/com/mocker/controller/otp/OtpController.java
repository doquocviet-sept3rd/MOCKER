package com.mocker.controller.otp;

import com.mocker.api.OtpApi;
import com.mocker.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class OtpController implements OtpApi {
    private final OtpService otpService;

    @Override
    public ResponseEntity<Void> register(String username) {
        otpService.register(username);
        return ResponseEntity.ok().build();
    }
}
