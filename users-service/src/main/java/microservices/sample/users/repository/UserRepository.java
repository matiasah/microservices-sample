/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.users.repository;

import java.util.Optional;
import microservices.sample.users.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author matia
 */
public interface UserRepository extends MongoRepository<User, String> {
    
    public Optional<User> findByUsername(String username);
    
}
