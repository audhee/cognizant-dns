package Documents;
import interfaces.Display;

public class PdfDocument implements Display{
    @Override
    public void display(String message){
        System.out.println("Pdf Document >>> "+message);
    }
}
