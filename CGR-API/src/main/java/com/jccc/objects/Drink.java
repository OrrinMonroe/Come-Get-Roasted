package com.jccc.objects;

/**
 * Class drink represents a drink object.
 */
public class Drink {
  private int id;
  private String name;
  private float price;
  private String img;
  private String description;
  private String category;
  
  /**
   * Constructor for the drinks object.
   */
  public Drink(int id, String name, float price, String img, String description, String category) {
    super();
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
    this.description = description;
    this.category = category;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public float getPrice() {
    return price;
  }

  public void setPrice(float price) {
    this.price = price;
  }

  public String getImg() {
    return img;
  }

  public void setImg(String img) {
    this.img = img;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }
  
  @Override
  public String toString() {
    return "Drink [id=" + id + ", name=" + name + ", price=" + price + ", "
        + "image=" + img + "description=" + description + ", category="
        + category + "]";
  }
}
