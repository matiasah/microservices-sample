/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microservices.sample.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.security.core.GrantedAuthority;

/**
 *
 * @author matia
 */
@Data
public class Authority implements GrantedAuthority {
    
    @NonNull
    private Roles role;
    
    public Authority() {
        
    }
    
    @Override
    public String getAuthority() {
        return this.role.name();
    }
    
}
