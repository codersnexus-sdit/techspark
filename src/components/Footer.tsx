import Link from "next/link";

const githubLink = "https://github.com/codersnexus-sdit";
const linkedinLink = "#";
const instagramLink = "https://instagram.com/coders-nexus";
const facebookLink = "#";
const twitterLink = "#";
const youtubeLink = "#";
const discordLink = "#";

const communityGuidelines = "https://github.com/codersnexus-sdit";

const Footer = () => {
  return (
    <div className="bg-black xl:px-10 md:px-4 lg:px-20 font-jetbrainsMono">
      <footer className="body-font tracking-wider">
        {/* Footer Top Section */}
        <div className="footer-top py-8">
          <div className="container mx-auto">
            <div className="flex justify-between items-start flex-wrap">
              
              {/* Logo and Description Section */}
              <div className="lg:w-4/12 md:w-6/12 sm:w-full w-full mb-8 md:mb-0 relative">
                <div className="rainbow-footer-widget relative">
                  <div className="logo">
                    <Link href="/" className="inline-block">
                      <img 
                        src="/logo/nexus.svg" 
                        alt="Coders Nexus SDIT Logo" 
                        className="logo-light w-auto h-70"
                      />
                    </Link>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed absolute bottom-4 left-4 max-w-xs">
                    Coders Nexus SDIT -<br /> 
                    Open Source Community
                  </p>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="lg:w-2/12 md:w-6/12 sm:w-6/12 w-full mb-8 md:mb-0">
                <div className="rainbow-footer-widget">
                  <div className="widget-menu-bottom">
                    <h4 className="text-white text-lg font-semibold mb-6 title">Social Media</h4>
                    <div className="inner">
                      <ul className="footer-link link-hover space-y-3">
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
              <div className="lg:w-3/12 md:w-6/12 sm:w-6/12 w-full">
                <div className="rainbow-footer-widget">
                  <div className="widget-menu-top">
                    <h4 className="text-white text-lg font-semibold mb-6 title">Contact</h4>
                    <div className="inner">
                      <ul className="footer-link contact-link space-y-4">
                        <li className="flex items-start">
                          <i className="contact-icon fa-regular fa-location-dot mt-1 mr-3 text-[#9929EA]"></i>
                          <Link 
                            href="https://maps.app.goo.gl/YourMapLink" 
                            target="_blank"
                            className="text-gray-300 hover:text-[#9929EA] transition-colors duration-300"
                          >
                            Shree Devi Institute Of Technology, Airport Rd, Kenjar, Mangaluru, Karnataka - 574142 IN
                          </Link>
                        </li>
                        <li className="flex items-start">
                          <i className="contact-icon fa-sharp fa-regular fa-envelope mt-1 mr-3 text-[#9929EA]"></i>
                          <Link 
                            href="mailto:codersnexus.osc@gmail.com"
                            target="_blank"
                            className="text-gray-300 hover:text-[#9929EA] transition-colors duration-300"
                          >
                            codersnexus.osc@gmail.com
                          </Link>
                        </li>
                        <li className="flex items-start">
                          <i className="contact-icon fa-regular fa-phone mt-1 mr-3 text-[#9929EA]"></i>
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
        <div className="border-t border-gray-800 pt-6">
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