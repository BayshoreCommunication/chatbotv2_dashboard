import { auth } from "@/auth";
import BlogSection from "@/components/landingPage/home/BlogSection";
import ContactForm from "@/components/landingPage/home/ContactForm";
import FAQSection from "@/components/landingPage/home/FAQSection";
import HeroSection from "@/components/landingPage/home/HeroSection";
import HowItsWork from "@/components/landingPage/home/HowItsWork";
import IndustriesSections from "@/components/landingPage/home/IndustriesSections";
import TrustedByBusiness from "@/components/landingPage/home/TrustedByBusiness";
import LandingPage from "@/components/landingPage/MainPage";
import SubscriptionSection from "@/components/landingPage/SubscriptionSection";

const page = async () => {
  const session = await auth();

  // Transform session to match LandingPage's expected type
  const transformedSession = session
    ? {
        user: session.user
          ? {
              id: session.user.id,
              email: session.user.email,
              name: session.user.name === null ? undefined : session.user.name,
            }
          : undefined,
      }
    : null;

     // Authentication State
  const isAuthenticated = !!session?.user;
  const user = session?.user || null;

  return (
    <div className="mt-16">
      {/* <LandingPage session={transformedSession} /> */}
      <HeroSection/>
      <TrustedByBusiness/>
      <IndustriesSections/>
      <HowItsWork/>
      <SubscriptionSection isAuthenticated={isAuthenticated} user={user} />
      <FAQSection/>
      <BlogSection/>
      <ContactForm/>
    </div>
  );
};

export default page;
