const HowItWorks = () => {
  const steps = [
    { title: "Search", description: "Find the facility that fits your need using our powerful search." },
    { title: "Book", description: "Reserve instantly with our seamless booking process." },
    { title: "Enjoy", description: "Arrive, check in, and enjoy your facility experience." },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="p-6 rounded-lg border border-gray-200">
              <div className="text-4xl font-bold text-blue-500 mb-4">{i + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
