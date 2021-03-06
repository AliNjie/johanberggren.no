import Logo from "components/Logo"
import cx from "classnames"
import { AnimatePresence, motion, Variants } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/dist/client/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useScroll } from "hooks/useScroll"

type Props = {
  textWhite?: boolean
}

type NavProps = {
  setNavOpen: Dispatch<SetStateAction<boolean>>
  pathname: string
}

const variants: Variants = {
  hidden: {
    y: "-100%",
  },
  visible: {
    y: 0,
    transition: {
      ease: "anticipate",
      duration: 0.6,
    },
  },
  exit: {
    y: "-100%",
    transition: {
      ease: "anticipate",
      duration: 0.6,
    },
  },
}

const navLinks = [
  {
    href: "/",
    name: "Hjem",
  },
  {
    href: "/om",
    name: "Om",
  },
  {
    href: "/kontakt",
    name: "Kontakt",
  },
]

function MobileNav({ setNavOpen, pathname }: NavProps) {
  return (
    <motion.nav
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed bg-white z-50 h-screen w-full md:hidden"
    >
      <div className="flex justify-end">
        <button onClick={() => setNavOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black m-4"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <ul className=" h-full text-2xl text-gray-900 flex flex-col space-y-6 items-center justify-center">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <a
                className={cx("transition-colors duration-200", {
                  "text-detail": pathname === link.href,
                })}
                data-testid={`mobile-nav-link-${link.name}`}
              >
                {link.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

export default function Header({ textWhite }: Props) {
  const [navOpen, setNavOpen] = useState(false)
  const { currentScroll, scrollDirection } = useScroll()
  const { pathname } = useRouter()

  useEffect(() => {
    // Makes sure page is not scrollable when mobile nav is open
    document.body.style.overflow = navOpen ? "hidden" : "unset"
  })

  return (
    <header
      className={cx(
        "fixed transform transition-all bg-white duration-500 w-full z-40",
        scrollDirection === "DOWN" && currentScroll > 100
          ? "-translate-y-full"
          : "translate-y-0",
        currentScroll < 50 && textWhite ? "text-white" : "text-black",
        {
          "bg-transparent shadow-none": currentScroll < 50,
          shadow: currentScroll > 0,
        }
      )}
    >
      <AnimatePresence>
        {navOpen && <MobileNav setNavOpen={setNavOpen} pathname={pathname} />}
      </AnimatePresence>

      <div className="py-4 px-4 flex justify-between max-w-6xl mx-auto">
        <Link href="/">
          <a className="cursor-pointer">
            <Logo />
          </a>
        </Link>
        <button
          className="md:hidden"
          data-testid="hamburger-menu"
          onClick={() => setNavOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <nav className="space-x-4 hidden md:block">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cx(
                  "transition-colors duration-200 hover:text-detail",
                  {
                    "text-detail": pathname == link.href,
                  }
                )}
                data-testid={`desktop-nav-link-${link.name}`}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
