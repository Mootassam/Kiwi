import React, { useEffect } from 'react';

const withTawkTo = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      const loadTawkToScript = () => {
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/668d88df7a36f5aaec966a1d/1i2cdtap3';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s1.id = 'tawkToScript';
        s0.parentNode.insertBefore(s1, s0);
      };

      const removeTawkToScript = () => {
        const script = document.getElementById('tawkToScript');
        if (script) {
          script.parentNode.removeChild(script);
        }

        const tawkWidget = document.querySelector('iframe[src*="tawk"]');
        if (tawkWidget) {
          tawkWidget.parentNode.removeChild(tawkWidget);
        }
      };

      loadTawkToScript();

      return () => {
        removeTawkToScript();
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withTawkTo;
