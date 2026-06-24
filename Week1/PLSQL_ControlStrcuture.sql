/*
    Problem statement: 
    Scenario 1: The bank wants to apply a discount to loan interest rates for customers above 60 years old.
    Question: Write a PL/SQL block that loops through all customers, checks their age, and if they are above 60, apply a 1% discount to their current loan interest rates.
    Scenario 2: A customer can be promoted to VIP status based on their balance.
    Question: Write a PL/SQL block that iterates through all customers and sets a flag IsVIP to TRUE for those with a balance over $10,000.
    Scenario 3: The bank wants to send reminders to customers whose loans are due within the next 30 days.
    Question: Write a PL/SQL block that fetches all loans due in the next 30 days and prints a reminder message for each customer.

Tables that i assumed are: 

1. CUSTOMERS              2. LOANS
    CustomerID               LoanID
    CustomerName             CustomerID
    Age                      Age
    Balance                  Balance
    IsVIP                    IsVIP
*/


-- Scenario 1: Update interest rates for senior customers

BEGIN
    FOR cust IN (
        SELECT CustomerID, Age
        FROM CUSTOMERS
    )
    LOOP
        IF cust.Age > 60 THEN
            UPDATE LOANS
            SET InterestRate = InterestRate - 1
            WHERE CustomerID = cust.CustomerID;
        END IF;
    END LOOP;

    COMMIT;
END;
/

-- Scenario 2: Mark customers as VIP based on their balance

BEGIN
    FOR cust IN (
        SELECT CustomerID, Balance
        FROM CUSTOMERS
    )
    LOOP
        IF cust.Balance > 10000 THEN
            UPDATE CUSTOMERS
            SET IsVIP = 'TRUE'
            WHERE CustomerID = cust.CustomerID;
        END IF;
    END LOOP;

    COMMIT;
END;
/

-- Scenario 3: Send reminders for loans due in the next 30 days

BEGIN
    FOR loan_rec IN (
        SELECT c.CustomerName,
               l.LoanID,
               l.DueDate
        FROM CUSTOMERS c
        JOIN LOANS l
        ON c.CustomerID = l.CustomerID
        WHERE l.DueDate <= SYSDATE + 30
    )
    LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Loan '
            || loan_rec.LoanID
            || ' for customer '
            || loan_rec.CustomerName
            || ' is due on '
            || loan_rec.DueDate
        );
    END LOOP;
END;
/