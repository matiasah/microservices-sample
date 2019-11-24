/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import microservices.sample.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import microservices.sample.repository.UserRepository;

/**
 *
 * @author matia
 */
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public Iterable<User> index() {
        return this.userRepository.findAll();
    }

    @GetMapping("{id}")
    public User get(@PathVariable("id") User user) {
        return user;
    }

    @PostMapping
    public User store(@RequestBody User user) {
        // If the user sends a password
        if (user.getPassword() != null) {
            // Encrypt password
            user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        }

        return this.userRepository.save(user);
    }

    @PatchMapping("{id}")
    public User update(@PathVariable("id") User user, HttpServletRequest request) throws IOException {
        // Update the user with the changed attributes
        this.objectMapper.readerForUpdating(user).readValue(request.getReader());

        // Store and return
        return this.userRepository.save(user);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") String id) {
        this.userRepository.deleteById(id);
    }

    @Secured("ROLE_AUTH_SERVICE")
    @GetMapping("find-by-user-name")
    public UserDetails findByUsername(@RequestParam("username") String username) {
        // Find user by user name
        Optional<User> optionalUser = this.userRepository.findByUsername(username);

        // If the user exists
        if (optionalUser.isPresent()) {
            // The user
            User user = optionalUser.get();
            
            // Return user
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getAuthorities());
        }
        
        // Return null
        return null;
    }

    @GetMapping("me")
    public Object me() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

}
