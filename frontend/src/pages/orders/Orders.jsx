import { Link } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardLeftCol from "../../components/DashboardLeftCol";
import "../orders/orders.css";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../supaClient";
import { PiNotebookBold } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Audio } from 'react-loader-spinner';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");


  const ordersPerPage = 5;


  // Check if test emails exist
  const hasTestRecords = useMemo(() => {
    return orders.some((order) => order.email.includes("@instituteofsustainabilitystudies.com"))
  })



  // Function to pull data on real-time
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("date", { ascending: false });

        if (error) throw error;

        setOrders(data);

        // Update status to "Completed" after 10 minutes
        const timer = setTimeout(async () => {
          for (let order of data) {
            if (order.status !== "Completed") {
              try {
                // Update the status in Supabase
                const { error } = await supabase
                  .from("orders")
                  .update({ status: "Completed" })
                  .eq("id", order.id);

                if (error) throw error;

                // Update the local orders state
                setOrders((prevOrders) =>
                  prevOrders.map((o) =>
                    o.id === order.id ? { ...o, status: "Completed" } : o
                  )
                );
              } catch (updateError) {
                console.error(`Error updating status for order ID ${order.id}:`, updateError.message);
              }
            }
          }
        }, 10 * 60 * 1000); // 10 minutes in milliseconds

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timer);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle Search Filter
  const filteredOrders = useMemo(() => {
    if (!searchQuery) return orders;
    return orders.filter((order) =>
      `${order.firstname} ${order.lastname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  // Function to handle Pagination
  const currentOrders = useMemo(() => {
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    return filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  }, [filteredOrders, currentPage, ordersPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to Delete all Test records
  const deletetTestRecords = async () => {
    try {
      // Delete records with the test email in the Supabase database
      const { error } = await supabase
        .from("orders")
        .delete()
        .like("email", "%@instituteofsustainabilitystudies.com");
  
      if (error) throw error;
  
      // Update the local orders state by removing test records
      setOrders((prevOrders) =>
        prevOrders.filter(
          (order) =>
            !order.email.includes("@instituteofsustainabilitystudies.com")
        )
      );
  
    } catch (error) {
      console.log("Error while Deleting Test Records:", error.message);
    }
  };
  

  // Function to handle Order Delete from Supabase
  const handleDelete = async (orderId) => {
    try {
      const { error } = await supabase.from("orders").delete().eq("id", orderId);

      if (error) throw error

      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.log("Error while Deleting Order:", error.messsage)
    }
  }

  if (loading) return (
    <div className="loading-wrapper">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
  if (error) return <p>Error fetching orders: {error.message}</p>;

  return (
    <div className="orders-wrapper">
      <DashboardLeftCol />

      <div className="orders-rightCol">
        <DashboardHeader />
        <div className="rightcol-header-2">
          <Link to="/orders" className="rightcol-header-link">
            Purchased Courses
          </Link>
          <span className="rightcol-header-2-span">/ Dashboard</span>
        </div>

        <div className="table-wrapper">
          <div className="icon-text-wrapper">
            <div className="icon-wrapper">
              <PiNotebookBold size={30} color="#fff" />
            </div>
            <p>New Order List</p>
          </div>

          <div className="table-icon-form-wrapper">
            <div className="search-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={`test-records ${hasTestRecords ? "" : "disabled-test-btn"}`} onClick={deletetTestRecords}>
              Delete Test Records
            </div>
          </div>

          <div className="table-container">
            <div className="table-scrollable">
              <table className="table">
                <thead>
                  <tr>
                    <th className="fixed-column">Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.length > 0 ? (
                    currentOrders.map(order => (
                      <tr key={order.id}>
                        <td className="fixed-column">{order.firstname} {order.lastname}</td>
                        <td>{order.email}</td>
                        <td>{order.course}</td>
                        <td>{order.quantity}</td>
                        <td>{order.currency}{order.amount}</td>
                        <td><span className="status">{order.status}</span></td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td><span className="editBtn" onClick={() => handleDelete(order.id)}><RiDeleteBinLine size={20} /></span></td>
                      </tr>
                    ))
                  ) :
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No payments found.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(filteredOrders.length / ordersPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`pagination-button ${currentPage === i + 1 ? "active" : ""
                    }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;