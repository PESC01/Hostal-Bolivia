import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MessageCircle, Phone, Mail, Clock } from 'lucide-react';

// Replace these with your actual details
const WHATSAPP_NUMBER = '+59171864998';
const HOTEL_LOCATION = { lat: -22.01511, lng: -63.67794 };
const GOOGLE_MAPS_API_KEY = 'AIzaSyC1vR8T8NmrwYbUt3OvCPh8lu2YVsmsLBw';

const hotelSpecs = {
  name: 'HOSTAL BOLIVIA',
  address: 'Cl. Comercio, Yacuíba',
  description: 'WIFI Gratis - Estacionamiento Gratuito - Se permiten mascotas',
  features: [
    'Acogedor',
    'Familiar y Céntrico',
    'Además de HOSPEDAJE obtendrá información turística y comercial.'
  ]
};

const rooms = [
  {
    title: 'Habitaciones individuales',
    description: 'Habiataciones para una persona',
    image: 'https://scontent.fvvi1-2.fna.fbcdn.net/v/t39.30808-6/480830924_1136907244799836_2741524321202829568_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HGu6nrR0KDEQ7kNvgH5zGVL&_nc_oc=AdiIwppT3EbuL_RDiUqfGAbX1Vuca7CqgT1lS7AnbU4RfgR3dSgqr-cCcYLikm6m2dA&_nc_zt=23&_nc_ht=scontent.fvvi1-2.fna&_nc_gid=AjyiVNLixTlSkL4Acm712sK&oh=00_AYEtcGvvMTbvIp6ao2PEgTZB9MUPiADY4WGHuS9Hfso0Aw&oe=67D77182'
  },
  {
    title: 'Habitaciones Matrimonales',
    description: 'Habitaciones con baño privado',
    image: 'https://scontent.fvvi1-1.fna.fbcdn.net/v/t39.30808-6/481084622_1136907824799778_1551520716615059688_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=XEEf4W9kF8AQ7kNvgECO_-K&_nc_oc=Adjr2tayi-E9T7lsYAarX310sY1ilBwo3W6gMAApQnxwuvEcXp-o3ErDpW7fGWoG2oU&_nc_zt=23&_nc_ht=scontent.fvvi1-1.fna&_nc_gid=AQ9KSmsb0QSSnlkx0VsT7yo&oh=00_AYGmHn9Ipbliv1wfYoTmOjAMZI5PKM0Tl_8j6J_vwoLhcQ&oe=67D7A18D'
  },
  {
    title: 'Habitaciones Familiares',
    description: 'Habitaciones espaciosas',
    image: 'https://scontent.fvvi1-1.fna.fbcdn.net/v/t39.30808-6/481055363_1136908054799755_5693703536795299760_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=3nK0lFmFPAsQ7kNvgEPfzgb&_nc_oc=Adh-qOPi-hmOQVt8YkBNvJ7uKfLjSzd1SCEpFE9b1KEJH_sKSycB_B5XmKqyjWq5R-E&_nc_zt=23&_nc_ht=scontent.fvvi1-1.fna&_nc_gid=Aml3fqkw-WACu1yoQd8F2SC&oh=00_AYHdhjlcoJ6k6sOQX3M23Pvvl3hgiI9Se-Ut8ljZAeT5tA&oe=67D79D76'
  }
];

