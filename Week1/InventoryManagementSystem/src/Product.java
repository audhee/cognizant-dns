/*
productId, productName, quantity, and price.
*/
public class Product {
    private int productId;
    private String productName;
    private int quantity;
    private int price;
    public void setproductId(int productId){
        this.productId = productId;
    }
    public int getprodcutId(){
        return this.productId;
    }
    public void setproductName(String name){
        this.productName = name;
    }
    public String getproductName(){
        return this.productName;
    }
    public void setquantity(int quantity){
        this.quantity = quantity;
    }
    public int getquantity(){
        return this.quantity;
    }
    public void setprice(int price){
        this.price = price;
    }
    public int getprice(){
        return this.price;
    }
}
