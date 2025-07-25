package com.example.trackride.Presentation.Controllers.User;

import static com.example.trackride.Presentation.Controllers.Shared.BaseApiController.API_BASE;

public abstract class UserBaseController {

    public static final String USER_API_BASE = API_BASE + "/users";
    public static final String USER_VEHICLE_API_BASE = USER_API_BASE + "/vehicles";
}
