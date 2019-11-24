/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.jms;

import microservices.sample.model.Product;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

/**
 *
 * @author matia
 */
@Component
public class ProductListener {
    
    @JmsListener(destination = "product")
    public void receiveProduct(Product product) {
        System.out.println("Product!");
        System.out.println(product);
    }
    
}
