package com.appranix.demoapp.service;

import com.appranix.demoapp.model.User;
import com.appranix.demoapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Gowtham.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * The default constructor.
     */
    public UserServiceImpl() {
        super();
    }

    /**
     * The constructor with parameter.
     *
     * @param userRepository the userRepository
     */
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Iterable<User> findAll() throws Exception {
        return userRepository.findAll();
    }

    @Override
    public User find(Long id) throws Exception {
        return userRepository.findOne(id);
    }

    @Override
    public User create(User user) throws Exception {
        
        return userRepository.save(user);
    }

    @Override
    public User update(User user) throws Exception {
        return userRepository.save(user);
    }

    @Override
    public void delete(User user) throws Exception {
        userRepository.delete(user);
    }

	@Override
	public void delete(Long id) throws Exception {
		userRepository.delete(id);
		
	}
}
