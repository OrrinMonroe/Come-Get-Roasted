package com.jccc.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


/**
 * Web service to get data from the database.
 * Make sure to run this file for the web site to work.
 */

@SpringBootApplication
@ComponentScan(basePackages = { "com.jccc.controller", "com.jccc.objects", "com.jccc.manager"})
public class Application {
  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
    System.out.println("HEllo world");
  }
}
