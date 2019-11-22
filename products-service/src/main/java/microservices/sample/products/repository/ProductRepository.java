/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.products.repository;

import microservices.sample.products.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author matia
 */
public interface ProductRepository extends MongoRepository<Product, String> {
    
}
