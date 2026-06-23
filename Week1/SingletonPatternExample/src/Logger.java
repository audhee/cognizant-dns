public class Logger {
    private Logger(){
        System.out.println("Object created");
    }
    public static Logger instance = null;
    public static Logger getinstance(){
        if(instance == null){
            instance = new Logger();
        }
        return instance;
    }
}
