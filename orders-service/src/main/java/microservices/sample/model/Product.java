/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.model;

import com.querydsl.core.annotations.QueryEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 *
 * @author matia
 */
@EqualsAndHashCode(of = "id")
@QueryEntity
@Data
public class Product {
    
    private String id;
    private String name;
    private long price;
    
}
