package com.example.trackride.Presentation.Controllers.Shared;

import lombok.Builder;

@Builder
public record StandardResponse<T>(T data, String message) {
}