const spaces = [
  {
    title: 'Habitaciones',
    description: 'Habitaciones con vista a la ciudad',
    image: 'https://scontent.fvvi1-1.fna.fbcdn.net/v/t39.30808-6/473369271_1103747048115856_4632740485212026169_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=WegrkMZ4S0EQ7kNvgHkLoGY&_nc_oc=AdhZI2ZGBw4cauLTkSYep_oa8fzcCH3Fctu4KnkV7Rel5hmhzu0IBF6aGGc9Out55kU&_nc_zt=23&_nc_ht=scontent.fvvi1-1.fna&_nc_gid=A8MFEVwf50J0giF-5Ozmgw_&oh=00_AYEzyqj4xS6vEtCPHF5EIVisyffKi7hYzutAuaWfhks7nw&oe=67D77A5B'
  },
  {
    title: 'Spa & Wellness',
    description: 'Luxurious spa treatments and facilities',
    image: 'https://scontent.fvvi1-2.fna.fbcdn.net/v/t39.30808-6/481078536_1136907731466454_6980910056421446962_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=cElGXis4dwYQ7kNvgEDyCLi&_nc_oc=AdgVUfv8GRPFldMRAecw0LLinRbDU4u9WKU5ar9E39Ihq5km9GMxruJfcsjO2HFqd-s&_nc_zt=23&_nc_ht=scontent.fvvi1-2.fna&_nc_gid=ANEB2pq6VhSxPqp3sTmGUgN&oh=00_AYGLOIbVuyc4H7LWMXcZcXk9K6PmrBtoa7D64Uv0iZ6sgA&oe=67D76F68'
  },
  {
    title: 'Fine Dining Restaurant',
    description: 'Exquisite Peruvian and international cuisine',
    image: 'https://scontent.fvvi1-1.fna.fbcdn.net/v/t39.30808-6/481059261_1136907641466463_8748587125441192968_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=z-3IIXKwe2oQ7kNvgFpBtO4&_nc_oc=Adgv_mL_--C_iTCZCCGd0zX9rBf19Qq-_ymyjfmgsx2-Jt9TJKmm4sRVEBAZ3iqVqtg&_nc_zt=23&_nc_ht=scontent.fvvi1-1.fna&_nc_gid=ADwqOKfBY62ySPppkQnQ4C2&oh=00_AYGvU_GH-PzqEJJJmMZ0Y2kMGrBHPkZMo60QOftpH0huNQ&oe=67D7870E'
  },
  {
    title: 'Event Space',
    description: 'Elegant venues for special occasions',
    image: 'https://scontent.fvvi1-2.fna.fbcdn.net/v/t39.30808-6/480886751_1136907058133188_8523028555034080837_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=wfwYPUFBwxkQ7kNvgFcDicK&_nc_oc=Adith7BbTq82sNuSCZeJWtZMv4YQIUgWYsePQyAy9XsNCpEDQOl5KNUw0-FYN6iXD7A&_nc_zt=23&_nc_ht=scontent.fvvi1-2.fna&_nc_gid=AX1TUOj4iFochDN7aKQkYNi&oh=00_AYFpsEoPZuoU-MbKUSLyCSeNhkwgmF195Acf6rA_LBX8eQ&oe=67D773BE'
  }
];

function App() {
  const [mapError, setMapError] = useState(false);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-screen"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://scontent.fvvi1-2.fna.fbcdn.net/v/t39.30808-6/481474674_1136907428133151_4692856824136577177_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=mMRHJqvJQKYQ7kNvgHc5WlN&_nc_oc=AdhtB1ESzvF0v7u1XtzFr0nWzvNGyDegPTn-tbYtqSzxboYcpJouVOYguURwuBN1Of4&_nc_zt=23&_nc_ht=scontent.fvvi1-2.fna&_nc_gid=Aw56962O7hqgp0tRzEmSH0E&oh=00_AYEuMpRzajNPqPXyhDKXzB5MN5bNl0Fo08HGCB8fdWCGIQ&oe=67D78739")',
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(0,0,0,0.4)'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {hotelSpecs.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-white mb-8"
            >
              {hotelSpecs.description}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              onClick={handleWhatsAppClick}
              className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors flex items-center mx-auto"
            >
              <MessageCircle className="mr-2" />
              Contactanos
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hotel Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">¿Por qué Elegirnos?</h2>
              <ul className="space-y-4">
                {hotelSpecs.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center text-lg text-gray-700"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src="https://scontent.fvvi1-2.fna.fbcdn.net/v/t39.30808-6/481207224_1139021467921747_7734976964816742858_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=PEHGxnrufQIQ7kNvgHNHmfT&_nc_oc=AdgFjwopDsOvEutmaXChG28jvZtfP4oV7V8EtQDSzehXsG2bDT0mRE8Zk1oTlYMxmz4&_nc_zt=23&_nc_ht=scontent.fvvi1-2.fna&_nc_gid=Apfa3vDn0NPY5D9uQfjRcR6&oh=00_AYF4IXPhPqRctPC9h1cX8KaV6Tk6kh3JAR1WJAnj1np5nQ&oe=67D79EA6"
                alt="Hotel Exterior"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Habitaciones</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Habitaciones comodas y para toda ocación</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={handleWhatsAppClick}
                      className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      Reservar ahora
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{room.title}</h3>
                <p className="text-gray-600">{room.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Spaces Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Hostal Bolivia</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explora la ciudad desde habitaciones centricas </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {spaces.map((space, index) => (
              <motion.div
                key={space.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-bold mb-2">{space.title}</h3>
                      <p className="text-lg">{space.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <Phone className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Llámanos</h3>
            <p className="text-gray-600">+591 71864998</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <Mail className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">correo electrónico</h3>
            <p className="text-gray-600">info@boliviahotel.com</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <Clock className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Abierto</h3>
            <p className="text-gray-600">Las 24 horas</p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Encuentranos</h2>
            <p className="text-gray-600">{hotelSpecs.address}</p>
          </motion.div>

          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg bg-gray-100">
            {GOOGLE_MAPS_API_KEY ? (
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={HOTEL_LOCATION}
                  zoom={18}
                >
                  <Marker position={HOTEL_LOCATION} />
                </GoogleMap>
              </LoadScript>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-600 text-center px-4">
                  Please add your Google Maps API key to display the map
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
}

export default App;