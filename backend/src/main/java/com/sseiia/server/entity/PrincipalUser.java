package com.sseiia.server.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class PrincipalUser implements UserDetails {
    private String username;
    private String password;
    private String email;
    private Collection<? extends GrantedAuthority> authorities;

    public PrincipalUser(String username, String password, String email/*, Role role*/, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.authorities = authorities;
    }

    public static PrincipalUser build(User user) {
        /*List<GrantedAuthority> authorities = user.getRole().stream().map(role ->
                new SimpleGrantedAuthority(role.getRoleType().name())).collect(Collectors.toList());*/

        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().getRole()));

        return new PrincipalUser(user.getUsername(), user.getPassword(), user.getEmail(),  authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public String getUsername() {
        return username;
    }

    //@Override
    public String getPassword() {
        return password;
    }

    //@Override
    public String getEmail() {
        return email;
    }

    //@Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //@Override
    public boolean isAccountNonLocked() {
        return true;
    }

    //@Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //@Override
    public boolean isEnabled() {
        return true;
    }

}
