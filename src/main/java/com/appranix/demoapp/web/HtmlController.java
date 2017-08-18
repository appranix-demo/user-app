package com.appranix.demoapp.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Controller
class HtmlController extends WebMvcConfigurerAdapter {
    
   @RequestMapping(value = "", method = RequestMethod.GET)
   public String index() {
	   return "ui/index.html";
   }
}
