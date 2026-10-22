/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  INITIAL_BOOKS,
  INITIAL_CATEGORIES,
  INITIAL_LOGS,
  BukuItem,
  KategoriItem,
  PengunjungLogItem,
  PengunjungStats,
} from "./data/initialData";
import { generateCoverDataUri } from "./utils/coverGenerator";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { KatalogPage } from "./pages/KatalogPage";
import { DetailPage } from "./pages/DetailPage";
import { PengirimanPage } from "./pages/PengirimanPage";
import { TentangPage } from "./pages/TentangPage";
import { AdminPage } from "./pages/AdminPage";
import { SeoInspectorPage } from "./pages/SeoInspectorPage";
import { YiiExplorerPage } from "./pages/YiiExplorerPage";

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<string>("home");
  const [selectedBook, setSelectedBook] = useState<BukuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<KategoriItem | null>(null);

  // Authentication State (Yii2 Built-in Identity standard: admin / admin123)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("aisu_admin_logged") === "true";
  });

  // Persistent Books & Categories State
  const [books, setBooks] = useState<BukuItem[]>(() => {
    const saved = localStorage.getItem("aisu_books_data");
    if (saved) {
      try {
        const parsed: BukuItem[] = JSON.parse(saved);
        // Automatically upgrade any cached covers containing legacy text to the new official AISU logo format
        return parsed.map((b) => {
          if (
            b.coverImage &&
            (b.coverImage.includes("BUKU%20ORIGINAL") ||
              b.coverImage.includes("AISU%20PRESS") ||
              b.coverImage.includes("BUKU ORIGINAL") ||
              b.coverImage.includes("AISU PRESS"))
          ) {
            return {
              ...b,
              coverImage: generateCoverDataUri(
                b.judul,
                b.penulis,
                "Penerbit AISU",
                b.coverBg || "#1e3a8a",
                "#0f172a",
                b.coverAccent || "#38bdf8"
              ),
            };
          }
          return b;
        });
      } catch {
        return INITIAL_BOOKS;
      }
    }
    return INITIAL_BOOKS;
  });

  const [categories, setCategories] = useState<KategoriItem[]>(() => {
    const saved = localStorage.getItem("aisu_categories_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CATEGORIES;
      }
    }
    return INITIAL_CATEGORIES;
  });

  // Visitor Statistics & Logs State
  const [stats, setStats] = useState<PengunjungStats>(() => {
    const saved = localStorage.getItem("aisu_stats_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { hariIni: 148, mingguIni: 1120, bulanIni: 4890, total: 32410 };
      }
    }
    return { hariIni: 148, mingguIni: 1120, bulanIni: 4890, total: 32410 };
  });

  const [logs, setLogs] = useState<PengunjungLogItem[]>(INITIAL_LOGS);

  // Save Books & Categories to localStorage
  useEffect(() => {
    localStorage.setItem("aisu_books_data", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("aisu_categories_data", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("aisu_stats_data", JSON.stringify(stats));
  }, [stats]);

  // Real-time visitor counter tracking on page change (simulates Pengunjung::trackVisit())
  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo(0, 0);

    // Track hit
    setStats((prev) => ({
      ...prev,
      hariIni: prev.hariIni + 1,
      mingguIni: prev.mingguIni + 1,
      bulanIni: prev.bulanIni + 1,
      total: prev.total + 1,
    }));

    // Append log
    const now = new Date();
    const timeStr = now.toISOString().replace("T", " ").substring(0, 19);
    const newLog: PengunjungLogItem = {
      id: Date.now(),
      ip_address: "182.1.204." + Math.floor(Math.random() * 200 + 10),
      user_agent: navigator.userAgent.substring(0, 80),
      url_visited: "/" + (page === "home" ? "" : page),
      referer: "Direct / Navigasi Internal",
      visited_at: timeStr,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 29)]);
  };

  const handleSelectBook = (book: BukuItem) => {
    setSelectedBook(book);
    handleNavigate("detail");
  };

  const handleSelectCategory = (cat: KategoriItem | null) => {
    setSelectedCategory(cat);
    handleNavigate("katalog");
  };

  // Admin Actions
  const handleAdminLogin = (u: string, p: string) => {
    // Yii2 standard identity check
    if (u === "admin" && (p === "admin" || p === "admin123")) {
      setIsAdminLoggedIn(true);
      localStorage.setItem("aisu_admin_logged", "true");
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("aisu_admin_logged");
    setActivePage("home");
  };

  const handleAddBook = (newBookData: Omit<BukuItem, "id" | "created_at" | "updated_at">) => {
    const newBook: BukuItem = {
      ...newBookData,
      id: books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1,
      created_at: new Date().toISOString().replace("T", " ").substring(0, 19),
      updated_at: new Date().toISOString().replace("T", " ").substring(0, 19),
    };
    setBooks([newBook, ...books]);
  };

  const handleUpdateBook = (id: number, updatedFields: Partial<BukuItem>) => {
    setBooks(
      books.map((b) =>
        b.id === id
          ? {
              ...b,
              ...updatedFields,
              updated_at: new Date().toISOString().replace("T", " ").substring(0, 19),
            }
          : b
      )
    );
    if (selectedBook && selectedBook.id === id) {
      setSelectedBook({ ...selectedBook, ...updatedFields });
    }
  };

  const handleDeleteBook = (id: number) => {
    setBooks(books.filter((b) => b.id !== id));
    if (selectedBook && selectedBook.id === id) {
      setSelectedBook(null);
      setActivePage("katalog");
    }
  };

  const handleAddCategory = (newCatData: Omit<KategoriItem, "id" | "created_at">) => {
    const newCat: KategoriItem = {
      ...newCatData,
      id: categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
      created_at: new Date().toISOString().replace("T", " ").substring(0, 19),
    };
    setCategories([...categories, newCat]);
  };

  const handleDeleteCategory = (id: number) => {
    // Check if books exist in this category
    const hasBooks = books.some((b) => b.kategori_id === id);
    if (hasBooks) {
      return {
        success: false,
        message: "Kategori tidak dapat dihapus karena masih digunakan oleh buku terdaftar.",
      };
    }
    setCategories(categories.filter((c) => c.id !== id));
    return { success: true };
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Semantic Header */}
      <Header
        activePage={activePage}
        setActivePage={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleAdminLogout}
        totalBooks={books.length}
      />

      {/* Main Semantic Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {activePage === "home" && (
          <HomePage
            books={books}
            categories={categories}
            stats={stats}
            onSelectBook={handleSelectBook}
            onSelectCategory={handleSelectCategory}
            onNavigateKatalog={() => handleNavigate("katalog")}
            onNavigateYiiCode={() => handleNavigate("yii-code")}
          />
        )}

        {activePage === "katalog" && (
          <KatalogPage
            books={books}
            categories={categories}
            selectedCategoryId={selectedCategory ? selectedCategory.id : null}
            onSelectCategory={setSelectedCategory}
            onSelectBook={handleSelectBook}
          />
        )}

        {activePage === "detail" && selectedBook && (
          <DetailPage
            buku={selectedBook}
            categories={categories}
            allBooks={books}
            onSelectBook={handleSelectBook}
            onBack={() => handleNavigate("katalog")}
          />
        )}

        {activePage === "pengiriman" && <PengirimanPage />}

        {activePage === "tentang" && <TentangPage />}

        {activePage === "seo" && <SeoInspectorPage />}

        {activePage === "yii-code" && <YiiExplorerPage />}

        {(activePage === "login" || activePage === "admin") && (
          <AdminPage
            isLoggedIn={isAdminLoggedIn}
            onLogin={handleAdminLogin}
            onLogout={handleAdminLogout}
            books={books}
            categories={categories}
            stats={stats}
            logs={logs}
            onAddBook={handleAddBook}
            onUpdateBook={handleUpdateBook}
            onDeleteBook={handleDeleteBook}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
      </main>

      {/* Semantic Footer */}
      <Footer setActivePage={handleNavigate} />
    </div>
  );
}
