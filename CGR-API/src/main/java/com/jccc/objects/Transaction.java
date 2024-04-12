package com.jccc.objects;

/**
 * Object representing a transaction.
 *
 * @author Mikey Dowsett
 */
public class Transaction {
  public int transactionId;
  public int drinkId;
  public int customerId;
  public int price;
  public int points;

  public int getTransactionId() {
    return transactionId;
  }

  public void setTransactionId(int transactionId) {
    this.transactionId = transactionId;
  }

  public int getDrinkId() {
    return drinkId;
  }

  public void setDrinkId(int drinkId) {
    this.drinkId = drinkId;
  }

  public int getCustomerId() {
    return customerId;
  }

  public void setCustomerId(int customerId) {
    this.customerId = customerId;
  }

  public int getPrice() {
    return price;
  }

  public void setPrice(int price) {
    this.price = price;
  }

  public int getPoints() {
    return points;
  }

  public void setPoints(int points) {
    this.points = points;
  }

  /**
   * Constructor.
   */
  public Transaction(int transactionId, int drinkId, int customerId, int price, int points) {
    super();
    this.transactionId = transactionId;
    this.drinkId = drinkId;
    this.customerId = customerId;
    this.price = price;
    this.points = points;
  }

  @Override
  public String toString() {
    return "Transaction [transactionId=" + transactionId
        + ", drinkId=" + drinkId + ", customerId=" + customerId + ", price=" + price + ", points=" + points +"]";
  }
}