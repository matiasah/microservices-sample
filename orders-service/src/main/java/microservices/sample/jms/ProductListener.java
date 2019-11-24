/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.jms;

import java.util.List;
import java.util.Set;
import microservices.sample.model.Order;
import microservices.sample.model.Product;
import microservices.sample.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

/**
 *
 * @author matia
 */
@Component
public class ProductListener {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @JmsListener(destination = "product")
    public void receiveProduct(Product product) {
        // Find orders that contain this product
        List<Order> orders = this.orderRepository.findByProducts_Id(product.getId());
        
        // For each order
        for (Order order : orders) {
            // Get the order products set
            Set<Product> products = order.getProducts();
            
            // Remove the product with the old information
            products.remove(product);
            
            // Add the product with updated information
            products.add(product);
        }
        
        // Update all modified orders
        this.orderRepository.saveAll(orders);
    }
    
}
