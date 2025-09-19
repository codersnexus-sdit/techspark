const Map = () => {
  return (
    <main className="w-full flex flex-col items-center md:px-0 px-5">
      {/* Location Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Location
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Find us at Shree Devi Institute Of Technology
        </p>
      </div>
      
      {/* Map iframe */}
      <iframe
        id="map-iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3126815567234!2d74.86919929999999!3d12.951832699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba350d45819abf1%3A0xec9cf13e2e0ad60c!2sShree%20Devi%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1758221792297!5m2!1sen!2sin"
        width="90%"
        height="350"
        className="rounded-xl shadow-2xl border border-gray-700"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </main>
  );
};

export default Map;