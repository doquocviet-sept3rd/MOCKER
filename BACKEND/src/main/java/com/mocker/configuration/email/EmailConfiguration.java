package com.mocker.configuration.email;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class EmailConfiguration {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("contact.mocker@gmail.com");
        mailSender.setPassword("knsk cpoh gzvl offy");
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");
        return mailSender;
    }

    public static String template() {
        return """
                <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                  <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">MOCKER</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing MOCKER. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{{ otpCode }}</h2>
                    <p style="font-size:0.9em;">Regards,<br />MOCKER</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                      <p>MOCKER Inc</p>
                      <p>Thu Duc city, Ho Chi Minh city</p>
                      <p>Vietnam</p>
                    </div>
                  </div>
                </div>
                """;
    }

}
