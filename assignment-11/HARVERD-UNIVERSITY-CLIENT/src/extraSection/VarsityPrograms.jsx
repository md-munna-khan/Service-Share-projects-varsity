

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.jpg';
import p6 from '../assets/p6.jpeg';

const programs = [
  {
    title: 'Computer Science',
    image: p1,
    year: '2024',
    batch: 'Batch A'
  },
  {
    title: 'Business Administration',
    image: p2,
    year: '2023',
    batch: 'Batch B'
  },
  {
    title: 'Mechanical Engineering',
    image: p3,
    year: '2025',
    batch: 'Batch C'
  },
  {
    title: 'Medicine',
    image: p4,
    year: '2022',
    batch: 'Batch D'
  },
  {
    title: 'Law',
    image: p5,
    year: '2024',
    batch: 'Batch E'
  },
  {
    title: 'Fine Arts',
    image: p6,
    year: '2023',
    batch: 'Batch F'
  },
];

const VarsityPrograms = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  });

  return (
    <div className="dark:bg-gradient-to-r  dark:from-yellow-900 my-10 dark:via-blue-900 dark:to-gray-500 py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-r from-gray-200 via-transparent/30 to-gray-300">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-6">
          Our Graduation Programs
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
          Discover our comprehensive range of graduation programs designed to equip you with the skills and knowledge for a successful career.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl dark:bg-gray-800"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative aspect-w-16 aspect-h-9">
                <img
                  className="rounded-t-lg w-full object-cover"
                  src={program.image}
                  alt={program.title}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{program.title}</h3>
                <h4 className="text-md font-semibold text-blue-600 mb-2">
                  Batch: {program.batch}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Graduation Year: {program.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VarsityPrograms;


