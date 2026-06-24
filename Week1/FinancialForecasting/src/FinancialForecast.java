public class FinancialForecast {
    public double predictValue(double currentValue, double growthRate, double years){
        if(years == 0){
            return currentValue;
        }
        double previousValue = predictValue(currentValue, growthRate, years-1);
        return previousValue*(1+growthRate);
    }
}
