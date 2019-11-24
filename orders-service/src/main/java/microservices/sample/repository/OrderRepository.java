/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.repository;

import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import java.util.List;
import microservices.sample.model.Order;
import microservices.sample.model.QOrder;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;

/**
 *
 * @author matia
 */
public interface OrderRepository extends MongoRepository<Order, String>, QuerydslPredicateExecutor<Order>, QuerydslBinderCustomizer<QOrder> {
    
    public List<Order> findByProducts_Id(String id);
    
    @Override
    public default void customize(QuerydslBindings bindings, QOrder order) {
        bindings.bind(Long.class).first((NumberPath<Long> path, Long value) -> path.eq(value));
        bindings.bind(String.class).first((StringPath path, String value) -> path.containsIgnoreCase(value));
    }
    
}
