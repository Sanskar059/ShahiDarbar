import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/myorders`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("delivered")) return 4;
    if (s.includes("shipped") || s.includes("out for delivery")) return 3;
    if (s.includes("packed") || s.includes("preparing")) return 2;
    if (s.includes("processing") || s.includes("pending")) return 1;
    return 1;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-container-lowest flex justify-center items-center">
        <h1 className="text-3xl font-bold text-on-surface uppercase tracking-widest">
          Loading Orders...
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest min-h-screen px-6 py-24">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">[ HISTORY ]</span>
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface uppercase tracking-tighter mt-2">
            My Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-surface-container-low p-10 rounded-3xl border border-outline-variant text-center">
            <h2 className="text-2xl font-bold text-on-surface-variant uppercase tracking-widest">
              No Orders Yet
            </h2>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => {
              const items = order.products || order.orderItems || [];
              const amount = order.totalAmount || order.totalPrice || 0;
              const payment = order.paymentStatus || (order.isPaid ? "Paid" : "Pending");
              const status = order.orderStatus || "Processing";
              const currentStep = getStatusIndex(status);

              return (
                <div key={order._id} className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                  {/* TOP HEADER */}
                  <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 border-b border-surface-container-highest pb-6">
                    <div>
                      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Order ID</span>
                      <p className="font-bold text-on-surface text-lg break-all uppercase tracking-wider">{order._id}</p>
                      <p className="mt-1 text-sm font-semibold text-on-surface-variant uppercase">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-3xl font-bold text-on-surface">₹{amount}</p>
                      <div className="flex gap-3 mt-2 flex-wrap">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${payment === "Paid" ? "bg-luxury-gold text-primary border-luxury-gold" : "bg-error-container text-on-error-container border-error"
                          }`}>
                          {payment}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ORDER TRACKING TIMELINE */}
                  <div className="py-12 px-2 md:px-8 overflow-x-auto">
                    <div className="flex items-center justify-between relative min-w-[500px]">
                      {/* Background Line */}
                      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-container-high -translate-y-1/2 z-0"></div>

                      {/* Progress Line */}
                      <div
                        className="absolute top-1/2 left-0 h-[2px] bg-luxury-gold -translate-y-1/2 z-0 transition-all duration-1000"
                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                      ></div>

                      {[
                        { step: 1, label: "Order Placed" },
                        { step: 2, label: "Packed" },
                        { step: 3, label: "Shipped" },
                        { step: 4, label: "Delivered" }
                      ].map((item) => (
                        <div key={item.step} className="relative z-10 flex flex-col items-center gap-3 bg-surface-container-lowest px-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 border-2 ${currentStep > item.step ? "bg-luxury-gold border-luxury-gold text-primary" :
                              currentStep === item.step ? "bg-primary text-luxury-gold border-primary ring-4 ring-luxury-gold/30" :
                                "bg-surface-container-lowest border-outline-variant text-outline-variant"
                            }`}>
                            {currentStep > item.step ? "✓" : item.step}
                          </div>
                          <span className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap ${currentStep >= item.step ? "text-on-surface" : "text-outline-variant"}`}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PRODUCTS LIST */}
                  <div className="border-t border-surface-container-highest pt-6">
                    <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-4 block">Ordered Items</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl border border-surface-container-highest">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-highest flex-shrink-0 border border-outline-variant">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover opacity-90"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-on-surface uppercase text-sm">{item.name}</p>
                            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-on-surface text-lg">₹{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
