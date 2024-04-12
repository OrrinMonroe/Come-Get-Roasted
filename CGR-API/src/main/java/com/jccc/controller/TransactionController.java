package com.jccc.controller;

import com.jccc.manager.TransactionManagerListImpl;
import com.jccc.objects.Transaction;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Webservice for the transactions.
 *
 * @author Mikey Dowsett
 */
@RestController
@CrossOrigin
public class TransactionController {
  private TransactionManagerListImpl transactionManager;

  public TransactionController(TransactionManagerListImpl transactionManager) {
    this.transactionManager = transactionManager;
  }

  @PostMapping(value = "/transaction")
  public Transaction createTransaction(@RequestBody Transaction transaction) {
    return transactionManager.createTransaction(transaction);
  }

  @GetMapping(value = "/transaction")
  public ArrayList<Transaction> readAllTransactions() {
    return transactionManager.readAllTransactions();
  }

  @GetMapping(value = "/transaction/{id}")
  public Transaction readCustomerTransaction(@PathVariable int id) {
    return transactionManager.readTransaction(id);
  }

  @GetMapping(value = "/transactions/{id}")
  public ArrayList<Transaction> readAllCustomerTransactions(@PathVariable int id) {
    return transactionManager.readAllCustomerTransactions(id);
  }

  @PutMapping(value = "transaction")
  public Transaction updateTransaction(@RequestBody Transaction transaction) {
    return transactionManager.updateTransaction(transaction);
  }

  @DeleteMapping(value = "/transaction/{id}")
  public boolean deleteTransaction(@PathVariable int id) {
    return transactionManager.deleteTransaction(id);
  }

  @GetMapping(value = "/latesttransaction/{id}")
  public Transaction getLatestUserTransaction(@PathVariable int id) {
    return transactionManager.getLatestUserTransaction(id);
  }

  @GetMapping(value = "/popularTransactions")
  public LinkedHashMap<Integer, Integer> getPopularTransactions() {
    return transactionManager.getPopularTransactions();
  }
}
