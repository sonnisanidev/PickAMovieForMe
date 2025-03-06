import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Pick A Movie For Me
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal movie recommendation companion that understands your mood
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* How It Works */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">1️⃣</div>
                <h3 className="font-semibold mb-2">Select Your Mood</h3>
                <p className="text-gray-600">
                  Choose how you're feeling from our mood selection interface
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">2️⃣</div>
                <h3 className="font-semibold mb-2">Get Recommendations</h3>
                <p className="text-gray-600">
                  Our algorithm finds movies that match your current mood
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">3️⃣</div>
                <h3 className="font-semibold mb-2">Watch & Enjoy</h3>
                <p className="text-gray-600">
                  View trailers and find where to watch your chosen movie
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <span className="text-xl">🎭</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Mood-Based Selection</h3>
                  <p className="text-gray-600">
                    Our unique algorithm matches movies to your current mood
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <span className="text-xl">🎬</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Genre Filtering</h3>
                  <p className="text-gray-600">
                    Further refine recommendations by your preferred genres
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <span className="text-xl">🎥</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Movie Details</h3>
                  <p className="text-gray-600">
                    Comprehensive information including ratings, cast, and reviews
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <span className="text-xl">🎦</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Trailers & Links</h3>
                  <p className="text-gray-600">
                    Watch trailers and find where to stream your chosen movies
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Powered By */}
          <section className="text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Powered by TMDB
            </h2>
            <p className="text-gray-600 mb-4">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
              alt="TMDB Logo"
              className="h-8 mx-auto"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
