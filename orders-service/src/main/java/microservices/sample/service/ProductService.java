/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.service;

import java.util.Set;
import microservices.sample.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author matia
 */
@FeignClient(name = "products-service")
public interface ProductService {

    @GetMapping("{id}")
    public Product get(@PathVariable("id") String id);

    @PostMapping("list")
    public Set<Product> get(@RequestBody Set<String> ids);
    
}
