import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    { 
      quote: "Great partnership! They delivered high quality work on time and exceeded expectations.", 
      author: "CTO, TechCorp",
      rating: 5
    },
    { 
      quote: "Exceptional expertise in 3D and CAD development. Highly recommended!", 
      author: "VP Engineering, BuildSoft",
      rating: 5
    },
    { 
      quote: "Professional team with deep knowledge in BIM and data interoperability.", 
      author: "Director, ArchDesign",
      rating: 5
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, i) => (
        <div key={i} className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 reveal">
          <div className="flex mb-3">
            {[...Array(testimonial.rating)].map((_, idx) => (
              <Star key={idx} size={20} className="text-yellow-400 fill-current" />
            ))}
          </div>
          <div className="text-lg font-semibold mb-3 text-gray-800">"{testimonial.quote}"</div>
          <div className="text-sm text-gray-600 font-medium">{testimonial.author}</div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;

