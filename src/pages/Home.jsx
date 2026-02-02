const Home = () => {
  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Delicious food, delivered to your door 🍔🍕
        </h1>
        <p className="text-gray-600 text-lg">
          Order from your favorite restaurants with fast delivery.
        </p>
      </section>

      {/* Placeholder Sections */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">🍽️ Restaurants</h3>
          <p className="text-gray-600">
            Explore nearby restaurants and cuisines.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">📋 Menu</h3>
          <p className="text-gray-600">Browse menus with prices and offers.</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">🚴 Fast Delivery</h3>
          <p className="text-gray-600">Hot and fresh food delivered quickly.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
