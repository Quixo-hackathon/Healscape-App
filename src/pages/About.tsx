import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-bg flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-healscape-text-primary mb-4">About HealScape</h1>
      <p className="text-lg text-healscape-text-secondary text-center max-w-2xl mb-8">
        HealScape is an innovative application designed to assist users in their recovery journey.
        Whether you're an adult focusing on environment scanning for helpful objects or a child
        creating fun stories about medicine, HealScape provides a unique and engaging experience.
      </p>
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-healscape-text-primary">Our Mission</h2>
        <p className="text-md text-healscape-text-secondary max-w-xl">
          To empower individuals with tools that make recovery more accessible, engaging, and personalized.
          We believe in leveraging technology to foster well-being and support healthy habits.
        </p>
        <h2 className="text-2xl font-semibold text-healscape-text-primary">Key Features</h2>
        <ul className="list-disc list-inside text-left text-md text-healscape-text-secondary max-w-xl mx-auto">
          <li>Environment Scanner: Identify helpful objects in your surroundings.</li>
          <li>Medicine Scanner (Child Mode): Create imaginative stories about medicines.</li>
          <li>Personalized Routines: Generate routines based on detected items.</li>
          <li>Interactive Player: Engage with your recovery routines.</li>
          <li>User-friendly Interface: Designed for ease of use and accessibility.</li>
        </ul>
      </div>
      <Link to="/" className="mt-10">
        <button className="bg-healscape-teal hover:bg-healscape-teal/90 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default About;