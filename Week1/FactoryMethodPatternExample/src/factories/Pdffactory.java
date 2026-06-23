package factories;
import Documents.PdfDocument;
import interfaces.Display;

public class Pdffactory extends DocumentFacotry{
    @Override
    public Display createDocument(){
        System.out.println("Creating Pdf Document");
        return new PdfDocument();
    }
}
