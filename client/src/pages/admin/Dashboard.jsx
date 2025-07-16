import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import "../../Style/AdminDashboard.css";

const AnimatedCard = ({ title, value }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="admin-card"
  >
    <h3>{title}</h3>
    <p>{value}</p>
  </motion.div>
);

export const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    books: 0,
    rented: 0,
    reviews: 0,
  });
  const [ratingData, setRatingData] = useState([]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, booksRes, rentedRes, reviewsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/users/all", { headers }),
        axios.get("http://localhost:5000/api/books", { headers }),
        axios.get("http://localhost:5000/api/rent/admin/all", { headers }),
        axios.get("http://localhost:5000/api/reviews/book/all", { headers }),
      ]);

      setStats({
        users: Array.isArray(usersRes.data) ? usersRes.data.length : (usersRes.data.users?.length || 0),
        books: Array.isArray(booksRes.data) ? booksRes.data.length : (booksRes.data.books?.length || 0),
        rented: rentedRes.data.rents?.length || 0,
        reviews: reviewsRes.data.reviews?.length || 0,
      });

      // Line Chart Data: Average Rating Per Book
      const reviews = reviewsRes.data.reviews || [];
      const ratingMap = {};

      reviews.forEach(({ bookTitle, rating }) => {
        if (!ratingMap[bookTitle]) {
          ratingMap[bookTitle] = { total: 0, count: 0 };
        }
        ratingMap[bookTitle].total += rating;
        ratingMap[bookTitle].count += 1;
      });

      const ratingArray = Object.entries(ratingMap).map(([bookTitle, data]) => ({
        name: bookTitle,
        averageRating: (data.total / data.count).toFixed(2),
      }));

      setRatingData(ratingArray);
    } catch (error) {
      console.error("❌ Failed to fetch dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const pieData = [
    { name: "Users", value: stats.users },
    { name: "Books", value: stats.books },
    { name: "Rented Books", value: stats.rented },
    { name: "Reviews", value: stats.reviews },
  ];

  const barData = [
    {
      name: "Counts",
      Users: stats.users,
      Books: stats.books,
      Rented: stats.rented,
      Reviews: stats.reviews,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>

      {/* Cards */}
      <div className="admin-dashboard-grid">
        <AnimatedCard title="Total Users" value={stats.users} />
        <AnimatedCard title="Total Books" value={stats.books} />
        <AnimatedCard title="Rented Books" value={stats.rented} />
        <AnimatedCard title="Total Reviews" value={stats.reviews} />
      </div>

      {/* Charts */}
      <div className="dashboard-charts">
        {/* Pie Chart */}
        <div className="chart-box">
          <h3 className="chart-title">Data Distribution (Pie)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="chart-box">
          <h3 className="chart-title">Counts Overview (Bar)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Users" fill="#0088FE" />
              <Bar dataKey="Books" fill="#00C49F" />
              <Bar dataKey="Rented" fill="#FFBB28" />
              <Bar dataKey="Reviews" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Rating */}
        <div className="chart-box">
          <h3 className="chart-title">Average Rating per Book</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} allowDecimals />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="averageRating" stroke="#FF6384" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
