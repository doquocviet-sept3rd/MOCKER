package com.mocker.service.impl;

import com.mocker.domain.exception.UnexpectedException;
import com.mocker.service.EmailService;
import com.mocker.util.MessageContextHelper;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;

    @Override
    public void sendEmail(String from, String to, String subject, String text, boolean html, Map<String, String> attachments) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, html);
            if (attachments != null) {
                for (Map.Entry<String, String> entry : attachments.entrySet()) {
                    helper.addAttachment(entry.getKey(), new FileSystemResource(new File(entry.getValue())));
                }
            }
            javaMailSender.send(message);
        } catch (Exception exception) {
            throw new UnexpectedException(MessageContextHelper.getMessage("email.send_error", to), exception);
        }
    }
}
