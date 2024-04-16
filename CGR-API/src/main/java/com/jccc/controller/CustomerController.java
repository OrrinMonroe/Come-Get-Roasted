package com.jccc.controller;

import com.jccc.api.CustomerApi;
import com.jccc.manager.CustomerManagerListImpl;
import com.jccc.objects.Drink;
import com.jccc.objects.Customer;
import com.jccc.objects.LoginRequest;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for the customer object.
 */
@RestController
@CrossOrigin
public class CustomerController {
  private CustomerManagerListImpl customerManager;

  public CustomerController(CustomerManagerListImpl customerManager) {
    super();
    this.customerManager = customerManager;
    customerManager.customerList = readAllCustomers();
  }

  @GetMapping(value = "/customer")
  public ArrayList<Customer> readAllCustomers() {
    ArrayList<Customer> customerList = customerManager.readAllCustomers();
    return customerList;
  }

  @PostMapping(value = "/customer")
  public Customer createCustomer(@RequestBody Customer customer) {
    return customerManager.createCustomer(customer);
  }

  @GetMapping(value = "/customer/{id}")
  public Customer readCustomer(@PathVariable int id) {
    return customerManager.readCustomer(id);
  }

  @PostMapping(value = "/customerlogin")
  public String loginCustomer(@RequestBody LoginRequest request) {
    Customer customer = customerManager.loginCustomer(request.getUsername(), request.getPassword());
    if(customer == null) {
      return "Login failed.";
    } else {
      return "Login successful.";
    }
  }

  @PutMapping(value = "/customer")
  public Customer updateCustomer(@RequestBody Customer customer) {
    return customerManager.updateCustomer(customer);
  }

  @DeleteMapping(value = "/customer/{id}")
  public boolean deleteCustomer(@PathVariable int id) {
    return customerManager.deleteCustomer(id);
  }

  @GetMapping(value = "/logout")
  public String logoutCustomer() throws NullPointerException {
    customerManager.logoutCustomer();
    return "You are now logged out.";
  }

  @GetMapping(value = "/loggedincustomer")
  public Customer getloggedInCustomer() throws NullPointerException {
    return customerManager.loggedInCustomer;
  }

  @GetMapping(value = "/loggedInUser")
  public boolean isCustomerLoggedIn() {
    return customerManager.loggedInCustomer != null;
  }

  @PutMapping(value = "/loggedincustomer")
  public Customer updateLoggedInCustomer() {
    Customer updatedCustomer = customerManager.updateLoggedInCustomer();
    return updatedCustomer;
  }

  /**
 * Creates a connection to the database,
 * calls getMostCommonOrderOfUser in the CoffeeApi.java file,
 * which returns a Drink object that is the user's most common order.
 */
@GetMapping(value = "/mostCommonOrder/{id}")
public Drink getMostCommonUserOrder(@PathVariable int id) {
  try {
    File dbFile = new File("./CGR-DB/flyway-demo.db");
    String url = "jdbc:sqlite:" + dbFile.getAbsolutePath();
    Connection con = DriverManager.getConnection(url);
  CustomerApi api = new CustomerApi();
  Drink drink = api.getMostCommonOrderOfUser(con, id);
  return drink;
  } catch (Exception e) {
    System.out.println("Error getting most common order: " + e);
    return null;
  }
}

/**
 * Creates a connection to the database,
 * calls getReccomendedDrinks in the CustomerApi.java file,
 * which returns a list of Drinks based on  their most commonly ordered
 * drink's category.
 */
@GetMapping(value = "/recommendedOrders/{id}")
public ArrayList<Drink> getReccomendedDrinks(@PathVariable int id) {
  ArrayList<Drink> coffeeList = new ArrayList<>();
    try {
      File dbFile = new File("./CGR-DB/flyway-demo.db");
      String url = "jdbc:sqlite:" + dbFile.getAbsolutePath();
      Connection con = DriverManager.getConnection(url);
      CustomerApi api = new CustomerApi();
      coffeeList = api.getRecommendedDrinks(con, id);
    } catch (Exception e) {
      System.out.println(e);
    }
    return coffeeList;
}

}
