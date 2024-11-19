package com.app.backend.Filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.app.backend.Jwt.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilters extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;

    @Autowired
    UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authToken = retriveJwtFromRequest(request);
        if (authToken != null) {
            String username = jwtService.extractUsername(authToken);
            UserDetails authUser = userDetailsService.loadUserByUsername(username);
            if (authUser != null && jwtService.isTokenValid(authToken, authUser) &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {
                UsernamePasswordAuthenticationToken authenticatedUser = new UsernamePasswordAuthenticationToken(
                        authUser, null, authUser.getAuthorities());
                authenticatedUser.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticatedUser);
            }
        }
        filterChain.doFilter(request, response);
    }

    private String retriveJwtFromRequest(HttpServletRequest request) {

        jakarta.servlet.http.Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (jakarta.servlet.http.Cookie cookie : cookies) {
                // Check if the cookie has the "Authorization" key
                if ("Authorization".equals(cookie.getName())) {

                    return cookie.getValue();
                }
            }
        }

        return null;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        boolean shouldNotFilter = path.startsWith("/account/");
        if (shouldNotFilter) {
            System.out.println("Excluding path: " + path);
        }
        return shouldNotFilter;
    }

}
