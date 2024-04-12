package com.jccc.objects;

/**
 * Class to represent the Customer object.
 */
public class Customer {
  private int id;
  private String username;
  private String password;
  private int points;
  private boolean isAdmin;
  
  /**
   * Constructor for the customer object.
   */
  public Customer(int id, String username, String password, int points, boolean isAdmin) {
    super();
    this.id = id;
    this.username = username;
    this.password = password;
    this.points = points;
    this.isAdmin = isAdmin;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public int getPoints() {
    return points;
  }

  public void setPoints(int points) {
    this.points = points;
  }

  public boolean isAdmin() {
    return isAdmin;
  }

  public void setAdmin(boolean isAdmin) {
    this.isAdmin = isAdmin;
  }

  @Override
  public String toString() {
    return "Customer [id=" + id + ", username=" + username + ", "
        + "password=" + password + ", points=" + points
        + ", isAdmin=" + isAdmin + "]";
  }
}
