package com.mocker.configuration.audit;

import com.mocker.configuration.security.ApplicationContextHolder;
import com.mocker.domain.model.entity.User;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ApplicationAuditorAware implements AuditorAware<String> {

    private final ApplicationContextHolder applicationContextHolder;

    @Override
    public @NonNull Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();
        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            return Optional.of("Administrator");
        }
        User currentUser = applicationContextHolder.getCurrentUser();
        Objects.requireNonNull(currentUser);
        return Optional.of(currentUser.getId().toString());
    }
}
