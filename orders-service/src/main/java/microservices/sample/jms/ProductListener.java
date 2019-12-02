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
    public void receiveProduct(Product receivedProduct) {
        // Find orders that contain this product
        List<Order> orders = this.orderRepository.findByProducts_Id(receivedProduct.getId());

        // For each order
        for (Order order : orders) {
            // Get the order products set
            Set<Product> products = order.getProducts();

            // For each product
            for (Product product : products) {
                
                // If it's the same product
                if (product.equals(receivedProduct)) {
                    
                    // If the received product is newer
                    if (receivedProduct.getUpdatedAt().isAfter(product.getUpdatedAt())) {
                        // Remove the product with the old information
                        products.remove(receivedProduct);

                        // Add the product with updated information
                        products.add(receivedProduct);
                        
                        // Stop iterating products
                        break;
                    }
                }
            }

        }

        // Update all modified orders
        this.orderRepository.saveAll(orders);
    }

}
