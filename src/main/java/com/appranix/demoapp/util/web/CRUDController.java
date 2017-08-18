package com.appranix.demoapp.util.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

/**
 * Generic Controller to handle REST and common actions for Application.
 *
 * @param <T> Entity which is related to the operation.
 */
public class CRUDController<T> {

    /** Unsupported operation exception message. */
    private static final String UNSUPPORTED_OPERATION_EXCEPTION = "Not implemented";
    
    /**
     * Rest action to create an entity from json object.
     *
     * @param t - The generic entity to create
     * @return the entity in json based on the Accept headers
     * @throws Exception in case of any errors
     */
    @RequestMapping (method = RequestMethod.POST,
            produces = { MediaType.APPLICATION_JSON_VALUE },
            consumes = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public T create(@RequestBody T t) throws Exception {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_EXCEPTION);
    }


    /**
     * Rest action to update an entity from json object.
     *
     * @param id - Id of the entity to update
     * @param t  - The generic entity to update
     * @return the entity in json based on the Accept headers
     * @throws Exception if internal error occurs.
     */
    @RequestMapping (value = "/{id}", method = RequestMethod.PATCH,
            produces = { MediaType.APPLICATION_JSON_VALUE },
            consumes = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public T update(@RequestBody T t, @PathVariable("id") Long id) throws Exception {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_EXCEPTION);
    }

    /**
     * Rest action to delete Entity.
     *
     * @param id of entity
     * @throws Exception if internal error occurs.
     */
    @RequestMapping (value = "/{id}", method = RequestMethod.DELETE,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) throws Exception {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_EXCEPTION);
    }

    /**
     * Rest action to get Entity.
     *
     * @param id of the entity
     * @return the entity T
     * @throws Exception if internal error occurs.
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public T read(@PathVariable("id") Long id) throws Exception {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_EXCEPTION);
    }

    /**
     * Rest action to get list of Entities.
     *
     * @param sortBy
     *        example request param: sort(+name) - for Ascending order
     *                               sort(-name) - for Descending order
     * @param range
     *        example request header: Range: items=0-9
     * @param request to set
     * @param response to set
     * @return list
     *         example response header: Content-Range: items 0-9/4500
     * @throws Exception if any issue occurs
     */
    @RequestMapping(method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<T>  list(@RequestParam String sortBy, @RequestHeader(value = "Range") String range,
                        HttpServletRequest request, HttpServletResponse response) throws Exception {
        return null;
    }
}

