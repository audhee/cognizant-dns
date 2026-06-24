class Product{
    private int productId;
    private String productName;
    private String category;
    public void setProductId(int id){
        this.productId = id;
    }
    public void setProductName(String name){
        this.productName = name;
    }
    public void setCategory(String name){
        this.category = name;
    }
    public int getProductId(){
        return this.productId;
    }
    public String getProductName(){
        return this.productName;
    }
    public String getCategory(){
        return this.category;
    }
}