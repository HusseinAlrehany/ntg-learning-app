package com.ntg.demo.token.utils;

import com.ntg.demo.entity.User;
import com.ntg.demo.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;
import java.util.function.Function;
    @Component
    public class JwtUtils {

        private SecretKey key;

        @Autowired
        private UserRepository userRepository;

        // Inject the secret from application properties
        @Value("${jwt.secret}")
        private String jwtSecretString;

        @Value("${jwt.expiration}")
        private long expirationTime;

        @PostConstruct
        public void init() {
                String secretToUse = jwtSecretString;
                // Decode and create the secret key
                byte[] keyBytes = Base64.getDecoder().decode(secretToUse.getBytes(StandardCharsets.UTF_8));
                this.key = new SecretKeySpec(keyBytes, "HmacSHA256");

                System.out.println("JWT Secret initialized successfully");

                this.key = new SecretKeySpec(keyBytes, "HmacSHA256");

        }


        public String generateToken(UserDetails userDetails){
            return Jwts.builder()
                    .subject(userDetails.getUsername())
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis() + expirationTime))
                    .signWith(key)
                    .compact();
        }

        public String extractUsername(String token){
            return extractClaims(token, Claims::getSubject);
        }

        private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {

            return claimsTFunction
                    .apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());

        }

        public boolean isTokenValid(String token, UserDetails userDetails){
            final String username = extractUsername(token);

            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        }

        public boolean isTokenExpired(String token) {
            return extractClaims(token, Claims::getExpiration).before(new Date());
        }


        //if we need full control on logged in user
        //and load all user object we can use that block
        //but if we only want only email of currently logged  in user use (Principle interface from spring security)
        public User getLoggedInUser(){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if(authentication != null && authentication.isAuthenticated()){
                User user = (User) authentication.getPrincipal();
                Optional<User> optionalUser = userRepository.findById(user.getId());

                return optionalUser.orElse(null);
            }

            return null;
        }

    }
