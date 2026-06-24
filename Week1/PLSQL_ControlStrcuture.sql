/*
Tables that i assumed are: 

1. CUSTOMERS
    CustomerID
    CustomerName
    Age
    Balance
    IsVIP

2. LOANS
    LoanID
    CustomerID
    InterestRate
    DueDate
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