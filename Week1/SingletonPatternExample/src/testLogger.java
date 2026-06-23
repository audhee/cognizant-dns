public class testLogger {
    public void testingLogger(){
        Logger l1 = Logger.getinstance();
        Logger l2 = Logger.getinstance();
        System.out.println(l1 == l2);
        if(l1 == l2){
            System.out.println("Logger class is a singleton class");
        } else {
            System.out.println("Logger class is not a singleton class");
        }
    }
}
