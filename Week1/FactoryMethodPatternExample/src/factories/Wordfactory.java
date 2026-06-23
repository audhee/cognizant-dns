package factories;
import Documents.WordDocument;
import interfaces.Display;

public class Wordfactory extends DocumentFacotry{
    @Override
    public Display createDocument(){
        System.out.println("Creating the word document ");
        return new WordDocument();
    }
}
