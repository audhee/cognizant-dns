import java.util.Arrays;

public class SearchOperations {
    public boolean linearSearch(Product p[], String target){
        for(Product pr: p){
            if(target.equalsIgnoreCase(pr.getProductName())){
                return true;
            }
        }
        return false;
    }
    public boolean binarySearch(Product p[], String target){
        Arrays.sort(p, (a, b) ->
            a.getProductName().compareToIgnoreCase(b.getProductName())
        );
        int left = 0;
        int right = p.length - 1;
        while(left <= right){
            int mid = left + (right - left) / 2;
            if(target.equalsIgnoreCase(p[mid].getProductName())){
                return true;
            }
            if(target.compareToIgnoreCase(p[mid].getProductName()) < 0){
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return false;
    }
}
