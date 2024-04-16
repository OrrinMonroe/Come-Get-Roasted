package com.jccc.api;
import com.jccc.objects.Customer;
import com.jccc.objects.Transaction;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;

/**
 * API For the transactions.
 *
 * @author Mikey Dowsett
 */
public class TransactionApi {
  /**
   * Adds a new transaction to the table.
   * Also updates the number of points the user has after a transaction.
   */
  public static boolean addTransaction(Connection con, Transaction transaction) throws Exception {
    int newPoints = transaction.getPoints();
    System.out.println("Point change during transaction: " + newPoints);
    int id = transaction.getCustomerId();
    try (PreparedStatement preparedStatement = con.prepareStatement(
        "INSERT INTO transactions (transaction_id, drink_id, customer_id, price, points) VALUES ( ?, ?, ?, ?, ?)")) {
          preparedStatement.setInt(1, transaction.getTransactionId());
      preparedStatement.setInt(2, transaction.getDrinkId());
      preparedStatement.setInt(3, transaction.getCustomerId());
      preparedStatement.setInt(4, transaction.getPrice());
      preparedStatement.setInt(5, transaction.getPoints());
      int rowsAffected = preparedStatement.executeUpdate();
      preparedStatement.close();
      System.out.println("Added transaction: " + transaction.toString());
      try (PreparedStatement preparedStatement2 = con.prepareStatement("UPDATE customers SET points = points + "+ newPoints + " where customer_id = " + id)) {
        int points = preparedStatement2.executeUpdate();
        con.close();
      return rowsAffected > 0;
      } catch (Exception e) {
        System.out.println("Error adding or subtracting points: " + e.getMessage());
        con.close();
        return false;
      }
    } catch (Exception e) {
      System.out.println("Error adding transaction: " + e.getMessage());
      con.close();
      return false;
    }
  }

  /**
   * Gets a list of transactions from the table.
   */
  public static ArrayList<Transaction> getTransactionList(Connection con) {
    ArrayList<Transaction> transactionList = new ArrayList<>();

    try {
      Statement statement = con.createStatement();
      ResultSet rs = statement.executeQuery("SELECT * FROM transactions");
      while (rs.next()) {
        Transaction data = new Transaction(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getInt(4), rs.getInt(5));
        transactionList.add(data);
      }
      return transactionList;
    } catch (Exception e) {
      System.out.println("Error getting transactions: " + e.getMessage());
      return null;
    }
  }

  /**
   * Gets a list of one users transactions.
   */
  public static ArrayList<Transaction> getTransactionList(Connection con, int id) {
    ArrayList<Transaction> transactionList = new ArrayList<>();

    try {
      Statement statement = con.createStatement();
      ResultSet rs = statement.executeQuery("SELECT * FROM transactions WHERE customer_id = " + id);
      while (rs.next()) {
        Transaction data = new Transaction(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getInt(4), rs.getInt(5));
        transactionList.add(data);
      }
      return transactionList;
    } catch (Exception e) {
      System.out.println("Error getting transactions: " + e.getMessage());
      return null;
    }
  }

  public static Transaction getLatestUserTransaction(Connection con, int id) {
    Transaction data = null;
    try {
      Statement statement = con.createStatement();
      ResultSet rs = statement.executeQuery(
          "SELECT * FROM transactions WHERE customer_id = " + id + " ORDER BY transaction_id DESC LIMIT 1;");
      while (rs.next()) {
        data = new Transaction(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getInt(4), rs.getInt(5));
      }
      return data;
    } catch (Exception e) {
      System.out.println("Error getting transactions: " + e.getMessage());
      return null;
    }
  }

  public static LinkedHashMap<Integer, Integer> getDrinkPopularity(Connection con) {
    LinkedHashMap<Integer, Integer> data = new LinkedHashMap<>();

    try {
      Statement statement = con.createStatement();
      ResultSet rs = statement
          .executeQuery("SELECT d.drink_id, COUNT(t.drink_id) FROM drinks d "
              + "LEFT JOIN transactions t ON d.drink_id = t.drink_id GROUP BY d.drink_id ORDER BY COUNT(t.drink_id) DESC");
      while (rs.next()) {
        data.put(rs.getInt(1), rs.getInt(2));
      }
      return data;
    } catch (Exception e) {
      System.out.println("Error getting transaction popularity: " + e.getMessage());
      return null;
    }
  }
}
