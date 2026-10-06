import LexiNavigation from "@/components/LexiNavigation";
import LexiOpening from "@/components/LexiOpening";
import FleenReveal from "@/components/FleenReveal";
import ThesisStatement from "@/components/ThesisStatement";
import FleenDemo from "@/components/FleenDemo";
import CapabilityNarrative from "@/components/CapabilityNarrative";
import ModelArchitecture from "@/components/ModelArchitecture";
import TechnicalDepth from "@/components/TechnicalDepth";
import BenchmarkEvidence from "@/components/BenchmarkEvidence";
import TechnicalSpecifications from "@/components/TechnicalSpecifications";
import InfrastructureSystem from "@/components/InfrastructureSystem";
import ResearchIndex from "@/components/ResearchIndex";
import FleenFuture from "@/components/FleenFuture";
import FinalStatement from "@/components/FinalStatement";

export default function Home() {
  return (
    <div id="top">
      <LexiNavigation />
      <main id="main">
        {/* Identity → spectacle */}
        <LexiOpening />
        <FleenReveal />
        {/* Spectacle → meaning */}
        <ThesisStatement />
        {/* Meaning → proof */}
        <FleenDemo />
        <CapabilityNarrative />
        {/* Foundation identity */}
        <ModelArchitecture />
        {/* Depth → evidence → spec */}
        <TechnicalDepth />
        <BenchmarkEvidence />
        <TechnicalSpecifications />
        {/* Trust → lab → continuity */}
        <InfrastructureSystem />
        <ResearchIndex />
        <FleenFuture />
      </main>
      {/* Closing frame */}
      <FinalStatement />
    </div>
  );
}
