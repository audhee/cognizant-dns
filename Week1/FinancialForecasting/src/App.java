public class App {
    public static void main(String[] args) throws Exception {
        // System.out.println("Hello, World!");

        FinancialForecast financialForecast = new FinancialForecast();
        double result = financialForecast.predictValue(5000, 0.14, 3);
        System.out.println("Results >>> "+result);

    }
}
