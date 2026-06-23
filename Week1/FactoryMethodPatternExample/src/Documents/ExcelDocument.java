package Documents;
import interfaces.Display;

public class ExcelDocument implements Display{
    @Override
    public void display(String message){
        System.out.println("Excel Document >>> "+message);
    }
}
