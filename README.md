# Jerry AI Web Interface

A modern, interactive React application for AI-powered chat and image generation.

## Technologies

* **React**
* **Framer Motion**
* **React Icons**
* **Tailwind CSS**

---

## Prerequisites

* **Node.js** v14 or higher
* **npm** v6 or higher

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tejastejas9380/Jeery_web_.git
   cd Jeery_web_
   ```
2. **Install dependencies**

   ```bash
   npm install react react-dom
   npm install framer-motion
   npm install react-icons
   npm install tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

---

## Running the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. **Chat**: Type a query in the hero section and press **Enter** or click **Think**.
2. **Image Generation**: Click **Create Images** to generate AI-powered visuals.
3. **Navigation**: Use the sidebar; expand **History** to review past conversations.
4. **Tools**: Utilize the input bar and available tools during chats.

---

## Configuration

* **API Endpoint**: Update `callAPI` in `src/components/Body.jsx` if your backend runs elsewhere (default: `http://localhost:5000/api/`).
* **Environment Variables**: Create a `.env` file for any custom variables (e.g., `REACT_APP_API_URL`).

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "feat: Add YourFeature"`.
4. Push to your branch: `git push origin feature/YourFeature`.
5. Open a pull request.

---

## License [is not setup]

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, reach out to **Tejastejas9380** link: [https://tejas-m-portfolio.netlify.app/] or open an issue in this repository.

---

> **Note:** A compatible backend API is required for full functionality. Placeholder features (upload, camera, voice) are yet to be implemented.
