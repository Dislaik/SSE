package com.sseiia.server.jwt;

import com.sseiia.server.entity.PrincipalUser;
import com.sseiia.server.entity.User;
import com.sseiia.server.service.UserService;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

import static io.jsonwebtoken.security.Keys.secretKeyFor;

@Component
public class Provider {
    private final static Logger logger = LoggerFactory.getLogger(Provider.class);

    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private Integer expiration;

    @Autowired
    UserService userService;

    public String generateToken(Authentication authentication) {
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        User user = userService.findByUsername(principalUser.getUsername()).get();

        return Jwts.builder().setSubject(principalUser.getUsername())
                .claim("id", user.getId())
                .claim("username", user.getUsername())
                .claim("role", principalUser.getAuthorities()) // añadido por mi
                .claim("first_name", user.getFirstName())
                .claim("last_name", user.getLastName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 1000l * 60 * 60))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();

    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).build().parseClaimsJws(token).getBody().getSubject();
    }

    public Boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).build().parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("token mal formado");
        }catch (UnsupportedJwtException e) {
            logger.error("token no soportado");
        }catch (ExpiredJwtException e) {
            logger.error("token expirado");
        }catch (IllegalArgumentException e) {
            logger.error("token vacio");
        }catch (SignatureException e) {
            logger.error("falla en la firma");
        }
        return false;
    }
}

