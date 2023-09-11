package com.example.ssafy301;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Ssafy301Application {

    public static void main(String[] args) {
        SpringApplication.run(Ssafy301Application.class, args);
    }

}
