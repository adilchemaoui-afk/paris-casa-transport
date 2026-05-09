export function MoroccoMapFull() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C41E3A" />
          <stop offset="100%" stopColor="#8B1538" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      {/* Carte du Maroc - silhouette approximative */}
      <path 
        d="M180 80 
           C200 75, 250 70, 320 65
           C380 60, 420 55, 480 60
           C520 65, 550 70, 580 85
           C600 100, 610 120, 620 140
           C625 160, 620 180, 615 200
           C610 220, 600 240, 590 260
           C580 280, 570 300, 560 320
           C550 340, 540 360, 530 380
           C525 400, 520 420, 515 440
           C510 460, 505 470, 500 480
           C490 485, 480 480, 470 475
           C460 470, 450 465, 440 460
           C430 455, 420 450, 410 445
           C400 440, 390 435, 380 430
           C370 425, 360 420, 350 415
           C340 410, 330 405, 320 400
           C310 395, 300 390, 290 385
           C280 380, 270 375, 260 370
           C250 365, 240 360, 230 355
           C220 350, 210 345, 200 340
           C190 335, 180 330, 170 325
           C160 320, 150 315, 145 310
           C140 305, 135 300, 130 295
           C125 290, 120 285, 115 280
           C110 275, 105 270, 100 265
           C95 260, 90 255, 85 250
           C80 245, 75 240, 70 235
           C65 230, 60 225, 55 220
           C50 215, 45 210, 40 205
           C35 200, 30 195, 25 190
           C20 185, 15 180, 10 175
           C5 170, 0 165, 0 160
           C5 155, 10 150, 15 145
           C20 140, 25 135, 30 130
           C35 125, 40 120, 45 115
           C50 110, 55 105, 60 100
           C65 95, 70 90, 75 85
           C80 80, 85 75, 90 70
           C95 65, 100 60, 105 55
           C110 50, 115 45, 120 40
           C125 35, 130 30, 135 25
           C140 20, 145 15, 150 10
           C155 5, 160 0, 165 0
           C170 5, 175 10, 180 80Z"
        fill="url(#mapGrad)"
        stroke="#8B1538"
        strokeWidth="2"
        filter="url(#shadow)"
        opacity="0.9"
      />
      
      {/* Points des villes principales */}
      <circle cx="280" cy="220" r="5" fill="#FFD700" />
      <text x="290" y="225" fontSize="12" fill="#333" fontWeight="bold">Casablanca</text>
      
      <circle cx="350" cy="240" r="5" fill="#FFD700" />
      <text x="360" y="245" fontSize="12" fill="#333" fontWeight="bold">Marrakech</text>
      
      <circle cx="250" cy="120" r="5" fill="#FFD700" />
      <text x="200" y="125" fontSize="12" fill="#333" fontWeight="bold">Tanger</text>
      
      <circle cx="180" cy="160" r="5" fill="#FFD700" />
      <text x="130" y="165" fontSize="12" fill="#333" fontWeight="bold">Rabat</text>
      
      <circle cx="400" cy="350" r="5" fill="#FFD700" />
      <text x="410" y="355" fontSize="12" fill="#333" fontWeight="bold">Agadir</text>
      
      <circle cx="520" cy="420" r="5" fill="#FFD700" />
      <text x="530" y="425" fontSize="12" fill="#333" fontWeight="bold">Laâyoune</text>
      
      {/* Route principale */}
      <path 
        d="M250 120 C280 150, 300 180, 320 200 C340 220, 360 230, 380 240"
        fill="none"
        stroke="#FFD700"
        strokeWidth="3"
        strokeDasharray="8,4"
        opacity="0.8"
      />
      <text x="300" y="180" fontSize="10" fill="#FFD700" fontWeight="bold" transform="rotate(-20, 300, 180)">Route MRE</text>
      
      {/* Légende */}
      <rect x="580" y="380" width="180" height="80" rx="8" fill="white" opacity="0.9" stroke="#ddd" />
      <text x="590" y="400" fontSize="13" fill="#333" fontWeight="bold">Légende</text>
      <circle cx="600" cy="415" r="4" fill="#FFD700" />
      <text x="615" y="420" fontSize="11" fill="#555">Villes principales</text>
      <line x1="595" y1="435" x2="615" y2="435" stroke="#FFD700" strokeWidth="2" strokeDasharray="4,2" />
      <text x="620" y="440" fontSize="11" fill="#555">Route France-Maroc</text>
    </svg>
  )
}
