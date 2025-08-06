import {
  UserPlusIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const HowItWorks = () => {
  const userSteps = [
    {
      icon: <UserPlusIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
      title: "Register / Login",
      description: "Create an account or sign in to get started on the platform.",
    },
    {
      icon: <MagnifyingGlassIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
      title: "Search & Book",
      description: "Find and reserve the perfect facility using our smart search tools.",
    },
    {
      icon: <CalendarDaysIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
      title: "Enjoy Your Booking",
      description: "Check in and enjoy your experience with ease and confidence.",
    },
  ];

  const managerSteps = [
    {
      icon: <UserPlusIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />,
      title: "Register / Login",
      description: "Create a facility manager account or sign in to manage your listings.",
    },
    {
      icon: <BuildingOfficeIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />,
      title: "List Your Facility",
      description: "Add facility details, images, and availability to go live.",
    },
    {
      icon: <CurrencyDollarIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />,
      title: "Manage Bookings & Earn",
      description: "Approve bookings, manage schedules, and generate income.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Users Flow */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">How It Works for Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userSteps.map((step, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-gray-200 shadow hover:shadow-md transition"
              >
                {step.icon}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Managers Flow */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">How It Works for Facility Managers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {managerSteps.map((step, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-gray-200 shadow hover:shadow-md transition"
              >
                {step.icon}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
