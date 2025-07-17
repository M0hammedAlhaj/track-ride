import React from "react"
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
 function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  const quickLinks = [
    { name: "الرئيسية", href: "#" },
    { name: "الميزات", href: "#" },
    { name: "التسعير", href: "#" },
    { name: "الدعم", href: "#" },
    { name: "اتصل بنا", href: "#" },
    { name: "سياسة الخصوصية", href: "#" },
  ]

  return (
    <footer className="relative bg-gray-900 border-t border-gray-700 overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 -z-10 opacity-20 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 animate-gradient-x"
        style={{ backgroundSize: "200% 200%" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">صيانة السيارات</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              نظام شامل لإدارة وتتبع صيانة السيارات مع تذكيرات ذكية وتحليلات متقدمة لضمان الأداء الأمثل لمركباتك.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span>info@carcare.com</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>+966 12 345 6789</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">تابعنا</h3>
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5 text-gray-300 hover:text-white" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 صيانة السيارات. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer