/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.controller;

import java.util.List;
import microservices.sample.model.Order;
import microservices.sample.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.GetMapping;
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
    private JmsTemplate jmsTemplate;
    
    @GetMapping
    public List<Order> index() {
        return this.orderRepository.findAll();
    }
    
}
