# **Project Overview: WiseMon**<br>
WiseMon is a feature-rich expense tracking and budget management web application. It offers users the ability to efficiently monitor their financial transactions, visualize data through interactive graphs, and manage budgets effectively. With a user-friendly interface and a focus on functionality, WiseMon helps users take control of their personal finances.

# Features

### 1. **User Authentication (Login Page)**<br>

![Screenshot_2024-11-27_10-44-16](https://github.com/user-attachments/assets/e47916ad-5b0e-4690-9017-dff57647fe40)


**Login Options**: Users can log in via email/password or using third-party authentication providers like Google and Apple.<br>
UI Design: The login page is minimalistic yet visually appealing, featuring a clear layout with a welcoming logo, tagline, and professional design.<br>

## 2.**Expense Dashboard**

![Screenshot_2024-11-27_10-45-04](https://github.com/user-attachments/assets/962b6687-26f3-498a-a1f4-ba1b402bca41)

**Graphical Insights:**<br>
Displays a line graph summarizing the user's expenses over time, providing clear financial trends.<br><br>
* **Category Breakdown:**
Lists expenses by categories (e.g., snacks, rent, fuel) and calculates the total expenditure.<br>
* **Expense Management Options:**
Features buttons to append new expenses and export data in formats like CSV and PDF.<br>
* **Expense Table:**
A well-organized table to display individual expense details such as description, amount, and category.

## **Add expense page**
![Screenshot_2024-11-27_10-45-25](https://github.com/user-attachments/assets/adcb0328-03d5-4017-8b93-5b40a3e98f4f)


## **Budget Management (Budget Page)**

![Screenshot_2024-11-27_10-46-15](https://github.com/user-attachments/assets/ff97132c-1a4b-485c-bc19-3a08dc4627e8)

**Savings Visualization:**
* **A donut chart**
   depicting the proportion of spending versus saving, with distinct color codes (green for savings, red for spending).<br>
Summary Panel:
Highlights key financial metrics, including spending, budget, and savings.<br>
* **Suggestions Panel:**
Offers tailored suggestions to reduce expenses and increase savings.<br>
* **Back Button:**
  Easy navigation to return to the previous dashboard.

![Screenshot_2024-11-27_10-46-33](https://github.com/user-attachments/assets/8dab52f6-8054-4038-96dd-839840d57e8a)

## **Technologies Used**
* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Authentication:** (under work)Firebase Authentication

## **Installation**
1. Clone repository
   ```
   git clone https://github.com/yourusername/WiseMon-Expense-Tracker.git
   cd WiseMon-Expense-Tracker
2. Install dependencies:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
3. Set up environment variables:
   * var to setup in backend file:
   ```
   PORT = 
   JWT_SECRECT = 
   Frontend_URL = 
   MONGO_URL =
   gemini_API =
   ```
  * var to setup in frontend
   ```
   VITE_URL =
   ```
4. Start the development servers:
   * Frontend:
     ```
     cd Frontend
     npm run dev
     ```
   * Backend
     ```
     cd Backend
     npm run dev
     ```
# Project Structure
 ```
WiseMon-Expense-Tracker/
├── Frontend/             # React frontend
├── Backend/              # Node.js backend
├── README.md   
```
 


   
