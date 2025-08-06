import { motion } from "framer-motion";
import {
  Building2,
  Dumbbell,
  Users,
  Tv,
  Upload,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const userFeatures = [
  {
    icon: <Building2 className="w-8 h-8 text-blue-600" />,
    title: "Conference Rooms",
    description:
      "Book well-equipped rooms for business meetings, seminars, and corporate events.",
  },
  {
    icon: <Dumbbell className="w-8 h-8 text-gray-600" />,
    title: "Sports Facilities",
    description:
      "Reserve courts and spaces for your sports and recreational activities.",
  },
  {
    icon: <Tv className="w-8 h-8 text-gray-600" />,
    title: "Event Spaces",
    description: "Perfect venues for weddings, parties, and exhibitions.",
  },
  {
    icon: <Users className="w-8 h-8 text-gray-500" />,
    title: "Training Centers",
    description:
      "Ideal for workshops, training sessions, and educational programs.",
  },
];

const managerFeatures = [
  {
    icon: <Upload className="w-8 h-8 text-green-600" />,
    title: "List Facilities",
    description:
      "Easily list and showcase your facility to a wider audience.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-indigo-600" />,
    title: "Manage Bookings",
    description:
      "View, manage, and respond to booking requests in real-time.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* Users Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            For Users
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find and book the perfect facility for any occasion—sports, training, events, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {userFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons for Users */}
        <div className="flex justify-center gap-6 mb-20">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition"
          >
            <LogIn size={18} />
            Sign In
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-medium rounded-full hover:bg-gray-900 transition"
          >
            <UserPlus size={18} />
            Register
          </Link>
        </div>

        {/* Facility Managers Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            For Facility Managers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Showcase your space, manage bookings, and grow your business effortlessly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-12">
          {managerFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons for Managers */}
        <div className="flex justify-center gap-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition"
          >
            <LogIn size={18} />
            Sign In
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-medium rounded-full hover:bg-gray-700 transition"
          >
            <UserPlus size={18} />
            Register
          </Link>
        </div>

      </div>
    </section>
  );
}
