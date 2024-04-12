package com.jccc.manager;

import java.util.ArrayList;
import com.jccc.objects.*;
import java.util.LinkedHashMap;

/**
 * Interface for the transaction.
 *
 * @author Mikey Dowsett
 */
public interface TransactionManager {
  public Transaction createTransaction(Transaction transaction);

  public Transaction updateTransaction(Transaction transaction);

  public Transaction readTransaction(int id);

  public ArrayList<Transaction> readAllCustomerTransactions(int id);

  public ArrayList<Transaction> readAllTransactions();

  public boolean deleteTransaction(int id);

  public Transaction getLatestUserTransaction(int id);

  public LinkedHashMap<Integer, Integer> getPopularTransactions();
}