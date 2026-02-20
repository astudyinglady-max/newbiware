"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, Phone, ChevronRight, X, Building2, Pill, Hospital } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as L from 'leaflet';

interface Agency {
  id: string;
  name: string;
  address: string;
  phone: string;
  type: 'clinic' | 'pharmacy' | 'hospital';
  lat: number;
  lng: number;
}

const agencies: Agency[] = [
  { id: '1', name: '이안메드 (고양/파주)', address: '경기도 고양시 일산동구 고봉로 32-19', phone: '1644-9491', type: 'clinic', lat: 37.658, lng: 126.832 },
  { id: '2', name: '세일메디넷 (의정부)', address: '경기도 의정부시 평화로 542', phone: '1644-9541', type: 'clinic', lat: 37.738, lng: 127.046 },
  { id: '3', name: '비즈현메디칼 (부천)', address: '경기도 부천시 원미구 상동로 117', phone: '1644-5491', type: 'pharmacy', lat: 37.503, lng: 126.766 },
  { id: '4', name: '본사직영 (서울 강남)', address: '서울특별시 강남구 테헤란로 123', phone: '1644-2969', type: 'clinic', lat: 37.498, lng: 127.027 },
  { id: '5', name: '메디플랜 (부산)', address: '부산광역시 연제구 중앙대로 1001', phone: '1644-0466', type: 'clinic', lat: 35.179, lng: 129.075 },
  { id: '6', name: '아이포커스 (원주)', address: '강원도 원주시 능라동길 1', phone: '1644-4596', type: 'hospital', lat: 37.342, lng: 127.920 },
  { id: '7', name: '메디케어 (청주)', address: '충청북도 청주시 상당구 상당로 1', phone: '1644-9516', type: 'clinic', lat: 36.642, lng: 127.489 },
  { id: '8', name: '리드케어 (광주)', address: '광주광역시 서구 상무중앙로 1', phone: '1644-7959', type: 'clinic', lat: 35.159, lng: 126.852 },
  { id: '9', name: '제주메디넷', address: '제주특별자치도 제주시 중앙로 1', phone: '1644-4647', type: 'clinic', lat: 33.499, lng: 126.531 },
];

export const MapSearchSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<L.Map | null>(null);
  const markerObjects = useRef<{ [key: string]: L.Marker }>({});

  const filteredAgencies = useMemo(() => {
    return agencies.filter(a => 
      a.name.includes(searchQuery) || a.address.includes(searchQuery)
    );
  }, [searchQuery]);

  const selectedAgency = useMemo(() => 
    agencies.find(a => a.id === selectedId), [selectedId]
  );

  // Initialize Map
  useEffect(() => {
    if (mapContainerRef.current && !leafletInstance.current) {
      const map = L.map(mapContainerRef.current, {
        center: [36.5, 127.5],
        zoom: 7,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      leafletInstance.current = map;

      // Add Markers
      agencies.forEach((agency) => {
        const markerColor = agency.type === 'clinic' ? '#ec4899' : agency.type === 'pharmacy' ? '#a855f7' : '#10b981';
        const customIcon = L.divIcon({
          className: 'leaflet-custom-marker',
          html: `<div style="background-color: ${markerColor}; width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        const marker = L.marker([agency.lat, agency.lng], { icon: customIcon })
          .addTo(map)
          .on('click', () => setSelectedId(agency.id));
        
        markerObjects.current[agency.id] = marker;
      });
    }

    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, []);

  // Sync selection to map
  useEffect(() => {
    if (selectedId && leafletInstance.current) {
      const agency = agencies.find(a => a.id === selectedId);
      if (agency) {
        leafletInstance.current.setView([agency.lat, agency.lng], 14, { animate: true });
        
        // Update all markers icons
        Object.entries(markerObjects.current).forEach(([id, marker]) => {
          const a = agencies.find(item => item.id === id);
          if (!a) return;
          const markerColor = id === selectedId ? '#2563eb' : (a.type === 'clinic' ? '#ec4899' : a.type === 'pharmacy' ? '#a855f7' : '#10b981');
          const markerScale = id === selectedId ? '1.2' : '1';
          
          marker.setIcon(L.divIcon({
            className: 'leaflet-custom-marker',
            html: `<div style="background-color: ${markerColor}; width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; transform: scale(${markerScale}); transition: all 0.2s;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          }));
        });
      }
    }
  }, [selectedId]);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6">
        

        <div className="flex flex-col lg:flex-row border border-gray-200 rounded-3xl overflow-hidden shadow-2xl h-[750px] bg-white">
          {/* Sidebar */}
          <div className="w-full lg:w-[400px] border-r border-gray-100 flex flex-col h-full bg-white z-10">
            <div className="p-5 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="대리점명 또는 주소 입력"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50/50 p-5 space-y-4 custom-scrollbar">
              {filteredAgencies.map((agency) => (
                <button
                  key={agency.id}
                  onClick={() => setSelectedId(agency.id)}
                  className={`w-full flex gap-4 p-4 rounded-2xl text-left transition-all border ${
                    selectedId === agency.id 
                    ? 'bg-white border-blue-200 shadow-lg ring-1 ring-blue-500/10' 
                    : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 truncate">{agency.name}</h4>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] text-white ${
                        agency.type === 'clinic' ? 'bg-pink-500' : 
                        agency.type === 'pharmacy' ? 'bg-purple-500' : 'bg-emerald-500'
                      }`}>
                        {agency.type === 'clinic' ? '의원' : agency.type === 'pharmacy' ? '약국' : '병원'}
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-500 leading-tight mb-2 line-clamp-2">{agency.address}</p>
                    <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs">
                      <Phone size={12} />
                      {agency.phone}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 self-center" />
                </button>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative bg-[#f8f9fa] z-0">
            {/* The Actual Map Element */}
            <div ref={mapContainerRef} className="w-full h-full" style={{ zIndex: 0 }} />

            {/* Selection Overlay */}
            <AnimatePresence>
              {selectedId && selectedAgency && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-8 left-8 right-8 lg:left-auto lg:right-8 lg:w-[360px] bg-white rounded-2xl shadow-2xl p-6 z-[2000] border border-gray-100"
                >
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} className="text-gray-400" />
                  </button>
                  
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      {selectedAgency.type === 'clinic' ? <Building2 size={28} /> : 
                       selectedAgency.type === 'pharmacy' ? <Pill size={28} /> : 
                       <Hospital size={28} />}
                    </div>
                    <div>
                      <span className={`px-2 py-0.5 rounded text-[10px] text-white font-bold ${
                        selectedAgency.type === 'clinic' ? 'bg-pink-500' : 
                        selectedAgency.type === 'pharmacy' ? 'bg-purple-500' : 'bg-emerald-500'
                      }`}>
                        {selectedAgency.type === 'clinic' ? '의원 전문' : selectedAgency.type === 'pharmacy' ? '약국 전문' : '병원 전문'}
                      </span>
                      <h3 className="font-black text-xl text-gray-900 mt-0.5">{selectedAgency.name}</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-gray-400 mt-1" />
                      <span className="text-sm text-gray-600 leading-relaxed">{selectedAgency.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={14} className="text-blue-500" />
                      <span className="text-base text-blue-600 font-extrabold">{selectedAgency.phone}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all">
                      <Navigation size={18} /> 길찾기
                    </button>
                    <a 
                      href={`tel:${selectedAgency.phone}`}
                      className="flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
                    >
                      <Phone size={18} /> 전화문의
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
