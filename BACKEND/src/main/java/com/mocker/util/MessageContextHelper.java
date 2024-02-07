package com.mocker.util;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@PropertySource("classpath:i18n/validation.message.properties")
public class MessageContextHelper {
    private static final Log LOG = LogFactory.getLog(MessageContextHelper.class);
    private static Environment environment;

    @Autowired
    public void inject(final Environment environment) {
        MessageContextHelper.environment = environment;
    }

    public static String getMessage(String key, String... args) {
        String message = environment.getProperty(key);
        if (message == null) {
            LOG.warn("Property '" + key + "' is not found");
        }
        return String.format(StringUtils.defaultString(message, StringUtils.EMPTY), (Object[]) args);
    }
}
