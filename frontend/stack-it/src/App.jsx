import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/mode-toggle";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./components/auth/signin";
import SignUpPage from "./components/auth/signup";
import TiptapEditor from "./components/texteditor";
import AskQuestionPage from "./components/pages/askquestionpage";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./components/pages/homepage";
import QuestionPage from "./components/pages/questionspage";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex min-h-svh flex-col items-center justify-center">
                <ModeToggle />
              </div>
            }
          />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/ask" element={<AskQuestionPage />} />
          <Route path="/question/:id" element={<QuestionPage/>}/>
        </Routes>
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
