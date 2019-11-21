/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.users.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;

/**
 *
 * @author matia
 */
@Data
@Document
public class User implements UserDetails {
    
    @Id
    private String id;
    
    @Indexed
    private String username;
    
    @Setter(onMethod_ = @JsonSetter)
    @Getter(onMethod_ = @JsonIgnore)
    private String password;
    
    private Set<Authority> authorities = new HashSet<>();
    
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;
    private boolean enabled = true;
    
}
