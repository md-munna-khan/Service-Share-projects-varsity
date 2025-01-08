import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const Subscription = () => {
  const {isDark}=useContext(AuthContext)
  const plans = [
    {
      id: 1,
      title: "Basic Plan",
      price: "$19/month",
      description:
        "Access to a selection of online courses and study materials.",
      features: [
        "Access to basic courses",
        "Study material downloads",
        "Email support",
        "Limited course certifications",
      ],
    },
    {
      id: 2,
      title: "Standard Plan",
      price: "$39/month",
      description:
        "Includes all services from the Basic plan plus access to more advanced courses and resources.",
      features: [
        "Access to basic and advanced courses",
        "Study material downloads",
        "Priority email support",
        "Course certifications",
        "Webinars and workshops",
      ],
    },
    {
      id: 3,
      title: "Premium Plan",
      price: "$59/month",
      description:
        "Unlimited access to all courses with personalized tutoring and exclusive resources.",
      features: [
        "Access to all courses",
        "Unlimited study material downloads",
        "24/7 personalized tutoring",
        "Exclusive webinars and workshops",
        "One-on-one mentorship",
      ],
    },
  ];

  return (
    <div className={` ${isDark?'bg-gray-800 text-white':''}bg-gray-100  dark:bg-gray-900 my-10 min-h-screen p-8`}>
      <header className="text-center mb-12">
        <h1 className="text-4xl  font-semibold ">
          University Subscription Plans
        </h1>
        <p className="text-lg  mt-2">
          Elevate your academic journey with our subscription plans.
        </p>
      </header>

      <section className="text-center mb-16">
        <h2 className="text-3xl  font-semibold  mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg  ">
          Select the plan that best suits your academic needs.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:px-12 place-items-center">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800"
            data-aos="fade-up"
            data-aos-delay={`${plan.id * 200}`}
            data-aos-duration="800"
          >
            <div className=" specialGradient text-white p-4 text-center">
              <h2 className="text-2xl font-semibold">{plan.title}</h2>
              <p className="text-xl">{plan.price}</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {plan.description}
              </p>
              <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-gray-50 text-center dark:bg-gray-700">
              <button className=" specialGradient text-white py-2 px-4 rounded-full hover:bg-blue-600 transition">
                Sign Up
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
