/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import microservices.sample.model.Order;
import microservices.sample.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
public class OrderController {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private JmsTemplate jmsTemplate;
    
    @GetMapping
    public List<Order> index() {
        return this.orderRepository.findAll();
    }
    
    @GetMapping("{id}")
    public Order get(@PathVariable("id") Order order) {
        return order;
    }
    
    @PostMapping
    public Order store(@RequestBody Order order) {
        // Remove ID from order
        order.setId(null);
        
        // Save order
        this.orderRepository.save(order);
        
        // Publish order
        this.jmsTemplate.convertAndSend("order", order);
        
        // Return order
        return order;
    }
    
    @PatchMapping("{id}")
    public Order patch(@PathVariable("id") Order order, HttpServletRequest request) throws IOException {
        // Update order
        this.objectMapper.readerForUpdating(order).readValue(request.getReader());
        
        // Save order
        this.orderRepository.save(order);
        
        // Publish order
        this.jmsTemplate.convertAndSend("order", order);
        
        // Return order
        return order;
    }
    
}
