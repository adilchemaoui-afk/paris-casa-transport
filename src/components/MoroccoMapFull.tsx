'use client'

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useState, useEffect } from 'react'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const moroccoCities: { name: string; coordinates: [number, number]; size: number }[] = [
  { name: 'Tanger', coordinates: [-5.81, 35.78], size: 5 },
  { name: 'Tétouan', coordinates: [-5.37, 35.59], size: 3.5 },
  { name: 'Fès', coordinates: [-4.98, 34.04], size: 3.5 },
  { name: 'Meknès', coordinates: [-5.54, 33.89], size: 3.5 },
  { name: 'Rabat', coordinates: [-6.84, 34.02], size: 4.5 },
  { name: 'Casablanca', coordinates: [-7.62, 33.57], size: 6 },
  { name: 'Marrakech', coordinates: [-7.98, 31.63], size: 5 },
  { name: 'Essaouira', coordinates: [-9.77, 31.51], size: 3.5 },
  { name: 'Agadir', coordinates: [-9.60, 30.42], size: 4.5 },
  { name: 'Oujda', coordinates: [-1.91, 34.68], size: 3.5 },
  { name: 'Nador', coordinates: [-2.93, 35.17], size: 3.5 },
  { name: 'Laâyoune', coordinates: [-13.20, 27.15], size: 5 },
  { name: 'Dakhla', coordinates: [-15.93, 23.71], size: 4.5 },
]

export function MoroccoMapFull() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full aspect-[4/3] bg-[#f5f0e8] rounded-xl animate-pulse flex items-center justify-center">
        <span className="text-[#8B7355] text-sm">Chargement de la carte...</span>
      </div>
    )
  }

  return (
    <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#faf7f2] to-[#f0ebe3] rounded-xl overflow-hidden border border-[#C41E3A]/10 shadow-xl relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 320,
          center: [5, 10],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isMorocco = geo.properties.name === 'Morocco'
              const isAfrica = ['Algeria', 'Tunisia', 'Libya', 'Egypt', 'Mauritania', 'Mali', 'Niger', 'Chad', 'Sudan', 'Eritrea', 'Djibouti', 'Somalia', 'Ethiopia', 'South Sudan', 'Central African Republic', 'Cameroon', 'Nigeria', 'Benin', 'Togo', 'Ghana', 'Burkina Faso', 'Ivory Coast', 'Liberia', 'Sierra Leone', 'Guinea', 'Guinea-Bissau', 'Gambia', 'Senegal', 'Western Sahara', 'Morocco', 'Tanzania', 'Kenya', 'Uganda', 'Rwanda', 'Burundi', 'Democratic Republic of the Congo', 'Congo', 'Gabon', 'Equatorial Guinea', 'Sao Tome and Principe', 'Angola', 'Zambia', 'Malawi', 'Mozambique', 'Zimbabwe', 'Botswana', 'Namibia', 'South Africa', 'Lesotho', 'Eswatini', 'Madagascar', 'Comoros', 'Seychelles', 'Mauritius', 'Cape Verde', 'Saint Helena', 'Mayotte', 'Reunion'].includes(geo.properties.name)
              
              if (!isAfrica) {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#e8e0d4"
                    stroke="#d4c4a8"
                    strokeWidth={0.3}
                    style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
                  />
                )
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isMorocco ? '#C41E3A' : '#f5f0e8'}
                  stroke={isMorocco ? '#8B1538' : '#d4c4a8'}
                  strokeWidth={isMorocco ? 1.5 : 0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: isMorocco ? '#A52A2A' : '#e8e0d4' },
                    pressed: { outline: 'none' },
                  }}
                />
              )
            })
          }
        </Geographies>

        {moroccoCities.map((city) => (
          <Marker key={city.name} coordinates={city.coordinates}>
            <circle
              r={city.size}
              fill="#FFD700"
              stroke="#8B1538"
              strokeWidth={2}
              className="drop-shadow-md"
            />
            <text
              textAnchor="middle"
              y={city.size + 12}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: city.size > 4 ? '10px' : '8px',
                fontWeight: city.size > 4 ? 'bold' : 'normal',
                fill: '#333',
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
              }}
            >
              {city.name}
            </text>
          </Marker>
        ))}

        {/* Ligne de route France → Maroc */}
        <line
          x1={-5.81 * 320 + 5 * 320}
          y1={-35.78 * 320 + 10 * 320}
          x2={-15.93 * 320 + 5 * 320}
          y2={-23.71 * 320 + 10 * 320}
          stroke="#FFD700"
          strokeWidth={2.5}
          strokeDasharray="6,4"
          opacity={0.8}
        />
      </ComposableMap>
      
      {/* Légende */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-md border border-gray-100">
        <h4 className="text-xs font-bold text-gray-700 mb-2">Légende</h4>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-[#FFD700] border border-[#8B1538]"></div>
          <span className="text-xs text-gray-600">Point de livraison</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-[#C41E3A]"></div>
          <span className="text-xs text-gray-600">Zone de couverture</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[#FFD700] border-dashed"></div>
          <span className="text-xs text-gray-600">Route principale</span>
        </div>
      </div>
    </div>
  )
}
