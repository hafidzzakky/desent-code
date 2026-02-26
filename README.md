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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
