package com.backend.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.backend.payload.HelloWorldBean;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class HelloWorldController {
	@GetMapping(path = "/hello-world/path-variable/{name}")
	public HelloWorldBean helloWorldPathVariable(HttpServletRequest request, @PathVariable String name) {
		System.out.println("Host = " + request.getServerName());
		System.out.println("Retrived Username or Email : " + name);
		String route = request.getServerName().split("\\.")[0];
		if(route.equals("localhost")) {
			return new HelloWorldBean(String.format("Hello World, %s! You connects from www.", name));
		} else {
			return new HelloWorldBean(String.format("Hello World, %s! You connect from %s.", name, route));
		}
	}
}
