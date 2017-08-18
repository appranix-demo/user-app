package com.appranix.demoapp.repository;

import org.springframework.data.repository.CrudRepository;

import com.appranix.demoapp.model.User;

/**
 * Created by Gowtham.
 */
public interface UserRepository extends CrudRepository<User, Long> {

    
}
