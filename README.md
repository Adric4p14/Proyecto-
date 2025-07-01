# 🧮 Math Adventure - Aventura Matemática

Una aplicación interactiva de matemáticas gamificada con mascotas, tienda, potenciadores y un sistema de progresión completo.

## ✨ Características

### 🎓 Sistema de Aprendizaje
- **Problemas Matemáticos Interactivos**: Aritmética, álgebra, geometría y fracciones
- **Niveles de Dificultad**: Fácil, medio y difícil
- **Sistema de Pistas**: Ayudas inteligentes para resolver problemas
- **Timer Dinámico**: Tiempo limitado para mantener la emoción
- **Feedback Inmediato**: Retroalimentación visual y animada

### 🛍️ Tienda Interactiva
- **Potenciadores**:
  - 🔥 Doble Experiencia (5 problemas)
  - ⏰ Tiempo Extra (+30 segundos)
  - 💡 Pistas Inteligentes
  - 🪙 Multiplicador de Monedas (x2)

- **Accesorios Especiales**:
  - 🧮 Calculadora Dorada (+5% XP permanente)
  - 🍀 Amuleto de la Suerte (+10% monedas extra)
  - 📚 Libro de Sabiduría (reduce tiempo)
  - ✏️ Lápiz Mágico (muestra primera cifra)
  - 👓 Gafas de Concentración (+15s tiempo base)

- **Packs Especiales**:
  - 🎁 Pack Premium (todos los potenciadores + accesorio aleatorio)
  - 📦 Bundle del Maestro (accesorios básicos)

### 🐾 Sistema de Mascotas
- **6 Mascotas Únicas**:
  - 🐲 Dragón Matemático (especialista en álgebra)
  - 🦉 Búho Sabio (pistas automáticas)
  - 🐱 Gato de la Suerte (+20% monedas)
  - 🦊 Zorro Astuto (especialista en geometría)
  - 🦄 Unicornio Mágico (triple XP ocasional)
  - 🤖 Robot Ayudante (soluciones automáticas)

- **Sistema de Cuidado**:
  - Alimentación para mantener felicidad
  - Juegos para ganar experiencia
  - Niveles y progresión de mascotas
  - Mascota activa que ayuda durante problemas

### 🏆 Progresión y Logros
- **Sistema de Niveles**: Progresión basada en experiencia
- **8 Logros Desbloqueables**:
  - 🎯 Primer Paso
  - 📚 Solucionador (10 problemas)
  - 🧠 Maestro Matemático (50 problemas)
  - 🎯 Precisión (90% accuracy)
  - 🔥 Racha Épica (10 consecutivos)
  - 💰 Coleccionista (500 monedas)
  - 🐾 Amante de Mascotas (3 mascotas)
  - ⭐ Subiendo Niveles (nivel 5)

- **Estadísticas Detalladas**:
  - Problemas resueltos
  - Precisión general
  - Racha actual y máxima
  - Distribución de respuestas correctas/incorrectas

### ⚙️ Configuración Personalizable
- **Niveles de Dificultad**: Fácil, medio, difícil
- **Opciones de Audio**: Efectos de sonido activables
- **Animaciones**: Control de efectos visuales
- **Persistencia**: Guarda automáticamente el progreso

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Routing**: React Router DOM
- **Estado**: Context API + useReducer
- **Persistencia**: LocalStorage

## 📦 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone [url-del-repositorio]
   cd math-adventure-app
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Construir para producción**:
   ```bash
   npm run build
   ```

## 🎮 Cómo Jugar

### 1. **Comenzar**
- La aplicación inicia con 100 monedas
- Nivel 1 con 0 experiencia
- Sin mascotas (¡adopta tu primera!)

### 2. **Resolver Problemas**
- Ve a "Problemas" desde la navegación
- Selecciona el tipo de matemáticas
- Usa potenciadores si los tienes
- Responde antes de que termine el tiempo
- Gana monedas y experiencia

### 3. **Comprar en la Tienda**
- Visita la "Tienda" para comprar potenciadores
- Los accesorios dan beneficios permanentes
- Los packs ofrecen mejor valor

### 4. **Adoptar Mascotas**
- Ve a "Mascotas" → "Adoptar"
- Cada mascota tiene habilidades únicas
- Alimenta y juega con ellas regularmente
- Selecciona una como activa para que te ayude

### 5. **Ver Progreso**
- Revisa tu "Perfil" para ver estadísticas
- Desbloquea logros completando objetivos
- Ajusta configuraciones según tus preferencias

## 🎯 Estrategias de Juego

### Para Maximizar Monedas:
1. Adopta el **Gato de la Suerte** (+20% monedas)
2. Usa **Multiplicador de Monedas** en problemas fáciles
3. Mantén alta precisión para mejores recompensas

### Para Ganar Experiencia Rápido:
1. Usa potenciadores de **Doble XP**
2. Adopta el **Dragón Matemático** para álgebra
3. Resuelve problemas de tu tipo favorito

### Para Rachas Largas:
1. Usa **Pistas Inteligentes** cuando estés inseguro
2. El **Robot Ayudante** no rompe rachas
3. Compra **Tiempo Extra** para pensar mejor

## 🔧 Estructura del Proyecto

```
src/
├── components/
│   └── Layout.jsx          # Navegación y estructura
├── context/
│   └── GameContext.jsx     # Estado global del juego
├── pages/
│   ├── Home.jsx           # Página principal
│   ├── MathProblems.jsx   # Ejercicios matemáticos
│   ├── Shop.jsx           # Tienda de items
│   ├── Pets.jsx           # Sistema de mascotas
│   └── Profile.jsx        # Perfil y configuración
├── App.jsx                # Componente principal
├── main.jsx              # Punto de entrada
└── index.css             # Estilos globales
```

## 🎨 Sistema de Diseño

- **Colores**: Gradientes vibrantes con glassmorphism
- **Tipografía**: Fredoka (Google Fonts) - amigable y legible
- **Animaciones**: Micro-interacciones con Framer Motion
- **Responsive**: Diseño adaptativo para móvil y desktop
- **Accesibilidad**: Contraste alto y navegación clara

## 🌟 Características Técnicas

### Estado del Juego
- **Persistencia automática** en LocalStorage
- **Estado centralizado** con Context API
- **Acciones optimizadas** con useReducer

### Generación de Problemas
- **Algoritmos dinámicos** para cada tipo de matemáticas
- **Escalado de dificultad** automático
- **Validación robusta** de respuestas

### Sistema de Recompensas
- **Cálculo balanceado** de monedas y experiencia
- **Multiplicadores acumulativos** de potenciadores
- **Efectos de mascotas** integrados

## 📱 Compatibilidad

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Dispositivos móviles iOS/Android
- ✅ Tablets y desktops

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Ideas para mejoras:

- Nuevos tipos de problemas matemáticos
- Más mascotas con habilidades únicas
- Sistema de multijugador
- Gráficos de progreso temporal
- Exportar/importar progreso
- Modo sin conexión mejorado

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🎉 ¡Disfruta Aprendiendo!

Math Adventure hace que las matemáticas sean divertidas y adictivas. ¡Comienza tu aventura matemática hoy mismo! 🚀📚 
