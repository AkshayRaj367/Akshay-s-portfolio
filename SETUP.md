# Portfolio Setup

This portfolio project includes automated setup scripts to make it easy to get started after cloning.

## Quick Setup

### Windows Users
```bash
setup.bat
```

### macOS/Linux Users
```bash
chmod +x setup.sh
./setup.sh
```

## Manual Setup

If you prefer to set up manually:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```
   *(The setup script creates this automatically)*

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (usually comes with Node.js)

Download Node.js from [https://nodejs.org/](https://nodejs.org/)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

## What the Setup Script Does

✅ Checks for Node.js and npm installation  
✅ Installs all project dependencies  
✅ Creates `.env.local` environment file  
✅ Creates `.gitignore` file if missing  
✅ Provides next steps and useful commands  

## Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   └── styles/          # Global styles
├── public/              # Static assets
├── setup.sh            # macOS/Linux setup script
├── setup.bat           # Windows setup script
└── package.json        # Dependencies and scripts
```

## Environment Variables

The setup script creates a `.env.local` file with basic configuration. You can customize:

- `NEXT_PUBLIC_APP_URL` - Your application URL
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)
- `CONTACT_FORM_EMAIL` - Contact form email (optional)

## Troubleshooting

### Node.js not found
Install Node.js from [https://nodejs.org/](https://nodejs.org/)

### Permission denied (macOS/Linux)
```bash
chmod +x setup.sh
```

### Port already in use
Kill the process using port 3000 or use a different port:
```bash
npm run dev -- -p 3001
```

## Support

If you encounter any issues:

1. Check Node.js version: `node --version`
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall: `rm -rf node_modules && npm install`

---

🌟 **Happy coding!**
