package com.appranix.demoapp.util.web;

/**
 * Generic controller for reusing constants, defining path etc..
 *
 */
public interface ApiController {

    //Generic constants
    /** Path ID.*/
    String PATH_ID = "id";

    /**
     *
     */
    String ACCOUNT_ID = "accountId";

    /**
     *
     */
    String PARTNER_ID = "partnerId";

    //Swagger constants
    /** Create.*/
    String SW_METHOD_CREATE = "create";

    /** Read.*/
    String SW_METHOD_READ = "read";

    /** Update.*/
    String SW_METHOD_UPDATE = "update";

    /** Delete.*/
    String SW_METHOD_DELETE = "delete";


    //Paging constants
    /** Create.*/
    String RANGE = "Range";

    //Application paths

    /** API path. */
    String API_PATH = "/api/v1";

    /** Authentication URL path. */
    String AUTHENTICATE_URL = API_PATH + "/auth/login";

    /** Logout URL path. */
    String LOGOUT_URL = API_PATH + "/auth/logout";

    // Spring Boot Actuator services path. username and password required in header .
    /**Environment endpoint. */
    String ENV_ENDPOINT = "/env";
    /** Metrics endpoint. */
    String METRICS_ENDPOINT = "/metrics";
    /** Health endpoint. */
    String HEALTH = "/health";

}
