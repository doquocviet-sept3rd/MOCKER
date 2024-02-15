package com.mocker.service.impl;

import com.mocker.domain.exception.BadRequestException;
import com.mocker.domain.model.entity.Otp;
import com.mocker.repository.OtpRepository;
import com.mocker.service.EmailService;
import com.mocker.service.OtpService;
import com.mocker.util.MessageContextHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

import static com.mocker.configuration.email.EmailConfiguration.template;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {
    private final OtpRepository otpRepository;
    private final EmailService emailService;

    @Override
    public void register(String username) {

        // generate otp code
        final String otpCode = String.format("%06d", new Random().nextInt(0, 999999));

        // send otp code
        sendOtpCode(username, otpCode);

        // TODO store otp code and add scheduled task to set expired to true after 5 minutes
        Otp otp = otpRepository.findById(username).orElse(null);
        if (otp != null) {
            otp.setCode(otpCode);
            otpRepository.save(otp);
        } else {
            otpRepository.save(Otp.builder().username(username).code(otpCode).build());
        }
    }

    @Override
    public void verify(String username, String otpCode) {
        // validate otp code
        Otp otp = otpRepository.findById(username).orElseThrow(() ->
                new BadRequestException(MessageContextHelper.getMessage("otp.verify.not_found", username)));
        if (otp.isExpired()) {
            throw new BadRequestException(MessageContextHelper.getMessage("otp.verify.expired"));
        }
        if (!otp.getCode().equals(otpCode)) {
            throw new BadRequestException(MessageContextHelper.getMessage("otp.verify.invalid"));
        }
    }

    void sendOtpCode(String to, String otpCode) {
        final String from = "no-reply@mocker.com";
        final String subject = "Mocker: Complete registration";
        String text = template().replace("{{ otpCode }}", otpCode);
        emailService.sendEmail(from, to, subject, text, true, null);
    }

}
