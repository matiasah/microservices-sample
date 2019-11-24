/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author matia
 */
@JsonTypeName("Order")
@Data
@Document
public class Order {
    
    @Id
    private String id;
    private String client;
    private Set<Product> products = new HashSet<>();
    
}
