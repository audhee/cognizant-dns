/*
    Stored Procedures in PL/SQL
    Scenario 1: The bank needs to process monthly interest for all savings accounts.
    Question: Write a stored procedure ProcessMonthlyInterest that calculates and updates the balance of all savings accounts by applying an interest rate of 1% to the current balance.

    Scenario 2: The bank wants to implement a bonus scheme for employees based on their performance.
    Question: Write a stored procedure UpdateEmployeeBonus that updates the salary of employees in a given department by adding a bonus percentage passed as a parameter.

    Scenario 3: Customers should be able to transfer funds between their accounts.
    Question: Write a stored procedure TransferFunds that transfers a specified amount from one account to another, checking that the source account has sufficient balance before making the transfer.

*/


-- Scenario 1:  Process Monthly Interest


CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
IS
BEGIN

    UPDATE Accounts
    SET Balance = Balance + (Balance * 0.01)
    WHERE Account_Type = 'Savings';

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Monthly interest applied successfully.');

END;
/

-- Scenario 2:  Update Employee Bonus

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus
(
    p_department IN VARCHAR2,
    p_bonus_percent IN NUMBER
)
IS
BEGIN

    UPDATE Employees
    SET Salary = Salary + (Salary * p_bonus_percent / 100)
    WHERE Department = p_department;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Employee bonus updated successfully.');

END;
/

-- Scenario 3:  Transfer Funds


CREATE OR REPLACE PROCEDURE TransferFunds
(
    p_from_account IN NUMBER,
    p_to_account IN NUMBER,
    p_amount IN NUMBER
)
IS

    v_balance NUMBER;

BEGIN

    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE Account_ID = p_from_account;

    IF v_balance >= p_amount THEN

        UPDATE Accounts
        SET Balance = Balance - p_amount
        WHERE Account_ID = p_from_account;

        UPDATE Accounts
        SET Balance = Balance + p_amount
        WHERE Account_ID = p_to_account;

        COMMIT;

        DBMS_OUTPUT.PUT_LINE('Funds transferred successfully.');

    ELSE

        DBMS_OUTPUT.PUT_LINE('Insufficient Balance.');

    END IF;

EXCEPTION

    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Account not found.');

    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);

END;
/

-- Execute Scenario 1

BEGIN
    ProcessMonthlyInterest;
END;
/

-- Execute Scenario 2

BEGIN
    UpdateEmployeeBonus('IT',10);
END;
/

-- Execute Scenario 3

BEGIN
    TransferFunds(101,102,5000);
END;
/

-- Verifying the results
SELECT * FROM Accounts;

SELECT * FROM Employees;