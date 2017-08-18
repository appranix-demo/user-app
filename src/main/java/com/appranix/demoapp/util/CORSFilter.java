package com.appranix.demoapp.util;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * CORSFilter.
 */
@Component
public class CORSFilter implements Filter {

    /**
     * This method filters the request for the cross origin.
     * @param req request
     * @param res response.
     * @param chain chanins.
     * @throws IOException default exception
     * @throws ServletException servelet exception,
     */
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Origin, x-auth-token, x-requested-with, Content-Type, Accept, Range");
        chain.doFilter(req, res);
    }

    /**
     * init.
     * @param filterConfig filterConfig
     */
    @Override
    public void init(FilterConfig filterConfig) { }

    /**
     *  destroy destroy.
     */
    @Override
    public void destroy() { }

}
