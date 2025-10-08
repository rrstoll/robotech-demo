import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import RobotCategories from "@/components/RobotCategories";
import RentalPlans from "@/components/RentalPlans";
import CustomerStories from "@/components/CustomerStories";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main 
        id="main-content"
        className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black"
        role="main"
        aria-label="Main content"
      >
        <Hero />
        <HowItWorks />
        <RobotCategories />
        <RentalPlans />
        <CustomerStories />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
