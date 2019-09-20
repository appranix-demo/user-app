package com.appranix.demoapp.web;

import com.appranix.demoapp.model.User;
import com.appranix.demoapp.service.UserService;
import com.appranix.demoapp.util.web.ApiController;

import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * User Controller for getting account and partner users.
 */
@RestController
@RequestMapping("/api/v1/user")
@Component
public class UserController implements ApiController {

    /**
     * Auto wired accountUserService.
     */
    @Autowired
    private UserService userService;

    /**
     * This method is used to return the user list.
     *
     * @return the user list.
     * @throws Exception default exception.
     */
    @RequestMapping(value = "", method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    public Iterable<User> listAll() throws Exception {
    	return userService.findAll();
    }

    /**
     * This method is used to return the user by ID.
     *
     * @param id the partner ID.
     * @return the partner.
     * @throws Exception default exception.
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public User read(@PathVariable(PATH_ID) Long id) throws Exception {
        return userService.find(id);
    }

    /**
     * This method is used to create new partner.
     *
     * @param response httpResponse
     * @param partner the partner request object.
     * @param currentUser current User
     * @return the success/ failure message.
     * @throws Exception default exception.
     */
    @RequestMapping(method = RequestMethod.POST,
            produces = {MediaType.APPLICATION_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public User create(HttpServletResponse response, @RequestBody User user) throws Exception {
        try {
        	return userService.create(user);
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        }
        return null;
    }

    /**
     * This method is used to delete the user.
     *
     * @param id the partner ID.
     * @throws Exception the default exception
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE,
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable(PATH_ID) Long id) throws Exception {
    	userService.delete(id);
    }

}
