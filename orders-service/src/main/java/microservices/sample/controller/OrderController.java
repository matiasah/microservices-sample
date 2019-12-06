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
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import microservices.sample.model.Order;
import microservices.sample.model.Product;
import microservices.sample.repository.OrderRepository;
import microservices.sample.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JmsTemplate jmsTemplate;

    @GetMapping
    public Iterable<Order> index(@QuerydslPredicate(root = Order.class) Predicate predicate) {
        if (predicate != null) {
            return this.orderRepository.findAll(predicate);
        }
        return this.orderRepository.findAll();
    }
    
    @GetMapping("page")
    public Page<Order> page(@QuerydslPredicate(root = Order.class) Predicate predicate, Pageable pageable) {
        if (predicate != null) {
            return this.orderRepository.findAll(predicate, pageable);
        }
        return this.orderRepository.findAll(pageable);
    }

    @GetMapping("{id}")
    public Order get(@PathVariable("id") Order order) {
        return order;
    }

    @PostMapping
    public Order store(@RequestBody Order order) {
        // Remove ID from order
        order.setId(null);

        // If order contains products
        if (order.getProducts() != null) {
            // Product Ids
            Set<String> productsIds = order.getProducts().stream().map(product -> product.getId()).collect(Collectors.toSet());
            
            // Products
            Set<Product> products = this.productService.get(productsIds);
            
            // Set products
            order.setProducts(products);
        }

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
