package com.example.ssafy301.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class configure implements WebMvcConfigurer {

    @Configuration
    public class WebConfig implements WebMvcConfigurer {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000","http://localhost:8080","http://j9a301.p.ssafy.io:3000","http://j9a301.p.ssafy.io:8080")
                    .allowedMethods("PUT", "DELETE","POST","GET")
                    .allowCredentials(false).maxAge(3600);
        }
    }
}
