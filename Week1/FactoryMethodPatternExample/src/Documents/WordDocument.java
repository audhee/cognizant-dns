package Documents;
import interfaces.Display;

public class WordDocument implements Display {
    @Override
    public void display(String message){
        System.out.println("Word Document >>> "+message);
    }
}
