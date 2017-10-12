package com.appranix.demoapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableAutoConfiguration
@SpringBootApplication
@ComponentScan
@EnableConfigurationProperties
@EnableJpaRepositories("com.appranix.demoapp.repository")
@EnableTransactionManagement
public class DemoappApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = null;
        try {
            context = SpringApplication.run(DemoappApplication.class, args);
        } finally {
            if (context != null) {
                context.close();
            }
        }
    }
}
