package com.jccc.manager;

import com.jccc.api.TransactionApi;
import com.jccc.objects.Customer;
import com.jccc.objects.Drink;
import com.jccc.objects.Transaction;
import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import org.springframework.stereotype.Component;

/**
 * Implementation for the transaction manager.
 */
@Component
public class TransactionManagerListImpl implements TransactionManager {
  public ArrayList<Transaction> transactionList = new ArrayList<Transaction>();
  
  public int id = readAllTransactions().size();
  
  @Override
  public Transaction createTransaction(Transaction transaction) {
    if (transaction.getTransactionId() != 0) {
      System.out.println("Error: Transaction id must be set to 0!");
      return null;
    }
    transaction.setTransactionId(id++);
    transactionList.add(transaction);

    try {
      Connection con = connectToDatebase();
      TransactionApi.addTransaction(con, transaction);
      return transaction;
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
      return null;
    }
  }

  @Override
  public Transaction readTransaction(int id) {
    for (Transaction transaction : transactionList) {
      if (transaction.getTransactionId() == id) {
        return transaction;
      }
    }
    return null;
  }

  @Override
  public ArrayList<Transaction> readAllCustomerTransactions(int id) {
    try {
      Connection con = connectToDatebase();
      ArrayList<Transaction> customerTransactions = TransactionApi.getTransactionList(con, id);
      return customerTransactions;
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
      return null;
    }
  }

  @Override
  public ArrayList<Transaction> readAllTransactions() {
    try {
      Connection con = connectToDatebase();
      return TransactionApi.getTransactionList(con);
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
    }

    return transactionList;
  }

  @Override
  public Transaction updateTransaction(Transaction transaction) {
    if (transaction.getTransactionId() > 0) {
      transaction.setTransactionId(id);
    } else {
      System.out.println("To update a Transaction the Id must not be zero");
    }
    return transaction;
  }

  @Override
  public boolean deleteTransaction(int id) {
    for (Transaction transaction : transactionList) {
      if (transaction.getTransactionId() == id) {
        transactionList.remove(transaction);
        return true;
      }
    }
    return false;
  }

  @Override
  public Transaction getLatestUserTransaction(int id) {
    try {
      Connection con = connectToDatebase();
      return TransactionApi.getLatestUserTransaction(con, id);
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
      return null;
    }
  }

  @Override
  public LinkedHashMap<Integer, Integer> getPopularTransactions() {
    try {
      Connection con = connectToDatebase();
      return TransactionApi.getDrinkPopularity(con);
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
      return null;
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
