# PressFlix 🎬  
### Instant Landing Page & Pitch Generator

Press-Flix is a web platform that allows users to generate **ready-to-share landing pitches** for products, services, and ideas in seconds using structured templates.  
Users fill a simple form → Press-Flix generates a **live public pitch page with analytics tracking.**

---

## 🚀 Live Demo
https://press-flix.vercel.app/

---

## ✨ Features

- ⚡ **Instant Pitch Generation** — Create a live landing pitch in ~30 seconds  
- 🔗 **Shareable Public Link** — Each pitch has a unique URL  
- 📊 **Built-in Analytics** — Track views, CTA clicks, and engagement  
- 🧩 **Multiple Pitch Types**
  - Tech Product Pitch
  - Book / Author Pitch
  - Service / Agency Pitch  
- 🎯 **Conversion-Focused Templates** — Structured storytelling for clarity  
- 🔐 **Authentication (Firebase)** — Secure user access  
- 📱 **Responsive UI** — Works across devices  
- 🚀 **Production Ready Deployment**

---

## 🧠 How It Works

1. Select pitch category (Tech / Book / Service)  
2. Fill structured form (identity, problem, solution, specs, roadmap, CTA)  
3. Press-Flix generates a **live landing pitch page**  
4. Share link publicly  
5. Platform tracks:
   - Views
   - CTA clicks
   - Engagement performance  

---

## 🏗️ Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Framer Motion  
- React Router  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  

### Auth & Services
- Firebase Authentication  

### Deployment
- Vercel (Frontend)  
- Render / Node Server (Backend)  

---

## 📊 Core Architecture

- Dynamic schema-based pitch rendering  
- REST API for pitch creation & analytics  
- Slug-based routing for public pitch pages  
- Event tracking system for engagement  
- Modular multi-category form system  

---

## 🎯 Use Cases

- Startup founders creating investor-ready landing pitches  
- Indie creators sharing product/service ideas  
- Authors pitching books visually  
- Freelancers & agencies creating proposal landing pages  
- Builders validating ideas quickly  

---

## 🛠️ Local Installation

```bash
# Clone repository
git clone https://github.com/Abhinav6423/press-flix.git

# Install frontend
cd frontend
npm install
npm run dev

# Install backend
cd ../backend
npm install
npm start
```

Create `.env` file in backend:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
FIREBASE_CONFIG=your_config
```

---

## 🔮 Future Improvements

- AI-generated pitch enhancement  
- Advanced analytics dashboard  
- Export pitch as PDF  
- Custom template builder  
- SEO optimized pitch pages  
- Team collaboration  

---

## 👨‍💻 Author

**Abhinav Pandey**  
Full-Stack MERN Developer  

GitHub: https://github.com/Abhinav6423  

---

## 📄 License

MIT License — Free to use & modify.
