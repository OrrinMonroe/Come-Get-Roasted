package com.jccc.manager;

import com.jccc.api.CustomerApi;
import com.jccc.objects.Customer;
import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

/**
 * Manager implementation for customers.
 */
@Component
public class CustomerManagerListImpl implements CustomerManager {

  public ArrayList<Customer> customerList = new ArrayList<Customer>();

  public Customer loggedInCustomer;

  public static int id = 1;

  @Override
  public Customer createCustomer(Customer customer) {
    if (customer.getId() != 0) {
      System.out.println("Error: Customer id must initially be set to 0");
      return null;
    }
    customer.setId(id);
    id++;
    customerList.add(customer);
    try {
      Connection con = connectToDatebase();
      CustomerApi customerApi = new CustomerApi();
      customerApi.addCustomer(con, customer);
      con.close();
    } catch (Exception e) {
      System.out.println(e);
    }
    return customer;
  }

  @Override
  public Customer updateCustomer(Customer customer) {
    if (customer.getId() > 0) {
      customer.setId(id);
    } else {
      System.out.println("To update a Customer the Id must not be zero");
    }
    return customer;
  }

  @Override
  public Customer readCustomer(int id) {
    for (Customer customer : customerList) {
      if (customer.getId() == id) {
        return customer;
      }
    }
    return null;
  }

  @Override
  public ArrayList<Customer> readAllCustomers() {
    ArrayList<Customer> customers = new ArrayList<>();
    try {
      Connection con = connectToDatebase();
      Statement statement = con.createStatement();
      ResultSet rs = statement.executeQuery("SELECT * from customers");
      SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
      while (rs.next()) { 
        Customer customer = new Customer(rs.getInt(1), rs.getString(2), 
            rs.getString(3), rs.getInt(5), rs.getBoolean(6));
        customers.add(customer);
      }
      rs.close();
      return customers;
    } catch (Exception e) {
      System.out.println("Error in CustomerManager: " + e.getMessage());
      return null;
    }

  }

  @Override
  public boolean deleteCustomer(int id) {
    for (Customer customer : customerList) {
      if (customer.getId() == id) {
        customerList.remove(customer);
        return true;
      }
    }
    return false;
  }

  @Override
  public Customer loginCustomer(String username, String password) {
    for (Customer customer : customerList) {
      if (customer.getUsername().equals(username) && customer.getPassword().equals(password)) {
        loggedInCustomer = customer;
        return customer;
      }
    }
    return null;
  }

  @Override
  public void logoutCustomer() throws NullPointerException {
    if (loggedInCustomer != null) {
      loggedInCustomer = null;
    }
  }

    private Connection connectToDatebase() {
    try {
      File dbFile = new File("./CGR-DB/flyway-demo.db");
      String url = "jdbc:sqlite:" + dbFile.getAbsolutePath();
      return DriverManager.getConnection(url);
    } catch (SQLException e) {
      System.out.println("Error: " + e.getMessage());
      return null;
    }
  }
}
