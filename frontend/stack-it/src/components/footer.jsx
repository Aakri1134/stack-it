// src/components/ui/footer.jsx
export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background px-6 py-8 text-base text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-lg text-center w-full md:w-auto">
        &copy; {new Date().getFullYear()} StackIt. All rights reserved.
      </div>
      <div className="flex gap-6">
        <a href="#" className="hover:underline text-lg">
          Terms
        </a>
        <a href="#" className="hover:underline text-lg">
          Privacy
        </a>
        <a href="#" className="hover:underline text-lg">
          Contact
        </a>
      </div>
    </footer>
  );
}
