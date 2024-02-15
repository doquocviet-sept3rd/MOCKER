package com.mocker.domain.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@SuperBuilder(toBuilder = true)
public class Otp extends Base implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(updatable = false)
    private String username;

    @Column(length = 6, nullable = false)
    private String code;

    @Column
    private boolean expired;

}
