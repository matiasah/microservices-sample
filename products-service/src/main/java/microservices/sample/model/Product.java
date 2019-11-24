/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author matia
 */
@JsonTypeName("Product")
@Data
@Document
public class Product {
    
    @Id
    private String id;
    private String name;
    private long price;
    
}
