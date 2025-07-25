package com.example.trackride.Infrastructures.Security.Config;


import com.example.trackride.Infrastructures.Security.Filter.JwtFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
@AllArgsConstructor
public class SecurityConfig {


    private final JwtFilter jwtFilter;

    private final CorsConfig corsConfig;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/users/assign-vehicle").authenticated()
                        .requestMatchers("/api/v1/users/assign-maintenance").authenticated()
                        .requestMatchers("/api/v1/users/vehicles/*").authenticated()
                        .requestMatchers("/api/v1/users/last-Maintenance").authenticated()
                        .requestMatchers("/api/v1/vehicles/*").authenticated()
                        .requestMatchers("/api/v1/maintenance-records/*").authenticated()
                        .requestMatchers("/api/v1/users/maintenance-records/*").authenticated()
                        .anyRequest().permitAll()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
