package com.example.trackride.Infrastructures.Security.Filter;

import com.example.trackride.Core.User.Exception.Auth.UserAccessException;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Infrastructures.Jwt.JwtExtracting;
import com.example.trackride.Infrastructures.Jwt.Validation.JwtValidationChain;
import com.example.trackride.Infrastructures.Jwt.Validation.JwtValidationContext;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtExtracting jwtExtracting;
    private final JwtValidationChain jwtValidation;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String headerAuthorization = request.getHeader("Authorization");
            String token = null;
            String id = null;

            if (headerAuthorization != null && headerAuthorization.startsWith("Bearer ")) {
                token = headerAuthorization.substring(7);
                id = jwtExtracting.extractId(token);
            }

            if (id != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserAuthentication userDetails = userRepository.findById(UUID.fromString(id))
                        .map(UserAuthentication::new)
                        .orElseThrow(() -> new UserAccessException("User doesn't have access"));

                jwtValidation.validate(new JwtValidationContext(token, id));

                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }

            filterChain.doFilter(request, response);

        } catch (io.jsonwebtoken.ExpiredJwtException |
                 io.jsonwebtoken.security.SignatureException |
                 io.jsonwebtoken.MalformedJwtException ex) {

            sendUnauthorizedResponse(response, "Invalid or tampered JWT token");

        } catch (UserAccessException ex) {
            sendUnauthorizedResponse(response, ex.getMessage());
        }
    }
    private void sendUnauthorizedResponse(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"message\":\"" + message + "\"}");
    }
}
