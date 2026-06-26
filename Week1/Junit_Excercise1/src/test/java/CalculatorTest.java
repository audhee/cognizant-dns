import org.example.Calculator;
import org.junit.Test;
import static org.junit.Assert.*;

public class CalculatorTest {
    @Test
    public void testAddition(){
        Calculator c = new Calculator();
        assertEquals(5, c.add(2, 3));
    }
}
