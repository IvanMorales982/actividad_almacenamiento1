import React, { useState, useEffect } from 'react';
import { Smartphone, AlertTriangle, Heart, Brain, Shield, User, Home, BookOpen, Menu, X, ArrowUp, HardDrive, Disc, Usb, Save, Car as SdCard, Database, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentMainSection, setCurrentMainSection] = useState('nomofobia'); // 'nomofobia', 'almacenamiento' o 'multimedia'

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchMainSection = (section: string) => {
    setCurrentMainSection(section);
    scrollToTop();
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'definicion', 'sintomas', 'causas', 'tips', 'experiencia', 'tipos-almacenamiento', 'evolucion', 'comparacion', 'herramientas-multimedia'];
      const scrollPosition = window.scrollY + 100;

      setShowScrollTop(window.scrollY > 300);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nomofobiaNavItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'definicion', label: 'Definición', icon: BookOpen },
    { id: 'sintomas', label: 'Síntomas', icon: AlertTriangle },
    { id: 'causas', label: 'Causas', icon: Brain },
    { id: 'tips', label: 'Tips', icon: Shield },
    { id: 'experiencia', label: 'Experiencia', icon: User },
  ];

  const almacenamientoNavItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'tipos-almacenamiento', label: 'Tipos', icon: HardDrive },
    { id: 'evolucion', label: 'Evolución', icon: Database },
    { id: 'comparacion', label: 'Comparación', icon: Disc },
  ];

  const multimediaNavItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'herramientas-multimedia', label: 'Herramientas', icon: Layout },
    { id: 'ventajas-multimedia', label: 'Ventajas', icon: Brain },
  ];

  const currentNavItems = currentMainSection === 'nomofobia'
    ? nomofobiaNavItems
    : currentMainSection === 'almacenamiento'
    ? almacenamientoNavItems
    : multimediaNavItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {currentMainSection === 'nomofobia' ? (
                <Smartphone className="h-8 w-8 text-blue-600" />
              ) : currentMainSection === 'almacenamiento' ? (
                <HardDrive className="h-8 w-8 text-purple-600" />
              ) : (
                <Layout className="h-8 w-8 text-green-600" />
              )}
              <h1 className="text-2xl font-bold text-gray-900">
                {currentMainSection === 'nomofobia' ? 'Nomofobia' : currentMainSection === 'almacenamiento' ? 'Almacenamiento' : 'Herramientas Multimedia'}
              </h1>
            </div>
            
            {/* Main Section Switcher */}
            <div className="hidden lg:flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => switchMainSection('nomofobia')}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  currentMainSection === 'nomofobia'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Nomofobia
              </button>
              <button
                onClick={() => switchMainSection('almacenamiento')}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  currentMainSection === 'almacenamiento'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Almacenamiento
              </button>
              <button
                onClick={() => switchMainSection('multimedia')}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  currentMainSection === 'multimedia'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Multimedia
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {currentNavItems.map((item) => {
                const Icon = item.icon;
                const colorClass = currentMainSection === 'nomofobia'
                  ? 'text-blue-600 bg-blue-50'
                  : currentMainSection === 'almacenamiento'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-green-600 bg-green-50';
                const hoverClass = currentMainSection === 'nomofobia'
                  ? 'hover:text-blue-600 hover:bg-blue-50'
                  : currentMainSection === 'almacenamiento'
                  ? 'hover:text-purple-600 hover:bg-purple-50'
                  : 'hover:text-green-600 hover:bg-green-50';
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === item.id
                        ? `${colorClass} shadow-sm`
                        : `text-gray-600 ${hoverClass}`
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 py-4 border-t border-gray-200"
              >
                {/* Mobile Section Switcher */}
                <div className="grid grid-cols-3 gap-1 bg-gray-100 rounded-lg p-1 mb-4">
                  <button
                    onClick={() => switchMainSection('nomofobia')}
                    className={`px-3 py-2 rounded-md transition-all duration-300 text-sm ${
                      currentMainSection === 'nomofobia'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    Nomofobia
                  </button>
                  <button
                    onClick={() => switchMainSection('almacenamiento')}
                    className={`px-3 py-2 rounded-md transition-all duration-300 text-sm ${
                      currentMainSection === 'almacenamiento'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    Almacenamiento
                  </button>
                  <button
                    onClick={() => switchMainSection('multimedia')}
                    className={`px-3 py-2 rounded-md transition-all duration-300 text-sm ${
                      currentMainSection === 'multimedia'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    Multimedia
                  </button>
                </div>
                
                <div className="flex flex-col space-y-2">
                  {currentNavItems.map((item) => {
                    const Icon = item.icon;
                    const colorClass = currentMainSection === 'nomofobia'
                      ? 'text-blue-600 bg-blue-50'
                      : currentMainSection === 'almacenamiento'
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-green-600 bg-green-50';
                    const hoverClass = currentMainSection === 'nomofobia'
                      ? 'hover:text-blue-600 hover:bg-blue-50'
                      : currentMainSection === 'almacenamiento'
                      ? 'hover:text-purple-600 hover:bg-purple-50'
                      : 'hover:text-green-600 hover:bg-green-50';
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                          activeSection === item.id
                            ? `${colorClass} shadow-sm`
                            : `text-gray-600 ${hoverClass}`
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Contenido Principal */}
      {currentMainSection === 'nomofobia' ? (
        <>
          {/* Hero Section - Nomofobia */}
          <motion.section 
            id="inicio" 
            className="pt-24 pb-16 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto text-center">
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src="https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Persona usando smartphone"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                />
              </motion.div>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Nomofobia
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Explorando el miedo moderno a estar desconectado de nuestros dispositivos móviles
              </motion.p>
              <motion.button
                onClick={() => scrollToSection('definicion')}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Comenzar Exploración
              </motion.button>
            </div>
          </motion.section>

          {/* Definición */}
          <motion.section 
            id="definicion" 
            className="py-16 px-6 bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">¿Qué es la Nomofobia?</h2>
                  <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                    <p>
                      La <strong>nomofobia</strong> (del inglés "no-mobile-phone phobia") es el miedo irracional 
                      a estar sin teléfono móvil o sin conexión a internet.
                    </p>
                    <p>
                      Este término fue acuñado durante un estudio realizado por la Oficina de Correos del Reino 
                      Unido en 2010, y desde entonces ha ganado reconocimiento como un fenómeno psicológico real 
                      en nuestra era digital.
                    </p>
                    <p>
                      Se caracteriza por una ansiedad extrema cuando la persona se encuentra sin su dispositivo 
                      móvil, sin batería, sin cobertura o sin conexión a internet.
                    </p>
                  </div>
                </motion.div>
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="https://i0.wp.com/canal.ugr.es/wp-content/uploads/2021/07/Nomofobia.jpg?fit=1920%2C1280&ssl=1"
                    alt="Ansiedad por el teléfono"
                    className="rounded-2xl shadow-xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl shadow-lg">
                    <Smartphone className="h-8 w-8" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Síntomas */}
          <motion.section 
            id="sintomas" 
            className="py-16 px-6 bg-gradient-to-br from-red-50 to-orange-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Síntomas de la Nomofobia</h2>
                <p className="text-xl text-gray-600 leading-relaxed">Señales que pueden indicar dependencia tecnológica</p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: AlertTriangle,
                    title: "Ansiedad Extrema",
                    description: "Sentimientos intensos de ansiedad cuando el teléfono está fuera de alcance o sin batería",
                    color: "from-red-500 to-pink-500"
                  },
                  {
                    icon: Heart,
                    title: "Síntomas Físicos",
                    description: "Palpitaciones, sudoración, temblores o dificultad para respirar",
                    color: "from-orange-500 to-red-500"
                  },
                  {
                    icon: Brain,
                    title: "Obsesión Constante",
                    description: "Revisar el teléfono compulsivamente, incluso cuando no hay notificaciones",
                    color: "from-purple-500 to-blue-500"
                  },
                  {
                    icon: Smartphone,
                    title: "Miedo a la Desconexión",
                    description: "Terror a perder la conexión a internet o quedarse sin cobertura",
                    color: "from-teal-500 to-green-500"
                  },
                  {
                    icon: User,
                    title: "Aislamiento Social",
                    description: "Preferir la interacción digital sobre las relaciones cara a cara",
                    color: "from-indigo-500 to-purple-500"
                  },
                  {
                    icon: AlertTriangle,
                    title: "Problemas de Sueño",
                    description: "Insomnio por mantener el teléfono cerca durante la noche",
                    color: "from-yellow-500 to-orange-500"
                  }
                ].map((symptom, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${symptom.color} rounded-lg flex items-center justify-center mb-4`}>
                      <symptom.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">{symptom.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{symptom.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Causas y Consecuencias */}
          <motion.section 
            id="causas" 
            className="py-16 px-6 bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Causas y Consecuencias</h2>
                <p className="text-xl text-gray-600 leading-relaxed">Entendiendo las raíces y efectos de la nomofobia</p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12">
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center leading-tight">
                    <Brain className="h-6 w-6 mr-2" />
                    Principales Causas
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Dependencia de la conexión constante",
                      "Miedo a perderse información importante (FOMO)",
                      "Necesidad de validación social inmediata",
                      "Trabajo remoto y comunicación digital",
                      "Entretenimiento y escape de la realidad",
                      "Inseguridad personal y baja autoestima"
                    ].map((causa, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-gray-700 leading-relaxed">{causa}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center leading-tight">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Consecuencias Negativas
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Deterioro de las relaciones interpersonales",
                      "Disminución de la productividad laboral",
                      "Problemas de concentración y atención",
                      "Trastornos del sueño y descanso",
                      "Aumento de niveles de estrés y ansiedad",
                      "Dependencia tecnológica extrema"
                    ].map((consecuencia, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <p className="text-gray-700 leading-relaxed">{consecuencia}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://e01-elmundo.uecdn.es/assets/multimedia/imagenes/2023/09/12/16945287155220.jpg"
                  alt="Impacto de la tecnología"
                  className="w-full max-w-xl mx-auto rounded-2xl shadow-xl"
                />
              </motion.div>
            </div>
          </motion.section>

          {/* Tips para Evitar */}
          <motion.section 
            id="tips" 
            className="py-16 px-6 bg-gradient-to-br from-green-50 to-teal-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Tips para Evitar la Nomofobia</h2>
                <p className="text-xl text-gray-600 leading-relaxed">Estrategias efectivas para una relación saludable con la tecnología</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    icon: Shield,
                    title: "Establece Horarios Libres",
                    description: "Designa momentos específicos del día sin dispositivos móviles",
                    tips: ["Apaga el teléfono durante las comidas", "Crea una rutina nocturna sin pantallas", "Dedica al menos 1 hora diaria al aire libre"]
                  },
                  {
                    icon: Heart,
                    title: "Fortalece Relaciones Reales",
                    description: "Prioriza las interacciones cara a cara sobre las digitales",
                    tips: ["Organiza encuentros presenciales", "Practica la escucha activa", "Participa en actividades grupales sin dispositivos"]
                  },
                  {
                    icon: Brain,
                    title: "Practica Mindfulness",
                    description: "Desarrolla consciencia sobre tu uso tecnológico",
                    tips: ["Medita 10 minutos diarios", "Observa tus patrones de uso", "Practica respiración consciente"]
                  },
                  {
                    icon: Smartphone,
                    title: "Configura tu Dispositivo",
                    description: "Usa herramientas tecnológicas para limitar el uso",
                    tips: ["Activa el modo 'No molestar'", "Limita las notificaciones", "Usa apps de control parental"]
                  }
                ].map((tip, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                      <tip.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">{tip.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{tip.description}</p>
                    <ul className="space-y-2">
                      {tip.tips.map((t, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Bienestar digital"
                  className="w-full max-w-xl mx-auto rounded-2xl shadow-xl"
                />
              </motion.div>
            </div>
          </motion.section>

          {/* Experiencia Personal */}
          <motion.section 
            id="experiencia" 
            className="py-16 px-6 bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Experiencia Personal</h2>
                <p className="text-xl text-gray-600 leading-relaxed">Reflexiones sobre el uso del celular y la nomofobia</p>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <User className="h-8 w-8 text-indigo-600 mr-3" />
                  <h3 className="text-2xl font-semibold text-gray-900 leading-tight">¿Has experimentado nomofobia?</h3>
                </div>

                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    En nuestra era digital, es casi imposible no haber experimentado algún grado de ansiedad 
                    relacionada con nuestros dispositivos móviles. Muchas personas reportan sentimientos de 
                    inquietud cuando:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div 
                      className="bg-white p-6 rounded-xl shadow-sm"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="font-semibold text-gray-900 mb-3">Situaciones Comunes:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• El teléfono se queda sin batería</li>
                        <li>• No hay señal de internet</li>
                        <li>• Olvidas el teléfono en casa</li>
                        <li>• Se rompe la pantalla</li>
                        <li>• Actualizaciones que tardan mucho</li>
                      </ul>
                    </motion.div>

                    <motion.div 
                      className="bg-white p-6 rounded-xl shadow-sm"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="font-semibold text-gray-900 mb-3">Reacciones Típicas:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Sensación de estar perdido</li>
                        <li>• Ansiedad por no recibir mensajes</li>
                        <li>• Miedo a perderse algo importante</li>
                        <li>• Dificultad para concentrarse</li>
                        <li>• Urgencia por reconectarse</li>
                      </ul>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-semibold text-yellow-800 mb-2">Reflexión Personal:</h4>
                    <p className="text-yellow-700 leading-relaxed">
                      Es importante reconocer que cierto nivel de dependencia tecnológica es normal en nuestra 
                      sociedad actual. Sin embargo, cuando esta dependencia interfiere significativamente con 
                      nuestro bienestar, relaciones o productividad, es momento de buscar un equilibrio más saludable.
                    </p>
                  </motion.div>

                  <p>
                    La clave está en desarrollar una relación consciente con la tecnología, donde somos nosotros 
                    quienes controlamos el dispositivo, y no al revés. Esto requiere práctica, paciencia y 
                    autocompasión mientras aprendemos nuevos hábitos digitales más saludables.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* video */}
      <div className="w-full max-w-4xl mx-auto mb-16">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-xl"
            src="https://www.youtube.com/embed/C8ULmYmPJ0Q"
            title="Video Nomofobia"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
        </>
      ) : currentMainSection === 'almacenamiento' ? (
        <>
          {/* Hero Section - Almacenamiento */}
          <motion.section 
            id="inicio" 
            className="pt-24 pb-16 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto text-center">
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src="https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Dispositivos de almacenamiento"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                />
              </motion.div>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Almacenamiento
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Explorando la evolución de los dispositivos de almacenamiento digital
              </motion.p>
              <motion.button
                onClick={() => scrollToSection('tipos-almacenamiento')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explorar Dispositivos
              </motion.button>
            </div>
          </motion.section>

          {/* Tipos de Almacenamiento */}
          <motion.section 
            id="tipos-almacenamiento" 
            className="py-16 px-6 bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Tipos de Almacenamiento</h2>
                <p className="text-xl text-gray-600 leading-relaxed">Conoce los diferentes dispositivos para guardar información</p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: HardDrive,
                    title: "Discos Duros (HDD)",
                    description: "Almacenamiento magnético tradicional con alta capacidad",
                    capacity: "500GB - 18TB",
                    speed: "5,400 - 15,000 RPM",
                    color: "from-blue-500 to-cyan-500",
                    image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    icon: Database,
                    title: "SSD (Estado Sólido)",
                    description: "Almacenamiento flash sin partes móviles, ultra rápido",
                    capacity: "120GB - 8TB",
                    speed: "550+ MB/s",
                    color: "from-green-500 to-teal-500",
                    image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    icon: Disc,
                    title: "CD/DVD",
                    description: "Medios ópticos para almacenamiento y distribución",
                    capacity: "700MB - 8.5GB",
                    speed: "1x - 52x",
                    color: "from-yellow-500 to-orange-500",
                    image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    icon: Usb,
                    title: "USB Flash Drive",
                    description: "Almacenamiento portátil plug-and-play",
                    capacity: "1GB - 2TB",
                    speed: "USB 2.0 - 3.2",
                    color: "from-purple-500 to-pink-500",
                    image: "https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    icon: Save,
                    title: "Disquete",
                    description: "Medio de almacenamiento magnético histórico",
                    capacity: "1.44MB",
                    speed: "Legacy",
                    color: "from-gray-500 to-slate-500",
                    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    icon: SdCard,
                    title: "Tarjetas de Memoria",
                    description: "Almacenamiento compacto para dispositivos móviles",
                    capacity: "1GB - 1TB",
                    speed: "Class 10 - UHS-II",
                    color: "from-red-500 to-rose-500",
                    image: "https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    icon: Disc,
                    title: "Blu-ray",
                    description: "Medio óptico de alta definición y gran capacidad",
                    capacity: "25GB - 128GB",
                    speed: "1x - 16x",
                    color: "from-indigo-500 to-blue-500",
                    image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=400"
                  }
                ].map((storage, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={storage.image} 
                        alt={storage.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${storage.color} rounded-lg flex items-center justify-center mb-4`}>
                        <storage.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">{storage.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{storage.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Capacidad:</span>
                          <span className="font-medium text-gray-700">{storage.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Velocidad:</span>
                          <span className="font-medium text-gray-700">{storage.speed}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Evolución del Almacenamiento */}
          <motion.section 
            id="evolucion" 
            className="py-16 px-6 bg-gradient-to-br from-purple-50 to-indigo-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Evolución del Almacenamiento</h2>
                <p className="text-xl text-gray-600 leading-relaxed">Un viaje a través de la historia del almacenamiento digital</p>
              </motion.div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 to-indigo-400 rounded-full"></div>
                
                <div className="space-y-12">
                  {[
                    {
                      year: "1970s",
                      title: "Disquetes",
                      description: "Los primeros medios de almacenamiento portátil masivo",
                      capacity: "1.44MB",
                      icon: Save,
                      side: "left"
                    },
                    {
                      year: "1980s",
                      title: "Discos Duros",
                      description: "Almacenamiento magnético de alta capacidad",
                      capacity: "5MB - 10MB",
                      icon: HardDrive,
                      side: "right"
                    },
                    {
                      year: "1990s",
                      title: "CD-ROM",
                      description: "Revolución del almacenamiento óptico",
                      capacity: "650MB - 700MB",
                      icon: Disc,
                      side: "left"
                    },
                    {
                      year: "2000s",
                      title: "DVD y USB",
                      description: "Mayor capacidad y portabilidad mejorada",
                      capacity: "4.7GB - 8.5GB",
                      icon: Usb,
                      side: "right"
                    },
                    {
                      year: "2010s",
                      title: "SSD y Blu-ray",
                      description: "Velocidad extrema y alta definición",
                      capacity: "25GB - 1TB",
                      icon: Database,
                      side: "left"
                    },
                    {
                      year: "2020s",
                      title: "Almacenamiento en la Nube",
                      description: "Acceso global y capacidad ilimitada",
                      capacity: "Ilimitado",
                      icon: Database,
                      side: "right"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className={`flex items-center ${item.side === 'left' ? 'justify-start' : 'justify-end'}`}
                      initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-5/12 ${item.side === 'left' ? 'pr-8' : 'pl-8'}`}>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                              <item.icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                              <span className="text-sm text-purple-600 font-medium">{item.year}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{item.description}</p>
                          <p className="text-sm text-gray-500">Capacidad típica: <span className="font-medium">{item.capacity}</span></p>
                        </div>
                      </div>
                      
                      {/* Timeline Dot */}
                      <div className="w-4 h-4 bg-white border-4 border-purple-400 rounded-full z-10"></div>
                      
                      <div className="w-5/12"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Comparación de Tecnologías */}
          <motion.section 
            id="comparacion" 
            className="py-16 px-6 bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Comparación de Tecnologías</h2>
                <p className="text-xl text-gray-600 leading-relaxed">Ventajas y desventajas de cada tipo de almacenamiento</p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* HDD vs SSD */}
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">HDD vs SSD</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-xl">
                      <div className="flex items-center mb-3">
                        <HardDrive className="h-6 w-6 text-blue-600 mr-2" />
                        <h4 className="font-semibold text-blue-900">Disco Duro (HDD)</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="text-green-600">✓ Mayor capacidad por precio</div>
                        <div className="text-green-600">✓ Tecnología madura y confiable</div>
                        <div className="text-green-600">✓ Ideal para almacenamiento masivo</div>
                        <div className="text-red-600">✗ Más lento</div>
                        <div className="text-red-600">✗ Partes móviles (ruido/calor)</div>
                        <div className="text-red-600">✗ Más frágil</div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl">
                      <div className="flex items-center mb-3">
                        <Database className="h-6 w-6 text-green-600 mr-2" />
                        <h4 className="font-semibold text-green-900">SSD</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="text-green-600">✓ Velocidad extrema</div>
                        <div className="text-green-600">✓ Sin partes móviles</div>
                        <div className="text-green-600">✓ Menor consumo energético</div>
                        <div className="text-green-600">✓ Más resistente</div>
                        <div className="text-red-600">✗ Mayor costo por GB</div>
                        <div className="text-red-600">✗ Capacidades limitadas</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Medios Ópticos */}
                <motion.div 
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Medios Ópticos</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl">
                      <div className="flex items-center mb-3">
                        <Disc className="h-6 w-6 text-yellow-600 mr-2" />
                        <h4 className="font-semibold text-yellow-900">CD/DVD/Blu-ray</h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium text-green-700 mb-2">Ventajas:</h5>
                          <div className="space-y-1">
                            <div className="text-green-600">✓ Larga duración</div>
                            <div className="text-green-600">✓ Resistente a campos magnéticos</div>
                            <div className="text-green-600">✓ Ideal para archivos</div>
                            <div className="text-green-600">✓ Bajo costo unitario</div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-red-700 mb-2">Desventajas:</h5>
                          <div className="space-y-1">
                            <div className="text-red-600">✗ Velocidad limitada</div>
                            <div className="text-red-600">✗ Sensible a rayones</div>
                            <div className="text-red-600">✗ Capacidad fija</div>
                            <div className="text-red-600">✗ Requiere unidad lectora</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Almacenamiento Portátil */}
                <motion.div 
                  className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Almacenamiento Portátil</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl">
                      <div className="flex items-center mb-3">
                        <Usb className="h-6 w-6 text-purple-600 mr-2" />
                        <h4 className="font-semibold text-purple-900">USB y Tarjetas SD</h4>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium text-purple-700 mb-2">USB Flash</h5>
                          <div className="space-y-1">
                            <div>• Plug and play</div>
                            <div>• Universal</div>
                            <div>• Reutilizable</div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-pink-700 mb-2">Tarjetas SD</h5>
                          <div className="space-y-1">
                            <div>• Muy compactas</div>
                            <div>• Para dispositivos móviles</div>
                            <div>• Diferentes velocidades</div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Disquetes</h5>
                          <div className="space-y-1">
                            <div>• Históricos</div>
                            <div>• Muy limitados</div>
                            <div>• Obsoletos</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Tendencias Futuras */}
                <motion.div 
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tendencias Futuras</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl">
                      <div className="flex items-center mb-3">
                        <Database className="h-6 w-6 text-indigo-600 mr-2" />
                        <h4 className="font-semibold text-indigo-900">Tecnologías Emergentes</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                          <div>
                            <strong>Almacenamiento en la Nube:</strong> Acceso global, escalabilidad infinita
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <strong>NVMe PCIe 5.0:</strong> Velocidades de hasta 14,000 MB/s
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <div>
                            <strong>Almacenamiento Cuántico:</strong> Densidad y velocidad revolucionarias
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                          <div>
                            <strong>DNA Storage:</strong> Almacenamiento biológico de larga duración
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
          {/* video */}
          <motion.div
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden mb-16 px-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/qnjz9Jm1ARE?si=Zv92PHxagpfQlCMO"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </motion.div>
        </>
      ) : (
        <>
          {/* Hero Section - Herramientas Multimedia */}
          <motion.section
            id="inicio"
            className="pt-24 pb-16 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Herramientas multimedia"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                />
              </motion.div>
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Herramientas Multimedia
                </span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Plataformas basadas en tarjetas y páginas interactivas para potenciar tu creatividad
              </motion.p>
              <motion.button
                onClick={() => scrollToSection('herramientas-multimedia')}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explorar Herramientas
              </motion.button>
            </div>
          </motion.section>

          {/* Herramientas Multimedia */}
          <motion.section
            id="herramientas-multimedia"
            className="py-16 px-6 bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Herramientas Principales</h2>
                <p className="text-xl text-gray-600 leading-relaxed">Plataformas basadas en tarjetas y páginas interactivas</p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: Layout,
                    title: "Canva",
                    description: "Herramienta de diseño gráfico con interfaz de tarjetas para crear presentaciones, infografías y contenido visual",
                    features: ["Plantillas prediseñadas", "Editor drag-and-drop", "Colaboración en tiempo real"],
                    color: "from-cyan-500 to-blue-500",
                    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    icon: Layout,
                    title: "Notion",
                    description: "Espacio de trabajo basado en bloques y páginas para organización de contenido multimedia y colaboración",
                    features: ["Bloques modulares", "Bases de datos", "Integración multimedia"],
                    color: "from-gray-600 to-slate-600",
                    image: "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    icon: Layout,
                    title: "Trello",
                    description: "Sistema de gestión visual basado en tarjetas tipo Kanban para organizar proyectos multimedia",
                    features: ["Tableros visuales", "Tarjetas arrastrables", "Adjuntos multimedia"],
                    color: "from-blue-600 to-cyan-600",
                    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    icon: Layout,
                    title: "Miro",
                    description: "Pizarra digital colaborativa con tarjetas interactivas para brainstorming y diseño visual",
                    features: ["Pizarra infinita", "Colaboración remota", "Plantillas visuales"],
                    color: "from-yellow-500 to-orange-500",
                    image: "https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    icon: Layout,
                    title: "Prezi",
                    description: "Plataforma de presentaciones con navegación no lineal basada en lienzos y zoom dinámico",
                    features: ["Presentaciones dinámicas", "Zoom interactivo", "Transiciones suaves"],
                    color: "from-green-600 to-teal-600",
                    image: "https://images.pexels.com/photos/7059/man-working-on-computer.jpg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    icon: Layout,
                    title: "Padlet",
                    description: "Muro virtual interactivo con tarjetas multimedia para compartir y colaborar en contenido",
                    features: ["Muros personalizables", "Contenido multimedia", "Colaboración instantánea"],
                    color: "from-pink-500 to-rose-500",
                    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400"
                  }
                ].map((tool, index) => (
                  <motion.div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={tool.image}
                        alt={tool.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                        <tool.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">{tool.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{tool.description}</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700">Características principales:</h4>
                        <ul className="space-y-1">
                          {tool.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Ventajas de las Herramientas */}
          <motion.section
            id="ventajas-multimedia"
            className="py-16 px-6 bg-gradient-to-br from-green-50 to-teal-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Ventajas de las Herramientas Basadas en Tarjetas</h2>
                <p className="text-xl text-gray-600 leading-relaxed">Beneficios de utilizar plataformas interactivas</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <motion.div
                  className="bg-white p-8 rounded-xl shadow-lg text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Layout className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-xl">Organización Visual</h4>
                  <p className="text-gray-600 leading-relaxed">Facilitan la estructuración y visualización de información compleja de manera intuitiva</p>
                </motion.div>

                <motion.div
                  className="bg-white p-8 rounded-xl shadow-lg text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-xl">Colaboración</h4>
                  <p className="text-gray-600 leading-relaxed">Permiten trabajo en equipo en tiempo real con múltiples usuarios simultáneamente</p>
                </motion.div>

                <motion.div
                  className="bg-white p-8 rounded-xl shadow-lg text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-xl">Flexibilidad</h4>
                  <p className="text-gray-600 leading-relaxed">Se adaptan a diferentes necesidades: educación, negocios, creatividad y más</p>
                </motion.div>
              </div>

              <motion.div
                className="bg-white p-8 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center leading-tight">Beneficios Adicionales</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Interfaz intuitiva y fácil de usar",
                    "Acceso desde cualquier dispositivo",
                    "Integraciones con otras herramientas",
                    "Plantillas prediseñadas profesionales",
                    "Actualizaciones en tiempo real",
                    "Historial de versiones y cambios"
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

        </>
      )}

      <motion.section
        className="py-16 px-6 bg-gradient-to-br from-gray-50 to-blue-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
          </motion.h2>
          
        </div>
      </motion.section>


      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {currentMainSection === 'nomofobia' ? (
              <Smartphone className="h-6 w-6" />
            ) : currentMainSection === 'almacenamiento' ? (
              <HardDrive className="h-6 w-6" />
            ) : (
              <Layout className="h-6 w-6" />
            )}
            <h3 className="text-xl font-semibold">
              {currentMainSection === 'nomofobia' ? 'Nomofobia' : currentMainSection === 'almacenamiento' ? 'Almacenamiento Digital' : 'Herramientas Multimedia'}
            </h3>
          </div>
          <p className="text-gray-400 mb-6 leading-relaxed">
            {currentMainSection === 'nomofobia'
              ? 'Promoviendo un uso consciente y saludable de la tecnología'
              : currentMainSection === 'almacenamiento'
              ? 'Explorando la evolución del almacenamiento de datos'
              : 'Plataformas interactivas para potenciar tu creatividad'
            }
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </motion.footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 ${
              currentMainSection === 'nomofobia'
                ? 'bg-gradient-to-r from-blue-600 to-teal-600'
                : currentMainSection === 'almacenamiento'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                : 'bg-gradient-to-r from-green-600 to-teal-600'
            } text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;