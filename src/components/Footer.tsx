import Link from "next/link";

const githubLink = "https://github.com/codersnexus-sdit";
const linkedinLink = "https://www.linkedin.com/in/coders-nexus-722a28385/";
const instagramLink = "https://instagram.com/coders-nexus";
const youtubeLink = "#";

const communityGuidelines = "https://github.com/codersnexus-sdit";

const Footer = () => {
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
                        src="/assets/logo/coders-nexus1.svg" 
                        alt="Coders Nexus SDIT Logo" 
                        className="logo-light w-full max-w-[180px] sm:max-w-[220px] md:max-w-[300px] lg:max-w-[420px] h-auto md:mx-0 mx-auto"
                      />
                    </Link>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4 max-w-md text-center md:text-left whitespace-normal md:whitespace-nowrap">
                    
                  </p>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="w-full">
                <div className="rainbow-footer-widget text-center md:text-left">
                  <div className="widget-menu-bottom">
                    <h4 className="text-white text-lg font-semibold mb-4 md:mb-6 title">Social Media</h4>
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
                            href={youtubeLink} 
                            target="_blank"
                            className="text-gray-300 hover:text-[#9929EA] transition-colors duration-300"
                          >
                            Youtube
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
                        <li>
                          <Link 
                            href={communityGuidelines} 
                            target="_blank"
                            className="text-gray-300 hover:text-[#9929EA] transition-colors duration-300"
                          >
                            Community Guidelines
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