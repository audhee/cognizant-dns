import java.util.*;
public class Operations {
    HashMap<Integer, Product> inventory = new HashMap<>();
    public void addProduct(int productId, String productName, int quantity, int price){
        Product p = new Product();
        p.setproductId(productId);
        p.setproductName(productName);
        p.setquantity(quantity);
        p.setprice(price);
        inventory.put(productId, p);
        System.out.println("Product Added successfully");
    }

    public void updateProduct(int productId, String productName, int quantity, int price){
        if(!inventory.containsKey(productId)){
            System.out.println("Product doesn't even exists in the first place");
            return;
        }
        Product p = inventory.get(productId);
        p.setproductId(productId);
        p.setprice(price);
        p.setquantity(quantity);
        p.setproductName(productName);
        System.out.println("Product updated successfully");
    }

    public void deleteProduct(int productId){
        System.out.println("Product "+inventory.get(productId).getproductName()+" removed successfully");
        inventory.remove(productId);
    }

    public void productDetails(int productId){
        if(!inventory.containsKey(productId)){
            System.out.println("Product not found");
            return;
        }
        System.out.println("Product Name >>> "+ inventory.get(productId).getproductName());
        System.out.println("Product Price >>> "+ inventory.get(productId).getprice());
        System.out.println("Product Price >>> "+ inventory.get(productId).getquantity());
    }
}
