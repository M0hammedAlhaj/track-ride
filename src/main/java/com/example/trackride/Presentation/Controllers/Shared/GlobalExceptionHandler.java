package com.example.trackride.Presentation.Controllers.Shared;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, Object> response = new HashMap<>();

        Map<String, String> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        fieldError ->
                                Optional.ofNullable(fieldError.getDefaultMessage()).orElse("Invalid value"),
                        (existing, replacement) -> existing
                ));

        List<String> objectErrors = ex.getBindingResult().getGlobalErrors().stream()
                .map(error ->
                        Optional.ofNullable(error.getDefaultMessage()).orElse("Invalid request"))
                .collect(Collectors.toList());

        response.put("message", "Validation failed");
        response.put("fieldErrors", fieldErrors);
        response.put("objectErrors", objectErrors);

        return ResponseEntity.badRequest().body(response);
    }
}



