# Morint - Interactive Workspace Designer

Morint is a modern, interactive web application built with [Next.js 16](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) that allows users to design their dream workspace visually.

![Workspace Preview](/public/images/setup-clean.jpeg)

## 🚀 Features

- **Interactive Designer**: Drag and drop desks, chairs, and accessories onto a virtual canvas.
- **Real-time Visualization**: See how your setup looks instantly with a clean, glassmorphism-inspired UI.
- **Smart Controls**:
  - **Zoom & Pan**: Easily navigate your workspace design.
  - **Multi-select**: Select multiple items to move or delete them in bulk.
  - **Undo/Redo**: Experiment freely with full history support (Ctrl+Z / Ctrl+Y).
- **Product Catalog**: Browse and add various furniture and accessories with detailed pricing.
- **Real-time Budgeting**: Track the total cost of your setup as you design.
- **Shopping Cart**: Review your selected items and proceed to a summary page.
- **State Persistence**: Your design is automatically saved to your browser's local storage, so you never lose progress.
- **Responsive Design**: optimized for various screen sizes.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (with Persist middleware)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## 📦 Getting Started

Follow these steps to run the project locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/hafidzzakky/desent-code.git
    cd morint
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

- `src/app`: App Router pages (`/`, `/designer`, `/checkout`).
- `src/components`: Reusable UI components.
  - `designer/`: Components specific to the workspace designer (Canvas, ProductList, etc.).
  - `layout/`: Global layout components like Header.
- `src/store`: Zustand store definitions for global state management.
- `src/data`: Static data for products.
- `src/types`: TypeScript interfaces and types.

## 💡 Approach & Design Decisions

For this project, I chose a client-heavy approach using **React** and **Zustand** to handle the complex interactive state of the workspace designer. 

- **State Management**: Zustand was selected over Redux or Context API for its simplicity and performance. The `persist` middleware ensures users don't lose their work on refresh, while custom logic handles the undo/redo history stack.
- **Drag & Drop**: Instead of heavy libraries, I implemented custom mouse event handlers for the canvas interactions (drag, zoom, pan). This provides granular control over the user experience and performance.
- **Styling**: Tailwind CSS allowed for rapid UI development with a consistent design system. The glassmorphism effect was a key design choice to give the app a modern, premium feel.

### Future Improvements
With more time, I would focus on:
1.  **Backend Integration**: Adding a database (like PostgreSQL/Supabase) to save user designs permanently and allow sharing.
2.  **Mobile Optimization**: Improving the touch interactions for the canvas on mobile devices.
3.  **3D Visualization**: Integrating `react-three-fiber` to allow users to view their setup in 3D.
4.  **Collision Detection**: Implementing smarter snapping and collision detection to prevent items from overlapping unrealistically.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
