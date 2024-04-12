package com.jccc.controller;

import com.jccc.api.CoffeeApi;
import com.jccc.objects.Drink;
import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * Controller class for the drink table.
 */
@RestController
@CrossOrigin
public class DrinkController {
  
  /**
  * Creates a connection to the database, 
  * calls getCoffeeList in the DatabaseAPI.java file 
  * which returns a list of coffees in an ArrayList.toString().
  */
  @GetMapping(value = "/coffees")
  public ArrayList<Drink> getCoffees() {
    ArrayList<Drink> coffeeList = new ArrayList<>();
    try {
      File dbFile = new File("./CGR-DB/flyway-demo.db");
      String url = "jdbc:sqlite:" + dbFile.getAbsolutePath();
      Connection con = DriverManager.getConnection(url);
      CoffeeApi api = new CoffeeApi();
      coffeeList = api.getCoffeeList(con);
    } catch (Exception e) {
      System.out.println(e);
    }
    return coffeeList;
  }
}