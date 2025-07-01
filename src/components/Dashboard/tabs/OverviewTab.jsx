import React,{useEffect,useState} from "react";
import {api} from "../../../../services/api";
import {Loader} from "lucide-react";


const OverviewTab = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const data = await api.getManagerOverview();
        setOverview(data);
      } catch (err) {
        console.error("Failed to fetch overview", err);
        setError("Could not load manager overview");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manager Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-medium">Total Facilities</h3>
          <p className="text-2xl">{overview.totalFacilities}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-medium">Total Bookings</h3>
          <p className="text-2xl">{overview.totalBookings}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-medium">Pending Approvals</h3>
          <p className="text-2xl">{overview.pendingApprovals}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        {overview.notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul className="space-y-2">
            {overview.notifications.map((notif, idx) => (
              <li key={idx} className="bg-gray-50 p-2 rounded border">
                <p className="text-sm">{notif.message}</p>
                <p className="text-xs text-gray-500">
                  by {notif.user} | {new Date(notif.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
