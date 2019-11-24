/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.controller;

import java.util.List;
import microservices.sample.model.Product;
import microservices.sample.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author matia
 */
@RestController
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private JmsTemplate jmsTemplate;
    
    @GetMapping
    public List<Product> index() {
        return this.productRepository.findAll();
    }
    
    @PostMapping
    public Product save(Product product) {
        this.jmsTemplate.convertAndSend("product", product);
        return product;
    }
    
}
