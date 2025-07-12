import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/mode-toggle";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./components/auth/signin";
import SignUpPage from "./components/auth/signup";
import TiptapEditor from "./components/texteditor";
import QuestionPage from "./components/pages/questionspage";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex min-h-svh flex-col items-center justify-center">
              <ModeToggle />
              <TiptapEditor />
            </div>
          }
        />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
      </Routes>
      <QuestionPage />
      
      
    </ThemeProvider>
  );
}

export default App;
