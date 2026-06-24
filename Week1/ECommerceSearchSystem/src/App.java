public class App {
    public static void main(String[] args) throws Exception {

        Product p1 = new Product();
        p1.setProductId(101);
        p1.setProductName("Laptop");
        p1.setCategory("Electronics");

        Product p2 = new Product();
        p2.setProductId(102);
        p2.setProductName("Mouse");
        p2.setCategory("Electronics");

        Product p3 = new Product();
        p3.setProductId(103);
        p3.setProductName("Keyboard");
        p3.setCategory("Electronics");

        Product[] products = new Product[3];

        products[0] = p1;
        products[1] = p2;
        products[2] = p3;

        SearchOperations search = new SearchOperations();
        boolean findLinearSearch  = search.linearSearch(products, "mouse");
        // Linear search >> will take O(n)
        System.out.println("Linear Search result >>> "+findLinearSearch);

        boolean findBinarySearch = search.binarySearch(products, "keyboard");
        // Binary search >> will take O(log n)
        System.out.println("Binary Search results >>> "+findBinarySearch);
    }
}
