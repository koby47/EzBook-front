const FeaturesSection = () => {
  const features = [
    { title: "Conference Rooms", description: "Spacious, tech-ready rooms for meetings and events." },
    { title: "Sports Facilities", description: "Book pitches, courts, and gyms with real-time availability." },
    { title: "Event Halls", description: "Perfect venues for weddings, parties, and conferences." },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Explore Our Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
