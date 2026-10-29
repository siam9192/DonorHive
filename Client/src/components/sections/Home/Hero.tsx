import { FaPlayCircle } from "react-icons/fa";
import "../../../styles/Hero.css";
import Container from "../../container/Container";
import HeroSearchForm from "../../forms/HeroSearchForm";
import VideoPopup from "../../ui/VideoPopup";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero relative isolate overflow-hidden text-white">
      <Container>
        <div className="grid min-h-[680px] items-center gap-12 py-16 lg:min-h-[760px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
          <div className="max-w-2xl space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium tracking-wide text-white backdrop-blur-sm">
              <span className="size-2 rounded-full bg-secondary" />
              Give a little. Change a lot.
            </p>
            <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
              Habitat for <span className="text-secondary">Humanity</span> Donations
            </h1>
            <p className="max-w-xl text-base leading-7 text-white/80 font-secondary md:text-lg">
              Habitat for Humanity accepts donations to help build affordable housing for families
              in need. Contributions can be monetary, building materials, or gently used household
              items through Habitat ReStores. Donations support local and global housing projects,
              creating safe and stable homes.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/campaigns"
                className="inline-flex items-center justify-center rounded-full bg-secondary px-7 py-3.5 font-semibold text-slate-950 shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore campaigns
              </Link>
              <VideoPopup>
                <button
                  type="button"
                  className="inline-flex items-center gap-3 rounded-full px-3 py-2 text-white/90 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="flex size-11 items-center justify-center rounded-full border border-white/50 text-xl text-secondary">
                    <FaPlayCircle />
                  </span>
                  <span className="font-medium">Watch our story</span>
                </button>
              </VideoPopup>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroSearchForm />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
