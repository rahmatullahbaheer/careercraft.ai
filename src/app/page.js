import Navbar from "./(guest)/Navbar";
import Header from "./(guest)/Header";
import About from "./(guest)/About";
import Services from "./(guest)/Services";
import Fqs from "./(guest)/Fqs";
import Price from "./(guest)/Price";
import Footer from "./(guest)/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Services />
      <Fqs />
      <Price />
      <Footer />
    </>
  );
}
