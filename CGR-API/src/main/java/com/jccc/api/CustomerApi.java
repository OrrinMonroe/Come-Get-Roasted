package com.jccc.api;

import com.jccc.objects.Customer;
import com.jccc.objects.Drink;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.PreparedStatement;
import java.sql.Date;
import java.util.ArrayList;

/**
 * API for the customers table.
 */
public class CustomerApi {

  /**
   * Adds a customer to the databse.
   */
  public boolean addCustomer(Connection con, Customer customer) throws Exception {
    try (PreparedStatement preparedStatement = con.prepareStatement(
        "INSERT INTO customers (username, firstname, lastname, password, birth_date, points, is_admin)"
            + " values (?, ?, ?, ?, ?, ?, ?)")) {

      Date date = new Date(2000, 1, 1);
      preparedStatement.setString(1, customer.getUsername());
      preparedStatement.setString(2, customer.getFirstname());
      preparedStatement.setString(3, customer.getLastname());
      preparedStatement.setString(4, customer.getPassword());
      preparedStatement.setDate(5, date);
      preparedStatement.setInt(6, customer.getPoints());
      preparedStatement.setBoolean(7, customer.isAdmin());

      int rowsAffected = preparedStatement.executeUpdate();
      preparedStatement.close();
      con.close();
      return rowsAffected > 0;
    } catch (Exception e) {
      System.out.println("Error adding customer: " + e.getMessage());
      return false;
    }
  }

  /**
   * Gets a user's most commonly ordered drink based on their customer_id.
   */
  public static Drink getMostCommonOrderOfUser(Connection con, int customer_id) {
    Drink drink = null;
    int most_common_drink_id = 0;
    try {
      Statement statement1 = con.createStatement();
      ResultSet rs = statement1
          .executeQuery("SELECT COUNT(*) AS 'ORDER_COUNT', drink_id FROM transactions WHERE customer_id =" + customer_id
              + " GROUP BY drink_id ORDER BY ORDER_COUNT DESC LIMIT 1;");
      while (rs.next()) {
        most_common_drink_id = rs.getInt(2);
      }
      statement1.close();
      Statement statement2 = con.createStatement();
      ResultSet rs2 = statement2.executeQuery("SELECT * FROM drinks where drink_id = " + most_common_drink_id);
      while (rs2.next()) {
        drink = new Drink(rs2.getInt(1), rs2.getString(2), rs2.getFloat(3),
            rs2.getString(4), rs2.getString(5),
            rs2.getString(6));
      }
      statement2.close();
      return drink;
    } catch (Exception e) {
      System.out.println("Error getting most common drink order: " + e.getMessage());
      return null;
    }
  }

  public boolean deleteCustomer(Connection con, int id) {
    try {
      Statement deleteStatement = con.createStatement();
      deleteStatement.execute("UPDATE customers SET username = 'DELETED', firstname = 'DELETED', lastname = 'DELETED', password = 'DELETED', points = NULL, is_admin = false WHERE customer_id =" + id + ";");
      deleteStatement.close();
      con.close();
      System.out.println("Deleted customer with customer_id " + id);
      return true;
    } catch (Exception e) {
      System.out.println("Error deleting customer with customer_id=" + id + ": " + e);
      return false;
    }
  }

  /**
   * Returns a list of recommended drinks for a user based on that user's most
   * commonly ordered drink's category.
   * Ex. a user who orders an Americano the most will see recommendations for the
   * other Americano coffees.
   */
  public static ArrayList<Drink> getRecommendedDrinks(Connection con, int customer_id) {
    Drink mostCommonOrder = getMostCommonOrderOfUser(con, customer_id);
    String mostCommonOrderCategory = mostCommonOrder.getCategory();
    ArrayList<Drink> coffeeList = new ArrayList<>();
    try {
      Statement statement = con.createStatement();
      ResultSet rs = statement
          .executeQuery("SELECT * from drinks WHERE category = \"" + mostCommonOrderCategory + "\"");
      while (rs.next()) {
        Drink data = new Drink(rs.getInt(1), rs.getString(2), rs.getFloat(3),
            rs.getString(4), rs.getString(5),
            rs.getString(6));
        coffeeList.add(data);
      }
      statement.close();
      con.close();
      return coffeeList;
    } catch (Exception e) {
      System.out.println("Error getting drinks: " + e.getMessage());
      return null;
    }

  }

}
