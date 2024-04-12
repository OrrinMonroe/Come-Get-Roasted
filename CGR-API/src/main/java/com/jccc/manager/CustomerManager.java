package com.jccc.manager;

import java.util.ArrayList;
import java.util.List;

import com.jccc.objects.Customer;

public interface CustomerManager {

  public Customer createCustomer(Customer customer);

  public Customer updateCustomer(Customer customer);

  public Customer readCustomer(int id);

  public ArrayList<Customer> readAllCustomers();

  public boolean deleteCustomer(int id);

  public Customer loginCustomer(String username, String password);

  public void logoutCustomer();
}
