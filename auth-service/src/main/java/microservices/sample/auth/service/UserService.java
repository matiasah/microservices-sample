/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.auth.service;

import microservices.sample.auth.config.UserServiceConfig;
import microservices.sample.auth.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author matia
 */
@FeignClient(name = "users-service", configuration = UserServiceConfig.class)
public interface UserService {
    
    @GetMapping("find-by-user-name")
    public User findByUsername(@RequestParam("username") String username);
    
}
