/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.repository;

import java.util.List;
import microservices.sample.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author matia
 */
public interface OrderRepository extends MongoRepository<Order, String> {
    
    public List<Order> findByProducts_Id(String id);
    
}
