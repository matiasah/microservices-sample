/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.model;

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
@Document
public class Product {
    
    @Id
    private String id;
    private String name;
    private long price;
    
}
