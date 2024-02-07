package com.mocker.configuration.security;

import com.mocker.domain.model.entity.User;
import com.mocker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Component;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@Component
@RequiredArgsConstructor
public class ApplicationContextHolder {

    private final Log LOG = LogFactory.getLog(ApplicationContextHolder.class);
    private final UserRepository userRepository;

    public User getCurrentUser() {
        String username = getContext().getAuthentication().getPrincipal().toString();
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            LOG.warn("The current user is not found, make sure that the flow should be in auth apis");
        }
        return user;
    }

}
