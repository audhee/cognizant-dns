package factories;
import Documents.ExcelDocument;
import interfaces.Display;

public class Excelfactory extends DocumentFacotry{
    @Override
    public Display createDocument(){
        System.out.println("Creating Excel document of type: ");
        return new ExcelDocument();
    }
}
