import factories.DocumentFacotry;
import factories.Excelfactory;
import factories.Pdffactory;
import factories.Wordfactory;
import interfaces.Display;

public class App {
    public static void main(String[] args) throws Exception {
        // Creating Excel
        DocumentFacotry excelfactory = new Excelfactory();
        Display excelDocument = excelfactory.createDocument();
        excelDocument.display("This is a excel file");
        // Creating PDF
        DocumentFacotry pdffacotry = new Pdffactory();
        Display pdfDocument = pdffacotry.createDocument();
        pdfDocument.display("This is a pdf Document");

        // Creating Word 
        DocumentFacotry wordfacotry = new Wordfactory();
        Display wordDocument = wordfacotry.createDocument();
        wordDocument.display("This is a word Document");

    }
}
