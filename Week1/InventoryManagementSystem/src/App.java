public class App {
    public static void main(String[] args) throws Exception {
        Operations operation = new Operations();
        operation.addProduct(1, "Laptop", 3, 59999);
        operation.productDetails(1);
        operation.updateProduct(1, "Laptop", 2, 65000);
        operation.productDetails(1);
        operation.deleteProduct(1);
    }
}
