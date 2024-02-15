package com.mocker.service;

import java.util.Map;

public interface EmailService {
    void sendEmail(String from, String to, String subject, String text, boolean html, Map<String, String> attachments);
}
