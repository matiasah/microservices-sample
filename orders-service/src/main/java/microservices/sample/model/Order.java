/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.model;

import com.querydsl.core.annotations.QueryEntity;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author matia
 */
@EqualsAndHashCode(of = "id")
@Data
@QueryEntity
@Document
public class Order {
    
    @Id
    private String id;
    private String client;
    private Set<Product> products = new HashSet<>();
    
}
