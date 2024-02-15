package com.mocker.service;

import java.util.UUID;

public interface OtpService {

    void register(String username);

    void verify(String username, String otpCode);
}
