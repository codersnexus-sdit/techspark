import { useEffect, useState } from "react";
import Link from "next/link";

const githubLink = "https://github.com/codersnexus-sdit";
const linkedinLink = "https://www.linkedin.com/company/codersnexus-sdit/";
const instagramLink = "https://instagram.com/coders.nexus";
const communityGuidelines = "https://github.com/codersnexus-sdit";

const Footer = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-black xl:px-10 md:px-4 lg:px-20 font-jetbrainsMono">
      <footer className="body-font tracking-wider">
        {/* Footer Top Section */}
        <div className="footer-top py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 items-center">
              
              {/* Logo and Description Section */}
              <div className="w-full sm:col-span-2 md:col-span-1 flex flex-col justify-center">
                <div className="rainbow-footer-widget flex flex-col items-center md:items-start">
                  <div className="logo w-full flex justify-center md:justify-start">
                    <Link href="/" className="inline-block">
                      <img 
                        key={windowSize.width} // Add key to force re-render on resize
                        src="/assets/logo/coders-nexus1.svg" 
                        alt="Coders Nexus SDIT Logo" 
                        className="logo-light w-full max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] h-auto md:mx-0 mx-auto"
                      />
                    </Link>
                  </div>
                  <div className="mt-4 w-full max-w-md">
                    <p className="text-gray-400 text-sm sm:text-base mb-2 text-center md:text-left">Faculty Coordinators</p>
                    <div className="grid grid-cols-2 gap-6 text-center md:text-left">
                      <div>
                        <p className="text-white font-semibold text-sm sm:text-base">Prof. Nishmitha M R</p>
                        <Link 
                          href="tel:+919743081373"
                          className="text-gray-300 hover:text-[#9929EA] text-sm sm:text-base inline-block mt-1"
                        >
                          +91 97430 81373
                        </Link>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm sm:text-base">Prof. Thejash</p>
                        <Link 
                          href="tel:+918075773051"
                          className="text-gray-300 hover:text-[#9929EA] text-sm sm:text-base inline-block mt-1"
                        >
                          +91 80757 73051
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="w-full flex justify-center">
                <div className="rainbow-footer-widget text-center">
                  <div className="widget-menu-bottom">
                    <h4 className="text-white text-lg font-semibold mb-4 md:mb-6 title text-center">Social Media</h4>
                    <div className="inner">
                      <ul className="footer-link link-hover space-y-2 md:space-y-3">
                        <li>
                          <Link 
                            href={instagramLink} 
                            target="_blank"
                            className="text-gray-300 hover:text-[#9929EA] transition-colors duration-300"
                          >
                            Instagram
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href={linkedinLink} 
                            target="_blank"
                            className="text-gray-300 hover:text-[#9929EA] transition-colors duration-300"
                          >
                            LinkedIn
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href={githubLink} 
                            target="_blank"
                            className="text-gray-300 hover:text-[#9929EA] transition-colors duration-300"
                          >
                            GitHub
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="w-full">
                <div className="rainbow-footer-widget text-center md:text-left">
                  <div className="widget-menu-top">
                    <h4 className="text-white text-lg font-semibold mb-4 md:mb-6 title">Contact</h4>
                    <div className="inner">
                      <ul className="footer-link contact-link space-y-3 md:space-y-4">
                        <li className="flex items-start justify-center md:justify-start text-center md:text-left">
                          <i className="hidden md:inline-block contact-icon fa-regular fa-location-dot mt-1 mr-0 md:mr-3 text-[#9929EA]"></i>
                          <Link 
                            href="https://maps.app.goo.gl/qRqni4NNwMibajKK9" 
                            target="_blank"
                            className="text-gray-300 hover:text-[#9929EA] transition-colors duration-300"
                          >
                            Shree Devi Institute Of Technology, Airport Rd, Kenjar, Mangaluru, Karnataka - 574142 IN
                          </Link>
                        </li>
                        <li className="flex items-start justify-center md:justify-start text-center md:text-left">
                          <i className="hidden md:inline-block contact-icon fa-sharp fa-regular fa-envelope mt-1 mr-0 md:mr-3 text-[#9929EA]"></i>
                          <Link 
                            href="mailto:codersnexus.osc@gmail.com"
                            target="_blank"
                            className="text-gray-300 hover:text-[#9929EA] transition-colors duration-300"
                          >
                            codersnexus.osc@gmail.com
                          </Link>
                        </li>
                        <li className="flex items-start justify-center md:justify-start text-center md:text-left">
                          <i className="hidden md:inline-block contact-icon fa-regular fa-phone mt-1 mr-0 md:mr-3 text-[#9929EA]"></i>
                          <Link 
                            href="tel:+916362161570"
                            className="text-gray-300 hover:text-[#9929EA] transition-colors duration-300"
                          >
                            +91 63621 61570
                          </Link>
                        </li>
                        <li className="flex items-start justify-center md:justify-start text-center md:text-left">
                          <i className="hidden md:inline-block contact-icon fa-regular fa-phone mt-1 mr-0 md:mr-3 text-[#9929EA]"></i>
                          <Link 
                            href="tel:+916363910295"
                            className="text-gray-300 hover:text-[#9929EA] transition-colors duration-300"
                          >
                            +91 63639 10295
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="text-white">
            <p className="pb-5 px-5 text-center text-gray-400">
              Coders Nexus © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;