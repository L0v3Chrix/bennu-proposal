import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import JourneyTracker from "@/components/shared/JourneyTracker";
import Hero from "@/components/onboard/Hero";
import OnboardForm from "@/components/onboard/OnboardForm";
import { BENNU_CLIENT } from "@/lib/config";

export const metadata = {
  title: `Onboarding — ${BENNU_CLIENT.companyName} | Genesis Labs`,
};

export default function OnboardPage() {
  return (
    <>
      <JourneyTracker page="/onboard/bennu-coffee" label="Onboarding Portal" />
      <NavBar clientName={BENNU_CLIENT.companyName} />
      <Hero />
      <OnboardForm />
      <Footer />
    </>
  );
}
