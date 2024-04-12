package com.jccc.api;

import com.jccc.objects.Drink;
import java.sql.*;
import java.util.ArrayList;


/**
 * DatabaseAPI gets data from the database.
 */
public class CoffeeApi {

  /**
   * Gets the drinks from the database.
   */
  public ArrayList<Drink> getCoffeeList(Connection con) throws Exception {
    ArrayList<Drink> coffeeList = new ArrayList<>();
    try {
      Statement statement = con.createStatement();
      ResultSet rs = statement.executeQuery("SELECT * from drinks");
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
