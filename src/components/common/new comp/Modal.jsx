export default function Modal({ children, isOpen, className = ""}) {
  // const [modal, setModal] = useState(false);

  return (
    isOpen && (
      <div className={`fixed left-0 top-0 bg-black/50 w-screen h-screen z-100 flex items-center justify-center ${className}`}>
          {children}
      </div>
    )
  );
}