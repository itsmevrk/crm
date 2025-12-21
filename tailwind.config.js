module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  screens: {
    sm: '640px',   
    md: '768px',    
    lg: '1024px',   
    xl: '1280px',
    '2xl': '1536px'
  },
  theme: {
    extend: {
      colors: {
        primary: {
          background: "var(--primary-background)",
          foreground: "var(--primary-foreground)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)"
        },
        secondary: {
          background: "var(--secondary-background)",
          foreground: "var(--secondary-foreground)",
          light: "var(--secondary-light)",
          dark: "var(--secondary-dark)"
        },
        accent: {
          orange: "var(--accent-orange)",
          'orange-light': "var(--accent-orange-light)",
          'orange-bg': "var(--accent-orange-bg)",
          yellow: "var(--accent-yellow)",
          'yellow-light': "var(--accent-yellow-light)",
          green: "var(--accent-green)",
          'green-light': "var(--accent-green-light)",
          blue: "var(--accent-blue)",
          'blue-light': "var(--accent-blue-light)",
          red: "var(--accent-red)"
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          light: "var(--text-light)",
          white: "var(--text-white)",
          accent: "var(--text-accent)"
        },
        background: {
          main: "var(--bg-main)",
          card: "var(--bg-card)",
          overlay: "var(--bg-overlay)",
          light: "var(--bg-light)",
          'blue-light': "var(--bg-blue-light)",
          'green-light': "var(--bg-green-light)",
          'orange-light': "var(--bg-orange-light)",
          'purple-light': "var(--bg-purple-light)",
          'yellow-light': "var(--bg-yellow-light)"
        },
        border: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          light: "var(--border-light)",
          accent: "var(--border-accent)",
          muted: "var(--border-muted)",
          white: "var(--border-white)"
        },
        // Component-specific colors
        sidebar: {
          background: "var(--sidebar-background)",
          text: "var(--sidebar-text)"
        },
        header: {
          background: "var(--header-background)",
          text: "var(--header-text)"
        },
        button: {
          'primary-bg': "var(--button-primary-bg)",
          'primary-text': "var(--button-primary-text)",
          'secondary-bg': "var(--button-secondary-bg)",
          'secondary-text': "var(--button-secondary-text)"
        }
      },
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'md': 'var(--font-size-md)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)'
      },
      fontWeight: {
        'normal': 'var(--font-weight-normal)',
        'medium': 'var(--font-weight-medium)',
        'semibold': 'var(--font-weight-semibold)'
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'base': 'var(--spacing-base)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)',
        '6xl': 'var(--spacing-6xl)',
        '7xl': 'var(--spacing-7xl)',
        '8xl': 'var(--spacing-8xl)',
        '9xl': 'var(--spacing-9xl)'
      },
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'base': 'var(--radius-base)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        '4xl': 'var(--radius-4xl)'
      }
    }
  },
  plugins: []
};