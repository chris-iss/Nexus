import { Link } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardLeftCol from "../../components/DashboardLeftCol";
import "../payments/Payments.css";
import { GiCash } from "react-icons/gi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../supaClient";
import { Audio } from 'react-loader-spinner';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchPayment, setSearchPayment] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const paymentsPerPage = 5;

    // Fetch payments data
    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.from("payments").select("*");
                if (error) throw error;

                setPayments(data);
            } catch (err) {
                console.error("Error Fetching Data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    // Filter payments based on search input
    const filterPayments = useMemo(() => {
        if (!searchPayment) return payments;

        return payments.filter((payment) =>
            payment.name?.toLowerCase().includes(searchPayment.toLowerCase())
        );
    }, [payments, searchPayment]);

    // Paginate filtered payments
    const currentPayments = useMemo(() => {
        const IndexOfLastPayment = currentPage * paymentsPerPage;
        const IndexOfFirstPayment = IndexOfLastPayment - paymentsPerPage;
        return filterPayments.slice(IndexOfFirstPayment, IndexOfLastPayment);
    }, [filterPayments, currentPage, paymentsPerPage]);

    // Function to handle Delete action
    const handleDelete = async (paymentId) => {
        try{
            const { error } = await supabase.from("payments").delete().eq("id", paymentId);

            if (error) throw error;

            setPayments((prevPayment) => prevPayment.filter((payment) => payment.id !== paymentId));
        }catch(error) {
            console.log("Error trying to delete row", error)
        }
    }

    // Handle pagination click
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

    if (error) {
        return <div className="error">{`Error Fetching Payment Data: ${error.message}`}</div>;
    }

    return (
        <div className="payments-wrapper">
            <DashboardLeftCol />

            <div className="payment-rightCol">
                <DashboardHeader />
                <div className="rightcol-header-2">
                    <Link to="/orders" className="rightcol-header-link">
                        Payments
                    </Link>
                    <span className="rightcol-header-2-span">/ Dashboard</span>
                </div>

                <div className="table--container">
                    <div className="icon-text-wrapper">
                        <div className="icon-wrapper">
                            <GiCash size={30} color="#fff" />
                        </div>
                        <p>Course Payments</p>
                    </div>

                    {/* Search Input */}
                    <div className="table-icon-form-wrapper">
                        <div className="search-wrapper">
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Search orders..."
                                value={searchPayment}
                                onChange={(e) => setSearchPayment(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Payments Table */}
                    <div className="table-scrollable">
                        <table className="table_">
                            <thead>
                                <tr>
                                    <th className="fixed-column">Fullname</th>
                                    <th>Amount</th>
                                    <th>Description</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentPayments.length > 0 ? (
                                    currentPayments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="fixed-column">{payment.name}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.description}</td>
                                            <td>{payment.email}</td>
                                            <td>{payment.date}</td>
                                            <td><span className="deleteBtn" onClick={() => handleDelete(payment.id)}><RiDeleteBinLine size={20} /></span></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center" }}>
                                            No payments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="pagination" aria-label="Pagination">
                    {Array.from(
                        { length: Math.ceil(filterPayments.length / paymentsPerPage) },
                        (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
                                aria-current={currentPage === i + 1 ? "page" : undefined}
                                aria-label={`Go to page ${i + 1}`}
                            >
                                {i + 1}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Payments;
