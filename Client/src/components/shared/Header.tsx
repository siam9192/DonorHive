import Container from "../container/Container";
import { FaDonate, FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import ResponsiveNavbar from "../ui/ResponsiveNavbar";
import LoginPopup from "../ui/LoginPopup";
import NavShortcut from "../ui/NavShortcut";
import { useCurrentUser } from "../../provider/CurrentUserProvider";
import NotificationBar from "../ui/NotificationBar";
import RandomDonate from "../ui/RandomDonate";
const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Campaigns",
    href: "/campaigns",
  },
  {
    name: "About Us",
    href: "/about-us",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];

const Header = () => {
  const { user, isLoading } = useCurrentUser();

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-emerald-950 py-2 text-emerald-50 hidden lg:block">
        <Container>
          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
            <p>Small acts of generosity create lasting change.</p>
            <Link to="/campaigns" className="font-medium text-amber-300 transition hover:text-white">
              Find a cause <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </div>
      <div className="border-b border-slate-200/80 bg-white/95 py-3 shadow-sm backdrop-blur-md md:py-4">
        <Container>
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3" aria-label="DonorHive home">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-xl text-white shadow-md shadow-primary/20 md:size-12 md:text-2xl">
                <FaDonate />
              </span>
              <span className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                Donor<span className="text-primary">Hive</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              {navLinks.map((item) => (
                <NavLink
                  to={item.href}
                  key={item.name}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-slate-600 hover:bg-slate-50 hover:text-emerald-800"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <RandomDonate />
              {!isLoading ? (
                user ? (
                  <>
                    <NavShortcut />
                    <NotificationBar />
                  </>
                ) : (
                  <LoginPopup>
                    <button className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-emerald-700">
                      <span className="text-lg">
                        <FaUser />
                      </span>
                      <span className="hidden md:block">Login / Register</span>
                    </button>
                  </LoginPopup>
                )
              ) : null}

              <ResponsiveNavbar />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
