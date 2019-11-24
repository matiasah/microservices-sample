/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.types.Predicate;
import java.io.IOException;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import microservices.sample.model.Product;
import microservices.sample.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    private ObjectMapper objectMapper;
    
    @Autowired
    private JmsTemplate jmsTemplate;
    
    @GetMapping
    public Iterable<Product> index(@QuerydslPredicate(root = Product.class) Predicate predicate) {
        return this.productRepository.findAll(predicate);
    }
    
    @GetMapping("{id}")
    public Product get(@PathVariable("id") Product product) {
        return product;
    }
    
    @PostMapping("list")
    public Iterable<Product> get(@RequestBody Set<String> ids) {
        return this.productRepository.findAllById(ids);
    }
    
    @PostMapping
    public Product store(@RequestBody Product product) {
        // Remove ID from product
        product.setId(null);
        
        // Save product
        this.productRepository.save(product);
        
        // Publish product
        this.jmsTemplate.convertAndSend("product", product);
        
        // Return product with ID
        return product;
    }
    
    @PatchMapping("{id}")
    public Product patch(@PathVariable("id") Product product, HttpServletRequest request) throws IOException {
        // Update product
        this.objectMapper.readerForUpdating(product).readValue(request.getReader());
        
        // Save updated product
        this.productRepository.save(product);
        
        // Publish product
        this.jmsTemplate.convertAndSend("product", product);
        
        // Return product
        return product;
    }
    
}
