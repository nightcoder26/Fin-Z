import React from "react";
import Navbar2 from "../components/Navbar2.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "../styles/NewEntry.css";
import { useState } from "react";
const NewEntry = () => {
  const userId = localStorage.getItem("userId");
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [text, setText] = useState("");

  const handleNavbarSelectedItem = (number) => {
    setSelectedNumber(number);
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "income",
    category: "other",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, type: value });
  };
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, category: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/transactions/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setText("Transaction added successfully");
        console.log("transaction added successfully");
        setFormData({
          title: "",
          description: "",
          date: "",
          type: "income",
          category: "other",
          amount: "",
        });
      } else {
        setText(data.message || "Transaction add failed");
        console.log("transaction add failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container-1">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Navbar2 n1="New-Entry" onSelected={handleNavbarSelectedItem} />
        <div className="new-entry-form">
          <form onSubmit={handleSubmit}>
            <h1>New Entry</h1>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                id="title"
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                value={formData.date}
                onChange={handleInputChange}
                type="datetime-local"
                id="date"
                name="date"
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="income">
                <input
                  type="radio"
                  id="income"
                  name="type"
                  value="income"
                  checked={formData.type === "income"}
                  onChange={handleRadioChange}
                />
                Income
              </label>
              <label htmlFor="expense">
                <input
                  type="radio"
                  id="expense"
                  name="type"
                  value="expense"
                  checked={formData.type === "expense"}
                  onChange={handleRadioChange}
                />
                Expense
              </label>
            </div> */}
            <div className="form-group">
              <label htmlFor="income">
                <input
                  type="radio"
                  id="income"
                  name="type"
                  value="income"
                  checked={formData.type === "income"}
                  onChange={handleRadioChange}
                />
                Income
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="expense">
                <input
                  type="radio"
                  id="expense"
                  name="type"
                  value="expense"
                  checked={formData.type === "expense"}
                  onChange={handleRadioChange}
                />
                Expense
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={handleCategoryChange}
                name="category"
              >
                <option value="salary">Salary</option>
                <option value="rent">Rent</option>
                <option value="groceries">Groceries</option>
                <option value="bills">Bills</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                value={formData.amount}
                onChange={handleInputChange}
                type="number"
                id="amount"
                name="amount"
              />
            </div>
            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
            <div className="form-group">
              <p>{text}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
