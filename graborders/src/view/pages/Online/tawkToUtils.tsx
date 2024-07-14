export const hideTawkToWidget = () => {
  if (window.Tawk_API) {
    window.Tawk_API.hideWidget();
  }
};

export const showTawkToWidget = () => {
  if (window.Tawk_API) {
    window.Tawk_API.showWidget();
  }
};