import React from "react";
import { ArrowLeft, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/concept.jpg";

const Review = () => {
  const navigate = useNavigate();

  // Mock review data
  const reviews = [
    {
      id: 1,
      name: "Ahmad Mohammad",
      rating: 5,
      time: "More than a year ago",
      comment: "it was perfect",
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Sidebar (40% on desktop, full on mobile) */}
      <div className="w-full md:w-2/5 bg-gray-50 min-h-screen border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Reviews</h1>
        </div>

        {/* Leave Feedback Section */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-base font-medium text-gray-900 mb-2">
            Your opinion matters
          </h2>
          <button className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm">
            LEAVE FEEDBACK
          </button>
        </div>

        {/* Customer Reviews Section */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Customer reviews
            </h2>
            <button className="flex items-center text-red-500 hover:text-red-600 font-medium">
              View more
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {review.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">
                          {review.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No reviews yet.</p>
              <p className="text-gray-500 text-sm mt-1">
                Be the first to leave a review!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel (hidden on mobile, visible on md+) */}
      <div className="hidden md:block md:w-3/5 relative">
        <img
          src={heroImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Review;
