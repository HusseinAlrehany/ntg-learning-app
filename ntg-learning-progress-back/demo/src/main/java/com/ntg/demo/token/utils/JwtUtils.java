package com.ntg.demo.token.utils;

import com.ntg.demo.entity.User;
import com.ntg.demo.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
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

        private  static  final long EXPIRATION_TIME = 86400000; //24hours or 86400000 milisecs

        public JwtUtils(){
            String secretString = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
            byte[]keyBytes = Base64.getDecoder().decode(secretString.getBytes(StandardCharsets.UTF_8));
            this.key = new SecretKeySpec(keyBytes, "HmacSHA256");
        }


        public String generateToken(UserDetails userDetails){
            return Jwts.builder()
                    .subject(userDetails.getUsername())
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
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
