import { useState, useEffect } from 'react';

export default function MelissaMapViewer() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on any key press
  useEffect(() => {
    const closeOnKey = () => setIsOpen(false);
    if (isOpen) {
      window.addEventListener('keydown', closeOnKey);
    }
    return () => window.removeEventListener('keydown', closeOnKey);
  }, [isOpen]);

  return (
    <div style={{ marginTop: 32, marginBottom: 32, textAlign: 'center' }}>
      <div
        onClick={() => setIsOpen(true)}
        style={{
          display: 'inline-block',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          cursor: 'pointer',
        }}
      >
        <img
          src="/melissa-journey-map.png"
          alt="Journey map for Melissa, a busy parent"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 16,
            transition: 'box-shadow 0.2s',
            cursor: 'pointer',
          }}
        />
      </div>
      <div style={{ fontSize: 14, color: '#444444', marginTop: 8, textAlign: 'left', width: '100%' }}>
        (Click to enlarge)
      </div>

      {/* Modal Viewer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
          }}
        >
          {/* Close (X) Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1001,
            }}
            aria-label="Close viewer"
          >
            &times;
          </button>

          <img
            src="/melissa-journey-map.png"
            alt="Journey map for Melissa, a busy parent"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: 20,
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
            }}
          />
        </div>
      )}
    </div>
  );
}
